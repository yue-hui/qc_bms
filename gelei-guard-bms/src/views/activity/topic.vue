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
                    v-model="query_set.name"
                    maxlength="11"
                    size="mini"
                    clearable
                    placeholder="请输入话题标题"
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
                    v-model="query_set.status"
                    size="mini"
                    placeholder="请选择话题状态"
                    clearable
                  >
                    <el-option
                      v-for="item in topic_type_list"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name" />
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
                    v-model="query_set.datetime_range"
                    end-placeholder="结束日期"
                    range-separator="至"
                    start-placeholder="开始日期"
                    type="daterange"
                    clearable
                    size="mini"
                    unlink-panels
                  />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <gl-button
                  pid="10088"
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
          :data="table_data"
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
            label="标题"
            prop="nick_name"
            width="180" />
          <el-table-column
            align="center"
            label="参与人数"
            prop="phone" />
          <el-table-column
            align="center"
            width="132"
            label="运营位"
            prop="create_time" />
          <el-table-column
            align="center"
            label="选项1"
            prop="device_type_label" />
          <el-table-column
            align="center"
            label="选项2"
            prop="reg_from_label" />
          <el-table-column
            align="center"
            label="投票比例"
            prop="vip_label"
            width="220" />
          <el-table-column
            align="center"
            label="状态"
            prop="valid_days_label" />
          <el-table-column
            align="center"
            label="开始时间"
            prop="valid_days_label" />
          <el-table-column
            align="center"
            label="结束时间"
            prop="valid_days_label" />
          <el-table-column
            align="center"
            label="操作"
            width="174"
            prop="control">
            <template slot-scope="scope">
              <gl-button
                pid="20008"
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
          @current-change="change_current"
          @size-change="table_size_change" />
        <el-button type="primary" @click="operateDialogOpenHandle">打开运营位数据统计</el-button>
        <el-button type="primary" @click="joinDetail">打开参与详情</el-button>
      </div>
    </div>
    <!--运营位数据统计-->
    <el-dialog
      :visible.sync="operateDialogVisible"
      :before-close="operateDialogCloseHandle"
      title="运营位数据统计"
      custom-class="operate-statistics-component"
      width="800px"
    >
      <operate-statistics-component v-if="operateDialogVisible" />
    </el-dialog>
  </div>
</template>

<script>
import {
  TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { mapGetters } from 'vuex'
// import dayjs from 'dayjs'

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
        { name: '全部' },
        { name: '待上架' },
        { name: '已下架' },
        { name: '进行中' },
        { name: '已结束' }
      ],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      query_set: {
        name: '',
        status: '',
        datetime_range: null
      },
      table_data: [],
      dialogVisible: false,
      dialogType: 1, // 1 新增 | 2 编辑
      operateDialogVisible: false // 运营位数据统计弹出框状态
    }
  },
  computed: {
    ...mapGetters(['is_agent'])
  },
  mounted: function() {
  },
  methods: {
    table_size_change: function(size) {
      setPagenationSize(size)
    },
    change_current: function(page) {
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
     * */
    operateDialogOpenHandle() {
      this.operateDialogVisible = true
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
    joinDetail() {
      // activity-topic-join-detail
      const options = {
        name: 'activity-topic-join-detail'
      }
      const { href } = this.$router.resolve(options)
      window.open(href, '_blank')
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
