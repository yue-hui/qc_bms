<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <div class="bms-headers">
      <top-bar />
    </div>
    <div class="bms-body">
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <navbar />
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, TopBar } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TopBar
  },
  mixins: [ResizeMixin],
  computed: {
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
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
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
    &.mobile.openSidebar{
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
      background-color: #062e3c;
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
