<template>
  <div class="component-card">
    <el-card class="box-card parent-card-block gg-user-details-with-all">
      <div slot="header" class="clearfix">
        <span class="title-box">孩子<span class="title-name">{{ child_new.nick_name }}</span>的信息</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">修改</el-button>-->
      </div>
      <!--孩子 - 详细信息-->
      <div class="card-block-body">
        <el-form ref="form" class="gg-user-details-with-all" label-suffix=":" label-width="140px">
          <el-row :gutter="24">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="昵称">
                  <span>{{ child_new.nick_name }}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="性别">
                  <span>{{ sex_label(child_new.sex) }}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="生日">
                  <span>{{ __date_formatter(child_new.birthdate) }}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="年级">
                  <span>{{ child_new.grade_name }}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="注册时间">
                  <el-form-item prop="date1">
                    <span>{{ __date_formatter(child_new.create_time) }}</span>
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
import { DATE_TIME_FORMAT, get_chinese_index } from '@/utils/constant'
import { date_formatter, get_sex_label, transfer_to_chinese_index } from '@/utils/common'

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
      child_index: '',
      child_new: {}
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
    },
    cardIndex: {
      handler(new_child, old_child) {
        this.child_index = get_chinese_index(new_child)
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
  margin-top: 10px;
}
</style>
<style rel="stylesheet/scss" lang="scss">
@import "../style/index";
</style>
