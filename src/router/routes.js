import Index from "@/views/modules/ros/Index"
import Panel from "@/views/modules/ros/Panel"

export default [
  // 主页
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      title: '主页',
    }
  },
  // 面板页面
  {
    path: '/panel',
    name: 'panel',
    component: Panel,
    meta: {
      title: '面板',
      requireConnected: true
    }
  }
]