<template>
  <div class="component-card">
    <el-dialog
      :before-close="before_close"
      :title="title"
      :visible.sync="visible"
      style="min-width: 800px;"
      width="50%">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-suffix=":">
        <el-form-item label="帮助问题" prop="question">
          <el-input v-model="form.question" size="mini" />
        </el-form-item>
        <el-form-item label="所属产品" prop="product">
          <el-select v-model="form.product" size="mini" placeholder="所属产品" @change="update_question_types">
            <el-option
              v-for="plan in advertise_platform_types"
              :key="plan.value"
              :label="plan.label"
              :value="plan.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="问题类别" prop="type">
          <el-select v-model="form.type" size="mini" placeholder="问题类别">
            <el-option
              v-for="plan in question_types"
              :key="plan.value"
              :label="plan.label"
              :value="plan.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="展现形式" prop="show_type">
          <el-radio-group v-model="form.show_type" @change="show_type_change">
            <el-radio
              v-for="(item, index) in help_show_types"
              v-model="form.show_type"
              :key="index"
              :label="item.value">{{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="content_label" prop="answer">
          <tinymce
            v-show="show_tinymce === true"
            :height="200"
            v-model="tinymce_content" />
          <el-input
            v-show="show_tinymce === false"
            v-model="link_url"
            size="mini"
            placeholder="请输入链接地址" />
        </el-form-item>
        <el-form-item :label="weight_label" prop="weight">
          <el-input-number
            v-model="form.weight"
            :min="min"
            :max="max"
            size="mini"
            controls-position="right" />
        </el-form-item>
      </el-form>

      <div class="button-block">
        <div class="button-group">
          <el-button size="mini" @click="cancel">取 消</el-button>
          <gl-button :disabled="is_busy" pid="10020,10086" type="primary" size="mini" @click="save">保 存</gl-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { ADVERTISE_PLATFORM_TYPES, HELP_SHOW_TYPES, max_weight, min_weight } from '@/utils/constant'
import {
  add_questions,
  get_patriarch_questions_qa_list,
  get_questions_details,
  update_questions
} from '@/api/interactive'
import { validateURL } from '@/utils/validate'

const SHOW_TYPE_DEFAULT = '01'

export default {
  name: 'Question',
  components: {
    Tinymce
  },
  props: {
    is_new: {
      type: Boolean,
      default: true
    },
    rid: {
      type: String,
      default: ''
    },
    information: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    const validateAnswer = (rule, value, callback) => {
      if (['01', undefined].indexOf(this.form.show_type) !== -1) {
        if (value) {
          callback()
        } else {
          callback(new Error('帮助问题的答案不能为空'))
        }
      } else if (this.form.show_type === '02') {
        if (value) {
          if (!validateURL(value)) {
            callback(new Error('答案链接地址不合法'))
          } else {
            callback()
          }
        } else {
          callback(new Error('答案的链接为必填项'))
        }
      } else {
        callback()
      }
    }
    return {
      title: '添加帮助问题',
      visible: true,
      min: min_weight,
      max: max_weight,
      help_show_types: HELP_SHOW_TYPES,
      advertise_platform_types: ADVERTISE_PLATFORM_TYPES,
      is_busy: false,
      content_label: '问题内容',
      show_tinymce: null,
      question_types: [],
      tinymce_content: '',
      link_url: '',
      form: {
        question: '',
        answer: '',
        product: '',
        type: '',
        show_type: SHOW_TYPE_DEFAULT,
        weight: 1
      },
      weight: 1,
      rules: {
        question: [
          { required: true, trigger: 'blur', message: '帮助标题不能为空' },
          { max: 30, trigger: 'blur', message: '帮助标题长度不超过30' }
        ],
        answer: [{ required: true, trigger: 'blur', validator: validateAnswer }],
        product: [{ required: true, trigger: 'blur', message: '所属产品不能为空' }],
        type: [{ required: true, trigger: 'blur', message: '问题类别为必选项' }],
        show_type: [{ required: true, trigger: 'blur', message: '展现形式为必选项' }],
        weight: [{ required: true, type: 'number', trigger: 'blur', min: min_weight, max: max_weight }]
      },
      weight_label: '权　　重'
    }
  },
  watch: {
    is_new: {
      handler(newer) {
        if (newer) {
          this.title = '添加帮助问题'
        } else {
          this.title = '编辑帮助问题'
        }
      },
      immediate: true
    },
    form: {
      handler(older, newer) {
        if (newer) {
          let content_label = '问题内容'
          if ([SHOW_TYPE_DEFAULT, undefined].indexOf(newer.show_type) !== -1) {
            content_label = '问题内容'
          } else {
            content_label = '答案链接'
          }
          this.$nextTick(() => {
            this.content_label = content_label
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted: function() {
    this.is_new ? (this.show_tinymce = true) : this.load_data()
  },
  methods: {
    before_close(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.visible = false
          this.$emit('destory')
        })
        .catch(_ => {
        })
    },
    show_type_change: function(show_type) {
      if (show_type === '01') {
        this.show_tinymce = true
      } else {
        this.show_tinymce = false
      }
    },
    save: function() {
      if (this.form.show_type === '01') {
        this.form.answer = this.tinymce_content
      } else {
        this.form.answer = this.link_url
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.is_new) {
            this.create_questions()
          } else {
            this.edit_questions()
          }
        }
      })
    },
    create_questions: function() {
      this.is_busy = true
      const data = this.form
      add_questions(data).then(res => {
        if (res.status === 0) {
          this.refresh()
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.is_busy = false
      })
    },
    edit_questions: function() {
      this.is_busy = true
      const data = JSON.parse(JSON.stringify(this.form))
      data['record_id'] = this.rid
      update_questions(data).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.refresh()
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.is_busy = false
      })
    },
    refresh() {
      this.visible = false
      this.$emit('destory', true)
    },
    cancel: function() {
      this.visible = false
      this.$emit('destory')
    },
    load_data: function() {
      const config = {
        'record_id': this.rid
      }
      get_questions_details(config).then(res => {
        if (res.status === 0) {
          this.form = res.data
          if (!res.data.show_type) {
            this.form.show_type = SHOW_TYPE_DEFAULT
          }
          if (this.form.show_type === SHOW_TYPE_DEFAULT) {
            this.show_tinymce = true
            this.tinymce_content = this.form.answer
          } else {
            this.show_tinymce = false
            this.link_url = this.form.answer
          }
          const question_type = res.data.type
          this.form.type = ''
          this.update_question_types().then(() => {
            this.form.type = question_type
          })
        }
      })
    },
    update_question_types: function() {
      return new Promise(resolve => {
        this.form.type = ''
        const config = {
          product: this.form.product
        }
        get_patriarch_questions_qa_list(config).then(res => {
          if (res.status === 0) {
            this.question_types = res.data.map(r => {
              return {
                value: r.type_code,
                label: r.type_name
              }
            })
          } else {
            this.$message.error(res.message)
            this.question_types = []
          }
          resolve('')
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-card {
  width: 100%;
  height: 100%;

  .button-block {
    display: flex;
    flex-direction: row-reverse;

    .button-group {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 200px;
    }
  }
}
</style>
