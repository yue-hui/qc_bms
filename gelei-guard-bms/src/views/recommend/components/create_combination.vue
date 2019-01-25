<template>
  <div class="component-card">
    <el-dialog
      :before-close="handle_close"
      :title="title"
      :visible.sync="isShow"
      class="gg-el-dialog"
      size="mini"
      top="5vh"
      width="50%">

      <div class="show-dialog-pannel">

        <el-form
          ref="combination"
          :model="combination_form"
          :rules="combination_rules"
          label-width="140px"
          class="demo-ruleForm">

          <el-form-item label="组合名称:" prop="group_name">
            <el-input
              v-model="combination_form.group_name"
              :disabled="!isCreate && rec_type === '1'"
              placeholder="组合名称"
              size="mini" />
          </el-form-item>
          <el-form-item label="年级选择:" prop="grade">
            <el-select
              v-model="combination_form.grade"
              placeholder="请选择应用组合年级"
              size="mini"
              @change="change_grade">
              <el-option
                v-for="(grade, index) in grade_list"
                :key="index"
                :label="grade.name"
                :value="grade.val"
                class="el-select-dropdown__item__recommend" />
            </el-select>
          </el-form-item>
          <el-form-item label="学科选择:" prop="subjects">
            <el-checkbox-group
              v-model="combination_form.subjects"
              @change="change_subject">
              <el-row :span="24">
                <el-col v-for="(subject, index) in subject_list" :key="index" :span="4">
                  <el-checkbox :key="subject.val" :label="subject.name">{{ subject.name }}</el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="符合条件的应用:" prop="applications">
            <div class="application-items">
              <div
                v-for="app in combination_form.applications"
                :key="app.name"
                class="application-item">
                <el-tag
                  closable
                  size="medium"
                  @close="close_tags(app)">
                  APP:{{ app.name }}
                </el-tag>
              </div>
            </div>
          </el-form-item>
          <combination-panel
            ref="comb_panel"
            :applications="combination_form.applications"
            :condition="panel_condition"
            @rsync_app="rsync_application" />

        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="$emit('receive', false)">取 消</el-button>
        <el-button size="mini" type="primary" @click="emmit_application">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import combinationPanel from '@/views/recommend/components/combination_panel'
import {
  create_soft_recommend_group,
  edit_soft_recommend_group,
  get_soft_recommend_group_detail
} from '@/api/interactive'
import { GRADE_LIST, SUBJECT_LIST } from '@/utils/constant'

