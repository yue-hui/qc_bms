<template>
  <div class="gelei-content">
    <div v-if="packageDetail.cdk_pack_name" class="package-detail">
      <div class="title">
        <span>【{{ packageDetail.cdk_pack_name }}】详情</span>
      </div>
      <div class="detail-list">
        <div class="item">
          <div class="label">会员套餐：</div>
          <div class="value">{{ packageDetail.plan_name }}</div>
        </div>
        <div class="item">
          <div class="label">描述：</div>
          <div class="value">{{ packageDetail.cdk_pack_desc || '-' }}</div>
        </div>
        <div class="item">
          <div class="label">联系人：</div>
          <div class="value">{{ packageDetail.contacter || '-' }}</div>
        </div>
        <div class="item">
          <div class="label">联系方式：</div>
          <div class="value">{{ packageDetail.contact_phone || '-' }}</div>
        </div>
        <div class="item">
          <div class="label">有效期：</div>
          <div class="value">{{ packageDetail._begin_time }} - {{ packageDetail._end_time }}</div>
        </div>
        <div class="item">
          <div class="label">剩余库存：</div>
          <div class="value">{{ packageDetail._end_num }}</div>
        </div>
        <div class="item">
          <div class="label">状态：</div>
          <div class="value">
            <span v-if="packageDetail.cdk_pack_status === 2" style="color: #00c250">生效中</span>
            <span v-if="packageDetail.cdk_pack_status === 1">待生效</span>
            <span v-if="packageDetail.cdk_pack_status === 3" style="color: red">已失效</span>
            <span v-if="packageDetail.cdk_pack_status === 4" style="color: #e6a23c">已过期</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="8" :lg="5" :xl="6" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="5" class="order-number-list">兑换码:</el-col>
                <el-col :span="19">
                  <el-input
                    v-model="requestData.cdk"
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
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="9" class="order-number-list">状态:</el-col>
                <el-col :span="15">
                  <el-select
                    v-model="requestData.cdk_status"
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
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="14" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <gl-button
                  pid="21015"
                  class="download details-tab"
                  size="mini"
                  type="success"
                  @click="createPack"
                >添加库存
                </gl-button>
                <el-button
                  :loading="downloadLoading"
                  pid="21005"
                  class="download details-tab"
                  size="mini"
                  type="success"
                  @click="downloadPackageCode"
                >导出
                </el-button>
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
            width="120"
            prop="_id"
          />
          <el-table-column
            align="center"
            label="兑换码"
            prop="cdk" />
          <el-table-column
            align="center"
            label="创建时间"
            prop="_create_time" />
          <el-table-column
            align="center"
            label="状态"
            width="174"
            prop="cdk_pack_status">
            <template slot-scope="scope">
              <span v-if="scope.row.cdk_status === 1">未兑换</span>
              <span v-if="scope.row.cdk_status === 2" style="color: #00c250">已兑换</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="兑换时间"
            prop="_used_time" />
          <el-table-column
            align="center"
            label="兑换人手机号"
            prop="_user_phone" />
          <el-table-column
            align="center"
            label="兑换人昵称"
            prop="_user_name" />
          <el-table-column
            align="center"
            label="备注"
            width="174"
            prop="remark">
            <template slot-scope="scope">
              <span v-if="!scope.row._update_remark_status">{{ scope.row.remark || '-' }}</span>
              <el-input v-if="scope.row._update_remark_status" v-model="updateRemarkText" size="mini" placeholder="请输入内容"/>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="174"
            prop="control">
            <template slot-scope="scope">
              <gl-button v-if="!scope.row._update_remark_status" pid="21017" size="small" style="text-decoration: underline;" type="text" @click="updateRemark(scope.row)">备注</gl-button>
              <gl-button v-if="scope.row._update_remark_status" pid="21017" size="small" style="text-decoration: underline;" type="text" @click="saveRemark(scope.row)">保存</gl-button>
              <gl-button v-if="scope.row._update_remark_status" pid="21017" size="small" style="text-decoration: underline;" type="text" @click="closeAllUpdateRemark(scope.row)">取消</gl-button>
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
      :visible.sync="actionDialog"
      :before-close="closeActionDialog"
      title="添加库存"
      custom-class="app-bug-config-dialog"
      width="500px"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" class="demo-ruleForm">
        <el-form-item label="剩余库存" prop="">
          <span>{{ packageDetail._end_num }}</span>
        </el-form-item>
        <el-form-item label="添加数量" prop="num">
          <el-input v-model="form.num" max="999" min="1" placeholder="输入添加数量，每次最多999个" type="number" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitPackage">确定</el-button>
          <el-button size="small" @click="closeActionDialog">取消</el-button>
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
import { packageCodeList, get_all_member_plans, updatePackageCodeRemark, packageAddCode, getPackageDetail } from '../../api/interactive'
import { computePageNumber, parseDateTime, cloneDeep } from '../../utils'
const JsBigDecimal = require('js-big-decimal')

