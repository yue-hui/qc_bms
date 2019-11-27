<template>
  <div class="gelei-content">
    <div class="header-line">
      <div class="header-line-left" />
      <div class="header-line-right">
        <div class="control-box">
          <el-button size="mini" type="success" @click="create_package">创建应用专题</el-button>
        </div>
      </div>
    </div>

    <div class="content-body">
      <div class="table-content table-block">
        <el-table
          v-loading="loading"
          :data="recommend_subject_list"
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="应用专题名称"
            prop="subject_name"
            width="200" />
          <el-table-column
            align="center"
            label="年级"
            prop="grade_list"
            width="250">
            <template slot-scope="scope">
              <el-row :gutter="2" class="table-item">
                <el-col
                  v-for="(grade_label, index) in scope.row.grade_label_list"
                  :key="index"
                  :span="8"
                  class="show-list-content">
                  <el-tag size="mini" class="show-list-item">{{ grade_label }}</el-tag>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="应用数量"
            prop="app_count" />
          <el-table-column
            align="center"
            label="安装次数"
            prop="install_count" />
          <el-table-column
            align="center"
            label="创建时间"
            prop="create_time_label" />
          <el-table-column
            align="center"
            label="状态"
            prop="is_listing_label" />
          <el-table-column
            align="center"
            label="操作"
            prop="control">
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
                @click="delete_shelf(scope.row)">删除
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

    <special-create-edit v-if="action" :action="action" :current="current" @callback="close_package_dialog" />

  </div>
</template>

<script>
import SpecialCreateEdit from './components/special_create_edit'
import { DATE_TIME_FORMAT, PACKAGE_STATUS, PACKAGE_TYPE, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import {
  forbidden_recommend_subject,
  get_recommend_subject_list,
  publish_recommend_subject_detail
} from '@/api/interactive'
import { date_formatter, get_grade_label } from '@/utils/common'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'

export default {
  components: {
    SpecialCreateEdit
  },
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      query_sets: {},
      packages: PACKAGE_TYPE,
      status_list: PACKAGE_STATUS,
      action: 0,
      recommend_subject_list: [],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0
    }
  },
  computed: {},
  mounted: function() {
    this.fetch_recommend_subject_list()
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
    grade_label_list(grade_list) {
      return grade_list.map(r => {
        return get_grade_label(r)
      })
    },
    get_condition_with_pagination() {
      const condition = this.get_condition()
      condition['page_no'] = this.page
      condition['page_num'] = this.page_size
      return condition
    },
    field_mapper(data) {
      return data.map(r => {
        const create_time_label = date_formatter(r.create_time, DATE_TIME_FORMAT)
        let is_listing_label
        if (r.is_listing === '1') {
          is_listing_label = '生效中'
        } else if (r.is_listing === '0') {
          is_listing_label = '未生效'
        } else {
          is_listing_label = '未知'
        }
        return {
          ...r,
          is_listing_label,
          grade_label_list: this.grade_label_list(r.grade_list),
          create_time_label
        }
      })
    },
    fetch_recommend_subject_list() {
      this.loading = true
      const options = this.get_condition_with_pagination()
      get_recommend_subject_list(options).then(res => {
        this.recommend_subject_list = this.field_mapper(res.data)
        this.total = res.total_count
      }).finally(() => {
        this.loading = false
      })
    },
    query_condition_change() {
      this.page = 1
      this.page_size = getPagenationSize()
      this.query()
    },
    query() {
      this.fetch_recommend_subject_list()
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.fetch_recommend_subject_list()
    },
    change_current: function(page) {
      this.page = page
      this.fetch_recommend_subject_list()
    },
    show_table_button_label(row) {
      if (row.is_listing === '1') {
        return '下架'
      } else if (row.is_listing === '0') {
        return '上架'
      } else {
        return '状态异常'
      }
    },
    change_shelf_status: function(row) {
      let confirm_text,
        is_listing
      if (row.is_listing === '1') {
        // 已上架
        confirm_text = '你确定要下架该推荐应用专题吗?'
        is_listing = '0'
      } else if (row.is_listing === '0') {
        // 已下架
        confirm_text = '你确定要上架该推荐应用专题吗?'
        is_listing = '1'
      }
      this.$confirm(confirm_text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const options = {
          rec_subject_id: row.rec_subject_id,
          is_listing
        }
        publish_recommend_subject_detail(options).then(res => {
          if (res.status === 0) {
            this.$message.success(res.message)
            this.fetch_recommend_subject_list()
          } else {
            this.$message.error(res.message)
          }
        })
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
        this.fetch_recommend_subject_list()
      }
    },
    create_package() {
      this.action = 1
      this.current = {}
    },
    edit_shelf: function(row) {
      this.action = 2
      this.current = row
    },
    delete_shelf: function(row) {
      if (row.is_listing === '1') {
        // 已上架 专题无法删除
        this.$message.error('该专题已上架，无法删除，请下架后操作!')
        return
      }
      const confirm_text = '推荐应用专题"' + row.subject_name + '"需要下架才可以删除?'
      this.$confirm(confirm_text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const options = {
          rec_subject_id: row.rec_subject_id
        }
        forbidden_recommend_subject(options).then(res => {
          if (res.status === 0) {
            this.$message.success(res.message)
            this.fetch_recommend_subject_list()
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除推荐应用专题的操作'
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$select_box_witdh: 160px;
$label_height: 28px;
.gelei-content {
  width: 100%;
  height: 100%;
  /*min-height: 480px;*/
  padding: 0 10px 25px 10px;
  display: flex;
  flex-direction: column;

  .header-line {
    display: flex;
    flex-direction: row;
    min-height: 60px;

    .header-line-left {
      flex: 1;
      display: flex;
      flex-direction: row;

      .control-box {
        padding: 10px 15px;

        .search-item {
          vertical-align: middle;
          display: inline-block;
          height: $label_height;
          line-height: $label_height;
          padding-right: 8px;
          text-align: left;
          min-width: 64px;
          color: #4d4d4d;
          font-size: 14px;
          font-weight: 600;
        }
      }

      .header-block {
        display: flex;
        flex-direction: row;

        .search-item {
          vertical-align: middle;
          display: inline-block;
          height: $label_height;
          line-height: $label_height;
          padding-right: 8px;
          min-width: 64px;
          color: #4d4d4d;
          font-size: 14px;
          font-weight: 600;
        }
      }

      .phone-block {
        width: 280px;
      }

      .search-time {
        width: 500px;
      }
    }

    .header-line-right {
      min-width: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .select-box-width {
      width: $select_box_witdh;
    }

    .grade-to-word {
      color: #4d4d4d;
      font-size: 14px;
      font-weight: 600;
      padding: 0 10px;
    }
  }

  .content-body {
    /*border: 1px solid #c7d5ee;*/
    height: 100%;
    min-height: 120px;

    .search-area {
      padding: 10px 20px 0 20px;

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
      /*margin: 20px;*/

      .table-item {
        /*background-color: red;*/
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        flex-wrap: wrap;

        &.table-item-center {
          justify-content: center;
        }
      }

      .show-list-content {
        display: flex;
        flex-direction: column;
        text-align: center;
        /*display: block;*/

        .show-list-item {
          min-width: 50px;
          margin: 1px 2px;
        }
      }
    }
  }
}
</style>
