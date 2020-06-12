<template>
  <div class="gelei-content">
    <div class="content-body">
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4" class="col-bg">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="8" class="order-number-list">渠道名称:</el-col>
                <el-col :span="16">
                  <el-input
                    v-model="query_set.key_word"
                    size="mini"
                    clearable
                    placeholder="请输入渠道名称"
                    @change="search" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="12" :sm="16" :md="18" :lg="19" :xl="20" class="col-bg layout-right">
            <div class="grid-content bg-purple-light">
              <el-row>
                <gl-button
                  :loading="download_loading"
                  pid="20064"
                  class="download details-tab"
                  size="mini"
                  type="success"
                  @click="create_business_cooperation">创建页面
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
          size="mini"
          style="width: 100%">
          <el-table-column
            align="center"
            label="序号"
            prop="row_id"
            width="80" />
          <el-table-column
            align="center"
            label="渠道名称"
            prop="channel_name"
            width="240">
            <template slot-scope="scope">
              <a :href="scope.row.virtual_channel_url" class="channel-link" target="_blank">{{ scope.row.channel_name }}</a>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="UV"
            prop="uv" />
          <el-table-column
            align="center"
            label="PV"
            prop="pv" />
          <el-table-column
            align="center"
            label="下载量"
            prop="download_count" />
          <el-table-column
            align="center"
            label="注册量"
            prop="register_count" />
          <el-table-column
            align="center"
            label="会员套餐"
            prop="plan_name" />
          <el-table-column
            align="center"
            width="160"
            label="创建时间"
            prop="create_time_label" />
          <el-table-column
            align="center"
            label="操作"
            width="120"
            prop="control">
            <template slot-scope="scope">
              <gl-button
                pid="20090"
                size="mini"
                style="text-decoration: underline;"
                type="text"
                @click="edit_business_cooperation(scope.row)">编辑</gl-button>
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

    <createOrEditBusinessCooperation v-if="show_pannel" :dialog_visible="show_pannel" :condition="condition" @receive="pannel_callback" />
  </div>
</template>

<script>
import createOrEditBusinessCooperation from './components/create_or_edit_business_cooperation'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { DATE_TIME_FORMAT, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { get_business_cooperation_list } from '@/api/interactive'
import { date_formatter, get_h5_domain } from '@/utils/common'

export default {
  name: 'BusinessCooperation',
  components: {
    createOrEditBusinessCooperation
  },
  data() {
    const page_size = getPagenationSize()
    return {
      loading: false,
      business_cooperation_list: [],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0,
      show_pannel: false,
      query_set: {
        key_word: ''
      },
      table_data: [],
      current_uid: '',
      condition: {},
      recharge_dialog_visible: false,
      member_dialog_visible: false,
      download_loading: false
    }
  },
  mounted: function() {
    this.fetch_business_cooperation()
  },
  methods: {
    input_pure_number(valid_days, is_start = true) {
      const new_valid_days = valid_days.replace(/[^\d]/g, '')
      this.$nextTick(() => {
        if (is_start) {
          this.query_set.begin_valid_days = new_valid_days
        } else {
          this.query_set.end_valid_days = new_valid_days
        }
      })
    },
    init() {
      this.fetch_business_cooperation()
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.fetch_business_cooperation()
    },
    change_current: function(page) {
      this.page = page
      this.fetch_business_cooperation()
    },
    get_config: function() {
      return {
        page_no: this.page,
        page_num: this.page_size
      }
    },
    get_params: function() {
      const config = this.get_config()
      if (this.query_set.key_word) {
        config['key_word'] = '' + this.query_set.key_word
      }
      return config
    },
    search: function() {
      this.page = 1
      this.fetch_business_cooperation()
    },
    create_business_cooperation: function() {
      this.condition = {}
      this.show_pannel = true
    },
    edit_business_cooperation: function(row) {
      this.condition = {
        channel_id: row.channel_id
      }
      this.show_pannel = true
    },
    pannel_callback: function(refresh = true) {
      if (refresh) {
        this.search()
      }
      this.show_pannel = false
    },
    build_channel_url(channel_id) {
      const h5_domain = get_h5_domain()
      return h5_domain + '/gelei-guard-h5/share/invited_friends.html#/business-cooperation?cid=' + channel_id
    },
    fetch_business_cooperation: function() {
      this.loading = true
      const config = this.get_params()
      get_business_cooperation_list(config).then(res => {
        if (res.status === 0) {
          this.table_data = res.data.map((r, index) => {
            const create_time_label = date_formatter(r.create_time, DATE_TIME_FORMAT)
            const row_id = (this.page - 1) * this.page_size + index + 1
            const virtual_channel_url = this.build_channel_url(r.channel_id)
            return {
              ...r,
              row_id,
              virtual_channel_url,
              create_time_label
            }
          })
          this.total = res.total_count
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
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

      .channel-link {
        color: #313cff;
        border-bottom: #313cff solid 1px;
      }
    }
  }
}
</style>
