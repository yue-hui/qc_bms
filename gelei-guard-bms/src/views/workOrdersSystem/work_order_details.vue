<template>
  <div v-loading="page_loading" class="work-order-details">
    <div class="form-diviser mb-20">
      <div class="form-top-layout">
        <span v-if="action === '1'">创建工单</span>
        <span v-if="['3', '2'].indexOf(action) !== -1" class="work-order-title">
          <span :title="forms.ticket_no">【 {{ forms.ticket_no }} 】</span>
          <span> - </span>
          <span :title="forms.ticket_title">{{ forms.ticket_title | beautifyWordsFormatter(30) }}</span>
        </span>
        <span>
          <el-button
            v-if="action === '1'"
            :loading="submit_loading"
            type="primary"
            size="mini"
            data-alias="create"
            @click="submit_with_comfirm">提交</el-button>
          <el-button
            v-if="action === '2' || (identity === '01' && ['3', '4'].indexOf(work_order_state) !== -1)"
            :loading="reminder_work_order_loading"
            type="primary"
            size="mini"
            @click="reminder_work_order">催单</el-button>
          <el-button
            v-if="action === '2' || (identity === '01' && ['3', '4'].indexOf(work_order_state) !== -1)"
            :loading="save_work_order_loading"
            type="primary"
            size="mini"
            data-alias="create"
            @click="save_work_order">保存</el-button>
          <el-button
            v-if="identity === '02' && ['3', '4'].indexOf(work_order_state) !== -1"
            :loading="assigned_work_order_loading"
            type="primary"
            size="mini"
            data-alias="assigned"
            @click="assigned_work_order">提交</el-button>
          <el-button
            v-if="identity === '02' && ['3', '4'].indexOf(work_order_state) !== -1"
            type="primary"
            size="mini"
            @click="transfer_work_order_action">转交</el-button>
          <el-button
            v-if="identity === '01' && ['1'].indexOf(work_order_state) !== -1"
            :loading="close_work_order_loading"
            type="primary"
            size="mini"
            @click="close_work_order">关闭工单</el-button>
          <el-button
            v-if="identity === '01' && ['2'].indexOf(work_order_state) !== -1"
            :loading="reuse_work_order_loading"
            type="primary"
            size="mini"
            @click="reuse_work_order_comfirm">重新打开</el-button>
        </span>
      </div>
    </div>
    <!--创建人及工单基本信息-->
    <el-form size="mini" label-suffix=":" label-width="120px" label-position="left" @submit.native.prevent>
      <el-row :gutter="24" class="form-row">
        <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
          <div class="grid-content bg-purple">
            <el-form-item label="创建人">
              <span v-if="['1', '2'].indexOf(action) !== -1" class="label-text">{{ real_name }}</span>
              <span v-else-if="['3'].indexOf(action) !== -1" class="label-text">{{ forms.applicant_name }}</span>
            </el-form-item>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
          <div class="grid-content bg-purple">
            <el-form-item label="申请人角色">
              <span v-if="['1', '2'].indexOf(action) !== -1" class="label-text">{{ role_name }}</span>
              <span v-else-if="['3'].indexOf(action) !== -1" class="label-text">{{ forms.applicant_role_name }}</span>
            </el-form-item>
          </div>
        </el-col>
        <el-col v-if="action === '3'" :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
          <div class="grid-content bg-purple">
            <el-form-item label="紧急程度">
              <span class="label-text">{{ forms.degree_label }}</span>
            </el-form-item>
          </div>
        </el-col>
        <el-col v-if="action === '3'" :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
          <div class="grid-content bg-purple">
            <el-form-item label="处理人">
              <span class="label-text">{{ forms.assigned_ao_name }}</span>
            </el-form-item>
          </div>
        </el-col>
        <el-col v-if="action === '3'" :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
          <div class="grid-content bg-purple">
            <el-form-item label="工单状态">
              <span class="label-text">{{ forms.state_label }}</span>
            </el-form-item>
          </div>
        </el-col>
        <el-col v-if="action === '3'" :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
          <div class="grid-content bg-purple">
            <el-form-item label="录入时间">
              <span class="label-text">{{ forms.create_time | dateFormatter('YYYY-MM-DD HH:mm:ss') }}</span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <!--工单信息-->
    <div class="form-diviser mb-20">工单信息</div>
    <el-form
      ref="work_order_info"
      :model="forms"
      :rules="forms_rules"
      size="mini"
      label-suffix=":"
      label-width="120px"
      label-position="left"
      @submit.native.prevent>
      <el-row :gutter="24" class="form-row">
        <el-col :xs="22" :sm="16" :md="14" :lg="12" :xl="8" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="工单标题" prop="ticket_title">
              <template
                v-if="['1', '2'].indexOf(action) !== -1 || (identity === '01' && ['3', '4'].indexOf(work_order_state) !== -1)">
                <el-autocomplete
                  v-model="forms.ticket_title"
                  :fetch-suggestions="fetch_work_order_titles"
                  style="width: 100%;"
                  clearable
                  placeholder="请选择工单标题" />
              </template>
              <template v-else>
                <span :title="forms.ticket_title" class="label-text">{{ forms.ticket_title | beautifyWordsFormatter(30) }}</span>
              </template>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="form-row">
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="终端类型" prop="device_type">
              <template
                v-if="['1', '2'].indexOf(action) !== -1 || (identity === '01' && ['3', '4'].indexOf(work_order_state) !== -1)">
                <el-select
                  v-model="forms.device_type"
                  size="mini"
                  style="width: 100%;"
                  placeholder="请选择终端类型"
                  @change="change_terminal_type">
                  <el-option
                    v-for="item in terminal_types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
              </template>
              <template v-else>
                <span class="label-text">{{ forms.device_type_name }}</span>
              </template>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="form-row">
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="工单类别" prop="ticket_type_id">
              <template
                v-if="['1', '2'].indexOf(action) !== -1 || (identity === '01' && ['3', '4'].indexOf(work_order_state) !== -1)">
                <el-select
                  v-model="forms.ticket_type_id"
                  :disabled="ticket_type_disabled"
                  size="mini"
                  placeholder="请选择工单类别"
                  @change="change_ticket_type">
                  <el-option
                    v-for="item in ticket_types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
              </template>
              <template v-else>
                <span class="label-text">{{ forms.ticket_type_name }}</span>
              </template>
            </el-form-item>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="问题分类" prop="question_type_id">
              <template
                v-if="['1', '2'].indexOf(action) !== -1 || (identity === '01' && ['3', '4'].indexOf(work_order_state) !== -1)">
                <el-select
                  v-model="forms.question_type_id"
                  :disabled="question_type_disabled"
                  size="mini"
                  placeholder="请选择问题分类"
                  @change="change_question_types">
                  <el-option
                    v-for="item in question_types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
              </template>
              <template v-else>
                <span class="label-text">{{ forms.question_type_name }}</span>
              </template>
            </el-form-item>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="问题细分" prop="question_detail_id">
              <template
                v-if="['1', '2'].indexOf(action) !== -1 || (identity === '01' && ['3', '4'].indexOf(work_order_state) !== -1)">
                <el-select
                  v-model="forms.question_detail_id"
                  :disabled="question_detail_disabled"
                  size="mini"
                  placeholder="请选择问题细分"
                  @change="search">
                  <el-option
                    v-for="item in question_detail_types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
              </template>
              <template v-else>
                <span class="label-text">{{ forms.question_detail_name }}</span>
              </template>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="form-row">
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="紧急程度" prop="degree">
              <template
                v-if="['1', '2'].indexOf(action) !== -1 || (identity === '01' && ['3', '4'].indexOf(work_order_state) !== -1)">
                <el-select
                  v-model="forms.degree"
                  size="mini"
                  placeholder="请选择紧急程度"
                  @change="search">
                  <el-option
                    v-for="item in urgency_degrees"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
              </template>
              <template v-else>
                <span class="label-text">{{ forms.degree_label }}</span>
              </template>
            </el-form-item>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="工单来源" prop="ticket_source">
              <template
                v-if="['1', '2'].indexOf(action) !== -1 || (identity === '01' && ['3', '4'].indexOf(work_order_state) !== -1)">
                <el-select
                  v-model="forms.ticket_source"
                  size="mini"
                  placeholder="请选择工单来源"
                  clearable
                  @change="select_work_order_source">
                  <el-option
                    v-for="item in communication_methods"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
              </template>
              <template v-else>
                <span class="label-text">{{ forms.ticket_source_label }}</span>
              </template>
            </el-form-item>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item :label="communication_method" prop="ticket_source_details">
              <template
                v-if="['1', '2'].indexOf(action) !== -1 || (identity === '01' && ['3', '4'].indexOf(work_order_state) !== -1)">
                <el-input
                  v-model="forms.ticket_source_details"
                  :maxlength="11"
                  :placeholder="'请输入' + communication_method"
                  size="mini"
                  clearable />
              </template>
              <template v-else>
                <span class="label-text">{{ forms.ticket_source_details }}</span>
              </template>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <div class="form-diviser mt-10 mb-20">家长信息</div>
    <div class="form-row">
      <el-form
        ref="work_order_patriarch"
        :model="forms"
        :rules="forms_rules"
        size="mini"
        label-suffix=":"
        label-width="120px"
        label-position="left"
        @submit.native.prevent>
        <el-row :gutter="24">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="手机号">
                <el-input
                  v-if="['1'].indexOf(action) !== -1"
                  v-model="forms.p_phone"
                  maxlength="11"
                  size="mini"
                  clearable
                  placeholder="请输入手机号"
                  @keyup.native="forms.p_phone=forms.p_phone.replace(/[^\d]/g,'')"
                  @change="patriarch_phone_change" />
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.p_phone }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="家长昵称">
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ patriarch_info.p_nick_name }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.p_nick_name }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="终端类型">
                <span
                  v-if="['1'].indexOf(action) !== -1"
                  class="label-text">{{ patriarch_info.p_device_type_label }}</span>
                <span
                  v-if="['2', '3'].indexOf(action) !== -1"
                  class="label-text">{{ forms.p_device_type_label }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="系统版本号">
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ patriarch_info.p_os_version }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.p_os_version }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="家长端版本号">
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ patriarch_info.p_version }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.p_version }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="注册时间">
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ patriarch_info.p_create_time }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.p_create_time | dateFormatter('YYYY-MM-DD HH:mm:ss') }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="会员类型">
                <span
                  v-if="['1'].indexOf(action) !== -1"
                  class="label-text">{{ patriarch_info.p_member_type_label }}</span>
                <span
                  v-if="['2', '3'].indexOf(action) !== -1"
                  class="label-text">{{ forms.p_member_type_label }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="会员有效天数">
                <span
                  v-if="['1'].indexOf(action) !== -1"
                  class="label-text">{{ patriarch_info.p_valid_days }} 天</span>
                <span
                  v-if="['2', '3'].indexOf(action) !== -1"
                  class="label-text">{{ forms.p_valid_days }} 天</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="用户来源">
                <span
                  v-if="['1'].indexOf(action) !== -1"
                  class="label-text">{{ patriarch_info.p_reg_from_label }}</span>
                <span
                  v-if="['2', '3'].indexOf(action) !== -1"
                  class="label-text">{{ forms.p_reg_from_label }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="最近使用时间">
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ patriarch_info.last_use_time }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.last_use_time }}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="form-diviser mt-10 mb-20">
      <el-dropdown v-if="['1'].indexOf(action) !== -1" @command="change_child">
        <span
          class="el-dropdown-link">
          孩子 {{ current_child.c_nick_name }} <i class="el-icon-arrow-down el-icon--right" /> 信息</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(chlid, index) in patriarch_info.chlid_list"
            :command="chlid.c_user_id"
            :key="index">
            {{ chlid.c_nick_name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div v-if="['2', '3'].indexOf(action) !== -1" class="child-nick-name">孩子 {{ forms.c_nick_name }} 信息</div>
    </div>
    <div class="form-row">
      <el-form
        ref="child_forms"
        :model="forms"
        size="mini"
        label-suffix=":"
        label-width="120px"
        label-position="left"
        @submit.native.prevent>
        <el-row :gutter="24">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="手机号">
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ current_child.c_phone }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.c_phone }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple" style="width: 400px;">
              <el-form-item label="孩子年级">
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ current_child.c_grade_name }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.c_grade_name }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple" style="width: 400px;">
              <el-form-item label="注册时间">
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ current_child.c_create_time }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.c_create_time | dateFormatter('YYYY-MM-DD HH:mm:ss') }}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="绑定设备">
                <el-select
                  v-if="['1'].indexOf(action) !== -1"
                  v-model="forms.c_device_id"
                  size="mini"
                  placeholder="请选择绑定设备"
                  @change="change_child_device">
                  <el-option
                    v-for="item in child_device_list"
                    :key="item.c_device_id"
                    :label="item.c_device_name"
                    :value="item.c_device_id" />
                </el-select>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.c_device_name }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple" style="width: 400px;">
              <el-form-item label="终端类型">
                <span
                  v-if="['1'].indexOf(action) !== -1"
                  class="label-text">{{ current_device.c_device_type_label }}</span>
                <span
                  v-if="['2', '3'].indexOf(action) !== -1"
                  class="label-text">{{ forms.c_device_type_label }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple" style="width: 400px;">
              <el-form-item label="系统版本号">
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ current_device.c_os_version }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.c_os_version }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple" style="width: 400px;">
              <el-form-item label="孩子端版本号">
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ current_device.c_version }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.c_version }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple" style="width: 400px;">
              <el-form-item label="绑定状态">
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ current_device.c_bind_type }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.c_bind_type }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple" style="width: 400px;">
              <el-form-item label="绑定时间">
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ current_device.c_bind_time }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.c_bind_time | dateFormatter('YYYY-MM-DD HH:mm:ss') }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple" style="width: 400px;">
              <el-form-item label="解绑时间">
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ current_device.c_unbind_time }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.c_unbind_time | dateFormatter('YYYY-MM-DD HH:mm:ss') }}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="form-diviser mt-10 mb-10">工单详情</div>
    <el-form
      ref="work_order_detail"
      :model="forms"
      :rules="work_order_detail_rules"
      size="mini"
      label-suffix=":"
      label-width="120px"
      label-position="left"
      @submit.native.prevent>
      <el-row v-if="['1', '2'].indexOf(action) !== -1" :gutter="24" class="form-row">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="问题描述" prop="problem_description">
              <tinymce
                v-model="forms.problem_description"
                :height="200"
                class="question-details" />
              <div
                v-if="['3'].indexOf(action) !== -1"
                class="problem-description"
                v-html="forms.problem_description" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="处理人" prop="assigned_ao_id">
              <el-select
                v-model="forms.assigned_ao_id"
                size="mini"
                filterable
                placeholder="请选择处理人">
                <el-option
                  v-for="item in handler_users"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <div v-else-if="['3'].indexOf(action) !== -1" class="work-order-detail-block">
        <p class="detail-desc-title">
          <span :class="{active: detail_active === '1'}" class="desc" @click="detail_active = '1'">问题描述</span>
          <span class="between-desc-history">|</span>
          <span :class="{active: detail_active === '2'}" class="history" @click="detail_active = '2'">变更历史</span>
        </p>
        <div v-if="detail_active === '1'" class="detail-content">
          <template
            v-if="identity === '01' && ['3', '4'].indexOf(work_order_state) !== -1">
            <el-row :gutter="24" class="form-row">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="col-bg">
                <div class="grid-content bg-purple">
                  <el-form-item label="问题描述" prop="problem_description">
                    <tinymce
                      v-model="forms.problem_description"
                      :height="200"
                      class="question-details" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="col-bg">
                <div class="grid-content bg-purple">
                  <el-form-item label="处理人" prop="assigned_ao_id">
                    <el-select
                      v-if="action === '1'"
                      v-model="forms.assigned_ao_id"
                      size="mini"
                      placeholder="请选择处理人"
                      clearable>
                      <el-option
                        v-for="item in handler_users"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                    </el-select>
                    <span
                      v-if="['2', '3'].indexOf(action) !== -1"
                      class="label-text">{{ forms.assigned_ao_name }}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <div v-if="['3'].indexOf(action) !== -1" v-html="forms.problem_description" />
          </template>
        </div>
        <div v-if="detail_active === '2'" class="detail-content detail-change-content">
          <el-table
            v-loading="history_record_loading"
            :data="ticket_change_records"
            class="history-table"
            size="mini"
            stripe>
            <el-table-column
              label="变更时间"
              width="140"
              empty-text="暂无历史变更记录"
              align="center">
              <template slot-scope="scope">
                <p>{{ scope.row.create_time | dateFormatter('YYYY-MM-DD HH:mm:ss') }}</p>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="变更人"
              width="108"
              prop="user_real_name" />
            <el-table-column
              align="center"
              label="变更类型"
              width="108"
              prop="change_type_name" />
            <el-table-column
              align="center"
              label="变更前"
              prop="before_change">
              <template slot-scope="scope">
                <p :title="scope.row.before_change">{{ scope.row.before_change | beautifyWordsFormatter(50) }}</p>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="变更后"
              prop="after_change">
              <template slot-scope="scope">
                <p :title="scope.row.after_change">{{ scope.row.after_change | beautifyWordsFormatter(50) }}</p>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="备注"
              prop="remark">
              <template slot-scope="scope">
                <p :title="scope.row.remark">{{ scope.row.remark | beautifyWordsFormatter(50) }}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-form>

    <!--评论-->
    <div v-if="['1'].indexOf(action) === -1" class="comment-block">
      <hr class="comment">
      <p class="comment-title">评论 <span class="add-comment" @click="add_comment">+ 评论</span></p>
      <div class="comment-items">
        <template v-if="ticket_comments.length !== 0">
          <div
            v-for="(comment, index) in ticket_comments"
            :key="index"
            class="comment-item">
            <div class="left">
              <img :src="comment.img_url || require('../../assets/imgs/glmm.png')" alt="">
            </div>
            <div class="right">
              <div class="comment-info">
                <p class="comment-time-point">
                  <span class="real-name">{{ comment.real_name }}</span>
                  <span class="role-name">{{ comment.role_name }}</span>
                  <span class="create-date">{{ comment.create_time | dateFormatter('YYYY-MM-DD HH:mm:ss') }}</span>
                  <span v-if="comment.cc_user && comment.cc_user.length !== 0" class="comment-copy-to">抄送：{{ comment.cc_user.join('、') }}</span>
                </p>
              </div>
              <div class="comment-content">
                <div v-html="comment.comment" />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <p class="no-comments-work-order">暂时没有评论内容</p>
        </template>
      </div>
    </div>

    <!--工单处理-->
    <div v-if="['3'].indexOf(action) !== -1" class="work-order-next">
      <p class="work-order-title">工单处理</p>
      <div class="work-order-next-content">
        <el-form
          ref="assigned_forms"
          :model="assigned_forms"
          :rules="assigned_rules"
          size="mini"
          label-suffix=":"
          label-width="120px"
          label-position="left"
          @submit.native.prevent>
          <el-row :gutter="24" class="form-row">
            <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple">
                <el-form-item label="处理人">
                  <span class="label-text">{{ forms.assigned_ao_name }}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple">
                <el-form-item label="当前状态" prop="state">
                  <template v-if="identity === '02' && ['3', '4'].indexOf(work_order_state) !== -1">
                    <el-select
                      v-model="assigned_forms.state"
                      size="mini"
                      placeholder="请选择当前状态">
                      <el-option
                        v-for="status in work_orders_status.filter(r => ['1', '3'].indexOf(r.value) !== -1)"
                        :key="status.value"
                        :label="status.label"
                        :value="status.value" />
                    </el-select>
                  </template>
                  <template v-else>
                    <span class="label-text">{{ forms.state_label }}</span>
                  </template>
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple">
                <el-form-item label="问题归类" prop="state">
                  <template v-if="identity === '02' && ['3', '4'].indexOf(work_order_state) !== -1">
                    <el-select
                      v-model="assigned_forms.problem_type"
                      size="mini"
                      placeholder="请选择问题归类">
                      <el-option
                        v-for="status in work_orders_question_classifies"
                        :key="status.value"
                        :label="status.label"
                        :value="status.value" />
                    </el-select>
                  </template>
                  <template v-else>
                    <span class="label-text">{{ forms.problem_type_label }}</span>
                  </template>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <template v-if="identity === '02' && ['3', '4'].indexOf(work_order_state) !== -1">
            <el-row :gutter="24" class="form-row">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="评论" prop="comment">
                    <tinymce
                      v-model="assigned_forms.comment"
                      :height="200"
                      class="question-details" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-form>
      </div>
    </div>

    <!--历史关联工单-->
    <div class="form-diviser mt-10">历史关联工单</div>
    <div class="history-work-order-items">
      <template v-if="histories.length !== 0">
        <p
          v-for="(history, index) in histories"
          :key="index"
          class="history-work-order-item">
          <span class="history-index">{{ index + 1 }}. </span>
          <a href="javascript:;" @click="jump_to_history_page(history.ticket_id)">
            <span :title="history.ticket_title">{{ history.ticket_title | beautifyWordsFormatter(30) }}</span>
            <span> - </span>
            <span>{{ history.create_time | dateFormatter('YYYY-MM-DD HH:mm:ss') }}</span>
          </a>
        </p>
      </template>
      <template v-else>
        <p class="no-history-work-order">该用户暂无历史关联工单</p>
      </template>
    </div>

    <el-dialog
      :before-close="before_close_transfer"
      :visible.sync="transfer_visible"
      top="10vh"
      title="工单转交"
      width="800px">
      <el-form
        v-loading="transfer_form_loading"
        ref="transfer_form"
        :model="transfer_form"
        :rules="transfer_rules"
        label-width="120px"
        @submit.native.prevent>
        <el-form-item label="转交给" prop="after_user_id">
          <el-select
            v-model="transfer_form.after_user_id"
            size="mini"
            style="width: 100%;"
            placeholder="请选择转交人"
            filterable
            @change="change_terminal_type">
            <el-option
              v-for="item in tranfer_users"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="transfer_form.remark" type="textarea" rows="4" resize="none" />
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button size="mini" @click="close_transfer_dialog">取消</el-button>
          <el-button
            :loading="submit_transfer_work_order_loading"
            size="mini"
            type="primary"
            @click="submit_transfer_form">确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :before-close="close_comment_dialog"
      :visible.sync="comment_visible"
      top="10vh"
      title="评论"
      width="800px">
      <el-form
        ref="comment_form"
        :model="comment_form"
        :rules="comment_rules"
        label-suffix=":"
        label-width="120px"
        @submit.native.prevent>
        <el-form-item label="评论" prop="comment">
          <tinymce
            ref="tinymce_comment"
            v-model="comment_form.comment"
            :height="200"
            class="comment-details" />
        </el-form-item>
        <el-form-item label="抄送谁看" prop="cc_user_id">
          <el-select
            v-model="comment_form.cc_users"
            size="mini"
            style="width: 100%"
            multiple
            filterable
            placeholder="抄送谁看">
            <el-option
              v-for="user in comment_and_copy_users"
              :key="user.value"
              :label="user.label"
              :value="user.value" />
          </el-select>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button size="mini" @click="close_comment_dialog">取消</el-button>
          <el-button
            :loading="submit_comment_order_loading"
            size="mini"
            type="primary"
            @click="submit_comment">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { mapGetters } from 'vuex'