export default {
  name: 'CombinationCreate',
  beforecreate: function() {
  },
  components: {
    combinationPanel
  },
  props: {
    isCreate: {
      type: Boolean,
      default: true
    },
    isShow: {
      type: Boolean,
      default: false
    },
    condition: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    return {
      panel_condition: {},
      grade_labels: [],
      app_list: [],
      rec_type: '1', // 1 - 系统推荐、2 - 手动推荐
      grade_list: GRADE_LIST,
      subject_list: SUBJECT_LIST,
      combination_form: {
        rec_group_id: '',
        group_name: '',
        grade: '',
        subjects: [],
        applications: []
      },
      combination_rules: {
        group_name: { required: true, message: '应用组合名不能为空', trigger: 'blur' },
        grade: { required: true, message: '请选择应用组合的年级', trigger: 'blur' },
        // subjects: { required: true, message: '至少选择一个学科', trigger: 'blur' },
        applications: { required: true, message: '至少选择一个符合条件应用组合', trigger: 'blur' }
      }
    }
  },
  computed: {
    title: function() {
      if (this.isCreate) {
        return '创建应用组合'
      } else {
        return '编辑应用组合'
      }
    }
  },
  watch: {},
  mounted: function() {
    if (!this.isCreate) {
      this.load_edit_details()
    }
  },
  methods: {
    manual_load(is_create = true) {
      if (is_create) {
        this.init_new_dialog()
      } else {
        this.edit_new_dialog()
      }
    },
    init_new_dialog() {
      this.combination_form.rec_group_id = ''
      this.combination_form.group_name = ''
      this.combination_form.grade = ''
      this.combination_form.subjects = []
      this.combination_form.applications = []
    },
    edit_new_dialog() {
      this.combination_form.rec_group_id = this.condition.rec_group_id
      this.combination_form.group_name = this.condition.group_name
      this.combination_form.grade = this.condition.grade
      this.combination_form.subjects = this.condition.subjects
      this.combination_form.applications = this.condition.applications
    },
    handle_close(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('receive', false)
        })
        .catch(_ => {
        })
    },
    get_application_config() {
      const record_id_list = this.combination_form.applications.map(r => {
        return r.record_id
      })
      const config = {
        rec_group_id: this.condition.rec_group_id,
        grade: this.combination_form.grade,
        group_name: this.combination_form.group_name,
        record_id_list,
        rec_type: this.rec_type
      }
      return config
    },
    emmit_application() {
      this.$refs.combination.validate((valid) => {
        if (valid) {
          const config = this.get_application_config()
          if (this.isCreate) {
            this.create(config)
          } else {
            this.edit(config)
          }
        } else {
          return false
        }
      })
    },
    create(config) {
      // 创建接口
      create_soft_recommend_group(config).then(res => {
        if (res.status === 0) {
          this.$emit('receive', false)
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    edit(config) {
      // 编辑接口
      edit_soft_recommend_group(config).then(res => {
        if (res.status !== 0) {
          this.$message.error(res.message)
        } else {
          this.$message.success(res.message)
        }
      })
      this.$emit('receive', false)
    },
    change_condition() {
      this.panel_condition = {
        grade: this.combination_form.grade,
        subjects: this.combination_form.subjects
      }
    },
    change_grade(grade) {
      this.change_condition()
    },
    change_subject(subjects) {
      this.change_condition()
    },
    rsync_application(app) {
      // 异步同步表格选择数据
      const checked = app.checked
      if (checked) {
        const tag = {
          name: app.soft_name,
          record_id: app.record_id
        }
        this.combination_form.applications.push(tag)
      } else {
        this.combination_form.applications = this.combination_form.applications.filter(r => r.record_id !== app.record_id)
      }
    },
    close_tags(app) {
      // close app tags
      this.combination_form.applications = this.combination_form.applications.filter(r => r.record_id !== app.record_id)
      // sync checked box status
      // must be next tick
      this.$nextTick(() => {
        this.$refs.comb_panel.sync_table_rows()
      })
    },
    load_edit_details() {
      const config = {
        rec_group_id: this.condition.rec_group_id
      }
      get_soft_recommend_group_detail(config).then(res => {
        if (res.status === 0) {
          const data = res.data
          this.combination_form.group_name = data.group_name
          this.combination_form.grade = data.grade
          this.rec_type = data.rec_type
          // this.combination_form.subjects = data.subject_list
          this.combination_form.applications = data.soft_list.map(r => {
            const config = {
              name: r.soft_name,
              record_id: r.record_id
            }
            return config
          })
          this.change_condition()
          this.$nextTick(() => {
            this.$refs.comb_panel.search()
          })
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

  .gg-el-dialog {
    min-width: 840px;

    .row {
      display: flex;
      flex-direction: row;
      padding: 10px;
      align-items: center;

      .column {
        height: 100%;
      }

      .column-label {
        width: 80px;
        min-width: 80px;
        color: #a9a9a9;
        font-weight: bold;
      }

      .match-label {
        color: #a9a9a9;
        font-weight: bold;
      }

      .column-label-application {
        color: #a9a9a9;
        width: 100%;
      }

      .column-content {
        flex: 1;

        .application-name-input {
          width: 100%;
        }

        .app-list-tags {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;

          .app-list-tag {
            padding: 5px;
          }
        }

        .age-group-block {
          display: flex;
          flex-direction: row;

          .age-group-sub-block {
            width: 60px;
            text-align: center;
          }

          .grade-to-word {
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            text-align: center;
          }
        }
      }
    }
  }
}

.application-items{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .application-item{
    padding: 0 5px;
  }
}
</style>
