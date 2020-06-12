<template>
  <ExElButton
    :disabled.sync="disabled"
    v-bind="$attrs"
    class="ex-el-button"
    @mousedown="mounse_move"
    @mousemove="mounse_move"
    @mouseleave="mounse_end">
    <slot />
    <template v-if="is_auth && show_reminder">
      <div
        :class="{show_reminder: show_reminder}"
        class="reminder">您没有权限哦</div>
    </template>
  </ExElButton>
</template>

<script>
import ExElButton from './exelbutton'

export default {
  name: 'Index',
  beforecreate: function() {
  },
  components: {
    ExElButton
  },
  props: {
    authId: {
      type: Number,
      require: true,
      default: 0
    }
  },
  data: function() {
    return {
      disabled: false,
      show_reminder: false,
      is_auth: true
    }
  },
  computed: {},
  watch: {},
  mounted: function() {
  },
  methods: {
    mounse_move: function() {
      console.log('move')
      this.show_reminder = true
      setTimeout(() => {
        this.show_reminder = false
      }, 10000)
    },
    mounse_end: function() {
      console.log('end')
      this.show_reminder = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ex-el-button {
  position: relative;

  .reminder {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .show_reminder {
  }
}
</style>
