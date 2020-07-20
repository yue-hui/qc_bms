<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <div class="bms-headers">
      <top-bar />
    </div>
    <div class="bms-body">
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <navbar />
        <app-main />
        <recent-message v-if="drawer_show" />
      </div>
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, TopBar, RecentMessage } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapMutations, mapState } from 'vuex'
import { SYNC_USER_VARIABLE_INFOMATION } from '@/utils/constant'
import { get_user_recently_status } from '@/api/login'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TopBar,
    RecentMessage
  },
  mixins: [ResizeMixin],
  data: function() {
    return {
      display: true,
      intervals: undefined
    }
  },
  computed: {
    ...mapMutations([
      'TOGGLE_GL_MESSAGE_REMINDER_STATUS'
    ]),
    ...mapState({
      drawer_show: state => state.app.drawer
    }),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    // 同步用户数据状态
    this.syncUserStatus()
  },
  destroyed() {
    // 清空数据
    if (this.intervals) {
      clearInterval(this.intervals)
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    syncUserStatus() {
      this.fetchUserVariableInfomation()
      this.intervals = setInterval(() => {
        this.fetchUserVariableInfomation()
      }, SYNC_USER_VARIABLE_INFOMATION * 1000)
    },
    fetchUserVariableInfomation() {
      // TODO: 去掉 ticket_id
      const config = {
        ticket_id: 'xx'
      }
      get_user_recently_status(config).then(res => {
        if (res.status === 0) {
          const status = res.data.unread_count !== 0
          this.$store.commit('TOGGLE_GL_MESSAGE_REMINDER_STATUS', status)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }

  .bms-headers {
    position: fixed;
    z-index: 2000;
    height: 60px;
    line-height: 60px;
    min-height: 60px;
    width: 100%;
    /*background-color: deepskyblue;*/
    background: #222736;
  }

  .bms-body {
    flex: 1;

    .main-container {
      padding-top: 60px;
    }
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
