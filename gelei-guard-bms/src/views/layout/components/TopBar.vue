<template>
  <div class="component-card">
    <div class="left-item">
      <img src="@/assets/imgs/logo.png" alt="">
      <div class="hover-system-subject bms-logo-text" @click="go_to_home_page">{{ title }}</div>
    </div>
    <div class="user-info">
      <img :src="avatar || default_avatar" class="avatar" alt="" @click="avatar_click">
      <el-dropdown @command="user_control">
        <div class="me">
          <div :title="real_name || name || default_username" class="user-name-show">{{ display_name }}</div>
          <span v-if="greetings">,</span>
          <div class="user-name-greetings">{{ greetings }}</div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="basic">基本资料</el-dropdown-item>
          <el-dropdown-item v-if="name !== 'gladmin'" command="secret">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div v-if="msg_reminder_show" class="reminder-area">
        <div class="reminder-area-box" @click="show_drawer">
          <div :class="{alert: alert}" class="reminder-area-box-dot" />
          <p>
            <svg-icon :class="{'alert-font': alert}" icon-class="reminder" class="reminder-area-box-icon" />
            <span>最新消息</span>
          </p>
        </div>
      </div>
      <div class="logout-block" @click="logout">
        <div class="logout-hover-style">
          <svg-icon icon-class="logout" />
          <span class="logout-text">退出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import { ACCOUNT_NAME_LIST, WelcomeRouteWhiteList } from '@/utils/constant'
// import dayjs from 'dayjs'

export default {
  name: 'TopBar',
  props: {},
  data: function() {
    const default_avatar = require('@/assets/imgs/glmm.png')
    // const current_day = dayjs().hour()
    const greetings = '欢迎您!'
    // if (current_day < 6) {
    //   greetings = '晚上好!'
    // } else if (current_day > 6 && current_day <= 8) {
    //   greetings = '早上好!'
    // } else if (current_day > 8 && current_day <= 11) {
    //   greetings = '上午好!'
    // } else if (current_day > 11 && current_day <= 13) {
    //   greetings = '中午好!'
    // } else if (current_day > 14 && current_day <= 17) {
    //   greetings = '下午好!'
    // } else if (current_day > 18) {
    //   greetings = '夜深了!'
    // }
    const user = ACCOUNT_NAME_LIST.find(r => r.value === '00')
    const default_username = user.label
    return {
      alert: true,
      default_avatar,
      default_username,
      greetings,
      title: ''
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'is_agent', 'real_name']),
    ...mapMutations([
      'TOGGLE_GL_DRAWER'
    ]),
    ...mapState({
      drawer_show: state => state.app.drawer,
      msg_reminder_show: state => state.app.msg_reminder_status
    }),
    display_name: function() {
      return this.real_name || this.name || this.default_username
    }
  },
  watch: {
    is_agent: {
      handler: function(val) {
        if (val === true) {
          this.title = '格雷盒子后台管理系统-代理商'
        } else {
          this.title = '格雷盒子后台管理系统'
        }
      },
      immediate: true
    }
  },
  mounted: function() {
  },
  methods: {
    logout: function() {
      this.$store.dispatch('LogOut').then(() => {
        // 为了重新实例化vue-router对象 避免bug
        const current_name = this.$route.name
        if (WelcomeRouteWhiteList.indexOf(current_name) !== -1) {
          const options = {
            name: 'HomePage'
          }
          this.$router.push(options)
        } else {
          window.location.reload(true)
        }
      })
    },
    go_to_home_page() {
      const origin = window.location.origin
      const href = origin + '/gelei-guard-bms/'
      window.location.href = href
    },
    avatar_click() {
      this.basic_action()
    },
    user_control(command) {
      switch (command) {
        case 'basic':
          this.basic_action()
          break
        case 'secret':
          this.secret_action()
          break
        default:
          break
      }
    },
    basic_action() {
      this.$router.push({ name: 'Profile' })
    },
    secret_action() {
      this.$router.push({ name: 'ModifiedPassword' })
    },
    show_drawer() {
      if (!this.drawer_show) {
        this.$store.commit('TOGGLE_GL_DRAWER', true)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$recent_message_color: #51da51;
$recent_message_icon_color: #51da51;

.component-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  .alert {
    animation: flashAnimation 2s infinite;
  }

  .alert-font {
    animation: flashAnimationFont 2s infinite;
  }

  .left-item {
    padding-left: 10px;
    color: white;
    flex: 1;
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      margin-right: 5px;
    }

    .hover-system-subject {
      font-size: 16px;
      color: #cecece;
      display: inline-block;
      cursor: pointer;

      &:hover {
        color: rgb(64, 158, 255);
      }
    }
  }

  .user-info {
    padding: 0 10px;
    /*width: 380px;*/
    display: flex;
    flex-direction: row;
    font-size: 14px;
    color: #cecece;
    cursor: pointer;

    .avatar {
      margin-top: 15px;
      margin-right: 6px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      transition: .5s;
      box-shadow: 0 0 2px 2px #888888;
      padding: 1px;
      background-color: #fff;

      &:hover {
        transform: scale(1.2);
        box-shadow: 0 0 5px 5px #888888;
      }
    }

    .me {
      display: flex;
      flex-direction: row;
      color: #cecece;
      cursor: pointer;
      white-space: nowrap;

      .user-name-show {
        max-width: 70px;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      &:hover {
        color: white;
      }
    }

    .diviser {
      width: 20px;
      min-width: 20px;
      height: 100%;
      min-height: 100%;
    }

    .reminder-area {
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        color: white;
      }

      &-box {
        position: relative;

        &-dot {
          position: absolute;
          height: 8px;
          width: 8px;
          top: 14px;
          left: 24px;
          border-radius: 50%;
        }

        p {
          margin: 0;
          color: $recent_message_color;

          .reminder-area-box-icon {
            margin-left: 8px;
            margin-right: 2px;
            font-size: 24px;
          }
        }
      }
    }

    .logout-block {
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      margin-left: 2px;

      .logout-hover-style {
        height: 32px;
        padding: 8px;
        display: flex;
        border-radius: 4px;
        justify-content: center;
        align-items: center;

        &:hover {
          /*background-color: darken(#727aff, 5);*/
          color: white;
          position: relative;
        }
      }
    }
  }
}

@keyframes flashAnimation {
  0% {
    opacity: 0.5;
    background-color: #cecece;
  }
  50% {
    opacity: 1;
    background-color: $recent_message_icon_color;
  }
  100% {
    opacity: 0.5;
    background-color: #cecece;
  }
}

@keyframes flashAnimationFont {
  0% {
    opacity: 0.5;
    color: #cecece;
  }
  50% {
    opacity: 1;
    color: $recent_message_icon_color;
  }
  100% {
    opacity: 0.5;
    color: #cecece;
  }
}
</style>
