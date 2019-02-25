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
        <span class="group-title">目标版本信息</span>
        <hr class="diviser">
        <el-form-item label="目标版本号" prop="app_version">
          <el-input v-model="form.app_version" placeholder="请输入目标版本号" />
        </el-form-item>
        <el-form-item label="包大小" prop="file_size">
          <el-input v-model="form.file_size" placeholder="请输入目标版本包大小">
            <template slot="append">MB</template>
          </el-input>
        </el-form-item>
        <el-form-item label="升级地址" prop="update_url">
          <el-input v-model="form.update_url" placeholder="请输入版本的升级地址" />
        </el-form-item>

        <span class="group-title">基础策略配置</span>
        <hr class="diviser">
        <el-form-item label="策略名称" prop="update_title">
          <el-input v-model="form.update_title" placeholder="请输入策略名称" />
        </el-form-item>
        <el-form-item label="升级平台" prop="platform">
          <el-radio-group v-model="form.platform">
            <el-radio v-for="(platform, index) in platforms" :key="index" :label="platform.value">{{ platform.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="升级方式" prop="is_force">
          <el-radio-group v-model="form.is_force">
            <el-radio v-for="(update_model, index) in update_models" :key="index" :label="update_model.value">
              {{ update_model.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <span class="group-title">高级策略配置</span>
        <hr class="diviser">
        <el-form-item label="策略启动条件" prop="start_strage">
          <el-radio v-model="form.start_strage" label="1">手动启动</el-radio>
        </el-form-item>
        <el-form-item label="策略停止条件" prop="end_strage">
          <el-radio v-model="form.end_strage" label="1">手动停止</el-radio>
        </el-form-item>
        <el-form-item label="自动弹框规则" prop="is_remind">
          <el-radio v-model="form.is_remind" label="1">不限制(非强制升级用户可忽略弹窗)</el-radio>
        </el-form-item>

        <span class="group-title">其它</span>
        <hr class="diviser">
        <el-form-item label="升级说明" prop="update_desc">
          <el-input
            v-model="form.update_desc"
            type="textarea"
            rows="4"
            placeholder="升级说明"
            resize="none" />
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
import { platforms, update_models } from '@/views/toolbox/data/promotion'
import { add_application_version, edit_application_version, get_application_version } from '@/api/interactive'

export default {
  name: 'VersionDialog',
  beforecreate: function() {
  },
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
    return {
      platforms,
      update_models,
      form: {
        app_version: '',
        file_size: '',
        update_url: '',
        update_title: '',
        platform: '',
        is_force: '',
        is_remind: '1',
        update_desc: '',
        start_strage: '1',
        end_strage: '1'
      },
      rules: {
        app_version: [{ required: true, trigger: 'blur', message: '目标版本号不能为空' }],
        file_size: [
          { required: true, trigger: 'blur', message: '包大小为必填项' },
          { required: true, type: 'number', message: '包大小只能输入数字', trigger: 'blur' }
        ],
        update_title: [{ required: true, trigger: 'blur', message: '策略名称为必填项' }],
        platform: [{ required: true, trigger: 'blur', message: '升级平台为必选项' }],
        is_force: [{ required: true, trigger: 'blur', message: '升级方式为必选项' }],
        start_strage: [{ required: true, trigger: 'blur', message: '策略启动条件为必选项' }],
        end_strage: [{ required: true, trigger: 'blur', message: '策略停止条件为必选项' }],
        is_remind: [{ required: true, trigger: 'blur', message: '自动弹框规则为必选项' }],
        update_desc: [{ required: true, trigger: 'blur', message: '升级说明不能为空' }]
      }
    }
  },
  computed: {
    title: function() {
      if (this.isNew) {
        return '创建升级应用策略'
      } else {
        return '编辑升级应用策略'
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
    if (this.isNew) {
      this.form = this.init_application_version()
    } else {
      // this.form = this.currentVersion
      this.fetch_application_version()
    }
  },
  methods: {
    init_application_version() {
      // 初化数据
      return {
        app_version: '',
        file_size: '',
        update_url: '',
        update_title: '',
        platform: '',
        is_force: '',
        is_remind: '1',
        update_desc: '',
        start_strage: '1',
        end_strage: '1'
      }
    },
    fetch_application_version() {
      const config = {
        version_id: this.rid
      }
      get_application_version(config).then(res => {
        if (res.status === 0) {
          const remote_data = res.data
          const app_version = remote_data.version
          this.form = {
            app_version,
            version_id: remote_data.version_id,
            file_size: remote_data.file_size,
            update_url: remote_data.update_url,
            update_title: remote_data.update_title,
            platform: remote_data.platform,
            is_force: remote_data.is_force,
            is_remind: remote_data.is_remind,
            update_desc: remote_data.update_desc,
            start_strage: '1',
            end_strage: '1'
          }
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
    create_version() {
      const data = Object.assign({}, this.form)
      if (!data.update_url) {
        delete data.update_url
      }
      add_application_version(data).then((res) => {
        if (res.status === 0) {
          this.$emit('destory', true)
        } else {
          this.$message.error(res.message)
          this.$emit('destory', false)
        }
      })
    },
    edit_version() {
      const data = Object.assign({}, this.form)
      if (!data.update_url) {
        delete data.update_url
      }
      edit_application_version(data).then((res) => {
        if (res.status === 0) {
          this.$emit('destory', true)
        } else {
          this.$message.error(res.message)
          this.$emit('destory', false)
        }
      })
    },
    create_update_strage() {
      //
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isNew) {
            this.create_version()
          } else {
            this.edit_version()
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
