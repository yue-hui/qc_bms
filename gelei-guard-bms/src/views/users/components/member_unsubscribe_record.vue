<template>
  <div class="component-card">
    <el-dialog
      :visible.sync="is_show"
      :before-close="before_close"
      top="20vh"
      size="mini"
      title="电信会员退订记录">
      <el-table
        v-loading="loading"
        :data="gridData"
        empty-text="该用户没有退订记录"
        size="mini">
        <el-table-column property="time_label" label="时间" width="150" />
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
import { date_formatter } from '@/utils/common'
import { DATE_TIME_FORMAT, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { get_monthlyplan_unsubscribe_list } from '@/api/interactive'

export default {
  name: 'DeviceBindRecords',
  props: {
    patriarchId: {
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
      this.is_show = false
      this.$emit('refresh')
    },
    get_config: function() {
      return {
        page_no: this.page,
        page_num: this.page_size
      }
    },
    load_data() {
      const config = this.get_config()
      config['patriarch_id'] = this.patriarchId
      this.loading = true
      const data = {
        user_id: this.$route.query.id
      }
      get_monthlyplan_unsubscribe_list(data).then(res => {
        if (res.status === 0) {
          const gridData = res.data || []
          this.gridData = gridData.map(r => {
            const time_label = date_formatter(r.end_date, DATE_TIME_FORMAT)
            const desc = r.unsubscribe_op_user_id + ' 退订了 ' + r.phone + ' 的电信会员'
            return {
              ...r,
              time_label,
              desc
            }
          })
          this.total = res.total_count
        } else {
          this.total = 0
          this.$message.error(res.message)
        }
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
