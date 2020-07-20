<template>
  <gl-drawer
    :display="display"
    title="最新消息"
    class="recent-msg"
    @update:display="change">
    <ul v-infinite-scroll="load" class="scroll-loading scroller-bar">
      <div v-loading="loading" class="message-pannel">
        <li v-for="(msg, index) in messages" :key="index" class="infinite-list-item">
          <p class="msg-row">{{ index + 1 }}. {{ msg.timestamp }} {{ msg.msg }}
            【<a href="#">{{ msg.ticket_id }}</a>】</p>
        </li>
      </div>
    </ul>
  </gl-drawer>
</template>

<script>
import GlDrawer from '@/components/GlDrawer'
import { mapMutations, mapState } from 'vuex'
import { DATE_TIME_FORMAT } from '@/utils/constant'
import { query_user_last_ticket_message } from '@/api/work_order_system'
import { date_formatter } from '@/utils/common'

export default {
  name: 'RecentMessage',
  components: {
    GlDrawer
  },
  beforecreate: function() {
  },
  props: {},
  data: function() {
    return {
      display: false,
      loading: false,
      messages: [],
      interval: undefined,
      page_size: 20,
      page: 0,
      total: 0
    }
  },
  computed: {
    ...mapMutations([
      'TOGGLE_GL_DRAWER'
    ]),
    ...mapState({
      drawer_show: state => state.app.drawer
    })
  },
  watch: {
    drawer_show: {
      handler: function(show) {
        this.display = show
      },
      immediate: true
    }
  },
  destroyed() {
    this.loading = false
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    change: function(show) {
      this.$store.commit('TOGGLE_GL_DRAWER', show)
    },
    load() {
      this.page++
      const config = {
        page_no: this.page,
        page_num: this.page_size
      }
      this.fetch_remote_msg(config, true)
    },
    clear_reset_page_data() {
      // 修正数据
      const rows_count = this.page * this.page_size
      const config = {
        page_no: 1,
        page_num: rows_count
      }
      this.fetch_remote_msg(config, true, true)
    },
    fetch_remote_msg(config, is_show_loading = false, is_reset = false) {
      is_show_loading ? this.loading = true : ''
      query_user_last_ticket_message(config).then(res => {
        if (res.status === 0) {
          const messages = res.data.message_list.map(r => {
            const timestamp = date_formatter(r.create_time, DATE_TIME_FORMAT)
            return {
              ...r,
              timestamp
            }
          })
          // 校验结果值
          if (this.total === 0 || this.total === res.total_count) {
            if (is_reset) {
              this.messages = messages
            } else {
              this.messages = this.messages.concat(messages)
            }
          } else {
            this.total === res.total_count
            this.$nextTick(() => {
              this.clear_reset_page_data()
            })
          }
        }
      }).finally(() => {
        is_show_loading ? this.loading = false : ''
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.recent-msg {
  width: 100%;
  height: 100%;

  .scroll-loading {
    width: 100%;
    height: 100%;
    overflow: auto;
    margin: 0;
    padding: 15px;

    .message-pannel {
      min-height: 100%;

      li {
        list-style-type: none;
      }
    }

    .msg-row {
      color: rgba(28, 28, 28, 0.8);
      word-break: break-all;
      font-size: 12px;
      line-height: 16px;

      &:hover {
        color: #101010;
      }

      a {
        color: #1e6abc;
        padding: 0 1px;
        text-decoration: underline;
      }
    }
  }
}
</style>
