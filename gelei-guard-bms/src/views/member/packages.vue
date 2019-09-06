<template>
  <div class="content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">套餐名称:</el-col>
                <el-col :span="16">
                  <el-input v-model="query_sets.plan_name" size="mini" placeholder="套餐名称" clearable @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">套餐类型:</el-col>
                <el-col :span="16">
                  <el-select v-model="query_sets.plan_type" size="mini" clearable placeholder="所有套餐类型" @change="query_condition_change">
                    <el-option
                      v-for="item in packages"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">套餐对象:</el-col>
                <el-col :span="16">
                  <el-select v-model="query_sets.is_member" size="mini" clearable placeholder="套餐对象" @change="query_condition_change">
                    <el-option
                      v-for="member in member_types"
                      :key="member.value"
                      :label="member.label"
                      :value="member.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">设备类型:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.device_type"
                    size="mini"
                    placeholder="设备类型"
                    clearable
                    @change="query_condition_change">
                    <el-option
                      v-for="item in device_type_items"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">状态:</el-col>
                <el-col :span="16">
                  <el-select v-model="query_sets.is_listing" size="mini" clearable placeholder="所有状态" @change="query_condition_change">
                    <el-option
                      v-for="item in status_list"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="18" :lg="19" :xl="4" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-button size="mini" type="success" @click="create_package">创建套餐</el-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          :data="packages_list"
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="套餐名称"
            prop="plan_name"
            width="200" />
          <el-table-column
            align="center"
            label="套餐类型"
            prop="plan_type_label"
            width="180" />
          <el-table-column
            align="center"
            label="套餐对象"
            prop="is_member_label"
            width="180" />
          <el-table-column
            align="center"
            label="套餐原价"
            prop="original_price" />
          <el-table-column
            align="center"
            label="套餐活动价"
            prop="discount_price" />
          <el-table-column
            align="center"
            label="设备类型"
            prop="device_type_label" />
          <el-table-column
            align="center"
            label="限购次数"
            prop="purchase_quota" />
          <el-table-column
            align="center"
            label="活动起始时间"
            prop="discount_start_time_label"
            width="134"/>
          <el-table-column
            align="center"
            label="活动结束时间"
            prop="discount_end_time_label"
            width="134"/>
          <el-table-column
            align="center"
            label="创建时间"
            prop="create_time_label"
            width="134"/>
          <el-table-column
            align="center"
            label="状态"
            prop="is_listing_label" />
          <el-table-column
            align="center"
            label="操作"
            prop="control"
            width="180">
            <template slot-scope="scope">
              <el-button
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="change_shelf_status(scope.row)">{{ show_table_button_label(scope.row) }}
              </el-button>
              <el-button
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="edit_shelf(scope.row)">编辑
              </el-button>
              <el-button
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="delete_shelf(scope.row)">删除
              </el-button>
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

    <package-create-edit v-if="action" :action="action" :current="current" @callback="close_package_dialog" />
  </div>
</template>

<script>
import packageCreateEdit from './components/package_create_edit'
import { DATE_TIME_FORMAT, MEMBER_TYPES, PACKAGE_STATUS, PACKAGE_TYPE, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { delete_member_plan, get_member_plan_list, update_member_plan } from '@/api/interactive'
import { date_formatter } from '@/utils/common'
import { MEMBER_DEVICE_LIST_RANGE } from '@/views/toolbox/data/promotion'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'

export default {
  components: {
    packageCreateEdit
  },
  data() {
    const page_size = getPagenationSize()
    return {
      query_sets: {
        plan_name: '',
        plan_type: '',
        is_member: '',
        device_type: '',
        is_listing: '1'
      },
      device_type_items: MEMBER_DEVICE_LIST_RANGE,
      packages: PACKAGE_TYPE,
      member_types: MEMBER_TYPES,
      status_list: PACKAGE_STATUS,
      action: 0,
      packages_list: [],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0
    }
  },
  computed: {},
  mounted: function() {
    this.fetch_member_list()
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
    field_mapper(data) {
      return data.map(r => {
        const create_time_label = date_formatter(r.create_time, DATE_TIME_FORMAT)
        let discount_start_time_label, discount_end_time_label
        if (r.discount_start_time) {
          discount_start_time_label = date_formatter(r.discount_start_time, DATE_TIME_FORMAT)
        } else {
          discount_start_time_label = '-'
        }
        if (r.discount_end_time) {
          discount_end_time_label = date_formatter(r.discount_end_time, DATE_TIME_FORMAT)
        } else {
          discount_end_time_label = '-'
        }
        const plan_type_label = r.plan_type === '01' ? '公开' : r.plan_type === '02' ? '不公开' : '未知'
        const is_member_label = r.is_member === '1' ? 'VIP会员用户' : '非VIP会员用户'
        return {
          ...r,
          discount_start_time_label,
          discount_end_time_label,
          plan_type_label,
          is_member_label,
          create_time_label
        }
      })
    },
    fetch_member_list() {
      const options = this.get_condition_with_pagination()
      get_member_plan_list(options).then(res => {
        this.packages_list = this.field_mapper(res.data)
        this.total = res.total_count
      })
    },
    query_condition_change() {
      this.page = 1
      this.page_size = getPagenationSize()
      this.query()
    },
    query() {
      this.fetch_member_list()
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.fetch_member_list()
    },
    change_current: function(page) {
      this.page = page
      this.fetch_member_list()
    },
    show_table_button_label(row) {
      if (row.is_listing === '1') {
        return '下架'
      } else if (row.is_listing === '0') {
        return '上架'
      } else {
        return '状态异常'
      }
    },
    change_shelf_status: function(row) {
      let confirm_text,
        is_listing
      if (row.is_listing === '1') {
        // 已上架
        confirm_text = '你确定要下架该套餐吗?'
        is_listing = '0'
      } else if (row.is_listing === '0') {
        // 已下架
        confirm_text = '你确定要上架该套餐吗?'
        is_listing = '1'
      }
      this.$confirm(confirm_text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const options = {
          plan_id: row.plan_id,
          is_listing
        }
        update_member_plan(options).then(res => {
          if (res.status === 0) {
            this.$message.success(res.message)
            this.fetch_member_list()
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消上下架操作'
        })
      })
    },
    close_package_dialog(refresh = false) {
      this.action = 0
      this.current = {}
      if (refresh) {
        this.fetch_member_list()
      }
    },
    create_package() {
      this.action = 1
      this.current = {}
    },
    edit_shelf: function(row) {
      this.action = 2
      this.current = row
    },
    delete_shelf: function(row) {
      if (row.is_listing === '1') {
        // 已上架
        const warngin_message = '套餐需下架才可以删除'
        this.$message.warning(warngin_message)
        return
      }
      const confirm_text = '你确定要删除该套餐吗？'
      this.$confirm(confirm_text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const options = {
          plan_id: row.plan_id
        }
        delete_member_plan(options).then(res => {
          if (res.status === 0) {
            this.$message.success(res.message)
            this.fetch_member_list()
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

          &.layout-right {
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
