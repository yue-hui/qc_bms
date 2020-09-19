<template>
  <div class="unbind-statistics">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="12" :md="8" :lg="9" :xl="8" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="4" class="order-number-list">选择时间:</el-col>
                <el-col :span="20">
                  <el-date-picker
                    v-model="query_set.datetime_range"
                    end-placeholder="结束日期"
                    range-separator="至"
                    start-placeholder="开始日期"
                    type="daterange"
                    clearable
                    size="mini"
                    unlink-panels
                    @change="filter" />
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="unbind-why table-block">
        <div class="unbind-title">
          <span>解绑原因占比</span>
        </div>
        <div v-for="(item, index) in unbind_why_list" :key="index" class="item">
          <div>
            <div :style="{ 'border-color': item._color }" class="icon" />
            <div class="text">
              <span>{{ item.typeName }}</span>
            </div>
          </div>
          <div>
            <el-progress :color="item._color" :percentage="Number.parseFloat(item.ratio)" :show-text="false" />
            <div class="progress-text">
              <span>{{ item.count }}条</span>
              <span>（{{ item.ratio }}）</span>
            </div>
          </div>
        </div>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          v-loading="loading"
          :data="resources"
          size="mini"
          stripe>
          <el-table-column
            align="center"
            width="80"
            label="序号"
            prop="optiId" />
          <el-table-column
            align="center"
            width="100"
            label="用户昵称"
            prop="userName" />
          <el-table-column
            align="center"
            width="80"
            label="会员类型"
            prop="_memberType" />
          <el-table-column
            v-for="(item, index) in table_column"
            :key="index"
            :render-header="customFieldColumn"
            :label="item.label"
            align="center">
            <template slot-scope="scope">
              <div>
                <i v-if="scope.row[item.prop]" style="font-weight: bold;font-size: 20px;color: #37d059" class="el-icon-check" />
                <i v-if="!scope.row[item.prop]" style="font-size: 16px;color: #929292" class="el-icon-minus" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="160"
            label="其他">
            <template slot-scope="scope">
              <el-popover :content="scope.row.otherOpinion" class="item" trigger="hover" placement="top">
                <span slot="reference">{{ scope.row.otherOpinion | beautifyWordsFormatter(20) }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="160"
            label="提交时间"
            prop="createTime" />
        </el-table>
        <el-pagination
          :current-page="requestData.page_no"
          :page-size="page_size"
          :page-sizes="page_sizes"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="change_current"
          @size-change="table_size_change" />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { TABLE_PAGE_SIEZS_LIST } from '../../utils/constant'
import { getPagenationSize, setPagenationSize } from '../../utils/auth'
import { query_unbind_why_report_list, query_unbind_why_list, query_unbind_user_list } from '@/api/interactive'
import { stringSlice } from '@/utils/index'

export default {
  name: 'UnbindStatistics',
  components: {},
  data() {
    const yesterday = dayjs()
    console.log(yesterday)
    const page_size = getPagenationSize()
    return {
      query_set: {
        datetime_range: []
      },
      loading: false,
      resources: [],
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      unbind_why_list: [],
      unbind_why_type_list: [],
      table_column: [],
      requestData: {
        begin_time: '',
        end_time: '',
        page_no: 1,
        page_num: page_size
      }
    }
  },
  computed: {},
  mounted: function() {
    this.get_unbind_why_report_list()
    this.get_unbind_why_list()
  },
  methods: {
    filter() {
      this.requestData.page_no = 1
      this.get_list()
    },
    table_size_change: function(size) {
      this.requestData.page_num = size
      setPagenationSize(size)
      this.get_list()
    },
    change_current: function(page) {
      this.requestData.page_no = page
      this.get_list()
    },
    get_color(index) {
      if (index >= 7) {
        index = index % 7
      }
      return [
        '#1890ff',
        '#1cb73e',
        '#a29d9d',
        '#e3af39',
        '#ce6868',
        '#886516',
        '#8f6391'
      ][index]
    },
    /**
     * @description 渲染表头
     * */
    customFieldColumn(h, data) {
      const label = data.store.states.columns[data.$index].label
      return h('span', {}, [
        h('span', {}, ''),
        h('el-popover', {
          props: {
            placement: 'top',
            trigger: 'hover',
            content: label
          }
        },
        [
          h('span', { slot: 'reference', class: 'font-normal' },
            [
              h('span', {}, stringSlice(label, 20))
            ]
          )
        ])
      ])
    },
    /**
     * @description 获取占比信息
     * */
    get_unbind_why_report_list() {
      query_unbind_why_report_list({
        begin_time: 1,
        end_time: 99999999999999999
      })
        .then((data) => {
          if (data.status !== 0) throw data
          this.unbind_why_list = data.data.map((item, index) => {
            if (item.typeName) {
              item._color = this.get_color(index)
              return item
            }
            return null
          }).filter(item => item)
        })
        .catch(error => {
          this.$message.error(error.message)
        })
    },
    /**
     * @description 获取全部反馈类型
     * */
    get_unbind_why_list() {
      query_unbind_why_list()
        .then((data) => {
          if (data.status !== 0) throw data
          this.unbind_why_type_list = data.data
          this.unbind_why_type_list.forEach(item => {
            this.table_column.push({
              label: item.name,
              prop: 'T' + item.value
            })
          })
          this.get_list()
        })
        .catch(error => {
          this.$message.error(error.message)
        })
    },
    get_list() {
      if (Array.isArray(this.query_set.datetime_range) && this.query_set.datetime_range.length > 0) {
        this.requestData.begin_time = this.query_set.datetime_range[0].getTime()
        this.requestData.end_time = this.query_set.datetime_range[1].getTime()
        if (this.requestData.begin_time === this.requestData.end_time) {
          this.requestData.end_time = this.requestData.begin_time + 24 * 60 * 60 * 1000 - 1
        }
      } else {
        this.requestData.begin_time = ''
        this.requestData.end_time = ''
      }
      query_unbind_user_list(this.requestData)
        .then((data) => {
          if (data.status !== 0) throw data
          /**
{
  optiId: 0,
  userName: '龙锦文003',
  createTime: '2020-02-05 12:00:05',
  _memberType: 'SVIP会员',
  otherOpinion: '',
  T1: false,
  T2: true,
  Txx: true
  ...
}
           * */
          this.resources = data.data.map(item => {
            // 会员类型
            item._memberType = (() => {
              return ({
                '01': '体验会员',
                '02': 'SVIP会员',
                '03': 'VIP会员',
                '00': '普通用户'
              })[item.memberType]
            })()
            // 反馈
            this.unbind_why_type_list.forEach(type => {
              item['T' + type.value] = (() => {
                // 判断该值是否在列表 typeId 里面
                const typeIds = item.typeId.split(',').map(item => Number(item))
                return typeIds.includes(Number(type.value))
              })()
            })
            item.otherOpinion = item.otherOpinion || '无'
            return item
          })
          this.total = data.total_count
        })
        .catch(error => {
          this.$message.error(error.message)
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.unbind-statistics{
  .unbind-why{
    margin: 20px;
    padding: 20px;
    background-color:#fff;
    justify-content: space-between;
    .item:last-child{
      margin-bottom: 0;
    }
    .item{
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      div:nth-child(1){
        width: 300px;
        display: flex;
        align-items: center;
        .icon{
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1px solid rebeccapurple;
          margin-right: 10px;
        }
        .text{
          font-size: 14px;
        }
      }
      div:nth-child(2){
        display: flex;
        align-items: center;
      }
      .progress-text{
        padding-left: 10px;
        font-size: 12px;
        opacity: .8;
        span{
          margin: 0 4px;
        }
      }
    }
  }
}
.unbind-statistics {
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

    .between-search-area-and-table-display {
      height: 1px;
      margin: 10px 20px 15px 20px;
      background-color: #d0d0d7;
    }

    .table-content {
      margin: 20px;
    }
  }
  .unbind-title{
    padding-bottom: 20px;
    font-size: 20px;
  }
}
</style>
