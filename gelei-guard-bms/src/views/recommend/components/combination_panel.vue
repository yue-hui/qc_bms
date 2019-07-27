<template>
  <div class="component-card">
    <el-table
      :data="data_list"
      :stripe="true"
      size="mini">
      <el-table-column
        align="center"
        label=""
        width="60">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checked" @change="change_check_box(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        label="应用名称"
        prop="soft_name" />
      <el-table-column
        align="center"
        label="学科"
        prop="subject_list_label"
        width="100">
        <template slot-scope="scope">
          <div v-for="(subject_label, index) in scope.row.subject_list_label" :key="index">{{ subject_label }}</div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="所属年级"
        prop="grade_list_label"
        width="100">
        <template slot-scope="scope">
          <div v-for="(grade_label, index) in scope.row.grade_list_label" :key="index">{{ grade_label }}</div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="适用年龄"
        prop="start_age"
        width="100" />
      <el-table-column
        align="center"
        label="适用性别"
        prop="sex_label"
        width="100" />
    </el-table>

    <el-pagination
      :current-page="page"
      :page-size="page_size"
      :page-sizes="[10, 20, 50, 100]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="change_current"
      @size-change="table_size_change" />
  </div>
</template>

<script>
import { get_manager_soft_recommend_list } from '@/api/interactive'
import { SUBJECT_LIST } from '@/utils/constant'
import { date_formatter, get_sex_label, grade_number_map_label, subject_number_map_label } from '@/utils/common'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'

export default {
  name: 'CombinationPanel',
  beforecreate: function() {
  },
  props: {
    condition: {
      type: Object,
      default: function() {
        return {}
      }
    },
    applications: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data: function() {
    const page_size = getPagenationSize()
    return {
      data_list: [],
      page: 1,
      page_size,
      total: 0
    }
  },
  computed: {},
  watch: {
    condition: {
      handler(val) {
        this.search()
      },
      deep: true
    }
  },
  methods: {
    check_if_in_selection(res) {
      const check_box = this.applications.filter(r => r.record_id === res.record_id)
      return !!check_box.length
    },
    search() {
      const subject_list = SUBJECT_LIST.filter(r => this.condition.subjects.indexOf(r.name) !== -1).map(r => r.val)
      const options = {
        grade: this.condition.grade,
        page_no: this.page,
        page_num: this.page_size,
        subject_list
      }
      get_manager_soft_recommend_list(options).then(res => {
        this.data_list = res.data.map(r => {
          const age_label = r.start_age !== r.end_age ? [r.start_age, '-', r.end_age, '岁'].join('') : [r.start_age, '岁'].join('')
          const time_transfer = date_formatter(r.create_time)
          const checked = this.check_if_in_selection(r)
          return {
            ...r,
            age_label,
            checked,
            create_time: time_transfer,
            grade_list_label: grade_number_map_label(r.grade_list),
            subject_list_label: subject_number_map_label(r.subject_list),
            sex_label: get_sex_label(r.sex)
          }
        })
        this.total = res.total_count
      })
    },
    table_size_change(page_size) {
      this.page_size = page_size
      setPagenationSize(page_size)
      this.search()
    },
    change_current(page) {
      this.page = page
      this.search()
    },
    change_check_box(row) {
      // 异步修改同步到主界面
      this.$emit('rsync_app', row)
    },
    sync_table_rows() {
      // 同步表格信息
      this.data_list.forEach((r, i, _a) => {
        r.checked = this.check_if_in_selection(r)
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
