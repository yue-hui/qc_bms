<template>
  <div class="content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">用户账号:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_set.phone"
                    maxlength="11"
                    size="mini"
                    clearable
                    onkeyup="this.value=this.value.replace(/\D/g,'')"
                    placeholder="请输入手机号"
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">平台类型:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_set.device_type"
                    size="mini"
                    placeholder="请选择平台类型"
                    clearable
                    @change="search">
                    <el-option
                      v-for="item in device_type_list"
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
                <el-col :span="8" class="order-number-list">会员类型:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_set.member_type"
                    size="mini"
                    placeholder="请选择会员类型"
                    clearable
                    @change="search">
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
                <el-col :span="8" class="order-number-list">用户来源:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_set.reg_from"
                    size="mini"
                    placeholder="用户来源"
                    clearable
                    @change="search">
                    <el-option
                      v-for="item in user_sources"
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
                <el-col :span="8" class="order-number-list">会员有效天数:</el-col>
                <el-col :span="16" class="valid-date-range">
                  <div class="valid-value-area">
                    <el-input
                      v-model="query_set.begin_valid_days"
                      type="tel"
                      min="0"
                      clearable
                      size="mini"
                      @blur="search"
                      @input="input_pure_number(query_set.begin_valid_days)" />
                    <span class="valid-date-span">-</span>
                    <el-input
                      v-model="query_set.end_valid_days"
                      type="tel"
                      min="0"
                      clearable
                      size="mini"
                      @blur="search"
                      @input="input_pure_number(query_set.end_valid_days, false)" />
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="8" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="4" class="order-number-list">注册时间:</el-col>
                <el-col :span="16">
                  <el-date-picker
                    v-model="query_set.datetime_range"
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
          <el-col :xs="12" :sm="8" :md="18" :lg="19" :xl="16" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-button
                  :loading="download_loading"
                  class="download details-tab"
                  size="mini"
                  type="success"
                  @click="download">导出
                  <svg-icon icon-class="download" />
                </el-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          :data="table_data"
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="序号"
            prop="_id"
            width="80" />
          <el-table-column
            align="center"
            label="用户昵称"
            prop="nick_name"
            width="180" />
          <el-table-column
            align="center"
            label="手机号"
            prop="phone" />
          <el-table-column
            align="center"
            label="注册时间"
            prop="create_time" />
          <el-table-column
            align="center"
            label="类型"
            prop="device_type_label" />
          <el-table-column
            align="center"
            label="用户来源"
            prop="reg_from_label" />
          <el-table-column
            align="center"
            label="会员类型"
            prop="vip_label"
            width="220" />
          <el-table-column
            align="center"
            label="会员有效天数"
            prop="valid_days_label" />
          <el-table-column
            align="center"
            label="操作"
            prop="control">
            <template slot-scope="scope">
              <el-button
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="view_details(scope.row)">查看
              </el-button>
              <el-button
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="view_recharge_dialog(scope.row)">交易记录
              </el-button>
              <el-button
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="view_member_dialog(scope.row)">会员记录
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

    <recharge-dialog :visible="recharge_dialog_visible" :uid="current_uid" @callback="close_recharge_dialog" />
    <member-dialog :visible="member_dialog_visible" :uid="current_uid" @callback="close_member_dialog" />
  </div>
</template>

