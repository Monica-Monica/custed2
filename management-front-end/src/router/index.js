import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
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
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    children: [{
      path: 'index',
      name: 'Home',
      component: () => import('@/views/home/Home'),
      meta: { title: '首页', icon: 'home' }
    }]
  },

  {
    path: '/user-management',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'UserManagement',
        component: () => import('@/views/user-management/index'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },

  {
    path: '/news',
    component: Layout,
    redirect: '/news/important',
    name: 'News',
    meta: { title: '资讯管理', icon: 'example' },
    children: [
      {
        path: 'flash',
        name: 'Flash',
        component: () => import('@/views/info-management/flash-info'),
        meta: { title: '快讯管理', icon: 'table' }
      },
      {
        path: 'important',
        name: 'Important',
        component: () => import('@/views/info-management/important-info'),
        meta: { title: '要闻管理', icon: 'tree' }
      },
      {
        path: 'tinymce',
        name: 'tinymce',
        hidden: true,
        component: () => import('@/components/Tinymce/index'),
        meta: { title: '编辑' }
      },
      {
        path: 'post-news',
        name: 'PostNews',
        hidden: true,
        component: () => import('@/views/postNews-management/index'),
        meta: { title: '跟帖管理' }
      },
      {
        path: 'comments',
        name: 'Comments',
        hidden: true,
        component: () => import('@/views/comments-management/index'),
        meta: { title: '评论管理' }
      }
    ]
  },

  {
    path: '/currency-management',
    component: Layout,
    redirect: '/currency-management/index',
    name: 'Currency',
    meta: { title: '货币管理', icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'CurrencyManagement',
        component: () => import('@/views/currency-management/index'),
        meta: { title: '货币管理', icon: 'coin' }
      },
      {
        path: 'bind-info',
        name: 'BindInfo',
        hidden: true,
        component: () => import('@/views/currency-management/bind-info'),
        meta: { title: '相关资讯', icon: 'form' }
      }
    ]
  },

  {
    path: '/indexs-management',
    component: Layout,
    redirect: '/indexs-management/index',
    name: 'Indexs',
    meta: { title: '指数管理', icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'IndexsManagement',
        component: () => import('@/views/indexs-management/index'),
        meta: { title: '指数管理', icon: 'indexs' }
      },
      {
        path: 'bind-info',
        name: 'IndexBindInfo',
        hidden: true,
        component: () => import('@/views/indexs-management/bind-info'),
        meta: { title: '相关资讯', icon: 'form' }
      }
    ]
  },

  {
    path: '/platform-management',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'PlatformManagement',
        component: () => import('@/views//platform-management/index'),
        meta: { title: '平台管理', icon: 'platform' }
      }
    ]
  },

  {
    path: '/banner-management',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'BannerManagement',
        component: () => import('@/views//banner-management/index'),
        meta: { title: 'Banner管理', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

