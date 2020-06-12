<template>
  <div class="content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="3" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">活动名称:</el-col>
                <el-col :span="16">
                  <el-input v-model="query_sets.activity_name" size="mini" placeholder="活动名称" clearable @change="query_condition_change " />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="16" :md="18" :lg="19" :xl="21" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <gl-button pid="20023" size="mini" type="success" @click="create_activity">创建会员活动</gl-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          v-loading="loading"
          :data="activity_list"
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="活动名称"
            prop="activity_name"
            width="160" />
          <el-table-column
            align="center"
            label="套餐名称"
            prop="plan_name"
            width="180" />
          <el-table-column
            align="center"
            label="会员类型"
            prop="member_type_label"
            width="180" />
          <el-table-column
            align="center"
            label="活动类型"
            prop="activity_type_label"
            width="180" />
          <el-table-column
            align="center"
            label="套餐时长"
            prop="valid_days" />
          <el-table-column
            align="center"
            label="活动价格"
            prop="activity_price" />
          <el-table-column
            align="center"
            label="活动人数"
            prop="user_count" />
          <el-table-column
            align="center"
            label="创建时间"
            prop="create_time_label" />
          <el-table-column
            align="center"
            label="操作"
            prop="control">
            <template slot-scope="scope">
              <gl-button
                pid="20024"
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="edit_activity(scope.row)">编辑
              </gl-button>
              <gl-button
                pid="20025"
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="see_activity(scope.row)">查看
              </gl-button>
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

    <create-activity v-if="is_create" @callback="destory_create_activity" />
    <edit-activity v-if="is_edit" :is_edit="is_edit" :current="current_row" @callback="destory_edit_activity"/>
  </div>
</template>

<script>
import createActivity from './components/create_activity'
import editActivity from './components/edit_activity'
import { DATE_TIME_FORMAT, PATRIARCH_MEMBER_TYPES, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { get_member_activity_list } from '@/api/interactive'
import { date_formatter, get_value_from_map_list } from '@/utils/common'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'

export default {
  components: {
    createActivity,
    editActivity
  },
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      query_sets: {
        activity_name: ''
      },
      is_create: false,
      is_edit: false,
      activity_list: [{}],
      current_row: {},
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0
    }
  },
  computed: {},
  mounted: function() {
    this.fetch_member_activity_list()
  },
  methods: {
    create_activity() {
      this.is_create = true
    },
    destory_create_activity(refresh = false) {
      this.is_create = false
      if (refresh) {
        this.fetch_member_activity_list()
      }
    },
    get_options() {
      const condition = {}
      condition['page_no'] = this.page
      condition['page_num'] = this.page_size
      condition['activity_name'] = this.query_sets.activity_name
      return condition
    },
    query_condition_change() {
      this.page = 1
      this.page_size = getPagenationSize()
      this.query()
    },
    query() {
      this.fetch_member_activity_list()
    },
    fetch_member_activity_list() {
      const options = this.get_options()
      this.loading = true
      get_member_activity_list(options).then(res => {
        if (res.status === 0) {
          this.activity_list = res.data.map(r => {
            const create_time_label = date_formatter(r.create_time, DATE_TIME_FORMAT)
            const member_type_label = get_value_from_map_list(r.member_type, PATRIARCH_MEMBER_TYPES)
            return {
              ...r,
              create_time_label,
              member_type_label
            }
          })
          this.total = res.total_count
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.fetch_member_activity_list()
    },
    change_current: function(page) {
      this.page = page
      this.fetch_member_activity_list()
    },
    edit_activity: function(row) {
      this.current_row = row
      this.is_edit = true
    },
    destory_edit_activity(refresh = false) {
      this.is_edit = false
      if (refresh) {
        this.fetch_member_activity_list()
      }
    },
    see_activity: function(row) {
      const activity_id = row.activity_id
      const router = {
        path: '/member/details',
        query: {
          id: activity_id
        }
      }
      this.$router.push(router)
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
      background-color: #d0d0d7;
    }

    .table-content {
      margin: 20px;
    }
  }
}
</style>
