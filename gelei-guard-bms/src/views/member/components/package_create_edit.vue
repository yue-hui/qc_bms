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
            <el-form-item label="套餐名称" prop="plan_name">
              <el-input v-model="form.plan_name" :disabled="action === 2" size="mini" />
            </el-form-item>
            <el-form-item label="套餐类型" prop="plan_type">
              <el-radio-group v-model="form.plan_type" :disabled="action === 2" size="mini">
                <el-radio label="01">公开套餐</el-radio>
                <el-radio label="02">不公开套餐</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>

          <div class="diviser" />

          <!--公开套餐 begin-->
          <el-form
            v-show="form.plan_type === '01'"
            ref="public_form"
            :model="public_form"
            :rules="public_rules"
            label-width="120px"
            label-suffix=":">
            <el-form-item label="套餐时长" prop="valid_days">
              <el-input v-model.number="public_form.valid_days" size="mini">
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
            <el-form-item label="套餐原价" prop="original_price">
              <el-input v-model.number="public_form.original_price" size="mini">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="套餐活动价" prop="discount_price">
              <el-input v-model.number="public_form.discount_price" min="0" size="mini" type="number">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="限购次数" prop="purchase_quota">
              <el-input v-model.number="public_form.purchase_quota" type="number" size="mini">
                <template slot="append">次 (0代表不限购)</template>
              </el-input>
            </el-form-item>
            <el-form-item label="套餐活动标签" prop="plan_label">
              <el-input v-model="public_form.plan_label" maxlength="6" size="mini" aria-placeholder="限时优惠" />
            </el-form-item>
            <el-form-item label="套餐价格标签" prop="remark">
              <el-input v-model="public_form.remark" maxlength="10" size="mini" aria-placeholder="" />
            </el-form-item>
            <el-form-item label="套餐排序" prop="row_order">
              <el-input v-model.number="public_form.row_order" type="number" size="mini" />
            </el-form-item>
            <el-form-item label="活动时间" prop="date_range">
              <el-col :span="11">
                <el-date-picker
                  v-model="public_form.date_range"
                  size="mini"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" />
              </el-col>
            </el-form-item>
          </el-form>
          <!--公开套餐 end-->

          <!--不公开套餐 begin-->
          <el-form
            v-show="form.plan_type === '02'"
            ref="un_public_form"
            :model="un_public_form"
            :rules="un_public_rules"
            label-width="120px"
            label-suffix=":">
            <el-form-item label="套餐时长" prop="valid_days">
              <el-input v-model.number="un_public_form.valid_days" size="mini" type="number">
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
            <el-form-item label="套餐原价" prop="original_price">
              <el-input v-model.number="un_public_form.original_price" :disabled="form.plan_type === '02'" size="mini">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="套餐活动价" prop="discount_price">
              <el-input v-model.number="un_public_form.discount_price" :disabled="form.plan_type === '02'" size="mini">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-form>
          <!--不公开套餐 end-->

          <el-form label-width="120px" label-suffix=":">
            <el-form-item>
              <div class="action-area">
                <el-button size="mini" type="primary" @click="on_save">保存</el-button>
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
import { add_member_plan, update_member_plan } from '@/api/interactive'

