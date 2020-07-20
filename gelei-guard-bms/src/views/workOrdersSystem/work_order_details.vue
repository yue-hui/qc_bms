<template>
  <div class="work-order-details">
    <!--    <div class="page-header">-->
    <!--      <el-page-header :content="page_header_content" @back="goBack" />-->
    <!--    </div>-->
    <div class="form-diviser">创建工单</div>
    <el-form ref="form" size="mini" label-suffix=":" label-width="110px" label-position="left">
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
              <span v-else-if="['3'].indexOf(action) !== -1" class="label-text">{{ forms.applicant_id }}</span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <div class="form-diviser">工单信息</div>
      <el-row :gutter="24" class="form-row">
        <el-col :xs="22" :sm="16" :md="14" :lg="12" :xl="8" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="工单标题">
              <el-autocomplete
                v-if="['1', '2'].indexOf(action) !== -1"
                v-model="forms.ticket_title"
                :maxlength="30"
                :fetch-suggestions="fetch_work_order_titles"
                style="width: 100%;"
                placeholder="请选择工单标题" />
              <span v-if="['3'].indexOf(action) !== -1" class="label-text">{{ forms.ticket_title }}</span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="form-row">
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="终端类型">
              <el-select
                v-if="['1', '2'].indexOf(action) !== -1"
                v-model="forms.device_type"
                size="mini"
                style="width: 100%;"
                placeholder="请选择终端类型"
                clearable
                @change="change_terminal_type">
                <el-option
                  v-for="item in terminal_types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
              <span v-if="['3'].indexOf(action) !== -1" class="label-text">{{ forms.device_type }}</span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="form-row">
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="工单类别">
              <el-select
                v-if="['1', '2'].indexOf(action) !== -1"
                v-model="forms.ticket_type_id"
                :disabled="ticket_type_disabled"
                size="mini"
                placeholder="请选择工单类别"
                clearable
                @change="change_ticket_type">
                <el-option
                  v-for="item in ticket_types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
              <span v-if="['3'].indexOf(action) !== -1" class="label-text">{{ forms.ticket_type_id }}</span>
            </el-form-item>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="问题分类">
              <el-select
                v-if="['1', '2'].indexOf(action) !== -1"
                v-model="forms.question_type_id"
                :disabled="question_type_disabled"
                size="mini"
                placeholder="请选择问题分类"
                clearable
                @change="change_question_types">
                <el-option
                  v-for="item in question_types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
              <span v-if="['3'].indexOf(action) !== -1" class="label-text">{{ forms.question_type_id }}</span>
            </el-form-item>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="问题细分">
              <el-select
                v-if="['1', '2'].indexOf(action) !== -1"
                v-model="forms.question_detail_id"
                :disabled="question_detail_disabled"
                size="mini"
                placeholder="请选择问题细分"
                clearable
                @change="search">
                <el-option
                  v-for="item in question_detail_types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
              <span v-if="['3'].indexOf(action) !== -1" class="label-text">{{ forms.question_detail_id }}</span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="form-row">
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="紧急程度">
              <el-select
                v-if="['1', '2'].indexOf(action) !== -1"
                v-model="forms.degree"
                size="mini"
                placeholder="请选择紧急程度"
                clearable
                @change="search">
                <el-option
                  v-for="item in urgency_degrees"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
              <span v-if="['3'].indexOf(action) !== -1" class="label-text">{{ forms.degree }}</span>
            </el-form-item>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="工单来源">
              <el-select
                v-if="['1', '2'].indexOf(action) !== -1"
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
              <span v-if="['3'].indexOf(action) !== -1" class="label-text">{{ forms.ticket_source }}</span>
            </el-form-item>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item :label="communication_method">
              <el-input
                v-if="['1', '2'].indexOf(action) !== -1"
                v-model="forms.ticket_source_details"
                :maxlength="11"
                size="mini"
                clearable
                placeholder="请输入微信号" />
              <span v-if="['3'].indexOf(action) !== -1" class="label-text">{{ forms.ticket_source_details }}</span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <div class="form-diviser mt-10">家长信息</div>
      <div class="form-row">
        <el-row :gutter="24">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="手机号">
                <el-input
                  v-if="['1'].indexOf(action) !== -1"
                  v-model="forms.patriarch_phone"
                  maxlength="11"
                  size="mini"
                  clearable
                  placeholder="请输入手机号"
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
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.p_device_type_label }}</span>
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
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ patriarch_info.p_member_type }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.p_member_type }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="会员有效天数">
                <span v-if="['1'].indexOf(action) !== -1" class="label-text">{{ patriarch_info.p_valid_days }} 天</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.p_valid_days }} 天</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-form-item label="用户来源">
                <span
                  v-if="['1'].indexOf(action) !== -1"
                  class="label-text">{{ patriarch_info.p_reg_from_label }}</span>
                <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.p_reg_from_label }}</span>
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
      </div>

      <div class="form-diviser mt-10">
        <el-dropdown v-if="['1'].indexOf(action) !== -1" @command="change_child">
          <span class="el-dropdown-link">孩子 {{ current_child.c_nick_name }}<i
            class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(chlid, index) in patriarch_info.chlid_list"
              :command="chlid.c_user_id"
              :key="index">
              {{ chlid.c_nick_name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div v-if="['2', '3'].indexOf(action) !== -1" class="child-nick-name">孩子 {{ forms.c_nick_name }}</div>
      </div>
      <el-row :gutter="24" class="form-row">
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
      <el-row :gutter="24" class="form-row">
        <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="绑定设备">
              <el-select
                v-if="['1'].indexOf(action) !== -1"
                v-model="forms.device"
                size="mini"
                placeholder="请选择绑定设备"
                clearable
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
              <span v-if="['2', '3'].indexOf(action) !== -1" class="label-text">{{ forms.c_device_type_label }}</span>
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

      <div class="form-diviser mt-10">工单详情</div>
      <el-row :gutter="24" class="form-row">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="问题描述">
              <tinymce
                v-if="['1', '2'].indexOf(action) !== -1"
                v-model="forms.problem_description"
                :height="200"
                class="question-details" />
              <div v-if="['3'].indexOf(action) !== -1" v-html="forms.problem_description" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="col-bg">
          <div class="grid-content bg-purple">
            <el-form-item label="处理人">
              <el-select
                v-if="['1', '2'].indexOf(action) !== -1"
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
              <span v-if="['3'].indexOf(action) !== -1" class="label-text">{{ forms.assigned_ao_name }}</span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <!--评论-->
      <div v-if="['3'].indexOf(action) !== -1" class="comment-block">
        <hr class="comment">
        <p class="comment-title">评论 <span class="add-comment">+ 评论</span></p>
        <div class="comment-items">
          <div class="comment-item">
            <div class="left">
              <img src="../../assets/imgs/logo.png" alt="">
            </div>
            <div class="right">
              <div class="comment-info">
                <span class="comment-time-point">大白菜 运营部 2020-05-28 19:58</span>
                <span class="comment-copy-to">抄送：张三、李四</span>
              </div>
              <div class="comment-content">
                <p>数据统计不准确是因为统计了自由可用的应用。</p>
              </div>
              <tinymce
                v-model="comment"
                :height="200"
                :toolbar="['']"
                menubar=""
                class="comment-details" />
              <div class="comment-copy-to-users">
                <div class="comment-copy-to-users-title">抄送谁看:</div>
                <el-select v-model="comment_users" size="mini" placeholder="抄送谁看">
                  <el-option
                    v-for="user in comment_and_copy_users"
                    :key="user.value"
                    :label="user.label"
                    :value="user.value" />
                </el-select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--工单处理-->
      <div v-if="['3'].indexOf(action) !== -1" class="work-order-next">
        <p class="work-order-title">工单处理</p>
        <div class="work-order-next-content">
          <div class="work-order-header">
            <div class="header-items">
              <div class="header-item">
                <div class="item-title">处理人:</div>
                <div class="item-form">
                  <el-select v-model="comment_users" size="mini" placeholder="请填写处理人">
                    <el-option
                      v-for="user in handler_users"
                      :key="user.value"
                      :label="user.label"
                      :value="user.value" />
                  </el-select>
                </div>
              </div>
              <div class="header-item">
                <div class="item-title">当前状态:</div>
                <div class="item-form">
                  <el-select v-model="current_work_orders_status" size="mini" placeholder="请选择当前状态">
                    <el-option
                      v-for="status in work_orders_status"
                      :key="status.value"
                      :label="status.label"
                      :value="status.value" />
                  </el-select>
                </div>
              </div>
              <div class="header-item">
                <div class="item-title">问题归类:</div>
                <div class="item-form">
                  <el-select v-model="work_orders_state" size="mini" placeholder="请选择问题归类">
                    <el-option
                      v-for="status in work_orders_question_classifies"
                      :key="status.value"
                      :label="status.label"
                      :value="status.value" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>
          <div class="work-order-content">
            <div class="order-content-label">评论:</div>
            <div class="order-content-content">
              <el-input auto-complete="on" type="textarea" row="3" style="width: 100%;" />
            </div>
          </div>
        </div>
      </div>

      <!--历史关联工单-->
      <div class="form-diviser mt-10">历史关联工单</div>
      <p v-for="(history, index) in histories" :key="index" class="history-work-order-item"><a
        :href="history.ticket_id">{{ history.content }} - {{ history.timestamp }}</a></p>

    </el-form>
    <div class="submit-form">
      <el-button size="mini" class="submit-form-left" @click="cancel">返 回</el-button>
      <gl-button pid="10043" size="mini" type="primary" @click="submit">提 交</gl-button>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { mapGetters } from 'vuex'
import {
  create_work_order,
  get_work_order_tags_by_cascade,
  query_manager_ticket_title,
  query_patriarch_details_by_phone,
  query_ticket_info, query_users_by_associated_type
} from '@/api/work_order_system'
import {
  COMMUNICATION_METHODS,
  DATE_TIME_FORMAT,
  TERMINAL_TYPES,
  URGENCY_DEGREES, WORK_ORDERS_QUESTION_CLASSIFIES, WORK_ORDERS_STATUS
} from '@/utils/constant'
import { date_formatter } from '@/utils/common'

export default {
  name: 'WorkOrdersDetails',
  components: {
    Tinymce
  },
  data() {
    return {
      page_header_content: '创建工单',
      action: this.$route.query.action, // 1 创建 2 编辑 3 正常处理流程
      ticket_id: this.$route.query.ticket_id,
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
        patriarch_phone: '',
        p_user_id: '',
        c_user_id: '',
        c_device_id: '',
        assigned_ao_id: '',
        problem_description: ''
      },
      histories: [
        {
          timestamp: '2020.07.11 18:20',
          content: '指令发送不成功',
          ticket_id: 1
        },
        {
          timestamp: '2020.05.11 18:20',
          content: '数据统计不准确',
          ticket_id: 1
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['name', 'real_name', 'role_name'])
  },
  mounted: async function() {
    if (this.action === '1') {
      this.fetch_work_order_titles()
      this.fetch_terminal_types()
    }
    if (['2'].indexOf(this.action) !== -1) {
      await this.fetch_ticket_info()
      await this.fetch_terminal_types(false)
      await this.change_terminal_type(false)
      await this.change_ticket_type(false)
      await this.change_question_types(false)
    }
    if (['3'].indexOf(this.action) !== -1) {
      await this.fetch_ticket_info()
    }
    if (['1', '2', '3'].indexOf(this.action) !== -1) {
      this.fetch_acceptors()
      this.fetch_comment_users()
    }
  },
  methods: {
    goBack: function() {
      console.log('go back')
    },
    get_form_data() {
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
    submit: function() {
      const config = this.get_form_data()
      console.log('submit: ', config)
      // 创建工单
      create_work_order(config).then(res => {
        console.log('create_work_order: ', res)
        // window.close()
      })
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
    get_bind_type_name: function(bind_type) {
      if (bind_type === '1') {
        return '绑定中'
      } else if (bind_type === '0') {
        return '已解绑'
      } else {
        return '绑定中'
      }
    },
    change_child: function(child_id) {
      const child = this.patriarch_info.chlid_list.find(r => r.c_user_id === child_id)
      this.current_child = child || {}
      this.forms.c_user_id = this.current_child.c_user_id
      const child_device_list = child.c_device_list || []
      this.child_device_list = child_device_list.map(r => {
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
      console.log('child_device_list: ', child, child_device_list, this.child_device_list)
    },
    change_child_device: function(device_id) {
      const device = this.child_device_list.find(r => r.c_device_id === device_id)
      this.current_device = device || {}
      console.log('change_child_device: ', this.current_device)
      this.forms.c_device_id = this.current_device.c_device_id
    },
    patriarch_phone_change: function() {
      // 改变家长端手机号
      const phone = this.forms.patriarch_phone
      if (phone && phone.length === 11) {
        const config = { phone }
        query_patriarch_details_by_phone(config).then(res => {
          if (res.status === 0) {
            this.patriarch_info = res.data
            if (res.data.p_user_id) {
              this.patriarch_info.p_create_time = date_formatter(this.patriarch_info.p_create_time, DATE_TIME_FORMAT)
              this.patriarch_info.chlid_list = this.patriarch_info.c_user_list.map(r => {
                const c_create_time = date_formatter(r.c_create_time, DATE_TIME_FORMAT)
                return {
                  ...r,
                  c_create_time
                }
              })
              this.forms.p_user_id = this.patriarch_info.p_user_id
            } else {
              this.forms.p_user_id = ''
            }
          } else {
            this.patriarch_info = {}
            this.$message.error(res.message)
          }
        })
      }
    },
    change_question_types: async function(clear_data = true) {
      // 问题分类
      // 改变 工单类别
      const question_type_id = this.forms.question_type_id
      this.question_detail_types = await this.fetch_ticket_label_types(question_type_id)
      this.forms.question_detail_id = ''
      this.question_detail_disabled = false
      if (clear_data) {
        this.forms.question_detail_id = ''
      }
    },
    change_ticket_type: async function(clear_data = true) {
      // 改变 工单类别
      const ticket_type_id = this.forms.ticket_type_id
      console.log('ticket_type_id: ', ticket_type_id, this.forms)
      this.question_types = await this.fetch_ticket_label_types(ticket_type_id)
      this.forms.question_type_id = ''
      this.question_type_disabled = false
      this.forms.question_detail_id = ''
      this.question_detail_types = []
      this.question_detail_disabled = true
      if (clear_data) {
        this.forms.question_type_id = ''
        this.forms.question_detail_id = ''
      }
    },
    change_terminal_type: async function(clear_data = true) {
      // 改变 终端类型
      const device_type = this.forms.device_type
      console.log('change_terminal_type: ', this.forms.device_type)
      this.ticket_types = await this.fetch_ticket_label_types(device_type)
      this.forms.ticket_type_id = ''
      this.ticket_type_disabled = false
      this.forms.question_type_id = ''
      this.question_types = []
      this.question_type_disabled = true
      this.forms.question_detail_id = ''
      this.question_detail_types = []
      this.question_detail_disabled = true
      if (clear_data) {
        this.forms.ticket_type_id = ''
        this.forms.question_type_id = ''
        this.forms.question_detail_id = ''
      }
    },
    fetch_terminal_types: async function(clear_data = true) {
      // 首次加载 终端类型
      this.terminal_types = await this.fetch_ticket_label_types()
      this.ticket_type_disabled = true
      this.question_types = []
      this.question_type_disabled = true
      this.question_detail_types = []
      this.question_detail_disabled = true
      if (clear_data) {
        this.forms.ticket_type_id = ''
        this.forms.question_type_id = ''
        this.forms.question_detail_id = ''
      }
    },
    fetch_ticket_label_types: function(type_id = 0) {
      // 按级获取工单标签
      return new Promise((resolve) => {
        const config = {
          type_id
        }
        get_work_order_tags_by_cascade(config).then(res => {
          if (res.status === 0) {
            const remote_data = res.data.map(r => {
              return {
                ...r,
                value: r.id,
                label: r.type_name
              }
            })
            resolve(remote_data)
          }
        })
      })
    },
    fetch_work_order_titles: function() {
      // 工单标题
      const config = {
        title_name: this.forms.ticket_title
      }
      query_manager_ticket_title(config).then(res => {
        //
        if (res.status === 0) {
          this.work_order_titles = res.data
        }
      })
    },
    fetch_comment_users: async function() {
      this.comment_and_copy_users = await this.fetch_users_by_associated_type('02')
    },
    fetch_acceptors: async function() {
      this.handler_users = await this.fetch_users_by_associated_type('01')
    },
    fetch_users_by_associated_type: function(associated_type) {
      // associated_type: 01处理人 02@我的人 03转交过的用户
      return new Promise(resolve => {
        const config = {
          associated_type
        }
        query_users_by_associated_type(config).then(res => {
          if (res.status === 0) {
            const remote_data = res.data.map(r => {
              return {
                ...r,
                value: r.user_id,
                label: r.real_name
              }
            })
            resolve(remote_data)
          }
          resolve([])
        }).catch(() => {
          resolve([])
        })
      })
    },
    fetch_ticket_info: function() {
      // 工单标题
      const config = {
        ticket_id: this.ticket_id
      }
      query_ticket_info(config).then(res => {
        if (res.status === 0) {
          const remote_data = res.data
          remote_data['c_bind_type'] = this.get_bind_type_name(remote_data.c_bind_type)
          this.forms = remote_data
          console.log('fetch_ticket_info: ', this.forms)
        } else {
          this.$message.error(res.message)
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
  height: 100%;
  /*min-height: 480px;*/
  display: flex;
  flex-direction: column;

  .page-header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 24px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 20px;
    background-color: #a1a1a1;
  }

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

  .form-diviser {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    color: #2c2c2c;
    background-color: #d1d1d1;
    margin-bottom: 20px;
  }

  .question-details {
    width: 100%;
  }

  .history-work-order-item {
    padding-left: 20px;
    color: rgba(0, 17, 255, 0.69);

    a {
      text-decoration: underline;
    }
  }

  .comment-block {
    padding: 20px;

    .comment {
      border: 1px solid #8c8c8c;
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

        .left {
          padding-right: 15px;

          img {
            width: 48px;
            height: 48px;
          }
        }

        .right {
          flex: 1;
          display: flex;
          flex-direction: column;

          .comment-info {
            padding: 8px 0;
            font-size: 14px;
            color: #3f4a56;

            .comment-time-point {
            }

            .comment-copy-to {
              padding-left: 20px;
            }
          }

          .comment-content {
            font-size: 14px;
            color: #3f4a56;
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
    padding: 20px;

    .work-order-title {
      font-size: 16px;
      color: #3f4a56;
      font-weight: bold;
    }

    .work-order-next-content {
      width: 100%;

      .work-order-header {
        font-size: 14px;
        color: #3f4a56;
        font-weight: normal;
        position: relative;

        .header-items {
          display: flex;
          flex-direction: row;

          .header-item {
            display: flex;
            flex-direction: row;
            justify-content: start;
            padding: 10px 10px 10px 0;

            .item-title {
              width: 80px;
              height: 28px;
              line-height: 28px;
              white-space: nowrap;
            }

            .item-form {
              width: 178px;
            }
          }
        }
      }

      .work-order-content {
        width: 100%;
        font-size: 14px;
        color: #3f4a56;
        font-weight: normal;
        position: relative;
        display: flex;
        flex-direction: row;

        .order-content-label {
          width: 80px;
          height: 28px;
          line-height: 28px;
          white-space: nowrap;
        }

        .order-content-content {
          flex: 1;
        }
      }
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
}
</style>
