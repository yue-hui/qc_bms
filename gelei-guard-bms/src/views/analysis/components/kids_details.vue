<template>
  <el-card class="box-card">
    <el-button
      :loading="download_loading"
      class="download details-tab"
      size="mini"
      type="success"
      @click="download">导出
      <svg-icon icon-class="download" />
    </el-button>

    <el-tabs v-model="active_tab" tab-position="top" @tab-click="tab_change">
      <el-tab-pane label="孩子端 - 详细数据" name="child">
        <div class="table-block">
          <el-table
            :data="data_child_list"
            size="mini"
            style="width: 100%">
            <el-table-column
              align="center"
              label="时间"
              prop="date" />
            <el-table-column
              align="center"
              label="新增用户数"
              prop="increased_user" />
            <el-table-column
              align="center"
              label="新增绑定用户数"
              prop="increased_bind_user" />
            <el-table-column
              align="center"
              label="当前绑定用户数"
              prop="cur_total_bind_user" />
            <el-table-column
              align="center"
              label="累计绑定用户数"
              prop="total_bind_user" />
            <el-table-column
              align="center"
              label="累计用户数"
              prop="total_user" />
          </el-table>
          <el-pagination
            :current-page="page_child"
            :page-size="page_size_child"
            :page-sizes="page_sizes"
            :total="total_child"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="change_current_child"
            @size-change="child_table_size_change" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { ANALYSIS_DETAILS_NAME, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { get_user_analysis_child_details } from '@/api/interactive'
import { date_formatter } from '@/utils/common'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'

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
      active_tab: 'child', // child: 孩子端  parent: 家长端
      download_loading: false,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      data_child_list: [], // 孩子端
      page_child: 1,
      page_size_child: page_size,
      total_child: 0,
      date_range: []
    }
  },
  computed: {},
  watch: {},
  mounted: function() {
  },
  methods: {
    download() {
      this.download_loading = true
      const options = {
        ...this.condition,
        page_no: 1,
        page_num: this.total_child
      }
      const start_time_string = date_formatter(this.condition['begin_time'])
      const end_time_string = date_formatter(this.condition['end_time'])
      let filename
      if (start_time_string === end_time_string) {
        filename = [ANALYSIS_DETAILS_NAME, '孩子端', start_time_string].join('_')
      } else {
        filename = [ANALYSIS_DETAILS_NAME, '孩子端', start_time_string, end_time_string].join('_')
      }
      get_user_analysis_child_details(options).then(res => {
        const data_list = res.data
        import('@/utils/Export2Excel').then(excel => {
          const t_header = ['时间', '新增用户数', '新增绑定用户数', '当前绑定用户数',
            '累计绑定用户数', '累计用户数']
          // filter_val 必须为存在的字段，且filter_val的长度要小于t_header的长度
          const filter_val = ['date', 'increased_user', 'increased_bind_user', 'cur_total_bind_user',
            'total_bind_user', 'total_user']
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
    child_table_size_change(size) {
      this.page_size_child = size
      setPagenationSize(size)
      this.fetch_user_analysis_child_details()
    },
    change_current_child(page) {
      this.page_child = page
      this.fetch_user_analysis_child_details()
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
      // 孩子端
      this.page_child = 1
      this.fetch_user_analysis_child_details()
    },
    fetch_user_analysis_child_details() {
      const options = this.get_child_options()
      get_user_analysis_child_details(options).then(res => {
        this.data_child_list = res.data
        this.total_child = res.total_count
      })
    },
    tab_change() {
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

  .details-tab {
    position: absolute;
    right: 20px;
    z-index: $base_z_index;
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