<script>
import { get_parent_list, get_patriarch_list_export, get_user_reg_from_list } from '@/api/interactive'
import { date_formatter, get_grade_label_map, get_sex_label, get_value_from_map_list } from '@/utils/common'
import {
  DATE_FORMAT,
  DATE_FORMAT_WITH_POINT,
  DATE_TIME_FORMAT, EXPORT_MAX_RECORD_LENGTH, EXPORT_OVER_MAX_TIPS_REMINDER, GRADE_LIST,
  PATRIARCH_MEMBER_TYPES,
  TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import rechargeDialog from './components/recharge_dialog'
import memberDialog from './components/member_dialog'
import { device_type_list, member_status_list } from '@/views/toolbox/data/promotion'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import dayjs from 'dayjs'

export default {
  components: {
    rechargeDialog,
    memberDialog
  },
  data() {
    const page_size = getPagenationSize()
    // const begin_time = new Date(dayjs().subtract(30, 'days'))
    // const end_time = new Date(dayjs().subtract(1, 'days'))
    return {
      device_type_list,
      member_status_list,
      user_sources: [], // 用户来源列表
      patriarch_member_types: PATRIARCH_MEMBER_TYPES,
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      query_set: {
        phone: '',
        device_type: '',
        member_type: '',
        member_status: '',
        reg_from: '',
        begin_valid_days: '',
        end_valid_days: '',
        datetime_range: []
      },
      table_data: [],
      current_uid: '',
      recharge_dialog_visible: false,
      member_dialog_visible: false,
      download_loading: false
    }
  },
  computed: {},
  mounted: function() {
    this.init()
  },
  methods: {
    input_pure_number(valid_days, is_start = true) {
      const new_valid_days = valid_days.replace(/[^\d]/g, '')
      this.$nextTick(() => {
        if (is_start) {
          this.query_set.begin_valid_days = new_valid_days
        } else {
          this.query_set.end_valid_days = new_valid_days
        }
      })
    },
    init() {
      this.refresh_data()
      this.fetch_register_source_list()
    },
    search(e) {
      if (this.query_set.begin_valid_days && this.query_set.end_valid_days) {
        if (parseInt(this.query_set.begin_valid_days) > this.query_set.end_valid_days) {
          this.$message.error('会员有效开始天数应小于结束有效天数')
          return
        }
      }
      this.page = 1
      this.refresh_data()
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.refresh_data()
    },
    change_current: function(page) {
      this.page = page
      this.refresh_data()
    },
    get_config: function() {
      return {
        page_no: this.page,
        page_num: this.page_size
      }
    },
    get_params: function() {
      const config = this.get_config()
      if (this.query_set.phone) {
        config['phone'] = '' + this.query_set.phone
      }
      if (this.query_set.device_type) {
        config['device_type'] = this.query_set.device_type
      }
      if (this.query_set.member_type) {
        config['member_type'] = this.query_set.member_type
      }
      if (this.query_set.datetime_range && this.query_set.datetime_range.length === 2) {
        config['begin_time'] = '' + this.query_set.datetime_range[0].getTime()
        config['end_time'] = '' + this.query_set.datetime_range[1].getTime()
      }
      if (this.query_set.member_status) {
        config['member_status'] = '' + this.query_set.member_status
      }
      if (this.query_set.reg_from) {
        config['reg_from'] = this.query_set.reg_from
      }
      if (this.query_set.begin_valid_days) {
        config['begin_valid_days'] = this.query_set.begin_valid_days
      }
      if (this.query_set.end_valid_days) {
        config['end_valid_days'] = this.query_set.end_valid_days
      }
      return config
    },
    view_details: function(row) {
      const options = {
        path: '/users/details',
        query: {
          id: row.user_id
        }
      }
      const { href } = this.$router.resolve(options)
      window.open(href, '_blank')
    },
    close_recharge_dialog: function() {
      this.recharge_dialog_visible = false
    },
    view_recharge_dialog: function(row) {
      this.current_uid = row.user_id
      this.recharge_dialog_visible = true
    },
    close_member_dialog: function() {
      this.member_dialog_visible = false
    },
    view_member_dialog: function(row) {
      this.current_uid = row.user_id
      this.member_dialog_visible = true
    },
    fetch_register_source_list() {
      get_user_reg_from_list().then(res => {
        // 获取用户注册来源
        if (res.status === 0) {
          this.user_sources = res.data.map(r => {
            return {
              label: r.reg_from_label,
              value: r.reg_from
            }
          })
        } else {
          this.user_sources = []
          this.$message.error(res.message)
        }
      })
    },
    refresh_data: function() {
      const config = this.get_params()
      get_parent_list(config).then(res => {
        const table_data = []
        const base_index = (config.page_no - 1) * config.page_num + 1
        // 会员信息
        res.data.forEach((r, i, _a) => {
          let vip_label = get_value_from_map_list(r.member_type, PATRIARCH_MEMBER_TYPES, '')
          if (r.member_status === '00') {
            // vip_label += '(待生效)'
          } else if (r.member_status === '01') {
            if (r.begin_time && r.end_time) {
              vip_label += ['(', date_formatter(r.begin_time, DATE_FORMAT_WITH_POINT),
                '-', date_formatter(r.end_time, DATE_FORMAT_WITH_POINT), ')'].join('')
            } else {
              // vip_label += '(已生效)'
            }
          } else if (r.member_status === '02') {
            // vip_label += '(已失效)'
          }
          const valid_days_label = r.valid_days + '天'
          const item = {
            ...r,
            vip_label,
            valid_days_label,
            create_time: date_formatter(r.create_time, DATE_TIME_FORMAT),
            _id: base_index + i
          }
          table_data.push(item)
        })
        this.table_data = table_data
        this.total = res.total_count
      })
    },
    download() {
      this.download_loading = true
      const config = this.get_params()
      delete config.page_no
      delete config.page_num
      config['page_no'] = 1
      config['page_num'] = this.total
      get_patriarch_list_export(config).then(res => {
        if (res.status === 0) {
          if (res.total_count >= EXPORT_MAX_RECORD_LENGTH) {
            const options = {
              title: '提示',
              type: 'warning',
              message: EXPORT_OVER_MAX_TIPS_REMINDER,
              duration: 0
            }
            this.$notify(options)
            return
          }
          const remote_data = res.data.map(r => {
            let member_type_label = ''
            if (r.member_type === '01') {
              member_type_label = '体验用户'
            } else if (r.member_type === '02') {
              member_type_label = 'VIP会员'
            }
            if (r.member_status === '00') {
              // member_type_label += '(待生效)'
            } else if (r.member_status === '01') {
              if (r.begin_time && r.end_time) {
                member_type_label += ['(', date_formatter(r.begin_time, DATE_FORMAT_WITH_POINT),
                  '-', date_formatter(r.end_time, DATE_FORMAT_WITH_POINT), ')'].join('')
              } else {
                // member_type_label += '(已生效)'
              }
            } else if (r.member_status === '02') {
              // member_type_label += '(已失效)'
            }
            const child_sex_label = r.child_sex === '1' ? '男' : '女'
            const child_grade = '' + r.child_grade
            const child_grade_label = get_value_from_map_list(child_grade, GRADE_LIST, '-', '2')
            return {
              ...r,
              child_sex_label,
              child_grade_label,
              member_type_label
            }
          })
          this.export_excel(remote_data)
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.download_loading = false
      })
    },
    formatJson(filterVal, jsonData) {
      const convert_date_time_fields = [
        'create_time', 'begin_time', 'end_time'
      ]
      const convert_date_fields = [
        'child_birthdate'
      ]
      const convert_sex_fields = [
        'sex'
      ]
      const convert_grade_fields = [
        'grade'
      ]
      const grade_map = get_grade_label_map()
      return jsonData.map(v => filterVal.map(j => {
        if (convert_date_time_fields.indexOf(j) !== -1) {
          return date_formatter(v[j], DATE_TIME_FORMAT, false)
        } else if (convert_date_fields.indexOf(j) !== -1) {
          return date_formatter(v[j], DATE_FORMAT, false)
        } else if (convert_grade_fields.indexOf(j) !== -1) {
          return grade_map[v[j]]
        } else if (convert_sex_fields.indexOf(j) !== -1) {
          return get_sex_label(v[j])
        } else {
          return v[j]
        }
      }))
    },
    export_excel(data_list) {
      const filename = '用户管理-家长端数据'
      import('@/utils/Export2Excel').then(excel => {
        const t_header = ['用户昵称', '手机号', '注册时间', '用户来源', '会员类型',
          '设备类型', '会员开始时间', '会员结束时间', '孩子昵称',
          '孩子性别', '孩子出生日期', '孩子年级']
        // filter_val 必须为存在的字段，且filter_val的长度要小于t_header的长度
        const filter_val = ['nick_name', 'phone', 'create_time', 'reg_from_label', 'member_type_label',
          'device_type_label', 'begin_time', 'end_time', 'child_nick_name',
          'child_sex_label', 'child_birthdate', 'child_grade_label']
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$label_height: 28px;
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

          .valid-date-range {
            padding: 0 10px;

            .valid-value-area {
              display: flex;
              justify-content: space-between;
              flex-direction: row;
              align-items: center;

              .valid-date-span {
                padding: 0 10px;
              }
            }
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
