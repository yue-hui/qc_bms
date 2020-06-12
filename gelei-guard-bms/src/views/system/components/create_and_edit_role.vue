<template>
  <div class="component-card">
    <el-dialog
      :title="title"
      :visible.sync="show"
      :before-close="before_close"
      top="1vh"
      width="72%">
      <el-form
        v-loading="loading"
        ref="form"
        :model="form"
        :rules="rules"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        label-suffix=":"
        size="mini"
        label-width="120px">
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-model="form.role_name" maxlength="20" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="权限分配" prop="function_list">
          <Permissions
            ref="permissions"
            :pdata="pdata"
            :pheader="pheader"
            @report="report" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close_dialog">取 消</el-button>
        <gl-button pid="10008" type="primary" size="mini" @click="create_or_save_role('form')">确认</gl-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Permissions from '@/components/Permissions'
import { PERMISSION_HEADER } from '@/views/system/data/permissions'
import { create_or_update_sys_role, get_sys_role_configure } from '@/api/interactive'
import { delayering_page_tree } from '@/utils/common'
import { W_CONSTANT } from '@/utils/constant'
import { Decrypt, Encrypt } from '@/utils/secret'

export default {
  name: 'CreateAndEditRole',
  components: {
    Permissions
  },
  props: {
    role: {
      type: Object,
      default: function() {
        return {}
      }
    },
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      title: '',
      loading: true,
      form: {
        role_name: '',
        function_list: ''
      },
      rules: {
        role_name: [
          { required: true, trigger: 'blur', message: '角色名称不能为空' },
          { max: 20, trigger: 'blur', message: '角色名称不能超过20个字符' }
        ],
        function_list: [
          { required: true, trigger: 'blur', message: '至少给用户配置一个权限' }
        ]
      },
      pdata: [],
      pheader: PERMISSION_HEADER
    }
  },
  computed: {
    show: function() {
      return this.showDialog
    }
  },
  watch: {},
  mounted: function() {
    if (this.role.role_id) {
      this.title = '编辑角色'
    } else {
      this.title = '创建角色'
    }
    this.init_page_data()
  },
  methods: {
    before_close: function() {
      this.$emit('callback', false)
    },
    close_dialog: function() {
      this.$emit('callback', false)
    },
    init_page_data: function() {
      this.loading = true
      const config = {
        role_id: this.role.role_id
      }
      get_sys_role_configure(config).then(res => {
        if (res.status === 0) {
          const remote_data = JSON.parse(Decrypt(res.data))
          this.form.role_name = remote_data.role_name
          this.form.function_list = remote_data.function_list.filter(r => parseInt(r / W_CONSTANT) === 2)
          this.pdata = remote_data.codes
        }
      }).finally(() => {
        this.loading = false
      })
    },
    collection_function_list: function(permissions) {
      // 同步权限
      const pdata = JSON.parse(JSON.stringify(permissions))
      const delayering_rows = delayering_page_tree(pdata)
      this.form.function_list = delayering_rows.filter(r => r.checked).map(r => r.code)
    },
    report: function(permissions) {
      this.collection_function_list(permissions)
    },
    create_or_save_role: function() {
      this.collection_function_list(this.pdata)
      this.$refs.form.validate((valid) => {
        if (valid) {
          const config = {
            role_name: this.form.role_name,
            function_list: this.form.function_list
          }
          if (this.role.role_id) {
            config['role_id'] = this.role.role_id
          }
          const permissions = Encrypt(JSON.stringify(config))
          const packages = {
            permissions
          }
          // 创建或编辑权限
          create_or_update_sys_role(packages).then(r => {
            if (r.status === 0) {
              this.$message.success(r.message)
              this.$emit('callback')
            } else {
              //
              this.$message.error(r.message)
            }
          })
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
