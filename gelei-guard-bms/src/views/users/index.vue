<template>
  <div class="content">
    <div class="content-body">
      <div class="header-line">
        <div class="header-line-left">
          <div class="header-block search-time">
            <label class="search-item">注册时间:</label>
            <div class="block">
              <el-date-picker
                v-model="datetime_range"
                clearable
                end-placeholder="结束日期"
                range-separator="至"
                start-placeholder="开始日期"
                type="daterange"
                unlink-panels />
            </div>
          </div>

          <div class="header-block phone-block">
            <label class="search-item">手机号:</label>
            <el-input
              v-model="phone"
              clearable
              maxlength="11"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              placeholder="请输入手机号" />
          </div>
        </div>

        <div class="header-line-right">
          <el-button type="success" @click="search">搜索</el-button>
        </div>
      </div>
      <hr class="hr-diviser">
      <div class="table-content">
        <el-table
          :data="table_data"
          style="width: 100%">
          <el-table-column
            align="center"
            label="序号"
            prop="_id"
            width="80" />
          <el-table-column
            align="center"
            label="用户昵称"
            prop="nick_name"
            width="180" />
          <el-table-column
            align="center"
            label="手机号"
            prop="phone" />
          <el-table-column
            align="center"
            label="注册时间"
            prop="create_time" />
          <el-table-column
            align="center"
            label="操作"
            prop="control">
            <template slot-scope="scope">
              <el-button size="small" style="text-decoration: underline;" type="text" @click="view_details(scope.row)">查看</el-button>
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
  </div>
</template>

<script>
import { get_parent_list } from '@/api/interactive'
import { date_formatter } from '@/utils/common'
import { DEFAULT_PAGE_SIZE } from '@/utils/constant'

export default {
  components: {},
  data() {
    return {
      page: 1,
      page_size: DEFAULT_PAGE_SIZE,
      total: 0,
      datetime_range: '',
      phone: '',
      table_data: []
    }
  },
  computed: {},
  mounted: function() {
    this.init()
  },
  methods: {
    init() {
      this.refresh_data()
    },
    search(e) {
      this.refresh_data()
    },
    table_size_change: function(size) {
      this.page_size = size
      this.refresh_data()
    },
    change_current: function(page) {
      this.page = page
      this.refresh_data()
    },
    get_config: function() {
      return {
        page_no: this.page,
        page_num: this.page_size
      }
    },
    get_params: function() {
      const config = this.get_config()
      if (this.phone) {
        config['phone'] = '' + this.phone
      }
      if (this.datetime_range && this.datetime_range.length === 2) {
        config['begin_time'] = '' + this.datetime_range[0].getTime()
        config['end_time'] = '' + this.datetime_range[1].getTime()
      }
      return config
    },
    view_details: function(row) {
      const options = {
        path: '/users/details',
        query: {
          id: row.user_id
        }
      }
      const { href } = this.$router.resolve(options)
      window.open(href, '_blank')
    },
    refresh_data: function() {
      const config = this.get_params()
      console.log(config)
      get_parent_list(config).then(res => {
        const table_data = []
        const base_index = (config.page_no - 1) * config.page_num + 1
        res.data.forEach((r, i, _a) => {
          const item = {
            ...r,
            create_time: date_formatter(r.create_time),
            _id: base_index + i
          }
          table_data.push(item)
        })
        this.table_data = table_data
        this.total = res.total_count
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$label_height: 40px;
.content {
  width: 100%;
  height: 100%;
  /*min-height: 480px;*/
  padding: 20px 10px 25px 10px;
  display: flex;
  flex-direction: column;

  .content-body {
    border: 1px solid #c7d5ee;
    height: 100%;
    padding: 15px 25px;
    min-height: 120px;

    .header-line {
      display: flex;
      flex-direction: row;

      .header-line-left {
        flex: 1;
        display: flex;
        flex-direction: row;

        .header-block {
          display: flex;
          flex-direction: row;

          .search-item {
            vertical-align: middle;
            display: inline-block;
            height: $label_height;
            line-height: $label_height;
            padding-right: 8px;
            min-width: 64px;
            color: grey;
            font-size: 16px;
            font-weight: 400;
          }
        }

        .phone-block {
          width: 200px;
        }

        .search-time {
          width: 440px;
        }
      }

      .header-line-right {
        min-width: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }

    .hr-diviser {
      border-top: solid #c8c8c8 1px;
      border-bottom: 0;
    }
  }
}
</style>
