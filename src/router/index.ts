// createRouter 创建路由模块
// createWebHistory 创建 路由模式
// RouteRecordRaw 增加路由对象类型限制，好处：允许在基础路由里面增加开发者自定义属性
import {createRouter ,createWebHistory ,RouteRecordRaw} from "vue-router"
const routes:Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/index.vue"),
    children: [
      {
          path: "/home/userManagement",
          name: "userManagement",
          meta: {
              title: "用户管理",
          },
          component: () => import("../views/userManagement/index.vue"),
      },
      {
          path: "/home/bookEntries",
          name: "bookEntries",
          meta: {
              title: "书籍词条",
          },
          component: () => import("../views/bookEntries/bookManagement.vue"),
          children: [
            {
                path: "/home/bookManagement",
                name: "bookManagement",
                meta: {
                    title: "书籍管理",
                },
                component: () => import("../views/bookEntries/bookManagement.vue"),
            },
            {
                path: "/home/entryManagement",
                name: "entryManagement",
                meta: {
                    title: "词条管理",
                },
                component: () => import("../views/bookEntries/entryManagement.vue"),
            },
          ]
      },
    ]
  },
/*   {
    path:'/:catchAll(.*)',//自定义路由类型 catchAll   (.*)匹配规则
    name:'404',
    component:()=>import("../views/404.vue")
  }, */
]
 
// 创建路由器
const router = createRouter({
  history:createWebHistory(),//创建路由模式为history
  routes:routes //引入路由表
})
 
export default router