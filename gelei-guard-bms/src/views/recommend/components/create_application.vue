<template>
  <div class="component-card">
    <el-dialog
      :before-close="handle_close"
      :title="title"
      :visible.sync="isShow"
      size="mini"
      width="50%">

      <div class="show-dialog-pannel">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="应用名称:" prop="rec_bundle_id">
            <el-select
              v-model="ruleForm.rec_bundle_id"
              :filterable="true"
              :remote="true"
              :remote-method="remote_application"
              class="application-name-input"
              style="width: 100%;"
              collapse-tags
              clearable
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
                  <img :src="item.icon_url" :alt="item.app_name">
                  <span :title="item.app_name">{{ item.soft_name }}</span>
                </div>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="适用年级:" prop="grade_list">
            <el-checkbox-group
              v-model="ruleForm.grade_list">
              <el-row :span="24">
                <template v-for="(grade, index) in grades">
                  <el-col :key="index" :span="4">
                    <el-checkbox :key="index" :label="grade.val">{{ grade.name }}</el-checkbox>
                  </el-col>
                </template>
              </el-row>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="适用学科:" prop="subject_list">
            <el-checkbox-group
              v-model="ruleForm.subject_list">
              <el-row :span="24">
                <el-col
                  v-for="(subject, index) in subjects"
                  :key="index"
                  :span="4">
                  <el-checkbox
                    :key="index"
                    :label="subject.name"
                  >{{ subject.name }}
                  </el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="适用年龄:" prop="start_age">
            <el-row class="age-group-block">
              <el-col :span="2">
                <el-input
                  v-model="ruleForm.start_age"
                  :min="0"
                  :max="99"
                  class="age-group-sub-block"
                  size="mini"
                  placeholder="请输入年龄段" />
              </el-col>
              <el-col :span="1">
                <span class="grade-to-word">-</span>
              </el-col>
              <el-col :span="2">
                <el-input
                  v-model="ruleForm.end_age"
                  :min="0"
                  :max="99"
                  size="mini"
                  class="age-group-sub-block"
                  placeholder="请输入年龄段" />
              </el-col>
              <el-col :span="2">
                <span class="grade-to-word">岁</span>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="适用性别:" prop="sex">
            <el-select
              v-model="ruleForm.sex"
              placeholder="性别"
              size="mini"
              style="width: 80px;">
              <el-option
                v-for="sex in sex_list"
                :key="sex.val"
                :label="sex.name"
                :value="sex.val" />
            </el-select>
          </el-form-item>

          <el-form-item label="推荐星级:" prop="score">
            <div class="rate-display">
              <el-rate
                v-model="score"
                :allow-half="true"
                :max="5"
                text-color="#ff9900" />
              <span>{{ ruleForm.rec_level }}分</span>
            </div>
          </el-form-item>

          <el-form-item label="应用推荐语:" prop="rec_phrase">
            <el-input
              v-model="ruleForm.rec_phrase"
              placeholder="请输入应用推荐语(20字内)"
              size="mini" />
          </el-form-item>

          <el-form-item label="小编推荐:" prop="rec_desc">
            <el-input
              v-model="ruleForm.rec_desc"
              maxlength="200"
              columns="10"
              placeholder="请输入小编推荐语(200字内)"
              rows="5"
              size="mini"
              resize="none"
              type="textarea" />
          </el-form-item>
        </el-form>
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
      app_tags: [],
      app_list: [],
      grades: GRADE_LIST,
      subjects: SUBJECT_LIST,
      sex_list: SEX_LIST,
      ruleForm: {
        record_id: '',
        soft_name: '',
        rec_bundle_id: '',
        rec_level: 5,
        grade_list: [],
        subject_list: [],
        start_age: 0,
        end_age: 99,
        sex: '2',
        rec_phrase: '',
        rec_desc: ''
      },
      rules: {
        rec_bundle_id: { required: true, message: '请输入应用名称', trigger: 'blur' },
        grade_list: { required: true, message: '请输入适用年级', trigger: 'blur' },
        subject_list: { required: true, message: '请输入适用学科', trigger: 'blur' },
        start_age: { required: true, message: '请输入适用起始年龄', trigger: 'blur' },
        end_age: { required: true, message: '请输入适用终止年龄', trigger: 'blur' },
        sex: { required: true, message: '请选择用户性别', trigger: 'blur' },
        rec_level: { required: true, message: '请选择推荐星级', trigger: 'blur' },
        rec_phrase: { required: true, message: '应用推荐语不能为空', trigger: 'blur' },
        rec_desc: { required: true, message: '小编推荐不能为空', trigger: 'blur' }
      }
    }
  },
  computed: {
    title: function() {
      if (this.isCreate) {
        return '创建应用'
      } else {
        return '编辑应用'
      }
    },
    score: {
      get: function() {
        return this.ruleForm.rec_level - 5
      },
      set: function(value) {
        this.ruleForm.rec_level = value + 5
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
      this.ruleForm = {
        rec_bundle_id: '',
        soft_name: '',
        rec_level: 5,
        grade_list: [],
        subject_list: [],
        start_age: 0,
        end_age: 99,
        sex: '2',
        rec_phrase: '',
        rec_desc: ''
      }
    },
    initital_with_row(modified) {
      let current
      if (modified === undefined) {
        current = this.current
      } else {
        current = modified
      }

      this.ruleForm = {
        record_id: current.record_id,
        rec_bundle_id: current.rec_bundle_id,
        soft_name: current.soft_name,
        rec_level: current.rec_level,
        grade_list: current.grade_list,
        subject_list: subject_number_map_label(current.subject_list),
        start_age: current.start_age,
        end_age: current.end_age,
        sex: current.sex,
        rec_phrase: current.rec_phrase,
        rec_desc: current.rec_desc
      }
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
        soft_name: this.ruleForm.soft_name,
        grade_list: this.ruleForm.grade_list,
        subject_list: subject_label_map_number(this.ruleForm.subject_list),
        start_age: this.ruleForm.start_age,
        end_age: this.ruleForm.end_age,
        sex: this.ruleForm.sex,
        rec_level: this.ruleForm.rec_level,
        rec_phrase: this.ruleForm.rec_phrase,
        rec_desc: this.ruleForm.rec_desc
      }
      if (this.isCreate) {
        config['rec_bundle_id'] = this.ruleForm.rec_bundle_id
      } else {
        config['record_id'] = this.ruleForm.record_id
      }
      return config
    },
    cancel() {
      this.$emit('receive', false)
    },
    emmit_application() {
      this.$refs.ruleForm.validate((valid) => {
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
      const app = this.app_list.filter(r => r.rec_bundle_id === rec_bundle_id)
      this.ruleForm.soft_name = app[0]['soft_name']
    },
    remote_application(value) {
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
      search_soft_recommend_mark(config).then(res => {
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
    }
  }
}

.el-select-dropdown__item__recommend {
  position: relative;

  .select-slot-block {
    display: flex;
    flex-direction: row;
    /*justify-items: center;*/
    align-items: center;

    img {
      width: 20px;
      height: 20px;
    }

    span {
      padding-left: 10px;
    }
  }
}

.rate-display {
  display: flex;
  flex-direction: row;
  align-items: center;
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
</style>
