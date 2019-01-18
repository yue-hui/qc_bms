<template>
  <div class="component-card">
    <el-dialog
      :before-close="handle_close"
      :title="title"
      :visible.sync="isShow"
      size="mini"
      width="30%">

      <div class="show-dialog-pannel">
        <div class="row">
          <div class="column column-label">
            <span>应用名称:</span>
          </div>
          <div class="column column-content">
            <template v-if="isCreate">
              <el-select
                v-model="rec_bundle_id"
                :filterable="true"
                :remote="true"
                :remote-method="remote_application"
                class="application-name-input"
                collapse-tags
                placeholder="添加应用"
                size="mini"
                @change="change_app">
                <el-option
                  v-for="(item, index) in app_list"
                  :key="index"
                  :label="item.soft_name"
                  :value="item.rec_bundle_id"
                  class="el-select-dropdown__item__recommend">
                  <div class="select-slot-block">
                    <span title="item.app_name">{{ item.soft_name }}</span>
                    <span title="item.app_name">{{ item.soft_name }}</span>
                  </div>
                </el-option>
              </el-select>
            </template>
            <template v-if="!isCreate">
              <el-input v-model="soft_name" disabled />
            </template>
          </div>
        </div>
        <div class="row">
          <div class="column column-label">
            <span />
          </div>
          <div class="column column-content">
            <div class="app-list-tags">
              <div v-for="(app, index) in app_tags" :key="index" class="app-list-tag">
                <el-tag closable @close="close_app_tag(app.id)">{{ app.name }}</el-tag>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="column column-label">
            <span>适用年级:</span>
          </div>
          <div class="column column-content">
            <el-checkbox-group
              v-model="grade_list">
              <el-row :span="24">
                <template v-for="(grade, index) in grades">
                  <el-col :key="index" :span="4">
                    <el-checkbox :key="index" :label="grade.val">{{ grade.name }}</el-checkbox>
                  </el-col>
                </template>
              </el-row>
            </el-checkbox-group>
          </div>
        </div>
        <div class="row">
          <div class="column column-label">
            <span>适用学科:</span>
          </div>
          <div class="column column-content">
            <el-checkbox-group
              v-model="subject_list">
              <el-row :span="24">
                <el-col v-for="(subject, index) in subjects" :key="index" :span="4">
                  <el-checkbox :key="index" :label="subject.name">{{ subject.name }}</el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </div>
        </div>
        <div class="row">
          <div class="column column-label">
            <span>适用年龄:</span>
          </div>
          <div class="column column-content">
            <div class="age-group-block">
              <el-input v-model="start_age" class="age-group-sub-block" placeholder="请输入年龄段" />
              <span class="grade-to-word">-</span>
              <el-input v-model="end_age" class="age-group-sub-block" placeholder="请输入年龄段" />
              <span class="grade-to-word">岁</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="column column-label">
            <span>适用性别:</span>
          </div>
          <div class="column column-content">
            <el-select
              v-model="sex"
              placeholder="性别"
              size="mini"
              style="width: 80px;">
              <el-option
                v-for="sex in sex_list"
                :key="sex.val"
                :label="sex.name"
                :value="sex.val" />
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="column column-label">
            <span>推荐星级:</span>
          </div>
          <div class="column column-content">
            <el-rate
              v-model="rec_level"
              :allow-half="true"
              :max="5"
              score-template="{value}分"
              show-score
              text-color="#ff9900" />
          </div>
        </div>
        <div class="row">
          <div class="column column-label">
            <span>应用推荐语:</span>
          </div>
          <div class="column column-content">
            <el-input v-model="rec_phrase" placeholder="请输入应用推荐语(20字内)" size="mini" />
          </div>
        </div>
        <div class="row">
          <div class="column column-label">
            <span>小编推荐:</span>
          </div>
          <div class="column column-content">
            <el-input
              v-model="rec_desc"
              columns="10"
              placeholder="请输入小编推荐语"
              rows="5"
              size="mini"
              type="textarea" />
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="emmit_application">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GRADE_LIST, SEX_LIST, SUBJECT_LIST } from '@/utils/constant'
import { create_soft_remmend, edit_soft_remmend, search_soft_recommend_mark } from '@/api/interactive'
import { subject_label_map_number, subject_number_map_label } from '@/utils/common'

