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
        <el-form-item label="目标版本号" prop="app_version">
          <el-input v-model="form.app_version" placeholder="请输入目标版本号" />
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
import { add_application_version, edit_application_version } from '@/api/interactive'

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
    return {
      dialog_title_name: '高危应用',
      form: {
        app_version: ''
      },
      rules: {
        app_version: []
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
    if (this.isNew) {
      this.form = this.init_application_version()
    } else {
      // this.form = this.currentVersion
      this.fetch_pannel_data()
    }
  },
  methods: {
    init_application_version() {
      // 初化数据
      return {
        app_version: ''
      }
    },
    fetch_pannel_data() {
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
    edit_records_item() {
      const data = pure_object_null_value(this.form)
      // if (!data.update_url) {
      //   delete data.update_url
      // }
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
}
</style>
