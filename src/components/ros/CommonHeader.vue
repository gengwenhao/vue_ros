<template>
  <div id="common-header">

    <sui-segment inverted color="blue" class="inner-segment">
      <sui-container>
      </sui-container>
    </sui-segment>

  </div>
</template>

<script>
export default {
  name: "CommonHeader",
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
#common-header {
  margin-bottom: 23px;

  .inner-segment {
    height: 80px;
    border-radius: 0;
  }
}
</style>