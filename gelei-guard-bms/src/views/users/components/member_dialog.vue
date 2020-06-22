<template>
  <el-dialog
    :before-close="close"
    :visible.sync="visible"
    title="会员记录"
    width="70%"
  >
    <el-table
      :data="member_list"
      empty-text="该用户无会员记录"
    >
      <el-table-column align="center" prop="nick_name" label="用户名" width="150" />
      <el-table-column align="center" prop="create_time_label" label="时间" width="200" />
      <el-table-column align="center" prop="plan_name" label="会员获得路径" />
      <el-table-column align="center" prop="member_type_label" label="会员类型" />
      <el-table-column align="center" prop="acquisition_type" label="获得方式" />
      <el-table-column align="center" prop="actual_price" label="交易金额(元)" />
      <el-table-column align="center" prop="valid_days" label="会员天数" />
    </el-table>
    <el-pagination
      :current-page="page"
      :page-size="page_size"
      :page-sizes="page_sizes"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="change_current"
      @size-change="table_size_change" />
  </el-dialog>
</template>

<script>
import { DATE_MINUTE_FORMAT, PATRIARCH_MEMBER_TYPES, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { get_member_plan_flow_list } from '@/api/interactive'
import { date_formatter, get_value_from_map_list } from '@/utils/common'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'

export default {
  name: '',
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
    const page_size = getPagenationSize()
    return {
      member_list: [],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
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
        this.member_list = r.data.map(r => {
          const create_time_label = date_formatter(r.create_time, DATE_MINUTE_FORMAT)
          const member_type_label = get_value_from_map_list(r.member_type, PATRIARCH_MEMBER_TYPES)
          return {
            ...r,
            create_time_label,
            member_type_label
          }
        })
        this.total = r.total_count
      })
    },
    query() {
      this.fetch_member_plan_flow_list()
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.query()
    },
    change_current: function(page) {
      this.page = page
      this.query()
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
