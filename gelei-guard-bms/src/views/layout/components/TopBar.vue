<template>
  <div class="component-card">
    <div class="left-item">
      <a href="/" class="hover-system-subject"> 格雷守护后台管理系统</a>
    </div>
    <div class="user-info">
      <div v-if="name" class="user-name-show">{{ name }},</div>
      <div class="user-name-show">欢迎您!</div>
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

export default {
  name: 'TopBar',
  beforecreate: function() {
  },
  props: {},
  data: function() {
    return {}
  },
  computed: {
    ...mapGetters(['name'])
  },
  watch: {},
  mounted: function() {
  },
  methods: {
    logout: function() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
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
    .hover-system-subject{
      color: #cecece;
      &:hover{
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

    .user-name-show {
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
          background-color: darken(#727aff, 5);
          position: relative;
        }
      }
    }
  }
}
</style>
