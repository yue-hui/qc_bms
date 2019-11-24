<template>
  <div class="gelei-content">
    <div class="content-body">
      <div class="search-area">
        <!--活动详细信息开始-->
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="24" class="col-bg">
            <div class="grid-content bg-purple title-area">活动详细信息</div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="8" class="col-bg">
            <el-row>
              <el-col :xl="24" class="activity-item">
                <div class="item-name">活动名称:</div>
                <div class="between-item-name-and-item-value" />
                <div class="item-value">{{ activity_details.activity_name }}</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="8" class="col-bg">
            <el-row>
              <el-col :xl="24" class="activity-item">
                <div class="item-name">套餐名称:</div>
                <div class="between-item-name-and-item-value" />
                <div class="item-value">{{ activity_details.plan_name }}</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="8" class="col-bg">
            <el-row>
              <el-col :xl="24" class="activity-item">
                <div class="item-name">套餐时长:</div>
                <div class="between-item-name-and-item-value" />
                <div v-if="activity_details.valid_days" class="item-value">{{ activity_details.valid_days }} 天</div>
                <div v-else class="item-value">-</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="8" class="col-bg">
            <el-row>
              <el-col :xl="24" class="activity-item">
                <div class="item-name">套餐原价:</div>
                <div class="between-item-name-and-item-value" />
                <div v-if="activity_details.original_price" class="item-value">{{ activity_details.original_price }} 元
                </div>
                <div v-else class="item-value">-</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="8" class="col-bg">
            <el-row>
              <el-col :xl="24" class="activity-item">
                <div class="item-name">活动人数:</div>
                <div class="between-item-name-and-item-value" />
                <div v-if="activity_details.user_count" class="item-value">{{ activity_details.user_count }} 人</div>
                <div v-else class="item-value">-</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="8" class="col-bg">
            <el-row>
              <el-col :xl="24" class="activity-item">
                <div class="item-name">创建时间:</div>
                <div class="between-item-name-and-item-value" />
                <div class="item-value">{{ activity_details.create_time_label }}</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!--活动详细信息结束-->

        <div class="between-detail-and-member" />

        <!--用户名单开始-->
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="24" class="col-bg">
            <div class="grid-content bg-purple title-area">
              用户名单
            </div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="24" class="member-area">
            <el-row>
              <el-col>
                <div class="phone-search-area">
                  <el-input
                    v-model="phone"
                    class="search-input"
                    size="mini"
                    placeholder="请输入手机"
                    prefix-icon="el-icon-search"
                    clearable
                    @change="refresh_phone" />
                </div>
              </el-col>

              <template v-if="members.length">
                <el-col
                  v-for="(member, index) in members"
                  :key="index"
                  :xs="6"
                  :sm="4"
                  :md="4"
                  :lg="3"
                  :xl="2"
                  class="member-el-col-item">
                  <div class="member-item">{{ member.phone }}</div>
                </el-col>
              </template>
              <template v-else>
                <div class="no-member-reminder">无名单</div>
              </template>
            </el-row>
          </el-col>
        </el-row>
        <!--用户名单结束-->
      </div>
    </div>
  </div>
</template>

<script>
import { get_member_activity_details, get_member_activity_user_list } from '@/api/interactive'
import { date_formatter } from '@/utils/common'
import { DATE_TIME_FORMAT } from '@/utils/constant'

export default {
  components: {},
  data() {
    return {
      query_sets: {
        name: ''
      },
      members: [],
      activity_details: {},
      page_no: 1,
      page_num: 100,
      total: 0,
      current_member_length: 0,
      phone: ''
    }
  },
  computed: {
    id: function() {
      return this.$route.query.id
    }
  },
  mounted: function() {
    this.fetch_member_activity_details()
    this.refresh_phone()
  },
  methods: {
    refresh_phone() {
      this.members = []
      this.page_no = 1
      this.total = 0
      this.current_member_length = 0
      this.fetch_member_activity_user_list()
    },
    fetch_member_activity_details() {
      const options = {
        activity_id: this.id
      }
      get_member_activity_details(options).then(res => {
        if (res.status === 0) {
          const create_time_label = date_formatter(res.data.create_time, DATE_TIME_FORMAT)
          this.activity_details = res.data
          this.activity_details['create_time_label'] = create_time_label
        } else {
          this.$message.error(res.message)
        }
      })
    },
    fetch_member_activity_user_list() {
      const options = {
        activity_id: this.id,
        phone: this.phone,
        page_no: this.page_no,
        page_num: this.page_num
      }
      get_member_activity_user_list(options).then(res => {
        if (res.status === 0) {
          this.members = [...this.members, ...res.data]
          this.current_member_length += res.data.length
          this.total = res.total_count
          if (this.current_member_length < this.total) {
            this.page_no += 1
            this.fetch_member_activity_user_list()
          }
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.gelei-content {
  width: 100%;
  height: 100%;
  /*min-height: 480px;*/
  padding: 20px 10px 25px 10px;
  display: flex;
  flex-direction: column;

  .content-body {
    border: 1px solid #c7d5ee;
    height: 100%;
    min-height: 120px;

    .search-area {
      padding: 20px 20px 0 20px;
      font-family: "微软雅黑";

      .row-bg {
        .col-bg {
          padding: 5px 0;

          &.layout-right {
            text-align: right;
          }

          .order-number-list {
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            font-weight: bold;
            color: #4d4d4d;
            white-space: nowrap;
          }

          .title-area {
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            font-weight: bold;
            color: #4d4d4d;
          }

          .activity-item {
            display: flex;
            flex-direction: row;
            position: relative;

            .item-name {
              color: grey;
              font-size: 14px;
            }

            .between-item-name-and-item-value {
              width: 10px;
              height: 100%;
            }

            .item-value {
              font-size: 14px;
              color: #3a3a3a;
            }
          }
        }

        .member-area {
          width: 100%;
          min-height: 100px;
          border: 1px solid rgba(173, 224, 233, 0.53);
          margin-bottom: 30px;
          position: relative;
          padding: 5px 0 20px 0;

          .phone-search-area {
            height: 40px;
            display: flex;
            flex-direction: row-reverse;
            justify-content: start;
            align-items: center;
            padding: 0 15px;

            .search-input {
              width: 240px;
              height: 32px;
              line-height: 32px;
            }
          }

          .member-el-col-item {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 3px 0;

            .member-item {
              min-width: 96px;
              height: 20px;
              line-height: 18px;
              font-size: 12px;
              vertical-align: center;
              color: #409eff;
              border-radius: 4px;
              padding: 0 8px;
              border: 1px solid rgba(64, 158, 255, .2);
              background-color: rgba(64, 158, 255, .1);
              text-align: center;
            }
          }

          .no-member-reminder {
            width: 100%;
            height: 100%;
            min-height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: grey;
            font-size: 12px;
          }
        }
      }

      .between-detail-and-member {
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>
