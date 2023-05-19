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
            <el-form-item  label="SN" prop="sn">
              <el-input v-model="form.sn" @input="getSn" class="input-disable-with-selected" maxlength='20' style="width:400px" size="mini" />
            </el-form-item>
            <el-form-item label="家长姓名" prop="parentName">
              <el-input v-model="form.parentName" class="input-disable-with-selected"  :disabled="action==2||form.userId!=''" style="width:400px" size="mini" />
            </el-form-item>
            <el-form-item label="家长手机号" prop="phone">
              <el-input v-model="form.phone" class="input-disable-with-selected"  :disabled="action==2" style="width:400px" size="mini" />
            </el-form-item>
            <el-form-item label="付费类型" prop="payType">
              <el-radio-group v-model="form.payType"  size="mini" :disabled="action==2||form.userId!=''">
                <el-radio label="1">购买</el-radio>
                <el-radio label="0">赠送</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="订单号" prop="orderNo">
              <el-input v-model="form.orderNo" :disabled="action==2||form.userId!=''" class="input-disable-with-selected" style="width:400px" size="mini" />
            </el-form-item>
            <el-form-item label="购买时间" prop="payTime">
               <el-date-picker v-model="form.payTime" :disabled="action==2"  type="date"  class="input-disable-with-selected" style="width:400px;height:28px" placeholder="选择日期"> </el-date-picker>
            </el-form-item>
            <el-form-item label="有效期截止" prop="payEndTime">
               <el-date-picker v-model="form.payEndTime" :disabled="action==2"  type="date"  class="input-disable-with-selected" style="width:400px;height:28px" placeholder="选择日期"> </el-date-picker>
            </el-form-item>
          </el-form>
           <el-form label-width="60px" label-suffix=":">
            <el-form-item>
              <div class="action-area">
                <el-button size="mini" @click="close_dialog">取消</el-button>
                <gl-button :disabled="is_busy" pid="10049, 10014" size="mini" type="primary" @click="on_save">保存</gl-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addSnorderApi,editSnorderApi,checkSnVipApi } from '@/api/interactive'
import { MEMBER_DEVICE_LIST_RANGE } from '@/views/toolbox/data/promotion'
import { MEMBER_PACKAGE_OBJECTS, PATRIARCH_MEMBER_TYPES } from '../../../utils/constant'
import { cloneDeep,isEmptyObject } from '../../../utils'

export default {
  name: 'PackageCreateEdit',
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
    return {
      visiable_height: '',
      member_package_objects: MEMBER_PACKAGE_OBJECTS,
      device_type_items: MEMBER_DEVICE_LIST_RANGE,
      save_btn_label: '保存',
      is_busy: false,
      form: {
        sn:'',
        parentName:'',
        phone:'',
        payType:'1',
        orderNo:'',
        userId:''
      },
      renew_type_list: [
        { label: '非自动续费订阅', value: 1 },
        { label: '自动续费订阅', value: 2 }
      ],
      rules: {
        sn: [
          { required: true, message: 'sn/序列号为必选项', trigger: 'blur' },
        ],
        parentName: [
          { required: true, message: '家长姓名为必选项', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '家长手机号为必选项', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^1[0-9]{10}$/.test(value)) {
                // 账号不正确
                return callback(new Error('请输入正确的联系方式'))
              }
              callback()
                
             if (value&&value.length==11) {
                this.checkSnVip(value)
             }
            }, trigger: 'blur'
          },
        ],
         payType: [
          { required: true, message: '付费类型为必选项', trigger: 'blur' }
        ],
      },
    }
  },
  watch: {
    action: {
      handler: function(val) {
        if (val === 1 || val === 0) {
          this.clear_data()
        } else {
          this.init_props_data()
        }

        let title
        let save_btn_label
        if (val === 1) {
          title = '创建SN'
          save_btn_label = '创建'
        } else if (val === 2) {
          title = '编辑SN'
          save_btn_label = '保存'
        } else {
          title = ''
          save_btn_label = '保存'
        }
        this.title = title
        this.save_btn_label = save_btn_label
      },
      immediate: true
    },
  },
  mounted: function() {
    this.visiable_height = document.documentElement.clientHeight + 'px'
  },
  methods: {
    getSn(e){
       this.$nextTick((item=>{
          this.form.sn = e.replace(/[\u4E00-\u9FA5]/g,"");
       }))
    },
    change_device_type(e) {
      this.public_form.device_type = e
    },
    change_un_pub_device_type(e) {
      this.un_public_form.device_type = e
    },
    clear_data() {
      this.form = {
        sn:'',
        parentName:'',
        phone:'',
        payType:'1',
        orderNo:'',
        userId:''
      }
    },
    init_props_data() {
      const current = this.current
      this.form=cloneDeep(current)
      let date_range = null
      if (current.discount_start_time && current.discount_end_time) {
        date_range = [new Date(current.discount_start_time), new Date(current.discount_end_time)]
      }
    },
    dialog_card_action() {
      // this.$emit('callback')
    },
    close_dialog() {
      this.$emit('callback')
    },
    check_form() {
      return new Promise(resolve => {
        this.$refs.form.validate(valid => {
          return resolve(valid)
        })
      })
    },
    on_save() {
        this.check_form().then(validate => {
        if (validate) {
          if (this.action === 1) {
            this.create_package()
          } else if (this.action === 2) {
            this.save_package()
          }
        }
      })
    },
    get_options() {
      const options=cloneDeep(this.form)
      return options
    },
    create_package() {
      /* eslint-disable */
      // 创建
      this.is_busy = true
      const options = this.get_options()
      if (isNaN(options.discount_start_time)) {
        options.discount_start_time = 0
      }
      if (isNaN(options.discount_end_time)) {
        options.discount_end_time = 0
      }
      // return console.log(options)
      addSnorderApi(options).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.$emit('callback', true)
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.is_busy = false
      })
    },
    save_package() {
      // 保存
      this.is_busy = true
      const options = this.get_options()
      options['plan_id'] = this.form.plan_id
      if (this.form.plan_type === '02') {
        delete options.device_type
      }
      editSnorderApi(options).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.$emit('callback', true)
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.is_busy = false
      })
    },

    checkSnVip(phone){
      checkSnVipApi({phone}).then(res => {
        if (res.status === 0) {
          if (res.data) {
            this.form.parentName=res.data.parentName
            this.form.orderNo=res.data.orderNo
            this.form.userId=res.data.userId
            this.form.payType="0"
          }
          // else{
          //   this.form.orderNo=''
          //   this.form.parentName=''
          //   this.form.userId=''
          // }
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
      })
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
        height: $title_height;
        line-height: $title_height;
        padding: 0 10px;
        position: relative;
        font-size: 18px;
        color: #303133;
        font-family: PingFangSC-Regular, 微软雅黑, serif;
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

