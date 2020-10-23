<template>
  <div class="">
    <div class="topic-save-title">
      <span>话题创建</span>
    </div>
    <div class="topic-save-page">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-suffix=":">
        <!------------------------------>
        <el-form-item label="标题" prop="question">
          <el-input v-model="form.question" placeholder="请输入话题标题" size="mini" />
        </el-form-item>
        <!------------------------------>
        <el-form-item label="投票项" prop="product">
          <el-input v-model="form.question" placeholder="请输入话题1名称" size="mini" />
          <el-input v-model="form.question" placeholder="请输入话题2名称" size="mini" />
        </el-form-item>
        <!------------------------------>
        <el-form-item label="简介" prop="answer">
          <tinymce
            :height="200"
            v-model="tinymce_content" />
        </el-form-item>
        <!------------------------------>
        <el-form-item label="围观次数" prop="question">
          <el-input v-model="form.question" placeholder="请输入话题标题" size="mini" />
        </el-form-item>
        <!------------------------------>
        <el-form-item label="福利说明" prop="answer">
          <tinymce
            :height="200"
            v-model="tinymce_content" />
        </el-form-item>
        <!------------------------------>
        <el-form-item label="运营位展示" prop="show_type">
          <el-radio-group v-model="form.isShowBanner">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!---->
        <div class="operate-list">
          <div class="operate-item">
            <el-form-item label="标题" prop="question">
              <el-input v-model="form.question" placeholder="标题仅在后台展示" size="mini" />
            </el-form-item>
            <el-form-item label="图片上传" prop="question">
              <el-button size="mini">选择图片</el-button>
              <span>格式jpg/png</span>
              <span>尺寸：690x240</span>
              <span>大小：不超过500kb</span>
            </el-form-item>
            <el-form-item label="图片跳转" prop="show_type">
              <el-radio-group v-model="form.isShowBanner">
                <el-radio :label="1">APP原生页</el-radio>
                <el-radio :label="2">H5链接</el-radio>
                <el-radio :label="3">微信小程序</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="跳转参数" prop="show_type">
              <el-input v-model="form.question" placeholder="请输入跳转参数" size="mini" />
            </el-form-item>
            <el-form-item label="运营位展示顺序" prop="show_type">
              <el-input v-model="form.question" placeholder="请输入跳转参数" size="mini" />
            </el-form-item>
            <el-form-item label="上线时间" prop="product">
              <el-date-picker
                v-model="form.time"
                type="datetimerange"
                size="mini"
                format="yyyy-MM-dd HH:mm"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"/>
            </el-form-item>
            <!-- 删除 -->
            <svg-icon class="operate-item-close-icon" icon-class="close" />
          </div>
          <div style="margin-left: 100px;margin-bottom: 20px">
            <el-button style="" type="primary" size="mini">添加运营位</el-button>
            <span style="font-size: 12px">还可添加2个</span>
          </div>
        </div>
        <!------------------------------>
        <el-form-item label="新话题气泡" prop="product">
          <el-input v-model="form.question" placeholder="气泡在话题上架后不可编辑和新增" size="mini" />
          <el-input v-model="form.question" placeholder="气泡在话题上架后不可编辑和新增" size="mini" />
        </el-form-item>
        <!------------------------>
        <el-form-item label="上线时间" prop="product">
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            size="mini"
            format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-form-item>
      </el-form>
      <div class="button-block">
        <gl-button pid="10020,10086" type="primary" size="mini" @click="save">保 存</gl-button>
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
.topic-save-page{
  background: #fff;
  margin: 20px;
  padding: 20px;
  border: 1px solid #EAEAEA;
  margin-top:0
}
.topic-save-title{
  height: 60px;
  font-size: 18px;
  color: #303133;
  line-height: 60px;
  padding: 0 22px;
}
.button-block{
  display: flex;
  justify-content: center;
}
</style>
