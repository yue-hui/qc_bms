<template>
  <div class="content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">用户名:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.user_id"
                    size="mini"
                    placeholder="请输入用户名"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">真实姓名:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.real_name"
                    size="mini"
                    placeholder="请输入真实姓名"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">角色名称:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.role_id"
                    size="mini"
                    filterable
                    remote
                    clearable
                    placeholder="请选择角色名称"
                    @change="query_condition_change">
                    <el-option
                      v-for="item in roles"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">状态:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.state"
                    size="mini"
                    placeholder="请选择用户当前状态"
                    clearable
                    @change="query_condition_change">
                    <el-option
                      v-for="item in system_account_enable_state"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">账号类型:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.account_type"
                    size="mini"
                    placeholder="请选择账号类型"
                    clearable
                    @change="query_condition_change">
                    <el-option
                      v-for="item in account_name_list"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="18" :lg="18" :xl="4" class="col-bg layout-right col-right-button">
            <div class="grid-content bg-purple-light">
              <el-row>
                <gl-button pid="20067" size="mini" type="success" @click="create_account">创建账号</gl-button>
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
            label="账号名称"
            prop="user_id"
            width="160" />
          <el-table-column
            align="center"
            label="真实姓名"
            prop="real_name"
            width="180" />
          <el-table-column
            align="center"
            label="角色名称"
            prop="role_name"
            width="180" />
          <el-table-column
            align="center"
            label="账号类型"
            prop="account_name"
            width="180" />
          <el-table-column
            align="center"
            label="最近登录时间"
            prop="first_login_time_label" />
          <el-table-column
            align="center"
            label="创建时间"
            prop="create_time_label" />
          <el-table-column
            :width="80"
            align="center"
            label="状态"
            prop="status">
            <template slot-scope="scope">
              <span :class="{'green': scope.row.state === '1', 'red': scope.row.state === '0'}">{{ scope.row.state_label }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            prop="control">
            <template slot-scope="scope">
              <gl-button
                :disabled="scope.row.user_id === 'gladmin'"
                pid="20068"
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="confirm_change_account_state(scope.row)">{{ show_table_button_label(scope.row) }}
              </gl-button>
              <gl-button
                :disabled="scope.row.user_id === 'gladmin'"
                pid="20069"
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="edit_account(scope.row)">编辑
              </gl-button>
              <gl-button
                :disabled="scope.row.user_id === 'gladmin'"
                pid="20091"
                size="small"
                style="padding-bottom: 2px; border-bottom: 1px solid;"
                type="text"
                @click="reset_account_password(scope.row)">重置密码
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

    <reset-system-account-password
      v-if="show_reset_pannel"
      :user-id="current_user_id"
      :show-dialog="show_reset_pannel"
      @callback="reset_callback"
    />

    <create-and-edit-system-account
      v-if="show_create_or_edit_pannel"
      :user="current_user"
      :roles="roles"
      :show-dialog="show_create_or_edit_pannel"
      @callback="create_or_edit_callback"
    />
  </div>
</template>

<script>
import ResetSystemAccountPassword from './components/reset_system_account_password'
import CreateAndEditSystemAccount from './components/create_and_edit_system_account'
import {
  ACCOUNT_NAME_LIST,
  DATE_TIME_FORMAT,
  DEFAULT_PAGE_SIZE,
  SYSTEM_ACCOUNT_ENABLE_STATE, TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { enable_or_disable_system_account, get_all_sys_roles, get_system_users } from '@/api/interactive'
import { date_formatter, get_value_from_map_list } from '@/utils/common'

export default {
  name: 'AccountManagement',
  components: {
    ResetSystemAccountPassword,
    CreateAndEditSystemAccount
  },
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      query_sets: {
        user_id: '',
        real_name: '',
        role_id: '',
        account_type: '',
        state: ''
      },
      current_user: {},
      current_user_id: '',
      show_reset_pannel: false,
      show_create_or_edit_pannel: false,
      account_name_list: ACCOUNT_NAME_LIST,
      roles: [],
      resource: [],
      system_account_enable_state: SYSTEM_ACCOUNT_ENABLE_STATE,
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0
    }
  },
  mounted: function() {
    get_all_sys_roles().then(res => {
      if (res.status === 0) {
        this.roles = res.data.map(r => {
          return {
            value: r.role_id,
            label: r.role_name
          }
        })
        this.fetch_system_users()
      } else {
        this.$message.error(res.message)
      }
    })
  },
  methods: {
    show_table_button_label(row) {
      if (row.state === '1') {
        return '关闭'
      } else {
        return '开启'
      }
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
      this.page_size = DEFAULT_PAGE_SIZE
      this.query()
    },
    query() {
      this.fetch_system_users()
    },
    fetch_system_users() {
      this.loading = true
      const config = this.get_condition_with_pagination()
      /* 拉取广告配置列表 */
      get_system_users(config).then(res => {
        if (res.status === 0) {
          this.total = res.total_count
          const base_index = (this.page - 1) * this.page_size + 1
          this.resource = res.data.map((r, _i) => {
            const account_name = get_value_from_map_list(r.account_type, ACCOUNT_NAME_LIST, ACCOUNT_NAME_LIST[0].label)
            const create_time_label = date_formatter(r.create_time, DATE_TIME_FORMAT, false)
            const first_login_time_label = date_formatter(r.first_login_time, DATE_TIME_FORMAT, false)
            const state_label = get_value_from_map_list(r.state, SYSTEM_ACCOUNT_ENABLE_STATE)
            return {
              _idx: base_index + _i,
              ...r,
              state_label,
              account_name,
              first_login_time_label,
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
    reset_account_password(row) {
      // 重置密码
      this.current_user_id = row.user_id
      this.show_reset_pannel = true
    },
    reset_callback() {
      this.show_reset_pannel = false
      this.current_user_id = ''
    },
    create_or_edit_callback(refresh = true) {
      this.current_user = {}
      this.show_create_or_edit_pannel = false
      if (refresh) {
        this.query()
      }
    },
    edit_account(row) {
      // 编辑用户信息
      this.current_user = row
      this.show_create_or_edit_pannel = true
    },
    create_account() {
      // 创建用户信息
      this.current_user = {}
      this.show_create_or_edit_pannel = true
    },
    change_account_state(config) {
      // 用户是否在线
      enable_or_disable_system_account(config).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.query()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    confirm_change_account_state(row) {
      // 确认改变账户状态
      let confirm_message,
        state
      if (row.state === '0') {
        confirm_message = '你确定要开启该账号吗？'
        state = '1'
      } else if (row.state === '1') {
        confirm_message = '你确定要关闭该账号吗？'
        state = '0'
      } else {
        confirm_message = '用户账号异常，请取消本次操作!'
        state = null
      }
      this.$confirm(confirm_message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (state) {
          const params = {
            state,
            user_id: row.user_id
          }
          this.change_account_state(params)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作!'
        })
      })
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.fetch_system_users()
    },
    change_current: function(page) {
      this.page = page
      this.fetch_system_users()
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
