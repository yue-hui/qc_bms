<template>
  <div class="">
    <div class="topic-save-title">
      <span>话题创建</span>
    </div>
    <div class="topic-save-page">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-suffix=":">
        <!------------------------------>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" maxlength="35" placeholder="请输入话题标题" size="mini" />
        </el-form-item>
        <!------------------------------>
        <el-form-item label="投票项" prop="options">
          <el-input v-for="(item, index) in form.options" :key="index" v-model="item.option" :placeholder="'请输入选项' + (index + 1) + '名称'" maxlength="10" size="mini" />
        </el-form-item>
        <!------------------------------>
        <el-form-item label="简介" prop="description">
          <tinymce
            :height="200"
            v-model="form.description" />
        </el-form-item>
        <!------------------------------>
        <el-form-item label="围观次数" prop="onlookers">
          <el-input v-model="form.onlookers" placeholder="请输入围观次数" type="number" size="mini" />
        </el-form-item>
        <!------------------------------>
        <el-form-item label="福利说明" prop="benefitUrl">
          <el-button size="mini" @click="selectBenefitFile">选择图片</el-button>
          <span>格式jpg/png</span>
          <span>尺寸：690x240</span>
          <span>大小：不超过500kb</span>
          <div v-if="form.benefitUrl">
            <img :src="form.benefitUrl" style="height: 80px" alt="">
          </div>
        </el-form-item>
        <!------------------------------>
        <el-form-item label="运营位展示" prop="show_type">
          <el-radio-group v-model="form.isShowBanner">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!---->
        <div v-if="form.isShowBanner === 1" class="operate-list">
          <div v-for="(item, index) in form.banners" :key="index" class="operate-item">
            <el-form-item :prop="'banners.' + index + '.title'" :rules="{required: true, message: '标题不能为空', trigger: 'blur'}" label="标题">
              <el-input v-model="item.title" maxlength="35" placeholder="标题仅在后台展示" size="mini" />
            </el-form-item>
            <el-form-item :prop="'banners.' + index + '.url'" :rules="{required: true, message: '请选择图片', trigger: 'blur'}" label="图片上传">
              <el-button size="mini" @click="selectOperate(index)">选择图片</el-button>
              <span>格式jpg/png</span>
              <span>尺寸：690x240</span>
              <span>大小：不超过500kb</span>
              <div v-if="item.url">
                <img :src="item.url" style="height: 80px" alt="">
              </div>
            </el-form-item>
            <el-form-item label="图片跳转" prop="jumpTarget">
              <el-radio-group v-model="item.jumpTarget">
                <el-radio label="01">APP原生页</el-radio>
                <el-radio label="02">H5链接</el-radio>
                <el-radio label="03">微信小程序</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :prop="'banners.' + index + '.jumpArgs'" :rules="{required: true, message: '跳转参数不能为空', trigger: 'blur'}" label="跳转参数">
              <el-input v-model="item.jumpArgs" placeholder="请输入跳转参数" size="mini" />
            </el-form-item>
            <el-form-item :prop="'banners.' + index + '.rank'" :rules="{required: true, message: '展示顺序不能为空', trigger: 'blur'}" label="展示顺序">
              <el-input v-model="item.rank" placeholder="请输入展示顺序" size="mini" />
            </el-form-item>
            <el-form-item :prop="'banners.' + index + '.time'" :rules="{required: true, message: '请选择上线时间', trigger: 'blur'}" label="上线时间">
              <el-date-picker
                v-model="item.time"
                type="datetimerange"
                size="mini"
                format="yyyy-MM-dd HH:mm"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"/>
            </el-form-item>
            <!-- 删除 -->
            <div v-if="form.banners.length > 1" class="operate-item-close-icon" @click="removeBanner(index)">
              <svg-icon icon-class="close" />
            </div>
          </div>
          <div style="margin-left: 100px;margin-bottom: 20px">
            <el-button :disabled="form.banners.length === 4" type="primary" size="mini" @click="addBanner">添加运营位</el-button>
            <span style="font-size: 12px">还可添加{{ 4 - form.banners.length }}个</span>
          </div>
        </div>
        <!------------------------------>
        <el-form-item label="新话题气泡" prop="bubbles">
          <div v-for="(item, index) in form.bubbles" :key="index" class="bubbles-item">
            <el-input v-model="item.title" maxlength="15" placeholder="气泡在话题上架后不可编辑和新增" size="mini" />
            <div class="bubbles-action" >
              <span v-show="form.bubbles.length === 1" @click="addBubbles">
                <svg-icon icon-class="add" />
              </span>
              <span v-show="form.bubbles.length > 1" @click="removeBubbles(index)">
                <svg-icon icon-class="close" />
              </span>
            </div>
          </div>
        </el-form-item>
        <!------------------------>
        <el-form-item label="上线时间" prop="startTime">
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            size="mini"
            format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"/>
        </el-form-item>
      </el-form>
      <div class="button-block">
        <el-button v-if="!isUpdate" pid="10020,10086" type="primary" size="mini" @click="save">保 存</el-button>
        <el-button v-if="isUpdate" pid="10020,10086" type="primary" size="mini" @click="update">保 存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { addTopic, topicDetail, topicUpdate } from '../../api/interactive'
