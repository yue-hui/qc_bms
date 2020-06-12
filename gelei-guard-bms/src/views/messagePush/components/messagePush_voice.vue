<template>
  <div class="component-card">
    <div>
      <div class="table-block">
        <el-table
          v-loading="loading"
          :data="data_list"
          :stripe="true"
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="接收者手机号"
            prop="phone"
            width="100" />
          <el-table-column
            align="center"
            label="内容"
            prop="content" />
          <el-table-column
            align="center"
            label="发送状态"
            prop="is_send"
            width="70" />
          <el-table-column
            align="center"
            label="推送时间"
            prop="send_time"
            width="100" />
          <el-table-column
            align="center"
            label="短信平台"
            prop="PLATFORM"
            width="100" />
          <el-table-column
            align="center"
            label="返回结果"
            prop="result"
            width="300" />
        </el-table>
        <el-pagination
          :current-page="page"
          :page-size="page_size"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="change_current"
          @size-change="table_size_change" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  get_manager_voice_list
} from '@/api/interactive'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { messagePush_terrace, messagePush_status } from '@/views/messagePush/data/data'

export default {
  name: 'ApplicationList',
  props: {
    conditions: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      data_list: [],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      pos: 0,
      offset: 0
    }
  },
  computed: {},
  watch: {},
  mounted: function() {
    this.reload()
  },
  methods: {
    table_size_change(size) {
      setPagenationSize(size)
      this.reload()
    },
    change_current(page) {
      if (page === 1) {
        this.pos = 0
        this.offset = 0
      } else {
        this.pos = page * 10 - 10
        this.offset = page * 10 - 10
      }

      this.reload()
    },
    get_pagination_config() {
      const pagination = {
        page: this.page,
        order: 'asc',
        limit: 10,
        offset: this.offset,
        pos: this.pos,
        source: '',
        phone: '',
        content: ''
      }
      return pagination
    },
    reset_pagination_and_load_data() {
      this.page = 1
      this.page_size = getPagenationSize()
      this.reload()
    },
    reload() {
      const config = this.get_pagination_config()
      for (const query_key in this.conditions) {
        if (this.conditions[query_key]) {
          config[query_key] = this.conditions[query_key]
        }
      }
      this.load_data(config)
    },
    load_data(config) {
      this.loading = true
      get_manager_voice_list(config).then(res => {
        this.data_list = res.data.rows.map(r => {
          // const time_transfer = date_formatter(r.create_time)
          return {
            ...r,
            is_send: messagePush_status(r.is_send),
            PLATFORM: messagePush_terrace(r.PLATFORM)
          }
        })
        this.total = res.data.total
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-card {
  width: 100%;
  height: 100%;
}

.table_header {
  background-color: #44474c;
}
</style>
