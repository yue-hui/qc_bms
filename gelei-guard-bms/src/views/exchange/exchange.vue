<template>
  <div class="gelei-content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="9" class="order-number-list">兑换码包名称:</el-col>
                <el-col :span="15">
                  <el-input
                    v-model="requestData.title"
                    maxlength="11"
                    size="mini"
                    clearable
                    placeholder="请输入兑换码包名称"
                    @change="filterList"
                  />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="9" class="order-number-list">兑换码包状态:</el-col>
                <el-col :span="15">
                  <el-select
                    v-model="requestData.status"
                    size="mini"
                    placeholder="请选择活动状态"
                    clearable
                    @change="filterList"
                  >
                    <el-option
                      v-for="item in topic_type_list"
                      :key="item.name"
                      :label="item.name"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="5" :xl="6" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="5" class="order-number-list">兑换码:</el-col>
                <el-col :span="19">
                  <el-input
                    v-model="requestData.title"
                    maxlength="11"
                    size="mini"
                    clearable
                    placeholder="请输入兑换码"
                    @change="filterList"
                  />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="10" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <gl-button
                  pid="21005"
                  class="download details-tab"
                  size="mini"
                  type="success"
                  @click="createTopic"
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
          />
          <el-table-column
            align="center"
            label="标题"
            prop="voteNum" />
          <el-table-column
            align="center"
            label="邀请页UV"
            prop="onlookers" />
          <el-table-column
            align="center"
            label="被邀请页UV"
            prop="optionNum1" />
          <el-table-column
            align="center"
            label="分享次数"
            prop="optionNum2" />
          <el-table-column
            align="center"
            label="注册成功人数"
            prop="votePe"
            width="180" />
          <el-table-column
            align="center"
            label="绑定成功人数"
            prop="votePe"
            width="180" />
          <el-table-column
            align="center"
            label="注册付费转化率"
            prop="votePe"
            width="180" />
          <el-table-column
            align="center"
            label="绑定付费转化率"
            prop="votePe"
            width="180" />
          <el-table-column
            align="center"
            label="状态"
            prop="votePe"
            width="180" />
          <el-table-column
            align="center"
            label="开始时间"
            prop="_startTime" />
          <el-table-column
            align="center"
            label="结束时间"
            prop="_endTime" />
          <el-table-column
            align="center"
            label="操作"
            width="174"
            prop="control">
            <template slot-scope="scope">
              <gl-button
                pid=""
                size="small"
                style="text-decoration: underline;"
                type="text"
              >删除
              </gl-button>
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
      <el-form :model="appBuyConfigForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="主标题" prop="name">
          <el-input v-model="appBuyConfigForm.name" placeholder="请输入主标题" size="mini" />
        </el-form-item>
        <el-form-item label="副标题" prop="name">
          <el-input v-model="appBuyConfigForm.name" placeholder="请输入副标题" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary">确定</el-button>
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

export default {
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      topic_type_list: [
        { name: '全部', value: '' },
        { name: '待上架', value: 2 },
        { name: '已下架', value: 0 },
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
        name: ''
      }
    }
  },
  computed: {
    ...mapGetters(['is_agent'])
  },
  mounted() {
    // this.getList()
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
      this.appBuyConfigDialog = true
    },
    /**
     * @description 关闭购买成功弹窗配置弹窗
     * */
    closeAppBuyConfig() {
      this.appBuyConfigDialog = false
    },
    /**
     * @description 跳转至话题创建
     * */
    createTopic() {
      const options = {
        name: 'activity-topic-action'
      }
      const { href } = this.$router.resolve(options)
      window.open(href, '_blank')
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
    },
    /**
     * @description 筛选条件查询
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
