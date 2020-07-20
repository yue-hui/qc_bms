<template>
  <el-dialog
    :before-close="before_close"
    :title="title"
    :visible.sync="visible"
    class="create-or-edit-tags"
    width="800px">

    <div class="show-dialog-pannel">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="标签名称:" prop="rec_bundle_id">
          <el-input
            v-model="combination_form.group_name"
            placeholder="标签名称"
            size="mini" />
        </el-form-item>
      </el-form>
    </div>

    <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel">取 消</el-button>
        <gl-button :disabled="is_busy" pid="10046,10055" size="mini" type="primary" @click="emmit_application">确 定</gl-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CreateOrEditTags',
  props: {
    isShow: {
      type: Boolean,
      require: true
    },
    current_id: {
      type: Number,
      require: true
    }
  },
  data: function() {
    return {
      visible: false,
      title: ''
    }
  },
  computed: {},
  mounted: function() {
  },
  methods: {
    before_close: function() {
      //
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.create-or-edit-tags {
  width: 100%;
  height: 100%;
}
</style>
