<template>
  <div class="page gelei-content device-rule">
    <div class="card-box" style="background: none;box-shadow: none;padding-left: 0;padding-right: 0;padding-top: 6px;padding-bottom: 1px">
      <div class="filter" style="position: relative;">
        <div class="label">
          <span>权限组名称：</span>
        </div>
        <div class="input">
          <el-input v-model="requestData.ruleGroup" clearable placeholder="请输入权限组名称" size="mini" @change="filterList" />
        </div>
        <div class="label">
          <span>权限类别：</span>
        </div>
        <div class="input">
          <el-input v-model="requestData.ruleType" clearable placeholder="请输入权限类别" size="mini" @change="filterList" />
        </div>
        <div class="create" style="position: absolute;right: 0;">
          <gl-button
            pid="21027"
            class="details-tab"
            size="mini"
            type="success"
            @click="add"
          >新建
          </gl-button>
        </div>
      </div>
    </div>
    <div class="table-content table-block">
      <el-table v-loading="loading" :data="tableData" stripe size="mini" style="width: 100%">
        <el-table-column align="center" label="权限组" width="250" prop="ruleGroup" />
        <el-table-column align="center" label="权限类型" width="300" prop="ruleType" />
        <el-table-column align="center" label="权限内容" prop="_ruleContent">
          <template slot-scope="scope">
            <div>
              <span style="color: rgb(64, 158, 255); cursor: pointer;" @click="showDetail(scope.row)">{{ scope.row._ruleContent }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="180" label="操作">
          <template slot-scope="scope">
            <div>
              <gl-button
                pid="21028"
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="update(scope.row)"
              >编辑
              </gl-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="requestData.page_no"
        :page-size="requestData.page_num"
        :page-sizes="page_sizes"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="change_current"
        @size-change="table_size_change" />
    </div>
    <el-dialog
      :visible.sync="actionDialog"
      :before-close="closeActionDialog"
      :title="updateStatus ? '更新设备权限' : '新建设备权限'"
      custom-class="app-bug-config-dialog"
      width="800px"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="170px" class="demo-ruleForm">
        <el-form-item label="rule_group（组名）" prop="ruleGroup">
          <el-input v-model="form.ruleGroup" placeholder="请输入请选择rule_group（组名）" size="mini" />
        </el-form-item>
        <el-form-item label="rule_type（类型）" prop="ruleType">
          <el-input v-model="form.ruleType" placeholder="请输入rule_type（类型）" size="mini" />
        </el-form-item>
        <el-form-item label="rule_content（内容）" prop="ruleContent">
          <el-input v-model="form.ruleContent" rows="10" placeholder="请输入rule_content（内容）" type="textarea" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="save">确定</el-button>
          <el-button size="small" @click="closeActionDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :visible.sync="detailDialogVisible"
      :before-close="closeDetailDialogHandle"
      :close-on-click-modal="false"
      title="提示"
      width="600px">
      <div v-if="detailDialogVisible" style="overflow: auto;max-height: 60vh">
        <pre style="word-wrap: break-word;white-space: pre-wrap;">
{{ detailDialogContent }}
        </pre>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDetailDialogHandle">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  TABLE_PAGE_SIEZS_LIST
} from '@/utils/constant'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { deviceRuleConfigAdd, deviceRuleConfigList, deviceRuleConfigUpdate } from '../../../api/interactive'
import { cloneDeep } from '../../../utils'

