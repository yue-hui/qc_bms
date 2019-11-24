<template>
  <div class="content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">平台:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.platform"
                    size="mini"
                    placeholder="请选择平台"
                    clearable
                    @change="query_condition_change">
                    <el-option
                      v-for="item in platforms"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          :data="version_list"
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="版本号"
            prop="version"
            width="160" />
          <el-table-column
            align="center"
            label="升级策略名称"
            prop="update_title" />
          <el-table-column
            align="center"
            label="版本累计用户"
            prop="device_count" />
          <el-table-column
            align="center"
            label="占比"
            prop="percent" />
          <el-table-column
            align="center"
            label="平台"
            prop="platform_label"
            width="160" />
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
import { get_version_distribution } from '@/api/interactive'
import { platforms } from '@/views/toolbox/data/promotion'
import { get_value_from_map_list, pure_object_null_value } from '@/utils/common'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'

export default {
  components: {},
  data() {
    const page_size = getPagenationSize()
    return {
      query_sets: {
        platform: ''
      },
      version_list: [],
      platforms,
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0
    }
  },
  computed: {},
  mounted: function() {
    this.fetch_version_distribution_list()
  },
  methods: {
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.query()
    },
    change_current: function(page) {
      this.page = page
      this.query()
    },
    get_condition() {
      return this.query_sets
    },
    get_condition_with_pagination() {
      let condition = this.get_condition()
      condition = pure_object_null_value(condition)
      condition['page_no'] = this.page
      condition['page_num'] = this.page_size
      return condition
    },
    query_condition_change() {
      this.page = 1
      this.page_size = getPagenationSize()
      this.query()
    },
    query() {
      this.fetch_version_distribution_list()
    },
    version_distribution_map(data) {
      return data.map(r => {
        const platform_label = get_value_from_map_list(r.platform, platforms)
        return {
          ...r,
          platform_label
        }
      })
    },
    fetch_version_distribution_list() {
      /* 获取订单列表 */
      const data = this.get_condition_with_pagination()
      get_version_distribution(data).then(res => {
        if (res.status === 0) {
          this.version_list = this.version_distribution_map(res.data)
          this.total = res.total_count
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
    min-height: 120px;

    .search-area {
      padding: 20px 20px 0 20px;

      .row-bg {
        .col-bg {
          padding: 5px 0;

          &.col-right-button {
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
