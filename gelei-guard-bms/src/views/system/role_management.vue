<template>
  <div class="content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">角色名称:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.role_name"
                    size="mini"
                    clearable
                    placeholder="请选择角色名称"
                    @change="query" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="16" :md="18" :lg="18" :xl="20" class="col-bg layout-right col-right-button">
            <div class="grid-content bg-purple-light">
              <el-row>
                <gl-button pid="20072" size="mini" type="success" @click="create_role">创建角色</gl-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          v-loading="loading"
          :data="resource"
          size="mini"
          stripe>
          <el-table-column
            align="center"
            label="序号"
            prop="_idx"
            width="60" />
          <el-table-column
            align="center"
            label="角色名称"
            prop="role_name"
            width="260" />
          <el-table-column
            align="center"
            label="创建时间"
            prop="create_time_label"
            width="180" />
          <el-table-column
            align="center"
            label="操作"
            prop="control">
            <template slot-scope="scope">
              <gl-button
                :disabled="scope.row.role_name === 'admin'"
                pid="20073"
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="edit_account(scope.row)">编辑权限</gl-button>
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

    <CreateAndEditRole
      v-if="show_create_or_edit_role_pannel"
      :role="current_role"
      :show-dialog="show_create_or_edit_role_pannel"
      @callback="create_or_edit_role_callback"
    />
  </div>
</template>

<script>
import ExElButton from '@/components/ExElButton'
import {
  DATE_TIME_FORMAT,
  DEFAULT_PAGE_SIZE,
  TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import { get_sys_roles } from '@/api/interactive'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { date_formatter } from '@/utils/common'
import CreateAndEditRole from './components/create_and_edit_role'

export default {
  name: 'RolesManagement',
  components: {
    ExElButton,
    CreateAndEditRole
  },
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      query_sets: {
        role_name: ''
      },
      current_role: {},
      show_create_or_edit_role_pannel: false,
      resource: [],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0
    }
  },
  computed: {},
  mounted: function() {
    this.query()
  },
  methods: {
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
      this.page_size = DEFAULT_PAGE_SIZE
      this.query()
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.fetch_system_roles()
    },
    change_current: function(page) {
      this.page = page
      this.fetch_system_roles()
    },
    query() {
      this.fetch_system_roles()
    },
    fetch_system_roles: function() {
      this.loading = true
      const config = this.get_condition_with_pagination()
      get_sys_roles(config).then(res => {
        if (res.status === 0) {
          this.total = res.total_count
          const base_index = (this.page - 1) * this.page_size + 1
          this.resource = res.data.map((r, _i) => {
            const create_time_label = date_formatter(r.create_time, DATE_TIME_FORMAT, false)
            return {
              _idx: base_index + _i,
              ...r,
              create_time_label
            }
          })
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    create_role: function() {
      // 创建角色
      this.current_role = {}
      this.show_create_or_edit_role_pannel = true
    },
    edit_account: function(row) {
      // 编辑角色
      this.current_role = row
      this.show_create_or_edit_role_pannel = true
    },
    create_or_edit_role_callback: function(refresh = true) {
      // 回调函数
      this.current_role = {}
      this.show_create_or_edit_role_pannel = false
      if (refresh) {
        this.query()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  /*min-height: 800px;*/
  padding: 20px 10px 25px 10px;
  display: flex;
  flex-direction: column;

  .content-body {
    border: 1px solid #EAEAEA;
    height: 100%;
    min-height: 800px;

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

      .green {
        color: #2AD890;
      }

      .red {
        color: #EE4959;
      }
    }
  }
}
</style>
