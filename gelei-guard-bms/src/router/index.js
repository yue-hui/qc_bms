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
    meta: { title: '用户管理', icon: 'form' },
    children: [
      {
        path: 'information',
        name: '家长信息管理',
        component: () => import('@/views/users/index'),
        meta: { title: '家长信息管理', icon: 'parents' }
      },
      {
        path: 'details',
        name: '用户详细信息',
        hidden: true,
        component: () => import('@/views/users/details'),
        meta: { title: '用户详细信息', hide: true, icon: 'form' }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    name: '用户数据分析',
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
    path: '/app/recommend',
    component: Layout,
    name: '应用推荐管理',
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
    alwaysShow: true,
    meta: { title: '工具使用', icon: 'tools', hidden: false },
    children: [
      {
        path: 'analysis',
        name: '帮助中心',
        component: () => import('@/views/toolbox/helper'),
        meta: { title: '帮助中心', icon: 'helper' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'system',
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
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
