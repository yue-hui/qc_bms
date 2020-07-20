<template>
  <div class="drawer">
    <div :class="maskClass" @click="closeByMask" />
    <div
      v-loading="loading"
      :class="mainClass"
      :style="mainStyle"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.4)"
      class="main">
      <div class="drawer-head">
        <span>{{ title }}</span>
        <span v-show="closable" class="close-btn" @click="closeByButton">X</span>
      </div>
      <div :class="{'show-scroll': false}" class="drawer-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GLDrawer',
  props: {
    // 是否显示
    display: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: '标题'
    },
    // 加载
    loading: {
      type: Boolean,
      default: false
    },
    // 是否显示关闭按钮
    closable: {
      type: Boolean,
      default: true
    },
    // 是否显示遮罩
    mask: {
      type: Boolean,
      default: true
    },
    // 是否点击遮罩关闭
    maskClosable: {
      type: Boolean,
      default: true
    },
    // 宽度(支持百分比)
    width: {
      type: String,
      default: '400px'
    },
    // 是否在父级元素中打开
    inner: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    maskClass: function() {
      return {
        'mask-show': (this.mask && this.display),
        'mask-hide': !(this.mask && this.display),
        'inner': this.inner
      }
    },
    mainClass: function() {
      return {
        'main-show': this.display,
        'main-hide': !this.display,
        'inner': this.inner
      }
    },
    mainStyle: function() {
      return {
        width: this.width,
        right: this.display ? '0' : `-${this.width}`,
        borderLeft: this.mask ? 'none' : '1px solid #eee',
        paddingTop: '60px'
      }
    }
  },
  mounted() {
    if (this.inner) {
      const box = this.$el.parentNode
      box.style.position = 'relative'
    }
  },
  destroyed() {
    this.loading = false
  },
  methods: {
    closeByMask() {
      this.maskClosable && this.$emit('update:display', false)
    },
    closeByButton() {
      this.$emit('update:display', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer {
  /* 遮罩 */
  .mask-show {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, .5);
    opacity: 1;
    transition: opacity .5s;
  }

  .mask-hide {
    opacity: 0;
    transition: opacity .5s;
  }

  /* 滑块 */
  .main {
    position: fixed;
    z-index: 10;
    top: 0;
    height: 100%;
    background: #fff;
    transition: all 0.5s;
  }

  .main-show {
    opacity: 1;
  }

  .main-hide {
    opacity: 0;
  }

  /* 某个元素内部显示 */
  .inner {
    position: absolute;
  }

  /* 其他样式 */
  .drawer-head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #eee;

    .close-btn {
      display: inline-block;
      cursor: pointer;
      height: 100%;
      padding-left: 20px;
    }
  }

  .drawer-body {
    font-size: 14px;
    width: 100%;
    height: calc(100% - 45px);
    position: relative;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0;
    }

    &.show-scroll:hover::-webkit-scrollbar {
      width: 4px;
      height: 4px;
      background-color: #f8f6e7;
    }

    &.show-scroll::-webkit-scrollbar {
      width: 0;
    }

    &.show-scroll::-webkit-scrollbar-track {
      -webkit-box-shadow: red;
      border-radius: 10px;
    }

    &.show-scroll::-webkit-scrollbar-thumb {
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
      background-color: rgba(0, 0, 0, .1);
    }
  }
}
</style>