export default {
  name: 'PackageCreateEdit',
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
    const validate_date_range = (rule, value, callback) => {
      if (this.public_form.discount_price) {
        if (!value[0] || !value[1]) {
          callback(new Error('填写套餐活动价同时必须填写活动时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    const validate_discount_price = (rule, value, callback) => {
      if (this.public_form.discount_price) {
        if (this.public_form.discount_price > this.public_form.original_price || !this.public_form.original_price) {
          callback(new Error('套餐的活动价不能大于套餐原价'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    return {
      visiable_height: '',
      form: {
        plan_id: '',
        plan_name: '',
        plan_type: '01'
      },
      public_form: {
        valid_days: '',
        original_price: '',
        discount_price: 0,
        purchase_quota: 0,
        plan_label: '',
        remark: '限时优惠',
        row_order: '',
        date_range: []
      },
      un_public_form: {
        valid_days: '',
        original_price: 0,
        discount_price: 0
      },
      rules: {
        plan_name: [
          { required: true, message: '请输入套餐名称, 15字以内', trigger: 'blur' },
          { min: 1, max: 15, message: '文字长度不能超过15个字', trigger: 'blur' }
        ],
        plan_type: [
          { required: true, message: '套餐类型为必选项', trigger: 'blur' }
        ]
      },
      public_rules: {
        valid_days: [
          { required: true, message: '套餐时长不能为空', trigger: 'blur' },
          { type: 'integer', min: 0, message: '套餐时长不能小于0天', trigger: 'blur' }
        ],
        original_price: [
          { required: true, message: '套餐原价不能为空', trigger: 'blur' },
          { type: 'number', min: 0.01, message: '套餐原价不能少于1分钱', trigger: 'blur' }
        ],
        discount_price: [
          { required: true, message: '套餐活动价不能为空', trigger: 'blur' },
          { type: 'number', min: 0, message: '套餐活动价不能低于0', trigger: 'blur' },
          { required: false, trigger: 'blur', validator: validate_discount_price }
        ],
        purchase_quota: [
          { required: true, message: '限购次数不能为空', trigger: 'blur' },
          { type: 'integer', min: 0, message: '限购次数必须大于等于0的整数', trigger: 'blur' }
        ],
        plan_label: [
          // { required: true, message: '请输入套餐活动标签', trigger: 'blur' },
          // { type: 'string', min: 1, max: 6, message: '套餐活动标签限6个字以内', trigger: 'blur' }
        ],
        remark: [
          // { required: true, message: '请输入套餐价格标签', trigger: 'blur' },
          // { min: 1, max: 15, message: '套餐活动标签限10个字以内', trigger: 'blur' }
        ],
        row_order: [
          { required: true, message: '请输入套餐排序', trigger: 'blur' },
          { type: 'integer', min: 0, max: 100, message: '套餐排序值为0到100以内的整数', trigger: 'blur' }
        ],
        date_range: [
          { required: false, trigger: 'blur', validator: validate_date_range }
        ]
      },
      un_public_rules: {
        valid_days: [
          { required: true, message: '套餐时长不能为空', trigger: 'blur' },
          { type: 'integer', min: 0, message: '套餐时长不能小于0天', trigger: 'blur' }
        ],
        original_price: [
          { required: true, message: '套餐原价不能为空', trigger: 'blur' }
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
          title = '创建会员套餐'
        } else if (val === 2) {
          title = '编辑会员套餐'
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
    clear_data() {
      this.form = {
        plan_id: '',
        plan_name: '',
        plan_type: '01'
      }
      this.public_form = {
        valid_days: '',
        original_price: '',
        discount_price: 0,
        purchase_quota: 0,
        plan_label: '',
        remark: '限时优惠',
        row_order: '',
        date_range: []
      }
      this.un_public_form = {
        valid_days: '',
        original_price: '0',
        discount_price: '0'
      }
    },
    init_props_data() {
      const current = this.current
      this.form = {
        plan_id: current.plan_id,
        plan_name: current.plan_name,
        plan_type: current.plan_type
      }
      const date_range = [new Date(current.discount_start_time), new Date(current.discount_end_time)]
      this.public_form = {
        valid_days: current.valid_days,
        original_price: current.original_price,
        discount_price: current.discount_price,
        purchase_quota: current.purchase_quota,
        plan_label: current.plan_label,
        remark: current.remark,
        row_order: current.row_order,
        date_range: date_range
      }
      this.un_public_form = {
        valid_days: current.valid_days,
        discount_price: current.discount_price,
        original_price: current.original_price
      }
    },
    dialog_card_action() {
      this.$emit('callback')
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
    check_public_form() {
      return new Promise(resolve => {
        this.$refs.public_form.validate(valid => {
          return resolve(valid)
        })
      })
    },
    check_un_public_form() {
      return new Promise(resolve => {
        this.$refs.un_public_form.validate(valid => {
          return resolve(valid)
        })
      })
    },
    check_discount_price() {
      // 校验
      if (this.public_form.discount_price !== '') {
        const discount_price = parseFloat(this.public_form.discount_price)
        if (discount_price <= 0) {
          this.$message.warning('套餐活动价值必须大于0')
          return false
        }
        if (this.public_form.original_price) {
          const original_price = parseFloat(this.public_form.original_price)
          if (original_price < discount_price) {
            this.$message.warning('套餐活动价必须小于套餐原价')
            return false
          }
        }
      }
      return true
    },
    async check_all_submit_field() {
      /* 校验字段值 */
      const plan_type = this.form.plan_type
      if (plan_type === '02') {
        const validate_form = await this.check_form()
        const validate_check_un_public_form = await this.check_un_public_form()
        return validate_form && validate_check_un_public_form
      } else {
        const validate_form = await this.check_form()
        const validate_public_form = await this.check_public_form()
        const validate_discount_price = this.check_discount_price()
        return validate_form && validate_public_form && validate_discount_price
      }
    },
    on_save() {
      this.check_all_submit_field().then(validate => {
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
      const plan_type = this.form.plan_type
      const options = {
        plan_name: this.form.plan_name,
        plan_type
      }
      if (plan_type === '01') {
        const date_range = this.public_form.date_range
        const discount_start_time = new Date(date_range[0]).getTime()
        const discount_end_time = new Date(date_range[1]).getTime()

        options['valid_days'] = this.public_form.valid_days
        options['original_price'] = this.public_form.original_price
        options['discount_price'] = this.public_form.discount_price
        options['purchase_quota'] = this.public_form.purchase_quota
        options['plan_label'] = this.public_form.plan_label
        options['remark'] = this.public_form.remark
        options['row_order'] = this.public_form.row_order
        options['discount_end_time'] = discount_end_time
        options['discount_start_time'] = discount_start_time
      } else if (plan_type === '02') {
        options['valid_days'] = this.un_public_form.valid_days
        options['original_price'] = this.un_public_form.original_price
        options['discount_price'] = this.un_public_form.discount_price
      }
      return options
    },
    create_package() {
      // 创建
      const options = this.get_options()
      add_member_plan(options).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.$emit('callback', true)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    save_package() {
      // 保存
      const options = this.get_options()
      options['plan_id'] = this.form.plan_id
      update_member_plan(options).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.$emit('callback', true)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$title_height: 40px;
$z_index: 1000;
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
      min-height: 400px;
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
        font-size: 18px;
        color: #303133;
        font-family : 微软雅黑, 宋体;
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
