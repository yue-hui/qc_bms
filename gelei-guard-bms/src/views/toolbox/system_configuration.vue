<template>
  <div class="content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">平台:</el-col>
                <el-select v-model="query_sets.question_platform" size="mini" clearable placeholder="问题类型" @change="change_query_status">
                  <el-option
                    v-for="item in []"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">问题类型:</el-col>
                <el-col :span="16">
                  <el-select v-model="query_sets.question_type" size="mini" clearable placeholder="问题类型" @change="change_query_status">
                    <el-option
                      v-for="item in []"
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
                <el-col :span="8" class="order-number-list">状态:</el-col>
                <el-col :span="16">
                  <el-select
                    v-model="query_sets.query_status"
                    size="mini"
                    placeholder="请选择状态"
                    clearable
                    @change="change_query_status">
                    <el-option
                      v-for="item in []"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="12" :lg="14" :xl="16" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-button size="mini" type="success" @click="create_configuration">新建</el-button>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="table-content">
        <el-table
          :data="questions"
          size="mini"
          style="width: 100%">
          <el-table-column
            label="参数ID"
            prop="p_id" />
          <el-table-column
            label="参数类型"
            prop="p_type" />
          <el-table-column
            label="参数类型名称"
            prop="p_type_name" />
          <el-table-column
            label="参数显示名称"
            prop="p_label" />
          <el-table-column
            label="参数值"
            prop="p_value" />
          <el-table-column
            label="是否可用"
            prop="enabled" />
          <el-table-column
            label="排序号"
            prop="row_order" />
          <el-table-column
            label="备注"
            prop="remark" />
          <el-table-column
            label="操作"
            prop="control">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="edit_configration(scope.row)">编辑</el-button>
              <el-button size="small" type="text" @click="delete_configration(scope.row)">删除</el-button>
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
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { get_sys_configuration_list } from '@/api/interactive'

export default {
  name: 'SystemConfiguration',
  components: {},
  data() {
    const page_size = getPagenationSize()
    return {
      questions: [],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      query_sets: {
      }
    }
  },
  computed: {},
  mounted: function() {
    this.fetch_system_configuration_list()
  },
  methods: {
    change_query_status: function() {
      //
    },
    create_configuration: function() {
      //
    },
    edit_configration: function() {
      //
    },
    delete_configration: function() {
      //
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.fetch_system_configuration_list()
    },
    change_current: function(page) {
      this.page = page
      this.fetch_system_configuration_list()
    },
    get_configuration: function() {
      // 获取查询参数
      // const p_type_name = ''
      return {
        page_num: this.page,
        page_no: this.page_size
      }
    },
    fetch_system_configuration_list: function() {
      // questions
      const config = this.get_configuration()
      get_sys_configuration_list(config).then(res => {
        if (res.status === 0) {
          this.questions = res.data
          this.total = res.total_count
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content {
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

    .table-content {
      margin: 20px;
    }
  }
}
</style>
