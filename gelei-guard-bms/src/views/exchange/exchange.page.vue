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
                    v-model="requestData.cdk_pack_name"
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
                    v-model="requestData.cdk_pack_status"
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
          <el-col :xs="12" :sm="8" :md="8" :lg="5" :xl="6" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="5" class="order-number-list">兑换码:</el-col>
                <el-col :span="19">
                  <el-input
                    v-model="requestData.cdk"
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
                <el-button
                  pid="21005"
                  class="download details-tab"
                  size="mini"
                  type="success"
                  @click="createPack"
                >创建
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
            prop="_id"
          />
          <el-table-column
            align="center"
            label="兑换码包名称"
            prop="cdk_pack_name" />
          <el-table-column
            align="center"
            label="数量"
            prop="_num" />
          <el-table-column
            align="center"
            label="兑换率"
            prop="_used_num" />
          <el-table-column
            align="center"
            label="创建人"
            prop="create_user_name" />
          <el-table-column
            align="center"
            label="创建时间"
            prop="_create_time" />
          <el-table-column
            align="center"
            label="兑换开始时间"
            prop="_begin_time" />
          <el-table-column
            align="center"
            label="兑换结束时间"
            prop="_end_time" />
          <el-table-column
            align="center"
            label="状态"
            width="174"
            prop="cdk_pack_status">
            <template slot-scope="scope">
              <span v-if="scope.row.cdk_pack_status === 2" style="color: #00c250">生效中</span>
              <span v-if="scope.row.cdk_pack_status === 1">待生效</span>
              <span v-if="scope.row.cdk_pack_status === 3" style="color: red">已失效</span>
              <span v-if="scope.row.cdk_pack_status === 4" style="color: #e6a23c">已过期</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="174"
            prop="control">
            <template slot-scope="scope">
              <el-button pid="" size="small" style="text-decoration: underline;" type="text" @click="packageDetail(scope.row)">查看</el-button>
              <el-button pid="" size="small" style="text-decoration: underline;" type="text" @click="updatePackage(scope.row)">编辑</el-button>
              <el-button v-if="[1, 2, 4].includes(scope.row.cdk_pack_status)" pid="" size="small" style="text-decoration: underline;" type="text" @click="disableExchangePackage(scope.row)">使失效</el-button>
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
      :title="updateStatus ? form.cdk_pack_name : '新建兑换包'"
      custom-class="app-bug-config-dialog"
      width="500px"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" class="demo-ruleForm">
        <el-form-item label="兑换码包名称" prop="cdk_pack_name">
          <el-input v-model="form.cdk_pack_name" :disabled="updateStatus" placeholder="请输入兑换码包名称" size="mini" />
        </el-form-item>
        <el-form-item label="描述" prop="">
          <el-input v-model="form.cdk_pack_desc" placeholder="请输入描述" size="mini" />
        </el-form-item>
        <el-form-item label="联系人" prop="">
          <el-input v-model="form.contacter" placeholder="请输入联系人" size="mini" />
        </el-form-item>
        <el-form-item label="联系方式" prop="">
          <el-input v-model="form.contact_phone" placeholder="请输入联系方式" size="mini" />
        </el-form-item>
        <el-form-item v-show="!updateStatus" label="库存" prop="num">
          <el-input v-model="form.num" max="999" min="1" placeholder="请输入库存" type="number" size="mini" />
        </el-form-item>
        <el-form-item label="会员套餐" prop="plan_id">
          <el-select
            v-model="form.plan_id"
            :disabled="updateStatus"
            size="mini"
            filterable
            clearable
            remote
            style="width: 100%"
            class="plan-list-select"
            placeholder="请选择会员套餐">
            <el-option
              v-for="(membership, index) in membershipPackageList"
              :key="index"
              :label="membership.label"
              :value="membership.value"
              size="mini" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="!updateStatus" label="兑换时间" prop="exchangeTime">
          <el-date-picker
            v-model="form.exchangeTime"
            style="width: 100%"
            type="datetimerange"
            size="mini"
            format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"/>
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
import { getExchangeList, disableExchangePackage, get_all_member_plans, saveExchangePackage, updateExchangePackage } from '../../api/interactive'
import { computePageNumber, parseDateTime } from '../../utils'
const JsBigDecimal = require('js-big-decimal')

