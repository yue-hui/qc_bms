<template>
  <div class="gelei-content">
    <div class="content-body">
      <div class="search-area">
        <div class="topic-title">
          【{{ title }}】注册/邀请绑定详情
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
                <el-col :span="8" class="order-number-list">完成行为:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="requestData.action"
                    size="mini"
                    placeholder="请选择完成行为"
                    clearable
                    @change="filterList"
                  >
                    <el-option
                      v-for="item in actionTypeList"
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
                <el-col :span="8" class="order-number-list">是否付费:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="requestData.isPay"
                    size="mini"
                    placeholder="请选择会员类型"
                    clearable
                    @change="filterList"
                  >
                    <el-option
                      v-for="item in payTypeList"
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
            width="180"
            label="完成行为"
            prop="_behavior" />
          <el-table-column
            align="center"
            label="奖励会员天数"
            prop="rewordDays" />
          <el-table-column
            align="center"
            label="注册时间"
            prop="_regTime" />
          <el-table-column
            align="center"
            label="绑定时间"
            prop="_bindTime" />
          <el-table-column
            align="center"
            label="会员类型"
            prop="_memberType"
            width="220" />
          <el-table-column
            align="center"
            label="是否付费"
            width="100"
            prop="_isPay" />
          <el-table-column
            align="center"
            label="来源"
            width="100"
            prop="_channel" />
          <el-table-column
            align="center"
            label="操作"
            width="100"
            prop="">
            <template slot-scope="scope">
              <span v-if="scope.row.isPay === 1" style="color: rgb(64, 158, 255); cursor: pointer;" @click="showOrderRecord(scope.row)">交易记录</span>
              <span v-if="scope.row.isPay !== 1" style="">-</span>
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
  </div>
</template>

<script>
import {
  TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { mapGetters } from 'vuex'
import { queryInvitationV2Invitees } from '../../../api/interactive'
import { cloneDeep, computePageNumber, parseDateTime } from '../../../utils'
import { PATRIARCH_MEMBER_TYPES } from '../../../utils/constant'

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
      actionTypeList: [
        { label: '全部', value: '' },
        { label: '注册', value: 1 },
        { label: '注册+绑定', value: 2 }
      ],
      payTypeList: [
        { label: '全部', value: '' },
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      requestData: {
        nickName: '',
        phone: '',
        action: '',
        isPay: '',
        isReg: '',
        isBind: '',
        activityId: '',
        page_no: 1,
        page_num: page_size
      },
      tableData: [],
      title: ''
    }
  },
  computed: {
    ...mapGetters(['is_agent'])
  },
  mounted: function() {
    this.title = this.$route.query.title
    this.requestData.activityId = Number(this.$route.query.id)
    this.getList()
  },
  methods: {
    table_size_change: function(size) {
      setPagenationSize(size)
      this.requestData.page_num = size
      this.requestData.page_no = 1
      this.getList()
    },
    change_current: function(page) {
      this.requestData.page_no = page
      this.getList()
    },
    getList() {
      const requestData = cloneDeep(this.requestData)
      this.loading = true
      if (requestData.action) {
        if (requestData.action === 1) {
          requestData.isReg = 1
        } else {
          requestData.isReg = 1
          requestData.isBind = 1
        }
      } else {
        requestData.isBind = ''
        requestData.isReg = ''
      }
      queryInvitationV2Invitees(requestData)
        .then(res => {
          if (res.status !== 0) throw res
          this.total = res.total_count
          this.tableData = res.data.map((item, index) => {
            item._id = computePageNumber(index, this.requestData.page_no, this.requestData.page_num)
            item._createTime = parseDateTime('y-m-d h:i:s', item.createTime)
            // item._memberType = { '01': '体验会员(电信送30天)', '02': 'svip会员', '03': 'vip' }[item.memberType]
            item._memberType = (() => {
              try {
                return this.memberTypeList.find(memberType => {
                  return item.memberType === memberType.value
                })['label'] + (() => {
                  // 已经到期不显示时间
                  if (item.endTime < new Date().getTime()) return ''
                  return `(${parseDateTime('y-m-d', item.beginTime)}-${parseDateTime('y-m-d', item.endTime)})`
                })()
              } catch (e) {
                return '未知'
              }
            })()
            // 完成行为
            item._behavior = (() => {
              if (item.isReg === 1 && item.isBind === 1) {
                return '注册+绑定'
              }
              if (item.isReg === 1) {
                return '注册'
              }
              if (item.isBind === 1) {
                return '绑定'
              }
            })()
            // 注册时间
            item._regTime = parseDateTime('y-m-d h:i', item.regTime)
            // 绑定时间
            item._bindTime = item.bindTime ? parseDateTime('y-m-d h:i', item.bindTime) : '-'
            item.rewordDays = item.rewordDays || '-'
            // 是否付费
            item._isPay = item.isPay === 1 ? '是' : '否'
            // 来源
            item._channel = (() => {
              if (item.channel === '01') return '微信'
              if (item.channel === '03') return 'QQ'
              if (item.channel === '04') return '生成图片'
              if (item.channel === '05') return '面对面'
              return '未知'
            })()
            item._validDaysLabel = item.validDays + '天'
            return item
          })
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
    /**
     * @description 筛选过滤
     * */
    filterList() {
      this.requestData.page_no = 1
      this.getList()
    },
    /**
     * @description 跳转至用户中心查看会员记录
     * */
    showOrderRecord(row) {
      const options = {
        name: 'UserManagement'
      }
      const { href } = this.$router.resolve(options)
      window.open(href + '?phone=' + row.phone + '&behavior=showOrderRecord&userId=' + row.userId, '_blank')
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
