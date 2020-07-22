<template>
  <div class="create-work-orders">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="7" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">工单编号:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.ticket_no"
                    size="mini"
                    clearable
                    placeholder="请输入工单编号"
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="7" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">工单标题:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.ticket_title"
                    size="mini"
                    clearable
                    placeholder="请输入工单标题"
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="7" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">紧急程度:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.degree"
                    size="mini"
                    clearable
                    placeholder="请选择紧急程度"
                    @change="search">
                    <el-option
                      v-for="item in work_orders_urgency_degree"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="7" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">工单状态:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.state"
                    size="mini"
                    clearable
                    placeholder="请选择工单状态"
                    @change="search">
                    <el-option
                      v-for="item in work_orders_status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="7" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">终端类型:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.device_type_name"
                    size="mini"
                    clearable
                    placeholder="请输入终端类型"
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="7" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">工单类别:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.ticket_type_name"
                    size="mini"
                    clearable
                    placeholder="请输入工单类别"
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="7" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">问题分类:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.question_type_name"
                    size="mini"
                    clearable
                    placeholder="请输入问题分类"
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="7" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">问题细分:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.question_detail_name"
                    size="mini"
                    clearable
                    placeholder="请输入问题细分"
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="7" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">家长手机号:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.p_phone"
                    size="mini"
                    clearable
                    placeholder="请输入家长手机号"
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="7" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">处理人:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.assigned_ao_name"
                    size="mini"
                    clearable
                    placeholder="请输入处理人"
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="7" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">问题归类:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.problem_type"
                    size="mini"
                    clearable
                    placeholder="请选择问题归类"
                    @change="search">
                    <el-option
                      v-for="item in work_orders_question_classifies"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="7" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">创建人:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.applicant_name"
                    size="mini"
                    clearable
                    placeholder="请输入创建人"
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="4" class="order-number-list">创建时间:</el-col>
                <el-col :span="20">
                  <el-date-picker
                    v-model="datetime_range"
                    end-placeholder="结束日期"
                    range-separator="至"
                    start-placeholder="开始日期"
                    type="daterange"
                    clearable
                    size="mini"
                    unlink-panels
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="16" :xl="16" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <gl-button pid="20105" size="mini" type="success" @click="add_work_order">创建工单</gl-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="table-content">
        <el-table
          v-loading="loading"
          :data="work_orders"
          size="mini"
          stripe>
          <el-table-column
            align="center"
            label="工单编号"
            prop="ticket_no" />
          <el-table-column
            label="工单标题"
            width="300"
            align="center">
            <template slot-scope="scope">
              <p
                :title="scope.row.ticket_title"
                class="ticket-title gl-global-violet"
                @click="edit_work_order(scope.row)">{{ scope.row.ticket_title | beautifyWordsFormatter(30) }}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="紧急程度"
            prop="degree_label">
            <template slot-scope="scope">
              <p
                :title="scope.row.degree_label"
                :class="{'gl-global-red': scope.row.degree === '1'}">{{ scope.row.degree_label }}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="工单类别"
            prop="ticket_type_name" />
          <el-table-column
            align="center"
            label="问题分类"
            prop="question_type_name" />
          <el-table-column
            align="center"
            label="问题细分"
            prop="question_detail_name" />
          <el-table-column
            align="center"
            label="家长手机号"
            prop="p_phone" />
          <el-table-column
            align="center"
            label="工单状态">
            <template slot-scope="scope">
              <p
                :title="scope.row.ticket_title"
                :class="{'gl-global-red': scope.row.state === '3', 'gl-global-red': scope.row.state === '4', 'gl-global-green': scope.row.state === '1'}">
                {{ scope.row.state_label }}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="处理人"
            prop="assigned_ao_name" />
          <el-table-column
            align="center"
            label="问题归类"
            prop="problem_type_label" />
          <el-table-column
            align="center"
            label="创建人"
            prop="applicant_name" />
          <el-table-column
            width="136"
            align="center"
            label="创建时间"
            prop="create_time_label" />
          <el-table-column
            width="136"
            align="center"
            label="最近更新时间"
            prop="update_time_label" />
          <el-table-column
            align="center"
            label="操作"
            width="174"
            prop="control">
            <template slot-scope="scope">
              <gl-button
                pid="20106"
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="edit_work_order(scope.row)">编辑</gl-button>
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
  </div>
</template>

