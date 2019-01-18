<template>
  <div class="content">
    <div class="content-body">
      <el-card class="box-card parent-card-block">
        <div class="clearfix" slot="header">
          <span>个人信息</span>
          <!--<el-button style="float: right; padding: 3px 0" type="text">修改</el-button>-->
        </div>
        <div class="card-block-body">
          <el-form label-suffix=":" label-width="140px" ref="form">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="用户名">
                    <el-input :disabled="edit.nick_name" v-model="information.nick_name" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="手机号">
                    <el-input :disabled="edit.phone" v-model="information.phone" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="会员状态">
                    <el-input :disabled="edit.vip_info" v-model="information.vip_info" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="机型">
                    <el-input :disabled="edit.device_name" v-model="information.device_name" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="设备号">
                    <el-input :disabled="edit.device_id" v-model="information.device_id" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="系统版本号">
                    <el-input :disabled="edit.os_version" v-model="information.os_version" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-form-item label="注册时间">
                    <el-form-item prop="date1">
                      <el-date-picker
                        :disabled="edit.create_time"
                        placeholder="注册时间"
                        type="date"
                        v-model="information.create_time" />
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
                        v-model="information.last_use_time" />
                    </el-form-item>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <div class="black-block" />

      <template>
        <child :card-index="index" :child="child" :key="index" v-for="(child, index) in information.chlid_list" />
      </template>
    </div>
  </div>
</template>

<script>
// import { parent_info } from '@/views/users/data'
import child from './components/child'
import { get_parent_details } from '@/api/interactive'

export default {
  components: {
    child
  },
  data() {
    return {
      information: {},
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
      }
    }
  },
  computed: {},
  mounted: function() {
    this.fetch_details()
  },
  methods: {
    fetch_details() {
      const config = {
        user_id: this.$route.query.id
      }
      get_parent_details(config).then(res => {
        if (res.status === 0) {
          this.information = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  /*min-height: 480px;*/
  padding: 20px 10px 25px 10px;
  display: flex;
  flex-direction: column;

  .content-body {
    border: 1px solid #c7d5ee;
    height: 100%;
    padding: 15px 25px;
    min-height: 120px;

    .parent-card-block {
      /*width: 500px;*/
      .card-block-body {
        padding-right: 28px;
      }
    }

    .black-block {
      width: 100%;
      height: 20px;
      background-color: #f6fff4;
    }
  }
}
</style>
