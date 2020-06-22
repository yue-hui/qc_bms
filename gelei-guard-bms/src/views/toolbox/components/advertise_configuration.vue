<template>
  <div class="component-card-with-dialog">
    <div class="component-card" @click.self="dialog_card_action">
      <div :style="{'max-height': visiable_height}" class="dialog">
        <div class="head-area">
          <div class="title">{{ title }}</div>
          <div class="close-icon" @click="close_dialog"><i class="el-message-box__close el-icon-close" /></div>
        </div>
        <div class="body-area">
          <el-form ref="header_form" :model="form" :rules="rules" label-width="120px" label-suffix=":">
            <el-form-item label="广告名称" prop="ad_name">
              <el-input v-model="form.ad_name" :disabled="action === 2" size="mini" />
            </el-form-item>
            <el-form-item label="广告平台" prop="ad_type">
              <el-radio-group v-model="form.platform" size="mini">
                <el-radio
                  v-for="(platform, index) in platform_type"
                  :key="index"
                  :disabled="platform.value === '02'"
                  :label="platform.value">{{ platform.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="广告类型" prop="ad_type">
              <el-radio-group v-model="form.ad_type" size="mini">
                <el-radio
                  v-for="(genre, index) in advertisement_type"
                  :key="index"
                  :disabled="genre.value === '03'"
                  :label="genre.value">{{ genre.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.ad_type === '01'" label="广告位置" prop="ad_position">
              <el-radio-group v-model="form.ad_position" size="mini">
                <el-radio
                  v-for="(location, index) in advertisement_locations"
                  :key="index"
                  :label="location.value">{{ location.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="图片上传" prop="file_list">
              <el-upload
                :http-request="push_picture_to_cloud"
                :on-remove="remove_picture"
                :multiple="false"
                :limit="1"
                :file-list="form.file_list"
                action=""
                class="upload-demo"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <div class="upload-file-to-server">备注: 只能上传jpg/png文件, 图片尺寸为690x240，且不超过500kb.</div>
            </el-form-item>
          </el-form>

          <div class="diviser" />

          <!--公开套餐 begin-->
          <el-form
            v-show="form.ad_position !== '02'"
            ref="public_form"
            :model="form"
            :rules="public_rules"
            label-width="120px"
            label-suffix=":">
            <el-form-item label="图片跳转目标" prop="jump_target">
              <el-radio-group v-model="form.jump_target" size="mini" @change="change_jump_target">
                <el-radio
                  v-for="(platform, index) in advertisement_platform"
                  :key="index"
                  :label="platform.value">{{ platform.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="跳转参数" prop="jump_args">
              <el-input v-model="form.jump_args" :disabled="form.jump_target === '无'" size="mini" />
            </el-form-item>
            <el-form-item label="图片排序" prop="row_order">
              <el-input v-model.number="form.row_order" type="number" size="mini" />
            </el-form-item>
            <el-form-item label="投放时间" prop="date_range">
              <el-col :span="24">
                <el-date-picker
                  v-model="form.date_range"
                  size="mini"
                  type="datetimerange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" />
              </el-col>
            </el-form-item>
          </el-form>
          <!--公开套餐 end-->

          <el-form label-width="120px" label-suffix=":">
            <el-form-item>
              <div class="action-area">
                <el-button size="mini" @click="close_dialog">取消</el-button>
                <gl-button :disabled="save_flag" pid="10052,10028" size="mini" type="primary" @click="on_save">{{ save_btn_label }}</gl-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ADVERTISE_PLATFORM_TYPES, ADVERTISEMENT_PLATFORM } from '@/utils/constant'
import { add_advertising, edit_advertising } from '@/api/interactive'
import { uploadFormDataSecondPassServer, uploadFormDataServer } from '@/utils/uploadResource'

export default {
  name: 'AdvertiseConfiguration',
  props: {
    action: {
      type: Number,
      default: 0
    },
    current: {
      type: Object,
      default: function() {
        return {}
      }
    },
    advertisement_locations: {
      type: Array,
      default: function() {
        return []
      }
    },
    advertisement_type: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data: function() {
    const platform_type = ADVERTISE_PLATFORM_TYPES
    const validateAdvertisePosition = (rule, value, callback) => {
      if (!value && ['01'].indexOf(this.form.ad_type) !== -1) {
        callback(new Error('"广告类型"为"固定位置"时, "广告位置"为必选项'))
      } else {
        callback()
      }
    }
    const validateJumpArgs = (rule, value, callback) => {
      if (!value && this.form.jump_target !== '无') {
        callback(new Error('当"图片跳转目标"不为选项"无"时，"跳转参数"为必填项'))
      } else {
        callback()
      }
    }
    return {
      platform_type,
      form: {
        ad_name: '',
        platform: '',
        ad_type: '',
        ad_position: '',
        file_list: [],
        jump_target: '',
        jump_args: '',
        row_order: '',
        date_range: ''
      },
      rules: {
        ad_name: [
          { required: true, message: '请输入广告名称', trigger: 'blur' },
          { min: 1, max: 15, message: '文字长度不能超过15个字', trigger: 'blur' }
        ],
        platform: [
          { required: true, message: '广告平台为必选项', trigger: 'blur' }
        ],
        ad_type: [
          { required: true, message: '广告类型为必选项', trigger: 'blur' }
        ],
        ad_position: [
          { trigger: 'blur', validator: validateAdvertisePosition }
        ],
        file_list: [
          { required: true, type: 'array', min: 1, message: '请按规范上传图片', trigger: 'blur' }
        ]
      },
      public_rules: {
        jump_target: [
          { type: 'string', required: true, trigger: 'blur', message: '请输入广告名称跳转目录' }
        ],
        jump_args: [
          // { type: 'string', required: true, trigger: 'blur', message: '图片跳转目标为必选项' }
          { trigger: 'blur', validator: validateJumpArgs }
        ],
        row_order: [
          { type: 'number', required: true, trigger: 'blur', message: '图片排序不能为空' },
          { type: 'number', min: 0, max: 100, required: true, trigger: 'blur', message: '图片排序值的范围为0-100' }
        ],
        date_range: [
          { type: 'array', required: true, trigger: 'blur', message: '活动时间为必选项' }
        ]
      },
      save_flag: false,
      title: '',
      file_list: [],
      advertisement_platform: ADVERTISEMENT_PLATFORM,
      visiable_height: ''
    }
  },
  watch: {
    action: {
      handler: function(val) {
        if (val === 1) {
          this.create_init()
          this.title = '创建广告'
          this.save_btn_label = '创建'
        } else if (val === 2) {
          this.edit_init()
          this.title = this.current.ad_name
          this.save_btn_label = '保存'
        } else {
          this.create_init()
          this.title = '广告配置'
          this.save_btn_label = '保存'
        }
      },
      immediate: true
    }
  },
  mounted: function() {
    this.visiable_height = document.documentElement.clientHeight + 'px'
  },
  methods: {
    create_init() {
      this.form = {
        ad_name: '',
        ad_type: '',
        platform: '',
        ad_position: '',
        file_list: [],
        jump_target: '',
        jump_args: '',
        row_order: '',
        date_range: ''
      }
    },
    edit_init() {
      const ad_photo_url = this.current.ad_photo_url
      let name
      if (ad_photo_url.indexOf('/') !== -1) {
        name = ad_photo_url.slice(ad_photo_url.lastIndexOf('/') + 1, ad_photo_url.length)
      } else {
        name = ''
      }
      const file_list = [
        {
          url: ad_photo_url,
          name
        }
      ]
      const date_range = [this.current.begin_time, this.current.end_time]
      this.form = {
        ad_name: this.current.ad_name,
        ad_type: this.current.ad_type,
        platform: this.current.platform,
        ad_position: this.current.ad_position,
        file_list,
        jump_target: this.current.jump_target,
        jump_args: this.current.jump_args,
        row_order: this.current.row_order,
        date_range: date_range
      }
    },
    change_jump_target(item) {
      if (item === '无') {
        // 无时清空用户输入参数, 在保存时处理
        // this.form.jump_args = ''
      }
    },
    dialog_card_action() {
      this.$emit('callback')
    },
    close_dialog() {
      this.$emit('callback')
    },
    get_options() {
      const ad_position = this.form.ad_position
      const options = {
        ad_position
      }
      if (ad_position !== '02') {
        options['row_order'] = this.form.row_order
        options['jump_target'] = this.form.jump_target
        if (options['jump_target'] === '无') {
          // 跳转目标为"无"时,跳转参数为空
          options['jump_args'] = ''
        } else {
          options['jump_args'] = this.form.jump_args
        }
        const date_range = this.form.date_range
        if (date_range) {
          const begin_time = new Date(date_range[0]).getTime()
          const end_time = new Date(date_range[1]).getTime()
          options['begin_time'] = begin_time
          options['end_time'] = end_time
        }
      }
      options['ad_name'] = this.form.ad_name
      options['ad_type'] = this.form.ad_type
      options['ad_position'] = this.form.ad_position
      options['platform'] = this.form.platform
      options['ad_photo_url'] = this.form.file_list[0].url
      return options
    },
    create_advertising() {
      const options = this.get_options()
      add_advertising(options).then(res => {
        if (res.status === 0) {
          this.$emit('callback', true)
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.save_flag = false
      })
    },
    save_advertising() {
      const options = this.get_options()
      options['ad_id'] = this.current.ad_id
      edit_advertising(options).then(res => {
        if (res.status === 0) {
          this.$emit('callback', true)
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.save_flag = false
      })
    },
    check_header_form() {
      return new Promise(resolve => {
        this.$refs.header_form.validate(valid => {
          return resolve(valid)
        })
      })
    },
    check_public_form() {
      return new Promise(resolve => {
        this.$refs.public_form.validate(valid => {
          return resolve(valid)
        })
      })
    },
    async check_all_submit_field() {
      /* 校验字段值 */
      const ad_position = this.form.ad_position
      if (ad_position === '02') {
        return this.check_header_form()
      } else {
        const validate_header_form = await this.check_header_form()
        const validate_public_form = await this.check_public_form()
        return validate_header_form && validate_public_form
      }
    },
    on_save() {
      this.check_all_submit_field().then(validate => {
        if (validate) {
          this.save_flag = true
          if (this.action === 1) {
            this.create_advertising()
          } else {
            this.save_advertising()
          }
        }
      })
    },
    push_picture_to_cloud(params) {
      if (this.form.file_list.length >= 1) {
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
              this.form.file_list.push(item)
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
          this.form.file_list.push(item)
          this.$message.success('上传成功')
        } else {
          // 未知异常
          this.$message.error(remote_data.message)
        }
      })
    },
    remove_picture() {
      this.form.file_list = []
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$title_height: 40px;
$z_index_message_dialog: 2000;
.component-card-with-dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z_index_message_dialog;

  .component-card {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .dialog {
      min-width: 800px;
      position: relative;
      background-color: #FFF;
      z-index: 2001;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 0;
      }

      .head-area {
        display: block;
        height: $title_height;
        line-height: $title_height;
        padding: 0 10px;
        position: relative;
        font-size: 18px;
        color: #303133;
        font-family: 微软雅黑, 宋体;
        display: flex;
        flex-direction: row;
        background-color: #fbfbff;
        border-bottom: rgba(103, 103, 103, 0.59) 1px solid;

        .title {
          flex: 1;
        }

        .close-icon {
          font-weight: 100;
          font-size: 20px;
          width: 20px;
          height: 20px;
          cursor: pointer;
          color: #909399;
        }
      }

      .body-area {
        min-height: 400px;
        overflow-y: hidden;
        padding: 20px;

        .diviser {
          height: 1px;
          width: 100%;
          /*border-bottom: 1px dashed grey;*/
          margin: 0 0 20px 0;
        }

        .upload-file-to-server {
          font-size: 12px;
          color: #606266;
        }

        .action-area {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
      }

      .footer-area {
        height: 60px;
        line-height: 60px;
        border-top: 1px solid #eee;
      }
    }
  }
}
</style>
