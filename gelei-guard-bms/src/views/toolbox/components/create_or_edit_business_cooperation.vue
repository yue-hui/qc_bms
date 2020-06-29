<template>
  <div class="component-card">
    <el-dialog
      v-loading="loading"
      ref="dialog_pannel"
      :title="title"
      :before-close="handle_close"
      :visible.sync="dialog_visible"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      top="5vh"
      width="50%">
      <el-form ref="form" :model="form" :rules="rules" label-suffix=":" label-width="120px" class="demo-ruleForm">
        <el-form-item label="合作渠道名称" prop="channel_name">
          <el-input v-model="form.channel_name" maxlength="30" size="mini" />
        </el-form-item>
        <el-form-item label="渠道描述" prop="channel_desc">
          <el-input v-model="form.channel_desc" type="textarea" size="mini" />
        </el-form-item>
        <el-form-item label="渠道联系人" prop="channel_contacts">
          <el-input v-model="form.channel_contacts" maxlength="30" size="mini" />
        </el-form-item>
        <el-form-item label="渠道联系方式" prop="contact_info">
          <el-input v-model="form.contact_info" maxlength="30" size="mini" />
        </el-form-item>
        <el-form-item v-if="!is_created" label="渠道编号">
          <el-input v-model="form.channel_no" disabled size="mini" />
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
          <div class="upload-file-to-server">备注: 图片尺寸为347*682，格式为PNG, JPG。</div>
        </el-form-item>
        <el-form-item label="规则介绍" prop="rule">
          <el-input v-model="form.rule" type="textarea" size="mini" />
        </el-form-item>
        <el-form-item label="会员套餐" prop="plan_id">
          <el-select
            v-model="form.plan_id"
            :disabled="is_agent"
            filterable
            size="mini"
            style="width: 100%"
            placeholder="选择会员套餐">
            <el-option
              v-for="plan in plan_list"
              :key="plan.value"
              :label="plan.label"
              :value="plan.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="渠道归属人" prop="user_id_list">
          <el-select
            v-model="form.user_id_list"
            filterable
            size="mini"
            style="width: 100%"
            multiple
            placeholder="选择渠道归属人"
            @change="change_channel">
            <el-option
              v-for="channel in channels"
              :key="channel.value"
              :label="channel.label"
              :disabled="channel.disabled"
              :value="channel.value" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="!is_created" label="渠道链接">
          <el-input v-model="virtual_channel_url" disabled size="mini" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel">取 消</el-button>
        <gl-button pid="10043" size="mini" type="primary" @click="save">保 存</gl-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadFormDataSecondPassServer, uploadFormDataServer } from '@/utils/uploadResource'
import {
  edit_business_cooperation,
  get_business_cooperation_details,
  get_all_member_plans, get_manager_channel_associated_user_list
} from '@/api/interactive'
import { get_h5_domain } from '@/utils/common'
import { BUSINESS_COOPERATION_DEFAULT_PICTURE } from '@/utils/constant'
import { mapGetters } from 'vuex'

