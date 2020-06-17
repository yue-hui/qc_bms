<template>
  <div class="modified-password">
    <el-card class="title" style="max-height: 60px; vertical-align: center">
      <span>修改密码</span>
    </el-card>
    <el-card class="box-card">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="100px"
        class="demo-ruleForm"
        label-suffix=":">
        <el-form-item label="旧密码" prop="old_password">
          <el-input v-model="form.old_password" type="password" />
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input v-model="form.new_password" type="password" />
        </el-form-item>
        <el-form-item label="密码确认" prop="confirm_password">
          <el-input v-model="form.confirm_password" type="password" />
        </el-form-item>
        <el-form-item class="update-action">
          <el-button size="mini" type="primary" @click="modified_password('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { validatePasswordSimple } from '@/utils/validate'
import { modified_user_password } from '@/api/login'
import { encrypt_password } from '@/utils/permissions'

export default {
  name: 'ModifiedPassword',
  components: {},
  data() {
    const validateOldPassword = (rule, value, callback) => {
      const checked = validatePasswordSimple(value)
      if (checked.status) {
        callback()
      } else {
        callback(new Error(checked.message))
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      const checked = validatePasswordSimple(value)
      if (checked.status) {
        if (this.form.new_password && this.form.old_password) {
          if (this.form.new_password === this.form.old_password) {
            callback(new Error('新密码不能与老密码相同，请换其他密码'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      } else {
        callback(new Error(checked.message))
      }
    }
    const validateNewComfirmPassword = (rule, value, callback) => {
      const checked = validatePasswordSimple(value)
      if (checked.status) {
        if (this.form.new_password && this.form.confirm_password) {
          if (this.form.new_password === this.form.confirm_password) {
            callback()
          } else {
            callback(new Error('您输入的密码与确认密码不一致'))
          }
        } else {
          callback()
        }
      } else {
        callback(new Error(checked.message))
      }
    }
    return {
      form: {
        old_password: '',
        new_password: '',
        confirm_password: ''
      },
      rules: {
        old_password: [
          { type: 'string', required: true, message: '请您填写旧密码', trigger: 'blur' },
          { type: 'string', required: true, trigger: 'blur', validator: validateOldPassword }
        ],
        new_password: [
          { type: 'string', required: true, message: '请您填写密码', trigger: 'blur' },
          { type: 'string', required: true, trigger: 'blur', validator: validateNewPassword }
        ],
        confirm_password: [
          { type: 'string', required: true, message: '请确认您的确认密码', trigger: 'blur' },
          { type: 'string', required: true, trigger: 'blur', validator: validateNewComfirmPassword }
        ]
      }
    }
  },
  mounted: function() {
  },
  methods: {
    modified_password: function(formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.sync_user_password()
        } else {
          return false
        }
      })
    },
    sync_user_password: function() {
      // 同步用户密码
      const config = {
        old_password: encrypt_password(this.form.old_password),
        new_password: encrypt_password(this.form.new_password),
        confirm_password: encrypt_password(this.form.confirm_password)
      }
      modified_user_password(config).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.logout()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    logout: function() {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.modified-password {
  width: 100%;
  height: 100%;

  .title {
    margin-bottom: 15px;
  }

  .box-card {
    margin-left: 20px;
    max-width: 500px;

    .update-action {
      text-align: right;
    }

    .hidden-img {
      display: none;
    }

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .upload-file-to-server {
      font-size: 10px;
      color: #606266;
    }
  }
}
</style>
