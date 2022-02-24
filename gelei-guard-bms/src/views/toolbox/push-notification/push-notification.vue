<template>
  <div class="gelei-content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">通知标题:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="requestData.title"
                    maxlength="11"
                    size="mini"
                    clearable
                    placeholder="请输入通知标题"
                    @change="filterList"
                  />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">目标平台:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="requestData.platform"
                    size="mini"
                    placeholder="请选择目标平台"
                    clearable
                    @change="filterList"
                  >
                    <el-option
                      v-for="item in platformList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">发送状态:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="requestData.status"
                    size="mini"
                    placeholder="请选择发送状态"
                    clearable
                    @change="filterList"
                  >
                    <el-option
                      v-for="item in pushStatus"
                      :key="item.name"
                      :label="item.name"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>

          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">创建人:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="requestData.sysUserName"
                    maxlength="11"
                    size="mini"
                    clearable
                    placeholder="请输入创建人名称"
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
                  pid="21002"
                  class="download details-tab"
                  size="mini"
                  type="primary"
                  @click="dialogOpenHandle('accurate')"
                >创建精准推送
                </gl-button>
                <gl-button
                  pid="21002"
                  class="download details-tab"
                  size="mini"
                  type="success"
                  @click="dialogOpenHandle"
                >创建家长端通知
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
          style="width: 100%"
          @expand-change="loadRowDetail"
        >
          <el-table-column
            align="center"
            label="序号"
            prop="_id"
            width="80" />
          <el-table-column
            align="center"
            label="通知标题"
            prop="title"
            width="180" />
          <el-table-column
            align="center"
            label="通知内容"
            prop="content" />
          <el-table-column
            align="center"
            label="目标平台"
            prop="_platformList"
            width="220" />
          <el-table-column
            align="center"
            label="跳转目标"
            prop="_target"
            width="180" />
          <el-table-column
            align="center"
            label="发送时间"
            prop="_sendTime" />
          <el-table-column
            align="center"
            label="状态"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status === '01'" style="color: #00c250">{{ scope.row._status }}</span>
              <span v-if="scope.row.status === '02'">{{ scope.row._status }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="创建人"
            prop="sysUserName" />
          <el-table-column
            align="center"
            label="操作"
            width="80"
            prop="control">
            <template slot-scope="scope">
              <gl-button
                pid="21003"
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="remove(scope.row)"
              >删除
              </gl-button>
            </template>
          </el-table-column>
          <el-table-column width="50" type="expand">
            <template slot-scope="props">
              <div class="detail-list" style="display: flex">
                <div v-for="(item, index) in props.row._detail" :key="index" class="item">
                  <div class="detail-list-title">{{ item._platform }}</div>
                  <div style="display: flex">
                    <div class="item-count">
                      <div>{{ item.sendCount }}</div>
                      <div>发送数</div>
                    </div>
                    <div class="item-count">
                      <div>{{ item.receivedCount }}</div>
                      <div>接收数</div>
                    </div>
                    <div class="item-count">
                      <div>{{ item.openCount }}</div>
                      <div>打开数</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="base-info">
                <div class="base-info-title">基本信息</div>
                <div class="base-info-item">
                  <div>
                    <span>通知标题：</span>
                    <span>{{ props.row.title }}</span>
                  </div>
                  <div>
                    <span>通知内容：</span>
                    <span>{{ props.row.content }}</span>
                  </div>
                  <div>
                    <span>目标平台：</span>
                    <span>{{ props.row._platformList }}</span>
                  </div>
                  <div>
                    <span>跳转目标：</span>
                    <span>{{ props.row._target }}</span>
                  </div>
                  <div>
                    <span>跳转参数：</span>
                    <span>{{ props.row.parameter }}</span>
                  </div>
                </div>
              </div>
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
    <!-- PUSH 通知新增、编辑组件 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="dialogCloseHandle"
      title="发送通知"
      custom-class="operate-statistics-component"
      width="800px"
    >
      <push-notification-action-component v-if="dialogVisible" :visible.sync="dialogVisible" :type="type" @reload-list="reloadList" />
    </el-dialog>
  </div>
</template>

<script>
import {
  TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { mapGetters } from 'vuex'
import { getPushNoticeInfo, pushNotificationList, removePushNotice } from '../../../api/interactive'
// PUSH 通知新增、编辑组件
import pushNotificationActionComponent from './components/push-notification-action'
import { computePageNumber, parseDateTime } from '../../../utils'

export default {
  components: {
    pushNotificationActionComponent
  },
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      type: null,
      platformList: [
        { name: '全部', value: '' },
        { name: 'IOS家长端', value: '02' },
        { name: 'Android家长端', value: '03' }
      ],
      pushStatus: [
        { name: '全部', value: '' },
        { name: '已发送', value: '01' },
        { name: '等待发送', value: '02' }
      ],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      requestData: {
        title: '',
        platform: '',
        status: '',
        sysUserName: '',
        page_no: 1,
        page_num: page_size
      },
      tableData: [],
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['is_agent'])
  },
  mounted: function() {
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
    getList() {
      this.loading = true
      pushNotificationList(this.requestData)
        .then(res => {
          if (res.status !== 0) throw res
          this.total = res.total_count
          this.tableData = res.data.map((item, index) => {
            item._id = computePageNumber(index, this.requestData.page_no, this.requestData.page_num)
            // 目标平台
            const platformList = []
            item.platformList.forEach(item => {
              try {
                platformList.push((() => {
                  return this.platformList.find(p => {
                    return p.value === item
                  }).name
                })())
                // eslint-disable-next-line no-empty
              } catch (e) {
              }
            })
            item._platformList = platformList.join(', ')
            // 跳转目标
            item._target = (() => {
              if (item.target === '01') return 'APP原生'
              if (item.target === '02') return 'H5'
              if (item.target === '03') return '微信小程序'
              return '无'
            })()
            // 发送时间
            item._sendTime = parseDateTime('y-m-d h:i', item.sendTime)
            // 状态
            item._status = (() => {
              if (item.status === '01') return '已发送'
              if (item.status === '02') return '待发送'
              return '未知'
            })()
            item._detail = []
            return item
          })
        })
        .catch(() => {
        })
        .finally(() => {
          this.loading = false
        })
    },
    /**
     * @description 新增/编辑弹出框关闭
     * */
    dialogCloseHandle() {
      this.dialogVisible = false
    },
    dialogOpenHandle(type) {
      if (type == 'accurate') {
        this.type = true
      } else {
        this.type = false
      }
      this.dialogVisible = true
    },
    /**
     * @description 条件筛选
     * */
    filterList() {
      this.requestData.page_no = 1
      this.getList()
    },
    reloadList() {
      this.requestData.page_no = 1
      this.getList()
    },
    /**
     * @description 删除 push 通知
     * @param row
     * */
    remove(row) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          removePushNotice({ pushId: row.pushId })
            .then((res) => {
              if (res.status !== 0) throw res
              this.getList()
            })
            .catch(() => {})
        })
        .catch(() => {
        })
    },
    /**
     * @description 每行点击更多时回调
     * @param row {Object}
     * */
    loadRowDetail(row) {
      if (row._detail.length === 0) {
        getPushNoticeInfo({ pushId: row.pushId })
          .then((res) => {
            if (res.status !== 0) throw res
            // res.data = [
            //   {
            //     'countId': '52cc8dcf07d24018b684d8b54fdd7794',
            //     'pushId': '755d72d697e045f8bd97d1e495745a23',
            //     'platform': '03',
            //     'sendCount': 1,
            //     'receivedCount': 2,
            //     'openCount': 33
            //   },
            //   {
            //     'countId': '903af2e1b76d48a9ba70f46dcb36f700',
            //     'pushId': '755d72d697e045f8bd97d1e495745a23',
            //     'platform': '02',
            //     'sendCount': 1,
            //     'receivedCount': 2,
            //     'openCount': 33
            //   },
            //   {
            //     'countId': '903af2e1b76d48a9ba70f46dcb36f700',
            //     'pushId': '755d72d697e045f8bd97d1e495745a23',
            //     'platform': '01',
            //     'sendCount': 1,
            //     'receivedCount': 2,
            //     'openCount': 33
            //   }
            // ]
            const detail = (() => {
              const list = []
              // 打开总数
              let openCount = 0
              // 发送总数
              let sendCount = 0
              // 接收总数
              let receivedCount = 0
              res.data.forEach(item => {
                openCount = openCount + item.openCount
                sendCount = sendCount + item.sendCount
                receivedCount = receivedCount + item.receivedCount
                try {
                  item._platform = this.platformList.find(platform => platform.value === item.platform).name
                } catch (e) {
                  item._platform = '未知平台'
                }
                list.push(item)
              })
              list.unshift({
                _platform: '合计',
                openCount, sendCount, receivedCount
              })
              return list
            })()
            this.$set(row, '_detail', detail)
            console.log(this.tableData)
          })
          .catch((e) => {
            console.log(e)
          })
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
.operate-statistics-component{
  .el-dialog__body{
    padding-top: 4px;
  }
}
.detail-list{
  position: relative;
  left: -18px;
  .item{
    margin-right: 60px;
  }
}
.detail-list-title, .base-info-title{
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
}
.item-count{
  margin-right: 30px;
  div:first-child{
    font-size: 14px;
  }
  div:last-child{
    font-size: 14px;
    margin-top: 10px;
  }
}
.base-info{
  position: relative;
  left: -18px;
  border-top: 1px solid #e2e2e2;
  padding-top: 20px;
  margin-top: 20px;
}
.base-info-item{
  > div{
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
