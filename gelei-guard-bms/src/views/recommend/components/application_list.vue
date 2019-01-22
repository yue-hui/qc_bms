<template>
  <div class="component-card">
    <div>
      <div class="table-block">
        <el-table
          :data="data_list"
          style="width: 100%">
          <el-table-column
            align="center"
            label="应用名称"
            prop="soft_name" />
          <el-table-column
            align="center"
            width="140"
            label="学科"
            prop="subject_list">
            <template slot-scope="scope">
              <el-row :gutter="1">
                <el-col
                  v-for="(subject_label, index) in scope.row.subject_label_list"
                  :key="index"
                  :span="8"
                  class="show-list-content">
                  <el-tag size="mini">{{ subject_label }}</el-tag>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="176"
            label="所属年级"
            prop="grade_list">
            <template slot-scope="scope">
              <el-row :gutter="2">
                <el-col
                  v-for="(grade_label, index) in scope.row.grade_label_list"
                  :key="index"
                  :span="8"
                  class="show-list-content">
                  <el-tag size="mini" class="show-list-item">{{ grade_label }}</el-tag>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="适用年龄"
            prop="age_label" />
          <el-table-column
            align="center"
            label="适用性别"
            prop="sex_label" />
          <el-table-column
            align="center"
            label="安装次数"
            prop="install_count" />
          <el-table-column
            align="center"
            label="星级"
            prop="rec_level"
            width="180">
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.rec_level_score"
                :colors="['#b9b9b9', '#bdbdbd', '#b8b8b8', '#8c8c8c', '#5e5e5e', '#444444', '#404040', '#303030', '#121212', '#000000']"
                disabled/>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="所在组合"
            prop="group_list">
            <template slot-scope="scope">
              <div
                v-for="(group, index) in scope.row.group_list"
                :key="index"
                class="show-list-content">
                <el-tag size="mini">{{ group }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="创建日期"
            prop="create_time"
            width="180" />
          <el-table-column
            align="center"
            label="操作"
            prop="total_user"
            width="180">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="edit_application(scope.row)">编辑</el-button>
              <el-button size="small" type="text" @click="delete_application(scope.row)">删除</el-button>
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
import { DEFAULT_PAGE_SIZE, RATE_STARTS_COLOR } from '@/utils/constant'
import { get_manager_soft_recommend_list } from '@/api/interactive'
import { date_formatter, get_grade_label, get_sex_label, get_subject_label } from '@/utils/common'

export default {
  name: 'ApplicationList',
  props: {
    condition: {
      type: Object,
      default: function() {
        return {
          stars_color: RATE_STARTS_COLOR
        }
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
    this.fetch()
  },
  methods: {
    table_size_change(row) {
      console.log('table_size_change', row)
      this.reload()
    },
    change_current(page) {
      console.log('change_current', page)
      this.page = page
      this.reload()
    },
    get_pagination_config() {
      const pagination = {
        page: this.page,
        page_size: this.page_size
      }
      return pagination
    },
    edit_application(row) {
      // 编辑
      const config = {
        type: 'edit',
        params: {
          ...row
        }
      }
      this.$emit('reflex', config)
    },
    delete_application(row) {
      // 删除
      this.$confirm('确认删除？')
        .then(_ => {
          const config = {
            type: 'delete',
            params: {
              record_id: row.record_id
            }
          }
          this.$emit('reflex', config)
        })
        .catch(_ => {
        })
    },
    get_options() {
      const options = {}
      Object.assign(options, this.condition)
      options['page_no'] = this.page
      options['page_num'] = this.page_size
      return options
    },
    grade_label_list(grade_list) {
      return grade_list.map(r => {
        return get_grade_label(r)
      })
    },
    subject_label_list(subject_list) {
      return subject_list.map(r => {
        return get_subject_label(r)
      })
    },
    fetch() {
      const options = this.get_options()
      get_manager_soft_recommend_list(options).then(res => {
        this.data_list = res.data.map(r => {
          const age_label = r.start_age !== r.end_age ? [r.start_age, '-', r.end_age, '岁'].join('') : [r.start_age, '岁'].join('')
          const time_transfer = date_formatter(r.create_time)
          return {
            ...r,
            age_label,
            create_time: time_transfer,
            rec_level_score: r.rec_level - 5,
            sex_label: get_sex_label(r.sex),
            grade_label_list: this.grade_label_list(r.grade_list),
            subject_label_list: this.subject_label_list(r.subject_list)
          }
        })
        this.total = res.total_count
      })
    },
    search() {
      this.page = 1
      this.fetch()
    },
    reload() {
      this.page = 1
      this.fetch()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-card {
  width: 100%;
  height: 100%;
}

.show-list-content {
  display: block;
  .show-list-item{
    min-width: 50px;
  }
}
</style>
