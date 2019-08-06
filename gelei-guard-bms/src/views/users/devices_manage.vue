<template>
  <div class="content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">孩子端设备ID:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.child_device_id"
                    size="mini"
                    placeholder="孩子端设备ID"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">系统版本号:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.os_version"
                    size="mini"
                    placeholder="系统版本号"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">平台:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.device_type"
                    size="mini"
                    placeholder="平台"
                    clearable
                    @change="query_condition_change">
                    <el-option
                      v-for="item in child_platform_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="10" class="order-number-list">中间件版本号:</el-col>
                <el-col :span="14">
                  <el-input
                    v-model="query_sets.middleware_version"
                    size="mini"
                    placeholder="中间件版本号"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="10" class="order-number-list">孩子端版本号:</el-col>
                <el-col :span="14">
                  <el-input
                    v-model="query_sets.child_app_version"
                    size="mini"
                    placeholder="孩子端版本号"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="10" class="order-number-list" />
                <el-col :span="14" />
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">设备型号:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.device_model"
                    size="mini"
                    placeholder="设备型号"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">家长端手机号:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.patriarch_phone"
                    size="mini"
                    placeholder="家长端手机号"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="24" :lg="24" :xl="16" class="col-bg layout-right col-right-button">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-button
                  :loading="download_loading"
                  size="mini"
                  type="success"
                  @click="download"><i class="el-icon-download el-icon" />导出</el-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          :data="device_list"
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="孩子端设备ID"
            prop="child_device_id"
            width="240" />
          <el-table-column
            align="center"
            label="平台"
            prop="device_type_label" />
          <el-table-column
            align="center"
            label="设备型号"
            prop="device_model" />
          <el-table-column
            align="center"
            label="系统版本号"
            prop="os_version" />
          <el-table-column
            align="center"
            label="家长端版本号"
            prop="patriarch_app_version" />
          <el-table-column
            align="center"
            label="中间件版本号"
            prop="middleware_version" />
          <el-table-column
            align="center"
            label="孩子端版本号"
            prop="child_app_version" />
          <el-table-column
            align="center"
            label="孩子端版本更新时间"
            prop="child_app_update_time_label" />
          <el-table-column
            align="center"
            label="家长端手机号"
            prop="patriarch_phone" />
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
import {
  DATE_MINUTE_COMPACT_FORMAT,
  DATE_MINUTE_FORMAT,
  DEVICE_MANAGE_LIST_NAME, TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import { get_device_list } from '@/api/interactive'
import { child_platform_type, platforms } from '@/views/toolbox/data/promotion'
import { date_formatter, get_value_from_map_list, pure_object_null_value } from '@/utils/common'
import dayjs from 'dayjs'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'

export default {
  components: {},
  data() {
    const page_size = getPagenationSize()
    return {
      query_sets: {
        child_device_id: '',
        device_type: '',
        device_model: '',
        os_version: '',
        patriarch_app_version: '',
        middleware_version: '',
        child_app_version: '',
        patriarch_phone: ''
      },
      device_list: [],
      download_loading: false,
      platforms,
      child_platform_type,
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0
    }
  },
  computed: {},
  mounted: function() {
    this.fetch_device_list()
  },
  methods: {
    download() {
      // 下载
      this.download_loading = true
      const options = this.get_condition_with_pagination()
      options['page_num'] = this.total
      const time_string = dayjs().format(DATE_MINUTE_COMPACT_FORMAT)
      const filename = [DEVICE_MANAGE_LIST_NAME, time_string].join('_')
      get_device_list(options).then(res => {
        const data_list = this.device_list_map(res.data)
        import('@/utils/Export2Excel').then(excel => {
          const t_header = ['孩子端设备ID', '平台', '设备型号', '系统版本号',
            '家长端版本号', '中间件版本号', '孩子端版本号', '孩子端版本更新时间', '家长端手机号']
          // filter_val 必须为存在的字段，且filter_val的长度要小于t_header的长度
          const filter_val = ['child_device_id', 'device_type_label', 'device_model', 'os_version',
            'patriarch_app_version', 'middleware_version', 'child_app_version', 'child_app_update_time_label',
            'patriarch_phone']
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
    get_condition() {
      return this.query_sets
    },
    get_condition_with_pagination() {
      let condition = this.get_condition()
      condition = pure_object_null_value(condition)
      condition['page_no'] = this.page
      condition['page_num'] = this.page_size
      return condition
    },
    query_condition_change() {
      this.page = 1
      this.page_size = getPagenationSize()
      this.query()
    },
    query() {
      this.fetch_device_list()
    },
    device_list_map(data) {
      return data.map(r => {
        const child_app_update_time_label = date_formatter(r.child_app_update_time, DATE_MINUTE_FORMAT)
        const device_type_label = get_value_from_map_list(r.device_type, child_platform_type)
        return {
          ...r,
          child_app_update_time_label,
          device_type_label
        }
      })
    },
    fetch_device_list() {
      /* 获取订单列表 */
      const data = this.get_condition_with_pagination()
      get_device_list(data).then(res => {
        if (res.status === 0) {
          this.device_list = this.device_list_map(res.data)
          this.total = res.total_count
        }
      })
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
