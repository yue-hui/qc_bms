<template>
  <div class="component-card">
    <!--孩子 - 设备详细信息-->
    <div class="card-block-child-device">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            {{ device_index }}<span :class="bind_type_color">{{ bind_type_name }}</span>
            <div class="device-tools">
              <div class="tools-area">
                <!--一直显示给用户-->
                <div class="un-lock-icon" title="重置描述文件状态" @click.stop="confirm_delete_desc_file_status">
                  <svg-icon class="icon" icon-class="unbind_desc_file" />
                </div>
                <div v-if="device.bind_type === '1'" title="解绑孩子端设备" class="un-lock-icon" @click.stop="confirm_un_lock_child_device">
                  <svg-icon class="icon" icon-class="unlock" />
                </div>
              </div>
            </div>
          </template>
          <div>
            <el-form ref="form" class="gg-user-details-with-all" label-suffix=":" label-width="140px">
              <el-row :gutter="24">
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-form-item label="手机号">
                      <span>{{ device.phone }}</span>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-form-item label="终端类型">
                      <span>{{ device.device_type }}</span>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-form-item label="机型">
                      <span>{{ device.device_name }}</span>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-form-item label="设备号">
                      <span>{{ device.device_id }}</span>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-form-item label="系统版本号">
                      <span>{{ device.os_version }}</span>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-form-item label="绑定时间">
                      <el-form-item prop="date1">
                        <span>{{ __date_formatter(device.bind_time) }}</span>
                      </el-form-item>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-form-item label="最后使用时间">
                      <el-form-item prop="date1">
                        <span>{{ __date_formatter(device.last_use_time) }}</span>
                      </el-form-item>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { DATE_TIME_FORMAT, get_chinese_index } from '@/utils/constant'
import { date_formatter } from '@/utils/common'
import { do_unbind_desc_file, unbind_user_device } from '@/api/interactive'

export default {
  name: 'DeviceCard',
  beforecreate: function() {
  },
  props: {
    device: {
      type: Object,
      default: function() {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    },
    childId: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      activeNames: ['1'],
      edit: {
        nick_name: true,
        phone: true,
        vip_info: true,
        device_name: true,
        device_id: true,
        os_version: true,
        create_time: true,
        bind_time: true,
        last_use_time: true,
        device_type: true
      }
    }
  },
  computed: {
    device_index: function() {
      const device_title = ['设备', get_chinese_index(this.index), '信息']
      return device_title.join('')
    },
    bind_type_name: function() {
      if (this.device.bind_type === '1') {
        return '（绑定中）'
      } else if (this.device.bind_type === '0') {
        return '（已解绑）'
      } else {
        return '（绑定中）'
      }
    },
    bind_type_color: function() {
      if (this.device.bind_type === '1') {
        return 'show-binding-status'
      } else if (this.device.bind_type === '0') {
        return 'show-binded-status'
      } else {
        return 'show-binding-status'
      }
    }
  },
  watch: {},
  mounted: function() {
  },
  methods: {
    handleChange: (a) => {
    },
    __date_formatter: (t) => {
      if (!t) {
        return ''
      }
      return date_formatter(t, DATE_TIME_FORMAT)
    },
    delete_desc_file() {
      const config = {
        device_id: this.device.device_id
      }
      do_unbind_desc_file(config).then(res => {
        // 删除用户描述文件
        if (res.status === 0) {
          this.$message.success(res.message)
        } else {
          this.$message.success(res.message)
        }
      })
    },
    confirm_delete_desc_file_status() {
      const confirm_text = '确认重置描述文件状态么？'
      this.$confirm(confirm_text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete_desc_file()
      }).catch(() => {
        this.$message.info('用户已取消解绑操作')
      })
    },
    confirm_un_lock_child_device() {
      const confirm_text = '确认解绑该孩子设备么？'
      this.$confirm(confirm_text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.un_lock()
      }).catch(() => {
        this.$message.info('用户已取消解绑操作')
      })
    },
    un_lock() {
      // 解锁
      console.log(this.childId, this.device.device_id)
      const data = {
        child_user_id: this.childId,
        child_device_id: this.device.device_id
      }
      unbind_user_device(data).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          window.location.href = window.location.href
        } else {
          this.$message.error(res.message)
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
  position: relative;

  .show-binding-status {
    color: #4aff24;
  }

  .show-binded-status {
    color: #ea4d45;
  }

  .device-tools {
    position: absolute;
    right: 0;
    top: 1px;
    bottom: 0;
    height: 32px;

    .tools-area {
      position: relative;
      width: 100%;
      height: 100%;
      min-width: 100px;
      padding: 0 5px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .un-lock-icon {
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        z-index: 100000000;
        padding: 0 5px;

        &:hover {
          color: #4aff24;
        }
      }
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
@import "../style/index";
</style>
