<template>
  <div>
    <div class="table-content table-block">
      <el-table
        :data="list"
        stripe
        size="mini"
        style="width: 100%">
        <el-table-column
          align="center"
          label="排序"
          prop="_id"
          width="80" />
        <el-table-column
          align="center"
          label="运营位标题"
          prop="title"
          width="180" />
        <el-table-column
          align="center"
          label="图片跳转"
          prop="_jumpTarget" />
        <el-table-column
          align="center"
          width="132"
          label="点击次数"
          prop="clickedCount" />
        <el-table-column
          align="center"
          label="状态"
          prop="_status" />
        <el-table-column
          align="center"
          label="开始时间"
          prop="_startTime" />
        <el-table-column
          align="center"
          label="结束时间"
          prop="_endTime" />
      </el-table>
    </div>
    <div style="display: flex;justify-content: center;margin-top: 20px">
      <el-button size="mini" @click="close">知道了</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>

</style>
