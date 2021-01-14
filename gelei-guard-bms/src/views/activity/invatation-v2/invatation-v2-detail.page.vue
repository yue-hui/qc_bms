<template>
  <div class="invatationV2-action invatationV2-action-detail">
    <div class="topic-save-title">
      <span>邀请好友</span>
    </div>
    <div class="topic-save-page">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-suffix=":">
        <!------------------------------>
        <el-form-item label="活动标题" prop="title">
          <el-input v-model="form.title" disabled placeholder="请输入活动标题，仅后台显示" size="mini" />
        </el-form-item>
        <el-form-item :required="true" label="活动时间" prop="time">
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            disabled
            size="mini"
            format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"/>
        </el-form-item>
        <div class="invatationV2-rules" style="">
          <div class="rules-label">
            <span><span style="color: #f56c6c;margin-right: 4px;">*</span>注册机制配置：</span>
          </div>
          <div>
            <div class="invatationV2-rules-item">
              <el-form-item class="left-error-tips" prop="inputItem1">
                <span>邀请</span>
                <el-input v-model="form.inputItem1" disabled type="number" style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="inputItem2">
                <span>&nbsp;&nbsp;人可得&nbsp;&nbsp;</span>
                <el-input v-model="form.inputItem2" disabled style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="">
                <span>&nbsp;&nbsp;天&nbsp;&nbsp;</span>
              </el-form-item>
              <el-form-item prop="selectItem1">
                <el-select
                  v-model="form.selectItem1"
                  size="mini"
                  filterable
                  clearable
                  disabled
                  class="plan-list-select"
                  placeholder="请选择会员套餐"
                  @change="memberPlanListChange('inputItem2', 'selectItem1')"
                  @clear="clearMemberPlanList('inputItem2')">
                  <el-option
                    v-for="(membership, index) in membershipPackageList"
                    :key="index"
                    :label="membership.label"
                    :value="membership.value"
                    size="mini" />
                </el-select>
              </el-form-item>
            </div>
            <div class="invatationV2-rules-item">
              <el-form-item class="left-error-tips" prop="inputItem3">
                <span>邀请</span>
                <el-input v-model="form.inputItem3" disabled type="number" style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item class="left-error-tips" prop="inputItem4">
                <span>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                <el-input v-model="form.inputItem4" disabled type="number" style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="inputItem5">
                <span>&nbsp;&nbsp;人可得&nbsp;&nbsp;</span>
                <el-input v-model="form.inputItem5" disabled style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="">
                <span>&nbsp;&nbsp;天&nbsp;&nbsp;</span>
              </el-form-item>
              <el-form-item prop="selectItem2">
                <el-select
                  v-model="form.selectItem2"
                  size="mini"
                  filterable
                  disabled
                  clearable
                  class="plan-list-select"
                  placeholder="请选择会员套餐"
                  @change="memberPlanListChange('inputItem5', 'selectItem2')"
                  @clear="clearMemberPlanList('inputItem5')">
                  <el-option
                    v-for="(membership, index) in membershipPackageList"
                    :key="index"
                    :label="membership.label"
                    :value="membership.value"
                    size="mini" />
                </el-select>
              </el-form-item>
            </div>
            <div class="invatationV2-rules-item">
              <el-form-item class="left-error-tips" prop="inputItem6">
                <span>邀请</span>
                <el-input v-model="form.inputItem6" disabled type="number" style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item class="left-error-tips" prop="inputItem7">
                <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                <el-input v-model="form.inputItem7" disabled type="number" style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="inputItem8">
                <span>&nbsp;&nbsp;人可得&nbsp;&nbsp;</span>
                <el-input v-model="form.inputItem8" disabled style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="">
                <span>&nbsp;&nbsp;天&nbsp;&nbsp;</span>
              </el-form-item>
              <el-form-item prop="selectItem3">
                <el-select
                  v-model="form.selectItem3"
                  size="mini"
                  filterable
                  clearable
                  disabled
                  class="plan-list-select"
                  placeholder="请选择会员套餐"
                  @change="memberPlanListChange('inputItem8', 'selectItem3')"
                  @clear="clearMemberPlanList('inputItem8')">
                  <el-option
                    v-for="(membership, index) in membershipPackageList"
                    :key="index"
                    :label="membership.label"
                    :value="membership.value"
                    size="mini" />
                </el-select>
              </el-form-item>
            </div>
            <div class="invatationV2-rules-item">
              <el-form-item class="left-error-tips" prop="inputItem9">
                <span>邀请</span>
                <el-input v-model="form.inputItem9" disabled type="number" style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item class="left-error-tips" prop="inputItem10">
                <span>&nbsp;&nbsp;人及以上可得&nbsp;&nbsp;</span>
                <el-input v-model="form.inputItem10" disabled style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="">
                <span>&nbsp;&nbsp;天&nbsp;&nbsp;</span>
              </el-form-item>
              <el-form-item prop="selectItem4">
                <el-select
                  v-model="form.selectItem4"
                  size="mini"
                  filterable
                  disabled
                  clearable
                  class="plan-list-select"
                  placeholder="请选择会员套餐"
                  @change="memberPlanListChange('inputItem10', 'selectItem4')"
                  @clear="clearMemberPlanList('inputItem10')">
                  <el-option
                    v-for="(membership, index) in membershipPackageList"
                    :key="index"
                    :label="membership.label"
                    :value="membership.value"
                    size="mini" />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="invatationV2-rules" style="">
          <div class="rules-label">
            <span><span style="color: #f56c6c;margin-right: 4px;">*</span>绑定机制配置：</span>
          </div>
          <div>
            <div class="invatationV2-rules-item">
              <el-form-item class="left-error-tips" prop="inputItem11">
                <span>邀请</span>
                <el-input v-model="form.inputItem11" disabled type="number" style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="inputItem12">
                <span>&nbsp;&nbsp;人可得&nbsp;&nbsp;</span>
                <el-input v-model="form.inputItem12" disabled style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="">
                <span>&nbsp;&nbsp;天&nbsp;&nbsp;</span>
              </el-form-item>
              <el-form-item prop="selectItem11">
                <el-select
                  v-model="form.selectItem11"
                  size="mini"
                  filterable
                  clearable
                  disabled
                  class="plan-list-select"
                  placeholder="请选择会员套餐"
                  @change="memberPlanListChange('inputItem12', 'selectItem11')"
                  @clear="clearMemberPlanList('inputItem12')">
                  <el-option
                    v-for="(membership, index) in membershipPackageList"
                    :key="index"
                    :label="membership.label"
                    :value="membership.value"
                    size="mini" />
                </el-select>
              </el-form-item>
            </div>
            <div class="invatationV2-rules-item">
              <el-form-item class="left-error-tips" prop="inputItem13">
                <span>邀请</span>
                <el-input v-model="form.inputItem13" disabled type="number" style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item class="left-error-tips" prop="inputItem14">
                <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                <el-input v-model="form.inputItem14" disabled type="number" style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="inputItem15">
                <span>&nbsp;&nbsp;人可得&nbsp;&nbsp;</span>
                <el-input v-model="form.inputItem15" disabled style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="">
                <span>&nbsp;&nbsp;天&nbsp;&nbsp;</span>
              </el-form-item>
              <el-form-item prop="selectItem12">
                <el-select
                  v-model="form.selectItem12"
                  size="mini"
                  disabled
                  filterable
                  clearable
                  class="plan-list-select"
                  placeholder="请选择会员套餐"
                  @change="memberPlanListChange('inputItem15', 'selectItem12')"
                  @clear="clearMemberPlanList('inputItem15')">
                  <el-option
                    v-for="(membership, index) in membershipPackageList"
                    :key="index"
                    :label="membership.label"
                    :value="membership.value"
                    size="mini" />
                </el-select>
              </el-form-item>
            </div>
            <div class="invatationV2-rules-item">
              <el-form-item class="left-error-tips" prop="inputItem16">
                <span>邀请</span>
                <el-input v-model="form.inputItem16" disabled type="number" style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item class="left-error-tips" prop="inputItem17">
                <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                <el-input v-model="form.inputItem17" disabled type="number" style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="inputItem18">
                <span>&nbsp;&nbsp;人可得&nbsp;&nbsp;</span>
                <el-input v-model="form.inputItem18" disabled style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="">
                <span>&nbsp;&nbsp;天&nbsp;&nbsp;</span>
              </el-form-item>
              <el-form-item prop="selectItem13">
                <el-select
                  v-model="form.selectItem13"
                  size="mini"
                  filterable
                  clearable
                  disabled
                  class="plan-list-select"
                  placeholder="请选择会员套餐"
                  @change="memberPlanListChange('inputItem18', 'selectItem13')"
                  @clear="clearMemberPlanList('inputItem18')">
                  <el-option
                    v-for="(membership, index) in membershipPackageList"
                    :key="index"
                    :label="membership.label"
                    :value="membership.value"
                    size="mini" />
                </el-select>
              </el-form-item>
            </div>
            <div class="invatationV2-rules-item">
              <el-form-item class="left-error-tips" prop="inputItem19">
                <span>邀请</span>
                <el-input v-model="form.inputItem19" disabled type="number" style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item class="left-error-tips" prop="inputItem20">
                <span>&nbsp;&nbsp;人及以上可得&nbsp;&nbsp;</span>
                <el-input v-model="form.inputItem20" disabled style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="">
                <span>&nbsp;&nbsp;天&nbsp;&nbsp;</span>
              </el-form-item>
              <el-form-item prop="selectItem14">
                <el-select
                  v-model="form.selectItem14"
                  size="mini"
                  filterable
                  clearable
                  disabled
                  class="plan-list-select"
                  placeholder="请选择会员套餐"
                  @change="memberPlanListChange('inputItem20', 'selectItem14')"
                  @clear="clearMemberPlanList('inputItem20')">
                  <el-option
                    v-for="(membership, index) in membershipPackageList"
                    :key="index"
                    :label="membership.label"
                    :value="membership.value"
                    size="mini" />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="invatationV2-rules" style="">
          <div class="rules-label">
            <span><span style="color: #f56c6c;margin-right: 4px;">*</span>好友注册可得：</span>
          </div>
          <div>
            <div class="invatationV2-rules-item">
              <el-form-item prop="inputItem21">
                <el-input v-model="form.inputItem21" disabled style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="">
                <span>&nbsp;&nbsp;天&nbsp;&nbsp;</span>
              </el-form-item>
              <el-form-item prop="selectItem21">
                <el-select
                  v-model="form.selectItem21"
                  size="mini"
                  filterable
                  clearable
                  class="plan-list-select"
                  disabled
                  placeholder="请选择会员套餐"
                  @change="memberPlanListChange('inputItem21', 'selectItem21')"
                  @clear="clearMemberPlanList('inputItem21')">
                  <el-option
                    v-for="(membership, index) in membershipPackageList"
                    :key="index"
                    :label="membership.label"
                    :value="membership.value"
                    size="mini" />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="invatationV2-rules" style="">
          <div class="rules-label">
            <span><span style="color: #f56c6c;margin-right: 4px;">*</span>好友绑定可得：</span>
          </div>
          <div>
            <div class="invatationV2-rules-item">
              <el-form-item prop="inputItem22">
                <el-input v-model="form.inputItem22" disabled style="width: 80px" size="mini" />
              </el-form-item>
              <el-form-item prop="">
                <span>&nbsp;&nbsp;天&nbsp;&nbsp;</span>
              </el-form-item>
              <el-form-item prop="selectItem22">
                <el-select
                  v-model="form.selectItem22"
                  size="mini"
                  filterable
                  clearable
                  disabled
                  class="plan-list-select"
                  placeholder="请选择会员套餐"
                  @change="memberPlanListChange('inputItem22', 'selectItem22')"
                  @clear="clearMemberPlanList('inputItem22')">
                  <el-option
                    v-for="(membership, index) in membershipPackageList"
                    :key="index"
                    :label="membership.label"
                    :value="membership.value"
                    size="mini" />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <!------------------------------>
        <el-form-item label="分享主标题" prop="shareMainTitle">
          <el-input v-model="form.shareMainTitle" disabled placeholder="请输入分享主标题" size="mini" />
        </el-form-item>
        <el-form-item label="分享副标题" prop="shareSecondaryTitle">
          <el-input v-model="form.shareSecondaryTitle" disabled placeholder="请输入分享副标题" size="mini" />
        </el-form-item>
        <el-form-item class="input-rule-desc" label="规则说明" prop="ruleDesc">
          <div>
            <div v-for="(item, index) in form.ruleDesc" :key="index" style="word-break: break-all;line-height: 1.6;margin-top: 10px">
              <span>{{ index + 1 }}、{{ item }}</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div class="button-block"/>
    </div>
  </div>
