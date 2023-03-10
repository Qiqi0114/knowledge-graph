// createRouter 创建路由模块
// createWebHistory 创建 路由模式
// RouteRecordRaw 增加路由对象类型限制，好处：允许在基础路由里面增加开发者自定义属性
import {createRouter ,createWebHistory ,RouteRecordRaw} from "vue-router"
const routes:Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "知识图谱管理后台",
    },
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "知识图谱管理后台",
    },
    component: () => import("../views/home/index.vue"),
    children: [
      {
          path: "/home/user",
          name: "userManagement",
          meta: {
              title: "用户管理",
          },
          children: [
            {
                path: "/home/userManagement",
                name: "userManagement",
                meta: {
                    title: "账号管理",
                },
                component: () => import("../views/userManagement/index.vue"),
            },
            {
                path: "/home/roleManagement",
                name: "roleManagement",
                meta: {
                    title: "角色管理",
                },
                component: () => import("../views/userManagement/roleManagement.vue"),
            },
          ]
      },
      {
          path: "/home/bookEntries",
          name: "bookEntries",
          meta: {
              title: "书籍词条",
          },
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
            {
              path: "/home/relationshipManagement",
              name: "relationshipManagement",
              meta: {
                  title: "关系管理",
              },
              component: () => import("../views/bookEntries/relationshipManagement.vue"),
          },
          ]
      },
      {
        path: "/home/taskService",
        name: "taskService",
        meta: {
            title: "任务服务",
        },
        children: [
          {
              path: "/home/taskManagement",
              name: "taskManagement",
              meta: {
                  title: "任务管理",
              },
              component: () => import("../views/taskService/taskManagement.vue"),
          },
          {
              path: "/home/taskAssignmentManagement",
              name: "taskAssignmentManagement",
              meta: {
                  title: "任务分配管理",
              },
              component: () => import("../views/taskService/taskAssignmentManagement.vue"),
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
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
export default router