export default {
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      statusTypeList: [
        { name: '全部', value: '' },
        { name: '待生效', value: 1 },
        { name: '生效中', value: 2 },
        { name: '已失效', value: 3 },
        { name: '已过期', value: 4 }
      ],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      requestData: {
        cdk_pack_name: '',
        cdk_pack_status: '',
        cdk: '',
        page_no: 1,
        page_num: page_size
      },
      requestTime: null,
      tableData: [],
      // 购买成功弹窗配置弹窗状态
      actionDialog: false,
      form: {
        cdk_pack_name: '',
        cdk_pack_desc: '',
        contacter: '',
        contact_phone: '',
        num: '',
        plan_id: '',
        begin_time: '',
        end_time: '',
        exchangeTime: null
      },
      updateStatus: false,
      membershipPackageList: [],
      rules: {
        cdk_pack_name: [
          { required: true, trigger: ['blur', 'change'], message: '请输入兑换码包名称' }
        ],
        num: [
          { required: true, trigger: ['blur', 'change'], message: '请输入库存数量，必须为数字' },
          { trigger: ['blur', 'change'], validator: (rule, value, callback) => {
            return value > 999 || value <= 0 ? callback(new Error('库存不能超过999或者小于1')) : callback()
          } }
        ],
        plan_id: [
          { required: true, trigger: ['blur', 'change'], message: '请选择兑换码匹配的会员套餐' }
        ],
        exchangeTime: [
          { required: true, trigger: ['blur', 'change'], message: '请选择兑换开始时间和结束时间' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['is_agent'])
  },
  mounted() {
    this.fetchMemberPlanList()
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
     * @description
     * */
    openActionDialog() {
      this.actionDialog = true
    },
    /**
     * @description
     * */
    closeActionDialog() {
      this.updateStatus = false
      this.form.exchangeTime = null
      this.resetForm()
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
      getExchangeList(this.requestData)
        .then((res) => {
          if (res.status !== 0) throw res
          this.total = res.total_count
          this.tableData = res.data.map((item, index) => {
            item._id = computePageNumber(index, this.requestData.page_no, this.requestData.page_num)
            // 兑换率
            item._used_num = new JsBigDecimal(item.used_num).divide(new JsBigDecimal(item.total_num), 2)
              .multiply(new JsBigDecimal(100)).getValue() + '%'
            // 创建时间
            item._create_time = parseDateTime('y-m-d h:i', item.create_time)
            // 兑换开始、结束时间
            item._begin_time = parseDateTime('y-m-d h:i', item.begin_time)
            item._end_time = parseDateTime('y-m-d h:i', item.end_time)
            item._num = item.total_num + ' / ' + item.used_num
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
    /**
     * @description 使兑换码包失效
     * */
    disableExchangePackage(row) {
      this.$confirm('确认让此兑换码包失效吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        disableExchangePackage({
          cdk_pack_id: row.cdk_pack_id
        })
          .then(res => {
            if (res.status !== 0) throw res
            this.getList()
          })
          .catch(e => {
            this.$message.error(e.message)
          })
      }).catch(() => {
      })
    },
    /**
     * @description 更新包详情
     * */
    updatePackage(row) {
      this.openActionDialog()
      this.$nextTick()
        .then(() => {
          this.updateStatus = true
          this.form.cdk_pack_id = row.cdk_pack_id
          this.form.cdk_pack_desc = row.cdk_pack_desc
          this.form.contacter = row.contacter
          this.form.cdk_pack_name = row.cdk_pack_name
          this.form.contact_phone = row.contact_phone
          this.form.plan_id = row.plan_id
        })
    },
    packageDetail(row) {
      const options = {
        name: 'exchange-detail'
      }
      const { href } = this.$router.resolve(options)
      window.open(href + '?id=' + row.cdk_pack_id, '_blank')
    },
    /**
     * @description 兑换时间发生改变
     * */
    timeChange(time) {
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
    submitPackage() {
      if (this.updateStatus) {
        const loading = this.$loading({ lock: true })
        return updateExchangePackage({
          cdk_pack_id: this.form.cdk_pack_id,
          cdk_pack_desc: this.form.cdk_pack_desc,
          contacter: this.form.contacter,
          contact_phone: this.form.contact_phone,
          plan_id: this.form.plan_id
        })
          .then((res) => {
            if (res.status !== 0) throw res
            this.getList()
            this.closeActionDialog()
          })
          .catch((e) => {
            this.$message.error(e.message)
          })
          .finally(() => {
            loading.close()
          })
      }
      this.$refs.form.validate()
        .then(() => {
          const loading = this.$loading({ lock: true })
          this.form.begin_time = this.form.exchangeTime[0].getTime()
          this.form.end_time = this.form.exchangeTime[1].getTime()
          saveExchangePackage(this.form)
            .then((res) => {
              if (res.status !== 0) throw res
              this.requestData.page_no = 1
              this.getList()
              this.closeActionDialog()
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
    resetForm() {
      this.form = {
        cdk_pack_name: '',
        cdk_pack_desc: '',
        contacter: '',
        contact_phone: '',
        num: '',
        plan_id: '',
        begin_time: '',
        end_time: '',
        exchangeTime: null
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
