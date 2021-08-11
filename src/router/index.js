import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "@/router/routes"
import {setTitle} from "@/lib/utils"
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 设置标题
  setTitle(to)

  // 未连接跳转回主页面
  let isConnected = store.state.isConnected || false
  if (to.meta.requireConnected && !isConnected) {
    next({name: 'index'})
  } else {
    next()
  }
})

// 相同路由跳转禁止报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
