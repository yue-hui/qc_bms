<template>
  <div class="content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="3" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">手机号:</el-col>
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
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="3" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">孩子昵称:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_set.nick_name"
                    size="mini"
                    clearable
                    placeholder="请输入用户昵称"
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">家长手机号:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_set.patriarch_phone"
                    maxlength="11"
                    size="mini"
                    clearable
                    onkeyup="this.value=this.value.replace(/\D/g,'')"
                    placeholder="请输入家长手机号"
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
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
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">注册时间:</el-col>
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
          <el-col :xs="12" :sm="8" :md="18" :lg="18" :xl="6" class="col-bg layout-right">
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
            label="孩子手机号"
            prop="phone" />
          <el-table-column
            align="center"
            label="家长手机号"
            prop="patriarch_phone" />
          <el-table-column
            align="center"
            label="注册时间"
            prop="create_time_label" />
          <el-table-column
            align="center"
            label="类型"
            prop="device_type_label" />
          <el-table-column
            align="center"
            label="年级"
            prop="grade_label" />
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
import { get_child_list_export, get_user_child_list } from '@/api/interactive'
import { date_formatter, get_grade_label_map, get_sex_label, get_value_from_map_list } from '@/utils/common'
import { DATE_FORMAT, DATE_TIME_FORMAT, GRADE_LIST, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { device_type_list } from '@/views/toolbox/data/promotion'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'

export default {
  data() {
    const page_size = getPagenationSize()
    const grade_label_list = []
    GRADE_LIST.forEach(c => {
      grade_label_list[c.val] = c.name
    })
    return {
      device_type_list,
      grade_label_list,
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      query_set: {
        datetime_range: '',
        phone: '',
        nick_name: '',
        patriarch_phone: '',
        device_type: ''
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
    init() {
      this.refresh_data()
    },
    search(e) {
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
      if (this.query_set.patriarch_phone) {
        config['patriarch_phone'] = '' + this.query_set.patriarch_phone
      }
      if (this.query_set.device_type) {
        config['device_type'] = this.query_set.device_type
      }
      if (this.query_set.nick_name) {
        config['nick_name'] = this.query_set.nick_name
      }
      if (this.query_set.datetime_range && this.query_set.datetime_range.length === 2) {
        config['begin_time'] = '' + this.query_set.datetime_range[0].getTime()
        config['end_time'] = '' + this.query_set.datetime_range[1].getTime()
      }
      return config
    },
    view_details: function(row) {
      const options = {
        path: '/users/details',
        query: {
          id: row.patriarch_id
        }
      }
      const { href } = this.$router.resolve(options)
      window.open(href, '_blank')
    },
    close_recharge_dialog: function() {
      this.recharge_dialog_visible = false
    },
    close_member_dialog: function() {
      this.member_dialog_visible = false
    },
    refresh_data: function() {
      const config = this.get_params()
      get_user_child_list(config).then(res => {
        const table_data = []
        const base_index = (config.page_no - 1) * config.page_num + 1
        // 会员信息
        res.data.forEach((r, i, _a) => {
          const grade_label = this.grade_label_list[r.grade]
          const item = {
            ...r,
            grade_label,
            create_time_label: date_formatter(r.create_time, DATE_TIME_FORMAT),
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
      get_child_list_export(config).then(res => {
        if (res.status === 0) {
          const remote_data = res.data.map(r => {
            const child_grade = '' + r.child_grade
            const child_grade_label = get_value_from_map_list(child_grade, GRADE_LIST, '-', '2')
            return {
              ...r,
              child_grade_label
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
      const filename = '用户管理-孩子端数据'
      import('@/utils/Export2Excel').then(excel => {
        const t_header = ['用户昵称', '孩子手机号', '家长手机号',
          '注册时间', '类型', '年级']
        // filter_val 必须为存在的字段，且filter_val的长度要小于t_header的长度
        const filter_val = ['nick_name', 'phone', 'patriarch_phone',
          'create_time', 'device_type_label', 'child_grade_label']
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
