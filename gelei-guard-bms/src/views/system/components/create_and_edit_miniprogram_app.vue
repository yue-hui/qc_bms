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
        label-width="220px">
        <el-form-item label="BUNDLE_ID(应用包名)" prop="bundle_id">
          <el-input v-model="form.bundle_id" placeholder="请输入应用包名" @blur="fetch_bundle_info_list" />
        </el-form-item>
        <el-form-item label="SOFTWARE_NAME(应用名称)" prop="soft_name">
          <span :title="form.soft_name">{{ form.soft_name }}</span>
        </el-form-item>
        <el-form-item label="NAME(小程序名)" prop="name">
          <el-input v-model="form.name" placeholder="请输入小程序名" />
        </el-form-item>
        <el-form-item label="DESC(小程序描述)" prop="desc">
          <el-input v-model="form.desc" type="textarea" rows="3" resize="none" placeholder="请输入小程序描述" />
        </el-form-item>
        <el-form-item label="ICON(小程序图标)" prop="icon">
          <el-upload
            :http-request="push_picture_to_cloud"
            :on-remove="remove_picture"
            :multiple="false"
            :limit="1"
            :file-list="icon_list"
            action=""
            class="upload-demo"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="upload-file-to-server">备注: 只能上传jpg/png文件, 图片尺寸为144x144，且不超过100kb.</div>
        </el-form-item>
        <el-form-item label="PACKAGES(小程序路径)" prop="packages">
          <el-input v-model="form.packages" placeholder="请输入小程序路径" />
        </el-form-item>
        <el-form-item label="EXIT_CLICKS(退出小程序点击次数)" prop="exit_clicks">
          <el-input v-model="form.exit_clicks" type="number" min="0" placeholder="请输入退出小程序点击次数" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel_dialog">取 消</el-button>
        <el-button :disabled="is_busy" type="primary" size="mini" @click="create_update_miniprogram">{{ show_save_label }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { pure_object_null_value } from '@/utils/common'
import {
  add_miniprogram_app,
  edit_miniprogram_app, get_soft_info_by_bundle_id,
  get_sys_configuration_details
} from '@/api/interactive'
import { uploadFormDataSecondPassServer, uploadFormDataServer } from '@/utils/uploadResource'

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
    miniProgramInfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    return {
      dialog_title_name: '小程序+管控',
      is_busy: false,
      mp_id: '',
      icon_list: [],
      form: {
        bundle_id: '',
        soft_name: '',
        name: '',
        desc: '',
        icon: '',
        packages: '',
        exit_clicks: ''
      },
      rules: {
        bundle_id: [
          { required: true, message: '请输入应用包名', trigger: 'blur' }
        ],
        soft_name: [
          { required: true, message: '应用名称不存在，请输入正确的应用包名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入小程序名', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写小程序+管控的描述', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请上传小程序+管控的图标', trigger: 'blur' }
        ],
        packages: [
          { required: true, message: '请填写小程序+管控的路径', trigger: 'blur' }
        ],
        exit_clicks: [
          { required: true, message: '请填写小程序+管控的退出时的点击次数', trigger: 'blur' }
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
      if (this.isNew === 1) {
        return '创 建'
      } else if (this.isNew === 2) {
        return '保 存'
      } else {
        return '创建'
      }
    }
  },
  mounted: function() {
    this.init_pannel_data()
  },
  methods: {
    init_pannel_data() {
      // 初化数据
      if (this.isNew === 2) {
        this.mp_id = this.miniProgramInfo.mp_id
        this.form = {
          bundle_id: this.miniProgramInfo.bundle_id,
          soft_name: this.miniProgramInfo.soft_name,
          name: this.miniProgramInfo.name,
          desc: this.miniProgramInfo.desc,
          icon: this.miniProgramInfo.icon,
          packages: this.miniProgramInfo.packages,
          exit_clicks: this.miniProgramInfo.exit_clicks
        }
        this.icon_list = [
          {
            url: this.miniProgramInfo.icon,
            name: this.miniProgramInfo.name
          }
        ]
      } else {
        this.mp_id = ''
        this.form = {
          bundle_id: '',
          soft_name: '',
          name: '',
          desc: '',
          icon: '',
          packages: '',
          exit_clicks: ''
        }
        this.icon_list = []
      }
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
    create_miniprogram_item() {
      this.is_busy = true
      const data = pure_object_null_value(this.form)
      add_miniprogram_app(data).then((res) => {
        if (res.status === 0) {
          this.$emit('destory', true)
          this.$message.success('小程序+管控创建成功')
        } else {
          this.$message.error(res.message)
          this.$emit('destory', false)
        }
      }).finally(() => {
        this.is_busy = false
      })
    },
    edit_miniprogram_item() {
      this.is_busy = true
      const data = pure_object_null_value(this.form)
      data['mp_id'] = this.miniProgramInfo.mp_id
      edit_miniprogram_app(data).then((res) => {
        if (res.status === 0) {
          this.$emit('destory', true)
        } else {
          this.$message.error(res.message)
          this.$emit('destory', false)
        }
      }).finally(() => {
        this.is_busy = false
      })
    },
    create_update_miniprogram() {
      // 创建策略
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isNew === 1) {
            this.create_miniprogram_item()
          } else if (this.isNew === 2) {
            this.edit_miniprogram_item()
          }
        }
      })
    },
    cancel_dialog() {
      this.$emit('destory', false)
    },
    fetch_bundle_info_list() {
      const data = {
        bundle_id: this.form.bundle_id
      }
      get_soft_info_by_bundle_id(data).then(res => {
        if (res.status === 0) {
          if ('data' in res) {
            this.form.soft_name = res.data.soft_name
          } else {
            this.form.soft_name = ''
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    push_picture_to_cloud(params) {
      if (this.icon_list.length >= 1) {
        this.$message.warning('只能上传一张图片')
        return
      }
      const file = params.file
      uploadFormDataSecondPassServer(file).then(res => {
        const remote_data = res.data
        if ([1, -2, '-2'].indexOf(remote_data.status) !== -1) {
          // 未上传, 使用 文件接口上传
          uploadFormDataServer(file).then((res) => {
            const upload_data = res.data
            if (upload_data.status === 0) {
              const url = upload_data.data.url
              const item = {
                name: params.file.name,
                url
              }
              this.icon_list.push(item)
              this.form.icon = url
            } else {
              this.$message.error(upload_data.message)
            }
          })
        } else if (remote_data.status === -1) {
          // 秒传失败
          this.$message.error(remote_data.message)
        } else if (remote_data.status === 0) {
          // 秒传成功
          const url = remote_data.data.url
          const item = {
            name: params.file.name,
            url
          }
          this.icon_list.push(item)
          this.form.icon = url
          this.$message.success('上传成功')
        } else {
          // 未知异常
          this.$message.error(remote_data.message)
        }
      })
    },
    remove_picture() {
      this.icon_list = []
      this.form.icon = ''
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