export default {
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      page: 1,
      requestData: {
        ruleGroup: '',
        ruleType: '',
        page_no: 1,
        page_num: page_size
      },
      actionDialog: false,
      form: {
        id: '',
        ruleGroup: '',
        ruleType: '',
        ruleContent: ''
      },
      rules: {
        ruleGroup: [
          { required: true, trigger: ['blur', 'change'], message: '请输入请选择rule_group（组名）' }
        ],
        ruleType: [
          { required: true, trigger: ['blur', 'change'], message: '请输入rule_type（类型）' }
        ],
        ruleContent: [
          { required: true, trigger: ['blur', 'change'], message: '请输入rule_content（内容）' }
        ]
      },
      updateStatus: false,
      tableData: [],
      detailDialogVisible: false,
      detailDialogContent: ''
    }
  },
  mounted() {
    this.getDeviceRuleConfigList()
  },
  methods: {
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.requestData.page_no = 1
      this.requestData.page_num = size
      this.getDeviceRuleConfigList()
    },
    change_current: function(page) {
      this.requestData.page_no = page
      this.getDeviceRuleConfigList()
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
    async closeActionDialog() {
      this.form.ruleGroup = ''
      this.form.ruleType = ''
      this.form.ruleContent = ''
      await this.$nextTick()
      this.$refs.form.clearValidate()
      await this.$nextTick()
      this.updateStatus = false
      this.actionDialog = false
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const loading = this.$loading({ lock: true })
          const form = cloneDeep(this.form)
          /* form.ruleContent = isJsonString(form.ruleContent.replace(/\\r/g, '').replace(/\\n/g, ''))
            ? JSON.stringify(JSON.parse(form.ruleContent.replace(/\\r/g, '').replace(/\\n/g, ''))) : form.ruleContent
          console.log(form.ruleContent)*/
          if (this.updateStatus) {
            delete form.ruleDesc
            delete form._ruleContent
            delete form.updateTime
            deviceRuleConfigUpdate(form)
              .then(res => {
                if (res.status !== 0) throw res
                this.getDeviceRuleConfigList()
                this.closeActionDialog()
              })
              .catch(e => {
                this.$message.error(e.message)
              })
              .finally(() => {
                loading.close()
              })
            return
          }
          delete form.id
          deviceRuleConfigAdd(form)
            .then(res => {
              if (res.status !== 0) throw res
              this.requestData.page_no = 1
              this.getDeviceRuleConfigList()
              this.closeActionDialog()
            })
            .catch(e => {
              this.$message.error(e.message)
            })
            .finally(() => {
              loading.close()
            })
        } else {
          return false
        }
      })
    },
    add() {
      this.form.ruleGroup = 'childinit'
      this.openActionDialog()
      this.updateStatus = false
    },
    update(row) {
      this.form = cloneDeep(row)
      this.openActionDialog()
      this.updateStatus = true
    },
    /**
     * @description 获取列表
     * */
    getDeviceRuleConfigList() {
      this.loading = true
      deviceRuleConfigList(this.requestData)
        .then((res) => {
          if (res.status !== 0) throw res
          this.total = res.total_count
          this.tableData = res.data.map(item => {
            item._ruleContent = item.ruleContent.length > 80 ? (item.ruleContent.slice(0, 80) + '...') : item.ruleContent
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
     * @description 弹出权限详情
     * */
    showDetail(row) {
      this.detailDialogContent = this.tableData.find(item => item.id === row.id).ruleContent
      this.openDetailDialogHandle()
    },
    closeDetailDialogHandle() {
      this.detailDialogVisible = false
    },
    openDetailDialogHandle() {
      this.detailDialogVisible = true
    },
    filterList() {
      this.requestData.page_no = 1
      this.getDeviceRuleConfigList()
    }
  }
}
</script>

<style scoped lang="scss">

.filter{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .input{
    margin-left: 6px;
    margin-right: 16px;
  }
}
.gelei-content{
  padding: 20px 20px 25px 20px;
  .card-box{
    background-color: #ffffff;
    padding: 24px;
    padding-bottom: 5px;
    -webkit-box-shadow: 6px 4px 20px 5px #f1f1f1;
    box-shadow: 6px 4px 20px 5px #f1f1f1;
    border-radius: 4px;
    margin-bottom: 20px;
    .title-area{
      font-family: PingFangSC-Regular, 微软雅黑, serif;
      font-size: 20px;
      color: #454545;
      font-weight: bold;
      margin-bottom: 30px;
      position: relative;
      .download{
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>
