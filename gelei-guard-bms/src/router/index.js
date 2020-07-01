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
  { path: '/404', component: () => import('@/views/404'), hidden: true },
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
        name: 'welcome',
        component: () => import('@/views/login/no_nav'),
        hidden: true,
        meta: { title: '欢迎使用格雷盒子后台管理系统', keepAlive: true, showNavbar: false, hide: true, icon: 'profile' }
      }
    ]
  },
  { path: '/', redirect: '/welcome', name: 'Default', hidden: true }
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
        component: () => import('@/views/homepage'),
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
        name: '家长信息管理',
        component: () => import('@/views/users/patriarch'),
        meta: { title: '家长信息管理', icon: 'parents', pid: '20003' }
      },
      {
        path: 'children',
        name: '孩子信息管理',
        component: () => import('@/views/users/kids'),
        meta: { title: '孩子信息管理', icon: 'kids', pid: '20004' }
      },
      {
        path: 'details/:pid',
        name: 'user_details',
        hidden: true,
        component: () => import('@/views/users/details'),
        meta: { title: '用户详细信息', hide: true, icon: 'form', pid: '20074' }
      },
      {
        path: 'order-list',
        name: '订单管理',
        component: () => import('@/views/users/order_list'),
        meta: { title: '订单管理', icon: 'form', pid: '20006' }
      },
      {
        path: 'devices-manage',
        name: '设备信息管理',
        component: () => import('@/views/users/devices_manage'),
        meta: { title: '设备信息管理', icon: 'devices_manage', pid: '20092' }
      },
      {
        path: 'devices-record',
        name: '设备使用记录',
        component: () => import('@/views/users/devices_record'),
        meta: { title: '设备使用记录', icon: 'devices_record', pid: '20094' }
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
        name: '家长端总体数据',
        component: () => import('@/views/analysis/patriarch'),
        meta: { title: '家长端总体数据', icon: 'analysis_patriarch', pid: '20012' }
      },
      {
        path: 'children',
        name: '孩子端总体数据',
        component: () => import('@/views/analysis/kids'),
        meta: { title: '孩子端总体数据', icon: 'analysis_kids', pid: '20014' }
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    name: 'MemberManager',
    redirect: '/member/packages',
    alwaysShow: true,
    meta: { title: '会员管理', icon: 'member', pid: '20016' },
    children: [
      {
        path: 'packages',
        name: '会员套餐管理',
        component: () => import('@/views/member/packages'),
        meta: { title: '会员套餐管理', icon: 'packages', pid: '20017' }
      },
      {
        path: 'activity',
        name: '会员活动管理',
        component: () => import('@/views/member/activity'),
        meta: { title: '会员活动管理', icon: 'activity', pid: '20022' }
      },
      {
        path: 'details',
        name: '活动详细信息',
        hidden: true,
        component: () => import('@/views/member/details'),
        meta: { title: '活动详细信息', icon: 'details', pid: '20025' }
      }
    ]
  },
  {
    path: '/push/',
    component: Layout,
    name: 'Push',
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
        name: '推荐应用',
        component: () => import('@/views/recommend/index'),
        meta: { title: '推荐应用', icon: 'give', pid: '20030' }
      },
      {
        path: 'combination',
        name: '推荐应用组合',
        component: () => import('@/views/recommend/combination'),
        meta: { title: '推荐应用组合', icon: 'combine', pid: '20032' }
      },
      {
        path: 'special_topic',
        name: '推荐应用专题',
        component: () => import('@/views/recommend/special_topic'),
        meta: { title: '推荐应用专题', icon: 'special_topic', pid: '20034' }
      }
    ]
  },
  // {
  //   path: '/app/sales',
  //   component: Layout,
  //   name: '销售管理',
  //   redirect: '/app/sales/seller',
  //   meta: { title: '销售管理', icon: 'sales' },
  //   children: [
  //     {
  //       path: 'seller',
  //       name: '销售员管理',
  //       component: () => import('@/views/sales/seller'),
  //       meta: { title: '销售员管理', icon: 'seller' }
  //     },
  //     {
  //       path: 'sales_order',
  //       name: '销售订单管理',
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
      //   name: '活动项管理',
      //   component: () => import('@/views/activity/index'),
      //   meta: { title: '活动项管理', icon: 'activity_list' }
      // },
      {
        path: 'invatation',
        name: '邀请好友数据',
        component: () => import('@/views/activity/invatation'),
        meta: { title: '邀请好友数据', icon: 'invatation', pid: '20037' }
      },
      {
        path: 'invatation/details',
        name: '邀请好友配置',
        component: () => import('@/views/activity/invatation_details'),
        meta: { title: '邀请好友配置', icon: 'invatation_user', pid: '20039' }
      }
      // {
      //   path: 'props',
      //   name: '活动道具管理',
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
        name: '帮助中心',
        component: () => import('@/views/toolbox/helper'),
        meta: { title: '帮助中心', icon: 'helper', pid: '20043' }
      },
      {
        path: 'promotion',
        name: '应用升级',
        component: () => import('@/views/toolbox/promotion'),
        meta: { title: '应用升级', icon: 'promotion', pid: '20047' }
      },
      {
        path: 'advertisement',
        name: '广告配置',
        component: () => import('@/views/toolbox/advertisement'),
        meta: { title: '广告配置', icon: 'advertisement', pid: '20052' }
      },
      {
        path: 'version-list',
        name: '版本管理',
        component: () => import('@/views/toolbox/version_manager'),
        meta: { title: '版本管理', icon: 'version', pid: '20058' }
      },
      {
        path: 'configuration',
        name: '数据字典',
        alwaysShow: true,
        component: AppMain,
        redirect: '/toolbox/configuration/system_parameter',
        meta: { title: '数据字典', icon: 'system_configure' },
        children: [
          {
            path: 'system_parameter',
            name: '系统参数',
            component: () => import('@/views/system/system_parameter'),
            meta: { title: '系统参数', icon: 'system_parameter', pid: '20059' }
          },
          // {
          //   path: 'software_policy',
          //   name: '软件策略表',
          //   component: () => import('@/views/system/software_policy'),
          //   meta: { title: '软件策略表', icon: 'software_policy' }
          // },
          {
            path: 'high_risk_application',
            name: '高危应用表',
            component: () => import('@/views/system/high_risk_application'),
            meta: { title: '高危应用表', icon: 'high_risk_application', pid: '20061' }
          },
          {
            path: 'miniprogram-apps',
            name: '小程序管控',
            component: () => import('@/views/system/miniprogram_apps'),
            meta: { title: '小程序管控', icon: 'mini_program_apps', pid: '20086' }
          }
        ]
      },
      {
        path: 'business-cooperation',
        name: '商务合作注册页',
        component: () => import('@/views/toolbox/business_cooperation'),
        meta: { title: '商务合作注册页', icon: 'business_cooperation', pid: '20063' }
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
        name: 'account-management',
        component: () => import('@/views/system/account_management'),
        meta: { title: '账户管理', icon: 'account_management', pid: '20066' }
      },
      {
        path: 'role-management',
        name: 'role-management',
        component: () => import('@/views/system/role_management'),
        meta: { title: '角色管理', icon: 'role_management', pid: '20071' }
      }
    ]
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
