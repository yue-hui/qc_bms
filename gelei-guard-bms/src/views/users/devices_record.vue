<template>
  <div class="device-recorrd-content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">孩子手机号:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.phone"
                    size="mini"
                    placeholder="孩子手机号"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">孩子设备ID:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.child_device_id"
                    size="mini"
                    placeholder="孩子设备ID"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">使用间隔:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.use_interval"
                    size="mini"
                    placeholder="使用间隔"
                    clearable
                    @change="user_intervals_change">
                    <el-option
                      v-for="item in device_user_intervals"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="5" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">应用名称:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.soft_name"
                    size="mini"
                    placeholder="应用名称"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">使用时间:</el-col>
                <el-col :span="16">
                  <el-date-picker
                    v-model="query_sets.datetime_range"
                    :disabled="query_sets.use_interval === '01'"
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
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          v-loading="loading"
          :data="device_list"
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="孩子昵称"
            prop="nick_name"
            width="240" />
          <el-table-column
            align="center"
            label="孩子手机号"
            prop="phone" />
          <el-table-column
            align="center"
            label="孩子设备ID"
            prop="device_id" />
          <el-table-column
            align="center"
            label="使用应用包名"
            prop="bundle_id" />
          <el-table-column
            align="center"
            label="应用名称"
            prop="soft_name">
            <template slot-scope="scope">
              <div class="soft-item">
                <img v-if="scope.row.soft_icon" :src="scope.row.soft_icon" :onerror="img_error_icon" class="origin" alt="软件图标">
                <span class="soft-name">{{ scope.row.soft_name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="使用时长（秒）"
            prop="total_used_time" />
          <el-table-column
            align="center"
            label="临时可用时间"
            prop="total_used_time_temp" />
          <el-table-column
            align="center"
            label="使用时间"
            width="140"
            prop="record_time_label" />
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
import { DATE_FORMAT, DEVICE_USER_INTERVALS, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { get_child_use_recorder } from '@/api/interactive'
import { date_formatter, get_start_or_end_timestamp, pure_object_null_value } from '@/utils/common'

export default {
  name: 'DevicesRecord',
  components: {},
  data() {
    const page_size = getPagenationSize()
    const img_error_icon = 'this.src="' + require('@/assets/imgs/bg_icon_no.png') + '"'
    return {
      loading: false,
      img_error_icon,
      query_sets: {
        phone: '',
        child_device_id: '',
        use_interval: '01',
        soft_name: '',
        datetime_range: ['', '']
      },
      total: 0,
      page: 1,
      device_user_intervals: DEVICE_USER_INTERVALS,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      child_platform_type: [],
      device_list: []
    }
  },
  computed: {},
  mounted: function() {
    this.fetch_child_device_use_app_recorder()
  },
  methods: {
    get_condition_with_pagination() {
      const query_sets = this.query_sets
      let condition = {}
      condition['page_no'] = this.page
      condition['page_num'] = this.page_size
      condition['phone'] = query_sets.phone
      condition['soft_name'] = query_sets.soft_name
      condition['child_device_id'] = query_sets.child_device_id
      const use_interval = query_sets.use_interval
      if (use_interval === '02') {
        condition['begin_time'] = get_start_or_end_timestamp(query_sets.datetime_range[0])
        condition['end_time'] = get_start_or_end_timestamp(query_sets.datetime_range[1], false)
      }
      condition = pure_object_null_value(condition)
      return condition
    },
    query_condition_change: function() {
      this.page = 1
      this.page_size = getPagenationSize()
      this.query()
    },
    query() {
      this.fetch_child_device_use_app_recorder()
    },
    search: function() {
      this.query()
    },
    user_intervals_change: function(item) {
      if (item === '01') {
        this.query_sets.datetime_range = ['', '']
      } else {
        const now = new Date()
        const pre_week = new Date(now.getTime() - 6 * 24 * 3600 * 1000)
        this.query_sets.datetime_range = [pre_week, now]
      }
      this.query_condition_change()
    },
    table_size_change: function() {
      this.page_size = size
      setPagenationSize(size)
      this.fetch_child_device_use_app_recorder()
    },
    change_current: function(page) {
      this.page = page
      this.fetch_child_device_use_app_recorder()
    },
    transfer_data: function(data) {
      let record_time_label
      return data.map(r => {
        if (this.query_sets.use_interval === '01') {
          record_time_label = [r.record_time.slice(0, 4), r.record_time.slice(4, 6), r.record_time.slice(6, 8)].join('-') + ' ' + r.record_time.slice(8, 10) + ':00:00'
        } else {
          record_time_label = date_formatter(+r.record_time, DATE_FORMAT)
        }
        return {
          ...r,
          record_time_label
        }
      })
    },
    fetch_child_device_use_app_recorder: function() {
      const data = this.get_condition_with_pagination()
      this.loading = true
      get_child_use_recorder(data).then(res => {
        if (res.status === 0) {
          this.device_list = this.transfer_data(res.data)
          this.total = res.total_count
        }
      }).finally(() => {
        this.loading = false
      })
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
        justify-content: center;
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
