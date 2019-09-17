<template>
  <div class="component-card">

  </div>
</template>

<script>
export default {
  name: 'YearOnYear',
  props: {
    ratio: {
      type: Number,
      require: true
    }
  },
  filters: {
    abs: function(value) {
      if (value === undefined) {
        return ''
      }
      return Math.abs(value)
    }
  },
  data: function() {
    return {}
  },
  computed: {},
  watch: {},
  mounted: function() {
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-card {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
