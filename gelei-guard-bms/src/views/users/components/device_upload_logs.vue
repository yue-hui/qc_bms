<template>
  <div class="component-card-with-dialog">
    <div class="component-card" style="overflow: auto;">
      <div :style="{'max-height': visiable_height}" class="dialog">
        <div class="head-area">
          <div class="title">运行日志记录</div>
          <div class="close-icon"><i class="el-message-box__close el-icon-close" @click="device_upload_logs_close" /></div>
        </div>
        <div class="body-area">
          <div class="filter">
            <div class="date-time">
              <span class="filter-label" style="font-size: 14px;">时间：</span>
              <el-date-picker
                v-model="date_range"
                :picker-options="pickerOptions"
                size="mini"
                type="daterange"
                align="right"
                style="width: 330px;"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" />

              <span class="filter-label" style="font-size: 14px;margin-left: 10px">设备号：</span>
              <el-input v-model="device_id" clearable style="width: 332px" size="mini" placeholder="请输入设备号"/>
            </div>

          </div>
          <div class="device-id-input">
            <div>
              <span class="filter-label" style="font-size: 14px;margin-right: 6px">查询全部：</span>
              <el-checkbox v-model="query_all"/>
              <span class="error-msg">{{ send_ins_msg }}</span>
            </div>
            <div class="btn">
              <el-button :loading="send_ins_loading" size="mini" type="info" @click="send_ins">发送指令</el-button>
              <el-button size="mini" type="primary" @click="query">查询</el-button>
            </div>
          </div>
          <div v-loading="query_loading" class="table-content table-block">
            <el-table
              :data="list"
              size="mini"
              stripe>
              <el-table-column
                align="center"
                width="50"
                label="ID"
                prop="recordId" />
              <el-table-column
                align="center"
                label="日志地址(点击下载)"
                prop="url" >
                <template slot-scope="scope">
                  <a :href="scope.row.url" :title="scope.row.url" target="_blank" style="margin-left: 10px">
                    {{ scope.row.url }}
                  </a>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="上传时间"
                width="180"
                prop="uploadTime" />
            </el-table>
            <el-pagination
              v-if="false"
              :current-page="pagination.current_page"
              :page-size="pagination.page_size"
              :page-sizes="pagination.page_sizes"
              :total="pagination.total"
              layout="total, sizes, prev, pager, next, jumper"
              @current-change="change_current"
              @size-change="table_size_change"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  TABLE_PAGE_SIEZS_LIST,
  DATE_TIME_FORMAT
} from '@/utils/constant'
import { getPagenationSize } from '@/utils/auth'
import { device_send_ins, get_device_upload_logs_list } from '@/api/interactive'
import { date_formatter } from '@/utils/common'
export default {
  props: {
    device_info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // 时间选择器
      date_range: null, // {Array<date:Date, date:Date> | Array<> | null}
      list: [],
      pagination: {
        page_sizes: TABLE_PAGE_SIEZS_LIST,
        current_page: 1,
        total: 40,
        page_size: getPagenationSize()
      },
      pickerOptions: {
        // 限制仅选择近七天
        disabledDate(time) {
          const curDate = new Date().getTime()
          const day = 7 * 24 * 3600 * 1000
          const dateRegion = curDate - day
          return time.getTime() > curDate || time.getTime() < dateRegion
        }
      },
      query_all: false,
      send_ins_loading: false,
      query_loading: false,
      send_ins_msg: '',
      timer: null,
      visiable_height: 0,
      device_id: ''
    }
  },
  mounted() {
    this.visiable_height = document.documentElement.clientHeight + 'px'
    this.device_id = this.device_info.device_id
    this.query()
  },
  methods: {
    device_upload_logs_close() {
      this.$emit('device_upload_logs_close')
    },
    // 发送指令
    send_ins() {
      let start_date = ''
      let end_date = ''
      if (Array.isArray(this.date_range) && this.date_range.length === 2) {
        start_date = String(this.date_range[0].getTime())
        // 以天为单位、选择出来时间是 00:00:00 结束时间加上24小时
        end_date = String(this.date_range[1].getTime() + 24 * 3600 * 1000)
      } else {
        this.send_ins_msg = '必须选择时间'
        clearTimeout(this.timer)
        // eslint-disable-next-line no-return-assign
        return this.timer = setTimeout(() => {
          this.send_ins_msg = ''
        }, 2000)
      }
      if (!this.device_id) {
        this.send_ins_msg = '必须填写设备号'
        clearTimeout(this.timer)
        // eslint-disable-next-line no-return-assign
        return this.timer = setTimeout(() => {
          this.send_ins_msg = ''
        }, 2000)
      }
      this.send_ins_loading = true
      device_send_ins({
        device_id: this.device_id,
        start_date,
        end_date,
        query_event: this.query_all
      })
        .then(res => {
          if (res.status === 0) {
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
        .finally(() => {
          this.send_ins_loading = false
        })
    },
    // 获取日志列表
    query() {
      if (!this.device_id) {
        this.send_ins_msg = '必须填写设备号'
        clearTimeout(this.timer)
        // eslint-disable-next-line no-return-assign
        return this.timer = setTimeout(() => {
          this.send_ins_msg = ''
        }, 2000)
      }
      this.query_loading = true
      get_device_upload_logs_list({
        device_id: this.device_id
      })
        .then(res => {
          console.log(res)
          // eslint-disable-next-line no-empty
          if (res.status === 0) {
            this.list = res.data.map(item => {
              item.uploadTime = date_formatter(Number(item.uploadTime), DATE_TIME_FORMAT)
              return item
            })
          } else {
            this.$message.error(res.message)
          }
        })
        .finally(() => {
          this.query_loading = false
        })
    },
    change_current(page) {

    },
    table_size_change(size) {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $title_height: 40px;
  $z_index_message_dialog: 2000;
  .component-card-with-dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: $z_index_message_dialog;

    .component-card {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.45);
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .dialog {
        min-width: 800px;
        /*min-height: 400px;*/
        position: relative;
        background-color: #FFF;
        z-index: $z_index_message_dialog + 1;
        overflow-y: scroll;

        &::-webkit-scrollbar {
          width: 0;
        }

        .head-area {
          height: $title_height;
          line-height: $title_height;
          padding: 0 10px;
          position: relative;
          font-size: 18px;
          color: #303133;
          font-family: PingFangSC-Regular, 微软雅黑, serif;
          display: flex;
          flex-direction: row;
          background-color: #fbfbff;
          border-bottom: rgba(103, 103, 103, 0.59) 1px solid;

          .title {
            flex: 1;
          }

          .close-icon {
            font-weight: 100;
            font-size: 20px;
            width: 20px;
            height: 20px;
            cursor: pointer;
            color: #909399;
          }
        }

        .body-area {
          /*min-height: 400px;*/
          overflow-y: hidden;
          padding: 20px;

          .diviser {
            height: 1px;
            width: 100%;
            /*border-bottom: 1px dashed grey;*/
            margin: 0 0 20px 0;
          }

          .action-area {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
        }

        .footer-area {
          height: 60px;
          line-height: 60px;
          border-top: 1px solid #eee;
        }
      }
    }
  }
  .filter{
    display: flex;
    justify-content: space-between;
    font-size: 0;
    .filter-label{
      width: 80px;
      display: inline-block;
    }
  }
  .table-content{
    margin-top: 20px;
  }
  .error-msg{
    color: red;
    padding-left: 10px;
    font-size: 12px;
  }
  .device-id-input{
    display: flex;
    align-items: center;
    margin-top: 16px;
    justify-content: space-between;
    .filter-label{
      width: 80px;
      font-size: 14px;
    }
  }
</style>

