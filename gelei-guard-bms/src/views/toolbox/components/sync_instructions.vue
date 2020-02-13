<template>
  <div class="component-card">
    <el-dialog
      :before-close="handle_close"
      :visible.sync="dialog_visible"
      title="发送同步版本指令"
      width="40%"
      top="30vh">
      <span class="platform-group-title">发送平台类型</span>
      <hr class="diviser">
      <div class="platform-group">
        <el-row gutter="24">
          <el-col
            v-for="(platform_version_instruction, index) in platform_version_instructions"
            :key="index"
            :xs="6"
            :sm="6"
            :md="6"
            :lg="6"
            :xl="6"
          >
            <el-radio
              :label="platform_version_instruction.value"
              v-model="platform_type"
              class="multi-radio-col">{{ platform_version_instruction.label }}
            </el-radio>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close_panel">取 消</el-button>
        <el-button size="mini" type="primary" :disabled="is_busy" @click="make_sure">确 定</el-button>
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
      dialog_visible: false,
      is_busy: false
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
      this.is_busy = true
      sync_platform_to_all(config).then(r => {
        if (r.status === 0) {
          this.dialog_visible = false
          this.$message.success(r.message)
        } else {
          this.$message.error(r.message)
        }
      }).finally(() => {
        this.is_busy = false
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
    /*font-weight: 600;*/
    font-style: normal;
    font-size: 16px;
    min-width: 400px;
  }

  .diviser {
    margin: 10px 0 10px 0;
    border-bottom: 0;
    border-left: 0;
    border-right: 0;
    border-top: 1px solid #d8bdbd;
  }

  .platform-group {
    /*padding: 10px 10px 10px 0;*/
  }
}
</style>
