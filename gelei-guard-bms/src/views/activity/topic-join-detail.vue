<template>
  <div class="gelei-content">
    <div class="content-body">
      <div class="search-area">
        <div class="topic-title">
          【{{ topicTitle }}】参与详情
        </div>
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">用户昵称:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="requestData.nickName"
                    maxlength="11"
                    size="mini"
                    clearable
                    placeholder="请输入用户昵称"
                    @change="filterList"
                  />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">手机号码:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="requestData.phone"
                    maxlength="11"
                    size="mini"
                    clearable
                    placeholder="请输入手机号码"
                    @change="filterList"
                  />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">会员类型:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="requestData.memberType"
                    size="mini"
                    placeholder="请选择会员类型"
                    clearable
                    @change="filterList"
                  >
                    <el-option
                      v-for="item in memberTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="between-search-area-and-table-display" />
      <div class="table-content table-block">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="序号"
            prop="_id"
            width="80" />
          <el-table-column
            align="center"
            label="用户昵称"
            prop="nickName"
            width="180" />
          <el-table-column
            align="center"
            label="手机号码"
            prop="phone" />
          <el-table-column
            align="center"
            width="132"
            label="投票时间"
            prop="_createTime" />
          <el-table-column
            align="center"
            label="投票项"
            prop="option" />
          <el-table-column
            align="center"
            label="参与话题数"
            prop="voteNum" />
          <el-table-column
            align="center"
            label="会员类型"
            prop="_memberType"
            width="220" />
          <el-table-column
            align="center"
            label="会员有效天数"
            prop="_validDaysLabel" />
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
  </div>
</template>

<script>
import {
  TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { mapGetters } from 'vuex'
import { topicJoinDetail } from '../../api/interactive'
import { computePageNumber, parseDateTime } from '../../utils'
import { PATRIARCH_MEMBER_TYPES } from '../../utils/constant'

export default {
  components: {
  },
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      memberTypeList: [
        { label: '全部', value: '' },
        ...PATRIARCH_MEMBER_TYPES
      ],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      requestData: {
        nickName: '',
        phone: '',
        memberType: '',
        topicId: '',
        page_no: 1,
        page_num: page_size
      },
      tableData: [],
      topicTitle: ''
    }
  },
  computed: {
    ...mapGetters(['is_agent'])
  },
  mounted: function() {
    this.topicTitle = this.$route.query.title
    this.requestData.topicId = Number(this.$route.query.topicId)
    this.getList()
  },
  methods: {
    table_size_change: function(size) {
      setPagenationSize(size)
    },
    change_current: function(page) {
    },
    getList() {
      topicJoinDetail(this.requestData)
        .then(res => {
          if (res.status !== 0) throw res
          this.total = res.total_count
          this.tableData = res.data.map((item, index) => {
            item._id = computePageNumber(index, this.requestData.page_no, this.requestData.page_num)
            item._createTime = parseDateTime('y-m-d h:i', item.createTime)
            // item._memberType = { '01': '体验会员(电信送30天)', '02': 'svip会员', '03': 'vip' }[item.memberType]
            item._memberType = (() => {
              try {
                return this.memberTypeList.find(memberType => {
                  return item.memberType === memberType.value
                })['label']
              } catch (e) {
                return '未知'
              }
            })()
            item._validDaysLabel = item.validDays + '天'
            return item
          })
        })
        .catch((e) => {
          console.log(e)
        })
    },
    /**
     * @description 筛选过滤
     * */
    filterList() {
      this.requestData.page_no = 1
      this.getList()
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
      background-color: #EAEAEA;
    }

    .table-content {
      margin: 20px;
    }
  }
}
.operate-statistics-component{
  .el-dialog__body{
    padding-top: 4px;
  }
}
.topic-title{
  padding: 6px 20px 20px 0;
  color: #304156;
  font-size: 18px;
  position: relative;
  left: -6px;
}
</style>
