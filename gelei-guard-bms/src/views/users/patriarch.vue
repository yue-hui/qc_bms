<template>
  <div class="content">

    <div class="header-line">
      <div class="header-line-left">
        <div class="header-block search-time">
          <label class="search-item">注册时间:</label>
          <div class="block">
            <el-date-picker
              v-model="datetime_range"
              end-placeholder="结束日期"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              clearable
              size="mini"
              unlink-panels
              @change="search" />
          </div>
        </div>

        <div class="header-block phone-block">
          <label class="search-item">手机号:</label>
          <el-input
            v-model="phone"
            maxlength="11"
            size="mini"
            clearable
            onkeyup="this.value=this.value.replace(/\D/g,'')"
            placeholder="请输入手机号"
            @change="search" />
        </div>

        <div class="header-block platform-block">
          <label class="search-item">平台类型:</label>
          <el-select
            v-model="device_type"
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
        </div>

        <div class="header-block member-status-block">
          <label class="search-item">会员状态:</label>
          <el-select
            v-model="member_status"
            size="mini"
            placeholder="请选择会员状态"
            clearable
            @change="search">
            <el-option
              v-for="item in member_status_list"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
      </div>

      <div class="header-line-right">
        <el-button
          :loading="download_loading"
          class="download details-tab"
          size="mini"
          type="success"
          @click="download">导出
          <svg-icon icon-class="download" />
        </el-button>
      </div>
    </div>

    <hr class="hr-diviser">

    <div class="content-body">
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
            label="会员状态"
            prop="vip_label" />
          <el-table-column
            align="center"
            label="操作"
            prop="control">
            <template slot-scope="scope">
              <el-button
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="view_details(scope.row)">查看</el-button>
              <el-button
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="view_recharge_dialog(scope.row)">交易记录</el-button>
              <el-button
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="view_member_dialog(scope.row)">会员记录</el-button>
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
import { get_parent_list, get_patriarch_list_export } from '@/api/interactive'
import { date_formatter, get_grade_label_map, get_sex_label } from '@/utils/common'
import { DATE_FORMAT, DATE_FORMAT_WITH_POINT, DATE_TIME_FORMAT, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import rechargeDialog from './components/recharge_dialog'
import memberDialog from './components/member_dialog'
import { device_type_list, member_status_list } from '@/views/toolbox/data/promotion'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'

export default {
  components: {
    rechargeDialog,
    memberDialog
  },
  data() {
    const page_size = getPagenationSize()
    return {
      device_type_list,
      member_status_list,
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      datetime_range: '',
      phone: '',
      device_type: '',
      member_status: '',
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
      if (this.phone) {
        config['phone'] = '' + this.phone
      }
      if (this.device_type) {
        config['device_type'] = this.device_type
      }
      if (this.member_status) {
        config['member_status'] = this.member_status
      }
      if (this.datetime_range && this.datetime_range.length === 2) {
        config['begin_time'] = '' + this.datetime_range[0].getTime()
        config['end_time'] = '' + this.datetime_range[1].getTime()
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
    refresh_data: function() {
      const config = this.get_params()
      get_parent_list(config).then(res => {
        const table_data = []
        const base_index = (config.page_no - 1) * config.page_num + 1
        // 会员信息
        res.data.forEach((r, i, _a) => {
          let vip_label
          if (r.begin_time && r.end_time) {
            vip_label = ['VIP体验会员（', date_formatter(r.begin_time, DATE_FORMAT_WITH_POINT),
              '-', date_formatter(r.end_time, DATE_FORMAT_WITH_POINT), '）'].join('')
          } else {
            vip_label = ''
          }
          const item = {
            ...r,
            vip_label,
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
      get_patriarch_list_export(config).then(res => {
        if (res.status === 0) {
          const remote_data = res.data
          console.log('remote_data', remote_data)
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
      const filename = '后台管理-家长端数据'
      import('@/utils/Export2Excel').then(excel => {
        const t_header = ['用户昵称', '手机号', '注册时间',
          '设备类型', '会员开始时间', '会员结束时间', '孩子昵称',
          '孩子性别', '孩子出生日期', '孩子年级']
        // filter_val 必须为存在的字段，且filter_val的长度要小于t_header的长度
        const filter_val = ['nick_name', 'phone', 'create_time',
          'device_type_label', 'begin_time', 'end_time', 'child_nick_name',
          'child_sex', 'child_birthdate', 'child_grade']
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
    padding: 15px 25px;
    min-height: 120px;

  }

  .header-line {
    display: flex;
    flex-direction: row;

    .header-line-left {
      flex: 1;
      display: flex;
      flex-direction: row;

      .header-block {
        display: flex;
        flex-direction: row;

        .search-item {
          vertical-align: middle;
          display: inline-block;
          height: $label_height;
          line-height: $label_height;
          padding-right: 8px;
          min-width: 70px;
          color: #4d4d4d;
          font-size: 14px;
          font-weight: 600;
        }
      }

      .phone-block {
        width: 200px;
      }

      .platform-block {
        width: 200px;
        margin-left: 20px;
      }

      .member-status-block {
        width: 200px;
        margin-left: 20px;
      }

      .search-time {
        width: 440px;
      }
    }

    .header-line-right {
      min-width: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  /*.hr-diviser {*/
  /*border-top: solid #c8c8c8 1px;*/
  /*width: 100%;*/
  /*border-bottom: 0;*/
  /*}*/
}
</style>
