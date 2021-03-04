<template>
  <div class="content users-detail">
    <div v-loading="loading" class="content-body">
      <el-card class="box-card parent-card-block gg-user-details-with-all">
        <div slot="header" class="clearfix-header" style="display: flex;justify-content: space-between">
          <span>个人信息</span>
          <div v-if="information.hasAppLock">
            <img style="width:24px;height:24px" src="../../assets/imgs/zhiwen.png" alt="">
            <gl-button style="float: right; padding: 3px 0" type="text" pid="20118" @click="clearAppLock">删除应用锁</gl-button>
          </div>
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
                  <el-form-item label="用户来源">
                    <span>{{ information.reg_from_label }}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="来源渠道">
                    <span>{{ information.channel_name }}</span>
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

      <!--会员信息 start-->
      <el-card class="box-card parent-card-block gg-user-details-with-all">
        <div slot="header" class="clearfix">
          <span>会员信息</span>
        </div>
        <div class="card-block-body order-list">
          <table v-if="transfer_member_list.length !== 0" class="table" border="0">
            <tr>
              <th>会员类型</th>
              <th>会员有效时间</th>
              <th>会员有效天数</th>
              <th>会员状态</th>
            </tr>
            <tr v-for="member in transfer_member_list" :key="member.record_id">
              <td>{{ member.member_type_name }}</td>
              <td>{{ member.valid_date_label }}</td>
              <td>{{ member.valid_days }}天</td>
              <td>{{ member.status_label }}</td>
            </tr>
          </table>
          <p v-else class="table-no-data">该用户未开通任何会员</p>
        </div>
      </el-card>
      <!--会员信息 end-->
      <!--会员订阅项目-->
      <el-card class="box-card parent-card-block gg-user-details-with-all">
        <div slot="header" class="clearfix">
          <span>会员订阅项目</span>
          <span class="order-unsubscribe-history" @click="show_unsubscribe_record = !show_unsubscribe_record">(开通和退订记录)</span>
        </div>
        <div class="card-block-body order-list">
          <table v-if="transfer_member_list.length !== 0" class="table" border="0">
            <tr>
              <th>会员类型</th>
              <th>套餐名称</th>
              <th>订阅平台</th>
              <th>订阅开始时间</th>
              <th>下次续费日期</th>
              <th>续费状态</th>
              <th>操作</th>
            </tr>
            <tr v-for="member in auto_plan_list" :key="member.record_id">
              <td>{{ member._memberLevel }}</td>
              <td>{{ member.planName }}</td>
              <td>{{ member._renewOrg }}</td>
              <td>{{ member.beginDate | formatter_date_string }}</td>
              <td>{{ member.nextTime | formatter_date_string }}</td>
              <td>{{ member._status }}</td>
              <td>
                <template v-if="member.renewOrg !== 2 && !is_agent">
                  <gl-button
                    pid="10079"
                    size="small"
                    plain
                    class="order-callback"
                    style="text-decoration: underline;"
                    @click="order_callback">退订</gl-button>
                </template>
                <template v-else>
                  <span>-</span>
                </template>
              </td>
            </tr>
          </table>
          <p v-else class="table-no-data">该用户未开通任何会员</p>
        </div>
      </el-card>
      <!--会员订阅项目 end-->
      <div class="black-block" />

      <template>
        <child v-for="(child, index) in information.chlid_list" :card-index="index" :child="child" :key="index" />
      </template>

      <!--组件内-->
      <member-unsubscribe-record
        v-if="show_unsubscribe_record"
        :patriarch-id="$route.query.id"
        @refresh="show_unsubscribe_record = false" />
    </div>
  </div>
</template>

