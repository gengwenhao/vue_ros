<template>
  <div id="common-header">

    <sui-segment class="inner-segment">
      <sui-container class="segment-container">
        <sui-menu secondary style="width: 100%;">
          <sui-menu-item link :active="$route.name === 'index'"
                         @click.prevent.stop="$router.push({name:'index'})">主页
          </sui-menu-item>
          <sui-menu-item link :active="$route.name === 'panel'"
                         v-if="isConnected"
                         @click.prevent.stop="$router.push({name:'panel'})">面板
          </sui-menu-item>
          <sui-menu-item link style="margin-left: auto;" v-if="isConnected" @click="handleCloseConnection">断开连接
          </sui-menu-item>
        </sui-menu>
      </sui-container>
    </sui-segment>

  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex"

export default {
  name: "CommonHeader",
  data() {
    return {}
  },
  computed: {
    ...mapState(['isConnected'])
  },
  methods: {
    ...mapMutations(['CLOSE_ROS_CONNECTION']),
    // 断开连接
    handleCloseConnection() {
      this.$confirm('是否断开当前连接?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            this.CLOSE_ROS_CONNECTION()
            this.$router.push({name: 'index'})
          })
    }
  }
}
</script>

<style scoped lang="scss">
#common-header {
  margin-bottom: 23px;

  .inner-segment {
    height: 80px;
    border-radius: 0;

    .segment-container {
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>