<template>
  <div class="component-card">
    <div>
      <div class="table-block">
        <el-table
          :data="data_list"
          style="width: 100%">
          <el-table-column
            align="center"
            label="推荐组合名称"
            prop="group_name" />
          <el-table-column
            align="center"
            label="年级"
            prop="grade_name" />
          <el-table-column
            align="center"
            label="应用数量"
            prop="app_count" />
          <el-table-column
            align="center"
            label="推荐人次"
            prop="rec_count" />
          <el-table-column
            align="center"
            label="安装次数"
            prop="install_count" />
          <el-table-column
            align="center"
            label="推荐方式"
            prop="rec_type_label" />
          <el-table-column
            align="center"
            label="当前状态"
            prop="status_name"
            width="80" />
          <el-table-column
            align="center"
            label="生成时间"
            prop="create_time"
            width="180" />
          <el-table-column
            align="center"
            label="操作"
            prop="total_user"
            width="180">
            <template slot-scope="scope">
              <el-button
                :disabled="control_is_enabled(scope.row)"
                @click="control_combinaion(scope.row)"
                size="small"
                type="text"
              >{{ show_label(scope.row) }}
              </el-button>
              <el-button
                :disabled="edit_is_enabled(scope.row)"
                @click="edit_combinaion(scope.row)"
                size="small"
                type="text"
              >编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="page"
          :page-size="page_size"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          @current-change="change_current"
          @size-change="table_size_change"
          layout="total, prev, pager, next, jumper" />
      </div>
    </div>
  </div>
</template>

<script>
import { DEFAULT_PAGE_SIZE } from '@/utils/constant'
import { get_soft_recommend_group } from '@/api/interactive'
import { date_formatter, get_app_combination_status, get_grade_label, get_rec_type_label } from '@/utils/common'

export default {
  name: 'ApplicationList',
  props: {},
  beforecreate: function() {
  },
  data: function() {
    return {
      data_list: [],
      page: 1,
      page_size: DEFAULT_PAGE_SIZE,
      total: 0
    }
  },
  computed: {},
  watch: {},
  mounted: function() {
    this.reload()
  },
  methods: {
    show_label(row) {
      if (row.rec_type === '1') {
        if (row.status === '01' || row.rec_type === '1') {
          return '开启'
        } else {
          return '关闭'
        }
      } else {
        if (row.status === '01' || row.rec_type === '1') {
          return ''
        } else {
          return '推送'
        }
      }
    },
    table_size_change(row) {
      console.log('table_size_change', row)
      this.reload()
    },
    change_current(page) {
      this.page = page
      console.log('change_current', page)
      this.reload()
    },
    get_pagination_config() {
      const pagination = {
        page: this.page,
        page_size: this.page_size
      }
      return pagination
    },
    reload() {
      const config = this.get_pagination_config()
      console.log('reload request', config)
      get_soft_recommend_group(config).then(res => {
        this.data_list = res.data.map(r => {
          const time_transfer = date_formatter(r.create_time)
          return {
            ...r,
            create_time: time_transfer,
            grade_name: get_grade_label(r.grade),
            rec_type_label: get_rec_type_label(r.rec_type),
            status_name: get_app_combination_status(r.rec_type, r.status)
          }
        })
      })
    },
    edit_is_enabled(row) {
      if (row.rec_type === '1' && row.status === '02') {
        return true
      }
      return false
    },
    control_is_enabled(row) {
      if (row.rec_type === '1' && row.status === '02') {
        return true
      }
      return false
    },
    edit_combinaion(row) {
      // 编辑
      this.$emit('edit', row)
    },
    control_combinaion(row) {
      // 推送  已开启  已关闭
      this.$emit('control', row)
      if (['01', '1'].indexOf(row.rec_type) !== -1) {
        if (['01', '1'].indexOf(row.status) !== -1) {
          // 系统  待开启
          console.log('系统  待开启')
        } else {
          // 系统 已开启不作处理
        }
      } else {
        // 暂不处理
      }
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
