<template>
  <div class="content">

    <div class="header-line">
      <div class="header-line-left">
        <div class="header-block search-time">
          <label class="search-item">年级:</label>
          <div class="block">
            <el-select
              v-model="information.grade_from"
              class="select-box-width"
              clearable
              size="mini"
              placeholder="请选择年级">
              <el-option
                v-for="item in grade_list_1"
                :key="item.val"
                :label="item.name"
                :value="item.val" />
            </el-select>
            <span class="grade-to-word">至</span>
            <el-select
              v-model="information.grade_to"
              class="select-box-width"
              clearable
              size="mini"
              placeholder="请选择年级">
              <el-option
                v-for="item in grade_list_2"
                :key="item.val"
                :label="item.name"
                :value="item.val" />
            </el-select>
          </div>
        </div>

        <div class="header-block phone-block">
          <label class="search-item">学科:</label>
          <el-select
            v-model="information.subject"
            class="select-box-width"
            clearable
            collapse-tags
            multiple
            size="mini"
            placeholder="请选择学科">
            <el-option
              v-for="item in subject_list"
              :key="item.val"
              :label="item.name"
              :value="item.val" />
          </el-select>
        </div>

        <div class="header-block phone-block">
          <label class="search-item">应用名称:</label>
          <el-input
            v-model="information.app_name"
            size="mini"
            class="select-box-width"
            clearable />
        </div>
      </div>

      <div class="header-line-right">
        <el-button type="success" size="mini" @click="query">查询</el-button>
      </div>
    </div>

    <div class="new-application">
      <el-button
        class="new-application-button"
        round
        size="mini"
        type="success"
        @click="create_app">创建应用
      </el-button>
    </div>

    <!--<hr class="hr-diviser">-->

    <div class="content-body">

      <!--推荐应用列表-->
      <application-list
        ref="app_list"
        :condition="condition"
        @reflex="reflex" />

      <!--添加新应用-->
      <application-create
        ref="app_dialog"
        :current="current_app"
        :is-create="is_create"
        :is-show="show_app_dialog"
        @receive="receive" />

    </div>
  </div>
</template>

<script>
import { GRADE_LIST, SUBJECT_LIST } from '@/utils/constant'
import applicationList from '@/views/recommend/components/application_list'
import applicationCreate from '@/views/recommend/components/create_application'
import { forbidden_soft_remmend } from '@/api/interactive'

export default {
  components: {
    applicationList,
    applicationCreate
  },
  data() {
    return {
      information: {
        grade_from: '',
        grade_to: '',
        subject: [],
        app_name: ''
      },
      is_create: false,
      current_app: {},
      show_app_dialog: false,
      subject_list: SUBJECT_LIST,
      grade_list_1: GRADE_LIST,
      grade_list_2: GRADE_LIST
    }
  },
  computed: {
    condition: function() {
      const options = {}
      options['begin_grade'] = this.information.grade_from
      options['end_grade'] = this.information.grade_to
      options['subject_list'] = this.information.subject
      options['soft_name'] = this.information.app_name
      return options
    }
  },
  watch: {
    information: {
      handler(information, old_information) {
        if (information.grade_from !== old_information.grade) {
          this.grade_from_change(information.grade_from, old_information.grade)
        }
      },
      deep: true
    }
  },
  mounted: function() {
  },
  methods: {
    grade_from_change(grade, old_grade) {
      this.grade_list_2 = GRADE_LIST.filter((r) => r.val >= grade)
      if (this.grade_to < grade) {
        this.grade_to = this.grade_list_2[0].val
      }
    },
    create_app() {
      this.is_create = true
      this.show_app_dialog = true
    },
    edit_app(row) {
      this.current_app = row
      this.is_create = false
      this.show_app_dialog = true
      this.$refs.app_dialog.initital_with_row(this.current_app)
    },
    delete_app(record_id) {
      this.forbidden(record_id)
    },
    forbidden(record_id) {
      const config = {
        record_id
      }
      forbidden_soft_remmend(config).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
          this.query()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    receive(status) {
      this.$refs.app_list.reload()
      this.show_app_dialog = status
    },
    query() {
      this.$refs.app_list.search()
    },
    reflex(options = {}) {
      const type = options['type']
      const params = options['params']
      if (type === 'delete') {
        this.delete_app(params['record_id'])
      } else if (type === 'edit') {
        this.current_app = {
          ...params
        }
        this.edit_app(params)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$select_box_witdh: 160px;
$label_height: 28px;

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
    padding: 15px 25px;
    min-height: 120px;
  }

  .header-line {
    display: flex;
    flex-direction: row;

    .header-line-left {
      flex: 1;
      display: flex;
      flex-direction: row;

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
          color: grey;
          font-size: 16px;
          font-weight: 400;
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
    }

    .select-box-width {
      width: $select_box_witdh;
    }

    .grade-to-word {
      padding: 0 10px;
    }
  }

  .new-application {
    height: 60px;
    /*background-color: rgba(231, 231, 231, 0.56);*/
    display: flex;
    flex-direction: row;
    align-items: center;
    /*padding-left: 15px;*/

    .new-application-button {
      width: 80px;
      height: 28px;
    }
  }
}
</style>