import { selectLocalFile } from '../../utils'
import { uploadFormDataSecondPassServer, uploadFormDataServer } from '../../utils/uploadResource'

export default {
  name: 'Question',
  components: {
    Tinymce
  },
  props: {
  },
  data: function() {
    return {
      tinymce_content: '',
      form: {
        title: '', // 话题标题
        options: [ // 选项
          {
            option: ''
          },
          {
            option: ''
          }
        ],
        description: '', // 话题简介
        benefitUrl: '', // 福利
        onlookers: 0, // 围观次数
        startTime: '', // 投票开始时间
        endTime: '', // 投票结束时间
        bubbles: [
          {
            title: ''
          }
        ], // 气泡
        isShowBanner: 1,
        banners: [ // 运营位
          {
            title: '', // 标题
            url: '', // 图片
            jumpTarget: '01', // 跳转方式 01 app | 02 h5 | 03 微信小程序
            jumpArgs: '', // 跳转参数
            rank: 0, // 运营位排序
            startTime: '',
            endTime: '',
            time: null
          }
        ],
        time: null
      },
      rules: {
        title: [
          { required: true, trigger: 'blur', message: '标题不能为空' }
        ],
        options: [
          {
            validator: (rule, value, callback) => {
              const is = value.some(item => {
                return !item.option
              })
              if (!is) return callback()
              callback(new Error('投票项不能为空'))
            },
            trigger: 'blur'
          }
        ],
        description: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                return callback()
              }
              callback(new Error('简介不能为空'))
            },
            trigger: 'blur'
          }
        ],
        onlookers: [
          {
            validator: (rule, value, callback) => {
              if (value !== '') {
                return callback()
              }
              callback(new Error('围观次数不能为空'))
            },
            trigger: 'blur'
          }
        ],
        benefitUrl: [
          {
            validator: (rule, value, callback) => {
              // 福利说明不是必填项
              return callback()
              // eslint-disable-next-line no-unreachable
              if (value) {
                return callback()
              }
              callback(new Error('请上传福利图片'))
            },
            trigger: 'blur'
          }
        ],
        bubbles: [
          {
            validator: (rule, value, callback) => {
              const is = value.some(item => {
                return !item.title
              })
              if (!is) return callback()
              callback(new Error('话题气泡不能为空'))
            },
            trigger: 'blur'
          }
        ],
        startTime: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('请选择上线时间'))
              }
              callback()
            },
            trigger: 'blur'
          }
        ]
      },
      isUpdate: false,
      updateId: 0
    }
  },
  watch: {
  },
  mounted: function() {
    this.isUpdate = Number(this.$route.query.update) === 1
    this.updateId = Number(this.$route.query.topicId)
    if (this.isUpdate) {
      this.getDetail()
    }
  },
  methods: {
    /**
     * @description 提交保存
     * */
    save() {
      // 解析运营位上线时间
      this.form.banners.forEach(item => {
        if (Array.isArray(item.time)) {
          item.startTime = item.time[0].getTime()
          item.endTime = item.time[1].getTime()
        } else {
          item.startTime = ''
          item.endTime = ''
        }
      })
      // 解析气泡
      const bubbles = this.form.bubbles.map(item => item.title)
      const form = JSON.parse(JSON.stringify(this.form))
      form.bubbles = bubbles
      // 删除时间
      delete form.time
      form.banners.forEach(item => {
        delete item.time
      })
      // 是否展示运营位
      if (form.isShowBanner === 2) {
        form.banners = []
      }
      delete form.isShowBanner
      Promise.all([
        this.$refs.form.validate()
      ])
        .then(() => {
          addTopic(form)
            .then(res => {
              if (res.status !== 0) throw res
              this.$router.replace({ name: 'activity-topic' })
            })
            .catch((e) => {
              this.$message.error(e.message)
            })
        })
        .catch(() => {})
    },
    /**
     * @description 提交更新
     * */
    update() {
      // 解析运营位上线时间
      this.form.banners.forEach(item => {
        if (Array.isArray(item.time)) {
          item.startTime = item.time[0].getTime()
          item.endTime = item.time[1].getTime()
        } else {
          item.startTime = ''
          item.endTime = ''
        }
      })
      // 解析气泡
      const bubbles = this.form.bubbles.map(item => item.title)
      const form = JSON.parse(JSON.stringify(this.form))
      form.bubbles = bubbles
      // 删除时间
      delete form.time
      form.banners.forEach(item => {
        delete item.time
      })
      // /
      form.options = form.options.map(item => {
        return {
          optionId: item.optionId,
          option: item.option
        }
      })
      // 是否展示运营位
      if (form.isShowBanner === 2) {
        form.banners = []
      }
      delete form.isShowBanner
      Promise.all([
        this.$refs.form.validate()
      ])
        .then(() => {
          form.topicId = this.updateId
          topicUpdate(form)
            .then(res => {
              if (res.status !== 0) throw res
              this.$router.replace({ name: 'activity-topic' })
            })
            .catch(() => {})
          console.log(form)
        })
        .catch(() => {})
    },
    /**
     * @description 添加一个运营位
     * */
    addBanner() {
      this.form.banners.push({
        title: '', // 标题
        url: '', // 图片
        jumpTarget: '01', // 跳转方式 01 app | 02 h5 | 03 微信小程序
        jumpArgs: '', // 跳转参数
        rank: 0, // 运营位排序
        startTime: '',
        endTime: '',
        time: null
      })
    },
    /**
     * @description 删除一个运营位
     * @param index {Number}
     * */
    removeBanner(index) {
      this.form.banners.splice(index, 1)
    },
    /**
     * @description 添加气泡
     * */
    addBubbles() {
      this.form.bubbles.push({ title: '' })
    },
    /**
     * @description 删除气泡
     * @param index {Number}
     * */
    removeBubbles(index) {
      this.form.bubbles.splice(index, 1)
    },
    /**
     * @description 选择福利图片
     * */
    selectBenefitFile() {
      selectLocalFile()
        .then(file => {
          this.uploadFileImg(file)
            .then(url => {
              this.form.benefitUrl = url
            })
        })
    },
    /**
     * @description 选择运营位图片
     * @param index {Number} 第几个运营位
     * */
    selectOperate(index) {
      selectLocalFile()
        .then(file => {
          this.uploadFileImg(file)
            .then(url => {
              this.form.banners[index].url = url
            })
        })
    },
    /**
     * @description 上传图片
     * @param file {File}
     * @return {Promise}
     * */
    uploadFileImg(file) {
      return new Promise(resolve => {
        uploadFormDataSecondPassServer(file)
          .then((res) => {
            const remote_data = res.data
            if ([1, -2, '-2'].indexOf(remote_data.status) !== -1) {
              // 未上传, 使用 文件接口上传
              uploadFormDataServer(file).then((res) => {
                const upload_data = res.data
                if (upload_data.status === 0) {
                  resolve(upload_data.data.url)
                } else {
                  this.$message.error(upload_data.message)
                }
              }).catch(() => {
                this.$message.error('上传失败，请重试')
              })
            } else if (remote_data.status === -1) {
              // 秒传失败
              this.$message.error(remote_data.message)
            } else if (remote_data.status === 0) {
              // 秒传成功
              resolve(remote_data.data.url)
            } else {
              this.$message.error('上传失败，请重试')
            }
          })
          .catch((e) => {
            this.$message.error('上传失败，请重试')
          })
          .finally(() => {})
      })
    },
    /**
     * @description 上线时间发生改变
     * @param date {Date | Null}
     * */
    timeChange(date) {
      console.log(date)
      if (!date) {
        this.form.startTime = ''
        this.form.endTime = ''
        return
      }
      this.form.startTime = date[0].getTime()
      this.form.endTime = date[1].getTime()
    },
    /**
     * @description 获取话题详情
     * */
    getDetail() {
      topicDetail({ topicId: this.updateId })
        .then(res => {
          if (res.status !== 0) throw res
          const data = res.data
          this.form.title = data.title
          // 投票项
          this.form.options = data.options
          // 简介
          this.form.description = data.description
          // 围观次数
          this.form.onlookers = data.onlookers
          // 福利图片
          this.form.benefitUrl = data.benefitUrl
          // 运营位
          this.form.isShowBanner = data.banners.length === 0 ? 2 : 1
          this.form.banners = data.banners.map(item => {
            item.time = [new Date(item.startTime), new Date(item.endTime)]
            return item
          })
          // 气泡
          this.form.bubbles = data.bubbles.map(item => {
            return { title: item }
          })
          // 上线时间
          this.form.time = [new Date(data.startTime), new Date(data.endTime)]
          this.form.startTime = data.startTime
          this.form.endTime = data.endTime
        })
        .catch(() => {})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.operate-list{
  .operate-item{
    width: 660px;
    border: 1px solid #b1b1b1;
    margin-left: 100px;
    margin-bottom: 20px;
    padding-top: 20px;
    padding-right: 20px;
  }
  .operate-item{
    position: relative;
    background-color: #fff;
    .operate-item-close-icon{
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: -30px;
      top: 2px;
      cursor: pointer;
    }
  }
}
.topic-save-page{
  background: #fff;
  margin: 20px;
  padding: 20px;
  border: 1px solid #EAEAEA;
  margin-top:0
}
.topic-save-title{
  height: 60px;
  font-size: 18px;
  color: #303133;
  line-height: 60px;
  padding: 0 22px;
}
.button-block{
  display: flex;
  justify-content: center;
}
.bubbles-item{
  display: flex;
  align-items: center;
  svg{
    margin-left: 20px;
    cursor: pointer;
  }
  .bubbles-action{
    display: flex;
    align-items: center;
    span:nth-child(2) {
      position: relative;
      top: -2px;
      svg{
        font-size: 10px;
      }
    }
  }
}
</style>
