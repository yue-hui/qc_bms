<template>
  <div class="page gelei-content device-rule">
    <div class="card-box" style="background: none;box-shadow: none;padding-left: 0;padding-right: 0;padding-top: 6px;padding-bottom: 1px">
      <div class="filter" style="position: relative;">
        <div class="label">
          <span>权限组名称：</span>
        </div>
        <div class="input">
          <el-input placeholder="请输入权限组名称" size="mini" />
        </div>
        <div class="label">
          <span>权限类别：</span>
        </div>
        <div class="input">
          <el-input placeholder="请输入权限类别" size="mini" />
        </div>
        <div class="create" style="position: absolute;right: 0;">
          <el-button
            pid=""
            class="details-tab"
            size="mini"
            type="success"
            @click="openActionDialog"
          >新建
          </el-button>
        </div>
      </div>
    </div>
    <div class="table-content table-block">
      <el-table :data="TableData" stripe size="mini" style="width: 100%">
        <el-table-column align="center" label="权限组" width="180" prop="name" />
        <el-table-column align="center" label="权限类型" width="180" prop="name" />
        <el-table-column align="center" label="权限内容" prop="name" />
        <el-table-column align="center" width="180" label="操作">
          <template slot-scope="scope">
            <div>
              <el-button
                pid=""
                size="small"
                style="text-decoration: underline;"
                type="text"
                @click="update"
              >编辑
              </el-button>
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
    <el-dialog
      :visible.sync="actionDialog"
      :before-close="closeActionDialog"
      :title="updateStatus ? form.cdk_pack_name : '新建设备权限'"
      custom-class="app-bug-config-dialog"
      width="800px"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="170px" class="demo-ruleForm">
        <el-form-item label="rule_group（组名）" prop="plan_id">
          <el-select
            v-model="form.plan_id"
            :disabled="updateStatus"
            size="mini"
            filterable
            clearable
            remote
            style="width: 100%"
            class="plan-list-select"
            placeholder="请选择rule_group（组名）">
            <el-option
              v-for="(item, index) in ruleGroupList"
              :key="index"
              :label="item.label"
              :value="item.value"
              size="mini" />
          </el-select>
        </el-form-item>
        <el-form-item label="rule_type（类型）" prop="cdk_pack_name">
          <el-input v-model="form.cdk_pack_name" placeholder="请输入rule_type（类型）" size="mini" />
        </el-form-item>
        <el-form-item label="rule_content（内容）" prop="">
          <el-input v-model="form.cdk_pack_desc" rows="10" placeholder="请输入rule_content（内容）" type="textarea" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="save">确定</el-button>
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

export default {
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      page: 1,
      actionDialog: false,
      form: {
        cdk_pack_name: ''
      },
      rules: {},
      ruleGroupList: [
        { value: '001', label: '001' },
        { value: '002', label: '002' },
        { value: '003', label: '003' }
      ],
      updateStatus: false,
      TableData: [
        {
          name: '测试测试测试'
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
    },
    change_current: function(page) {
      this.page = page
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
      this.actionDialog = false
    },
    save() {
    },
    update() {
      this.openActionDialog()
      this.updateStatus = true
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
