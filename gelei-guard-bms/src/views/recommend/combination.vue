<template>
  <div class="content">
    <div class="header-line">
      <div class="control-box">
        <el-button
          class="new-combination-button"
          round
          type="success"
          size="mini"
          @click="create_system_recomend">
          创建系统推荐
        </el-button>
      </div>
      <!--<div class="control-box">-->
      <!--<el-button type="primary" class="new-combination-button" size="mini" round @click="create_manual_recomend">创建手工推荐</el-button>-->
      <!--</div>-->
      <div class="control-box">
        <el-select
          v-model="combination_status"
          size="mini"
          placeholder="请选择状态"
          clearable
          @change="change_combination_status">
          <el-option
            v-for="item in combination_all_status"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </div>
      <div class="control-box">
        <el-select
          v-model="recommend_style"
          size="mini"
          placeholder="请选择推荐方式"
          clearable
          @change="change_recommend_style">
          <el-option
            v-for="item in recommend_styles"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </div>
    </div>

    <div class="content-body">

      <!--应用列表-->
      <combination-list
        ref="comb_list"
        :conditions="query_condition"
        @control="control_combination"
        @edit="edit_combination" />

      <!--添加新应用-->
      <combination-create
        v-if="show_app_dialog"
        :condition="current_row"
        :is-create="is_create"
        :is-show="show_app_dialog"
        @receive="receive" />

    </div>
  </div>
</template>

<script>
import { GRADE_LIST, SUBJECT_LIST } from '@/utils/constant'
import combinationList from '@/views/recommend/components/combination_list'
import combinationCreate from '@/views/recommend/components/create_combination'
import { combination_all_status, recommend_styles } from '@/views/recommend/data/data'

export default {
  components: {
    combinationList,
    combinationCreate
  },
  data() {
    return {
      combination_all_status,
      recommend_styles,
      recommend_style: '',
      combination_status: '',
      query_condition: {},
      information: {
        grade_from: '',
        grade_to: '',
        subject: '',
        app_name: ''
      },
      is_create: false,
      show_app_dialog: false,
      current_row: {},
      subject_list: SUBJECT_LIST,
      grade_list_1: GRADE_LIST,
      grade_list_2: GRADE_LIST
    }
  },
  computed: {},
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
    create_system_recomend() {
      this.is_create = true
      this.show_app_dialog = true
    },
    create_manual_recomend() {
      this.is_create = true
      this.show_app_dialog = true
    },
    edit_app() {
      this.is_create = false
      this.show_app_dialog = true
    },
    receive(status) {
      this.show_app_dialog = status
      this.$refs.comb_list.reload()
    },
    edit_combination(row) {
      this.current_row = row
      this.is_create = false
      this.show_app_dialog = true
    },
    control_combination(row) {
      // 推送  已开启  已关闭
    },
    change_combination_condition() {
      this.query_condition = {
        rec_type: this.recommend_style,
        status: this.combination_status
      }
      this.$nextTick(() => {
        this.$refs.comb_list.reset_pagination_and_load_data()
      })
    },
    change_combination_status(status) {
      this.combination_status = status
      this.change_combination_condition()
    },
    change_recommend_style(reco_style) {
      this.recommend_style = reco_style
      this.change_combination_condition()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$select_box_witdh: 120px;
$label_height: 40px;

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
          width: 200px;
        }

        .search-time {
          width: 360px;
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
  }

  .new-combination {
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
    padding-left: 15px;

    .new-combination-button {
      width: 100px;
      height: 28px;
    }
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
