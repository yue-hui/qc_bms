<template>
  <div class="content">Console</div>
</template>

<script>
import { setButtonPermission } from '@/utils/auth'

export default {
  name: 'Console',
  components: {},
  data() {
    return {}
  },
  mounted: function() {
    console.log('params: ', this.$route.params)
    this.init_page()
  },
  methods: {
    init_page: function() {
      // 页面功能
      const item = this.$route.params.item
      const status = this.$route.params.status
      if (['0', '1'].indexOf(status) !== -1) {
        switch (item) {
          case 'btn':
            this.switch_btn_permission(status)
            break
          case 'disabled':
            break
          default:
            break
        }
      }
    },
    switch_btn_permission: function(status) {
      // 按钮权限开放 1 开放 0 使用默认权限
      setButtonPermission(status)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  /*min-height: 480px;*/
  padding: 20px 10px 25px 10px;
  display: flex;
  flex-direction: column;
}
</style>
