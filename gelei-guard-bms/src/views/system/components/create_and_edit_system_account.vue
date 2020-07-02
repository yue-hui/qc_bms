<template>
  <div class="component-card">
    <el-dialog
      :title="title"
      :visible.sync="show"
      :before-close="before_close"
      width="40%">
      <el-form
        v-loading="loading"
        ref="form"
        :model="form"
        :rules="rules"
        label-suffix=":"
        size="mini"
        label-width="120px">
        <el-form-item label="账号名称" prop="user_id">
          <el-input
            v-model="form.user_id"
            :disabled="user.user_id !== undefined"
            maxlength="15"
            placeholder="请输入账号名称" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="real_name">
          <el-input v-model="form.real_name" autocomplete="off" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item v-if="!user.user_id" label="登录密码" prop="password">
          <el-input
            v-model="form.password"
            :minlength="password_min_length"
            :maxlength="password_max_length"
            type="password"
            autocomplete="off"
            placeholder="请输入登录密码" />
        </el-form-item>
        <el-form-item label="账号类型" prop="account_type">
          <el-select
            v-model="form.account_type"
            :disabled="!!user.user_id"
            size="mini"
            filterable
            remote
            clearable
            class="role-select"
            placeholder="请选择账号类型"
            @change="account_type_change">
            <el-option
              v-for="item in account_name_list"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号角色" prop="role_id">
          <el-select
            v-model="form.role_id"
            size="mini"
            filterable
            remote
            clearable
            class="role-select"
            placeholder="请选择账号角色">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close_dialog">取 消</el-button>
        <el-button pid="10069,10064" type="primary" size="mini" @click="create_or_save('form')">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { create_or_update_user_information, get_all_sys_roles } from '@/api/interactive'
import { pure_object_null_value } from '@/utils/common'
import { encrypt_password } from '@/utils/permissions'
import { validateChinese, validatePasswordComplex } from '@/utils/validate'
import { ACCOUNT_NAME_LIST, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/utils/constant'

export default {
  name: 'CreateAndEditSystemAccount',
  props: {
    showDialog: {
      type: Boolean,
      default: true
    },
    userId: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    const validateUsername = (rule, value, callback) => {
      const validate = validateChinese(value)
      if (validate.status) {
        callback(new Error('用户账户名称不符合规范'))
      } else {
        callback()
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      const result = validatePasswordComplex(value)
      if (!result.status) {
        callback(new Error(result.message))
      } else {
        callback()
      }
    }
    return {
      title: '',
      password_min_length: PASSWORD_MIN_LENGTH,
      password_max_length: PASSWORD_MAX_LENGTH,
      form: {
        user_id: '',
        real_name: '',
        role_id: '',
        account_type: '',
        password: ''
      },
      rules: {
        user_id: [
          { required: true, message: '账户名称不能为空', trigger: 'blur' },
          { message: '账户名称只能由英文、数字及特殊符号组成', trigger: 'blur', validator: validateUsername }
        ],
        real_name: [
          { required: true, message: '真实姓名不能为空', trigger: 'blur' }
        ],
        role_id: [
          { required: true, message: '请选择账号角色', trigger: 'blur' }
        ],
        account_type: [
          { required: true, message: '请选择账号类型', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '登录密码不能为空', trigger: 'blur' },
          { validator: validateNewPassword, trigger: 'blur' }
        ]
      },
      loading: true,
      roles: [],
      account_name_list: ACCOUNT_NAME_LIST
    }
  },
  computed: {
    show: function() {
      return this.showDialog
    }
  },
  mounted: function() {
    this.init_dialog_data()
  },
  methods: {
    before_close: function() {
    },
    close_dialog: function() {
      this.$emit('callback', false)
    },
    init_dialog_data: function() {
      this.loading = true
      if (this.user.user_id !== undefined) {
        this.form['account_type'] = this.user.account_type
      } else {
        this.form['account_type'] = ''
      }
      this.fetch_sys_roles().then(() => {
        if (this.user.user_id !== undefined) {
          this.title = '编辑账号'
          this.form = {
            user_id: this.user.user_id,
            real_name: this.user.real_name,
            role_id: this.user.role_id,
            account_type: this.user.account_type,
            password: ''
          }
        } else {
          this.title = '创建账号'
          this.form = {
            user_id: '',
            real_name: '',
            role_id: '',
            account_type: '',
            password: ''
          }
        }
      }).finally(() => {
        this.loading = false
      })
    },
    account_type_change: function(row) {
      this.form.role_id = ''
      this.fetch_sys_roles()
    },
    fetch_sys_roles() {
      return new Promise((resolve, reject) => {
        const config = {
          account_type: this.form.account_type
        }
        get_all_sys_roles(config).then(res => {
          if (res.status === 0) {
            this.roles = res.data.map(r => {
              return {
                value: r.role_id,
                label: r.role_name
              }
            })
          } else {
            this.roles = []
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    create_or_save: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let config = {
            user_id: this.form.user_id,
            real_name: this.form.real_name,
            account_type: this.form.account_type,
            role_id: this.form.role_id
          }
          if (!this.user.user_id) {
            config['password'] = encrypt_password(this.form.password)
          }
          config = pure_object_null_value(config)
          create_or_update_user_information(config).then(res => {
            if (res.status === 0) {
              this.$message.success(res.message)
              this.$emit('callback')
            } else {
              this.$message.error(res.message)
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

  .role-select {
    width: 100%;
  }
}
</style>
