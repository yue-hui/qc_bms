<template>
  <div class="content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">订单号:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.order_no"
                    size="mini"
                    placeholder="订单号"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">订单详情:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.order_desc"
                    size="mini"
                    placeholder="订单详情"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">订单状态:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.order_status"
                    size="mini"
                    placeholder="订单状态"
                    clearable
                    @change="query_condition_change">
                    <el-option
                      v-for="item in order_status_list"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">交易方式:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.pay_type"
                    size="mini"
                    placeholder="交易方式"
                    clearable
                    @change="query_condition_change">
                    <el-option
                      v-for="item in pay_type_mode"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">用户名:</el-col>
                <el-col :span="16">
                  <el-input v-model="query_sets.nick_name" size="mini" clearable @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="10" class="order-number-list">用户联系方式:</el-col>
                <el-col :span="14">
                  <el-input v-model="query_sets.contact_phone" size="mini" clearable @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="18" :sm="16" :md="12" :lg="10" :xl="8" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="4" class="order-number-list">交易时间:</el-col>
                <el-col :span="16">
                  <el-date-picker
                    v-model="query_sets.order_time_range"
                    type="datetimerange"
                    size="mini"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="6" :sm="8" :md="24" :lg="2" :xl="16" class="col-bg layout-right col-right-button">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-button
                  :loading="download_loading"
                  size="mini"
                  type="success"
                  @click="download"><i class="el-icon-download el-icon" />导出
                </el-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          :data="order_data"
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="订单号"
            prop="order_no"
            width="160" />
          <el-table-column
            align="center"
            label="交易单号"
            prop="pay_order_no"
            width="130" />
          <el-table-column
            align="center"
            label="交易时间"
            prop="order_time_label"
            width="132" />
          <el-table-column
            align="center"
            label="用户名"
            prop="nick_name" />
          <el-table-column
            align="center"
            label="订单详情"
            prop="order_desc" />
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
            prop="order_status">
            <template slot-scope="scope">
              <span
                :style="{'color': get_order_status_style(scope.row.order_status)}">{{ scope.row.order_status }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="用户联系方式"
            prop="contact_phone" />
        </el-table>
        <el-pagination
          :current-page="page"
          :page-size="page_size"
          :page-sizes="page_sizes"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="change_current"
          @size-change="table_size_change" />
      </div>
      <div class="data-statistics">
        <div class="data-statistics-content">
          <div v-if="total_amount !== ''" class="data-item">
            <div class="name">交易成功合计:</div>
            <div class="value" v-text="total_amount" />
            <div class="name">元</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  COMMODITY_TYPE,
  DATE_TIME_FORMAT,
  ORDER_MANAGEMENT_LIST_NAME,
  ORDER_STATUS_LIST, TABLE_PAGE_SIEZS_LIST,
  TRANSCATION_MODE
} from '@/utils/constant'
// import dayjs from 'dayjs'
import { get_order_list } from '@/api/interactive'
import { date_formatter, formatter_transaction_amount } from '@/utils/common'
import { fetch_all_order_filter_list } from '@/api/merge'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'

