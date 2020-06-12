<template>
  <div class="component-card">
    <div class="left-item">
      <img src="@/assets/imgs/logo.png" alt="">
      <div class="hover-system-subject" @click="go_to_home_page">格雷盒子后台管理系统
      </div>
    </div>
    <div class="user-info">
      <img :src="avatar || default_avatar" class="avatar" alt="" @click="avatar_click">
      <el-dropdown @command="user_control">
        <div class="me">
          <div v-if="name" class="user-name-show">{{ name || '小格子' }}</div>
          <span v-if="greetings">,</span>
          <div class="user-name-show">{{ greetings }}</div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="basic">基本资料</el-dropdown-item>
          <el-dropdown-item command="secret">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="diviser" />
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
import { mapGetters } from 'vuex'
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
    return {
      default_avatar,
      greetings
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar'])
  },
  watch: {},
  mounted: function() {
  },
  methods: {
    logout: function() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
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
      console.log('command: ', command)
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

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
    width: 240px;
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

    .logout-block {
      display: flex;
      justify-content: center;
      align-items: center;

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
</style>
