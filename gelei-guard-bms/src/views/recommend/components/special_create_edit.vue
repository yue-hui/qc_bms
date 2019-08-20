<template>
  <div class="component-card-with-dialog">
    <div class="component-card" @click.self="dialog_card_action">
      <div :style="{'max-height': visiable_height}" class="dialog">
        <div class="head-area">
          <div class="title">{{ title }}</div>
          <div class="close-icon" @click="close_dialog"><i class="el-message-box__close el-icon-close" /></div>
        </div>
        <div class="body-area">
          <el-form ref="form" :rules="rules" :model="form" label-width="120px" label-suffix=":">
            <el-form-item v-if="action === 2 && form.plan_type === '01'" label="套餐ID" prop="plan_name">
              <el-input v-model="form.plan_id" class="input-disable-with-selected" disabled size="mini" />
            </el-form-item>
            <el-form-item label="专题名称" prop="subject_name">
              <el-input
                v-model="form.subject_name"
                :disabled="action === 2"
                class="input-disable-with-selected"
                size="mini" />
            </el-form-item>
            <el-form-item label="年级选择" prop="grade_list">
              <el-checkbox-group
                v-model="form.grade_list"
                @change="change_grade">
                <el-row :span="24">
                  <el-col v-for="(grade, index) in grade_list" :key="index" :span="4">
                    <el-checkbox :key="grade.val" :label="grade.val">{{ grade.name }}</el-checkbox>
                  </el-col>
                </el-row>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="专题图片" prop="subject_banner_url">
              <el-upload
                :http-request="push_picture_to_cloud"
                :on-remove="remove_picture"
                :multiple="false"
                :limit="1"
                :file-list="sendpass_second_url"
                action=""
                class="upload-demo"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <div class="upload-file-to-server">备注: 只能上传jpg/png文件, 图片尺寸为690x240，且不超过500kb.</div>
            </el-form-item>
            <el-form-item label="专题文案" prop="subject_details">
              <quill-editor
                :content="form.subject_details"
                :options="editor_option"
                @change="on_editor_change($event)" />
            </el-form-item>
            <el-form-item label="应用添加" prop="record_id_list">
              <el-autocomplete
                v-model="query_soft_name"
                :fetch-suggestions="query_search_async"
                placeholder="请输入要添加的应用"
                size="mini"
                style="width: 100%;"
                clearable
                @select="query_select_handle" />
              <div class="list-all-soft">
                <div class="soft-record-row row-header">
                  <div class="column-item column-with-index">序列号</div>
                  <div class="column column-item column-with-padding">应用名称</div>
                  <div class="column-item column-with-control">操作</div>
                </div>
                <vuedraggable
                  v-model="soft_list"
                  class="wrapper"
                  @change="change_soft_list">
                  <transition-group>
                    <div v-for="(item, index) in soft_list" :key="index" class="soft-record-row row-body">
                      <div class="column-item column-with-index">{{ index + 1 }}</div>
                      <div class="column column-item column-with-padding">{{ item.soft_name }}</div>
                      <div class="column-item column-with-control delete-action" @click="delete_soft_item(item)">删除
                      </div>
                    </div>
                  </transition-group>
                </vuedraggable>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="action-area">
                <el-button size="mini" type="primary" @click="on_submit">确定</el-button>
                <el-button size="mini" type="primary" @click="close_dialog">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { device_type_list } from '@/views/toolbox/data/promotion'
import { GRADE_LIST } from '@/utils/constant'
import {
  create_recommend_subject,
  edit_recommend_subject,
  get_manager_soft_recommend_list,
  get_recommend_subject_detail
} from '@/api/interactive'
import { uploadFormDataSecondPassServer, uploadFormDataServer } from '@/utils/uploadResource'

