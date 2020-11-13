<template>
  <div class="">
    <div class="push-notification-page">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-suffix=":">
        <!------------------------------>
        <el-form-item label="通知标题" prop="title">
          <el-input v-model="form.title" maxlength="15" placeholder="请输入通知标题" size="mini" />
        </el-form-item>
        <!------------------------------>
        <el-form-item label="通知内容" prop="content">
          <el-input v-model="form.content" maxlength="30" placeholder="请输入通知内容" size="mini" />
        </el-form-item>
        <!------------------------------>
        <el-form-item label="目标平台" prop="platformList">
          <el-checkbox-group v-model="form.platformList">
            <el-checkbox label="02">IOS家长端</el-checkbox>
            <el-checkbox label="03">安卓家长端</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!------------------------------>
        <el-form-item label="目标平台" prop="target">
          <el-radio-group v-model="form.target">
            <el-radio label="01">APP原生页</el-radio>
            <el-radio label="02">H5</el-radio>
            <el-radio label="03">微信小程序</el-radio>
            <el-radio label="00">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <!------------------------------>
        <el-form-item label="跳转参数" prop="parameter">
          <el-input v-model="form.parameter" placeholder="请输入跳转参数" size="mini" />
        </el-form-item>
        <!------------------------------>
        <el-form-item label="发送类型" prop="type">
          <el-radio v-model="form.type" label="01">立即发送</el-radio>
          <el-radio v-model="form.type" label="02">定时发送</el-radio>
        </el-form-item>
        <!------------------------>
        <el-form-item label="发送时间" prop="sendTime">
          <el-date-picker
            v-model="sendTime"
            :disabled="form.type === '01'"
            type="datetime"
            size="mini"
            format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-form-item>
      </el-form>
      <div class="button-block">
        <el-button pid="" type="primary" size="mini" @click="view">发送预览</el-button>
        <el-button pid="" size="mini" @click="close">取消</el-button>
      </div>
      <!-- 推送预览 -->
      <el-dialog
        :visible.sync="dialogVisible"
        append-to-body
        title="发送预览"
        custom-class="send-push-view"
        width="400px">
        <div class="send-push-view-list">
          <div><span>通知标题：</span><span>{{ form.title }}</span></div>
          <div><span>通知内容：</span><span>{{ form.content }}</span></div>
          <div><span>目标平台：</span><span>{{ sendPlatform }}</span></div>
          <div><span>跳转目标：</span><span>{{ sendTarget }}</span></div>
          <div><span>跳转参数：</span><span>{{ form.parameter }}</span></div>
          <div v-if="form.type === '01'"><span>发送时间：</span><span>立即发送</span></div>
          <div v-if="form.type === '02'"><span>发送时间：</span><span>定时发送 {{ pushSendTime }}</span></div>
        </div>
        <div class="send-push-submit">
          <el-button size="mini" type="primary" @click="save">确认发送</el-button>
          <el-button size="mini" @click="dialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import { getValueType, parseDateTime } from '../../../../utils'
import { addPushNotification } from '../../../../api/interactive'

export default {
  name: 'Question',
  components: {
  },
  props: {
  },
  data: function() {
    return {
      form: {
        title: '', // 标题
        content: '', // 内容
        platformList: ['02', '03'], // platformList 02IOS、03Android
        target: '01', // 跳转目标 01:App原生页,02:H5,03:微信小程序,00:无
        parameter: '', // 跳转参数
        type: '01', // 发送类型
        sendTime: ''
      },
      platformList: [
        { name: 'IOS家长端', value: '02' },
        { name: 'Android家长端', value: '03' }
      ],
      sendTime: null,
      dialogVisible: false,
      rules: {
        title: [
          {
            validator: (rule, value, callback) => {
              if (value) return callback()
              callback(new Error('通知标题不能为空'))
            },
            trigger: 'blur'
          }
        ],
        content: [
          {
            validator: (rule, value, callback) => {
              if (value) return callback()
              callback(new Error('通知内容不能为空'))
            },
            trigger: 'blur'
          }
        ],
        platformList: [
          {
            validator: (rule, value, callback) => {
              if (value.length > 0) return callback()
              callback(new Error('至少选择一个目标平台'))
            },
            trigger: 'blur'
          }
        ],
        parameter: [
          {
            validator: (rule, value, callback) => {
              if (value) return callback()
              callback(new Error('跳转参数不能为空'))
            },
            trigger: 'blur'
          }
        ],
        sendTime: [
          {
            validator: (rule, value, callback) => {
              if (this.form.type === '01') return callback()
              if (value) return callback()
              callback(new Error('请选择发送时间'))
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    sendPlatform() {
      const platformList = []
      this.form.platformList.forEach(item => {
        try {
          platformList.push((() => {
            return this.platformList.find(p => {
              return p.value === item
            }).name
          })())
          // eslint-disable-next-line no-empty
        } catch (e) {
        }
      })
      return platformList.join('，')
    },
    sendTarget() {
      if (this.form.target === '01') return 'APP原生'
      if (this.form.target === '02') return 'H5'
      if (this.form.target === '03') return '微信小程序'
    },
    pushSendTime() {
      return parseDateTime('y-m-d h:i', this.form.sendTime)
    }
  },
  watch: {
    'form.type'(val) {
      if (val === '01') {
        this.sendTime = null
        this.form.sendTime = ''
      }
    }
  },
  mounted: function() {
  },
  methods: {
    view() {
      if (getValueType(this.sendTime) === 'date') {
        this.form.sendTime = this.sendTime.getTime()
      } else {
        this.form.sendTime = ''
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialogVisible = true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    save() {
      addPushNotification(this.form)
        .then(res => {
          if (res.status !== 0) throw res
          this.dialogVisible = false
          this.$emit('update:visible', false)
          this.$emit('reload-list')
        })
        .catch(error => {
          this.$message.error(error.message)
        })
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss">
.send-push-view{
  .el-dialog__body{
    padding-top: 0;
    padding-bottom: 20px;
  }
  .send-push-view-list{
    div{
      margin-bottom: 6px;
      span:nth-child(1) {
        font-weight: bold;
      }
    }
  }
  .send-push-submit{
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
}

</style>
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
