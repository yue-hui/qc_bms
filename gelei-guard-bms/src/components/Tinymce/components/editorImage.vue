<template>
  <div class="upload-container">
    <el-button
      :style="{background:color,borderColor:color}"
      type="primary"
      icon="el-icon-upload"
      size="mini"
      @click=" dialogVisible=true">上传图片/视频
    </el-button>
    <el-dialog
      :before-close="beforeClose"
      :visible.sync="dialogVisible">
      <el-upload
        :http-request="pushPictureToAliOss"
        :file-list="fileList"
        :multiple="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :show-file-list="true"
        action=""
        class="editor-slide-upload"
        list-type="picture-card"
        @exceed="handleExceed">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传图片和视频文件，且图片大小限制在10MB以内，视频大小限制在50MB以内</div>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { uploadFormDataSecondPassServer, uploadFormDataServer } from '@/utils/uploadResource'

const IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
const VEDIO_TYPES = ['video/ogg', 'video/mp4', 'video/webm', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb']

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    beforeClose() {
    },
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(url, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = url
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleExceed(files, fileList) {
      console.log('handleExceed: ', files, fileList)
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      const type = file.type
      this.listObj[fileName] = {}
      if (IMAGE_TYPES.indexOf(type) !== -1) {
        const file_type = 'image'
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = _URL.createObjectURL(file)
          img.onload = function() {
            _self.listObj[fileName] = {
              hasSuccess: false,
              uid: file.uid,
              file_type,
              type,
              width: this.width,
              height: this.height
            }
          }
          resolve(true)
        })
      } else if (VEDIO_TYPES.indexOf(type) !== -1) {
        const file_type = 'vedio'
        this.listObj[fileName] = { hasSuccess: false, uid: file.uid, file_type, type, width: 400, height: 400 }
        return true
      } else {
        return false
      }
    },
    pushPictureToAliOss(params) {
      const file = params.file
      // handle exceed 失效限制后续再添加
      // // 图片与视频大小限制
      // const type = file.type
      // const size = file.size
      // if (IMAGE_TYPES.indexOf(type) !== -1) {
      //   if (size > 10) {
      //     this.$message.error('图片大小限制在10MB内')
      //     this.handleRemove(file)
      //     return
      //   }
      // } else if (VEDIO_TYPES.indexOf(type) !== -1) {
      //   if (size > 50 * 1024 * 1024) {
      //     this.$message.error('视频文件限制在50MB内')
      //     this.handleRemove(file)
      //     return
      //   }
      // }
      this.beforeUpload(file)
      const file_attr = {
        name: file.name,
        uid: file.uid,
        type: file.type,
        url: ''
      }
      uploadFormDataSecondPassServer(file).then(res => {
        const remote_data = res.data
        if ([1, -2, '-2'].indexOf(remote_data.status) !== -1) {
          // 未上传, 使用 文件接口上传
          uploadFormDataServer(file).then((res) => {
            const upload_data = res.data
            if (upload_data.status === 0) {
              const url = upload_data.data.url
              file_attr['url'] = url
              this.fileList.push(file_attr)
              this.handleSuccess(url, file_attr)
            } else {
              this.handleRemove(file)
              this.$message.error(upload_data.message)
            }
          }).catch(() => {
            this.handleRemove(file)
          })
        } else if (remote_data.status === -1) {
          // 秒传失败
          this.handleRemove(file)
          this.$message.error(remote_data.message)
        } else if (remote_data.status === 0) {
          // 秒传成功
          const url = remote_data.data.url
          file_attr['url'] = url
          this.fileList.push(file_attr)
          this.handleSuccess(url, file_attr)
        } else {
          // 未知异常
          this.handleRemove(file)
          this.$message.error(remote_data.message)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;

  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