</template>

<script>
import { get_all_member_plans, queryInvitationV2 } from '../../../api/interactive'
import { cloneDeep } from '../../../utils'

export default {
  components: {
  },
  props: {
  },
  data: function() {
    return {
      form: {
        title: '', // 活动标题
        time: null,
        shareMainTitle: '', // 分享主标题
        shareSecondaryTitle: '', // 分享副标题
        ruleDesc: '', // 规则描述
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        // --
        inputItem1: '', inputItem2: '',
        inputItem3: '', inputItem4: '', inputItem5: '',
        inputItem6: '', inputItem7: '', inputItem8: '',
        inputItem9: '', inputItem10: '',
        // --
        inputItem11: '', inputItem12: '',
        inputItem13: '', inputItem14: '', inputItem15: '',
        inputItem16: '', inputItem17: '', inputItem18: '',
        inputItem19: '', inputItem20: '',
        // --
        inputItem21: '',
        inputItem22: '',
        // --
        selectItem1: '',
        selectItem2: '',
        selectItem3: '',
        selectItem4: '',
        // --
        selectItem11: '',
        selectItem12: '',
        selectItem13: '',
        selectItem14: '',
        // --
        selectItem21: '',
        selectItem22: ''
      },
      rules: {
        title: [{ required: true, trigger: ['blur', 'change'], message: '请输入活动标题' }],
        time: [{ required: true, trigger: ['blur', 'change'], message: '请选择活动时间' }],
        shareMainTitle: [{ required: true, trigger: ['blur', 'change'], message: '请输入分享主标题' }],
        shareSecondaryTitle: [{ required: true, trigger: ['blur', 'change'], message: '请输入分享副标题' }],
        ruleDesc: [{ required: true, trigger: ['blur', 'change'], message: '请输入规则描述' }],
        selectItem1: [
          { required: true, trigger: ['blur', 'change'], message: '请选择此项' },
          {
            trigger: ['blur', 'change'], validator: (rule, value, callback) => {
              if (this.planCodesIsVipType([
                this.form.selectItem1, this.form.selectItem2,
                this.form.selectItem3, this.form.selectItem4,
                this.form.selectItem11, this.form.selectItem12,
                this.form.selectItem13, this.form.selectItem14
              ])) {
                return callback()
              }
              callback(new Error('会员类型不一致'))
            }
          }
        ],
        selectItem2: [
          { required: true, trigger: ['blur', 'change'], message: '请选择此项' },
          {
            trigger: ['blur', 'change'], validator: (rule, value, callback) => {
              if (this.planCodesIsVipType([
                this.form.selectItem1, this.form.selectItem2,
                this.form.selectItem3, this.form.selectItem4,
                this.form.selectItem11, this.form.selectItem12,
                this.form.selectItem13, this.form.selectItem14
              ])) {
                return callback()
              }
              callback(new Error('会员类型不一致'))
            }
          }
        ],
        selectItem3: [
          { required: true, trigger: ['blur', 'change'], message: '请选择此项' },
          {
            trigger: ['blur', 'change'], validator: (rule, value, callback) => {
              if (this.planCodesIsVipType([
                this.form.selectItem1, this.form.selectItem2,
                this.form.selectItem3, this.form.selectItem4,
                this.form.selectItem11, this.form.selectItem12,
                this.form.selectItem13, this.form.selectItem14
              ])) {
                return callback()
              }
              callback(new Error('会员类型不一致'))
            }
          }
        ],
        selectItem4: [
          { required: true, trigger: ['blur', 'change'], message: '请选择此项' },
          {
            trigger: ['blur', 'change'], validator: (rule, value, callback) => {
              if (this.planCodesIsVipType([
                this.form.selectItem1, this.form.selectItem2,
                this.form.selectItem3, this.form.selectItem4,
                this.form.selectItem11, this.form.selectItem12,
                this.form.selectItem13, this.form.selectItem14
              ])) {
                return callback()
              }
              callback(new Error('会员类型不一致'))
            }
          }
        ],
        selectItem11: [
          { required: true, trigger: ['blur', 'change'], message: '请选择此项' },
          {
            trigger: ['blur', 'change'], validator: (rule, value, callback) => {
              if (this.planCodesIsVipType([
                this.form.selectItem1, this.form.selectItem2,
                this.form.selectItem3, this.form.selectItem4,
                this.form.selectItem11, this.form.selectItem12,
                this.form.selectItem13, this.form.selectItem14
              ])) {
                return callback()
              }
              callback(new Error('会员类型不一致'))
            }
          }
        ],
        selectItem12: [
          { required: true, trigger: ['blur', 'change'], message: '请选择此项' },
          {
            trigger: ['blur', 'change'], validator: (rule, value, callback) => {
              if (this.planCodesIsVipType([
                this.form.selectItem1, this.form.selectItem2,
                this.form.selectItem3, this.form.selectItem4,
                this.form.selectItem11, this.form.selectItem12,
                this.form.selectItem13, this.form.selectItem14
              ])) {
                return callback()
              }
              callback(new Error('会员类型不一致'))
            }
          }
        ],
        selectItem13: [
          { required: true, trigger: ['blur', 'change'], message: '请选择此项' },
          {
            trigger: ['blur', 'change'], validator: (rule, value, callback) => {
              if (this.planCodesIsVipType([
                this.form.selectItem1, this.form.selectItem2,
                this.form.selectItem3, this.form.selectItem4,
                this.form.selectItem11, this.form.selectItem12,
                this.form.selectItem13, this.form.selectItem14
              ])) {
                return callback()
              }
              callback(new Error('会员类型不一致'))
            }
          }
        ],
        selectItem14: [
          { required: true, trigger: ['blur', 'change'], message: '请选择此项' },
          {
            trigger: ['blur', 'change'], validator: (rule, value, callback) => {
              if (this.planCodesIsVipType([
                this.form.selectItem1, this.form.selectItem2,
                this.form.selectItem3, this.form.selectItem4,
                this.form.selectItem11, this.form.selectItem12,
                this.form.selectItem13, this.form.selectItem14
              ])) {
                return callback()
              }
              callback(new Error('会员类型不一致'))
            }
          }
        ],
        selectItem21: [
          { required: true, trigger: ['blur', 'change'], message: '请选择此项' },
          {
            trigger: ['blur', 'change'], validator: (rule, value, callback) => {
              if (this.planCodesIsVipType([
                this.form.selectItem21, this.form.selectItem22
              ])) {
                return callback()
              }
              callback(new Error('会员类型不一致'))
            }
          }
        ],
        selectItem22: [
          { required: true, trigger: ['blur', 'change'], message: '请选择此项' },
          {
            trigger: ['blur', 'change'], validator: (rule, value, callback) => {
              if (this.planCodesIsVipType([
                this.form.selectItem21, this.form.selectItem22
              ])) {
                return callback()
              }
              callback(new Error('会员类型不一致'))
            }
          }
        ],
        inputItem1: [
          { required: true, trigger: ['blur', 'change'], message: '请填写此项' },
          {
            trigger: ['blur', 'change'], validator: (rule, value, callback) => {
              if (Number(value) < 1) {
                return callback(new Error('此项需大于0'))
              }
              callback()
            }
          }
        ],
        // inputItem3: [{ required: true, trigger: ['blur', 'change'], message: '请填写此项' }],
        inputItem4: [
          { required: true, trigger: ['blur', 'change'], message: '请填写此项' },
          {
            trigger: ['blur', 'change'], validator: (rule, value, callback) => {
              if (Number(value) < 1) {
                return callback(new Error('此项需大于0'))
              }
              if (Number(value) <= Number(this.form.inputItem3)) {
                return callback(new Error('填写错误'))
              }
              callback()
            }
          }
        ],
        // inputItem6: [{ required: true, trigger: ['blur', 'change'], message: '请填写此项' }],
        inputItem7: [
          { required: true, trigger: ['blur', 'change'], message: '请填写此项' },
          {
            trigger: ['blur', 'change'], validator: (rule, value, callback) => {
              if (Number(value) < 1) {
                return callback(new Error('此项需大于0'))
              }
              if (Number(value) <= Number(this.form.inputItem6)) {
                return callback(new Error('填写错误'))
              }
              callback()
            }
          }
        ]
        // inputItem9: [{ required: true, trigger: ['blur', 'change'], message: '请填写此项' }]
        // inputItem11: [{ required: true, trigger: ['blur', 'change'], message: '请填写此项' }],
        // inputItem13: [{ required: true, trigger: ['blur', 'change'], message: '请填写此项' }],
        // inputItem14: [{ required: true, trigger: ['blur', 'change'], message: '请填写此项' }],
        // inputItem16: [{ required: true, trigger: ['blur', 'change'], message: '请填写此项' }],
        // inputItem17: [{ required: true, trigger: ['blur', 'change'], message: '请填写此项' }],
        // inputItem19: [{ required: true, trigger: ['blur', 'change'], message: '请填写此项' }]
      },
      isUpdate: false,
      isDetail: false,
      updateId: 0,
      membershipPackageList: []
    }
  },
  watch: {
    'form.inputItem1'(val) {
      this.form.inputItem11 = val
      if (Number.isInteger(Number(val))) {
        this.form.inputItem3 = Number(val) + 1
      }
    },
    'form.inputItem3'(val) {
      this.form.inputItem13 = val
    },
    'form.inputItem4'(val) {
      this.form.inputItem14 = val
      if (Number.isInteger(Number(val))) {
        this.form.inputItem6 = Number(val) + 1
      }
    },
    'form.inputItem6'(val) {
      this.form.inputItem16 = val
    },
    'form.inputItem7'(val) {
      this.form.inputItem17 = val
      if (Number.isInteger(Number(val))) {
        this.form.inputItem9 = Number(val) + 1
      }
    },
    'form.inputItem9'(val) {
      this.form.inputItem19 = val
    }
  },
  mounted: function() {
    this.isUpdate = Number(this.$route.query.update) === 1
    this.isDetail = Number(this.$route.query.detail) === 1
    this.updateId = Number(this.$route.query.id)
    this.fetchMemberPlanList()
      .then(() => {
        if (this.isUpdate || this.isDetail) {
          this.getDetail()
        }
      })
      .catch(() => {})
  },
  methods: {
    /**
     * @description 提交更新
     * */
    update() {
    },
    /**
     * @description 上线时间发生改变
     * @param date {Date | Null}
     * */
    timeChange(date) {
      if (!date) {
        this.form.startTime = ''
        this.form.endTime = ''
        return
      }
      this.form.startTime = date[0].getTime()
      this.form.endTime = date[1].getTime()
    },
    fetchMemberPlanList(planName) {
      return new Promise((resolve, reject) => {
        const config = {
          plan_type: '02',
          is_listing: '1'
        }
        if (planName) {
          config['plan_name'] = planName
        }
        get_all_member_plans(config).then(res => {
          if (res.status === 0) {
            const remote_data = res.data
            this.membershipPackageList = remote_data.map(r => {
              return {
                value: r.plan_code,
                label: r.plan_name,
                validDays: r.valid_days,
                memberType: r.member_type
              }
            })
            resolve()
          } else {
            this.$message.error(res.message)
          }
        }).finally(() => {
        })
      })
    },
    clearMemberPlanList(inputItem) {
      setTimeout(() => {
        this.form[inputItem] = ''
      }, 100)
    },
    /**
     * @description 套餐发生改变
     * */
    memberPlanListChange(inputItem, selectItem) {
      setTimeout(() => {
        try {
          this.form[inputItem] = this.membershipPackageList.find(item => item.value === this.form[selectItem]).validDays
        } catch (e) {
          this.form[inputItem] = ''
        }
      }, 50)
    },
    getDetail() {
      queryInvitationV2({
        activityId: this.updateId
      })
        .then((res) => {
          if (res.status !== 0) throw res
          const data = res.data
          this.form.title = data.title
          this.form.shareMainTitle = data.shareMainTitle
          this.form.shareSecondaryTitle = data.shareSecondaryTitle
          this.form.time = [new Date(data.startTime), new Date(data.endTime)]
          this.form.ruleDesc = data.ruleDesc.split(/@##@/g)
          // 注册机制 - 套餐
          const selectItem1PlanCode = data.inviterRules.find(item => item.type === 'reg' && item.ruleType === 'equals').planCode
          this.form.selectItem1 = selectItem1PlanCode
          this.form.inputItem2 = this.getPlanValidDayForCode(selectItem1PlanCode)
          // -
          const selectItem2PlanCode = this.parseRulesTypeRangePlanCode(data.inviterRules, 'reg', 'min')
          this.form.selectItem2 = selectItem2PlanCode
          this.form.inputItem5 = this.getPlanValidDayForCode(selectItem2PlanCode)
          // -
          const selectItem3PlanCode = this.parseRulesTypeRangePlanCode(data.inviterRules, 'reg', 'max')
          this.form.selectItem3 = selectItem3PlanCode
          this.form.inputItem8 = this.getPlanValidDayForCode(selectItem3PlanCode)
          // -
          const selectItem10PlanCode = data.inviterRules.find(item => item.type === 'reg' && item.ruleType === 'over').planCode
          this.form.selectItem4 = selectItem10PlanCode
          this.form.inputItem10 = this.getPlanValidDayForCode(selectItem10PlanCode)

          // 绑定机制 - 套餐
          const selectItem11PlanCode = data.inviterRules.find(item => item.type === 'bind' && item.ruleType === 'equals').planCode
          this.form.selectItem11 = selectItem11PlanCode
          this.form.inputItem12 = this.getPlanValidDayForCode(selectItem11PlanCode)
          // -
          const selectItem12PlanCode = this.parseRulesTypeRangePlanCode(data.inviterRules, 'bind', 'min')
          this.form.selectItem12 = selectItem12PlanCode
          this.form.inputItem15 = this.getPlanValidDayForCode(selectItem12PlanCode)
          // -
          const selectItem13PlanCode = this.parseRulesTypeRangePlanCode(data.inviterRules, 'bind', 'max')
          this.form.selectItem13 = selectItem13PlanCode
          this.form.inputItem18 = this.getPlanValidDayForCode(selectItem13PlanCode)
          // -
          const selectItem14PlanCode = data.inviterRules.find(item => item.type === 'bind' && item.ruleType === 'over').planCode
          this.form.selectItem14 = selectItem14PlanCode
          this.form.inputItem20 = this.getPlanValidDayForCode(selectItem14PlanCode)
          // 好友注册可得 - 套餐
          const selectItem21PlanCode = data.inviteeRules.find(item => item.type === 'reg').planCode
          this.form.selectItem21 = selectItem21PlanCode
          this.form.inputItem21 = this.getPlanValidDayForCode(selectItem21PlanCode)
          // 好友绑定可得 - 套餐
          const selectItem22PlanCode = data.inviteeRules.find(item => item.type === 'bind').planCode
          this.form.selectItem22 = selectItem22PlanCode
          this.form.inputItem22 = this.getPlanValidDayForCode(selectItem22PlanCode)
          // 注册机制配置 - 人数
          this.form.inputItem1 = data.inviterRules.find(item => item.type === 'reg' && item.ruleType === 'equals').rule
          this.form.inputItem3 = this.parseRulesTypeRangeNumber(data.inviterRules, 'reg', 'min').split(',')[0]
          this.form.inputItem4 = this.parseRulesTypeRangeNumber(data.inviterRules, 'reg', 'min').split(',')[1]
          this.form.inputItem6 = this.parseRulesTypeRangeNumber(data.inviterRules, 'reg', 'max').split(',')[0]
          this.form.inputItem7 = this.parseRulesTypeRangeNumber(data.inviterRules, 'reg', 'max').split(',')[1]
          this.form.inputItem9 = data.inviterRules.find(item => item.type === 'reg' && item.ruleType === 'over').rule
          // 绑定机制配置 - 人数
          this.form.inputItem11 = data.inviterRules.find(item => item.type === 'bind' && item.ruleType === 'equals').rule
          this.form.inputItem13 = this.parseRulesTypeRangeNumber(data.inviterRules, 'bind', 'min').split(',')[0]
          this.form.inputItem14 = this.parseRulesTypeRangeNumber(data.inviterRules, 'bind', 'min').split(',')[1]
          this.form.inputItem16 = this.parseRulesTypeRangeNumber(data.inviterRules, 'bind', 'max').split(',')[0]
          this.form.inputItem17 = this.parseRulesTypeRangeNumber(data.inviterRules, 'bind', 'max').split(',')[1]
          this.form.inputItem19 = data.inviterRules.find(item => item.type === 'bind' && item.ruleType === 'over').rule
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
    },
    /**
     * @description
     * */
    parseRulesTypeRangePlanCode(ruleList, type, range) {
      ruleList = cloneDeep(ruleList)
      ruleList = ruleList.filter(item => item.type === type && item.ruleType === 'range').map(item => {
        item.rule = Number(item.rule.replace(',', ''))
        return item
      }).sort((a, b) => {
        if (range === 'min') {
          return a.rule - b.rule
        } else {
          return b.rule - a.rule
        }
      })
      return ruleList[0].planCode
    },
    /**
     * @description
     * */
    parseRulesTypeRangeNumber(ruleList, type, range) {
      ruleList = cloneDeep(ruleList)
      ruleList = ruleList.filter(item => item.type === type && item.ruleType === 'range').map(item => {
        item._rule = Number(item.rule.replace(',', ''))
        return item
      }).sort((a, b) => {
        if (range === 'min') {
          return a._rule - b._rule
        } else {
          return b._rule - a._rule
        }
      })
      return ruleList[0].rule
    },
    /**
     * @description 根据套餐 Code 获取天数
     * */
    getPlanValidDayForCode(code) {
      return this.membershipPackageList.find(item => item.value === code).validDays
    },
    /**
     * @description 根据一批套餐 code 判断是否是同一种会员类型
     * */
    planCodesIsVipType(codes) {
      codes = codes.filter(item => item)
      const types = codes.map((code) => {
        return this.membershipPackageList.find(item => item.value === code).memberType
      })
      return Array.from(new Set(types)).length === 1
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
<style lang="scss">
.invatationV2-rules{
  display: flex;
  .rules-label{
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-weight: bold;
    width: 120px;
  }
  .invatationV2-rules-item{
    display: flex;
    align-items: center;
    .el-form-item__content{
      margin-left: 0 !important;
    }
    .el-form-item{
      margin-bottom: 10px;
    }
  }
}
.invatationV2-action{
  .el-form-item__error{
    top: 34px;
  }
  .input-rule-desc{
    .el-form-item__error{
      top: 99%;
    }
  }
  .is-disabled.el-input{
    input{
      color: #888888;
    }
  }
  .left-error-tips{
    .el-form-item__error{
      left: 29px;
    }
  }
  input[type=number]{
    padding-right: 0;
  }
}
</style>
<style lang="scss">
.invatationV2-action-detail{
  .is-disabled.el-input input{
    color: #3c3c3c;
    //border: 0;
    border-color: #f5f5f5;
  }
  .el-range-editor.is-disabled, .el-input.is-disabled .el-input__inner, .el-range-editor.is-disabled input{
    background-color: #ffffff;
    color: #3c3c3c;

  }
}
</style>
