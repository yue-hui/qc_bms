<template>
  <div class="work-orders-tags">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">标签名称:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.tag_name"
                    size="mini"
                    clearable
                    placeholder="请输入标签名称"
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">标签级别:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.tag_level_id"
                    size="mini"
                    placeholder="请选择标签级别"
                    clearable
                    @change="search">
                    <el-option
                      v-for="item in tag_levels"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="12" :lg="16" :xl="16" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <gl-button
                  pid="10088"
                  class="download details-tab"
                  size="mini"
                  type="success"
                  @click="create_tag">创建标签
                </gl-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="table-content">
        <el-table
          v-loading="loading"
          :data="tags"
          size="mini"
          stripe>
          <el-table-column
            label="标签名称"
            prop="tag_name" />
          <el-table-column
            label="标签级别"
            prop="tag_level" />
          <el-table-column
            align="center"
            label="操作"
            width="174"
            prop="control">
            <template slot-scope="scope">
              <gl-button
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="edit_tag(scope.row)">编辑</gl-button>
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
  </div>
</template>

<script>
import { TABLE_PAGE_SIEZS_LIST, WORK_ORDERS_LEVELS } from '@/utils/constant'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { get_work_order_tags_by_cascade } from '@/api/work_order_system'

export default {
  name: 'WorkOrdersTags',
  components: {},
  data() {
    const page_size = getPagenationSize()
    return {
      query_sets: {
        tag_name: '',
        tag_level_id: ''
      },
      loading: false,
      tag_levels: WORK_ORDERS_LEVELS,
      tags: [],
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
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.refresh_data()
    },
    change_current: function(page) {
      this.page = page
      this.search()
    },
    search: function() {
      this.fetch_tags()
    },
    refresh_data: function() {
      this.page = 1
      this.search()
    },
    create_tag: function() {
      // 创建标签
    },
    edit_tag: function() {
      // 编辑标签
    },
    fetch_tags: function() {
      //
      get_work_order_tags_by_cascade().then(res => {
        if (res.status === 0) {
          // 工单列表
          this.tags = res.data
        } else {
          //
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$select_box_witdh: 120px;
$label_height: 40px;

.work-orders-tags {
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

    .table-content {
      margin: 20px;
    }
  }
}
</style>
