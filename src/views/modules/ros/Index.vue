<!-- 首页面 -->
<template>
  <div id="index">
    <sui-dimmer active v-if="isLoading">
      <sui-loader size="tiny">连接中</sui-loader>
    </sui-dimmer>

    <sui-container>
      <div class="card">
        <sui-form inverted>
          <sui-form-fields fields="two">
            <sui-form-field>
              <label>websocket地址</label>
              <input type="text" placeholder="输入websocket的地址" v-model="form.host"/>
            </sui-form-field>
            <sui-form-field>
              <label>端口号</label>
              <input type="text" placeholder="输入端口" v-model="form.port"/>
            </sui-form-field>
          </sui-form-fields>
          <sui-form-field inline>
            <sui-checkbox label="记住地址" v-model="isSave" @click="handleSaveAddress"/>
          </sui-form-field>
          <sui-button fluid secondary content="连接ROS服务" @click="connRosWS"/>
        </sui-form>
      </div>
    </sui-container>

  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import _ from 'lodash'
import settings from '@/settings'
import {isEmptyStr, localRead, localRemove, localSave} from "@/lib/tools"
import {CREATE_ROS_INSTANCE} from "@/store/mutationsType"

export default {
  name: "Index",
  data() {
    return {
      // flag showing
      isLoading: false,
      isSave: !isEmptyStr(localRead('ROS_HOST')),
      // form
      form: {
        host: localRead('ROS_HOST') || settings.ROS_HOST,
        port: localRead('ROS_PORT') || settings.ROS_PORT
      }
    }
  },
  computed: {
    connectURL() {
      if (!isEmptyStr(this.form.host) && !isEmptyStr(this.form.port)) {
        return `${this.form.host}:${this.form.port}`
      }

      return ''
    },
    ...mapState(['rosInstance', 'isConnected'])
  },
  methods: {
    ...mapMutations([CREATE_ROS_INSTANCE]),
    // 记住地址
    handleSaveAddress() {
      setTimeout(() => {
        if (this.isSave) {
          localSave('ROS_HOST', this.form.host)
          localSave('ROS_PORT', this.form.port)
        } else {
          localRemove('ROS_HOST')
          localRemove('ROS_PORT')
        }
      }, 100)
    },
    // 通过ws连接ROS服务
    connRosWS: _.debounce(function () {
      if (this.rosInstance) return -1
      let self = this

      // loading animation
      this.isLoading = true

      // 创建ros连接对象
      this.CREATE_ROS_INSTANCE({
        url: this.connectURL
      })

      // 绑定事件
      this.rosInstance
          .on('connection', () => {
            setTimeout(() => {
              self.isLoading = false
              // to panel page
              self.$router.push({name: 'panel', query: {timeStamp: new Date().valueOf()}})
              // show tips
              self.$toast('ROS服务已连接')
            }, 1000)
          })
          .on('error', () => {
            setTimeout(() => {
              self.isLoading = false
              // close connection
              self.CLOSE_ROS_CONNECTION()
              // show tips
              self.$toast('ROS服务连接失败')
            }, 1000)
          })
          .on('close', () => {
            if (this.isConnected) {
              setTimeout(() => {
                self.isLoading = false
                // close connection
                self.CLOSE_ROS_CONNECTION()
                // show tips
                self.$toast('ROS服务连接已被关闭')
              }, 1000)
            }
          })

    }, 1000)
  },
  created() {

  }
}
</script>

<style scoped lang="scss">
#index {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;

  .card {
    padding-top: 50px;
  }
}
</style>