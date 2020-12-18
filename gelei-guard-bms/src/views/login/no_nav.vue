<template>
  <div :style="{height: height}" :class="{'agent': is_agent}" class="no-navigation-page" />
</template>

<script>
import { get_client_height } from '@/utils/common'
import { mapGetters } from 'vuex'

export default {
  name: 'NoNavigationPage',
  data() {
    const height = get_client_height()
    return {
      height: (height - 60) + 'px'
    }
  },
  computed: {
    ...mapGetters(['is_agent'])
  },
  mounted() {
    if (window.innerWidth <= 600) {
      this.$router.push({
        path: '/m/welcome'
      })
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

  &.agent {
    width: 100%;
    background-image: url("../../assets/imgs/no_nav_agent.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}
</style>
