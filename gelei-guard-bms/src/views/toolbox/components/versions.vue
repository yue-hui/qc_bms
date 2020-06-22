<template>
  <div class="component-card">
    <el-dialog
      :title="title"
      :visible.sync="showDialog"
      :before-close="close_dialog"
      top="0"
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
          <el-input v-model="form.file_size" type="number" placeholder="请输入目标版本包大小">
            <template slot="append">MB</template>
          </el-input>
        </el-form-item>

        <span class="group-title">基础策略配置</span>
        <hr class="diviser">
        <el-form-item label="策略名称" prop="update_title">
          <el-input v-model="form.update_title" placeholder="请输入策略名称" />
        </el-form-item>
        <el-form-item label="升级产品" prop="current_platform_classification">
          <el-select
            v-model="form.current_platform_classification"
            size="mini"
            placeholder="升级产品"
            @change="change_platform_classification">
            <el-option
              v-for="(platform, index) in bms_platform_classification"
              :key="index"
              :label="platform.label"
              :value="platform.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="升级平台" prop="platform">
          <el-radio-group v-model="form.platform">
            <el-row>
              <el-col>
                <el-radio
                  v-for="(platform, index) in update_platforms"
                  :key="index"
                  :label="platform.value"
                  :title="platform.label"
                  class="multi-radio-col"
                  @change="change_update_platform">{{ platform.label }}
                </el-radio>
              </el-col>
            </el-row>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="升级方式" prop="is_force">
          <el-radio-group v-model="form.is_force">
            <el-radio
              v-for="(update_model, index) in update_models"
              :disabled="update_model.disabled"
              :key="index"
              :label="update_model.value"
            >
              {{ update_model.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="update_ranges.length !== 0"
          label="升级范围"
          prop="publish_type">
          <el-radio-group v-model="form.publish_type">
            <el-radio v-for="(update_range, index) in update_ranges" :key="index" :label="update_range.value">
              {{ update_range.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="update_ranges.length !== 0" label="" prop="white_list">
          <el-input
            v-model="form.white_list"
            :disabled="['02', '03'].indexOf(form.publish_type) === -1"
            :rows="3"
            resize="none"
            type="textarea" />
        </el-form-item>
        <el-form-item label="升级地址" prop="update_url">
          <el-input v-model="form.update_url" placeholder="请输入版本的升级地址" />
        </el-form-item>
        <el-form-item v-if="need_upload_app_package" label="">
          <el-upload
            :http-request="push_picture_to_cloud"
            :on-remove="remove_picture"
            :multiple="false"
            :limit="1"
            :file-list="upload_file_list"
            action=""
            class="upload-demo"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
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
        <gl-button :disabled="is_busy" pid="10016,10029" type="primary" size="mini" @click="create_update_strage">{{ show_save_label }}</gl-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { bms_platform_classification } from '@/views/toolbox/data/promotion'
import { add_application_version, edit_application_version, get_application_version } from '@/api/interactive'
import { POSITIVE_FLOAT } from '@/utils/constant'
import { uploadFormDataSecondPassServer, uploadFormDataServer } from '@/utils/uploadResource'
import { pure_object_null_value } from '@/utils/common'

export default {
  name: 'VersionDialog',
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
    let update_platforms = []
    let update_ranges = []
    let update_models = []
    if (bms_platform_classification.length) {
      update_platforms = bms_platform_classification[0].select_item.update_platforms
      update_ranges = bms_platform_classification[0].select_item.update_ranges
      update_models = bms_platform_classification[0].select_item.update_models
    }
    /* 升级范围校验 */
    const validatePublishType = (rule, value, callback) => {
      if (update_ranges.length !== 0) {
        if (!value) {
          callback(new Error('升级范围请选择全量或白名单'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    /* 白名单校验 */
    const validateWhiteList = (rule, value, callback) => {
      if (['02', '03'].indexOf(this.form.publish_type) !== -1) {
        if (!this.form.white_list) {
          callback(new Error('白名单不能为空'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      bms_platform_classification,
      update_platforms,
      update_models,
      update_ranges,
      is_busy: false,
      need_upload_app_package: false,
      upload_file_list: [],
      form: {
        app_version: '',
        file_size: '',
        update_url: '',
        update_title: '',
        current_platform_classification: '',
        platform: '',
        is_force: '',
        publish_type: '',
        white_list: '',
        is_remind: '1',
        update_desc: '',
        start_strage: '1',
        end_strage: '1'
      },
      rules: {
        app_version: [{ required: true, trigger: 'blur', message: '目标版本号不能为空' }],
        file_size: [{ type: 'string', required: true, message: '包大小只能输入数字', trigger: 'blur', pattern: POSITIVE_FLOAT }],
        update_title: [
          { required: true, trigger: 'blur', message: '策略名称为必填项' },
          { max: 12, trigger: 'blur', message: '策略名称长度不能超过12个字' }
        ],
        current_platform_classification: [{ required: true, trigger: 'blur', message: '升级产品为必选项' }],
        platform: [{ required: true, trigger: 'blur', message: '升级平台为必选项' }],
        is_force: [{ required: true, trigger: 'blur', message: '升级方式为必选项' }],
        publish_type: [{ trigger: 'blur', validator: validatePublishType }],
        white_list: [{ trigger: 'blur', validator: validateWhiteList }],
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
        current_platform_classification: '',
        platform: '',
        is_force: '',
        publish_type: '',
        white_list: '',
        is_remind: '1',
        update_desc: '',
        start_strage: '1',
        end_strage: '1'
      }
    },
    reflect_platform_classification(platform) {
      let current_platform_classification = ''
      let platform_classification = bms_platform_classification[0]
      bms_platform_classification.map(r => {
        r.select_item.update_platforms.map(res => {
          if (res.value === platform) {
            platform_classification = r
          }
        })
      })
      current_platform_classification = platform_classification.value
      this.change_platform_classification(current_platform_classification)
      return current_platform_classification
    },
    fetch_application_version() {
      const config = {
        version_id: this.rid
      }
      get_application_version(config).then(res => {
        if (res.status === 0) {
          const remote_data = res.data
          const app_version = remote_data.version
          const current_platform_classification = this.reflect_platform_classification(remote_data.platform)
          this.form = {
            app_version,
            version_id: remote_data.version_id,
            file_size: remote_data.file_size,
            update_url: remote_data.update_url,
            update_title: remote_data.update_title,
            current_platform_classification,
            platform: remote_data.platform,
            is_force: remote_data.is_force,
            publish_type: remote_data.publish_type,
            white_list: remote_data.white_list || '',
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
    change_platform_classification(platform_value) {
      const platform_classification = bms_platform_classification.filter(r => {
        return r.value === platform_value
      })
      const item = platform_classification[0].select_item
      this.update_platforms = item.update_platforms
      this.update_ranges = item.update_ranges
      this.update_models = item.update_models
      this.form.platform = ''
      this.need_upload_app_package = false
      this.form.update_url = ''
      this.form.publish_type = ''
      this.change_update_platform(platform_value)
    },
    change_update_platform(platform_val) {
      if (['01', '02'].indexOf(platform_val) !== -1) {
        this.need_upload_app_package = false
      } else {
        this.need_upload_app_package = true
      }
    },
    push_picture_to_cloud(params) {
      if (this.upload_file_list >= 1) {
        this.$message.warning('只能上传一张图片')
        return
      }
      const file = params.file

      this.form.update_url = ''
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
              this.upload_file_list.push(item)
              this.form.update_url = item.url
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
          this.upload_file_list.push(item)
          this.form.update_url = item.url
          this.$message.success('上传成功')
        } else {
          // 未知异常
          this.$message.error(remote_data.message)
        }
      })
    },
    remove_picture() {
      this.upload_file_list = []
      this.form.update_url = ''
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
      const data = pure_object_null_value(this.form)
      if (!data.update_url) {
        delete data.update_url
      }
      this.is_busy = true
      add_application_version(data).then((res) => {
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
    edit_version() {
      const data = pure_object_null_value(this.form)
      // if (!data.update_url) {
      //   delete data.update_url
      // }
      this.is_busy = true
      edit_application_version(data).then((res) => {
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
    create_update_strage() {
      // 创建策略
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

  .multi-radio-col {
    margin-left: 0;
    margin-right: 30px;
  }
}
</style>
