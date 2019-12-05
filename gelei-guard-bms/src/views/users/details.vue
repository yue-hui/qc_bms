<template>
  <div class="content">
    <div v-loading="loading" class="content-body">
      <el-card class="box-card parent-card-block gg-user-details-with-all">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
          <!--<el-button style="float: right; padding: 3px 0" type="text">修改</el-button>-->
        </div>
        <div class="card-block-body">
          <el-form ref="form" label-suffix=":" label-width="140px">
            <el-row :gutter="24">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="用户名">
                    <span>{{ information.nick_name }}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="手机号">
                    <span>{{ information.phone }}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="会员状态">
                    <span>{{ information.vip_info }}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="机型">
                    <span>{{ information.device_model_name }}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="设备号">
                    <span>{{ information.device_id }}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="系统版本号">
                    <span>{{ information.os_version }}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="注册时间">
                    <span>{{ information.create_time | formatter_date_string }}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="生日">
                    <span>{{ information.birthdate | formatter_date_with_point_string }}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="收货地址">
                    <span>{{ information.address || '-' }}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="最后使用时间">
                    <span>{{ information.last_use_time | formatter_date_string }}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <div class="black-block" />

      <template>
        <child v-for="(child, index) in information.chlid_list" :card-index="index" :child="child" :key="index" />
      </template>
    </div>
  </div>
</template>

<script>
// import { parent_info } from '@/views/users/data'
import child from './components/child'
import { get_parent_details } from '@/api/interactive'
import { date_formatter } from '@/utils/common'
import { DATE_FORMAT_WITH_POINT, DATE_TIME_FORMAT } from '@/utils/constant'

export default {
  components: {
    child
  },
  filters: {
    formatter_date_with_point_string: function(time) {
      if (time) {
        return date_formatter(time, DATE_FORMAT_WITH_POINT)
      } else {
        return ''
      }
    },
    formatter_date_string: function(time) {
      if (time) {
        return date_formatter(time, DATE_TIME_FORMAT)
      } else {
        return ''
      }
    }
  },
  data() {
    return {
      loading: false,
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
      this.loading = true
      get_parent_details(config).then(res => {
        if (res.status === 0) {
          this.information = res.data
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.loading = false
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
    border: 1px solid #EAEAEA;
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

<style rel="stylesheet/scss" lang="scss">
@import "style/index";
</style>
