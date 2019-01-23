<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="card-header-content">
        <span>详细数据</span>
        <el-button
          :loading="download_loading"
          class="download"
          size="mini"
          type="success"
          @click="download">导出
          <svg-icon icon-class="download" />
        </el-button>
      </div>
    </div>
    <div>
      <div class="table-block">
        <el-table
          :data="data_list"
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
            label="绑定设备总数"
            prop="total_bind_device" />
          <el-table-column
            align="center"
            label="绑定用户总数"
            prop="total_bind_user" />
          <el-table-column
            align="center"
            label="总注册用户数"
            prop="total_user" />
        </el-table>
        <el-pagination
          :current-page="page"
          :page-size="page_size"
          :page-sizes="[100, 200, 300, 400]"
          :total="total"
          layout="total, prev, pager, next, jumper"
          @current-change="change_current"
          @size-change="table_size_change" />
      </div>
    </div>
  </el-card>
</template>

<script>
import { ANALYSIS_DETAILS_NAME, DEFAULT_PAGE_SIZE } from '@/utils/constant'
import { get_user_analysis_details } from '@/api/interactive'
import { date_formatter } from '@/utils/common'

export default {
  name: '',
  beforecreate: function() {
  },
  props: {
    condition: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    return {
      download_loading: false,
      data_list: [],
      page: 1,
      page_size: DEFAULT_PAGE_SIZE,
      total: 0,
      date_range: []
    }
  },
  computed: {},
  watch: {},
  mounted: function() {
    this.fetch_user_analysis_details()
  },
  methods: {
    download: function() {
      this.download_loading = true
      const options = {
        ...this.condition,
        page_no: 1,
        page_num: this.total
      }
      const start_time_string = date_formatter(this.condition['begin_time'])
      const end_time_string = date_formatter(this.condition['end_time'])
      let filename
      if (start_time_string === end_time_string) {
        filename = [ANALYSIS_DETAILS_NAME, start_time_string].join('_')
      } else {
        filename = [ANALYSIS_DETAILS_NAME, start_time_string, end_time_string].join('_')
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
    table_size_change(page_size) {
      this.page_size = page_size
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
      return options
    },
    load_details() {
      this.fetch_user_analysis_details()
    },
    search() {
      this.page = 1
      this.page_size = DEFAULT_PAGE_SIZE
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
