import * as types from "@/store/mutationsType"
import rosLib from "roslib"

export default {
  // 创建ROS连接对象
  [types.CREATE_ROS_INSTANCE](state, payload) {
    state.rosInstance = new rosLib.Ros(payload)
    state.isConnected = true
  },
  // 关闭ROS连接
  [types.CLOSE_ROS_CONNECTION](state) {
    state.rosInstance = null
    state.isConnected = false
  }
}