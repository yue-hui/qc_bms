<template>
  <div class="gelei-content">

    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="4" class="order-number-list">年级:</el-col>
                <el-col :span="20" class="order-value-list">
                  <el-select
                    v-model="information.grade_from"
                    class="select-box-width"
                    clearable
                    size="mini"
                    placeholder="请选择年级"
                    @change="next_tick_query">
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
                    placeholder="请选择年级"
                    @change="next_tick_query">
                    <el-option
                      v-for="item in grade_list_2"
                      :key="item.val"
                      :label="item.name"
                      :value="item.val" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">学科:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="information.subject"
                    class="select-box-width"
                    clearable
                    collapse-tags
                    multiple
                    size="mini"
                    placeholder="请选择学科"
                    @change="next_tick_query">
                    <el-option
                      v-for="item in subject_list"
                      :key="item.val"
                      :label="item.name"
                      :value="item.val" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">应用名称:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="information.app_name"
                    size="mini"
                    class="select-box-width"
                    clearable
                    @change="next_tick_query" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="4" :md="4" :lg="8" :xl="10" class="col-bg layout-right">
            <el-row>
              <el-button
                class="download details-tab"
                size="mini"
                type="success"
                @click="create_app">创建应用
                <svg-icon icon-class="download" />
              </el-button>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />

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
      this.is_create = !this.is_create
    },
    next_tick_query(r) {
      this.$nextTick((r) => {
        this.query()
      })
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
$label_height: 28px;

.gelei-content {
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

          .order-number-list {
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            font-weight: bold;
            color: #4d4d4d;
            white-space: nowrap;
          }

          .order-value-list {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: left;

            .grade-to-word {
              padding: 0 5px;
              font-size: 14px;
            }
          }

          .valid-date-range {
            padding: 0 10px;

            .valid-value-area {
              display: flex;
              justify-content: space-between;
              flex-direction: row;
              align-items: center;

              .valid-date-span {
                padding: 0 10px;
              }
            }
          }
        }
      }
    }

    .between-search-area-and-table-display {
      height: 1px;
      margin: 10px 20px 15px 20px;
      background-color: #d0d0d7;
    }

    .content-body {
      margin: 20px;
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
