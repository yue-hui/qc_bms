<template>
  <div :style="style" class="permission">
    <el-checkbox
      v-model="resource.checked"
      :style="element_style"
      :disabled="resource.disabled"
      @change="click_tap">{{ resource.name }}
    </el-checkbox>
    <div v-if="resource.children.length !== 0" :style="children_style" class="children">
      <Permission
        v-for="(perm, index) in resource.children"
        :key="index"
        :ref="'p_' + perm.code"
        :resource="perm" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Permission',
  beforecreate: function() {
  },
  props: {
    resource: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    return {}
  },
  computed: {
    style: function() {
      // 当前节点与孩子节点关系
      const layout = {}
      layout['flex-direction'] = (this.resource.layout === 'vertical') ? 'column' : 'row'
      if (this.resource.baseline) {
        layout['border-bottom'] = '1px solid #e8e8e8'
      }
      return layout
    },
    children_style: function() {
      // 孩子节点间关系
      const layout = {}
      layout['flex-direction'] = (this.resource.c_layout === 'vertical') ? 'column' : 'row'
      return layout
    },
    element_style: function() {
      // 当前节点样式
      const layout = {}
      layout['width'] = this.resource.width ? (this.resource.width + 'px') : 'auto'
      return layout
    }
  },
  watch: {},
  mounted: function() {
  },
  methods: {
    click_tap: function() {
      const checked = this.resource.checked
      this.broadcast(checked)
      this.report(checked)
      this.resource.checked = checked
    },
    set_current_permission: function(enabled = true) {
      // 设置当前节点属性状态
      this.resource.checked = enabled
    },
    report: function(checked) {
      const brother = this.$parent.$children
      const brother_checked_set = new Set()
      brother.filter(r => r.$options.name === this.$options.name).map(m => {
        brother_checked_set.add(m.resource.checked)
        // console.log(m.resource.code, m.resource.checked)
      })
      if (checked || (brother_checked_set.size === 1)) {
        checked ? (this.$parent.set_current_permission && this.$parent.set_current_permission(checked)) : ''
        if (brother_checked_set.size === 1) {
          if (this.$parent.resource && this.$parent.resource.page === false && this.$parent.set_current_permission) {
            this.$parent.set_current_permission(checked)
          }
        }
        this.$parent.report && this.$parent.report(checked)
      }
      this.$emit('callback', this.resource.code)
    },
    broadcast: function(checked) {
      // 向下广播点击事件
      this.resource.children.length && this.resource.children.map(r => {
        const child_node = this.$refs['p_' + r.code][0]
        child_node.set_current_permission(checked)
        child_node.broadcast(checked)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.permission {
  /*width: 100%;*/
  height: 100%;
  display: flex;
  padding: 0 6px;

  .children {
    flex: 1;
    display: flex;
  }
}
</style>
