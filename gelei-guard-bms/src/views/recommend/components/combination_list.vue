<template>
  <div class="component-card">
    <div>
      <div class="table-block">
        <el-table
          :data="data_list"
          :stripe="true"
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="推荐组合名称"
            width="140"
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
                size="small"
                type="text"
                @click="control_combinaion(scope.row)"
              >{{ show_label(scope.row) }}
              </el-button>
              <el-button
                :disabled="edit_is_enabled(scope.row)"
                size="small"
                type="text"
                @click="edit_combinaion(scope.row)"
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
          layout="total, prev, pager, next, jumper"
          @current-change="change_current"
          @size-change="table_size_change" />
      </div>
    </div>
  </div>
</template>

<script>
import { DEFAULT_PAGE_SIZE } from '@/utils/constant'
import {
  deploy_soft_recommend_group,
  forbidden_soft_recommend_group,
  get_soft_recommend_group
} from '@/api/interactive'
import { date_formatter, get_app_combination_status, get_grade_label, get_rec_type_label } from '@/utils/common'

export default {
  name: 'ApplicationList',
  props: {
    conditions: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
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
        // 系统推荐
        if (['01', '1'].indexOf(row.status) !== -1) {
          return '开启'
        } else {
          return '已开启'
        }
      } else {
        // 手工推荐
        if (['01', '1'].indexOf(row.status) !== -1) {
          return '推送'
        } else {
          return '暂停'
        }
      }
    },
    table_size_change(row) {
      this.reload()
    },
    change_current(page) {
      this.page = page
      console.log('change_current', page)
      this.reload()
    },
    get_pagination_config() {
      const pagination = {
        page_no: this.page,
        page_num: this.page_size
      }
      return pagination
    },
    reset_pagination_and_load_data() {
      this.page = 1
      this.page_size = DEFAULT_PAGE_SIZE
      this.reload()
    },
    reload() {
      const config = this.get_pagination_config()
      for (const query_key in this.conditions) {
        if (this.conditions[query_key]) {
          config[query_key] = this.conditions[query_key]
        }
      }
      this.load_data(config)
    },
    load_data(config) {
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
        this.total = res.total_count
      })
    },
    edit_is_enabled(row) {
      // 编辑
      if (row.rec_type === '1') {
        // 系统推荐
        if (row.enabled === '1') {
          return false
        }
      } else if (row.rec_type === '2') {
        // 手工推荐
        if (['02', '2'].indexOf(row.status) !== -1) {
          // 已发送状态
          return true
        }
        if (row.enabled === '0') {
          return true
        }
      }
      return true
    },
    control_is_enabled(row) {
      // 开启/关闭
      if (row.rec_type === '1') {
        // 系统推荐
        if (row.enabled === '1' && ['01', '1'].indexOf(row.status) !== -1) {
          // 可用状态都开启
          return false
        }
      } else if (row.rec_type === '2') {
        // 手工推荐
        return false
      }
      return true
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
          const rec_group_id = row.rec_group_id
          this.depoly_application_group_or_not(rec_group_id, true)
        } else {
          // 系统 已开启不作处理
        }
      } else {
        // 手工 暂不处理
      }
    },
    suspend_application_group(rec_group_id) {
      // 手工 停用接口
      const config = { rec_group_id }
      forbidden_soft_recommend_group(config).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    depoly_application_group_or_not(rec_group_id, published) {
      const config = {
        rec_group_id,
        published
      }
      deploy_soft_recommend_group(config).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.reload()
        } else {
          this.$message.error(res.message)
        }
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

.table_header {
  background-color: #44474c;
}
</style>
