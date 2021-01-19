import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../views/layout/Layout'
import AppMain from '@/views/layout/components/AppMain'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

// 处理重复路由报错的问题
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRoutes = [
  { path: '/login', name: 'Login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/potential/:item(\\w+)/:status(\\d+)', component: () => import('@/views/login/potential'), hidden: true },
  { path: '/404', name: 404, component: () => import('@/views/404'), hidden: true },
  {
    path: '/space',
    component: Layout,
    name: 'Space',
    hidden: true,
    redirect: 'profile',
    meta: { title: '用户空间', icon: 'information' },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        hidden: true,
        component: () => import('@/views/users/space/profile'),
        meta: { title: '个人信息', showNavbar: false, hide: true, icon: 'profile' }
      },
      {
        path: 'modified-password',
        name: 'ModifiedPassword',
        hidden: true,
        component: () => import('@/views/users/space/modified_password'),
        meta: { title: '修改用户密码', showNavbar: false, hide: true, icon: 'profile' }
      },
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/login/no_nav'),
        hidden: true,
        meta: { title: '欢迎使用格雷盒子后台管理系统', keepAlive: true, showNavbar: false, hide: true, icon: 'profile' }
      },
      {
        path: '/m/welcome',
        name: 'M-Welcome',
        component: () => import('@/views/login/no_nav'),
        hidden: true,
        meta: { title: '欢迎使用格雷盒子后台管理系统', keepAlive: true, showNavbar: true, hide: true, icon: 'profile' }
      }
    ]
  },
  { path: '/', redirect: '/welcome', name: 'HomePage', hidden: true }
  // { path: '*', name: '页面找不到了...', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    name: 'Dashboard',
    meta: { title: '控制面板', icon: 'dashboard', noCache: true },
    children: [
      {
        path: 'homepage',
        // component: () => import('@/views/homepage'),
        component: () => import('@/views/homepage-backup'),
        name: 'Homepage',
        meta: { title: '首页', icon: 'homepage', noCache: true, pid: '20001' }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    name: 'UserManagement',
    redirect: '/users/information',
    alwaysShow: true,
    meta: { title: '用户管理', icon: 'information', pid: '20002' },
    children: [
      {
        path: 'information',
        name: 'PatriarchInformationManagement',
        component: () => import('@/views/users/patriarch'),
        meta: { title: '家长信息管理', icon: 'parents', pid: '20003' }
      },
      {
        path: 'children',
        name: 'ChildrenInformationManagement',
        component: () => import('@/views/users/kids'),
        meta: { title: '孩子信息管理', icon: 'kids', pid: '20004' }
      },
      {
        path: 'details/:pid',
        name: 'UserDetails',
        hidden: true,
        component: () => import('@/views/users/details'),
        meta: { title: '用户详细信息', hide: true, icon: 'form', pid: '20074' }
      },
      {
        path: 'order-list',
        name: 'OrderManagement',
        component: () => import('@/views/users/order_list'),
        meta: { title: '订单管理', icon: 'form', pid: '20006' }
      },
      {
        path: 'devices-manage',
        name: 'DeviceManagement',
        component: () => import('@/views/users/devices_manage'),
        meta: { title: '设备信息管理', icon: 'devices_manage', pid: '20092' }
      },
      {
        path: 'devices-record',
        name: 'DeviceRecord',
        component: () => import('@/views/users/devices_record'),
        meta: { title: '设备使用记录', icon: 'devices_record', pid: '20094' }
      },
      {
        path: 'logs',
        name: 'Logs',
        component: () => import('@/views/users/logs'),
        meta: { title: '用户日志查询', icon: 'logs', pid: '20112' }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    name: 'UserDataAnalysis',
    redirect: '/data/analysis',
    alwaysShow: true,
    meta: { title: '用户数据分析', icon: 'analysis', pid: '20095' },
    children: [
      {
        path: 'analysis',
        name: 'PatriarchSummaryDataAnalysis',
        component: () => import('@/views/analysis/patriarch'),
        meta: { title: '家长端总体数据', icon: 'analysis_patriarch', pid: '20012' }
      },
      {
        path: 'children',
        name: 'ChildrenSummaryDataAnalysis',
        component: () => import('@/views/analysis/kids'),
        meta: { title: '孩子端总体数据', icon: 'analysis_kids', pid: '20014' }
      },
      {
        path: 'unbind',
        name: 'UnbindReasonStatistics',
        component: () => import('@/views/analysis/unbind_statistics'),
        meta: { title: '解绑原因统计', icon: 'unbind', pid: '20116' }
      },
      {
        path: 'user/detail/:pid',
        name: 'UserDetailsShadow',
        hidden: true,
        component: () => import('@/views/users/details'), // 与用户管理的页面保持一致
        meta: { title: '用户详细信息', hide: true, icon: 'form', pid: '20074' }
      },
      {
        path: 'user/channel',
        name: 'UserChannel',
        component: () => import('@/views/users/channel'),
        meta: { title: '渠道数据', hide: true, icon: 'form', pid: '21010' }
      },
      {
        path: 'user/channel/detail',
        name: 'UserChannelDetail',
        hidden: true,
        component: () => import('@/views/users/channel-detail'),
        meta: { title: '渠道明细', hide: true, icon: 'form', pid: '' }
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    name: 'MemberManagement',
    redirect: '/member/packages',
    alwaysShow: true,
    meta: { title: '会员管理', icon: 'member', pid: '20016' },
    children: [
      {
        path: 'packages',
        name: 'MemberPlanManagement',
        component: () => import('@/views/member/packages'),
        meta: { title: '会员套餐管理', icon: 'packages', pid: '20017' }
      },
      {
        path: 'activity',
        name: 'MemberActivityManagement',
        component: () => import('@/views/member/activity'),
        meta: { title: '会员活动管理', icon: 'activity', pid: '20022' }
      },
      {
        path: 'details',
        name: 'ActivityDetailInformation',
        hidden: true,
        component: () => import('@/views/member/details'),
        meta: { title: '活动详细信息', icon: 'details', pid: '20025' }
      }
    ]
  },
  {
    path: '/push/',
    component: Layout,
    name: 'ShortMessagePush',
    redirect: '/push/sms',
    alwaysShow: true,
    meta: { title: '短信记录', icon: 'message_push', pid: '20026' },
    children: [
      {
        path: 'sms',
        name: 'SMSPush',
        component: () => import('@/views/push/message_sms'),
        meta: { title: '文本短信', icon: 'txt_message', pid: '20027' }
      },
      {
        path: 'voice',
        name: 'VoicePush',
        component: () => import('@/views/push/message_voice'),
        meta: { title: '语音短信', icon: 'voice_message', pid: '20028' }
      }
    ]
  },
  {
    path: '/app/recommend',
    component: Layout,
    name: 'ApplicationRecommend',
    redirect: '/app/recommend/index',
    alwaysShow: true,
    meta: { title: '应用推荐管理', icon: 'apply', pid: '20029' },
    children: [
      {
        path: 'index',
        name: 'RecommendedApplications',
        component: () => import('@/views/recommend/index'),
        meta: { title: '推荐应用', icon: 'give', pid: '20030' }
      },
      {
        path: 'combination',
        name: 'ApplicationCombination',
        component: () => import('@/views/recommend/combination'),
        meta: { title: '推荐应用组合', icon: 'combine', pid: '20032' }
      },
      {
        path: 'special_topic',
        name: 'RecommendedApplicationTopics',
        component: () => import('@/views/recommend/special_topic'),
        meta: { title: '推荐应用专题', icon: 'special_topic', pid: '20034' }
      }
    ]
  },
  {
    path: '/work-orders-system',
    component: Layout,
    name: 'workOrdersSystem',
    redirect: '/work-orders-system/summaries',
    alwaysShow: true,
    meta: { title: '客服工单系统', icon: 'work_orders_system', pid: '20101' },
    children: [
      {
        path: 'summaries',
        name: 'workOrdersSystemSummaries',
        component: () => import('@/views/workOrdersSystem/index'),
        meta: { title: '工单首页', icon: 'customer_service', pid: '20102' }
      },
      {
        path: 'my',
        name: 'MyWorkOrdersSystem',
        component: () => import('@/views/workOrdersSystem/create_work_orders'),
        meta: { title: '我创建的工单', icon: 'create_work_orders', pid: '20104' }
      },
      {
        path: 'notices',
        name: 'RecommendedApplicationPortfolio',
        component: () => import('@/views/workOrdersSystem/notices'),
        meta: { title: '抄送我的工单', icon: 'notice_work_orders', pid: '20107' }
      },
      {
        path: 'acceptance',
        name: 'AcceptanceWorkOrdersSystem',
        component: () => import('@/views/workOrdersSystem/acceptance'),
        meta: { title: '我受理的工单', icon: 'acceptance_work_orders', pid: '20108' }
      },
      {
        path: 'tags',
        name: 'WorkOrdersSystemTagsManagement',
        component: () => import('@/views/workOrdersSystem/tags'),
        meta: { title: '工单标签管理', icon: 'work_orders_tags', pid: '20109' }
      }
    ]
  },
  // {
  //   path: '/app/sales',
  //   component: Layout,
  //   name: 'SalesManagement',
  //   redirect: '/app/sales/seller',
  //   meta: { title: '销售管理', icon: 'sales' },
  //   children: [
  //     {
  //       path: 'seller',
  //       name: 'SalesmanManagement',
  //       component: () => import('@/views/sales/seller'),
  //       meta: { title: '销售员管理', icon: 'seller' }
  //     },
  //     {
  //       path: 'sales_order',
  //       name: 'SalesOrderManagement',
  //       component: () => import('@/views/sales/sales_order'),
  //       meta: { title: '销售订单管理', icon: 'sales_order' }
  //     }
  //   ]
  // },
  {
    path: '/app/activity',
    component: Layout,
    name: 'ActivityManagement',
    alwaysShow: true,
    redirect: '/app/activity/invatation',
    meta: { title: '活动管理', icon: 'activity', pid: '20036' },
    children: [
      // {
      //   path: 'list',
      //   name: 'EventsManagement',
      //   component: () => import('@/views/activity/index'),
      //   meta: { title: '活动项管理', icon: 'activity_list' }
      // },
      {
        path: 'invatation',
        name: 'InvatationFriends',
        component: () => import('@/views/activity/invatation'),
        meta: { title: '邀请好友', icon: 'invatation', pid: '20037' }
      },
      // 列表
      {
        path: 'invatationV2',
        name: 'InvatationFriendsV2',
        hidden: false,
        component: () => import('@/views/activity/invatation-v2/invatation-v2.page'),
        meta: { title: '邀请好友-新版', icon: 'invatation', pid: '21018' }
      },
      {
        path: 'invatationV2-join-detail',
        name: 'InvatationFriendsV2JoinDetail',
        hidden: true,
        component: () => import('@/views/activity/invatation-v2/invatation-v2-join-detail.page'),
        meta: { title: '邀请好友-新版', icon: 'invatation', pid: '' }
      },
      {
        path: 'invatationV2-data-detail',
        name: 'InvatationFriendsV2DataDetail',
        hidden: true,
        component: () => import('@/views/activity/invatation-v2/invatation-v2-data-detail.page'),
        meta: { title: '邀请好友-新版', icon: 'invatation', pid: '' }
      },
      {
        path: 'invatationV2-action',
        name: 'InvatationFriendsV2Action',
        hidden: true,
        component: () => import('@/views/activity/invatation-v2/invatation-v2-action.page'),
        meta: { title: '邀请好友-新版', icon: 'invatation', pid: '' }
      },
      {
        path: 'invatationV2-detail',
        name: 'InvatationFriendsV2Detail',
        hidden: true,
        component: () => import('@/views/activity/invatation-v2/invatation-v2-detail.page'),
        meta: { title: '邀请好友-新版', icon: 'invatation', pid: '' }
      },
      {
        path: 'invatation/details',
        name: 'InvatationFriendsConfiguration',
        component: () => import('@/views/activity/invatation_details'),
        hidden: true,
        meta: { title: '邀请好友配置', icon: 'invatation_user', pid: '20039' }
      },
      {
        path: 'new-user-with-7-days-clock',
        name: 'NewserWithSevenSigned',
        component: () => import('@/views/activity/seven_days_clock'),
        meta: { title: '新用户7天签到数据', icon: 'signed', pid: '20115' }
      },
      {
        path: 'topic',
        name: 'activity-topic',
        hidden: false, // 745
        component: () => import('@/views/activity/topic'),
        meta: { title: '话题首页', icon: 'topic', pid: '21004' }
      },
      {
        path: 'topic-action',
        name: 'activity-topic-action',
        hidden: true,
        component: () => import('@/views/activity/topic-action'),
        meta: { title: '话题创建', icon: 'signed', pid: '21005' }
      },
      {
        path: 'topic-update',
        name: 'activity-topic-update',
        hidden: true,
        component: () => import('@/views/activity/topic-action'),
        meta: { title: '话题编辑', icon: 'signed', pid: '21006' }
      },
      {
        path: 'topic-join-detail',
        name: 'activity-topic-join-detail',
        hidden: true,
        component: () => import('@/views/activity/topic-join-detail'),
        meta: { title: '参与详情', icon: 'signed', pid: '21007' }
      }
      // {
      //   path: 'props',
      //   name: 'ActivityPropManagement',
      //   component: () => import('@/views/activity/props'),
      //   meta: { title: '活动道具管理', icon: 'activity_props' }
      // }
    ]
  },
  {
    path: '/toolbox',
    component: Layout,
    name: 'ToolboxManagement',
    redirect: '/toolbox/helper',
    alwaysShow: true,
    meta: { title: '工具使用', icon: 'tools', hidden: false, pid: '20042' },
    children: [
      {
        path: 'helper',
        name: 'HelperCenter',
        component: () => import('@/views/toolbox/helper'),
        meta: { title: '帮助中心', icon: 'helper', pid: '20043' }
      },
      {
        path: 'promotion',
        name: 'ApplicationUpgrade',
        component: () => import('@/views/toolbox/promotion'),
        meta: { title: '应用升级', icon: 'promotion', pid: '20047' }
      },
      {
        path: 'advertisement',
        name: 'AdvertisingConfiguration',
        component: () => import('@/views/toolbox/advertisement'),
        meta: { title: '广告配置', icon: 'advertisement', pid: '20052' }
      },
      {
        path: 'version-list',
        name: 'VersionManagement',
        component: () => import('@/views/toolbox/version_manager'),
        meta: { title: '版本管理', icon: 'version', pid: '20058' }
      },
      {
        path: 'configuration',
        name: 'DataDictionary',
        alwaysShow: true,
        component: AppMain,
        redirect: '/toolbox/configuration/system_parameter',
        meta: { title: '数据字典', icon: 'system_configure' },
        children: [
          {
            path: 'system_parameter',
            name: 'SystemParameters',
            component: () => import('@/views/system/system_parameter'),
            meta: { title: '系统参数', icon: 'system_parameter', pid: '20059' }
          },
          // {
          //   path: 'software_policy',
          //   name: 'SoftwareStrategyTable',
          //   component: () => import('@/views/system/software_policy'),
          //   meta: { title: '软件策略表', icon: 'software_policy' }
          // },
          {
            path: 'high_risk_application',
            name: 'HighRiskApplicationTable',
            component: () => import('@/views/system/high_risk_application'),
            meta: { title: '高危应用表', icon: 'high_risk_application', pid: '20061' }
          },
          {
            path: 'miniprogram-apps',
            name: 'AppletControl',
            component: () => import('@/views/system/miniprogram_apps'),
            meta: { title: '小程序管控', icon: 'mini_program_apps', pid: '20086' }
          },
          {
            path: 'device-rule',
            name: 'deviceRule',
            component: () => import('@/views/toolbox/device-rule/device-rule.vue'),
            meta: { title: '设备权限管理', icon: 'device-rule', pid: '' }
          }
        ]
      },
      {
        path: 'business-cooperation',
        name: 'BusinessCooperationRegistrationPage',
        component: () => import('@/views/toolbox/business_cooperation'),
        meta: { title: '商务合作注册页', icon: 'business_cooperation', pid: '20063' }
      },
      {
        path: 'push-notification',
        name: 'push-notification',
        hidden: false, // 745
        component: () => import('@/views/toolbox/push-notification/push-notification'),
        meta: { title: 'PUSH通知管理', icon: 'push', pid: '21000' }
      },
      // 列表
      {
        path: 'exchange',
        name: 'exchange-code',
        hidden: false,
        component: () => import('@/views/exchange/exchange.page'),
        meta: { title: '兑换码', icon: 'exchange', pid: '21011' }
      },
      {
        path: 'exchange-detail',
        name: 'exchange-detail',
        hidden: true,
        component: () => import('@/views/exchange/exchange-detail.page'),
        meta: { title: '兑换码', icon: 'invatation', pid: '' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'SystemManagement',
    redirect: '/system/account-management',
    alwaysShow: true,
    meta: { title: '系统管理', icon: 'system', pid: '20065' },
    children: [
      {
        path: 'account-management',
        name: 'AccountManagement',
        component: () => import('@/views/system/account_management'),
        meta: { title: '账户管理', icon: 'account_management', pid: '20066' }
      },
      {
        path: 'role-management',
        name: 'RoleManagement',
        component: () => import('@/views/system/role_management'),
        meta: { title: '角色管理', icon: 'role_management', pid: '20071' }
      }
    ]
  },
  {
    path: '/work-order-details',
    name: 'WorkOrdersSystemDetails',
    // hidden: true,
    component: () => import('@/views/workOrdersSystem/work_order_details'),
    meta: { title: '工单详情页', icon: 'work_order_details' } // 用户有访问权限，但是无操作权限
  }
]

export const delayLoadRoutes = [
  { path: '*', redirect: '/welcome', name: 'AllDefault', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  base: '/gelei-guard-bms',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
