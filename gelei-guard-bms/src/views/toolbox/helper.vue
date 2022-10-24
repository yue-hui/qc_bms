<template>
  <div class="gelei-content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">所属产品:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.product"
                    size="mini"
                    placeholder="问题类型"
                    @change="change_query_status">
                    <el-option
                      v-for="item in advertise_platform_types"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">问题类别:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.type"
                    size="mini"
                    clearable
                    placeholder="问题类别"
                    @change="change_query_status">
                    <el-option
                      v-for="item in question_types"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">状态:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.status"
                    size="mini"
                    placeholder="请选择状态"
                    clearable
                    @change="change_query_status">
                    <el-option
                      v-for="item in help_question_status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="24" :md="6" :lg="8" :xl="12" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <gl-button pid="20044" size="mini" type="success" @click="add_questions">添加帮助问题</gl-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="table-content">
        <el-table
          v-loading="loading"
          :data="questions"
          size="mini"
          stripe>
          <el-table-column
            label="序号"
            prop="_id"
            width="50" />
          <el-table-column
            label="帮助问题"
            prop="question" />
          <el-table-column
            label="状态"
            prop="status_label"
            width="180" />
          <el-table-column
            label="权重"
            prop="weight"
            width="180" />
          <el-table-column
            label="所属产品"
            prop="product_label"
            width="180" />
          <el-table-column
            label="问题类型"
            prop="type_label"
            width="180" />
          <el-table-column
            label="展现形式"
            prop="show_type_label"
            width="180" />
          <el-table-column
            label="操作"
            prop="control"
            width="260">
            <template slot-scope="scope">
              <gl-button pid="20081" size="small" type="text" @click="edit_questions(scope.row)">编辑</gl-button>
              <gl-button pid="10062" size="small" type="text" @click="prefer_deploy(scope.row)">{{ show_deploy_name(scope.row) }}</gl-button>
              <gl-button pid="10042" size="small" type="text" @click="del_questions(scope.row)">删除</gl-button>
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

      <questions v-if="show_dialog" :is_new="is_create" :rid="record_id" @destory="close_dialog" />
    </div>
  </div>
</template>

<script>
import questions from '@/views/toolbox/components/questions'
import { delete_questions, deploy_qa, get_patriarch_questions_qa_list, get_questions_list } from '@/api/interactive'
import { help_question_status } from '@/views/toolbox/data/promotion'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { ADVERTISE_PLATFORM_TYPES, HELP_SHOW_TYPES, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { get_value_from_map_list, pure_object_null_value } from '@/utils/common'

export default {
  components: {
    questions
  },
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      help_question_status,
      content: '青葱为您守护！',
      init: '',
      questions: [],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      is_create: true,
      show_dialog: false,
      deploy_name: '开启',
      record_id: '',
      query_sets: {
        status: '',
        type: '',
        product: '01'
      },
      advertise_platform_types: ADVERTISE_PLATFORM_TYPES,
      question_types: []
    }
  },
  computed: {},
  mounted: function() {
    this.init_helper()
  },
  methods: {
    init_helper() {
      // 活动类型
      const config = {
        product: this.query_sets.product
      }
      this.loading = true
      get_patriarch_questions_qa_list(config).then(res => {
        if (res.status === 0) {
          this.question_types = res.data.map(r => {
            return {
              value: r.type_code,
              label: r.type_name
            }
          })
          this.load_data()
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    show_deploy_name(row) {
      if (row.status === '1') {
        return '关闭'
      } else {
        return '开启'
      }
    },
    load_data() {
      this.fetch_question_list()
    },
    add_questions: function() {
      this.is_create = true
      this.show_dialog = true
    },
    edit_questions: function(row) {
      this.record_id = row.record_id
      this.is_create = false
      this.show_dialog = true
    },
    close_dialog: function(is_reload = false) {
      this.show_dialog = false
      if (is_reload) {
        this.fetch_question_list()
      }
    },
    prefer_deploy: function(row) {
      /* 发布按钮 */
      const config = {
        record_id: row.record_id
      }
      if (row.status === '0') {
        config['published'] = true
        this.$confirm('确认是否发布？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deploy_qa(config).then(res => {
            if (res.statusCode !== 200) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.load_data()
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作!'
          })
        })
      } else {
        config['published'] = false
        this.$confirm('确认是否取消发布？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deploy_qa(config).then(res => {
            if (res.statusCode !== 200) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.load_data()
            } else {
              this.$message.error(res.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作!'
          })
        })
      }
    },
    del_questions: function(row) {
      /* 发布按钮 */
      const config = {
        record_id: row.record_id
      }
      config['published'] = true
      this.$confirm('确认是否删除该帮助问题？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delete_questions(config).then(res => {
          if (res.statusCode !== 200) {
            this.$message.success(res.message)
            this.load_data()
          } else {
            this.$message.error(res.message)
          }
        })
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
      this.fetch_question_list()
    },
    change_current: function(page) {
      this.page = page
      this.fetch_question_list()
    },
    get_config: function() {
      const query_params = Object.assign({}, this.query_sets)
      const config = pure_object_null_value(query_params)
      config['page_no'] = this.page
      config['page_num'] = this.page_size
      return config
    },
    show_status_label(r) {
      if (r === '0') {
        return '未生效'
      } else {
        return '已生效'
      }
    },
    fetch_question_list() {
      const config = this.get_config()
      get_questions_list(config).then(res => {
        const base_index = (config.page_no - 1) * config.page_num + 1
        this.questions = res.data.map((r, i, _a) => {
          const status_label = this.show_status_label(r.status)
          const product_label = get_value_from_map_list(r.product, ADVERTISE_PLATFORM_TYPES, '未知')
          const show_type_label = get_value_from_map_list(r.show_type, HELP_SHOW_TYPES, '富文本')
          return {
            ...r,
            status_label,
            _id: base_index + i,
            product_label,
            show_type_label
          }
        })
        this.total = res.total_count
      })
    },
    change_query_status() {
      this.page = 1
      this.page_size = getPagenationSize()
      this.init_helper()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$select_box_witdh: 120px;
$label_height: 40px;

.gelei-content {
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
