<template>
  <div>
    <div class="table-content table-block">
      <el-table
        v-loading="loading"
        :data="table_data"
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
          prop="nick_name"
          width="180" />
        <el-table-column
          align="center"
          label="图片跳转"
          prop="phone" />
        <el-table-column
          align="center"
          width="132"
          label="点击次数"
          prop="create_time" />
        <el-table-column
          align="center"
          label="状态"
          prop="device_type_label" />
        <el-table-column
          align="center"
          label="开始时间"
          prop="valid_days_label" />
        <el-table-column
          align="center"
          label="结束时间"
          prop="valid_days_label" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table_data: [],
      loading: false
    }
  }
}
</script>

<style scoped>

</style>
