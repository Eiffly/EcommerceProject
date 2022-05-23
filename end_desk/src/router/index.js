//引入Vue
import Vue from "vue";
//引入路由组件
import Router from "vue-router";
//使用路由
Vue.use(Router);
/* Layout */
//项目骨架结构（一级路由）
import Layout from "@/layout";

//注册路由信息-----全部路由

//常量路由：任何用户都可以看见的---首页、登录
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];
//程序当中全部的异步路由：有用户身份决定哪些显示、哪些不显示
export const allAsyncRoutes = [ //商品管理的路由
  {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock'
    },
    children: [
      {
        name: 'User',
        path: 'user/list',
        component: () => import('@/views/acl/user/list'),
        meta: {
          title: '用户管理',
        },
      },
      {
        name: 'Role',
        path: 'role/list',
        component: () => import('@/views/acl/role/list'),
        meta: {
          title: '角色管理',
        },
      },
      {
        name: 'RoleAuth',
        path: 'role/auth/:id',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权',
        },
        hidden: true,
      },
      {
        name: 'Permission',
        path: 'permission/list',
        component: () => import('@/views/acl/permission/list'),
        meta: {
          title: '菜单管理',
        },
      },
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '',
    name: "Product",
    meta: { title: '商品管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'trademark',
        name: 'Trademark',
        component: () => import('@/views/Product/Trademark/List'),
        meta: { title: '品牌管理' }
      },
      {
        path: 'attr',
        name: 'Attr',
        component: () => import('@/views/Product/Attr/List'),
        meta: { title: '平台属性管理' }
      },
      {
        path: 'spu',
        name: 'Spu',
        component: () => import('@/views/Product/Spu/List'),
        meta: { title: 'Spu管理' }
      },
      {
        path: 'sku',
        name: 'Sku',
        component: () => import('@/views/Product/Sku/List'),
        meta: { title: 'Sku管理' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '',
    name: "Test0415",
    meta: { title: '测试', icon: 'el-icon-goods' },
    children: [
      {
        path: 'test1',
        name: 'Test04151',
        component: () => import('@/views/Test/Test1'),
        meta: { title: '测试1' }
      },
      {
        path: 'test2',
        name: 'Test04152',
        component: () => import('@/views/Test/Test2'),
        meta: { title: '测试2' }
      },
    ]
  }
];

//任意路由：404路径出错了，访问404
export const anyRoute = { path: "/404", component: () => import("@/views/404"), hidden: true };
//创建路由器
const createRouter = () => {
  return new Router({
    //滚动行为 
    scrollBehavior: () => ({ y: 0 }),
    //注册的路由信息
    routes: constantRoutes
  });
}

//createRouter：函数调用返回对外暴露的路由器对象
const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
//重置路由
export function resetRouter() {
  //通过createRouter，返回一个新的路由器对象
  const newRouter = createRouter();
  //将新的路由器里面路由信息，赋予老的路由新的路由信息
  router.matcher = newRouter.matcher; // reset router
}
//最终对外暴露路由器对象
export default router;