export default {
  components: {},
  data() {
    // const now_time = dayjs()
    // const month_ago = dayjs().subtract(1, 'month')
    const page_size = getPagenationSize()
    return {
      query_sets: {
        order_no: '',
        order_time_range: [],
        order_desc: '',
        order_status: '',
        pay_type: '',
        nick_name: '',
        contact_phone: ''
      },
      order_source: COMMODITY_TYPE,
      order_status_list: ORDER_STATUS_LIST,
      pay_type_mode: TRANSCATION_MODE,
      order_data: [],
      download_loading: false,
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      total_amount: '' // 查询当页统计金额
    }
  },
  computed: {},
  mounted: function() {
    this.init()
  },
  methods: {
    get_order_status_style(status_name) {
      if (status_name === '交易成功') {
        return '#55ff5b'
      } else if (status_name === '待支付') {
        return '#ff0000'
      } else if (status_name === '已支付') {
        return '#55ff5b'
      } else if (status_name === '已超时') {
        return '#55965b'
      } else if (status_name === '已退款') {
        return '#55965b'
      } else if (status_name === '交易取消') {
        return '#55965b'
      } else {
        return ''
      }
    },
    init() {
      // 列表数据
      this.fetch_order_list()

      // 搜索列表数据
      fetch_all_order_filter_list().then(res => {
        this.order_source = res.order_source
        this.order_status_list = res.order_status_list
        this.pay_type_mode = res.pay_type_mode
      })
    },
    get_condition() {
      const query_params = JSON.parse(JSON.stringify(this.query_sets))
      const order_time_range = query_params.order_time_range
      delete query_params.order_time_range
      let condition = {}
      if (order_time_range[0] && order_time_range[1]) {
        const begin_time = new Date(order_time_range[0]).getTime()
        const end_time = new Date(order_time_range[1]).getTime()
        condition = {
          begin_time,
          end_time
        }
      }
      for (const i of Object.keys(query_params)) {
        if (query_params[i]) {
          condition[i] = query_params[i]
        }
      }
      return condition
    },
    get_condition_with_pagination() {
      const condition = this.get_condition()
      condition['page_no'] = this.page
      condition['page_num'] = this.page_size
      return condition
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
    query_condition_change() {
      this.page = 1
      this.page_size = getPagenationSize()
      this.query()
    },
    query() {
      this.fetch_order_list()
    },
    fetch_order_list() {
      /* 获取订单列表 */
      const data = this.get_condition_with_pagination()
      get_order_list(data).then(res => {
        if (res.status === 0) {
          this.order_data = this.order_list_map(res.data)
          this.total = res.total_count
          this.total_amount = res.total_amount
        } else {
          this.total = 0
          this.total_amount = 0
        }
      })
    },
    download: function() {
      this.download_loading = true
      const condition = this.get_condition()
      const options = {
        ...condition,
        page_no: 1,
        page_num: this.total
      }
      const start_time_string = date_formatter(condition['begin_time'])
      const end_time_string = date_formatter(condition['end_time'])
      let filename
      if (start_time_string === end_time_string) {
        filename = [ORDER_MANAGEMENT_LIST_NAME, start_time_string].join('_')
      } else {
        filename = [ORDER_MANAGEMENT_LIST_NAME, start_time_string, end_time_string].join('_')
      }
      get_order_list(options).then(res => {
        const data_list = this.order_list_map(res.data)
        import('@/utils/Export2Excel').then(excel => {
          const t_header = ['订单号', '交易单号', '交易时间', '用户名',
            '订单详情', '交易金额', '支付方式', '订单状态', '用户联系方式']
          // filter_val 必须为存在的字段，且filter_val的长度要小于t_header的长度
          const filter_val = ['order_no', 'pay_order_no', 'order_time_label', 'nick_name',
            'order_desc', 'order_amount_label', 'pay_type', 'order_status', 'contact_phone']
          const data = this.formatJson(filter_val, data_list)
          const options = {
            header: t_header,
            data,
            filename,
            autoWidth: true,
            bookType: 'xlsx'
          }
          excel.export_json_to_excel(options)
          this.download_loading = false
        })
      }).finally(() => {
        this.download_loading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return v[j]
        } else {
          return v[j]
        }
      }))
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

  .content-body {
    position: relative;
    border: 1px solid #c7d5ee;
    height: 100%;
    min-height: 120px;

    .search-area {
      padding: 20px 20px 0 20px;

      .row-bg {
        .col-bg {
          padding: 5px 0;

          &.col-right-button {
            text-align: right;
          }

          .order-number-list {
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            font-weight: bold;
            color: #4d4d4d;
            white-space: nowrap;
          }
        }
      }
    }

    .between-search-area-and-table-display {
      height: 1px;
      margin: 10px 20px 15px 20px;
      background-color: #d0d0d7;
    }

    .table-content {
      margin: 20px;
    }

    .data-statistics {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0 20px 20px 0;

      .data-statistics-content {
        position: relative;
        padding: 2px 5px;

        .data-item {
          display: flex;
          flex-direction: row;
          font-size: 14px;
          font-weight: normal;
          color: #606266;
          height: 28px;
          line-height: 28px;
          vertical-align: center;

          .name {
            user-select: none;
            padding-right: 2px;
          }

          .value {
            color: red;
            font-size: 18px;
            font-weight: 600;
            padding: 0 2px;
          }
        }
      }
    }
  }
}
</style>