<script>
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import {
  ADVERTISE_PLATFORM_TYPES, DATE_TIME_FORMAT,
  TABLE_PAGE_SIEZS_LIST, WORK_ORDERS_QUESTION_CLASSIFIES,
  WORK_ORDERS_STATUS,
  WORK_ORDERS_URGENCY_DEGREE
} from '@/utils/constant'
import { get_work_orders } from '@/api/work_order_system'
import { beautifyWordsFormatter } from '@/filters'
import { date_formatter, get_value_from_map_list } from '@/utils/common'

export default {
  name: 'CreateWorkOrders',
  components: {},
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      query_sets: {
        page_type: '01',
        ticket_no: '',
        ticket_title: '',
        degree: '',
        state: '',
        ticket_type_name: '',
        device_type_name: '',
        question_type_name: '',
        question_detail_name: '',
        problem_type: '',
        p_phone: '',
        assigned_ao_name: '',
        applicant_name: '',
        begin_time: '',
        end_time: ''
      },
      datetime_range: [],
      work_orders: [],
      work_orders_urgency_degree: WORK_ORDERS_URGENCY_DEGREE,
      work_orders_status: WORK_ORDERS_STATUS,
      advertise_platform_types: ADVERTISE_PLATFORM_TYPES,
      work_orders_question_classifies: WORK_ORDERS_QUESTION_CLASSIFIES,
      work_orders_types: [], // 工单类别
      work_orders_classification: [], // 问题分类
      work_orders_subdivide: [], // 问题细分
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0
    }
  },
  mounted: function() {
    this.search()
  },
  methods: {
    get_condition() {
      const query_params = JSON.parse(JSON.stringify(this.query_sets))
      const pure_params = {}
      for (const i of Object.keys(query_params)) {
        if (query_params[i]) {
          pure_params[i] = query_params[i]
        }
      }
      return pure_params
    },
    get_condition_with_pagination() {
      const condition = this.get_condition()
      /* 分页机制 */
      condition['page_no'] = this.page
      condition['page_num'] = this.page_size
      if (this.datetime_range && this.datetime_range.length === 2) {
        condition['begin_time'] = '' + this.query_set.datetime_range[0].getTime()
        condition['end_time'] = '' + this.query_set.datetime_range[1].getTime()
      }
      return condition
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.search()
    },
    change_current: function(page) {
      this.page = page
      this.search()
    },
    add_work_order: function() {
      // 创建工单
      const name = 'WorkOrdersSystemDetails'
      const query = {
        action: 1,
        ticket_id: 0
      }
      const router_data = this.$router.resolve({ name, query })
      window.open(router_data.href, '_blank', 'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes')
    },
    edit_work_order: function(row) {
      const name = 'WorkOrdersSystemDetails'
      const query = {
        action: 2,
        ticket_id: row.ticket_id
      }
      const router_data = this.$router.resolve({ name, query })
      window.open(router_data.href, '_blank', 'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes')
    },
    refresh() {
      this.this.page = 1
      this.fetch_work_orders()
    },
    search() {
      this.fetch_my_create_work_orders()
    },
    fetch_my_create_work_orders() {
      this.loading = true
      const config = this.get_condition_with_pagination()
      get_work_orders(config).then(res => {
        if (res.status === 0) {
          // 工单列表接口
          this.work_orders = res.data.map(r => {
            const short_ticket_title = beautifyWordsFormatter(r.ticket_title, 10)
            const degree_label = get_value_from_map_list(r.degree, WORK_ORDERS_URGENCY_DEGREE)
            const state_label = get_value_from_map_list(r.state, WORK_ORDERS_STATUS)
            const problem_type_label = get_value_from_map_list(r.state, WORK_ORDERS_QUESTION_CLASSIFIES)
            const create_time_label = date_formatter(r.create_time, DATE_TIME_FORMAT)
            const update_time_label = date_formatter(r.update_time, DATE_TIME_FORMAT)
            return {
              ...r,
              short_ticket_title,
              degree_label,
              state_label,
              problem_type_label,
              create_time_label,
              update_time_label
            }
          })
          this.total = res.total_count
        } else {
          this.work_orders = []
          this.total = 0
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$select_box_witdh: 120px;
$label_height: 40px;

.create-work-orders {
  width: 100%;
  height: 100%;
  /*min-height: 480px;*/
  padding: 20px 10px 25px 10px;
  display: flex;
  flex-direction: column;

  .content-body {
    border: 1px solid #EAEAEA;
    height: 100%;
    min-height: 120px;

    .search-area {
      padding: 20px 20px 0 20px;

      .row-bg {
        .col-bg {
          padding: 5px 0;

          &.layout-right {
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

    .table-content {
      margin: 20px;

      .ticket-title {
        cursor: pointer;
      }
    }
  }
}
</style>

