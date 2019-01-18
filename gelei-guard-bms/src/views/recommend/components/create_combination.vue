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
        <div class="row">
          <div class="column column-label">
            <span>组合名称:</span>
          </div>
          <div class="column column-content">
            <el-input v-model="group_name" placeholder="组合名称" size="mini" />
          </div>
        </div>
        <div class="row">
          <div class="column column-label">
            <span>年级选择:</span>
          </div>
          <div class="column column-content">
            <el-select
              v-model="grade"
              placeholder="添加应用"
              size="mini"
              @change="change_grade">
              <el-option
                v-for="(grade, index) in grade_list"
                :key="index"
                :label="grade.name"
                :value="grade.val"
                class="el-select-dropdown__item__recommend" />
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="column column-label">
            <span>学科选择:</span>
          </div>
          <div class="column column-content">
            <el-checkbox-group
              v-model="subjects"
              @change="change_subject">
              <el-row :span="24">
                <el-col v-for="(subject, index) in subject_list" :key="index" :span="4">
                  <el-checkbox :key="subject.val" :label="subject.name">{{ subject.name }}</el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </div>
        </div>
        <div class="row">
          <div class="column column-label">
            <span />
          </div>
          <div class="column column-content">
            <combination-panel
              ref="comb_panel"
              :applications="applications"
              :condition="panel_condition"
              @rsync_app="rsync_application" />
          </div>
        </div>
        <div class="row">
          <div class="column column-label">
            <span>符合条件的应用:</span>
          </div>
          <div class="column column-content">
            <el-tag
              v-for="app in applications"
              :key="app.name"
              closable
              size="medium"
              @close="close_tags(app)">
              APP:{{ app.name }}
            </el-tag>
          </div>
        </div>
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
      rec_group_id: '',
      group_name: '',
      panel_condition: {},
      applications: [],
      grade: '',
      grade_labels: [],
      subjects: [],
      app_list: [],
      rec_type: '1', // 1 - 系统推荐、2 - 手动推荐
      grade_list: GRADE_LIST,
      subject_list: SUBJECT_LIST
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
      this.rec_group_id = ''
      this.group_name = ''
      this.grade = ''
      this.subjects = []
      this.applications = []
    },
    edit_new_dialog() {
      this.rec_group_id = this.condition.rec_group_id
      this.group_name = this.condition.group_name
      this.grade = this.condition.grade
      this.subjects = this.condition.subjects
      this.applications = this.condition.applications
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
      const bundle_id_list = this.applications.map(r => {
        return r.record_id
      })
      const config = {
        rec_group_id: this.rec_group_id,
        grade: this.grade,
        group_name: this.group_name,
        bundle_id_list,
        rec_type: this.rec_type,
        record_id_list: this.record_id_list
        // subjects: this.subjects
      }
      console.log('config:', config)
      return config
    },
    emmit_application() {
      const config = this.get_application_config()
      if (this.isCreate) {
        this.create(config)
      } else {
        this.edit(config)
      }
    },
    create(config) {
      // 创建接口
      create_soft_recommend_group(config).then(res => {
        if (res.status === 0) {
          this.$emit('receive', false)
        }
      })
    },
    edit(config) {
      // 编辑接口
      // condition
      // const config = {
      //   rec_group_id,
      //   group_name,
      //   grade,
      //   record_id_list,
      //   rec_type
      // }
      edit_soft_recommend_group(config).then(res => {
        console.log('res', res)
      })
      this.$emit('receive', false)
    },
    change_condition() {
      this.panel_condition = {
        grade: this.grade,
        subjects: this.subjects
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
        this.applications.push(tag)
      } else {
        this.applications = this.applications.filter(r => r.record_id !== app.record_id)
      }
    },
    close_tags(app) {
      // close app tags
      console.log('app', app, this.applications)
      this.applications = this.applications.filter(r => r.record_id !== app.record_id)
      // sync checked box status
      // must be next tick
      this.$nextTick(() => {
        this.$refs.comb_panel.sync_table_rows()
      })
    },
    load_edit_details() {
      const rec_group_id = this.condition.rec_group_id
      const config = { rec_group_id }
      get_soft_recommend_group_detail(config).then(res => {
        console.log(res)
        if (res.status === 0) {
          const data = res.data
          this.group_name = data.group_name
          this.grade = data.grade
          this.subjects = data.subject_list
          this.applications = data.soft_list.map(r => {
            const config = {
              name: r.soft_name,
              record_id: r.record_id
            }
            return config
          })
        }
        console.log('-----------------------------------')
        // this.$nextTick(() => {
        //   this.$refs.comb_panel.search()
        // })

        // this.$refs.comb_panel.search()
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
</style>
