<template>
  <div class="gelei-content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">话题标题:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="requestData.title"
                    maxlength="11"
                    size="mini"
                    clearable
                    placeholder="请输入话题标题"
                    @change="filterList"
                  />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">话题状态:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="requestData.status"
                    size="mini"
                    placeholder="请选择话题状态"
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
                  @click="createTopic"
                >创建
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
            prop="title"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.voteNum === 0">{{ scope.row.title }}</span>
              <span v-else style="color: #409EFF;cursor: pointer" @click="joinDetail(scope.row)">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="参与人数"
            prop="voteNum" />
          <el-table-column
            align="center"
            label="围观人数"
            prop="onlookers" />
          <el-table-column
            align="center"
            label="运营位"
            prop="bannerNum">
            <template slot-scope="scope">
              <span v-if="scope.row.bannerNum === 0" style="">{{ scope.row.bannerNum }}</span>
              <span v-else style="color: #409EFF;cursor: pointer" @click="operateDialogOpenHandle(scope.row)">{{ scope.row.bannerNum }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="选项1"
            prop="optionNum1" />
          <el-table-column
            align="center"
            label="选项2"
            prop="optionNum2" />
          <el-table-column
            align="center"
            label="投票比例"
            prop="votePe"
            width="180" />
          <el-table-column
            align="center"
            label="状态"
          >
            <template slot-scope="scope">
              <span v-if="scope.row._status === 10">待上架</span>
              <span v-if="scope.row._status === 20" style="color: #1e6abc">已下架</span>
              <span v-if="scope.row._status === 30" style="color: #00c250">进行中</span>
              <span v-if="scope.row._status === 40" style="color: red">已经结束（上架）</span>
              <span v-if="scope.row._status === 41" style="color: red">已经结束（下架）</span>
            </template>
          </el-table-column>
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
                v-if="[30, 40].includes(scope.row._status)"
                pid="21008"
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="topicAction(scope.row, 0)"
              >下架
              </gl-button>
              <gl-button
                v-if="[10, 20, 41].includes(scope.row._status)"
                pid="21008"
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="topicAction(scope.row, 1)"
              >上架
              </gl-button>
              <gl-button
                pid="21006"
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="topicUpdate(scope.row)"
              >编辑
              </gl-button>
              <gl-button
                pid="21008"
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="topicAction(scope.row, '-1')"
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
          @current-change="change_current"
          @size-change="table_size_change" />
      </div>
    </div>
    <!--运营位数据统计-->
    <el-dialog
      :visible.sync="operateDialogVisible"
      :before-close="operateDialogCloseHandle"
      title="运营位数据统计"
      custom-class="operate-statistics-component"
      width="1000px"
    >
      <operate-statistics-component v-if="operateDialogVisible" :list="operateList" />
    </el-dialog>
  </div>
</template>

<script>
import {
  TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { getTopicList, topicAction, topicBannerListStatistics } from '../../api/interactive'
import { mapGetters } from 'vuex'
// import dayjs from 'dayjs'
import { computePageNumber, computePercentage, parseDateTime } from '../../utils/index'
// 运营位数据统计组件
import operateStatisticsComponent from './topic-component/operate-statistics'

export default {
  components: {
    operateStatisticsComponent
  },
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
      dialogVisible: false,
      dialogType: 1, // 1 新增 | 2 编辑
      operateDialogVisible: false, // 运营位数据统计弹出框状态
      operateList: []
    }
  },
  computed: {
    ...mapGetters(['is_agent'])
  },
  mounted() {
    this.getList()
  },
  methods: {
    table_size_change: function(size) {
      setPagenationSize(size)
      this.requestData.page_no = 1
      this.requestData.page_num = size
      this.getList()
    },
    change_current: function(page) {
      this.requestData.page_no = page
      this.getList()
    },
    get_config: function() {
      return {
        page_no: this.page,
        page_num: this.page_size
      }
    },
    /**
     * @description 运营位数据统计弹窗框关闭
     * */
    operateDialogCloseHandle() {
      this.operateDialogVisible = false
    },
    /**
     * @description 运营位数据统计弹窗框打开
     * @param row {Object}
     * */
    operateDialogOpenHandle(row) {
      if (!this.$store.getters.auths.includes('21009')) {
        return this.$message.info('你暂未开通该权限，请联系管理员开通')
      }
      topicBannerListStatistics({ topicId: row.topicId })
        .then(res => {
          if (res.status !== 0) throw res
          this.operateDialogVisible = true
          this.operateList = res.data.sort((a, b) => a.rank - b.rank).map((item, index) => {
            item._id = computePageNumber(index, 1, 10)
            // /
            item._startTime = parseDateTime('y-m-d h:i', item.startTime)
            item._endTime = parseDateTime('y-m-d h:i', item.endTime)
            // 跳转方式 01 app | 02 h5 | 03 微信小程序
            item._jumpTarget = {
              '01': 'APP原生页',
              '02': 'H5',
              '03': '微信小程序'
            }[item.jumpTarget]
            // 状态
            item._status = (() => {
              if (new Date().getTime() >= item.startTime && new Date().getTime() <= item.endTime) {
                return '进行中'
              }
              if (new Date().getTime() < item.startTime) {
                return '待上架'
              }
              if (new Date().getTime() > item.endTime) {
                return '已下架'
              }
            })()
            return item
          })
        })
        .catch(() => {
        })
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
     * @description 打开参与详情列表
     * @param row {Object}
     * */
    joinDetail(row) {
      if (!this.$store.getters.auths.includes('21007')) {
        return this.$message.info('你暂未开通该权限，请联系管理员开通')
      }
      // activity-topic-join-detail
      const options = {
        name: 'activity-topic-join-detail',
        query: { title: row.title, topicId: row.topicId }
      }
      const { href } = this.$router.resolve(options)
      window.open(href, '_blank')
    },
    /**
     * @description 获取话题列表
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
      getTopicList(this.requestData)
        .then(res => {
          this.total = res.total_count
          this.tableData = res.data.map((item, index) => {
            item._id = computePageNumber(index, this.requestData.page_no, this.requestData.page_num)
            // 选项 1 2 的具体数值
            item.optionNum1 = item.optionNum[0]
            item.optionNum2 = item.optionNum[1]
            // 选项 1 2 的具体百分比
            const votePe = computePercentage(item.optionNum1, item.optionNum2)
            item.votePe = votePe[0] + ' PK ' + votePe[1]
            item._startTime = parseDateTime('y-m-d h:i', item.startTime)
            item._endTime = parseDateTime('y-m-d h:i', item.endTime)
            // 判断上下架
            /*
            * 10 待上架
              20 已下架
              30 进行中
              40 已经结束（上架）
              41 已经结束（下架）
            * */
            item._status = (() => {
              // 在投票时间里面
              if (item.startTime <= new Date().getTime() && item.endTime >= new Date().getTime()) {
                if (item.status === 0) return 20
                if (item.status === 1) return 30
              }
              // 投票时间还没开始
              if (item.startTime > new Date().getTime()) {
                if (item.status === 0) return 20
                if (item.status === 1) return 10
              }
              // 投票结束时间已经结束
              if (new Date().getTime() > item.endTime) {
                if (item.status === 0) return 41
                if (item.status === 1) return 40
              }
              return 0
            })()
            return item
          })
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          this.loading = false
        })
    },
    /**
     * @description 删除话题
     * @param row {Object}
     * @param status {Number}
     * */
    topicAction(row, status) {
      if (row._status === 30) {
        return this.$message.warning('进行中的话题不支持删除')
      }
      const msg = {
        0: '确认下架？',
        1: '确认上架？',
        '-1': '确认删除？'
      }
      this.$confirm(msg[status], '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.topicActionRequest(row.topicId, status)
            .then(res => {
              if (res.status !== 0) throw res
              this.getList()
            })
            .catch(() => {
            })
        })
        .catch(() => {
        })
    },
    /**
     * @description 跳转至编辑页面
     * @param row {Object}
     * */
    topicUpdate(row) {
      const options = {
        name: 'activity-topic-update',
        query: { topicId: row.topicId, update: 1, page: this.requestData.page_no }
      }
      const { href } = this.$router.resolve(options)
      window.open(href, '_blank')
    },
    topicActionRequest(topicId, status) {
      return topicAction({
        topicId: topicId,
        status: status
      })
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
.operate-statistics-component{
  .el-dialog__body{
    padding-top: 4px;
  }
}
</style>
