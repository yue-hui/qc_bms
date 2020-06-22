<template>
  <div :style="{'height': height}" class="no-navigation-page" />
</template>

<script>
import { get_client_height } from '@/utils/common'

export default {
  name: 'NoNavigationPage',
  data() {
    const height = get_client_height()
    return {
      height: height - 60 + 'px'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.no-navigation-page {
  width: 100%;
  background-image: url("../../assets/imgs/welcome.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  /*background-size: contain;*/
}
</style>
