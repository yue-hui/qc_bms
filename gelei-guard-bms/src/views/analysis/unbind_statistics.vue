<template>
  <div class="unbind-statistics">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="12" :md="8" :lg="9" :xl="8" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="4" class="order-number-list">选择时间:</el-col>
                <el-col :span="20">
                  <el-date-picker
                    v-model="query_set.datetime_range"
                    end-placeholder="结束日期"
                    range-separator="至"
                    start-placeholder="开始日期"
                    type="daterange"
                    clearable
                    size="mini"
                    unlink-panels
                    @change="query" />
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          v-loading="loading"
          :data="resources"
          size="mini"
          stripe>
          <el-table-column
            align="center"
            width="160"
            label="序号"
            prop="plan_name" />
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
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { TABLE_PAGE_SIEZS_LIST } from '../../utils/constant'
import { getPagenationSize, setPagenationSize } from '../../utils/auth'

export default {
  name: 'UnbindStatistics',
  components: {},
  data() {
    const yesterday = dayjs()
    console.log(yesterday)
    const page_size = getPagenationSize()
    return {
      query_set: {
        datetime_range: []
      },
      loading: false,
      resources: [],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0
    }
  },
  computed: {},
  mounted: function() {
  },
  methods: {
    query: function() {
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.query()
    },
    change_current: function(page) {
      this.page = page
      this.query()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.unbind-statistics {
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
