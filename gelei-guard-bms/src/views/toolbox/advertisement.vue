<template>
  <div class="content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">广告名称:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.ad_name"
                    size="mini"
                    placeholder="广告名称"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">广告类型:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.ad_type"
                    size="mini"
                    placeholder="广告类型"
                    clearable
                    @change="query_condition_change">
                    <el-option
                      v-for="item in advertisement_type"
                      :key="item.value"
                      :label="item.label"
                      :disabled="item.value === '03'"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">广告位置:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.ad_position"
                    size="mini"
                    placeholder="广告位置"
                    clearable
                    @change="query_condition_change">
                    <el-option
                      v-for="item in advertisement_locations"
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
                <el-col :span="8" class="order-number-list">状态:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.is_listing"
                    size="mini"
                    placeholder="状态"
                    clearable
                    @change="query_condition_change">
                    <el-option
                      v-for="item in advertisement_status"
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
                <el-col :span="8" class="order-number-list">跳转平台:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.jump_target"
                    size="mini"
                    placeholder="跳转平台"
                    clearable
                    @change="query_condition_change">
                    <el-option
                      v-for="item in advertisement_platform"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="18" :lg="18" :xl="4" class="col-bg layout-right col-right-button">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-button size="mini" type="success" @click="create_advertising">创建广告</el-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          v-loading="loading"
          :data="adv_data"
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="广告名称"
            prop="ad_name"
            width="160" />
          <el-table-column
            align="center"
            label="广告类型"
            prop="ad_type_label"
            width="180" />
          <el-table-column
            align="center"
            label="广告位置"
            prop="ad_position_label" />
          <el-table-column
            align="center"
            label="跳转目标"
            prop="jump_target_label" />
          <el-table-column
            :width="80"
            align="center"
            label="图片排序"
            prop="row_order" />
          <el-table-column
            align="center"
            label="起始时间"
            prop="begin_time_label" />
          <el-table-column
            align="center"
            label="结束时间"
            prop="end_time_label" />
          <el-table-column
            align="center"
            label="状态"
            prop="is_listing_label" />
          <el-table-column
            align="center"
            label="操作"
            prop="control">
            <template slot-scope="scope">
              <el-button
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="change_advertising_status(scope.row)">{{ show_table_button_label(scope.row) }}
              </el-button>
              <el-button
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="edit_advertising(scope.row)">编辑
              </el-button>
              <el-button
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="destory_advertising(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="page"
          :page-size="page_size"
          :page-sizes="page_sizes"
          :total="total"
          layout="total, prev, pager, next, jumper"
          @current-change="change_current"
          @size-change="table_size_change" />
      </div>
    </div>

    <advertise-configuration
      v-if="action"
      :action="action"
      :advertisement_locations="advertisement_locations"
      :advertisement_type="advertisement_type"
      :current="current_row"
      @callback="destory_dialog" />
  </div>
</template>

