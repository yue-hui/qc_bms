<template>
  <div class="component-card">
    <el-dialog
      :visible.sync="is_show"
      :before-close="before_close"
      top="20vh"
      size="mini"
      title="设备操作记录">
      <el-table
        v-loading="loading"
        :data="gridData"
        size="mini">
        <el-table-column property="time" label="时间" width="150" />
        <el-table-column property="desc" label="事件描述" />
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-pagination
          :current-page="page"
          :page-size="page_size"
          :page-sizes="page_sizes"
          :total="total"
          size="mini"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="change_current"
          @size-change="table_size_change" />
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { get_child_record_details } from '@/api/interactive'
import { date_formatter } from '@/utils/common'
import { DATE_TIME_FORMAT, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'

export default {
  name: 'DeviceBindRecords',
  props: {
    childId: {
      type: String,
      default: ''
    }
  },
  data: function() {
    const page_size = getPagenationSize()
    return {
      is_show: true,
      page: 1,
      page_size,
      loading: true,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      gridData: []
    }
  },
  computed: {},
  watch: {},
  mounted: function() {
    this.load_data()
  },
  methods: {
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.load_data()
    },
    change_current: function(page) {
      this.page = page
      this.load_data()
    },
    before_close: function() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.is_show = false
          this.$emit('refresh')
        })
        .catch(_ => {
        })
    },
    get_config: function() {
      return {
        page_no: this.page,
        page_num: this.page_size
      }
    },
    load_data() {
      const config = this.get_config()
      config['child_user_id'] = this.childId
      this.loading = true
      get_child_record_details(config).then(res => {
        const remote_data = res.data
        this.total = res.total_count
        this.gridData = remote_data.map(r => {
          return {
            time: date_formatter(r.operate_time, DATE_TIME_FORMAT),
            desc: r.desc
          }
        })
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-card {
  width: 100%;
  height: 100%;
}
</style>
