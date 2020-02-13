<template>
  <div class="device-recorrd-content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">孩子昵称:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.child_device_id"
                    size="mini"
                    placeholder="孩子昵称"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">孩子端账号:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.os_version"
                    size="mini"
                    placeholder="孩子端账号"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">孩子端设备ID:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.os_version"
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
                <el-col :span="8" class="order-number-list">使用间隔:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.device_type"
                    size="mini"
                    placeholder="使用间隔"
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
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="5" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">应用名称:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.child_device_id"
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
                <el-col :span="8" class="order-number-list">注册时间:</el-col>
                <el-col :span="16">
                  <el-date-picker
                    v-model="query_sets.datetime_range"
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
            prop="child_device_id"
            width="240" />
          <el-table-column
            align="center"
            label="手机号"
            prop="device_type_label" />
          <el-table-column
            align="center"
            label="设备ID"
            prop="device_model" />
          <el-table-column
            align="center"
            label="使用应用包名"
            prop="os_version" />
          <el-table-column
            align="center"
            label="使用应用包名称"
            prop="patriarch_app_version" />
          <el-table-column
            align="center"
            label="使用时长（秒）"
            prop="middleware_version" />
          <el-table-column
            align="center"
            label="临时可用时间"
            prop="child_app_version" />
          <el-table-column
            align="center"
            label="使用时间"
            prop="child_app_update_time_label" />
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
import { DEVICE_USER_INTERVALS, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { getPagenationSize } from '@/utils/auth'

export default {
  name: 'DevicesRecord',
  components: {},
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      query_sets: {},
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
  },
  methods: {
    query_condition_change: function() {
    },
    search: function() {
    },
    table_size_change: function() {
    },
    change_current: function() {
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
    }
  }
}
</style>
