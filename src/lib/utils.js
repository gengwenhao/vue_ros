import rosLib from "roslib"
import store from '@/store'

export default {}

// 设置页面标题
export const setTitle = (to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
}

// 发送话题
export const rosPublish = ({topicName, messageType, messageData}) => {
  return new Promise((resolve, reject) => {
    if (!store.state.rosInstance) {
      reject({msg: '请先连接ROS服务！', code: 402, data: null})
      return -1
    }

    const cmdVel = new rosLib.Topic({
      ros: store.state.rosInstance,
      name: topicName,
      messageType
    })

    // 发布消息
    cmdVel.publish(new rosLib.Message(messageData))

    resolve('发送成功')
  })
}