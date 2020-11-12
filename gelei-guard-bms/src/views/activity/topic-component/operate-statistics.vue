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
          label="序号"
          prop="_id"
          width="80" />
        <el-table-column
          align="center"
          label="标题"
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
  }
}
</script>

<style scoped>

</style>
