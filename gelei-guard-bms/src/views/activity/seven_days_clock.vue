<template>
  <div class="seven-days-clock">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="12" :md="8" :lg="9" :xl="8" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="4" class="order-number-list">选择时间:</el-col>
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
                    @change="query" />
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
          :data="resources"
          size="mini"
          stripe>
          <el-table-column
            align="center"
            width="160"
            label="日期"
            prop="date" />
          <el-table-column
            align="center"
            label="总签到人数"
            prop="signSum" />
          <el-table-column
            align="center"
            label="新增用户第1天签到人数"
            prop="member_type_label">
            <template slot-scope="scope">
              <span>{{ scope.row['day_1'].signCount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="新增用户第2天签到人数"
            prop="is_member_label"
            width="180">
            <template slot-scope="scope">
              <p v-if="scope.row['day_2'].signCount">{{ scope.row['day_2'].signCount }}</p>
              <p v-if="scope.row['day_2'].ratio">签到率：{{ scope.row['day_2'].ratio }}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="新增用户第3天签到人数"
            prop="original_price">
            <template slot-scope="scope">
              <p v-if="scope.row['day_3'].signCount">{{ scope.row['day_3'].signCount }}</p>
              <p v-if="scope.row['day_3'].ratio">签到率：{{ scope.row['day_3'].ratio }}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="新增用户第4天签到人数"
            prop="discount_price">
            <template slot-scope="scope">
              <p v-if="scope.row['day_4'].signCount">{{ scope.row['day_4'].signCount }}</p>
              <p v-if="scope.row['day_4'].ratio">签到率：{{ scope.row['day_4'].ratio }}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="新增用户第5天签到人数"
            prop="device_type_label">
            <template slot-scope="scope">
              <p v-if="scope.row['day_5'].signCount">{{ scope.row['day_5'].signCount }}</p>
              <p v-if="scope.row['day_5'].ratio">签到率：{{ scope.row['day_5'].ratio }}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="新增用户第6天签到人数"
            prop="purchase_quota">
            <template slot-scope="scope">
              <p v-if="scope.row['day_6'].signCount">{{ scope.row['day_6'].signCount }}</p>
              <p v-if="scope.row['day_6'].ratio">签到率：{{ scope.row['day_6'].ratio }}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="新增用户第7天签到人数"
            prop="discount_start_time_label"
            width="180">
            <template slot-scope="scope">
              <p v-if="scope.row['day_7'].signCount">{{ scope.row['day_7'].signCount }}</p>
              <p v-if="scope.row['day_7'].ratio">签到率：{{ scope.row['day_7'].ratio }}</p>
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
import dayjs from 'dayjs'
import { DATE_FORMAT, TABLE_PAGE_SIEZS_LIST } from '../../utils/constant'
import { getPagenationSize, setPagenationSize } from '../../utils/auth'
import { get_seven_clock } from '../../api/interactive'
import { date_formatter } from '../../utils/common'

export default {
  name: 'SevenDaysClock',
  components: {},
  data() {
    const yesterday = new Date(dayjs().subtract('1', 'day'))
    const pre_7 = new Date(dayjs().subtract('8', 'day'))
    const page_size = getPagenationSize()
    return {
      query_sets: {
        begin_time: '',
        end_time: ''
      },
      datetime_range: [yesterday, pre_7],
      loading: false,
      resources: [],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0
    }
  },
  computed: {},
  mounted: function() {
    this.query()
  },
  methods: {
    query: function() {
      this.fetch_data()
    },
    get_condition() {
      const query_params = JSON.parse(JSON.stringify(this.query_sets))
      const condition = {}
      for (const i of Object.keys(query_params)) {
        if (query_params[i]) {
          condition[i] = query_params[i]
        }
      }
      condition['begin_time'] = this.datetime_range[0].getTime()
      condition['end_time'] = this.datetime_range[1].getTime()
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
    transfer_data: function(data) {
      const data_list = []
      data.map(item => {
        const new_item = {}
        const date = item.date
        const date_obj = dayjs(date)
        new_item['date'] = date
        new_item['signSum'] = item.signSum
        const signConfigDayVOS = item.signConfigDayVOS
        let sub_item
        for (let i = 1; i < 8; i++) {
          sub_item = signConfigDayVOS.find(r => r['whatDay'] === i)
          const key = 'day_' + i
          if (sub_item) {
            new_item[key] = sub_item
          } else {
            const current_day = date_obj.subtract(i - 1, 'day')
            new_item[key] = {
              whatDay: i,
              signCount: 0,
              ratio: 0,
              date: date_formatter(current_day, DATE_FORMAT)
            }
          }
        }
        data_list.push(new_item)
      })
      return data_list
    },
    fetch_data: function() {
      // 获取数据
      this.loading = true
      const config = this.get_condition_with_pagination()
      get_seven_clock(config).then(res => {
        if (res.status === 0) {
          this.resources = this.transfer_data(res.data)
          this.total = res.total_count
        } else {
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
.seven-days-clock {
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

    .between-search-area-and-table-display {
      height: 1px;
      margin: 10px 20px 15px 20px;
      background-color: #d0d0d7;
    }

    .table-content {
      margin: 20px;
    }
  }
}
</style>
