<template>
  <el-card class="box-card">
    <div class="action-area">
      <el-button
        :loading="download_loading"
        class="download details-tab"
        size="mini"
        type="success"
        @click="download">导出
        <svg-icon icon-class="download" />
      </el-button>

      <el-dropdown
        size="small"
        trigger="hover"
        type="primary"
        @command="handle_command">
        <span class="el-dropdown-link">{{ device_brand.name }} - 详细数据<i
          class="el-icon-arrow-down el-icon--right" /></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(device_brand, index) in device_brands"
            :key="index"
            :command="device_brand.command"
            class="analysis-details">{{ device_brand.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="table-block">
      <el-table
        :data="data_list"
        size="mini"
        style="width: 100%">
        <el-table-column
          align="center"
          label="时间"
          prop="date" />
        <el-table-column
          align="center"
          label="新增注册用户"
          prop="increased_user" />
        <el-table-column
          align="center"
          label="新增绑定用户"
          prop="increased_bind_user" />
        <el-table-column
          align="center"
          label="新增绑定设备"
          prop="increased_bind_device" />
        <el-table-column
          align="center"
          label="当前绑定设备数"
          prop="cur_total_bind_device" />
        <el-table-column
          align="center"
          label="累计绑定设备数"
          prop="total_bind_device" />
        <el-table-column
          align="center"
          label="累计绑定用户数"
          prop="total_bind_user" />
        <el-table-column
          align="center"
          label="总注册用户数"
          prop="total_user" />
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
  </el-card>
</template>

<script>
import { ANALYSIS_DETAILS_NAME, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { get_user_analysis_details } from '@/api/interactive'
import { date_formatter } from '@/utils/common'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { device_brands } from './details'

export default {
  name: '',
  props: {
    condition: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    const page_size = getPagenationSize()
    return {
      device_brands,
      device_brand: {
        name: '家长端',
        command: ''
      },
      download_loading: false,
      data_list: [], // 家长端
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0
    }
  },
  computed: {},
  watch: {},
  mounted: function() {
  },
  methods: {
    handle_command(command) {
      const device_brand = device_brands.find(item => {
        return item.command === command
      })
      this.device_brand = device_brand
      this.page = 1
      this.fetch_user_analysis_details()
    },
    download() {
      this.download_loading = true
      const options = {
        ...this.condition,
        page_no: 1,
        page_num: this.total
      }
      if (this.device_brand && this.device_brand.command) {
        options['device_brand'] = this.device_brand.command
      }
      const start_time_string = date_formatter(this.condition['begin_time'])
      const end_time_string = date_formatter(this.condition['end_time'])
      let filename
      if (start_time_string === end_time_string) {
        filename = [ANALYSIS_DETAILS_NAME, this.device_brand.name, start_time_string].join('_')
      } else {
        filename = [ANALYSIS_DETAILS_NAME, this.device_brand.name, start_time_string, end_time_string].join('_')
      }
      get_user_analysis_details(options).then(res => {
        const data_list = res.data
        import('@/utils/Export2Excel').then(excel => {
          const t_header = ['时间', '新增注册用户', '新增绑定用户', '新增绑定设备',
            '绑定设备总数', '绑定用户总数', '总注册用户数']
          // filter_val 必须为存在的字段，且filter_val的长度要小于t_header的长度
          const filter_val = ['date', 'increased_user', 'increased_bind_user', 'increased_bind_device',
            'total_bind_device', 'total_bind_user', 'total_user']
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
    table_size_change(size) {
      this.page_size = size
      setPagenationSize(size)
      this.fetch_user_analysis_details()
    },
    change_current(page) {
      this.page = page
      this.fetch_user_analysis_details()
    },
    get_options() {
      const options = {
        page_no: this.page,
        page_num: this.page_size
      }
      if (this.condition.begin_time) {
        options['begin_time'] = new Date(this.condition.begin_time).getTime()
      }
      if (this.condition.end_time) {
        options['end_time'] = new Date(this.condition.end_time).getTime()
      }
      if (this.device_brand && this.device_brand.command) {
        options['device_brand'] = this.device_brand.command
      }
      return options
    },
    get_child_options() {
      const options = {
        page_no: this.page_child,
        page_num: this.page_size_child
      }
      if (this.condition.begin_time) {
        options['begin_time'] = new Date(this.condition.begin_time).getTime()
      }
      if (this.condition.end_time) {
        options['end_time'] = new Date(this.condition.end_time).getTime()
      }
      return options
    },
    search() {
      // 家长端
      this.page = 1
      this.page_size = getPagenationSize()
      this.fetch_user_analysis_details()
    },
    fetch_user_analysis_details() {
      const options = this.get_options()
      get_user_analysis_details(options).then(res => {
        this.data_list = res.data
        this.total = res.total_count
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.card-header-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.download {
  color: #ffffff;

  &:hover {
    color: green;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
$base_z_index: 2000;
.box-card {
  position: relative;

  .action-area {
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;

    .details-tab {
      position: absolute;
      right: 20px;
      z-index: $base_z_index;
    }
  }

  .el-card__header {
    padding: 10px 20px;

    .card-header-content {
      height: 29px;
      line-height: 29px;

      span {
        height: 29px;
        line-height: 29px;
      }

      button {
        padding: 0px 15px;
        height: 29px;
        line-height: 29px;
      }
    }
  }
}
</style>

<style>
.el-dropdown-link {
  height: 32px;
  font-weight: bolder;
  font-size: 14px;
}

.analysis-details.el-dropdown-menu__item {
  font-size: 14px;
}
</style>
