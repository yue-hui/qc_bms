<template>
  <div v-loading="loading" class="content">
    <div class="header">
      <div
        v-for="(header, index) in pheader"
        :key="index"
        :style="{width: header.width ? (header.width + 'px') : 'auto'}"
      >{{ header.name }}</div>
    </div>
    <Permission
      v-for="(perm, index) in pdata"
      :key="perm.code + index"
      :resource="perm"
      @callback="permission_callback"/>
  </div>
</template>

<script>
import Permission from '@/components/Permissions/permission'
export default {
  name: 'PermissionEntries',
  components: {
    Permission
  },
  props: {
    pdata: {
      type: Array,
      default: function() {
        return []
      }
    },
    pheader: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  mounted: function() {
    // setTimeout(() => {
    //   console.log('pdata: ', this.pdata)
    // }, 1000)
  },
  methods: {
    get_all_data() {
      console.log('pdata: ', this.pdata)
    },
    permission_callback(code) {
      this.$emit('report', this.pdata)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e8e8e8;

  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 0 32px;
    font-size: 14px;
    color: #606266;
    font-weight: 600;
    border-bottom: 1px solid #e8e8e8;
  }
}
</style>
