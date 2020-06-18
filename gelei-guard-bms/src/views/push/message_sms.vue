<template>
  <div class="content">
    <div class="header-line">
      <div class="left-sider-box-style">
        <div class="control-box">
          <span class="search-item">接收者手机号:</span>
          <el-input
            style="width: 232px"
            size="mini"
            placeholder="孩子手机号"
            clearable
            @change="change_messagePush_phone" />
        </div>
        <div class="control-box">
          <span class="search-item" >内容:</span>
          <el-input
            style="width: 232px"
            size="mini"
            placeholder="输入内容"
            clearable
            @change="change_messagePush_data" />
        </div>
      </div>
    </div>

    <div class="content-body">
      <!--应用列表-->
      <message-push-sms
        ref="comb_list"
        :conditions="query_condition" />
    </div>
  </div>
</template>

<script>

import messagePushSms from '@/views/push/components/message_push_sms'

export default {
  components: {
    messagePushSms
  },
  data() {
    return {
      query_condition: {},
      messagePush_phone: '',
      messagePush_content: '',
      information: {
        grade_from: '',
        grade_to: '',
        subject: '',
        app_name: ''
      },
      is_create: false,
      show_app_dialog: false,
      current_row: {}
    }
  },
  computed: {},
  watch: {
    information: {
      handler(information, old_information) {
      },
      deep: true
    }
  },
  mounted: function() {
  },
  methods: {
    change_combination_condition() {
      this.query_condition = {
        phone: this.messagePush_phone,
        content: this.messagePush_content
      }
      this.$nextTick(() => {
        this.$refs.comb_list.reset_pagination_and_load_data()
      })
    },
    change_messagePush_phone(reco_style) {
      this.messagePush_phone = reco_style
      this.change_combination_condition()
    },
    change_messagePush_data(reco_style) {
      this.messagePush_content = reco_style
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
    /*border: 1px solid #EAEAEA;*/
    height: 100%;
    /*padding: 15px 25px;*/
    min-height: 120px;
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
    justify-content: space-between;

    .left-sider-box-style {
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
    }

    .right-sider-box-style {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
    }
  }
}
</style>
