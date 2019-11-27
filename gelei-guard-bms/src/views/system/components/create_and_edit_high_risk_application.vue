<template>
  <div class="component-card">
    <el-dialog
      :title="title"
      :visible.sync="showDialog"
      :before-close="close_dialog"
      width="40%">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-suffix=":"
        size="mini"
        label-width="120px">
        <el-form-item v-if="isNew === 2" label="软件ID" prop="app_version">
          <el-input v-model="form.soft_id" disabled placeholder="请输入目标版本号" />
        </el-form-item>
        <el-form-item label="包名" prop="bundle_id">
          <el-input v-model="form.bundle_id" placeholder="请输入软件包名" />
        </el-form-item>
        <el-form-item label="软件名称" prop="soft_name">
          <el-input v-model="form.soft_name" placeholder="请输入软件名称" />
        </el-form-item>
        <el-form-item label="软件图标" prop="soft_icon">
          <el-input v-model="form.soft_icon" placeholder="请输入软件图标链接" />
        </el-form-item>
        <el-form-item label="code" prop="type_code">
          <el-input v-model="form.type_code" placeholder="请输入code" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel_dialog">取 消</el-button>
        <el-button type="primary" size="mini" @click="create_update_strage">{{ show_save_label }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { pure_object_null_value } from '@/utils/common'
import {
  add_high_risk_soft,
  edit_high_risk_soft,
  get_high_risk_soft_detail
} from '@/api/interactive'

export default {
  name: 'ParameterDialog',
  props: {
    showDialog: {
      type: Boolean,
      required: true,
      default: false
    },
    isNew: {
      type: Number,
      required: true,
      default: 0
    },
    rid: {
      type: String,
      default: ''
    }
  },
  data: function() {
    const validateCode = (rule, value, callback) => {
      if (typeof value === 'number' || /^[0-9]+$/.test(value)) {
        callback()
      } else {
        callback(new Error('code必须为数字'))
      }
    }
    return {
      dialog_title_name: '高危应用',
      form: {
        soft_id: '',
        bundle_id: '',
        soft_name: '',
        soft_icon: '',
        type_code: ''
      },
      rules: {
        bundle_id: [
          { required: true, trigger: 'blur', message: '包名为必填项' },
          { required: true, max: 1024, message: '包名长度过长' }
        ],
        soft_name: [
          { required: true, trigger: 'blur', message: '软件名称为必填项' },
          { required: true, max: 512, message: '软件名称长度过长' }
        ],
        soft_icon: [
          { required: false, trigger: 'blur' }
        ],
        type_code: [
          { type: 'number', trigger: 'blur', validator: validateCode },
          { required: true, trigger: 'blur', message: 'code为必填项' }
        ]
      }
    }
  },
  computed: {
    title: function() {
      if (this.isNew === 1) {
        return '创建' + this.dialog_title_name
      } else {
        return '编辑' + this.dialog_title_name
      }
    },
    show_save_label: function() {
      if (this.isNew === 1) {
        return '创 建'
      } else {
        return '保 存'
      }
    }
  },
  watch: {},
  mounted: function() {
    if (this.isNew === 1) {
      this.form = this.init_application_version()
    } else if (this.isNew === 2) {
      // this.form = this.currentVersion
      this.fetch_pannel_data()
    }
  },
  methods: {
    init_application_version() {
      // 初化数据
      return {
        soft_id: '',
        bundle_id: '',
        soft_name: '',
        soft_icon: '',
        type_code: ''
      }
    },
    fetch_pannel_data() {
      // 获取高危软件详情
      const config = {
        soft_id: this.rid
      }
      get_high_risk_soft_detail(config).then(res => {
        if (res.status === 0) {
          // 获取成功
          const remote_data = res.data
          this.form.soft_id = remote_data.soft_id
          this.form.bundle_id = remote_data.bundle_id
          this.form.soft_name = remote_data.soft_name
          this.form.soft_icon = remote_data.soft_icon
          this.form.type_code = remote_data.type_code
        } else {
          this.$message.error(res.message)
        }
      })
    },
    close_dialog() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.cancel_dialog()
        })
        .catch(_ => {
        })
    },
    create_high_risk_item() {
      const data = pure_object_null_value(this.form)
      add_high_risk_soft(data).then((res) => {
        if (res.status === 0) {
          this.$emit('destory', true)
        } else {
          this.$message.error(res.message)
          this.$emit('destory', false)
        }
      })
    },
    edit_high_risk_item() {
      const data = pure_object_null_value(this.form)
      edit_high_risk_soft(data).then((res) => {
        if (res.status === 0) {
          this.$emit('destory', true)
        } else {
          this.$message.error(res.message)
          this.$emit('destory', false)
        }
      })
    },
    create_update_strage() {
      // 创建策略
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isNew === 1) {
            this.create_high_risk_item()
          } else {
            this.edit_high_risk_item()
          }
        }
      })
    },
    cancel_dialog() {
      this.$emit('destory', false)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-card {
  width: 100%;
  height: 100%;

  .group-title {
    font-weight: 600;
  }

  .diviser {
    margin: 10px 0 10px 0;
    border-bottom: 0;
    border-left: 0;
    border-right: 0;
    border-top: 1px solid #d8bdbd;
  }
}
</style>