<script>
import AdvertiseConfiguration from './components/advertise_configuration'
import {
  ADVERTISEMENT_PLATFORM,
  ADVERTISEMENT_STATUS, DATE_TIME_FORMAT, DEFAULT_PAGE_SIZE,
  TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import { delete_advertising, edit_advertising, get_advertising_list } from '@/api/interactive'
import { fetch_all_advertising_filter_list } from '@/api/merge'
import { date_formatter } from '@/utils/common'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'

export default {
  components: {
    AdvertiseConfiguration
  },
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      query_sets: {
        ad_name: '',
        ad_type: '',
        ad_position: '',
        is_listing: '1',
        jump_target: ''
      },
      advertisement_status: ADVERTISEMENT_STATUS,
      advertisement_locations: [],
      advertisement_type: [],
      advertisement_platform: ADVERTISEMENT_PLATFORM,
      is_create: false,
      adv_data: [{}],
      action: 0,
      current_row: {},
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0
    }
  },
  computed: {},
  mounted: function() {
    this.fetch_advertising_filter_list().then(() => {
      this.fetch_advertising_list()
    })
  },
  methods: {
    get_condition() {
      const query_params = JSON.parse(JSON.stringify(this.query_sets))
      const condition = {}
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
    query_condition_change() {
      this.page = 1
      this.page_size = DEFAULT_PAGE_SIZE
      this.query()
    },
    query() {
      this.fetch_advertising_list()
    },
    formatter_data(data) {
      // 广告类型
      const ad_type_map_list = {}
      this.advertisement_type.forEach((_c, _i) => {
        const value = _c.value
        const label = _c.label
        ad_type_map_list[value] = label
      })
      // 广告位置
      const ad_position_map_list = {}
      this.advertisement_locations.forEach((_c, _i) => {
        const value = _c.value
        const label = _c.label
        ad_position_map_list[value] = label
      })
      // 跳转目标
      const jump_target_map_list = {}
      ADVERTISEMENT_PLATFORM.forEach((_c, _i) => {
        const value = _c.value
        const label = _c.label
        jump_target_map_list[value] = label
      })
      // 是否生效
      const is_listing_map_list = {}
      this.advertisement_status.forEach((_c, _i) => {
        const value = _c.value
        const label = _c.label
        is_listing_map_list[value] = label
      })

      const now_timestamp = new Date().getTime()
      return data.map(r => {
        let begin_time_label, end_time_label
        if (r.ad_position === '02') {
          begin_time_label = '-'
          end_time_label = '-'
        } else {
          begin_time_label = date_formatter(r.begin_time, DATE_TIME_FORMAT)
          end_time_label = date_formatter(r.end_time, DATE_TIME_FORMAT)
        }
        let is_listing_label
        if (now_timestamp >= r.begin_time && now_timestamp <= r.end_time) {
          is_listing_label = is_listing_map_list[r.is_listing]
        } else {
          // 不在时间范围内
          is_listing_label = is_listing_map_list['0']
        }
        return {
          ...r,
          begin_time_label,
          end_time_label,
          is_listing_label,
          ad_type_label: ad_type_map_list[r.ad_type],
          jump_target_label: jump_target_map_list[r.jump_target],
          ad_position_label: ad_position_map_list[r.ad_position]
        }
      })
    },
    fetch_advertising_list() {
      /* 拉取广告配置列表 */
      const options = this.get_condition_with_pagination()
      this.loading = true
      get_advertising_list(options).then(res => {
        if (res.status === 0) {
          this.adv_data = this.formatter_data(res.data)
          this.total = res.total_count
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    async fetch_advertising_filter_list() {
      return new Promise((resolve, reject) => {
        fetch_all_advertising_filter_list().then(res => {
          this.advertisement_type = res.advertising_type
          this.advertisement_locations = res.advertising_point
          resolve()
        })
      })
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.fetch_advertising_list()
    },
    change_current: function(page) {
      this.page = page
      this.fetch_advertising_list()
    },
    show_table_button_label(row) {
      if (row.is_listing === '1') {
        return '下架'
      } else {
        return '上架'
      }
    },
    change_advertising_status_action(row) {
      const ad_id = row.ad_id
      const is_listing = row.is_listing === '1' ? '0' : '1'
      const options = {
        ad_id,
        is_listing
      }
      edit_advertising(options).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.fetch_advertising_list()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    change_advertising_status(row) {
      let confirm_text
      if (row.is_listing === '1') {
        // 已上架
        confirm_text = '你确定要下架该广告配置吗?'
      } else if (row.is_listing === '0') {
        // 已下架
        confirm_text = '你确定要上架该广告配置吗?'
      }
      this.$confirm(confirm_text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.change_advertising_status_action(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消上下架操作'
        })
      })
    },
    destory_dialog(refresh = false) {
      if (refresh) {
        this.fetch_advertising_list()
      }
      this.action = 0
      this.current_row = {}
    },
    create_advertising() {
      this.action = 1
      this.current_row = {}
    },
    edit_advertising: function(row) {
      this.action = 2
      this.current_row = row
    },
    destory_advertising: function(row) {
      const confirm_text = '确定删除该广告配置么?'
      this.$confirm(confirm_text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const options = {
          ad_id: row.ad_id
        }
        delete_advertising(options).then(res => {
          if (res.status === 0) {
            this.$message.success(res.message)
            this.fetch_advertising_list()
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除套餐操作'
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  /*min-height: 800px;*/
  padding: 20px 10px 25px 10px;
  display: flex;
  flex-direction: column;

  .content-body {
    border: 1px solid #EAEAEA;
    height: 100%;
    min-height: 800px;

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
  }
}
</style>
