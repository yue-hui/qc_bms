<template>
  <div class="upload-container">
    <el-button
      :style="{background:color,borderColor:color}"
      type="primary"
      icon="el-icon-upload"
      size="mini"
      @click=" dialogVisible=true">
      <span>上传图片/视频</span>
    </el-button>
    <el-dialog
      :before-close="beforeClose"
      :visible.sync="dialogVisible"
      top="25vh"
      title="上传图片/视频"
      width="760px"
      append-to-body>
      <el-upload
        :http-request="pushPictureToAliOss"
        :file-list="fileList"
        :multiple="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :show-file-list="true"
        :before-upload="beforeUpload"
        action=""
        class="editor-slide-upload"
        list-type="picture-card"
        @exceed="handleExceed">
        <el-button size="mini" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传图片和视频文件，且图片大小限制在10MB以内，视频大小限制在50MB以内</div>
      </el-upload>
      <div style="text-align: right;">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadFormDataSecondPassServer, uploadFormDataServer } from '@/utils/uploadResource'

const IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmp']
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
      this.$confirm('确认关闭上传图片/视频接口么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogVisible = false
      })
    },
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片或视频上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(url, file) {
      const uid = file.uid
      if (this.listObj[uid]) {
        this.listObj[uid]['url'] = url
        this.listObj[uid]['hasSuccess'] = true
      }
    },
    handleExceed(files, fileList) {
      console.log('handleExceed: ', files, fileList)
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      this.fileList = this.fileList.filter(r => r.uid !== uid)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    checkFileStatus(file) {
      // 图片与视频大小限制
      const type = file.type
      const size = file.size
      if (IMAGE_TYPES.indexOf(type) !== -1 || VEDIO_TYPES.indexOf(type) !== -1) {
        if (IMAGE_TYPES.indexOf(type) !== -1) {
          if (size > 10 * 1024 * 1024) {
            this.$message.error('上传图片大小限制在10MB内')
            this.handleRemove(file)
            return false
          }
        } else if (VEDIO_TYPES.indexOf(type) !== -1) {
          if (size > 50 * 1024 * 1024) {
            this.$message.error('上传视频文件限制在50MB内')
            this.handleRemove(file)
            return false
          }
        }
        return true
      } else {
        this.$message.error('文件格式不为图片或视频格式')
        return false
      }
    },
    beforeUpload(file) {
      const isPass = this.checkFileStatus(file)
      if (!isPass) {
        return isPass
      }
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      const type = file.type
      const name = file.name
      this.listObj[fileName] = {}
      if (IMAGE_TYPES.indexOf(type) !== -1) {
        const file_type = 'image'
        // 判断文件图片大小
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = _URL.createObjectURL(file)
          img.onload = () => {
            _self.listObj[fileName] = {
              hasSuccess: false,
              uid: file.uid,
              file_type,
              type,
              name,
              width: this.width,
              height: this.height
            }
          }
          resolve(true)
        })
      } else if (VEDIO_TYPES.indexOf(type) !== -1) {
        const file_type = 'vedio'
        this.listObj[fileName] = { hasSuccess: false, uid: file.uid, name, file_type, type, width: 400, height: 400 }
        return true
      } else {
        return false
      }
    },
    pushPictureToAliOss(params) {
      const file = params.file
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
              setTimeout(() => {
                this.handleSuccess(url, file_attr)
              }, 300)
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
          setTimeout(() => {
            this.handleSuccess(url, file_attr)
          }, 300)
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
