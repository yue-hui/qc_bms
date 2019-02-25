<template>
  <div class="component-card">
    <!--孩子 - 设备详细信息-->
    <div class="card-block-child-device">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            {{ device_index }}<span :class="bind_type_color">{{ bind_type_name }}</span>
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
      return date_formatter(t, DATE_TIME_FORMAT)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-card {
  width: 100%;
  height: 100%;
  .show-binding-status{
    color: #4aff24;
  }
  .show-binded-status{
    color: #ea4d45;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
@import "../style/index";
</style>
