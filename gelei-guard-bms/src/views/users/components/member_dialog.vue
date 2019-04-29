<template>
  <el-dialog
    :before-close="close"
    :visible.sync="visible"
    title="会员记录"
  >
    <el-table
      :data="member_list"
      empty-text="该用户无会员记录"
    >
      <el-table-column property="date" label="用户名" width="150" />
      <el-table-column property="name" label="时间" width="200" />
      <el-table-column property="address" label="会员获得路径" />
      <el-table-column property="address" label="获得方式" />
      <el-table-column property="address" label="交易金额" />
      <el-table-column property="address" label="会员有效期" />
    </el-table>
    <el-pagination
      :current-page="page"
      :page-size="page_size"
      :page-sizes="[10, 20, 50, 100]"
      :total="total"
      layout="total, prev, pager, next, jumper"
      @current-change="change_current"
      @size-change="table_size_change" />
  </el-dialog>
</template>

<script>
import { DEFAULT_PAGE_SIZE } from '@/utils/constant'
import { get_member_plan_flow_list } from '@/api/interactive'

export default {
  name: '',
  beforecreate: function() {
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    uid: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      member_list: [],
      page: 1,
      page_size: DEFAULT_PAGE_SIZE,
      total: 0
    }
  },
  computed: {},
  watch: {
    visible: {
      handler: function(val) {
        if (val) {
          this.fetch_member_plan_flow_list()
        }
      },
      immediate: true
    }
  },
  mounted: function() {},
  methods: {
    fetch_member_plan_flow_list() {
      const options = {
        user_id: this.uid,
        page_no: this.page,
        page_num: this.page_size
      }
      get_member_plan_flow_list(options).then(r => {
        this.member_list = r.data
      })
    },
    table_size_change: function(size) {
      this.page_size = size
    },
    change_current: function(page) {
      this.page = page
    },
    close() {
      this.$emit('callback')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-card {
  width: 100%;
  height: 100%;
}
</style>