export default {
  name: 'SpecialCreateEdit',
  components: {
    vuedraggable,
    quillEditor
  },
  beforecreate: function() {
  },
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
    }
  },
  data: function() {
    const grade_list = GRADE_LIST
    return {
      visiable_height: '',
      grade_list,
      device_type_items: device_type_list,
      soft_list: [],
      sendpass_second_url: [],
      query_soft_name: '',
      editor_option: {},
      form: {
        subject_name: '',
        grade_list: [],
        subject_banner_url: '',
        record_id_list: [],
        subject_details: ''
      },
      rules: {
        subject_name: [
          { required: true, message: '请输入推荐应用专题名称, 15字以内', trigger: 'blur' },
          { min: 1, max: 15, message: '文字长度不能超过15个字', trigger: 'blur' }
        ],
        grade_list: [
          { required: true, type: 'array', message: '至少选择一个年级', trigger: 'blur', min: 1 }
        ],
        subject_banner_url: [
          { required: true, message: '请上传推荐应用专题图片', trigger: 'blur' }
        ],
        record_id_list: [
          { required: true, type: 'array', message: '至少添加一个应用', trigger: 'blur', min: 1 }
        ],
        subject_details: [
          { required: true, message: '专题方案不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {
    action: {
      handler: function(val) {
        if (val === 1 || val === 0) {
          this.clear_data()
        } else {
          this.init_props_data()
        }

        let title
        if (val === 1) {
          title = '创建推荐应用专题'
        } else if (val === 2) {
          title = '编辑推荐应用专题'
        } else {
          title = ''
        }
        this.title = title
      },
      immediate: true
    }
  },
  mounted: function() {
    this.visiable_height = document.documentElement.clientHeight + 'px'
  },
  methods: {
    query_search_async(query_string, cb) {
      const data = {
        soft_name: query_string
      }
      get_manager_soft_recommend_list(data).then(res => {
        let results = []
        if (res.status === 0) {
          results = res.data.map(r => {
            const value = r.soft_name
            return {
              ...r,
              value
            }
          })
        } else {
          this.$message.error(res.message)
        }
        cb(results)
      })
    },
    query_select_handle(item) {
      const record_id = item.record_id
      if (this.form.record_id_list.indexOf(record_id) === -1) {
        this.soft_list.push(item)
        this.update_record_id_list()
      }
      this.query_soft_name = ''
    },
    update_record_id_list() {
      this.form.record_id_list = this.soft_list.map(r => {
        return r.record_id
      })
    },
    dialog_card_action() {
      this.close_dialog()
    },
    close_dialog() {
      this.$emit('callback')
    },
    on_submit() {
      this.$refs.form.validate(valid => {
        if ([0, 1].indexOf(this.action) !== -1) {
          this.on_create()
        } else {
          this.on_save()
        }
        this.$emit('callback', true)
      })
    },
    on_save() {
      edit_recommend_subject(this.form).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    on_create() {
      create_recommend_subject(this.form).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    change_grade(grade) {
      console.log('grade', grade)
    },
    change_device_type(e) {
      this.public_form.device_type = e
    },
    change_un_pub_device_type(e) {
      this.un_public_form.device_type = e
    },
    clear_data() {
      this.form = {
        grade_list: [],
        subject_name: '',
        subject_banner_url: '',
        record_id_list: [],
        subject_details: ''
      }
    },
    init_props_data() {
      const current = this.current
      const rec_subject_id = current.rec_subject_id
      const data = {
        rec_subject_id
      }
      get_recommend_subject_detail(data).then(res => {
        if (res.status === 0) {
          const remote_data = res.data
          const record_id_list = remote_data.soft_list.map(r => {
            return r.record_id
          })
          this.form = {
            rec_subject_id: rec_subject_id,
            subject_name: remote_data.subject_name,
            grade_list: remote_data.grade_list || [],
            subject_banner_url: remote_data.subject_banner_url,
            subject_details: remote_data.subject_details,
            record_id_list
          }
          this.sendpass_second_url = [
            {
              uid: new Date().getTime(),
              name: remote_data.subject_banner_url
            }
          ]
          // 同步列表信息
          this.soft_list = remote_data.soft_list || []
        } else {
          this.clear_data()
          this.$message.error(res.message)
        }
      })
    },
    on_editor_change({ quill, html, text }) {
      this.form.subject_details = html
    },
    push_picture_to_cloud(params) {
      if (this.sendpass_second_url.length >= 1) {
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
              this.sendpass_second_url.push(item)
              this.form.subject_banner_url = item.name
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
          this.sendpass_second_url.push(item)
          this.form.subject_banner_url = item.url
          this.$message.success('上传成功')
        } else {
          // 未知异常
          this.$message.error(remote_data.message)
        }
      })
    },
    remove_picture() {
      this.sendpass_second_url = []
      this.form.subject_banner_url = ''
    },
    delete_soft_item(item) {
      const record_id = item.record_id
      const soft_list = this.soft_list
      this.soft_list = soft_list.filter(r => {
        return r.record_id !== record_id
      })
      this.update_record_id_list()
    },
    change_soft_list() {
      this.update_record_id_list()
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
      min-height: 400px;
      position: relative;
      background-color: #FFF;
      z-index: $z_index_message_dialog + 1;
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

        .action-area {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }

        .list-all-soft {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;

          .soft-record-row {
            display: flex;
            flex-direction: row;
            color: white;
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            vertical-align: center;

            &.row-header {
              background-color: #314a52;
            }

            &.row-body:nth-child(2n) {
              background-color: #52686a;
            }

            &.row-body:nth-child(2n + 1) {
              background-color: #acbdc5;
            }

            .column-item {
              border-right: 1px solid #ffded5;
            }

            .column {
              flex: 1;
            }

            .column-with-padding {
              padding-left: 10px;
            }

            .column-with-index {
              width: 60px;
              text-align: center;
            }

            .column-with-control {
              width: 60px;
              text-align: center;
            }

            .delete-action {
              text-decoration: underline;

              &:hover {
                color: dodgerblue;
                cursor: pointer;
              }
            }
          }
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

