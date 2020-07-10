<template>
  <div class="resume">
    <el-card class="title">
      <span>个人信息</span>
    </el-card>
    <el-card class="box-card">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="100px"
        class="demo-ruleForm"
        label-suffix=":">
        <el-form-item label="账号" prop="user_id">
          <el-input v-model="form.user_id" disabled />
        </el-form-item>
        <el-form-item label="真实姓名" prop="real_name">
          <el-input v-model="form.real_name" disabled />
        </el-form-item>
        <el-form-item label="账号类型" prop="account_name">
          <el-input v-model="form.account_name" disabled />
        </el-form-item>
        <el-form-item label="账号角色" prop="role_name">
          <el-input v-model="form.role_name" disabled />
        </el-form-item>
        <el-form-item label="个人头像" prop="img_url">
          <el-upload
            v-show="!upload_disabled"
            :http-request="push_picture_to_cloud"
            :on-remove="remove_picture"
            :multiple="false"
            :limit="1"
            :file-list="file_list"
            :class="{'hidden-img': upload_disabled}"
            :show-file-list="false"
            action=""
            accept="image/png, image/jpeg"
            list-type="picture">
            <template slot="tip">
              <div class="upload-file-to-server">备注: 支持上传jpg/png图片格式, 尺寸为50x50，且不超过100kb.</div>
            </template>
            <el-button size="mini" type="primary">点击上传</el-button>
          </el-upload>
          <div v-show="upload_disabled" class="avatar-area">
            <img :src="form.img_url" class="avatar" alt="">
            <i class="el-icon-delete avatar-delete" @click="delete_avatar" />
          </div>
        </el-form-item>
        <el-form-item class="update-action">
          <el-button size="mini" type="primary" @click="save('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { uploadFormDataSecondPassServer, uploadFormDataServer } from '@/utils/uploadResource'
import { update_system_account_avatar } from '@/api/login'
import { get_value_from_map_list } from '@/utils/common'
import { ACCOUNT_NAME_LIST } from '@/utils/constant'
// import { Decrypt, Encrypt } from '@/utils/secret'
// https://filedev.dev.zhixike.net/437EC0AC7F0000015E2BBF4849643C96/2020/3/828247dfc112cabc7e7ea466249c08d43c61f869423eaf03804752d8a9cd0a28.jfif

export default {
  name: 'Profile',
  components: {},
  data() {
    const img_url = this.$store.getters.avatar
    let file_list
    if (img_url) {
      file_list = [
        {
          url: img_url,
          name: 'avatar.png'
        }
      ]
    } else {
      file_list = []
    }
    const account_name = get_value_from_map_list(this.$store.getters.account_type, ACCOUNT_NAME_LIST, ACCOUNT_NAME_LIST[0].label)
    return {
      form: {
        user_id: this.$store.getters.name,
        real_name: this.$store.getters.real_name,
        role_name: this.$store.getters.role_name,
        account_name,
        img_url: this.$store.getters.avatar
      },
      rules: {
        img_url: [
          { type: 'string', required: true, message: '请按规则上传一张个人图片', trigger: 'change' }
        ]
      },
      file_list,
      upload_disabled: false
    }
  },
  watch: {
    file_list: {
      handler: function(info) {
        if (info.length >= 1) {
          this.upload_disabled = true
          this.img_url = info[0].url
        } else {
          this.upload_disabled = false
        }
      },
      immediate: true
    }
  },
  mounted: function() {
  },
  methods: {
    save: function(formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.save_user_avatar()
        } else {
          return false
        }
      })
    },
    save_user_avatar: function() {
      const config = {
        img_url: this.form.img_url
      }
      update_system_account_avatar(config).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.$store.dispatch('GetInfo')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    delete_avatar: function() {
      this.form.img_url = ''
      this.remove_picture()
    },
    remove_picture: function() {
      this.file_list = []
    },
    push_picture_to_cloud: function(params) {
      if (this.file_list.length >= 1) {
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
              this.file_list.push(item)
              this.form.img_url = url
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
          this.file_list.push(item)
          this.form.img_url = url
          this.$message.success('上传成功')
        } else {
          // 未知异常
          this.$message.error(remote_data.message)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.resume {
  width: 100%;
  height: 100%;

  .title {
    margin-bottom: 15px;
  }

  .box-card {
    margin-left: 20px;
    max-width: 500px;

    .update-action {
      text-align: right;
    }

    .hidden-img {
      display: none;
    }

    .avatar-area {
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .avatar-delete {
        &:hover {
          color: red;
        }
      }
    }

    .upload-file-to-server {
      font-size: 10px;
      color: #606266;
    }
  }
}
</style>