<script>
// import { parent_info } from '@/views/users/data'
import child from './components/child'
import memberUnsubscribeRecord from './components/member_unsubscribe_record'
import { get_parent_details, monthlyplan_unsubscribe_ctccsp, clearAppLock } from '../../api/interactive'
import { date_formatter, get_value_from_map_list } from '@/utils/common'
import { DATE_FORMAT_WITH_POINT, DATE_TIME_FORMAT, ORDERED_MEMBER_STATUS_LABEL } from '../../utils/constant'
import { mapGetters } from 'vuex'

export default {
  components: {
    child,
    memberUnsubscribeRecord
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
      transfer_member_list: [],
      show_unsubscribe_record: false, // 会员退订记录
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
      auto_plan_list: []
    }
  },
  computed: {
    ...mapGetters([
      'is_agent'
    ])
  },
  mounted: function() {
    this.fetch_details()
  },
  methods: {
    fetch_details() {
      const config = {
        user_id: this.$route.params.pid
      }
      this.loading = true
      get_parent_details(config).then(res => {
        if (res.status === 0) {
          this.information = res.data
          this.transfer_member_list = res.data.member_list.map(r => {
            const status_label = get_value_from_map_list(r.status, ORDERED_MEMBER_STATUS_LABEL)
            const valid_date_label = date_formatter(r.begin_time, DATE_FORMAT_WITH_POINT) + ' - ' + date_formatter(r.end_time, DATE_FORMAT_WITH_POINT)
            return {
              ...r,
              status_label,
              valid_date_label
            }
          })
          this.auto_plan_list = res.data.auto_plan_list.filter(item => {
            return String(item.status) !== '02'
          }).map(item => {
            item._renewOrg = String(item.renewOrg) === '1' ? '电信' : '苹果'
            item._memberLevel = String(item.memberLevel) === '001' ? '高级会员' : '普通会员'
            item._status = (() => {
              const status = String(item.status)
              if (status === '01') return '正常'
              // if (status === '02') return '退订'
              if (status === '03') return '异常'
            })()
            return item
          })
          console.log(this.auto_plan_list)
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    order_callback() {
      this.$confirm('确认退订会员么？')
        .then(_ => {
          const data = {
            user_id: this.$route.params.pid
          }
          monthlyplan_unsubscribe_ctccsp(data).then(res => {
            res.status === 0 ? this.$message.success('退订成功') : this.$message.error(res.message)
            res.status === 0 && this.fetch_details()
          })
        })
        .catch(_ => {
          this.$message.success('用户取消操作')
        })
    },
    clearAppLock() {
      this.$confirm('你确定要删除该用户的应用锁吗？')
        .then(_ => {
          clearAppLock({
            user_id: this.information.user_id
          }).then(res => {
            if (res.status !== 0) throw res
            this.$message.success('删除成功')
            this.information.hasAppLock = false
          })
            .catch(e => {
              this.$message.error(e.message)
            })
        })
        .catch(e => {
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

      .order-unsubscribe-history {
        border-bottom: 1px solid rgba(97, 168, 255, 0.79);
        color: rgba(97, 168, 255, 0.79);
        margin-left: 5px;
        cursor: pointer;
      }

      .order-list {
        padding: 0;

        .table-no-data {
          text-align: center;
          font-size: 10px;
          color: #909399;
          line-height: 80px;
          min-height: 80px;
        }
      }

      .table {
        width: 100%;
        text-align: center;
        border: none;
        /*margin: 2px auto;*/
        margin-bottom: 10px;
        border-collapse: collapse;

        tr {
          height: 30px;
          line-height: 30px;

          &:nth-child(2n - 1) {
            background-color: rgba(128, 128, 128, 0.41);
          }

          &:nth-child(2n) {
            background-color: white;
          }

          th, td {
            padding: 0;
            border: 0;
            font-size: 14px;

            .order-callback {
              border: none;
              background-color: transparent;
              /*border-bottom: 1px solid #303133;*/
              outline: none;

              &:hover {
                /*border-bottom: 1px solid dodgerblue;*/
                color: dodgerblue;
              }
            }
          }
        }
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
