<template>
  <div class="component-card">
    <el-dialog
      :before-close="before_close"
      :title="title"
      :visible.sync="visible">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-suffix=":">
        <el-form-item label="帮助问题" prop="question">
          <el-input v-model="form.question" />
        </el-form-item>
        <el-form-item label="问题内容" prop="answer">
          <tinymce :height="200" v-model="form.answer" />
        </el-form-item>
        <el-form-item :label="weight_label" prop="weight">
          <el-input-number
            v-model="form.weight"
            :max="max"
            :min="min"
            controls-position="right" />
        </el-form-item>
      </el-form>

      <div class="button-block">
        <div class="button-group">
          <el-button type="primary" @click="save">保 存</el-button>
          <el-button type="primary" @click="cancel">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { max_weight, min_weight } from '@/utils/constant'
import { create_questions, get_questions_details, update_questions } from '@/api/interactive'

export default {
  name: '',
  beforecreate: function() {
  },
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
    return {
      visible: true,
      min: min_weight,
      max: max_weight,
      form: {
        question: '',
        answer: '',
        weight: 0
      },
      weight: 0,
      rules: {
        question: [{ required: true, trigger: 'blur', message: '帮助标题不能为空' }],
        answer: [{ required: true, trigger: 'blur', message: '帮助内容不能为空' }],
        weight: [{ required: true, type: 'number', trigger: 'blur', min: min_weight, max: max_weight }]
      },
      weight_label: '权　　重'
    }
  },
  computed: {
    title: function() {
      if (this.is_new) {
        return '添加帮助问题'
      } else {
        return '编辑帮助问题'
      }
    }
  },
  watch: {},
  mounted: function() {
    !this.is_new && this.load_data()
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
    save: function() {
      if (this.is_new) {
        this.create_questions()
      } else {
        this.edit_questions()
      }
    },
    create_questions: function() {
      const data = this.form
      create_questions(data).then(res => {
        res.status === 0 && this.refresh()
      })
    },
    edit_questions: function() {
      const data = JSON.parse(JSON.stringify(this.form))
      data['record_id'] = this.rid
      update_questions(data).then(res => {
        res.status === 0 && this.refresh()
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
        this.form = res.data
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
