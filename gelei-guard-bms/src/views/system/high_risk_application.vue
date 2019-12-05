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
                    v-model="query_sets.soft_name"
                    size="mini"
                    placeholder="软件名称"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="18" :lg="19" :xl="20" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-button size="mini" type="success" @click="create_high_risk_app">新建</el-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          v-loading="loading"
          :data="parameter"
          size="mini"
          style="width: 100%">
          <el-table-column
            label="软件ID"
            prop="soft_id" />
          <el-table-column
            label="包名"
            width="400"
            prop="bundle_id" />
          <el-table-column
            label="软件名称"
            prop="soft_name">
            <template slot-scope="scope">
              <div class="soft-item">
                <img v-if="scope.row.soft_icon" :src="scope.row.soft_icon" :onerror="img_error_icon" class="origin" alt="软件图标">
                <img v-else src="@/assets/imgs/bg_icon_no.png" title="软件默认图标" class="default" alt="软件默认图标">
                <span :class="{origin: !!scope.row.soft_icon}" class="soft-name">{{ scope.row.soft_name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="code"
            prop="type_code" />
          <el-table-column
            label="创建时间"
            prop="create_time">
            <template slot-scope="scope">
              {{ scope.row.create_time | formatter_date_string }}
            </template>
          </el-table-column>
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

    <create-and-edit-high-risk-application
      v-if="action !== 0"
      :show-dialog="show_records_pannel"
      :is-new="action"
      :rid="current_soft_id"
      @destory="destory_pannel" />
  </div>
</template>

<script>
import CreateAndEditHighRiskApplication from './components/create_and_edit_high_risk_application'
import { DATE_TIME_FORMAT, MEMBER_TYPES, PACKAGE_STATUS, PACKAGE_TYPE, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { delete_multi_high_risk_soft, get_high_risk_soft_list } from '@/api/interactive'
import { date_formatter } from '@/utils/common'

export default {
  components: {
    CreateAndEditHighRiskApplication
  },
  filters: {
    formatter_date_string: function(time) {
      if (time) {
        return date_formatter(time, DATE_TIME_FORMAT)
      } else {
        return ''
      }
    }
  },
  data() {
    const img_error_icon = 'this.src="' + require('@/assets/imgs/bg_icon_no.png') + '"'
    const page_size = getPagenationSize()
    return {
      loading: false,
      img_error_icon,
      show_records_pannel: false,
      query_sets: {
        item_name: ''
      },
      packages: PACKAGE_TYPE,
      member_types: MEMBER_TYPES,
      status_list: PACKAGE_STATUS,
      current_soft_id: '',
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
      this.action = 0
      this.show_records_pannel = false
    },
    create_high_risk_app: function() {
      this.action = 1
      this.current_soft_id = ''
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
      condition['page_no'] = this.page
      condition['page_num'] = this.page_size
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
    delete_configration: function(row) {
      const confirm_text = '你确定要删除该高危应用吗?'
      this.$confirm(confirm_text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 更新记录
        const config = {
          soft_id: row.soft_id
        }
        delete_multi_high_risk_soft(config).then(res => {
          if (res.status === 0) {
            this.query.item_name = ''
            this.fetch_data()
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message.info('用户已取消操作')
      })
    },
    close_package_dialog(refresh = false) {
      this.action = 0
      this.current = {}
      if (refresh) {
        this.fetch_data()
      }
    },
    edit_configration: function(row) {
      this.action = 2
      this.current_soft_id = row.soft_id
      this.show_records_pannel = true
    },
    fetch_data: function() {
      // 获取高危应用
      const config = this.get_condition()
      this.loading = true
      get_high_risk_soft_list(config).then(res => {
        if (res.status === 0) {
          this.parameter = res.data.map((_c, _i) => {
            return {
              ..._c
            }
          })
          this.total = res.total_count
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

      .soft-item {
        display: flex;
        align-items: center;
        position: relative;

        &:hover {
          img.origin {
            float: inside;
            transfrom: scale(4.8);
            width: 96px;
            height: 96px;
          }
          .soft-name.origin {
            padding-left: 5px;
            font-weight: bolder;
            font-size: 14px;
          }
        }

        img {
          transition: all 0.5s;
          width: 20px;
          height: 20px;
        }

        .soft-name {
          padding-left: 5px;
        }
      }
    }
  }
}
</style>