export default {
  name: 'ApplicationCreate',
  create: function() {
    if (this.isCreate) {
      this.initital_with_none()
    } else {
      this.initital_with_row()
    }
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
    current: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    return {
      record_id: '',
      rec_bundle_id: '',
      soft_name: '',
      app_tags: [],
      grade_list: [],
      subject_list: [],
      start_age: 0,
      end_age: 0,
      sex: null,
      rec_level: 0,
      rec_phrase: '',
      rec_desc: '',
      app_list: [],
      grades: GRADE_LIST,
      subjects: SUBJECT_LIST,
      sex_list: SEX_LIST
    }
  },
  computed: {
    title: function() {
      if (this.isCreate) {
        return '创建应用'
      } else {
        return '编辑应用'
      }
    }
  },
  watch: {
    isCreate: function(value) {
      if (value) {
        this.initital_with_none()
      } else {
        this.initital_with_row(this.current)
      }
    }
  },
  mounted: function() {
    // this.get_application_list()
  },
  methods: {
    initital_with_none() {
      this.rec_bundle_id = ''
      this.soft_name = ''
      this.grade_list = []
      this.subject_list = []
      this.start_age = 0
      this.end_age = 0
      this.sex = null
      this.rec_level = 0
      this.rec_phrase = ''
      this.rec_desc = ''
    },
    initital_with_row(modified) {
      let current
      if (modified === undefined) {
        current = this.current
      } else {
        current = modified
      }
      console.log('initital_with_row current', current)
      this.record_id = current.record_id
      this.rec_bundle_id = current.rec_bundle_id
      this.soft_name = current.soft_name
      this.grade_list = current.grade_list
      this.subject_list = subject_number_map_label(current.subject_list)
      this.start_age = current.start_age
      this.end_age = current.end_age
      this.sex = current.sex
      this.rec_level = current.rec_level
      this.rec_phrase = current.rec_phrase
      this.rec_desc = current.rec_desc
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
      const config = {
        soft_name: this.soft_name,
        grade_list: this.grade_list,
        subject_list: subject_label_map_number(this.subject_list),
        start_age: this.start_age,
        end_age: this.end_age,
        sex: this.sex,
        rec_level: this.rec_level,
        rec_phrase: this.rec_phrase,
        rec_desc: this.rec_desc
      }
      if (this.isCreate) {
        config['rec_bundle_id'] = this.rec_bundle_id
      } else {
        config['record_id'] = this.record_id
      }
      return config
    },
    cancel() {
      this.$emit('receive', false)
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
      create_soft_remmend(config).then(res => {
        if (res.status === 0) {
          this.$emit('receive', false)
        }
      })
    },
    edit(config) {
      // 编辑接口
      edit_soft_remmend(config).then(res => {
        if (res.status === 0) {
          this.$emit('receive', false)
        }
      })
    },
    change_app(rec_bundle_id) {
      console.log('change rec_bundle_id', rec_bundle_id)
      const app = this.app_list.filter(r => r.rec_bundle_id === rec_bundle_id)
      this.soft_name = app[0]['soft_name']
    },
    close_app_tag(app_id) {
      this.app_tags = this.app_tags.filter(r => r.id !== app_id)
      this.rec_bundle_id = this.rec_bundle_id
    },
    remote_application(value) {
      console.log('remote_application', value)
      this.get_application_list(value)
    },
    get_application_list(key_word = null) {
      let kw
      if (key_word === null) {
        kw = ''
      } else {
        kw = key_word
      }
      const config = { kw }
      console.log('search_soft_recommend_mark', config)
      search_soft_recommend_mark(config).then(res => {
        console.log('search_soft_recommend_mark', res)
        this.app_list = res.data.map(r => {
          return {
            soft_name: r.app_name,
            rec_bundle_id: r.bundle_id,
            description: r.description,
            icon_url: r.icon_url
          }
        })
        console.log('this.app_list', this.app_list)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-card {
  width: 100%;
  height: 100%;

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
      color: #a9a9a9;
      font-weight: bold;
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
</style>

