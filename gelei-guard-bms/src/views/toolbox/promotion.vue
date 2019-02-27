<template>
  <div class="content">

    <div class="header-line">
      <div class="left-sider-box-style">
        <div class="control-box">
          <el-select
            v-model="current_promotion_status"
            size="mini"
            placeholder="请选择状态"
            clearable
            @change="change_promotion_status">
            <el-option
              v-for="item in promotion_status"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="control-box">
          <el-select
            v-model="current_platform_type"
            size="mini"
            placeholder="请选择平台"
            clearable
            @change="change_promotion_platform">
            <el-option
              v-for="item in platform_type"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="right-sider-box-style">
        <div class="control-box">
          <el-button
            type="success"
            size="mini"
            @click="sync_version"
          >发送同步版本指令
          </el-button>
        </div>
        <div class="control-box">
          <el-button
            type="success"
            size="mini"
            @click="create_app_version"
          >创建应用升级策略
          </el-button>
        </div>
      </div>
    </div>

    <div class="content-body">
      <div class="table-block">
        <el-table
          :data="version_block"
          size="mini"
          style="width: 100%">
          <el-table-column
            label="目标版本号"
            prop="version" />
          <el-table-column
            label="升级策略名称"
            prop="update_title" />
          <el-table-column
            label="包大小"
            prop="file_size_label"
            width="180" />
          <el-table-column
            label="平台"
            prop="platform_label"
            width="180" />
          <el-table-column
            label="启动时间"
            prop="publish_time_label"
            width="180" />
          <el-table-column
            label="停止时间"
            prop="stop_time_label"
            width="180" />
          <el-table-column
            label="状态"
            prop="status_label"
            width="180" />
          <el-table-column
            label="操作"
            prop="control"
            width="260">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="edit_app_version(scope.row)">编辑</el-button>
              <el-button size="small" type="text" @click="prefer_deploy(scope.row)">{{ show_deploy_name(scope.row) }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="page"
          :page-size="page_size"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, prev, pager, next, jumper"
          @current-change="change_current"
          @size-change="table_size_change" />
      </div>
    </div>

    <version-dialog
      v-if="show_dialog"
      :show-dialog="show_dialog"
      :is-new="is_create"
      :rid="record_id"
      @destory="destory" />

    <sync-instructions ref="sync_panel" />
  </div>
</template>

<script>
import { promotion_status, platform_type, platforms } from '@/views/toolbox/data/promotion'
import versionDialog from '@/views/toolbox/components/versions'
import syncInstructions from '@/views/toolbox/components/sync_instructions'
import { DATE_TIME_FORMAT, DEFAULT_PAGE_SIZE } from '@/utils/constant'
import { deploy_application_version, get_application_version_list } from '@/api/interactive'
import { date_formatter } from '@/utils/common'

export default {
  components: {
    versionDialog,
    syncInstructions
  },
  data() {
    return {
      promotion_status,
      platform_type,
      current_platform_type: '',
      current_promotion_status: '',
      version_block: [],
      total: 0,
      page: 1,
      page_size: DEFAULT_PAGE_SIZE,
      show_dialog: false,
      is_create: true,
      version_id: 0
    }
  },
  computed: {},
  mounted: function() {
    this.init_page()
  },
  methods: {
    init_page() {
      this.fetch_application_version_list()
    },
    search_appllication_versions() {
      this.page = 1
      this.page_size = DEFAULT_PAGE_SIZE
      this.fetch_application_version_list()
    },
    change_promotion_status(row) {
      this.search_appllication_versions()
    },
    change_promotion_platform(row) {
      this.search_appllication_versions()
    },
    show_deploy_name(row) {
      if (['00', '02'].indexOf(row.status) !== -1) {
        return '启动'
      } else {
        return '停止'
      }
    },
    table_size_change: function(page_size) {
      this.page_size = page_size
      this.fetch_application_version_list()
    },
    change_current: function(page) {
      this.page = page
      this.fetch_application_version_list()
    },
    get_config() {
      const config = {
        page_no: this.page,
        page_num: this.page_size,
        platform: this.current_platform_type,
        status: this.current_promotion_status
      }
      return config
    },
    get_label_from_key_value_sets(key, key_values) {
      // 通过Key获取对应的Label值
      let key_label = ''
      key_values.map(r => {
        if (r.value === key) {
          key_label = r.label
        }
      })
      return key_label
    },
    fetch_application_version_list() {
      const config = this.get_config()
      get_application_version_list(config).then((res) => {
        //
        if (res.status === 0) {
          this.version_block = res.data.map(r => {
            let file_size_label
            if (r.file_size) {
              file_size_label = r.file_size + 'MB'
            } else {
              file_size_label = ''
            }
            const platform_label = this.get_label_from_key_value_sets(r.platform, platforms)
            const status_label = this.get_label_from_key_value_sets(r.status, promotion_status)
            const publish_time_label = date_formatter(r.publish_time, DATE_TIME_FORMAT)
            const stop_time_label = date_formatter(r.stop_time, DATE_TIME_FORMAT)
            return {
              ...r,
              file_size_label,
              platform_label,
              status_label,
              publish_time_label,
              stop_time_label
            }
          })
          this.total = res.total_count
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    destory(status) {
      if (status) {
        this.fetch_application_version_list()
      }
      this.show_dialog = false
    },
    edit_app_version(row) {
      //
      this.show_dialog = true
      this.is_create = false
      this.record_id = row.version_id
    },
    prefer_deploy(row) {
      let status
      if (row.status === '01') {
        status = '02'
      } else if (row.status === '02') {
        status = '01'
      } else {
        status = '01'
      }
      let confirm_message
      if (status === '02') {
        confirm_message = '确认是否停止本次应用升级？'
      } else {
        confirm_message = '确认是否启动本次应用升级？'
      }

      this.$confirm(confirm_message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.prefer_deploy_action(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作!'
        })
      })
    },
    prefer_deploy_action(row) {
      let status
      if (row.status === '01') {
        status = '02'
      } else if (row.status === '02') {
        status = '01'
      } else {
        status = '01'
      }
      const version_id = row.version_id
      const config = {
        status,
        version_id
      }
      deploy_application_version(config).then((res) => {
        if (res.status === 0) {
          this.fetch_application_version_list()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    create_app_version(row) {
      this.show_dialog = true
      this.is_create = true
      this.record_id = ''
    },
    sync_version() {
      // 同步版本指令
      this.$refs.sync_panel.show_panel()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  /*min-height: 480px;*/
  padding: 0 10px 25px 10px;
  display: flex;
  flex-direction: column;

  .content-body {
    border: 1px solid #c7d5ee;
    height: 100%;
    padding: 15px 25px;
    min-height: 120px;
  }

  .header-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .left-sider-box-style{
      display: flex;
      flex-direction: row;
      .control-box {
        padding: 10px 15px;
      }
    }

    .right-sider-box-style{
      display: flex;
      flex-direction: row-reverse;
      .control-box {
        padding: 10px 15px;
      }
    }
  }
}
</style>
