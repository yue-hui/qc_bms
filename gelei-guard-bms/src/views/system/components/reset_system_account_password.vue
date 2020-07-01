<template>
  <div class="component-card">
    <el-dialog
      :title="title"
      :visible.sync="show"
      :before-close="before_close"
      width="40%">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-suffix=":"
        size="mini"
        label-width="120px">
        <el-form-item label="新密码" prop="new_password">
          <el-input
            v-model="form.new_password"
            :minlength="password_min_length"
            :maxlength="password_max_length"
            type="password"
            autocomplete="off"
            placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item label="密码确认" prop="confirm_password">
          <el-input
            v-model="form.confirm_password"
            :minlength="password_min_length"
            :maxlength="password_max_length"
            type="password"
            autocomplete="off"
            placeholder="请再次输入新密码" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close_dialog">取 消</el-button>
        <el-button pid="10024" type="primary" size="mini" @click="reset_password('form')">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reset_system_account } from '@/api/interactive'
import { encrypt_password } from '@/utils/permissions'
import { validatePasswordComplex } from '@/utils/validate'
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/utils/constant'

export default {
  name: 'ResetSystemAccountPassword',
  props: {
    showDialog: {
      type: Boolean,
      default: true
    },
    userId: {
      type: String,
      default: ''
    }
  },
  data: function() {
    const validateNewPassword = (rule, value, callback) => {
      const result = validatePasswordComplex(value)
      if (!result.status) {
        callback(new Error(result.message))
      } else {
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      const result = validatePasswordComplex(value)
      if (!result.status) {
        callback(new Error(result.message))
      } else {
        if (value !== this.form.new_password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
    }
    return {
      title: '重置密码',
      password_min_length: PASSWORD_MIN_LENGTH,
      password_max_length: PASSWORD_MAX_LENGTH,
      form: {
        new_password: '',
        confirm_password: ''
      },
      rules: {
        new_password: [
          { trigger: 'blur', required: true, message: '请输入密码' },
          { validator: validateNewPassword, trigger: 'blur' }
        ],
        confirm_password: [
          { trigger: 'blur', required: true, message: '请再次输入密码' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    show: function() {
      return this.showDialog
    }
  },
  mounted: function() {
  },
  methods: {
    before_close: function() {
      this.$emit('callback')
    },
    close_dialog: function() {
      this.$emit('callback')
    },
    reset_password(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const config = {
            user_id: this.userId,
            new_password: encrypt_password(this.form.new_password),
            confirm_password: encrypt_password(this.form.confirm_password)
          }
          reset_system_account(config).then(res => {
            if (res.status === 0) {
              this.$message.success(res.message)
              this.$emit('callback')
            } else {
              const error_msg = res.message
              if (error_msg === '新密码不能旧密码一致') {
                this.$confirm('新密码不能和旧密码一致，请重新输入', '提示', {
                  confirmButtonText: '确认',
                  type: 'warning',
                  center: true
                })
              } else {
                this.$message.error(res.message)
              }
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-card {
  width: 100%;
  height: 100%;
}
</style>