export default {
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      statusTypeList: [
        { name: '全部', value: '' },
        { name: '未兑换', value: 1 },
        { name: '已兑换', value: 2 }
      ],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      initTotal: 0,
      requestData: {
        cdk_pack_id: '',
        cdk: '',
        cdk_status: '',
        page_no: 1,
        page_num: page_size
      },
      requestTime: null,
      tableData: [],
      // 购买成功弹窗配置弹窗状态
      actionDialog: false,
      form: {
        num: ''
      },
      membershipPackageList: [],
      rules: {
        num: [
          { required: true, trigger: ['blur', 'change'], message: '请输入库存数量，必须为数字' },
          { trigger: ['blur', 'change'], validator: (rule, value, callback) => {
            return Number(value) > 999 || value <= 0 ? callback(new Error('库存不能超过999或者小于1')) : callback()
          } },
          { trigger: ['blur', 'change'], validator: (rule, value, callback) => {
            return Number(value) + this.initTotal > 9999 ? callback(new Error('兑换码包上限为9999个，无法添加更多兑换码')) : callback()
          } }
        ]
      },
      updateRemarkId: '',
      updateRemarkText: '',
      packageDetail: {},
      downloadLoading: false
    }
  },
  computed: {
    ...mapGetters(['is_agent'])
  },
  mounted() {
    this.fetchMemberPlanList()
    this.requestData.cdk_pack_id = Number(this.$route.query.id)
    this.getList()
    this.getPackageDetail()
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
     * @description
     * */
    openActionDialog() {
      this.actionDialog = true
    },
    /**
     * @description
     * */
    closeActionDialog() {
      this.form.num = ''
      this.$refs.form.clearValidate()
      this.$refs.form.resetFields()
      this.actionDialog = false
    },
    /**
     * @description
     * */
    createPack() {
      this.openActionDialog()
    },
    /**
     * @description 获取列表
     * */
    getList() {
      this.loading = true
      packageCodeList(this.requestData)
        .then((res) => {
          if (res.status !== 0) throw res
          this.total = res.total_count
          this.tableData = res.data.map((item, index) => {
            item._id = computePageNumber(index, this.requestData.page_no, this.requestData.page_num)
            item._create_time = parseDateTime('y-m-d h:i', item.create_time)
            item._used_time = item.used_time ? parseDateTime('y-m-d h:i', item.used_time) : '-'
            item._user_phone = item.user_phone || '-'
            item._user_name = item.user_name || '-'
            item._update_remark_status = false
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
    fetchMemberPlanList(planName) {
      return new Promise((resolve, reject) => {
        const config = {
          plan_type: '02',
          is_listing: '1'
        }
        if (planName) {
          config['plan_name'] = planName
        }
        get_all_member_plans(config).then(res => {
          if (res.status === 0) {
            const remote_data = res.data
            this.membershipPackageList = remote_data.map(r => {
              return {
                value: r.plan_id,
                label: r.plan_name,
                validDays: r.valid_days
              }
            })
            resolve()
          } else {
            this.$message.error(res.message)
          }
        }).finally(() => {
        })
      })
    },
    /**
     * @description 提交添加库存
     * */
    submitPackage() {
      this.$refs.form.validate()
        .then(() => {
          const loading = this.$loading({ lock: true })
          packageAddCode({
            cdk_pack_id: this.requestData.cdk_pack_id,
            num: this.form.num
          })
            .then((res) => {
              if (res.status !== 0) throw res
              this.requestData.page_no = 1
              this.getList()
              this.closeActionDialog()
              this.getPackageDetail()
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
    updateRemark(row) {
      this.closeAllUpdateRemark()
      this.updateRemarkId = row.cdk
      this.updateRemarkText = row.remark
      row._update_remark_status = true
    },
    /**
     * @description 保存备注
     * */
    saveRemark() {
      const loading = this.$loading({ lock: true })
      updatePackageCodeRemark({
        cdk: this.updateRemarkId,
        remark: this.updateRemarkText || ''
      })
        .then((res) => {
          if (res.status !== 0) throw res
          this.tableData = this.tableData.map((item) => {
            if (item.cdk === this.updateRemarkId) {
              item.remark = this.updateRemarkText
            }
            return item
          })
          this.closeAllUpdateRemark()
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
        .finally(() => {
          loading.close()
        })
    },
    /**
     * @description 取消所有编辑备注状态
     * */
    closeAllUpdateRemark() {
      this.tableData = this.tableData.map((item) => {
        item._update_remark_status = false
        return item
      })
    },
    getPackageDetail() {
      getPackageDetail({
        cdk_pack_id: this.requestData.cdk_pack_id
      })
        .then(res => {
          if (res.status !== 0) throw res
          this.packageDetail = res.data
          this.packageDetail._begin_time = parseDateTime('y-m-d h:i', res.data.begin_time)
          this.packageDetail._end_time = parseDateTime('y-m-d h:i', res.data.end_time)
          this.packageDetail._end_num = new JsBigDecimal(res.data.total_num).subtract(new JsBigDecimal(res.data.used_num)).getValue()
          this.initTotal = res.data.total_num
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
    },
    downloadPackageCode() {
      this.downloadLoading = true
      const requestData = cloneDeep(this.requestData)
      requestData.page_no = 1
      requestData.page_num = this.total
      packageCodeList(requestData)
        .then((res) => {
          if (res.status !== 0) throw res
          this.total = res.total_count
          const tableData = res.data.map((item, index) => {
            item._id = computePageNumber(index, this.requestData.page_no, this.requestData.page_num)
            item._create_time = parseDateTime('y-m-d h:i', item.create_time)
            item._used_time = item.used_time ? parseDateTime('y-m-d h:i', item.used_time) : '-'
            item._user_phone = item.user_phone || '-'
            item._user_name = item.user_name || '-'
            item._update_remark_status = false
            return item
          })
          // console.log(tableData)

          import('@/utils/Export2Excel').then(excel => {
            const header = ['序号', '兑换码', '创建时间', '状态', '兑换时间', '兑换人手机号', '兑换人昵称', '备注']
            const data = tableData.map(item => {
              return [item._id, item.cdk, item._create_time, item.cdk_status === 1 ? '未兑换' : '已兑换',
                item._used_time, item._user_phone, item._user_name, item.remark || '-']
            })
            data.push([])
            data.push([
              '导出时间：',
              parseDateTime('y-m-d h:i')
            ])
            const options = {
              header,
              data,
              filename: this.packageDetail.cdk_pack_name + '_' + new Date().getTime(),
              autoWidth: true,
              bookType: 'xlsx'
            }
            excel.export_json_to_excel(options)
          })
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
        .finally(() => {
          this.downloadLoading = false
        })
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
.package-detail{
  padding: 20px;
  padding-bottom: 4px;
  background: #fff;
  margin-bottom: 20px;
  border: 1px solid #EAEAEA;
  .title{
    font-size: 20px;
    position: relative;
    left: -10px;
  }
  .detail-list{

    .item{
      display: flex;
      margin-top: 20px;
      margin-bottom: 20px;
      font-size: 14px;
      .label{
        width: 72px;
        //text-align: right;
        margin-right: 10px;
      }
      .value{
        opacity: .8;
      }
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
