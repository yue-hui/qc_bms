<template>
  <div class="gelei-content">
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
                      v-for="member in member_package_objects"
                      :key="member.value"
                      :label="member.label"
                      :value="member.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">会员类型:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.member_type"
                    size="mini"
                    placeholder="请选择会员类型"
                    clearable
                    @change="query_condition_change">
                    <el-option
                      v-for="item in patriarch_member_types"
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
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">会员订阅方式:</el-col>
                <el-col :span="16">
                  <el-select v-model="query_sets.renew_type" size="mini" clearable placeholder="所有状态" @change="query_condition_change">
                    <el-option
                      v-for="item in renew_list"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="12" :lg="14" :xl="20" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <gl-button
                  pid="20018"
                  size="mini"
                  type="success"
                  @click="create_package">创建套餐</gl-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          v-loading="loading"
          :data="packages_list"
          size="mini"
          stripe>
          <el-table-column
            align="center"
            width="160"
            label="套餐名称"
            prop="plan_name" />
          <el-table-column
            align="center"
            label="套餐类型"
            prop="plan_type_label" />
          <el-table-column
            align="center"
            label="会员类型"
            prop="member_type_label" />
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
            label="首开价"
            prop="_first_discount_price" />
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
            label="订阅方式"
            prop="_renew_type" />
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
              <gl-button
                pid="20019"
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="change_shelf_status(scope.row)">{{ show_table_button_label(scope.row) }}
              </gl-button>
              <gl-button
                pid="20020"
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="edit_shelf(scope.row)">编辑
              </gl-button>
              <gl-button
                pid="20021"
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="delete_shelf(scope.row)">删除
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

    <package-create-edit v-if="action" :action="action" :current="current" @callback="close_package_dialog" />
  </div>
</template>

<script>
import packageCreateEdit from './components/package_create_edit'
import {
  DATE_TIME_FORMAT,
  MEMBER_PACKAGE_OBJECTS,
  PACKAGE_STATUS,
  PACKAGE_TYPE,
  PATRIARCH_MEMBER_TYPES,
  TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import { delete_member_plan, get_member_plan_list, update_member_plan } from '@/api/interactive'
import { date_formatter, get_value_from_map_list } from '@/utils/common'
import { MEMBER_DEVICE_LIST_RANGE } from '@/views/toolbox/data/promotion'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'

export default {
  components: {
    packageCreateEdit
  },
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      query_sets: {
        plan_name: '',
        plan_type: '',
        is_member: '',
        device_type: '',
        is_listing: '1',
        renew_type: ''
      },
      device_type_items: MEMBER_DEVICE_LIST_RANGE,
      packages: PACKAGE_TYPE,
      member_package_objects: MEMBER_PACKAGE_OBJECTS,
      status_list: PACKAGE_STATUS,
      patriarch_member_types: PATRIARCH_MEMBER_TYPES.filter(r => ['02', '03'].indexOf(r.value) !== -1),
      action: 0,
      packages_list: [],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      renew_list: [
        { label: '全部', value: '' },
        { label: '非自动续费', value: 1 },
        { label: '自动续费', value: 2 }
      ]
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
        const is_member_label = get_value_from_map_list(r.is_member, MEMBER_PACKAGE_OBJECTS)
        const member_type_label = get_value_from_map_list(r.member_type, this.patriarch_member_types)
        return {
          ...r,
          discount_start_time_label,
          discount_end_time_label,
          plan_type_label,
          is_member_label,
          create_time_label,
          member_type_label,
          _renew_type: (() => {
            if (!r.renew_type) return '非自动续费'
            if (String(r.renew_type) === '1') return '非自动续费'
            if (String(r.renew_type) === '2') return '自动续费'
          })(),
          _first_discount_price: (() => {
            return r.first_discount_price || '-'
          })()
        }
      })
    },
    fetch_member_list() {
      this.loading = true
      const options = this.get_condition_with_pagination()
      get_member_plan_list(options).then(res => {
        this.packages_list = this.field_mapper(res.data)
        this.total = res.total_count
      }).finally(() => {
        this.loading = false
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
        confirm_text = (() => {
          if (row.plan_type === '02') {
            return '下架非公开套餐将影响正在使用该套餐的项目，请谨慎操作！'
          }
          return '你确定要下架该套餐吗?'
        })()
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
      const confirm_text = row.plan_type === '02' ? '删除非公开套餐将影响正在使用该套餐的项目，请谨慎操作！' : '你确定要删除该套餐吗？'
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
.gelei-content {
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
