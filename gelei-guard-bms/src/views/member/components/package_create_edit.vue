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
            <el-form-item label="套餐名称" prop="plan_name">
              <el-input v-model="form.plan_name" class="input-disable-with-selected" size="mini" />
            </el-form-item>
            <el-form-item label="套餐类型" prop="plan_type">
              <el-radio-group v-model="form.plan_type" :disabled="action === 2" size="mini">
                <el-radio label="01">公开套餐</el-radio>
                <el-radio label="02">不公开套餐</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="会员类型" prop="member_type">
              <el-radio-group v-model="form.member_type" size="mini">
                <el-radio v-for="(member, index) in patriarch_member_types" :key="index" :label="member.value">
                  {{ member.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>

          <div class="diviser" />

          <!--公开套餐 - 非自动续费 begin-->
          <el-form
            v-if="form.plan_type === '01' && public_form.renew_type === 1"
            ref="public_form"
            :model="public_form"
            :rules="public_rules"
            label-width="120px"
            label-suffix=":">
            <el-form-item label="套餐对象" prop="is_member">
              <el-radio-group v-model="public_form.is_member" size="mini">
                <el-radio v-for="(item, index) in member_package_objects" :key="index" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="会员订阅方式" prop="renew_type">
              <el-radio-group v-model="public_form.renew_type" size="mini">
                <el-radio v-for="(item, index) in renew_type_list" :disabled="action === 2" :key="index" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
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
            <el-form-item label="设备类型" prop="device_type">
              <el-select
                v-model="public_form.device_type"
                :disabled="action === 2"
                style="width: 100%;"
                size="mini"
                placeholder="请选择设备类型"
                @change="change_device_type">
                <el-option
                  v-for="item in device_type_items"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="限购次数" prop="purchase_quota">
              <el-input v-model.number="public_form.purchase_quota" type="number" size="mini">
                <template slot="append">次 (0代表不限购)</template>
              </el-input>
            </el-form-item>
            <el-form-item label="套餐活动标签" prop="plan_label">
              <el-input v-model="public_form.plan_label" maxlength="10" size="mini" />
            </el-form-item>
            <el-form-item label="套餐价格标签" prop="remark">
              <el-input v-model="public_form.remark" maxlength="20" size="mini" aria-placeholder="" />
            </el-form-item>
            <el-form-item label="套餐排序" prop="row_order">
              <el-input v-model.number="public_form.row_order" type="number" size="mini" />
            </el-form-item>
            <el-form-item label="活动时间" prop="date_range">
              <el-col :span="11">
                <el-date-picker
                  v-model="public_form.date_range"
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
          <!--公开套餐 - 非自动续费 end-->

          <!--公开套餐 - 自动续费 begin-->
          <el-form
            v-if="form.plan_type === '01' && public_form.renew_type === 2"
            ref="public_form"
            :model="public_form"
            :rules="public_rules"
            label-width="120px"
            label-suffix=":">
            <el-form-item label="套餐对象" prop="is_member">
              <el-radio-group v-model="public_form.is_member" size="mini">
                <el-radio v-for="(item, index) in member_package_objects" :key="index" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="会员订阅方式" prop="renew_type">
              <el-radio-group v-model="public_form.renew_type" size="mini">
                <el-radio v-for="(item, index) in renew_type_list" :disabled="action === 2" :key="index" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="套餐时长" prop="valid_days">
              <el-input v-model.number="public_form.valid_days" size="mini">
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
            <el-form-item label="套餐首开价" prop="first_discount_price">
              <el-input v-model.number="public_form.first_discount_price" size="mini">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="套餐原价" prop="original_price">
              <el-input v-model.number="public_form.original_price" size="mini">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="套餐续费价" prop="discount_price">
              <el-input v-model.number="public_form.discount_price" size="mini">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="首开活动标签">
              <el-input v-model="public_form.first_plan_label" maxlength="10" size="mini" type="text" />
            </el-form-item>
            <el-form-item label="首开价格标签">
              <el-input v-model="public_form.first_price_label" maxlength="10" size="mini" type="text" />
            </el-form-item>
            <el-form-item label="续费活动标签">
              <el-input v-model="public_form.plan_label" maxlength="10" size="mini" />
            </el-form-item>
            <el-form-item label="续费价格标签">
              <el-input v-model="public_form.remark" maxlength="15" size="mini" />
            </el-form-item>
            <el-form-item label="设备类型" prop="device_type">
              <el-select
                v-model="public_form.device_type"
                :disabled="action === 2"
                style="width: 100%;"
                size="mini"
                placeholder="请选择设备类型"
                @change="change_device_type">
                <el-option
                  v-for="item in device_type_items"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="套餐排序" prop="row_order">
              <el-input v-model.number="public_form.row_order" type="number" size="mini" />
            </el-form-item>
            <el-form-item label="活动时间" prop="date_range">
              <el-col :span="11">
                <el-date-picker
                  v-model="public_form.date_range"
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
          <!--公开套餐 - 自动续费 end-->
          <!--不公开套餐 begin-->
          <el-form
            v-show="form.plan_type === '02'"
            ref="un_public_form"
            :model="un_public_form"
            :rules="un_public_rules"
            label-width="120px"
            label-suffix=":">
            <el-form-item label="设备类型" prop="device_type">
              <el-select
                :disabled="action === 2"
                v-model="un_public_form.device_type"
                style="width: 100%;"
                size="mini"
                placeholder="请选择设备类型"
                @change="change_un_pub_device_type">
                <el-option
                  v-for="item in device_type_items"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
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
import { add_member_plan, update_member_plan } from '@/api/interactive'
import { MEMBER_DEVICE_LIST_RANGE } from '@/views/toolbox/data/promotion'
import { MEMBER_PACKAGE_OBJECTS, PATRIARCH_MEMBER_TYPES } from '../../../utils/constant'

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
    const validate_date_range = (rule, value, callback) => {
      if (this.public_form.discount_price) {
        if (!value || !value[0] || !value[1]) {
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
        if (this.public_form.discount_price >= this.public_form.original_price || !this.public_form.original_price) {
          callback(new Error('套餐的活动价不能大于套餐原价'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const patriarch_member_types = PATRIARCH_MEMBER_TYPES.filter(r => ['02', '03'].indexOf(r.value) !== -1)
    return {
      visiable_height: '',
      member_package_objects: MEMBER_PACKAGE_OBJECTS,
      device_type_items: MEMBER_DEVICE_LIST_RANGE,
      save_btn_label: '保存',
      is_busy: false,
      form: {
        plan_id: '',
        plan_name: '',
        plan_type: '01',
        member_type: '02'
      },
      patriarch_member_types,
      public_form: {
        is_member: '1',
        valid_days: '',
        original_price: '',
        discount_price: 0,
        device_type: '00',
        purchase_quota: 0,
        plan_label: '',
        remark: '限时优惠',
        row_order: '',
        date_range: [],
        renew_type: 1, // 会员订阅方式：1 按月购买 | 2 自动续费
        first_plan_label: '',
        first_price_label: '',
        first_discount_price: ''
      },
      renew_type_list: [
        { label: '非自动续费订阅', value: 1 },
        { label: '自动续费订阅', value: 2 }
      ],
      un_public_form: {
        un_public_form: '',
        valid_days: '',
        original_price: 0,
        discount_price: 0
      },
      rules: {
        plan_name: [
          { required: true, message: '请输入套餐名称, 20字以内', trigger: 'blur' },
          { min: 1, max: 20, message: '文字长度不能超过20个字', trigger: 'blur' }
        ],
        plan_type: [
          { required: true, message: '套餐类型为必选项', trigger: 'blur' }
        ],
        member_type: [
          { required: true, message: '会员类型为必选项', trigger: 'blur' }
        ]
      },
      public_rules: {
        is_member: [
          { required: true, message: '套餐对象为必选项', trigger: 'blur' }
        ],
        renew_type: [
          { required: true, message: '会员订阅方式为必选项', trigger: 'blur' }
        ],
        valid_days: [
          { required: true, message: '套餐时长不能为空', trigger: 'blur' },
          { type: 'integer', min: 1, message: '套餐时长必须大于0天', trigger: 'blur' }
        ],
        original_price: [
          { required: true, message: '套餐原价不能为空', trigger: 'blur' },
          { type: 'number', min: 0.01, message: '套餐原价不能少于1分钱', trigger: 'blur' }
        ],
        discount_price: [
          { required: true, message: '套餐活动价不能为空', trigger: 'blur' },
          { type: 'number', min: 0, message: '套餐活动价须为整数', trigger: 'blur' },
          { required: false, trigger: 'blur', validator: validate_discount_price }
        ],
        device_type: [
          { required: true, message: '套餐的设备类型不能为空', trigger: 'blur' }
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
        ],
        first_discount_price: [
          { required: true, message: '套餐首开价不能为空', trigger: 'blur' }
        ]
      },
      un_public_rules: {
        device_type: [
          { required: true, message: '套餐的设备类型不能为空', trigger: 'blur' }
        ],
        valid_days: [
          { required: true, message: '套餐时长不能为空', trigger: 'blur' },
          { type: 'integer', min: 1, message: '套餐时长必须大于0天', trigger: 'blur' }
        ],
        original_price: [
          { required: true, message: '套餐原价不能为空', trigger: 'blur' }
        ]
      }
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
          title = '创建会员套餐'
          save_btn_label = '创建'
        } else if (val === 2) {
          title = '编辑会员套餐'
          save_btn_label = '保存'
        } else {
          title = ''
          save_btn_label = '保存'
        }
        this.title = title
        this.save_btn_label = save_btn_label
      },
      immediate: true
    }
  },
  mounted: function() {
    this.visiable_height = document.documentElement.clientHeight + 'px'
  },
  methods: {
    change_device_type(e) {
      this.public_form.device_type = e
    },
    change_un_pub_device_type(e) {
      this.un_public_form.device_type = e
    },
    clear_data() {
      this.form = {
        plan_id: '',
        plan_name: '',
        plan_type: '01',
        member_type: '02'
      }
      this.public_form = {
        is_member: '1',
        valid_days: '',
        original_price: '',
        discount_price: 0,
        device_type: '00',
        purchase_quota: 0,
        plan_label: '',
        remark: '限时优惠',
        row_order: '',
        date_range: [],
        renew_type: 1,
        first_plan_label: '',
        first_price_label: '',
        first_discount_price: ''
      }
      this.un_public_form = {
        device_type: '',
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
        plan_type: current.plan_type,
        member_type: current.member_type
      }
      const date_range = [new Date(current.discount_start_time), new Date(current.discount_end_time)]
      this.public_form = {
        is_member: current.is_member,
        valid_days: current.valid_days,
        original_price: current.original_price,
        discount_price: current.discount_price,
        device_type: current.device_type,
        purchase_quota: current.purchase_quota,
        plan_label: current.plan_label,
        remark: current.remark,
        row_order: current.row_order,
        date_range: date_range,
        renew_type: current.renew_type || 1,
        first_plan_label: current.first_plan_label,
        first_price_label: current.first_price_label,
        first_discount_price: current.first_discount_price
      }
      this.un_public_form = {
        device_type: current.device_type,
        valid_days: current.valid_days,
        discount_price: current.discount_price,
        original_price: current.original_price
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
        plan_type,
        member_type: this.form.member_type
      }
      if (plan_type === '01' && this.public_form.renew_type === 1) {
        options['is_member'] = this.public_form.is_member
        options['valid_days'] = this.public_form.valid_days
        options['original_price'] = this.public_form.original_price
        options['discount_price'] = this.public_form.discount_price
        options['device_type'] = this.public_form.device_type
        options['purchase_quota'] = this.public_form.purchase_quota
        options['plan_label'] = this.public_form.plan_label
        options['remark'] = this.public_form.remark
        options['row_order'] = this.public_form.row_order
        options['renew_type'] = this.public_form.renew_type
        const date_range = this.public_form.date_range
        if (date_range) {
          options['discount_start_time'] = new Date(date_range[0]).getTime()
          options['discount_end_time'] = new Date(date_range[1]).getTime()
        }
      } else if (plan_type === '01' && this.public_form.renew_type === 2) {
        options['is_member'] = this.public_form.is_member
        options['valid_days'] = this.public_form.valid_days
        options['original_price'] = this.public_form.original_price
        options['discount_price'] = this.public_form.discount_price
        options['device_type'] = this.public_form.device_type
        options['purchase_quota'] = this.public_form.purchase_quota
        options['plan_label'] = this.public_form.plan_label
        options['remark'] = this.public_form.remark
        options['row_order'] = this.public_form.row_order
        options['renew_type'] = this.public_form.renew_type
        options['first_plan_label'] = this.public_form.first_plan_label
        options['first_price_label'] = this.public_form.first_price_label
        options['first_discount_price'] = this.public_form.first_discount_price
        const date_range = this.public_form.date_range
        if (date_range) {
          options['discount_start_time'] = new Date(date_range[0]).getTime()
          options['discount_end_time'] = new Date(date_range[1]).getTime()
        }
      } else if (plan_type === '02') {
        options['device_type'] = this.un_public_form.device_type
        options['valid_days'] = this.un_public_form.valid_days
        options['original_price'] = this.un_public_form.original_price
        options['discount_price'] = this.un_public_form.discount_price
      }
      return options
    },
    create_package() {
      /* eslint-disable */
      // 创建
      this.is_busy = true
      const options = this.get_options()
      // return console.log(options)
      add_member_plan(options).then(res => {
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
        // 非公开套餐，不传device_type
        // 防止后台报"非公开套餐无法修改支持的设备类型"
        delete options.device_type
      }
      update_member_plan(options).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.$emit('callback', true)
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.is_busy = false
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

