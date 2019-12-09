<template>
  <div class="component-card">
    <el-dialog
      :title="title"
      :visible.sync="showDialog"
      :before-close="close_dialog"
      size="mini"
      width="40%">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-suffix=":"
        size="mini"
        label-width="120px">
        <el-form-item v-if="!isNew" label="ID">
          <el-input v-model="form.p_id" placeholder="ID" disabled />
        </el-form-item>
        <el-form-item label="类型" prop="p_type">
          <el-select v-model="form.p_type" size="mini" filterable clearable class="select-line-style" placeholder="请输入参数类型">
            <el-option
              v-for="plan in system_configuration_types"
              :key="plan.value"
              :label="plan.label"
              :value="plan.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="p_type_name">
          <el-input v-model="form.p_type_name" placeholder="名称" />
        </el-form-item>
        <el-form-item label="标签" prop="p_label">
          <el-input v-model="form.p_label" placeholder="标签" />
        </el-form-item>
        <el-form-item label="参数" prop="p_value">
          <el-input v-model="form.p_value" placeholder="参数" />
        </el-form-item>
        <el-form-item label="状态" prop="enabled">
          <el-radio-group v-model="form.enabled" size="mini">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="row_order">
          <el-input v-model="form.row_order" type="number" placeholder="排序" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="备注" />
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
  create_sys_configuration,
  edit_sys_configuration,
  get_sys_configuration_details, get_sys_param_type_list
} from '@/api/interactive'
import { SYSTEM_ENABLE_STATUS } from '@/views/system/data/system_parameter'

export default {
  name: 'ParameterDialog',
  props: {
    showDialog: {
      type: Boolean,
      required: true,
      default: false
    },
    isNew: {
      type: Boolean,
      required: true,
      default: false
    },
    rid: {
      type: String,
      default: ''
    }
  },
  data: function() {
    const system_enable_status = SYSTEM_ENABLE_STATUS
    return {
      dialog_title_name: '系统参数',
      system_configuration_types: [],
      system_enable_status,
      form: {
        p_id: '',
        p_type: '',
        p_type_name: '',
        p_label: '',
        p_value: '',
        enabled: '',
        row_order: '',
        remark: ''
      },
      rules: {
        p_type: [
          { required: true, message: '请选择系统参数类型', trigger: 'blur' }
        ],
        p_type_name: [
          { required: true, message: '请填写系统参数类型名称', trigger: 'blur' }
        ],
        p_label: [
          { required: true, message: '请填写系统参数标签', trigger: 'blur' }
        ],
        p_value: [
          { required: true, message: '请填写系统参数值', trigger: 'blur' }
        ],
        enabled: [
          { required: false, message: '请确认系统参数是否立即生效', trigger: 'blur' }
        ],
        row_order: [
          { required: true, message: '请填写系统参数排序ID', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请填写系统参数的备注', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title: function() {
      if (this.isNew) {
        return '创建' + this.dialog_title_name
      } else {
        return '编辑' + this.dialog_title_name
      }
    },
    show_save_label: function() {
      if (this.isNew) {
        return '创 建'
      } else {
        return '保 存'
      }
    }
  },
  watch: {},
  mounted: function() {
    this.fetch_sys_param_type_list()
    if (this.isNew) {
      this.form = this.init_pannel_data()
    } else {
      this.fetch_pannel_data()
    }
  },
  methods: {
    init_pannel_data() {
      // 初化数据
      return {
        p_id: '',
        p_type: '',
        p_type_name: '',
        p_label: '',
        p_value: '',
        enabled: '',
        row_order: '',
        remark: ''
      }
    },
    fetch_sys_param_type_list() {
      // 获取系统参数列表
      get_sys_param_type_list().then(res => {
        if (res.status === 0) {
          this.system_configuration_types = res.data.map(r => {
            return {
              value: r,
              name: r
            }
          })
        } else {
          this.system_configuration_types = []
        }
      })
    },
    fetch_pannel_data() {
      const config = {
        p_id: this.rid
      }
      get_sys_configuration_details(config).then(res => {
        if (res.status === 0) {
          this.form = res.data
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
    create_records_item() {
      const data = pure_object_null_value(this.form)
      create_sys_configuration(data).then((res) => {
        if (res.status === 0) {
          this.$emit('destory', true)
          this.$message.success('系统参数创建成功')
        } else {
          this.$message.error(res.message)
          this.$emit('destory', false)
        }
      })
    },
    edit_records_item() {
      const data = pure_object_null_value(this.form)
      edit_sys_configuration(data).then((res) => {
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
          if (this.isNew) {
            this.create_records_item()
          } else {
            this.edit_records_item()
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

  .select-line-style {
    width: 100%;
  }
}
</style>
