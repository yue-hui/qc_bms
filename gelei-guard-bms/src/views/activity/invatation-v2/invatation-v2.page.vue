<template>
  <div class="gelei-content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">活动标题:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="requestData.title"
                    maxlength="11"
                    size="mini"
                    clearable
                    placeholder="请输入活动标题"
                    @change="filterList"
                  />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">活动状态:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="requestData.status"
                    size="mini"
                    placeholder="请选择活动状态"
                    clearable
                    @change="filterList"
                  >
                    <el-option
                      v-for="item in statusTypeList"
                      :key="item.name"
                      :label="item.name"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="8" :lg="9" :xl="8" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="4" class="order-number-list">开始时间:</el-col>
                <el-col :span="20">
                  <el-date-picker
                    v-model="requestTime"
                    end-placeholder="结束日期"
                    range-separator="至"
                    start-placeholder="开始日期"
                    type="daterange"
                    clearable
                    size="mini"
                    unlink-panels
                    @change="filterList"
                  />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <gl-button
                  pid="21005"
                  class="download details-tab"
                  size="mini"
                  type="success"
                  @click="createInvatationV2"
                >创建
                </gl-button>
                <gl-button
                  pid="21005"
                  class="download details-tab"
                  size="mini"
                  type="success"
                  @click="openAppBuyConfig"
                >购买成功弹窗
                </gl-button>
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
            width="100"
          />
          <el-table-column
            align="center"
            label="标题"
            prop="title">
            <template slot-scope="scope">
              <span style="color: rgb(64, 158, 255); cursor: pointer;" @click="joinDetail(scope.row)">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="邀请页UV"
            prop="inviterUv" />
          <el-table-column
            align="center"
            label="被邀请页UV"
            prop="inviteePv" />
          <el-table-column
            align="center"
            label="分享次数"
            prop="shareCount" />
          <el-table-column
            align="center"
            label="注册成功人数"
            prop="regCount"
            width="180">
            <template slot-scope="scope">
              <span style="color: rgb(64, 158, 255); cursor: pointer;" @click="joinDataDetail(scope.row)">{{ scope.row.regCount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="绑定成功人数"
            prop="bindCount"
            width="100">
            <template slot-scope="scope">
              <span style="color: rgb(64, 158, 255); cursor: pointer;" @click="joinDataDetail(scope.row)">{{ scope.row.regCount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="注册付费转化率"
            prop="_registerPayConversion"
            width="120" />
          <el-table-column
            align="center"
            label="绑定付费转化率"
            prop="_bindPayConversion"
            width="120" />
          <el-table-column
            align="center"
            label="开始时间"
            width="180"
            prop="_startTime" />
          <el-table-column
            align="center"
            label="结束时间"
            width="180"
            prop="_endTime" />
          <el-table-column
            align="center"
            label="状态"
            prop="_status"
            width="60">
            <template slot-scope="scope">
              <span v-if="scope.row._status === 10">待上架</span>
              <span v-if="scope.row._status === 20" style="color: #00c250">进行中</span>
              <span v-if="scope.row._status === 30" style="color: red">已结束</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="174"
            prop="control">
            <template slot-scope="scope">
              <el-button
                pid=""
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="invitationV2Detail(scope.row.activityId)"
              >查看
              </el-button>
              <el-button
                v-if="[10].includes(scope.row._status)"
                pid=""
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="invitationV2Listing(scope.row.activityId)"
              >上架
              </el-button>
              <el-button
                v-if="[10, 20].includes(scope.row._status)"
                pid=""
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="updateInvatationV2(scope.row.activityId)"
              >编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="page"
          :page-size="page_size"
          :page-sizes="page_sizes"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="changeCurrent"
          @size-change="tableSizeChange" />
      </div>
    </div>
    <el-dialog
      :visible.sync="appBuyConfigDialog"
      :before-close="closeAppBuyConfig"
      title="购买成功后页面弹窗文案配置"
      custom-class="app-bug-config-dialog"
      width="500px"
    >
      <el-form ref="buyConfigForm" :rules="buyConfigRules" :model="appBuyConfigForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="主标题" prop="mainTitle">
          <el-input v-model="appBuyConfigForm.mainTitle" placeholder="请输入主标题" size="mini" />
        </el-form-item>
        <el-form-item label="副标题" prop="secondaryTitle">
          <el-input v-model="appBuyConfigForm.secondaryTitle" placeholder="请输入副标题" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitBuyConfig">确定</el-button>
          <el-button size="small" @click="closeAppBuyConfig">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { mapGetters } from 'vuex'
import { getInvitationV2List, getBuyConfig, saveBuyConfig, invitationV2Listing } from '../../../api/interactive'
import { computePageNumber, parseDateTime } from '../../../utils'
const JsBigDecimal = require('js-big-decimal')

export default {
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      statusTypeList: [
        { name: '全部', value: '' },
        { name: '待上架', value: 2 },
        { name: '进行中', value: 3 },
        { name: '已结束', value: 4 }
      ],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      requestData: {
        title: '',
        status: '',
        startTime: '',
        endTime: '',
        page_no: 1,
        page_num: page_size
      },
      requestTime: null,
      tableData: [],
      // 购买成功弹窗配置弹窗状态
      appBuyConfigDialog: false,
      appBuyConfigForm: {
        mainTitle: '',
        secondaryTitle: ''
      },
      buyConfigRules: {
        mainTitle: [
          { required: true, message: '请输入主标题', trigger: 'blur' }
        ],
        secondaryTitle: [
          { required: true, message: '请输入副标题', trigger: 'blur' }
        ]
      },
      // 是否有活动正在进行中
      hasRunningActivity: false
    }
  },
  computed: {
    ...mapGetters(['is_agent'])
  },
  mounted() {
    this.getList()
  },
  methods: {
    tableSizeChange: function(size) {
      setPagenationSize(size)
      this.requestData.page_no = 1
      this.requestData.page_num = size
      this.getList()
    },
    changeCurrent: function(page) {
      this.requestData.page_no = page
      this.getList()
    },
    /**
     * @description 打开购买成功弹窗配置弹窗
     * */
    openAppBuyConfig() {
      this.getBuyConfig()
      this.appBuyConfigDialog = true
    },
    /**
     * @description 关闭购买成功弹窗配置弹窗
     * */
    closeAppBuyConfig() {
      this.$refs['buyConfigForm'].clearValidate()
      this.$refs['buyConfigForm'].resetFields()
      this.appBuyConfigDialog = false
    },
    getBuyConfig() {
      getBuyConfig()
        .then(res => {
          if (res.status !== 0) throw res
          console.log(res)
          this.appBuyConfigForm.mainTitle = res.data.mainTitle
          this.appBuyConfigForm.secondaryTitle = res.data.secondaryTitle
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
    },
    /**
     * @description 更新购买成功弹窗配置
     * */
    submitBuyConfig() {
      this.$refs['buyConfigForm'].validate()
        .then(() => {
          const loading = this.$loading({
            lock: true
          })
          saveBuyConfig(this.appBuyConfigForm)
            .then((res) => {
              if (res.status !== 0) throw res
              this.$message.success('保存成功')
              this.closeAppBuyConfig()
            })
            .catch((e) => {
              this.$message.error(e.message)
            })
            .finally(() => {
              loading.close()
            })
        })
        .catch(() => {})
    },
    /**
     * @description 跳转至话题创建
     * */
    createInvatationV2() {
      const options = {
        name: 'InvatationFriendsV2Action'
      }
      const { href } = this.$router.resolve(options)
      window.open(href, '_blank')
    },
    /**
     * @description 跳转至话题创建
     * */
    updateInvatationV2(activityId) {
      const options = {
        name: 'InvatationFriendsV2Action'
      }
      const { href } = this.$router.resolve(options)
      window.open(href + '?id=' + activityId + '&update=' + '1', '_blank')
    },
    /**
     * @description 获取列表
     * */
    getList() {
      if (Array.isArray(this.requestTime)) {
        this.requestData.startTime = this.requestTime[0].getTime()
        this.requestData.endTime = this.requestTime[1].getTime()
      } else {
        this.requestData.startTime = ''
        this.requestData.endTime = ''
      }
      this.loading = true
      getInvitationV2List(this.requestData)
        .then((res) => {
          if (res.status !== 0) throw res
          this.total = res.total_count
          this.hasRunningActivity = res.data.hasRunningActivity
          this.tableData = res.data.result.map((item, index) => {
            item._id = computePageNumber(index, this.requestData.page_no, this.requestData.page_num)
            item._startTime = parseDateTime('y-m-d h:i', item.startTime)
            item._endTime = parseDateTime('y-m-d h:i', item.endTime)
            // 注册付费转化率
            item._registerPayConversion = (() => {
              if (item.regCount === 0) return '0%'
              return new JsBigDecimal(item.regPayCount)
                .divide(new JsBigDecimal(item.regCount), 2)
                .multiply(new JsBigDecimal(100)).getValue() + '%'
            })()
            // 绑定付费转化率
            item._bindPayConversion = (() => {
              if (item.bindCount === 0) return '0%'
              return new JsBigDecimal(item.bindPayCount)
                .divide(new JsBigDecimal(item.bindCount), 2)
                .multiply(new JsBigDecimal(100)).getValue() + '%'
            })()
            /* 状态
            10 待上架
            20 进行中
            30 已结束
            */
            item._status = (() => {
              // 在当前时间里面
              if (item.startTime <= new Date().getTime() && item.endTime >= new Date().getTime()) {
                return 20
              }
              // 当前时间小于开始时间
              if (new Date().getTime() < item.startTime) {
                return 10
              }
              // 当前时间已经超过结束时间
              if (new Date().getTime() > item.endTime) {
                return 30
              }
            })()
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
     * @description 筛选条件查询
     * */
    filterList() {
      this.requestData.page_no = 1
      this.getList()
    },
    joinDetail(row) {
      const options = {
        name: 'InvatationFriendsV2JoinDetail'
      }
      const { href } = this.$router.resolve(options)
      window.open(href + '?id=' + row.activityId + '&title=' + row.title, '_blank')
    },
    joinDataDetail(row) {
      const options = {
        name: 'InvatationFriendsV2DataDetail'
      }
      const { href } = this.$router.resolve(options)
      window.open(href + '?id=' + row.activityId + '&title=' + row.title, '_blank')
    },
    invitationV2Detail(activityId) {
      const options = {
        name: 'InvatationFriendsV2Action'
      }
      const { href } = this.$router.resolve(options)
      window.open(href + '?id=' + activityId + '&detail=' + '1', '_blank')
    },
    invitationV2Listing(activityId) {
      function listing() {
        const loading = this.$loading({
          lock: true
        })
        invitationV2Listing({
          activityId: activityId
        })
          .then((res) => {
            if (res.status !== 0) throw res
            this.getList()
          })
          .catch((e) => {
            this.$message.error(e.message)
          })
          .finally(() => {
            loading.close()
          })
      }
      if (this.hasRunningActivity) {
        this.$confirm('有活动正在进行中，确定上架吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          listing.call(this)
        }).catch(() => {
        })
      } else {
        listing.call(this)
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

</style>
<style lang="scss">
.app-bug-config-dialog{
  .el-dialog__body{
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .el-icon-close{
    display: none !important;
  }
  .el-dialog__header{
    padding-bottom: 20px;
  }
}
</style>
