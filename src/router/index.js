import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "@/router/routes"
import {setTitle} from "@/lib/utils"

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  setTitle(to)
  next()
})


export default router
