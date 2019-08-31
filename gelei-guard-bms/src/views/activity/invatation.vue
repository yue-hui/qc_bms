<template>
  <div class="content">
    <div class="content-body">
      <div class="search-area">
        <div class="invatation-title">
          <span class="title">邀请好友活动数据</span>
        </div>
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="col-bg">
            <span>邀请页UV: {{ invatation.total_count }}</span>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="col-bg">
            <span>分享人数: {{ invatation.total_count }}</span>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="col-bg">
            <span>被邀请页UV: {{ invatation.total_count }}</span>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="col-bg">
            <span>注册人数: {{ invatation.register_count }}</span>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          :data="packages_list"
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="序号"
            prop="_id"
            width="80" />
          <el-table-column
            align="center"
            label="用户昵称"
            prop="plan_name" />
          <el-table-column
            align="center"
            label="用户手机号"
            prop="plan_type_label" />
          <el-table-column
            align="center"
            label="注册成功人数"
            prop="is_member_label" />
          <el-table-column
            align="center"
            label="奖励会员天数"
            prop="original_price" />
        </el-table>
        <el-pagination
          :current-page="page"
          :page-size="page_size"
          :page-sizes="page_sizes"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="change_current"
          @size-change="table_size_change" />
      </div>
    </div>

    <package-create-edit v-if="action" :action="action" :current="current" @callback="close_package_dialog" />
  </div>
</template>

<script>
import { OPERATORS_ACTIVITY_TYPES } from '@/utils/constant'
import { get_invite_statisis_data } from '@/api/interactive'

export default {
  components: {
  },
  data() {
    const activities = OPERATORS_ACTIVITY_TYPES
    return {
      activities,
      invatation: {}
    }
  },
  computed: {},
  mounted: function() {
    get_invite_statisis_data().then(res => {
      if (res.status === 0) {
        this.invatation = res.data
      } else {
        this.$message.error(res.message)
      }
    })
  },
  methods: {
    create_operators_activity: function() {
      //
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
    min-height: 120px;

    .search-area {
      padding: 20px 20px 0 20px;

      .invatation-title{
        width: 100%;
        .title{
          font-size: 16px;
          font-weight: bolder;
        }
      }

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
          }
        }
      }
    }

    .between-search-area-and-table-display {
      height: 1px;
      margin: 10px 20px 15px 20px;
      background-color: #D0D0D7;
    }

    .table-content {
      margin: 20px;
    }
  }
}
</style>
