<template>
  <div class="content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">模糊搜索:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.item_name"
                    size="mini"
                    placeholder="记录信息"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="18" :lg="19" :xl="20" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-button size="mini" type="success" @click="create_records">创建记录</el-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          :data="parameter"
          size="mini"
          style="width: 100%">
          <el-table-column
            label="参数ID"
            prop="p_id" />
          <el-table-column
            label="参数类型"
            prop="p_type" />
          <el-table-column
            label="参数类型名称"
            prop="p_type_name" />
          <el-table-column
            label="参数显示名称"
            prop="p_label" />
          <el-table-column
            label="参数值"
            prop="p_value" />
          <el-table-column
            label="是否可用"
            prop="enabled" />
          <el-table-column
            label="排序号"
            prop="row_order" />
          <el-table-column
            label="备注"
            prop="remark" />
          <el-table-column
            label="操作"
            prop="control">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="edit_configration(scope.row)">编辑</el-button>
              <el-button size="small" type="text" @click="delete_configration(scope.row)">删除</el-button>
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

    <software-policy :show-dialog="show_records_pannel" :is-new="true" @destory="destory_pannel" />
  </div>
</template>

<script>
import { PACKAGE_STATUS, PACKAGE_TYPE, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import SoftwarePolicy from './components/create_and_edit_software_policy'

export default {
  components: {
    SoftwarePolicy
  },
  data() {
    const page_size = getPagenationSize()
    return {
      show_records_pannel: false,
      query_sets: {
        item_name: ''
      },
      packages: PACKAGE_TYPE,
      status_list: PACKAGE_STATUS,
      action: 0,
      parameter: [],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0
    }
  },
  computed: {},
  mounted: function() {
    this.fetch_data()
  },
  methods: {
    destory_pannel: function(update) {
      //
      if (update) {
        this.fetch_data()
      }
      this.show_records_pannel = false
    },
    create_records: function() {
      this.show_records_pannel = true
    },
    get_condition() {
      const query_params = JSON.parse(JSON.stringify(this.query_sets))
      const condition = {}
      for (const i of Object.keys(query_params)) {
        if (query_params[i]) {
          condition[i] = query_params[i]
        }
      }
      return condition
    },
    get_condition_with_pagination() {
      const condition = this.get_condition()
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
      this.fetch_data()
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.fetch_data()
    },
    change_current: function(page) {
      this.page = page
      this.fetch_data()
    },
    change_shelf_status: function(row) {
      let confirm_text,
        is_listing
      if (row.is_listing === '1') {
        // 已上架
        confirm_text = '你确定要下架该套餐吗?'
        is_listing = '0'
      } else if (row.is_listing === '0') {
        // 已下架
        confirm_text = '你确定要上架该套餐吗?'
        is_listing = '1'
      }
      this.$confirm(confirm_text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 更新记录
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消上下架操作'
        })
      })
    },
    close_package_dialog(refresh = false) {
      this.action = 0
      this.current = {}
      if (refresh) {
        this.fetch_data()
      }
    },
    create_package() {
      this.action = 1
      this.current = {}
    },
    fetch_data: function() {
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
