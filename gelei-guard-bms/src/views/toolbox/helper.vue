<template>
  <div class="content">

    <div class="header-line">
      <div class="control-box">
        <el-button
          type="success"
          size="mini"
          @click="add_questions"
        >添加帮助问题
        </el-button>
      </div>
    </div>

    <div class="content-body">
      <div class="table-block">
        <el-table
          :data="questions"
          size="mini"
          style="width: 100%">
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
            label="操作"
            prop="control"
            width="260">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="edit_questions(scope.row)">编辑</el-button>
              <el-button size="small" type="text" @click="prefer_deploy(scope.row)">{{ show_deploy_name(scope.row) }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="page"
          :page-size="page_size"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, prev, pager, next, jumper"
          @current-change="change_current"
          @size-change="table_size_change" />
      </div>

      <questions v-if="show_dialog" :is_new="is_create" :rid="record_id" @destory="close_dialog" />

    </div>
  </div>
</template>

<script>
import questions from '@/views/toolbox/components/questions'
import { deploy_qa, get_questions_list } from '@/api/interactive'
import { DEFAULT_PAGE_SIZE } from '@/utils/constant'

export default {
  components: {
    questions
  },
  data() {
    return {
      content: '格雷为您守护！',
      init: '',
      questions: [],
      page: 1,
      page_size: DEFAULT_PAGE_SIZE,
      total: 0,
      is_create: true,
      show_dialog: false,
      deploy_name: '开启',
      record_id: ''
    }
  },
  computed: {},
  mounted: function() {
    this.load_data()
  },
  methods: {
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
    table_size_change: function(page_size) {
      this.page_size = page_size
      this.fetch_question_list()
    },
    change_current: function(page) {
      this.page = page
      this.fetch_question_list()
    },
    get_config: function() {
      const config = {
        page_no: this.page,
        page_num: this.page_size
      }
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
        const questions = []
        res.data.forEach((r, i, _a) => {
          const status_label = this.show_status_label(r.status)
          const question = {
            ...r,
            status_label,
            _id: base_index + i
          }
          questions.push(question)
        })
        this.questions = questions
        this.total = res.total_count
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
  padding: 0 10px 25px 10px;
  display: flex;
  flex-direction: column;

  .content-body {
    border: 1px solid #c7d5ee;
    height: 100%;
    padding: 15px 25px;
    min-height: 120px;
  }

  .header-line {
    display: flex;
    flex-direction: row;

    .control-box {
      padding: 10px 15px;
    }
  }
}
</style>
