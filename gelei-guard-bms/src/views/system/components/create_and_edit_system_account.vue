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
        <el-form-item label="账号名称" prop="user_id">
          <el-input v-model="form.user_id" :disabled="user.user_id" maxlength="15" placeholder="请输入账号名称" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="real_name">
          <el-input v-model="form.real_name" autocomplete="off" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item v-if="!user.user_id" label="登录密码" prop="password">
          <el-input v-model="form.password" type="password" autocomplete="off" placeholder="请输入登录密码" />
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
import { create_or_update_user_information } from '@/api/interactive'
import { pure_object_null_value } from '@/utils/common'
import { encrypt_password } from '@/utils/permissions'
import { validateChinese } from '@/utils/validate'

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
    roles: {
      type: Array,
      default: function() {
        return []
      }
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
        callback(new Error('用户的账户名称不符合规范'))
      } else {
        callback()
      }
    }
    return {
      title: '',
      form: {
        user_id: '',
        real_name: '',
        role_id: '',
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
        password: [
          { required: true, message: '登录密码不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 6, message: '密码最少为6位' },
          { trigger: 'blur', max: 15, message: '密码最长为15位' }
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
    if (this.user.user_id) {
      this.title = '编辑账号'
      this.form = {
        user_id: this.user.user_id,
        real_name: this.user.real_name,
        role_id: this.user.role_id,
        password: ''
      }
    } else {
      this.title = '创建账号'
      this.form = {
        user_id: '',
        real_name: '',
        role_id: '',
        password: ''
      }
    }
  },
  methods: {
    before_close: function() {
      this.$emit('callback', false)
    },
    close_dialog: function() {
      this.$emit('callback', false)
    },
    create_or_save: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let config = {
            user_id: this.form.user_id,
            real_name: this.form.real_name,
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
