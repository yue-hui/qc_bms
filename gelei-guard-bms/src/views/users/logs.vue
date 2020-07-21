<template>
  <div class="device-recorrd-content users-logs-page">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="5" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="7" class="order-number-list">手机号/设备ID:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.context"
                    size="mini"
                    placeholder="请输入家长/孩子手机号或设备ID"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="7" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="5" class="order-number-list">使用时间:</el-col>
                <el-col :span="17">
                  <el-date-picker
                    v-model="query_sets.datetime_range"
                    :picker-options="pickerOptions"
                    style="width: 100%"
                    end-placeholder="结束日期"
                    range-separator="至"
                    start-placeholder="开始日期"
                    type="datetimerange"
                    size="mini"
                    popper-class="picker-date-time-class"
                    unlink-panels
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="5" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="7" class="order-number-list">WebSocket:</el-col>
                <el-col :span="16">
                  <el-select v-model="query_sets.socket_status" style="width: 100%" size="mini" multiple placeholder="请选择" @change="socket_status_change">
                    <el-option
                      key="连接"
                      clearable
                      label="连接"
                      value="connect"/>
                    <el-option
                      key="断开"
                      clearable
                      label="断开"
                      value="disconnect"/>
                    <el-option
                      key="ping"
                      clearable
                      label="ping"
                      value="ping"/>
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          v-loading="loading"
          :data="table_list"
          size="mini"
          stripe>
          <el-table-column
            align="center"
            label="时间"
            prop="time"
            width="180" />
          <el-table-column
            align="center"
            width="200"
            label="traceId"
            prop="traceId" />
          <el-table-column
            align="center"
            width="200"
            label="type"
            prop="type" />
          <el-table-column
            align="center"
            label="massage"
            prop="message" />
        </el-table>
        <!--去除分页、等后端返回 total 打开就可以-->
        <el-pagination
          v-if="false"
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
import {
  TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import { setPagenationSize } from '@/utils/auth'
import { get_device_ali_log } from '@/api/interactive'

export default {
  name: 'UserLogs',
  components: {},
  data() {
    const startTime = new Date()
    startTime.setHours(0)
    startTime.setMinutes(0)
    startTime.setSeconds(0)
    const endTime = new Date()
    endTime.setHours(23)
    endTime.setMinutes(59)
    endTime.setSeconds(59)
    return {
      loading: false,
      query_sets: {
        context: '',
        datetime_range: [startTime, endTime],
        socket_status: []
      },
      total: 0,
      page: 1,
      page_size: 100,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      table_list: [],
      pickerOptions: {
        shortcuts: [{
          text: '1分钟',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 60 * 1000)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '5分钟',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 5 * 60 * 1000)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '15分钟',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 15 * 60 * 1000)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '1小时',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 60 * 60 * 1000)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '3小时',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3 * 60 * 60 * 1000)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '6小时',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 6 * 60 * 60 * 1000)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '12小时',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 12 * 60 * 60 * 1000)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  mounted: function() {
    // this.get_list()
  },
  methods: {
    query_condition_change: function() {
      // 时间发生改变
      this.page = 1
      this.get_list()
    },

    table_size_change: function(size) {
      this.page_size = size
      this.page = 1
      setPagenationSize(size)
      this.get_list()
    },
    change_current: function(page) {
      // 分页发生改变
      this.page = page
      this.get_list()
    },
    get_list: function() {
      if (!this.query_sets.context) return
      const data = {}
      data.context = this.query_sets.context
      // 开始时间
      data.start_date = (() => {
        if (Array.isArray(this.query_sets.datetime_range) &&
          this.query_sets.datetime_range.length === 2) {
          return String(this.query_sets.datetime_range[0].getTime())
        }
        return ''
      })()
      // 结束时间
      data.end_date = (() => {
        if (Array.isArray(this.query_sets.datetime_range) && this.query_sets.datetime_range.length === 2) {
          return String(this.query_sets.datetime_range[1].getTime())
        }
        return ''
      })()
      data.socketStatus = this.query_sets.socket_status
      data.page_no = this.page
      data.page_num = this.page_size
      console.log(data)
      // return
      this.loading = true
      get_device_ali_log(data).then(res => {
        if (res.status === 0) {
          // eslint-disable-next-line no-empty
          if (res.data && res.data.length) {
            this.table_list = res.data
            this.total = res.total
          } else {
            this.table_list = []
            this.total = 0
          }
        }
      }).finally(() => {
        this.loading = false
      })
    },
    socket_status_change() {
      this.page = 1
      this.get_list()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .device-recorrd-content {
    width: 100%;
    height: 100%;
    /*min-height: 480px;*/
    padding: 20px 10px 25px 10px;
    display: flex;
    flex-direction: column;

    .content-body {
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

        .soft-item {
          display: flex;
          align-items: center;
          justify-content: start;

          img {
            width: 32px;
            height: 32px;
          }

          .soft-name {
            padding-left: 4px;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .picker-date-time-class{
    .el-picker-panel__footer{
      button:first-child{
        display: none;
      }
    }
  }
  .users-logs-page{
    .el-range__close-icon{
      display: none;
    }
  }
</style>
