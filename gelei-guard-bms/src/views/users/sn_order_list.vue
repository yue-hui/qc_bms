<template>
  <div class="content users-order-list">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">订单号:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.orderNo"
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
                <el-col :span="8" class="order-number-list">家长姓名:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.parentName"
                    size="mini"
                    placeholder="家长姓名"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">家长手机号:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.phone"
                    size="mini"
                    placeholder="家长手机号"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">SN号:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.sn"
                    size="mini"
                    placeholder="SN号"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">付费类型:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.payType"
                    size="mini"
                    placeholder="付费类型"
                    clearable
                    @change="query_condition_change">
                    <el-option label="购买" value="1" />
                    <el-option label="赠送" value="0" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">审核状态:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.auditState"
                    size="mini"
                    placeholder="审核状态"
                    clearable
                    @change="query_condition_change">
                    <el-option label="已通过" value="1" />
                    <el-option label="未通过" value="0" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">绑定状态:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.bindState"
                    size="mini"
                    placeholder="绑定状态"
                    clearable
                    @change="query_condition_change">
                    <el-option label="已绑定" value="1" />
                    <el-option label="未绑定" value="0" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">激活状态:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.activeState"
                    size="mini"
                    placeholder="激活状态"
                    clearable
                    @change="query_condition_change">
                    <el-option label="已激活" value="1" />
                    <el-option label="未激活" value="0" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">SN状态:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.snState"
                    size="mini"
                    placeholder="SN状态"
                    clearable
                    @change="query_condition_change">
                    <el-option label="有效" value="1" />
                    <el-option label="无效" value="0" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="1" :sm="12" :md="3" :lg="14" :xl="12" class="col-bg layout-right col-right-button">
            <div class="grid-content bg-purple-light">
              <el-row>
                <gl-button
                  :loading="download_loading"
                  pid="20007"
                  size="mini"
                  type="success"
                  @click="add_sn_order">新增SN
                </gl-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          v-loading="loading"
          :data="order_data"
          size="mini"
          stripe>
          <el-table-column
            align="center"
            label="订单号"
            prop="orderNo"
            width="160" />
          <el-table-column
            align="center"
            label="家长名称"
            prop="parentName"
            width="136" />
          <el-table-column
            align="center"
            label="家长手机号"
            prop="phone"
            width="132" />
          <el-table-column
            align="center"
            label="SN"
            prop="sn" />
          <el-table-column
            align="center"
            label="付费类型"
            prop="payType">
            <template slot-scope="scope">
              <span :style="{'color': get_order_status_style(scope.row.payType)}">{{ scope.row.payType==1?'购买':'赠送' }}</span>
            </template>
          </el-table-column>
            <el-table-column
            align="center"
            label="支付状态"
            prop="status">
            <template slot-scope="scope">
              <span :style="{'color': get_snorder_status_style(scope.row.status)}">{{ scope.row.status==99?'成功':'未支付' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="购买时间"
            prop="payTime" />
          <el-table-column
            align="center"
            label="到期时间"
            prop="payEndTime" />
          <el-table-column
            align="center"
            label="审核状态"
            prop="auditState">
            <template slot-scope="scope">
              <span :style="{'color': get_order_status_style(scope.row.auditState)}">{{ scope.row.auditState==1?'已通过':'未通过' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="审核时间"
            prop="auditTime" />
          <el-table-column
            align="center"
            label="激活状态"
            prop="activeState">
            <template slot-scope="scope">
              <span :style="{'color': get_order_status_style(scope.row.activeState)}">{{ scope.row.activeState==1?'已激活':'未激活' }}</span>
            </template>
          </el-table-column>
           <el-table-column
            align="center"
            label="激活时间"
            prop="activeTime" />
          <el-table-column
            align="center"
            label="绑定时间"
            prop="bindTime" />
          <el-table-column
            align="center"
            label="绑定状态"
            prop="bindState" >
           <template slot-scope="scope">
              <span :style="{'color': get_order_status_style(scope.row.bindState)}">{{ scope.row.bindState==1?'已绑定':'未绑定' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="SN状态"
            prop="snState">
             <template slot-scope="scope">
              <span :style="{'color': get_order_status_style(scope.row.snState)}">{{ scope.row.snState==1?'有效':'无效' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="174"
            prop="control">
           <template slot-scope="scope">
               <gl-button
                pid="20010"
                size="small"
                :disabled="scope.row.auditState==1||scope.row.status!=99"
                style="text-decoration: underline;"
                type="text"
                @click="audit_sn_order(scope.row)"
               >通过
              </gl-button>
              <gl-button
                pid="20008"
                size="small"
                style="text-decoration: underline;"
                type="text"
                :disabled="scope.row.auditState==1"
                @click="edit_sn_order(scope.row)"
                >编辑
              </gl-button>
            </template>
          </el-table-column>
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
    </div>
    <sn-order-create-edit v-if="action" :action="action" :current="current" @callback="close_package_dialog" />
  </div>
</template>

<script>
import {
  COMMODITY_TYPE,
  DATE_TIME_FORMAT,
  ORDER_MANAGEMENT_LIST_NAME,
  TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
// import dayjs from 'dayjs'
import { getSnorderList,approvedSnOrder } from '@/api/interactive'
import { date_formatter, formatter_transaction_amount, get_value_from_map_list } from '@/utils/common'
import { fetch_all_order_filter_list } from '@/api/merge'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { PATRIARCH_MEMBER_TYPES } from '../../utils/constant'
import snOrderCreateEdit from './components/sn_order_create_edit'

export default {
  components: {
    snOrderCreateEdit
  },
  data() {
    // const now_time = dayjs()
    // const month_ago = dayjs().subtract(1, 'month')
    const page_size = getPagenationSize()
    const patriarch_member_types = PATRIARCH_MEMBER_TYPES.filter(r => ['02', '03'].indexOf(r.value) !== -1)
    return {
      loading: false,
      query_sets: {
        orderNo: '',
      },
      patriarch_member_types,
      payType: [
        { label: '赠送', value: '0' },
        { label: '购买', value: '1' }
      ],
      order_source: COMMODITY_TYPE,
      order_status_list: [],
      pay_type_mode: [],
      order_data: [],
      download_loading: false,
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      total_amount: '', // 查询当页统计金额
      action: 0,
      current:{},
    }
  },
  computed: {},
  mounted: function() {
    this.init()
  },
  methods: {
     close_package_dialog(refresh = false) {
      this.action = 0
      this.current = {}
      if (refresh) {
        this.fetch_order_list()
      }
    },
    get_order_status_style(status_name) {
      if (status_name === '1') {
        return '#55ff5b'
      } else if (status_name === '0') {
        return '#ff0000'
      }
    },
     get_snorder_status_style(status_name) {
      if (status_name === '99') {
        return '#55ff5b'
      } else if (status_name === '01') {
        return '#ff0000'
      }
    },
    init() {
      // 列表数据
      this.fetch_order_list()
    },
    get_condition() {
      const query_params = JSON.parse(JSON.stringify(this.query_sets))
      const order_time_range = query_params.order_time_range
      delete query_params.order_time_range
      let condition = {}
      if (order_time_range && order_time_range[0] && order_time_range[1]) {
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
        const member_type_label = get_value_from_map_list(r.member_type, PATRIARCH_MEMBER_TYPES)
        return {
          ...r,
          order_amount_label,
          order_time_label,
          member_type_label,
          _renew_type: String(r.renew_type) === '2' ? '自动续费' : '非自动续费'
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
      this.loading = true
      getSnorderList(data).then(res => {
        if (res.status === 0) {
          this.order_data = this.order_list_map(res.data)
          this.total = res.total_count
          this.total_amount = res.total_amount
        } else {
          this.total = 0
          this.total_amount = 0
        }
      }).finally(() => {
        this.loading = false
      })
    },
   /* 审核SN订单 */
   audit_sn_order(row){
       this.$confirm('确认审核通过该SN吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        approvedSnOrder({
          orderId: row.orderId
        })
          .then(res => {
            if (res.status !== 0) throw res
              this.$message.success('操作成功')
              this.init()
          })
          .catch(e => {
            this.$message.error(e.message)
          })
      }).catch(() => {
      })
   },
   edit_sn_order(row){
      this.action = 2
      this.current = row
   },
    add_sn_order(){
      this.action = 1
      this.current = {}
   },
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
    border: 1px solid #EAEAEA;
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
