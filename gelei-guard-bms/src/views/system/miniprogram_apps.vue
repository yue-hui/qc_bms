<template>
  <div class="device-recorrd-content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">应用名称:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.soft_name"
                    size="mini"
                    placeholder="应用名称"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">应用包名:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.bundle_id"
                    size="mini"
                    placeholder="应用包名"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">小程序名:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_sets.miniprogram_name"
                    size="mini"
                    placeholder="小程序名"
                    clearable
                    @change="query_condition_change" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="24" :md="24" :lg="6" :xl="12" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-button size="mini" type="success" @click="create_miniprogram_app">新建</el-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          v-loading="loading"
          :data="miniprogram_list"
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="应用包名"
            prop="bundle_id"
            width="240" />
          <el-table-column
            align="center"
            label="应用名称"
            prop="soft_name" />
          <el-table-column
            align="center"
            label="小程序名"
            prop="miniprogram_name">
            <template slot-scope="scope">
              <div class="soft-item">
                <img v-if="scope.row.icon" :src="scope.row.icon" :onerror="img_error_icon" class="origin" alt="小程序图标">
                <img v-else src="@/assets/imgs/bg_icon_no.png" title="小程序默认图标" class="default" alt="小程序默认图标">
                <span :class="{origin: !!scope.row.icon}" class="soft-name">{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="小程序路径"
            prop="packages" />
          <el-table-column
            align="center"
            title="点击次数（退出小程序）"
            label="点击次数（退出小程序）"
            prop="exit_clicks" />
          <el-table-column
            align="center"
            label="操作"
            prop="control">
            <template slot-scope="scope">
              <el-button
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="edit_miniprogram(scope.row)">编辑
              </el-button>
              <el-button
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="del_miniprogram(scope.row)">删除
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
      <create-and-edit-miniprogram-app
        v-if="show_dialog"
        :mini-program-info="current"
        :show-dialog="show_dialog"
        :is-new="is_create"
        @destory="refresh" />
    </div>
  </div>
</template>

<script>
import createAndEditMiniprogramApp from './components/create_and_edit_miniprogram_app'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { pure_object_null_value } from '@/utils/common'
import { delete_miniprogram_app, get_miniprogram_list } from '@/api/interactive'

export default {
  name: 'DevicesRecord',
  components: {
    createAndEditMiniprogramApp
  },
  data() {
    const page_size = getPagenationSize()
    const img_error_icon = 'this.src="' + require('@/assets/imgs/bg_icon_no.png') + '"'
    return {
      loading: false,
      img_error_icon,
      is_create: 0,
      current: {},
      show_dialog: false,
      query_sets: {
        bundle_id: '',
        soft_name: '',
        miniprogram_name: ''
      },
      total: 0,
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      miniprogram_list: []
    }
  },
  computed: {},
  mounted: function() {
    this.query()
  },
  methods: {
    get_condition_with_pagination() {
      const query_sets = this.query_sets
      let condition = {}
      condition['page_no'] = this.page
      condition['page_num'] = this.page_size
      condition['miniprogram_name'] = query_sets.miniprogram_name
      condition['bundle_id'] = query_sets.bundle_id
      condition['soft_name'] = query_sets.soft_name
      condition = pure_object_null_value(condition)
      return condition
    },
    query_condition_change: function() {
      this.page = 1
      this.page_size = getPagenationSize()
      this.query()
    },
    query() {
      this.fetch_miniprogram_list()
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
    },
    change_current: function(page) {
      this.page = page
    },
    create_miniprogram_app: function() {
      this.is_create = 1
      this.current = {}
      this.show_dialog = true
    },
    edit_miniprogram: function(row) {
      this.is_create = 2
      this.current = row
      this.show_dialog = true
    },
    refresh(is_reload = false) {
      this.show_dialog = false
      this.is_create = 0
      this.current = {}
      is_reload ? this.fetch_miniprogram_list() : ''
    },
    del_miniprogram: function(row) {
      this.$confirm('你确定删除该小程序+吗？')
        .then(_ => {
          const config = {
            mp_id: row.mp_id
          }
          delete_miniprogram_app(config).then(res => {
            if (res.status === 0) {
              this.fetch_miniprogram_list()
              this.$message.success('删除成功!')
            } else {
              this.$message.error('删除失败!')
            }
          })
        })
    },
    fetch_miniprogram_list: function() {
      const config = this.get_condition_with_pagination()
      get_miniprogram_list(config).then(res => {
        if (res.status === 0) {
          this.total = res.total_count
          this.miniprogram_list = res.data
        } else {
          this.total = 0
          this.miniprogram_list = []
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.device-recorrd-content {
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

          &.layout-right {
            text-align: right;
          }

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

      .soft-item {
        display: flex;
        align-items: center;
        justify-content: center;
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
            font-size: 16px;
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
