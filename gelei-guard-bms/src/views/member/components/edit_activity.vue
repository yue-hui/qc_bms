<template>
  <div class="component-card-with-dialog">
    <div class="component-card">
      <div :style="{'max-height': visiable_height}" class="dialog">
        <div class="head-area">
          <div class="title"><span v-if="form.activity_name">编辑会员活动 - {{ form.activity_name }}</span></div>
          <div class="close-icon" @click="cancel"><i class="el-message-box__close el-icon-close" /></div>
        </div>
        <div class="body-area">
          <el-form ref="form" :rules="rules" :model="form" label-width="120px" label-suffix=":">
            <el-form-item label="添加用户名单" prop="phones">
              <el-input v-model="form.phones" size="mini" type="textarea" />
              <el-upload
                ref="upload"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="readExcel"
                action="/wm/upload/">
                <el-button
                  slot="trigger"
                  icon="el-icon-upload"
                  size="mini"
                  type="primary">Excel导入
                </el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="消息通知" prop="is_notify">
              <el-radio-group v-model="form.is_notify" size="mini">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="消息内容" prop="notify_msg">
              <el-input
                v-model="form.notify_msg"
                :disabled="form.is_notify === '0'"
                :maxlength="50"
                size="mini"
                type="textarea" />
            </el-form-item>
          </el-form>

          <el-form ref="form" :model="form" label-width="120px" label-suffix=":">
            <el-form-item>
              <div class="action-area">
                <el-button size="mini" @click="cancel">取消</el-button>
                <el-button size="mini" type="primary" @click="on_save">确定</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { tc_type } from '@/views/member/data/example'
import { edit_member_activity } from '@/api/interactive'

const NO_NOTIFY_MESSAGE = '请输入消息通知内容，限制在50字以内'
export default {
  name: 'EditActivity',
  beforecreate: function() {
  },
  props: {
    is_edit: {
      type: Boolean,
      default: true
    },
    current: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    const validate_notify_msg = (rule, value, callback) => {
      if (this.form.is_notify === '1' && !this.form.notify_msg) {
        callback(new Error(NO_NOTIFY_MESSAGE))
      } else {
        callback()
      }
    }
    return {
      form: {
        activity_name: '',
        phones: '',
        notify_msg: '',
        is_notify: ''
      },
      rules: {
        activity_name: [],
        phones: [
          { required: false, message: '用户名单不能为空, 多用户以英文逗号分隔', trigger: 'blur' }
        ],
        is_notify: [
          { required: true, message: '消息通知不能为空', trigger: 'blur' }
        ],
        notify_msg: [
          { required: false, message: '', trigger: 'blur' },
          { required: false, trigger: 'blur', validator: validate_notify_msg }
        ]
      },
      package_type: tc_type,
      visiable_height: ''
    }
  },
  computed: {},
  watch: {
    is_edit: {
      handler: function(val) {
        if (val) {
          this.form.activity_name = this.current.activity_name || ''
          this.form.phones = this.current.phones || ''
          this.form.notify_msg = this.current.notify_msg
          this.form.is_notify = this.current.is_notify
        }
      },
      immediate: true
    }
  },
  mounted: function() {
    this.visiable_height = document.documentElement.clientHeight + 'px'
  },
  methods: {
    readExcel(file) {
      const XLSX = require('xlsx')
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          let sheet_array
          for (const sheet in workbook.Sheets) {
            if (sheet === '活动名单' || sheet === 'Sheet1') {
              sheet_array = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            }
          }
          const row_name = '手机号'
          const phone_list = this.form.phones.split(',').map(r => {
            return r.trim()
          }).filter(r => {
            return !!r
          })
          sheet_array.forEach((v, i, a) => {
            let phone = '' + v[row_name]
            phone = phone.trim()
            if (phone && phone_list.indexOf(phone) === -1) {
              phone_list.push(phone)
            }
          })
          this.form.phones = phone_list.join(', ')
        } catch (e) {
          this.$message.warning('文件类型不正确！')
          return false
        }
      }
      fileReader.readAsBinaryString(file.raw)
    },
    save_activity() {
      const options = {
        activity_id: this.current.activity_id,
        activity_name: this.current.activity_name,
        is_notify: this.form.is_notify,
        notify_msg: this.form.notify_msg || '',
        phones: this.form.phones
      }
      edit_member_activity(options).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.$emit('callback', true)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    on_save() {
      this.$refs.form.validate(validate => {
        if (validate) {
          if (this.form.is_notify === '1' && this.form.notify_msg === '') {
            this.$message.error(NO_NOTIFY_MESSAGE)
          } else {
            this.save_activity()
          }
        }
      })
    },
    cancel() {
      this.$emit('callback', false)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$title_height: 40px;
$z_index_message_dialog: 2000;
.component-card-with-dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z_index_message_dialog;

  .component-card {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .dialog {
      min-width: 800px;
      /*min-height: 400px;*/
      position: relative;
      background-color: #FFF;
      z-index: 3001;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 0;
      }

      .head-area {
        display: block;
        height: $title_height;
        line-height: $title_height;
        padding: 0 10px;
        position: relative;
        font-size: 18px;
        color: #303133;
        font-family: 微软雅黑, 宋体;
        display: flex;
        flex-direction: row;
        background-color: #fbfbff;
        border-bottom: rgba(103, 103, 103, 0.59) 1px solid;

        .title {
          flex: 1;
        }

        .close-icon {
          font-weight: 100;
          font-size: 20px;
          width: 20px;
          height: 20px;
          cursor: pointer;
          color: #909399;
        }
      }

      .body-area {
        min-height: 400px;
        padding: 20px;

        .diviser {
          height: 1px;
          width: 100%;
          /*border-bottom: 1px dashed grey;*/
          margin: 0 0 20px 0;
        }

        .action-area {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
      }

      .footer-area {
        height: 60px;
        line-height: 60px;
        border-top: 1px solid #eee;
      }
    }
  }
}
</style>
