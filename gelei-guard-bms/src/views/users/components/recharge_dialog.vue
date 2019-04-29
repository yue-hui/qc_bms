<template>
  <el-dialog
    :before-close="close"
    :visible.sync="visible"
    title="交易记录"
  >
    <el-table
      :data="recharge_list"
      size="mini"
      empty-text="该用户暂时没有交易记录"
    >
      <el-table-column
        align="center"
        label="订单号"
        prop="order_no"
        width="180" />
      <el-table-column
        align="center"
        label="交易单号"
        prop="pay_order_no"
        width="150" />
      <el-table-column
        align="center"
        label="交易时间"
        prop="order_time_label"
        width="150" />
      <el-table-column
        align="center"
        label="用户名"
        prop="nick_name" />
      <el-table-column
        align="center"
        label="交易类型"
        prop="order_type" />
      <el-table-column
        align="center"
        label="交易金额"
        prop="order_amount_label" />
      <el-table-column
        align="center"
        label="支付方式"
        prop="pay_type" />
      <el-table-column
        align="center"
        label="订单状态"
        prop="order_status" />
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
import { DATE_TIME_FORMAT, DEFAULT_PAGE_SIZE } from '@/utils/constant'
import { get_order_list } from '@/api/interactive'
import { date_formatter, formatter_transaction_amount } from '@/utils/common'

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
      recharge_list: [],
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
    order_list_map(data) {
      return data.map(r => {
        const order_time_label = date_formatter(r.order_time, DATE_TIME_FORMAT)
        const order_amount_label = formatter_transaction_amount(r.order_amount)
        return {
          ...r,
          order_amount_label,
          order_time_label
        }
      })
    },
    fetch_order_list() {
      const options = {
        user_id: this.uid,
        page_no: this.page,
        page_num: this.page_size
      }
      get_order_list(options).then(res => {
        if (res.status === 0) {
          this.recharge_list = this.order_list_map(res.data)
        }
      })
    },
    table_size_change: function(size) {
      this.page_size = size
      this.fetch_order_list()
    },
    change_current: function(page) {
      this.page = page
      this.fetch_order_list()
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
