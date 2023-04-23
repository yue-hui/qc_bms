<template>
  <div class="device-recorrd-content users-logs-page user-logs">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="5" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="7" class="order-number-list">设备ID:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model.trim="query_sets.child_device_id"
                    size="mini"
                    placeholder="请输入设备ID"
                    clearable
                    @blur="query_id_change"
                    @keyup.enter.native="query_id_change"
                   />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="7" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="5" class="order-number-list">时间:</el-col>
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
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          :header-cell-style="{'text-align':'center'}"
          v-loading="loading"
          :data="table_list"
          size="mini"
          stripe>
          <el-table-column
            align="center"
            label="时间"
            prop="record_date"
            width="180" />
          <el-table-column
            label="操作记录"
            prop="log">
            <!-- <template slot-scope="scope">
              <div v-html="scope.row.log"/>
            </template> -->
          </el-table-column>
        </el-table>
        <!--去除分页、等后端返回 total 打开就可以-->
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
import {
  TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import { parseDateTime } from '@/utils'
import { setPagenationSize } from '@/utils/auth'
import { get_device_rule_loglist } from '@/api/interactive'

export default {
  name: 'operationRecords',
  components: {},
  data() {
    const endTime = new Date()
    // const startTime = new Date().setTime( )
    let startTime=new Date()
    startTime.setTime(new Date().getTime() - 7 *24* 60 * 60 * 1000)
    // console.log(time)
    return {
      loading: false,
      datetimeChange:false,
      query_sets: {
        child_device_id: '',
        datetime_range: [startTime, endTime],
      },
      total: 0,
      page: 1,
      page_size: 100,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      table_list: [],
      pickerOptions: {
        shortcuts: [{
            text: '1小时',
            onClick(picker) {
            const end = new Date()
            let start = new Date()
            start.setTime(start.getTime() - 60 * 60 * 1000)
            picker.$emit('pick', [start, end])
            }
          }, {
            text: '1天前',
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '3天前',
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
         }],
         disabledDate(time){
           const data=new Date
           return time.getTime()> data.getTime()||time.getTime()< data.getTime()-7*24*3600*1000
         }
      }
    }
  },
  mounted: function() {
    // this.get_list()
  },
  methods: {
    query_condition_change: function() {
        this.datetimeChange=true
        if (this.query_sets.datetime_range[1].getTime()-this.query_sets.datetime_range[0]>7*24*3600*1000) {
        this.$message.error('请选择七天内的时间查询');
        return 
      }
      // 时间发生改变
      this.page = 1
      this.get_list()
    },
    //id变化
    query_id_change:function(){
      if (!this.datetimeChange) {
        this.query_sets.datetime_range[1]= new Date()
      }
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
      if (!this.query_sets.child_device_id) return
      const data = {}
      data.child_device_id = this.query_sets.child_device_id
      // 开始时间
      data.begin_time = (() => {
        if (Array.isArray(this.query_sets.datetime_range) &&
          this.query_sets.datetime_range.length === 2) {
          return String(this.query_sets.datetime_range[0].getTime())
        }
        return ''
      })()
      // 结束时间
      data.end_time = (() => {
        if (Array.isArray(this.query_sets.datetime_range) && this.query_sets.datetime_range.length === 2) {
          return String(this.query_sets.datetime_range[1].getTime())
        }
        return ''
      })()
      data.page_no = this.page
      data.page_num = this.page_size
      // return
      this.loading = true
      get_device_rule_loglist(data).then(res => {
        if (res.status === 0) {
          // eslint-disable-next-line no-empty
          if (res.data && res.data.length) {
            this.table_list = res.data.map(item=>{
              item.record_date=parseDateTime('y-m-d h:i:s',item.record_date)
              return item
            })
            this.total = res.total_count
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
    .active-context-text{
     background-color: #ffff00;
      padding: 0 2px;
    }
  }
</style>
