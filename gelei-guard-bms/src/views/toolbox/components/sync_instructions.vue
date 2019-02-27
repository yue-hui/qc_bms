<template>
  <div class="component-card">
    <el-dialog
      :before-close="handle_close"
      :visible.sync="dialog_visible"
      title="发送同步版本指令"
      top="30vh"
      width="30%">
      <span class="platform-group-title">发送平台类型</span>
      <div class="platform-group">
        <el-radio
          v-for="(platform_version_instruction, index) in platform_version_instructions"
          :key="index"
          :label="platform_version_instruction.value"
          v-model="platform_type">{{ platform_version_instruction.label }}</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close_panel">取 消</el-button>
        <el-button size="mini" type="primary" @click="make_sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { platform_version_instructions } from '@/views/toolbox/data/promotion'
import { sync_platform_to_all } from '@/api/interactive'

export default {
  name: 'SyncInstructions',
  beforecreate: function() {
  },
  props: {},
  data: function() {
    return {
      platform_version_instructions,
      platform_type: '',
      dialog_visible: false
    }
  },
  computed: {},
  watch: {},
  mounted: function() {
  },
  methods: {
    handle_close() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialog_visible = false
          this.platform_type = ''
        })
        .catch(_ => {
        })
    },
    close_panel() {
      this.dialog_visible = false
      this.platform_type = ''
    },
    show_panel() {
      this.dialog_visible = true
    },
    make_sure() {
      if (this.platform_type === '') {
        this.$message.warning('发送平台类型不能为空')
      } else {
        this.$confirm('你确定要创建同步版本指令么?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.sync_command_to_remote()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '同步失败!'
          })
        })
      }
    },
    sync_command_to_remote() {
      // 同步指令到远程
      const config = {
        platform: this.platform_type
      }
      sync_platform_to_all(config).then(r => {
        if (r.status === 0) {
          this.dialog_visible = false
          this.$message.success(r.message)
        } else {
          this.$message.error(r.message)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-card {
  width: 100%;
  height: 100%;

  .platform-group-title {
    font-style: normal;
    font-size: 16px;
  }

  .platform-group {
    padding: 15px 10px 0 0;
  }
}
</style>
