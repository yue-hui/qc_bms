<template>
  <div class="component-card">
    <!--孩子 - 设备详细信息-->
    <div class="card-block-child-device">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :title="device_index" name="1">
          <div>
            <el-form ref="form" label-suffix=":" label-width="140px">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="手机号">
                      <span>{{ device.phone }}</span>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="终端类型">
                      <span>{{ device.device_type }}</span>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="机型">
                      <span>{{ device.device_name }}</span>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="设备号">
                      <span>{{ device.device_id }}</span>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="系统版本号">
                      <span>{{ device.os_version }}</span>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="绑定时间">
                      <el-form-item prop="date1">
                        <span>{{ date_formatter(device.bind_time) }}</span>
                      </el-form-item>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-form-item label="最后使用时间">
                      <el-form-item prop="date1">
                        <span>{{ date_formatter(device.last_use_time) }}</span>
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
import { date_formatter } from '@/utils/common'

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
    },
    date_formatter: (t) => {
      return date_formatter(t)
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
