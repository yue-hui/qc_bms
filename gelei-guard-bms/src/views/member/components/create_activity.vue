<template>
  <div class="component-card-with-dialog">
    <div class="component-card">
      <div :style="{'max-height': visiable_height}" class="dialog">
        <div class="head-area">
          <div class="title">创建会员活动</div>
          <div class="close-icon" @click="cancel"><i class="el-message-box__close el-icon-close" /></div>
        </div>
        <div class="body-area">
          <el-form ref="form" :rules="rules" :model="form" label-width="120px" label-suffix=":">
            <el-form-item label="活动名称" prop="activity_name">
              <el-input v-model="form.activity_name" size="mini" />
            </el-form-item>
            <el-form-item label="活动类型" prop="activity_type">
              <el-radio-group v-model="form.activity_type" size="mini">
                <el-radio
                  v-for="(type, index) in activity_types"
                  :disabled="type.value !== '01'"
                  :key="index"
                  :label="type.value">{{ type.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="套餐选择" prop="plan_id">
              <el-select v-model="form.plan_id" size="mini" placeholder="请选择套餐" @change="change_plan">
                <el-option
                  v-for="plan in plan_list"
                  :key="plan.value"
                  :label="plan.label"
                  :value="plan.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="套餐时长">
              <span v-if="current_plan.valid_days" class="label-text">{{ current_plan.valid_days }}天</span>
              <span v-else class="label-text">-</span>
            </el-form-item>
            <el-form-item label="套餐原价">
              <span class="label-text">0元</span>
            </el-form-item>
            <el-form-item label="活动可参与次数">
              <span class="label-text">1次</span>
            </el-form-item>
            <el-form-item label="用户名单" prop="phones">
              <el-input v-model="form.phones" size="mini" type="textarea" />
              <el-upload
                ref="upload"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="readExcel"
                action="/wm/upload/">
                <el-button
                  slot="trigger"
                  icon="el-icon-upload"
                  size="mini"
                  type="primary">Excel导入
                </el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="消息通知" prop="is_notify">
              <el-radio-group v-model="form.is_notify" size="mini">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="消息内容" prop="notify_msg">
              <el-input v-model="form.notify_msg" :disabled="form.is_notify === '0'" size="mini" type="textarea" />
            </el-form-item>
          </el-form>

          <el-form label-width="120px" label-suffix=":">
            <el-form-item>
              <div class="action-area">
                <el-button :disabled="is_creating" size="mini" type="primary" @click="on_create">确定</el-button>
                <el-button size="mini" type="primary" @click="cancel">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { add_member_activity, get_member_plan_list } from '@/api/interactive'
import { ACTIVITY_TYPES } from '@/utils/constant'

export default {
  name: 'CreateActivity',
  beforecreate: function() {
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    const validate_notify_msg = (rule, value, callback) => {
      if (this.form.is_notify === '1' && !this.form.notify_msg) {
        callback(new Error('消息通知 选择"是"的情况下用户须填写消息内容'))
      } else {
        callback()
      }
    }
    return {
      form: {
        activity_name: '',
        activity_type: '01',
        plan_id: '',
        phones: '',
        notify_msg: '',
        is_notify: ''
      },
      rules: {
        activity_name: [
          { required: true, message: '请填写活动名称', trigger: 'blur' },
          { max: 15, message: '活动名称长度不超过15字', trigger: 'blur' }
        ],
        activity_type: [
          { required: true, message: '活动类型不能为空', trigger: 'blur' }
        ],
        plan_id: [
          { required: true, message: '套餐选择不能为空', trigger: 'blur' }
        ],
        phones: [
          { required: true, message: '用户名单不能为空, 多用户以英文逗号分隔', trigger: 'blur' }
        ],
        is_notify: [
          { required: true, message: '消息通知不能为空', trigger: 'blur' }
        ],
        notify_msg: [
          { required: false, trigger: 'blur', validator: validate_notify_msg }
        ]
      },
      current_plan: {
        valid_days: ''
      },
      activity_types: ACTIVITY_TYPES,
      plan_list: [],
      visiable_height: '',
      is_creating: false
    }
  },
  computed: {},
  watch: {},
  mounted: function() {
    this.visiable_height = document.documentElement.clientHeight + 'px'
    this.fetch_plan_list()
  },
  methods: {
    readExcel(file) {
      const XLSX = require('xlsx')
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          let sheet_array
          for (const sheet in workbook.Sheets) {
            if (sheet === '活动名单' || sheet === 'Sheet1') {
              sheet_array = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            }
          }
          const row_name = '手机号'
          const phone_list = this.form.phones.split(',').map(r => {
            return r.trim()
          }).filter(r => {
            return !!r
          })
          sheet_array.forEach((v, i, a) => {
            let phone = '' + v[row_name]
            phone = phone.trim()
            if (phone && phone_list.indexOf(phone) === -1) {
              phone_list.push(phone)
            }
          })
          this.form.phones = phone_list.join(', ')
        } catch (e) {
          this.$message.warning('文件类型不正确！')
          return false
        }
      }
      fileReader.readAsBinaryString(file.raw)
    },
    create_activity() {
      const options = {
        activity_name: this.form.activity_name,
        activity_type: this.form.activity_type,
        phones: this.form.phones,
        plan_id: this.form.plan_id,
        notify_msg: this.form.notify_msg,
        is_notify: this.form.is_notify
      }
      this.is_creating = true
      add_member_activity(options).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.$emit('callback', true)
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.is_creating = false
      })
    },
    on_create() {
      this.$refs.form.validate(validate => {
        if (validate) {
          this.create_activity()
        }
      })
    },
    change_plan(plan_id) {
      const plan = this.plan_list.filter(r => {
        return r.plan_id === plan_id
      })
      let current_plan
      if (plan.length) {
        current_plan = {
          valid_days: plan.valid_days
        }
      } else {
        current_plan = {
          valid_days: ''
        }
      }
      this.current_plan = current_plan
    },
    fetch_plan_list() {
      const options = {
        plan_type: '02'
      }
      get_member_plan_list(options).then(res => {
        if (res.status === 0) {
          this.plan_list = res.data.map(r => {
            return {
              ...r,
              value: r.plan_id,
              label: r.plan_name
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleClose: function() {
    },
    cancel() {
      this.$emit('callback', false)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$title_height: 40px;
$z_index: 2000;
.component-card-with-dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z_index;

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
      z-index: $z_index + 1;
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
        font-size: 16px;
        font-weight: bold;
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
        padding: 20px;

        .diviser {
          height: 1px;
          width: 100%;
          /*border-bottom: 1px dashed grey;*/
          margin: 0 0 20px 0;
        }

        .label-text {
          color: grey;
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
