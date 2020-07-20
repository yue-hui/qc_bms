<template>
  <div class="content">Console</div>
</template>

<script>
export default {
  name: 'Console',
  components: {},
  data() {
    return {}
  },
  mounted: function() {
    console.log('params: ', this.$route.params)
    this.init_page()
  },
  methods: {
    init_page: function() {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  /*min-height: 480px;*/
  padding: 20px 10px 25px 10px;
  display: flex;
  flex-direction: column;
}
</style>
