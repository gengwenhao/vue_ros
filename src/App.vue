<template>
  <div id="app">
    <common-header/>
    <transition mode="out-in" tag="div">
      <router-view></router-view>
    </transition>
    <div class="bg"/>
  </div>
</template>

<style scoped lang="scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-image: url("~@/static/images/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: .5;
    z-index: -1;
  }
}
</style>
<script>
import CommonHeader from "@/components/ros/CommonHeader"

export default {
  components: {CommonHeader}
}
</script>