import {
  add_work_order_comment,
  create_work_order,
  get_work_order_tags_by_cascade,
  manager_ticket_associated_list,
  manager_ticket_change_records,
  query_manager_ticket_title,
  query_patriarch_details_by_phone,
  query_ticket_info,
  query_users_by_associated_type,
  query_work_order_comments,
  transfer_work_order,
  update_assigned_work_order_comment,
  update_work_order
} from '@/api/work_order_system'
import {
  COMMUNICATION_METHODS,
  DATE_TIME_FORMAT,
  PATRIARCH_MEMBER_TYPES,
  TERMINAL_TYPES,
  URGENCY_DEGREES,
  WORK_ORDERS_QUESTION_CLASSIFIES,
  WORK_ORDERS_STATUS,
  WORK_ORDERS_URGENCY_DEGREE
} from '@/utils/constant'
import { date_formatter, get_value_from_map_list, pure_object_null_value } from '@/utils/common'

export default {
  name: 'WorkOrdersDetails',
  components: {
    Tinymce
  },
  data() {
    const validateAssignedStatus = (rule, value, callback) => {
      if (value !== '1') {
        callback(new Error('工单状态需为“已处理”才可提交'))
      } else {
        callback()
      }
    }
    return {
      page_loading: true,
      page_header_content: '创建工单',
      action: this.$route.query.action, // 1 创建 2 编辑 3 正常处理流程
      ticket_id: this.$route.query.ticket_id,
      submit_loading: false,
      reminder_work_order_loading: false,
      save_work_order_loading: false,
      assigned_work_order_loading: false,
      close_work_order_loading: false,
      reuse_work_order_loading: false,
      submit_transfer_work_order_loading: false,
      submit_comment_order_loading: false,
      history_record_loading: false, // 变更历史记录
      work_order_titles: [],
      device_type_list: [],
      terminal_types: TERMINAL_TYPES,
      ticket_types: [],
      ticket_type_disabled: true,
      question_types: [],
      question_type_disabled: true,
      question_detail_types: [],
      question_detail_disabled: true,
      urgency_degrees: URGENCY_DEGREES,
      comment_and_copy_users: [], // 可抄送的用户
      comment_users: [], // 已选择的抄送用户
      comment: '',
      patriarch_info: {},
      communication_methods: COMMUNICATION_METHODS,
      communication_method: '微信/QQ/邮箱',
      current_child: {}, // 当前孩子
      child_device_list: [], // 当前孩子的设备列表
      current_device: {}, // 当前孩子指定设备信息
      handler_users: [], // 工单处理人
      current_work_orders_status: '', // 工单当前处理状态
      work_orders_status: WORK_ORDERS_STATUS, // 工单当前处理状态列表
      work_orders_state: '', // 问题归类
      work_orders_question_classifies: WORK_ORDERS_QUESTION_CLASSIFIES, // 工单当前处理状态列表
      forms: {
        ticket_title: '',
        ticket_no: '',
        device_type: '',
        ticket_type_id: '',
        question_type_id: '',
        question_detail_id: '',
        degree: '',
        ticket_source: '',
        ticket_source_details: '',
        p_phone: '',
        p_user_id: '',
        c_user_id: '',
        c_device_id: '',
        assigned_ao_id: '',
        problem_description: ''
      },
      forms_rules: { // 工单基本信息配置
        ticket_title: [
          { type: 'string', required: true, message: '工单标题不能为空', trigger: 'blur' }
        ],
        device_type: [
          { type: 'string', required: true, message: '请选择终端类型', trigger: 'blur' }
        ],
        ticket_type_id: [
          { type: 'string', required: true, message: '请选择工单类别', trigger: 'blur' }
        ],
        question_type_id: [
          { type: 'string', required: true, message: '请选择问题分类', trigger: 'blur' }
        ],
        question_detail_id: [
          { type: 'string', required: true, message: '请选择问题细分', trigger: 'blur' }
        ],
        degree: [
          { type: 'string', required: true, message: '请选择工单紧急程度', trigger: 'blur' }
        ],
        ticket_source: [
          { type: 'string', required: true, message: '请选择工单来源', trigger: 'blur' }
        ],
        ticket_source_details: [
          { type: 'string', required: true, message: '请输入微信/QQ/邮箱', trigger: 'blur' }
        ]
      },
      work_order_detail_rules: { // 工单详情规则
        problem_description: [
          { type: 'string', required: true, message: '请输入填写问题描述', trigger: 'blur' }
        ],
        assigned_ao_id: [
          { type: 'string', required: true, message: '请输入选择处理人', trigger: 'blur' }
        ]
      },
      detail_active: '1', // 工单详情 1 问题描述 2 变更历史
      ticket_comments: [], // 评论列表
      ticket_change_records: [], // 工单变量历史
      histories: [], // 历史工单
      transfer_visible: false, // 转发
      transfer_form_loading: false,
      tranfer_users: [], // 转交过的用户
      transfer_form: {
        after_user_id: '',
        remark: ''
      },
      transfer_rules: {
        after_user_id: [
          { type: 'string', required: true, message: '请选择转交人', trigger: 'blur' }
        ],
        remark: [
          { type: 'string', required: true, message: '请填写备注信息', trigger: 'blur' }
        ]
      },
      comment_visible: false, // 评论区域是否可见
      comment_form: {
        comment: '',
        cc_users: []
      },
      comment_rules: {
        comment: [
          { type: 'string', required: true, message: '请填写评论', trigger: 'blur' }
        ],
        cc_users: [
          { type: 'string', required: true, message: '请选择抄送人', trigger: 'blur' }
        ]
      },
      assigned_forms: {
        state: '',
        problem_type: '',
        comment: ''
      },
      assigned_rules: {
        state: [
          { type: 'string', required: true, message: '请选择工单状态', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateAssignedStatus }
        ],
        problem_type: [
          { type: 'string', required: true, message: '需选择工单“问题归类”才可提交', trigger: 'blur' }
        ],
        comment: [
          { type: 'string', required: true, message: '需对工单进行“处理结果评论”才可提交', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'real_name', 'role_name']),
    identity: function() {
      // 用户身份
      if (this.name === this.forms.applicant_id) {
        return '01' // 创建者
      } else if (this.name === this.forms.assigned_ao_id) {
        return '02' // 受理人
      } else {
        const comment_users = this.comment_and_copy_users.map(r => r.value)
        if (comment_users.indexOf(this.name) !== -1) {
          return '03' // 抄送人
        } else {
          return '04' // 不存在用户标识
        }
      }
    },
    work_order_state: function() {
      // 工单状态
      return this.forms.state
    }
  },
  mounted: async function() {
    if (this.action === '1') {
      // 搜索工单标题接口
      // 终端类型
      this.fetch_terminal_types()
    }
    if (['2', '3'].indexOf(this.action) !== -1) {
      // 工单信息
      await this.fetch_ticket_info()
    }
    if (['2'].indexOf(this.action) !== -1 ||
      (this.identity === '01' && ['3', '4'].indexOf(this.work_order_state) !== -1)) {
      // 终端类型
      await this.fetch_terminal_types(false)
      await this.change_terminal_type(false)
      await this.change_ticket_type(false)
      await this.change_question_types(false)
    }
    if (['3'].indexOf(this.action) !== -1) {
      // 操作记录
      this.fetch_work_order_change_records()
    }

    if (['1', '2', '3'].indexOf(this.action) !== -1) {
      // 处理人列表
      this.fetch_acceptors()
      // @我的人列表
      this.fetch_comment_users()
    }
    if (['2', '3'].indexOf(this.action) !== -1) {
      // 历史工单
      this.fetch_ticket_associated_histories()
      // 评论列表
      this.fetch_work_order_comments()
    }
    this.page_loading = false
  },
  methods: {
    get_form_data() {
      // 创建工单字段
      const config = {
        applicant_id: this.name,
        ticket_title: this.forms.ticket_title,
        device_type: this.forms.device_type,
        ticket_type_id: this.forms.ticket_type_id,
        question_type_id: this.forms.question_type_id,
        question_detail_id: this.forms.question_detail_id,
        degree: this.forms.degree,
        ticket_source: this.forms.ticket_source,
        ticket_source_details: this.forms.ticket_source_details,
        p_user_id: this.forms.p_user_id,
        c_user_id: this.forms.c_user_id,
        c_device_id: this.forms.c_device_id,
        problem_description: this.forms.problem_description,
        assigned_ao_id: this.forms.assigned_ao_id
      }
      return config
    },
    validate_element_sets(name) {
      return new Promise(resolve => {
        this.$refs[name].validate(valid => {
          resolve(valid)
        })
      })
    },
    submit() {
      this.submit_loading = true
      const config = this.get_form_data()
      create_work_order(pure_object_null_value(config)).then(res => {
        if (res.status === 0) {
          this.$message.success('工单添加成功')
          window.close()
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.submit_loading = false
      })
    },
    submit_with_comfirm: async function() {
      // 创建工单
      const work_order_info_valid = await this.validate_element_sets('work_order_info')
      const work_order_detail_valid = await this.validate_element_sets('work_order_detail')
      if (work_order_info_valid && work_order_detail_valid) {
        this.$confirm('确认提交工单么？请确保提供工单信息准确', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submit()
        })
      }
    },
    get_edit_form_data: function() {
      // 编辑工单字段
      const config = {
        ticket_id: this.ticket_id,
        ticket_title: this.forms.ticket_title,
        device_type: this.forms.device_type,
        ticket_type_id: this.forms.ticket_type_id,
        question_type_id: this.forms.question_type_id,
        question_detail_id: this.forms.question_detail_id,
        degree: this.forms.degree,
        ticket_source: this.forms.ticket_source,
        ticket_source_details: this.forms.ticket_source_details,
        problem_description: this.forms.problem_description,
        assigned_ao_id: this.forms.assigned_ao_id
      }
      return config
    },
    save_work_order: async function() {
      // 创建者更新工单信息
      const work_order_info_valid = await this.validate_element_sets('work_order_info')
      const work_order_detail_valid = await this.validate_element_sets('work_order_detail')
      if (work_order_info_valid && work_order_detail_valid) {
        this.save_work_order_loading = true
        const config = this.get_edit_form_data()
        this.update_work_order_info_or_action(config).then(res => {
          if (res.status === 0) {
            window.close()
          } else {
            this.$message.error(res.message)
          }
        }).finally(() => {
          this.save_work_order_loading = false
        })
      }
    },
    assigned_work_order: function() {
      this.$refs['assigned_forms'].validate(valid => {
        if (valid) {
          // 受理者更新评论及处理意见 提交
          this.assigned_work_order_loading = true
          const config = {
            ticket_id: this.forms.ticket_id,
            state: this.assigned_forms.state,
            problem_type: this.assigned_forms.problem_type,
            comment: this.assigned_forms.comment
          }
          update_assigned_work_order_comment(pure_object_null_value(config)).then(res => {
            if (res.status === 0) {
              window.close()
            } else {
              this.$message.error(res.message)
            }
          }).finally(() => {
            this.assigned_work_order_loading = false
          })
        }
      })
    },
    reminder_work_order: function() {
      // 催单
      this.reminder_work_order_loading = true
      const config = this.get_edit_form_data()
      config['msg_type'] = '06'
      this.update_work_order_info_or_action(config).then(res => {
        if (res.status === 0) {
          window.close()
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.reminder_work_order_loading = false
      })
    },
    reminder_work_order_comfirm() {
      this.$confirm('确认关闭此工单么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.close_work_order()
      })
    },
    close_work_order: function() {
      // 关闭工单
      const config = this.get_edit_form_data()
      config['state'] = '2'
      this.close_work_order_loading = true
      this.update_work_order_info_or_action(config).then(res => {
        if (res.status === 0) {
          window.close()
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.close_work_order_loading = false
      })
    },
    reuse_work_order_comfirm() {
      this.$confirm('确认需求重新打开工单么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.reuse_work_order()
      })
    },
    reuse_work_order: function() {
      // 重新打开工单
      const config = this.get_edit_form_data()
      config['state'] = '4'
      this.reuse_work_order_loading = true
      this.update_work_order_info_or_action(config).then(res => {
        if (res.status === 0) {
          window.location.reload()
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.reuse_work_order_loading = false
      })
    },
    update_work_order_info_or_action: function(config = {}) {
      return new Promise((resolve, reject) => {
        update_work_order(pure_object_null_value(config)).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    submit_transfer_form: function() {
      this.$refs['transfer_form'].validate(valid => {
        if (valid) {
          const config = {
            ticket_id: this.ticket_id,
            after_user_id: this.transfer_form.after_user_id,
            remark: this.transfer_form.remark
          }
          this.submit_transfer_work_order_loading = true
          transfer_work_order(pure_object_null_value(config)).then(res => {
            if (res.status === 0) {
              this.close_transfer_dialog()
              window.close()
            } else {
              this.$message.error(res.message)
            }
          }).finally(() => {
            this.submit_transfer_work_order_loading = false
          })
        }
      })
    },
    transfer_work_order_action: function() {
      // 转发
      this.transfer_visible = true
      this.fetch_tranfer_user()
    },
    before_close_transfer: function() {
      this.$confirm('确认是否转交窗口？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.close_transfer_dialog()
      })
    },
    close_transfer_dialog: function() {
      this.transfer_visible = false
      this.transfer_form.after_user_id = ''
      this.transfer_form.remark = ''
      this.$refs.tinymce_transfer.setContent(this.transfer_form.remark)
    },
    cancel: function() {
    },
    search_work_order_title: function() {
      //
    },
    select_work_order_source: function() {
      const communication = COMMUNICATION_METHODS.find(r => r.value === this.forms.ticket_source)
      this.communication_method = communication.label
    },
    search: function() {
      //
    },
    jump_to_history_page(ticket_id) {
      // 历史工单界面
      const query = {
        action: '3',
        ticket_id
      }
      const name = 'WorkOrdersSystemDetails'
      const router_data = this.$router.resolve({ name, query })
      window.open(router_data.href, '_blank', 'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes')
    },
    get_bind_type_name: function(bind_type) {
      if (bind_type === '1') {
        return '绑定中'
      } else if (bind_type === '0') {
        return '已解绑'
      } else {
        return ''
      }
    },
    get_child_device_list(devices) {
      return devices.map(r => {
        const c_bind_time = date_formatter(r.c_bind_time, DATE_TIME_FORMAT)
        const c_unbind_time = date_formatter(r.c_unbind_time, DATE_TIME_FORMAT)
        const c_bind_type = this.get_bind_type_name(r.c_bind_type)
        return {
          ...r,
          c_bind_time,
          c_unbind_time,
          c_bind_type
        }
      })
    },
    change_child: function(child_id) {
      const child = this.patriarch_info.chlid_list.find(r => r.c_user_id === child_id)
      this.current_child = child || {}
      if (this.current_child.c_user_id) {
        this.forms.c_user_id = this.current_child.c_user_id
        const child_device_list = child.c_device_list || []
        this.child_device_list = this.get_child_device_list(child_device_list)
        if (this.child_device_list.length) {
          this.current_device = this.child_device_list[0]
          this.forms.c_device_id = this.child_device_list[0].c_device_id
        } else {
          this.current_device = {}
          this.forms.c_device_id = ''
        }
      } else {
        this.forms.c_user_id = ''
        this.forms.c_device_id = ''
        this.child_device_list = []
      }
    },
    change_child_device: function(device_id) {
      const device = this.child_device_list.find(r => r.c_device_id === device_id)
      this.current_device = device || {}
      this.forms.c_device_id = this.current_device.c_device_id
    },
    patriarch_phone_change: function() {
      // 改变家长端手机号
      // 13266534451
      const phone = this.forms.p_phone
      if (phone && phone.length === 11) {
        const config = { phone }
        // 家长的详情信息
        query_patriarch_details_by_phone(config).then(res => {
          if (res.status === 0) {
            this.patriarch_info = res.data
            if (res.data.p_user_id) {
              this.patriarch_info.p_create_time = date_formatter(this.patriarch_info.p_create_time, DATE_TIME_FORMAT)
              this.patriarch_info.p_member_type_label = get_value_from_map_list(this.patriarch_info.p_member_type, PATRIARCH_MEMBER_TYPES)
              const chlid_list = this.patriarch_info.c_user_list.map(r => {
                const c_create_time = date_formatter(r.c_create_time, DATE_TIME_FORMAT)
                return {
                  ...r,
                  c_create_time
                }
              })
              this.forms.p_user_id = this.patriarch_info.p_user_id
              // 孩子设备选择列表
              this.patriarch_info.chlid_list = chlid_list || []
              if (chlid_list && chlid_list.length !== 0) {
                // 默认取第一个孩子
                const current_child = chlid_list[0]
                this.current_child = current_child
                this.forms.c_user_id = current_child.c_user_id
                // 默认取第一个设备
                this.child_device_list = this.get_child_device_list(current_child.c_device_list)
                if (this.child_device_list && this.child_device_list.length) {
                  this.forms.c_device_id = this.child_device_list[0].c_device_id
                  this.current_device = this.child_device_list[0]
                } else {
                  this.forms.c_device_id = ''
                  this.current_device = {}
                }
              } else {
                this.current_child = {}
                this.forms.c_user_id = ''
                this.forms.c_device_id = ''
                this.current_device = {}
              }
            } else {
              this.patriarch_info = {}
              this.current_child = {}
              this.forms.c_user_id = ''
              this.forms.c_device_id = ''
              this.forms.p_user_id = ''
            }
          } else {
            this.current_child = {}
            this.patriarch_info = {}
            this.$message.error(res.message)
          }
        })
        // 历史关联工单
        this.fetch_ticket_associated_histories()
      } else {
        this.patriarch_info = {}
        this.current_child = {}
        this.child_device_list = []
        this.forms.device = ''
        this.current_device = {}
      }
    },
    change_question_types: async function(clear_data = true) {
      // 改变 问题分类
      const question_type_id = this.forms.question_type_id
      this.question_detail_types = await this.fetch_ticket_label_types(question_type_id)
      this.question_detail_disabled = false
      if (clear_data) {
        this.forms.question_detail_id = ''
      }
    },
    change_ticket_type: async function(clear_data = true) {
      // 改变 工单类别
      const ticket_type_id = this.forms.ticket_type_id
      this.question_types = await this.fetch_ticket_label_types(ticket_type_id)
      this.question_type_disabled = false
      this.question_detail_disabled = true
      if (clear_data) {
        this.forms.question_type_id = ''
        this.forms.question_detail_id = ''
        this.question_detail_types = []
      }
    },
    change_terminal_type: async function(clear_data = true) {
      // 改变 终端类型
      const device_type = this.forms.device_type
      this.ticket_types = await this.fetch_ticket_label_types(device_type)
      this.ticket_type_disabled = false
      this.question_type_disabled = true
      this.question_detail_disabled = true
      if (clear_data) {
        this.forms.ticket_type_id = ''
        this.forms.question_type_id = ''
        this.forms.question_detail_id = ''
        this.question_types = []
        this.question_detail_types = []
      }
    },
    fetch_terminal_types: async function(clear_data = true) {
      // 首次加载 终端类型
      this.terminal_types = await this.fetch_ticket_label_types()
      this.ticket_type_disabled = true
      this.question_type_disabled = true
      this.question_detail_disabled = true
      if (clear_data) {
        this.forms.ticket_type_id = ''
        this.forms.question_type_id = ''
        this.forms.question_detail_id = ''
        this.ticket_types = []
        this.question_types = []
        this.question_detail_types = []
      }
    },
    fetch_ticket_label_types: function(type_id = 0) {
      // 按级获取工单标签
      return new Promise((resolve) => {
        const config = {
          type_id
        }
        get_work_order_tags_by_cascade(pure_object_null_value(config)).then(res => {
          if (res.status === 0) {
            const remote_data = res.data.map(r => {
              return {
                ...r,
                value: r.id + '',
                label: r.type_name
              }
            })
            resolve(remote_data)
          }
        })
      })
    },
    fetch_work_order_titles: function(ticket_title, cb) {
      if (!ticket_title) {
        return
      }
      // 搜索工单标题
      const config = {
        ticket_title
      }
      query_manager_ticket_title(pure_object_null_value(config)).then(res => {
        // 搜索类似工单标题
        if (res.status === 0) {
          const remote_data = res.data
          this.work_order_titles = remote_data
          const ticket_titles = remote_data.map(r => {
            return {
              value: r
            }
          })
          cb(ticket_titles)
        }
      })
    },
    fetch_acceptors: async function() {
      this.handler_users = await this.fetch_users_by_associated_type('01')
    },
    fetch_comment_users: async function() {
      this.comment_and_copy_users = await this.fetch_users_by_associated_type('02')
    },
    fetch_tranfer_user: async function() {
      this.transfer_form_loading = true
      this.tranfer_users = await this.fetch_users_by_associated_type('03')
      this.transfer_form_loading = false
    },
    fetch_users_by_associated_type: function(associated_type) {
      // associated_type: 01处理人 02@我的人 03转交过的用户
      return new Promise(resolve => {
        const config = {
          associated_type,
          ticket_id: this.ticket_id
        }
        query_users_by_associated_type(pure_object_null_value(config)).then(res => {
          if (res.status === 0) {
            const remote_data = res.data.map(r => {
              return {
                ...r,
                value: r.user_id,
                label: r.real_name
              }
            })
            resolve(remote_data)
          } else {
            resolve([])
          }
        }).catch(() => {
          resolve([])
        })
      })
    },
    fetch_ticket_info: function() {
      // 获取工单信息
      return new Promise((resolve, reject) => {
        const config = {
          ticket_id: this.ticket_id
        }
        // p_member_type_label
        query_ticket_info(pure_object_null_value(config)).then(res => {
          if (res.status === 0) {
            const remote_data = res.data
            remote_data['c_bind_type'] = this.get_bind_type_name(remote_data.c_bind_type)
            remote_data['p_member_type_label'] = get_value_from_map_list(remote_data.p_member_type, PATRIARCH_MEMBER_TYPES)
            remote_data['problem_type_label'] = get_value_from_map_list(remote_data.problem_type, this.work_orders_question_classifies, '')
            remote_data['degree_label'] = get_value_from_map_list(remote_data.degree, WORK_ORDERS_URGENCY_DEGREE)
            remote_data['ticket_source_label'] = get_value_from_map_list(remote_data.ticket_source, this.communication_methods, '微信/QQ/邮箱')
            this.communication_method = remote_data['ticket_source_label'] || this.communication_methods[0].label
            const daichuli = this.work_orders_status.find(r => r.value === '3')
            remote_data['state_label'] = get_value_from_map_list(remote_data.state, this.work_orders_status, daichuli.label)
            this.forms = remote_data
            resolve(remote_data)
          } else {
            resolve({})
            this.$message.error(res.message)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    fetch_work_order_comments: function() {
      // 用户评论
      const config = {
        ticket_id: this.ticket_id
      }
      query_work_order_comments(pure_object_null_value(config)).then(res => {
        // 查询评论数
        if (res.status === 0) {
          this.ticket_comments = res.data
        } else {
          this.$message.error(res.message)
          this.ticket_comments = []
        }
      })
    },
    fetch_work_order_change_records: function() {
      // 操作记录
      const config = {
        ticket_id: this.ticket_id
      }
      this.history_record_loading = true
      manager_ticket_change_records(pure_object_null_value(config)).then(res => {
        // 查询评论数
        if (res.status === 0) {
          this.ticket_change_records = res.data
        } else {
          this.ticket_change_records = []
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.history_record_loading = false
      })
    },
    fetch_ticket_associated_histories: function() {
      const config = {
        phone: this.forms.p_phone
      }
      manager_ticket_associated_list(pure_object_null_value(config)).then(res => {
        if (res.status === 0) {
          this.histories = res.data
        } else {
          this.histories = []
          this.$message.error(res.message)
        }
      })
    },
    add_comment: function() {
      // 添加评论
      this.comment_visible = true
    },
    before_close_comment: function() {
      this.$confirm('确认是否评论窗口？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.close_comment_dialog()
      })
    },
    close_comment_dialog: function() {
      // 关闭评论
      this.comment_visible = false
      this.comment_form = {
        cc_users: [],
        comment: ''
      }
      this.$refs.tinymce_comment.setContent('')
    },
    submit_comment: function() {
      // 添加评论
      this.$refs['comment_form'].validate(valid => {
        if (valid) {
          const config = {
            ticket_id: this.ticket_id,
            user_id: this.name,
            cc_user_id: this.comment_form.cc_users.join(','),
            comment: this.comment_form.comment
          }
          this.submit_comment_order_loading = true
          add_work_order_comment(pure_object_null_value(config)).then(res => {
            if (res.status === 0) {
              this.fetch_work_order_comments()
              this.close_comment_dialog()
            } else {
              this.$message.error(res.message)
            }
          }).finally(() => {
            this.submit_comment_order_loading = false
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$text_color: #365638;

.work-order-details {
  width: 100%;
  /*min-height: 480px;*/
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  overflow: hidden;

  .form-row {
    padding-left: 24px;
    width: calc(100% - 40px);

    .label-text {
      height: 29px;
      line-height: 29px;
      color: $text_color;
      white-space: nowrap;
      display: block;
    }
  }

  .mt-10 {
    margin-top: 10px;
  }

  .mb-10 {
    margin-bottom: 10px;
  }

  .mb-20 {
    margin-bottom: 20px;
  }

  .form-diviser {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    color: #2c2c2c;
    background-color: #d1d1d1;

    .form-top-layout {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .work-order-title {
        font-weight: bold;
      }
    }
  }

  .question-details {
    width: 100%;
  }

  .problem-description {
    /deep/ p {
      margin: 0;
    }
  }

  .history-work-order-items {
    padding-left: 20px;
    margin-bottom: 30px;

    &:hover {
      color: #5c50e6;
    }

    .history-work-order-item {
      color: #8a82e6;
      font-size: 14px;

      .history-index {
        display: inline-block;
        min-width: 24px;
        text-align: right;
      }

      a {
        vertical-align: center;
        line-height: 18px;
        border-bottom: 1px solid #5c50e6;

        &:hover {
          color: #5c50e6;
        }
      }
    }

    .no-history-work-order {
      height: 29px;
      line-height: 29px;
      color: #365638;
      font-size: 14px;
      white-space: nowrap;
      display: block;
    }
  }

  .no-comments-work-order {
    height: 29px;
    line-height: 29px;
    color: #365638;
    font-size: 14px;
    white-space: nowrap;
    display: block;
  }

  .comment-block {
    padding: 0 20px 20px 20px;

    .comment {
      border-top: 1px solid #dcdcdc;
    }

    .comment-title {
      font-size: 16px;
      color: #3f4a56;

      .add-comment {
        padding-left: 10px;
        color: #8091a5;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          color: deepskyblue;
        }
      }
    }

    .comment-items {
      .comment-item {
        display: flex;
        flex-direction: row;
        margin-bottom: 8px;

        .left {
          padding: 8px 4px;

          img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
          }
        }

        .right {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-left: 5px;

          .comment-info {
            padding: 8px 0;
            font-size: 12px;
            font-weight: 500;
            color: #3f4a56;

            .comment-time-point {
              margin: 0 0 5px 0;
              display: inline-block;

              .real-name {
                margin-right: 10px;
              }

              .role-name {
                margin-right: 10px;
              }

              .create-date {
                margin-right: 10px;
              }
            }

            .comment-copy-to {
              padding-left: 20px;
            }
          }

          .comment-content {
            font-size: 12px;
            color: #3f4a56;

            /deep/ p {
              margin: 0;
            }
          }

          .comment-details {
            width: 100%;
          }

          .comment-copy-to-users {
            margin: 8px 0;
            display: flex;
            flex-direction: row;
            height: 28px;
            line-height: 28px;
            align-items: center;

            &-title {
              font-weight: 700;
              vertical-align: middle;
              font-size: 14px;
              color: #606266;
              line-height: 40px;
              padding: 0 12px 0 0;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
            }
          }
        }
      }
    }
  }

  .work-order-next {
    .work-order-title {
      font-size: 16px;
      color: #3f4a56;
      font-weight: bold;
      padding-left: 20px;
    }

    .work-order-next-content {
      width: 100%;
    }
  }

  .submit-form {
    width: 100%;
    height: 80px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .submit-form-left {
      margin-right: 40px;
    }
  }

  .work-order-detail-block {
    padding: 0 20px;
    margin-bottom: 20px;

    .detail-desc-title {
      margin: 0 0 10px 0;
      color: #365638;
      /*border-bottom: 1px dotted #ececec;*/

      .desc {
        height: 29px;
        line-height: 29px;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          color: deepskyblue;
        }
      }

      .between-desc-history {
        padding: 5px;
      }

      .history {
        height: 29px;
        line-height: 29px;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          color: deepskyblue;
        }
      }

      .active {
        /*color: blue;*/
        font-size: 16px;
        font-weight: bold;

        &:hover {
          color: #365638;
        }
      }
    }

    .detail-content {
      font-size: 14px;

      &.detail-change-content {
        display: flex;
        flex-direction: column;
        width: 100%;

        /deep/ .el-table {

          th {
            background-color: #e4e5b2;
            color: #4c4c4c;
          }
        }

        .row {
          font-size: 14px;
          color: #365638;
          margin: 0 8px;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }

        .title {
          font-weight: bold;
        }

        .col {
          display: inline-block;
          text-align: center;
          line-height: 18px;

          &.col-1 {
            width: 180px;
          }

          &.col-2 {
            width: 120px;
          }

          &.col-3 {
            width: 120px;
          }

          &.col-4 {
            width: 200px;
          }

          &.col-5 {
            width: 200px;
          }

          &.col-6 {
            flex: 1;
          }
        }
      }

      .no-change-record {
        height: 60px;
        line-height: 60px;
        color: #ececec;
        font-size: 12px;
        white-space: nowrap;
        text-align: center;
      }
    }
  }
}
</style>