export default {
  name: 'CreateOrEditBusinessCooperation',
  props: {
    condition: {
      type: Object,
      default: function() {
        return {}
      }
    },
    dialog_visible: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    const file_list = [
      {
        status: 'success',
        uid: new Date().getTime(),
        url: BUSINESS_COOPERATION_DEFAULT_PICTURE,
        name: ''
      }
    ]
    return {
      title: '',
      loading: false,
      virtual_channel_url: '',
      form: {
        channel_no: '',
        channel_name: '',
        channel_desc: '',
        channel_contacts: '',
        contact_info: '',
        channel_id: '',
        file_list,
        user_id_list: [],
        rule: '',
        plan_id: '',
        channel_url: ''
      },
      pic_file_list: [],
      plan_list: [],
      channels: [],
      rules: {
        channel_name: [
          { required: true, message: '请输入广告名称', trigger: 'blur' }
        ],
        channel_url: [
          { required: true, message: '请输入图片上传', trigger: 'blur' }
        ],
        channel_desc: [
          { required: true, message: '渠道描述为必填项', trigger: 'blur' }
        ],
        file_list: [
          { required: true, message: '渠道背影图为必传项', trigger: 'blur' }
        ],
        user_id_list: [
          { required: true, type: 'array', min: 1, message: '渠道归属人不能为空', trigger: 'blur' }
        ],
        rule: [
          { required: true, message: '规则介绍为必填项', trigger: 'blur' }
        ],
        plan_id: [
          { required: true, message: '会员套餐不能为空', trigger: 'blur' }
        ],
        channels: [
          { required: true, message: '请选择渠道归属人', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'is_agent']),
    is_created: function() {
      return Object.keys(this.condition).length === 0
    }
  },
  mounted: function() {
    this.init_dialog()
  },
  methods: {
    handle_close() {
      this.cancel()
    },
    reset_form() {
      const invited_plan = this.plan_list.find(r => r.value === '669a95cd71f74e7b9dfd0356a3c84002')
      const file_list = [
        {
          status: 'success',
          uid: new Date().getTime(),
          url: BUSINESS_COOPERATION_DEFAULT_PICTURE,
          name: ''
        }
      ]
      this.form = {
        channel_no: '',
        channel_name: '',
        channel_desc: '',
        channel_contacts: '',
        contact_info: '',
        channel_id: '',
        user_id_list: [],
        file_list,
        rule: '',
        plan_id: invited_plan ? invited_plan.plan_id : '',
        channel_url: ''
      }
    },
    load_form_data() {
      // 编辑
      const config = {
        channel_id: this.condition.channel_id
      }
      this.loading = true
      get_business_cooperation_details(config).then(res => {
        // 获取注册来源详情
        if (res.status === 0) {
          this.form = res.data
          this.form.file_list = [
            {
              name: '',
              status: 'success',
              uid: new Date().getTime(),
              url: this.form.img_url
            }
          ]
          this.title = res.data.channel_name
          this.virtual_channel_url = this.build_channel_url(res.data.channel_id)
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    init_dialog() {
      this.fetch_plan_list().then(r => {
        if (this.is_created) {
          // 新建
          this.title = '创建商务合作注册页'
          this.reset_form()
        } else {
          this.load_form_data()
        }
      })
      this.fetch_channel_list()
    },
    build_channel_url(channel_id) {
      const h5_domain = get_h5_domain()
      return h5_domain + '/gelei-guard-h5/share/invited_friends.html#/business-cooperation?cid=' + channel_id
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
    },
    cancel() {
      this.$emit('receive', false)
      this.reset_form()
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.is_created) {
            this.modified_business_cooperation()
          } else {
            this.modified_business_cooperation()
          }
        }
      })
    },
    get_params() {
      const config = {
        channel_name: this.form.channel_name,
        channel_desc: this.form.channel_desc,
        channel_contacts: this.form.channel_contacts,
        contact_info: this.form.contact_info,
        img_url: this.form.file_list[0].url,
        rule: this.form.rule,
        user_id_list: this.form.user_id_list,
        plan_id: this.form.plan_id
      }
      if (!this.is_created) {
        // 编辑状态
        config['channel_no'] = this.form.channel_no
        config['channel_id'] = this.form.channel_id
        config['channel_url'] = this.virtual_channel_url
      }
      return config
    },
    modified_business_cooperation() {
      const config = this.get_params()
      edit_business_cooperation(config).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.$emit('receive')
          this.reset_form()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    fetch_plan_list() {
      return new Promise(resolve => {
        const config = {
          is_listing: '1',
          plan_type: '02'
        }
        get_all_member_plans(config).then(res => {
          if (res.status === 0) {
            const remote_data = res.data
            this.plan_list = remote_data.map(r => {
              return {
                plan_id: r.plan_id,
                value: r.plan_id,
                label: r.plan_name
              }
            })
          } else {
            this.$message.error(res.message)
          }
          resolve(true)
        })
      })
    },
    change_channel(row) {
      if (row.indexOf(this.name) === -1) {
        this.form.user_id_list.unshift(this.name)
      }
    },
    fetch_channel_list() {
      get_manager_channel_associated_user_list().then(res => {
        if (res.status === 0) {
          this.channels = res.data.map(r => {
            let disabled
            if (r.user_id === this.name) {
              disabled = true
              this.form.user_id_list = [r.user_id]
            } else {
              disabled = false
            }
            return {
              label: r.real_name,
              value: r.user_id,
              disabled
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
