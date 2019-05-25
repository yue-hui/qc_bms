import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../views/layout/Layout'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

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
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/users',
    component: Layout,
    name: '用户管理',
    redirect: '/users/information',
    alwaysShow: true,
    meta: { title: '用户管理', icon: 'information' },
    children: [
      {
        path: 'information',
        name: '用户信息管理',
        component: () => import('@/views/users/index'),
        meta: { title: '用户信息管理', icon: 'parents' }
      },
      {
        path: 'details',
        name: '用户详细信息',
        hidden: true,
        component: () => import('@/views/users/details'),
        meta: { title: '用户详细信息', hide: true, icon: 'form' }
      },
      {
        path: 'order-list',
        name: '订单管理',
        component: () => import('@/views/users/order_list'),
        meta: { title: '订单管理', icon: 'form' }
      },
      {
        path: 'devices-manage',
        name: '设备信息管理',
        component: () => import('@/views/users/devices_manage'),
        meta: { title: '设备信息管理', icon: 'devices_manage' }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    name: '用户数据分析',
    redirect: '/data/analysis',
    alwaysShow: true,
    meta: { title: '用户数据分析', icon: 'analysis' },
    children: [
      {
        path: 'analysis',
        name: '总体数据',
        component: () => import('@/views/analysis/index'),
        meta: { title: '总体数据', icon: 'summary' }
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    name: '会员管理',
    redirect: '/member/packages',
    alwaysShow: true,
    meta: { title: '会员管理', icon: 'member' },
    children: [
      {
        path: 'packages',
        name: '会员套餐管理',
        component: () => import('@/views/member/packages'),
        meta: { title: '会员套餐管理', icon: 'packages' }
      },
      {
        path: 'activity',
        name: '会员活动管理',
        component: () => import('@/views/member/activity'),
        meta: { title: '会员活动管理', icon: 'activity' }
      },
      {
        path: 'details',
        name: '活动详细信息',
        hidden: true,
        component: () => import('@/views/member/details'),
        meta: { title: '活动详细信息', icon: 'details' }
      }
    ]
  },
  {
    path: '/app/recommend',
    component: Layout,
    name: '应用推荐管理',
    redirect: '/app/recommend/index',
    meta: { title: '应用推荐管理', icon: 'apply' },
    children: [
      {
        path: 'index',
        name: '推荐应用',
        component: () => import('@/views/recommend/index'),
        meta: { title: '推荐应用', icon: 'give' }
      },
      {
        path: 'combination',
        name: '推荐应用组合',
        component: () => import('@/views/recommend/combination'),
        meta: { title: '推荐应用组合', icon: 'combine' }
      }
    ]
  },
  {
    path: '/toolbox',
    component: Layout,
    name: '工具使用',
    redirect: '/toolbox/helper',
    alwaysShow: true,
    meta: { title: '工具使用', icon: 'tools', hidden: false },
    children: [
      {
        path: 'helper',
        name: '帮助中心',
        component: () => import('@/views/toolbox/helper'),
        meta: { title: '帮助中心', icon: 'helper' }
      },
      {
        path: 'promotion',
        name: '应用升级',
        component: () => import('@/views/toolbox/promotion'),
        meta: { title: '应用升级', icon: 'promotion' }
      },
      {
        path: 'advertisement',
        name: '广告配置',
        component: () => import('@/views/toolbox/advertisement'),
        meta: { title: '广告配置', icon: 'advertisement' }
      },
      {
        path: 'version-list',
        name: '版本管理',
        component: () => import('@/views/toolbox/version_manager'),
        meta: { title: '版本管理', icon: 'version' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: '权限管理',
    redirect: '/system/role',
    hidden: true,
    children: [{
      path: 'role',
      name: 'role',
      component: () => import('@/views/system/index'),
      meta: { title: 'role', icon: 'system' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/users/information',
    name: '首页',
    hidden: true,
    children: [{
      path: 'users',
      component: () => import('@/views/users/index')
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  base: '/gelei-guard-bms',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
