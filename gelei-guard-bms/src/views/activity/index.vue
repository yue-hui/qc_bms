<template>
  <div class="gelei-content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">活动名称:</el-col>
                <el-col :span="16">
                  <el-input v-model="query_sets.plan_name" size="mini" placeholder="套餐名称" clearable @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">活动类型:</el-col>
                <el-col :span="16">
                  <el-select v-model="query_sets.plan_type" size="mini" clearable placeholder="所有套餐类型" @change="query_condition_change">
                    <el-option
                      v-for="item in activities"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="12" :lg="14" :xl="16" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-button size="mini" type="success" @click="create_operators_activity">新建活动</el-button>
              </el-row>
            </div>
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
            label="活动名称"
            prop="plan_name" />
          <el-table-column
            align="center"
            label="活动类型"
            prop="plan_type_label" />
          <el-table-column
            align="center"
            label="活动开始时间"
            prop="is_member_label" />
          <el-table-column
            align="center"
            label="活动结束时间"
            prop="original_price" />
          <el-table-column
            align="center"
            label="创建人"
            prop="discount_price" />
          <el-table-column
            align="center"
            label="操作"
            prop="control"
            width="180">
            <template slot-scope="scope">
              <el-button
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="change_shelf_status(scope.row)">{{ show_table_button_label(scope.row) }}
              </el-button>
              <el-button
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="edit_shelf(scope.row)">编辑
              </el-button>
              <el-button
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="delete_shelf(scope.row)">活动详情
              </el-button>
            </template>
          </el-table-column>
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

export default {
  components: {
  },
  data() {
    const activities = OPERATORS_ACTIVITY_TYPES
    return {
      activities,
      query_sets: {
        activity_name: '',
        activity_type: ''
      }
    }
  },
  computed: {},
  mounted: function() {
  },
  methods: {
    create_operators_activity: function() {
      //
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
    border: 1px solid #EAEAEA;
    height: 100%;
    min-height: 120px;

    .search-area {
      padding: 20px 20px 0 20px;

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
