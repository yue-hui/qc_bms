<template>
  <div class="">
    <div class="push-notification-page">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-suffix=":">
        <!------------------------------>
        <el-form-item label="通知标题" prop="question">
          <el-input v-model="form.question" placeholder="请输入话题标题" size="mini" />
        </el-form-item>
        <!------------------------------>
        <el-form-item label="通知内容" prop="question">
          <el-input v-model="form.question" placeholder="请输入话题标题" size="mini" />
        </el-form-item>
        <!------------------------------>
        <el-form-item label="目标平台" prop="show_type">
          <el-radio-group v-model="form.isShowBanner">
            <el-checkbox :label="1">IOS家长端</el-checkbox>
            <el-checkbox :label="2">安卓家长端</el-checkbox>
          </el-radio-group>
        </el-form-item>
        <!------------------------------>
        <el-form-item label="目标平台" prop="show_type">
          <el-radio-group v-model="form.isShowBanner">
            <el-radio :label="1">APP原生页</el-radio>
            <el-radio :label="2">H5</el-radio>
            <el-radio :label="2">微信小程序</el-radio>
            <el-radio :label="2">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <!------------------------------>
        <el-form-item label="跳转参数" prop="question">
          <el-input v-model="form.question" placeholder="请输入跳转参数" size="mini" />
        </el-form-item>
        <!------------------------>
        <el-form-item label="发送时间" prop="product">
          <el-date-picker
            v-model="form.time"
            type="datetime"
            size="mini"
            format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-form-item>
      </el-form>
      <div class="button-block">
        <gl-button pid="" type="primary" size="mini" @click="save">发送预览</gl-button>
        <gl-button pid="" size="mini" @click="save">取消</gl-button>
      </div>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
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
      tinymce_content: '',
      form: {
        question: '',
        answer: '',
        product: '',
        type: '',
        show_type: SHOW_TYPE_DEFAULT,
        isShowBanner: 1,
        time: null
      },
      rules: {
        question: [
          { required: true, trigger: 'blur', message: '帮助标题不能为空' },
          { max: 30, trigger: 'blur', message: '帮助标题长度不超过30' }
        ],
        answer: [{ required: true, trigger: 'blur', validator: validateAnswer }],
        product: [{ required: true, trigger: 'blur', message: '所属产品不能为空' }],
        type: [{ required: true, trigger: 'blur', message: '问题类别为必选项' }],
        show_type: [{ required: true, trigger: 'blur', message: '展现形式为必选项' }]
      }
    }
  },
  watch: {
  },
  mounted: function() {
  },
  methods: {
    save: function() {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.operate-list{
  .operate-item{
    width: 660px;
    border: 1px solid #b1b1b1;
    margin-left: 100px;
    margin-bottom: 20px;
    padding-top: 20px;
    padding-right: 20px;
  }
  .operate-item{
    position: relative;
    background-color: #fff;
    .operate-item-close-icon{
      position: absolute;
      right: 2px;
      top: 2px;
      cursor: pointer;
    }
  }
}
.push-notification-page{
  background: #fff;
  margin-top:0
}
.button-block{
  display: flex;
  justify-content: center;
}
</style>
