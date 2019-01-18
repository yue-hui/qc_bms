<template>
  <div class="component-card">
    <el-card class="box-card parent-card-block">
      <div slot="header" class="clearfix">
        <span>绑定孩子{{ child_index }}信息</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">修改</el-button>-->
      </div>
      <!--孩子 - 详细信息-->
      <div class="card-block-body">
        <el-form ref="form" label-suffix=":" label-width="140px">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="昵称">
                  <el-input :disabled="edit.nick_name" v-model="child_new.nick_name" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="性别">
                  <el-input :disabled="edit.phone" :value="sex_label(child_new.sex)" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="生日">
                  <el-input
                    :disabled="edit.vip_info"
                    v-model="child_new.birthdate" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="年级">
                  <el-input
                    :disabled="edit.device_name"
                    v-model="child_new.grade_name" />
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="设备号">
                  <el-input :disabled="edit.device_id" v-model="child_new.device_id" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="系统版本号">
                  <el-input :disabled="edit.os_version" v-model="child_new.os_version" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="注册时间">
                  <el-form-item prop="date1">
                    <el-date-picker
                      :disabled="edit.create_time"
                      v-model="child_new.create_time"
                      placeholder="注册时间"
                      type="date" />
                  </el-form-item>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="最后使用时间">
                  <el-form-item prop="date1">
                    <el-date-picker
                      v-model="child_new.last_use_time"
                      :disabled="edit.last_use_time"
                      type="date"
                      placeholder="最后使用时间" />
                  </el-form-item>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <device-card
        v-for="(device, index) in child_new.device_list"
        :key="index"
        :device="device"
        :index="cardIndex" />
    </el-card>
  </div>
</template>

<script>
import DeviceCard from './device_card'
import { get_chinese_index } from '@/utils/constant'
import { get_sex_label, transfer_to_chinese_index } from '@/utils/common'

export default {
  name: 'Child',
  beforecreate: function() {
  },
  components: {
    DeviceCard
  },
  props: {
    child: {
      type: Object,
      default: function() {
        return {}
      }
    },
    cardIndex: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      edit: {
        nick_name: true,
        phone: true,
        vip_info: true,
        device_name: true,
        device_id: true,
        os_version: true,
        create_time: true,
        last_use_time: true,
        device_type: true
      },
      child_new: {}
    }
  },
  computed: {
    child_index: function() {
      return get_chinese_index(this.index)
    }
  },
  watch: {
    child: {
      handler(new_child, old_child) {
        this.child_new = {
          ...new_child,
          grade_name: this.transfer_grade(new_child.grade)
        }
      },
      immediate: true
    }
  },
  mounted: function() {
  },
  methods: {
    transfer_grade(index) {
      return transfer_to_chinese_index(index) + '年级'
    },
    sex_label(sex) {
      return get_sex_label(sex)
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
