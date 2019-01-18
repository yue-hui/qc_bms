<template>
  <div class="component-card">
    <!--孩子 - 设备详细信息-->
    <div class="card-block-child-device">
      <el-collapse @change="handleChange" v-model="activeNames">
        <el-collapse-item :title="device_index" name="1">
          <div>
            <el-form label-suffix=":" label-width="140px" ref="form">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="手机号">
                      <el-input :disabled="edit.phone" v-model="device.phone" />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="终端类型">
                      <el-input :disabled="edit.device_type" v-model="device.device_type" />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="机型">
                      <el-input :disabled="edit.device_name" v-model="device.device_name" />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="设备号">
                      <el-input :disabled="edit.device_id" v-model="device.device_id" />
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="系统版本号">
                      <el-input :disabled="edit.os_version" v-model="device.os_version" />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="绑定时间">
                      <el-form-item prop="date1">
                        <el-date-picker
                          :disabled="edit.bind_time"
                          placeholder="绑定时间"
                          type="date"
                          v-model="device.bind_time" />
                      </el-form-item>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="最后使用时间">
                      <el-form-item prop="date1">
                        <el-date-picker
                          :disabled="edit.last_use_time"
                          placeholder="最后使用时间"
                          type="date"
                          v-model="device.last_use_time" />
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
import { get_chinese_index } from '@/utils/constant'

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
      // device: {
      //   'device_id': 'xxx',
      //   'device_type': '0',
      //   'phone': 13266534451,
      //   'device_name': 'xxx',
      //   'os_name': 'xxx',
      //   'os_version': 'xxx',
      //   'bind_time': 124334,
      //   'last_use_time': 1974738
      // }
    }
  },
  computed: {
    device_index: function() {
      const device_title = ['设备', get_chinese_index(this.index), '信息']
      return device_title.join('')
    }
  },
  watch: {},
  mounted: function() {
  },
  methods: {
    handleChange: (a) => {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-card {
  width: 100%;
  height: 100%;
}
</style>
