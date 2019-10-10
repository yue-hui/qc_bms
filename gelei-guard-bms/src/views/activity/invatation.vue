<template>
  <div class="content">
    <div class="content-body">
      <div class="search-area">
        <div class="invatation-title">
          <span class="title">邀请好友活动数据</span>
        </div>
        <div class="invatation-pannel">
          <div class="items">
            <div class="item">
              <div class="left blue">
                <svg-icon class="svg-icon uv" icon-class="uv" />
              </div>
              <div class="right">
                <span class="item-data">{{ invatation.total_count || '-' }}</span>
                <span class="item-label">邀请页UV</span>
              </div>
            </div>
            <div class="item">
              <div class="left orange">
                <svg-icon class="svg-icon share-people" icon-class="share_people" />
              </div>
              <div class="right">
                <span class="item-data">{{ invatation.total_count || '-' }}</span>
                <span class="item-label">分享人数</span>
              </div>
            </div>
            <div class="item">
              <div class="left red">
                <svg-icon class="svg-icon invatated-people" icon-class="invatated_people" />
              </div>
              <div class="right">
                <span class="item-data">{{ invatation.total_count || '-' }}</span>
                <span class="item-label">被邀请页UV</span>
              </div>
            </div>
            <div class="item">
              <div class="left green">
                <svg-icon class="svg-icon register-people" icon-class="register_people" />
              </div>
              <div class="right">
                <span class="item-data">{{ invatation.total_register_count || '-' }}</span>
                <span class="item-label">注册人数</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="between-search-area-and-table-display" />

      <div class="invatation-data-list">
        <div class="invatation-user-title">
          <span class="title">活动参与用户</span>
          <div class="tools-area">
            <el-button
              :loading="download_loading"
              class="download details-tab"
              size="mini"
              type="success"
              @click="download">导出
              <svg-icon icon-class="download" />
            </el-button>
          </div>
        </div>
        <div class="table-content table-block">
          <el-table
            :data="invatation_list"
            size="mini"
            style="width: 100%">
            <el-table-column
              align="center"
              label="序号"
              prop="_id"
              width="80" />
            <el-table-column
              align="center"
              label="用户昵称"
              prop="nick_name" />
            <el-table-column
              align="center"
              label="用户手机号"
              prop="phone" />
            <el-table-column
              align="center"
              label="注册成功人数"
              prop="register_count" />
            <el-table-column
              align="center"
              label="奖励会员天数"
              prop="member_days" />
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
  </div>
</template>

<script>
import { DATE_FORMAT, DATE_TIME_FORMAT, OPERATORS_ACTIVITY_TYPES, TABLE_PAGE_SIEZS_LIST } from '@/utils/constant'
import { get_invite_statisis_data } from '@/api/interactive'
import { getPagenationSize, setPagenationSize } from '@/utils/auth'
import { date_formatter, get_grade_label_map, get_sex_label } from '@/utils/common'

export default {
  components: {},
  data() {
    const activities = OPERATORS_ACTIVITY_TYPES
    const page_size = getPagenationSize()
    return {
      download_loading: false,
      activities,
      invatation: {
        total_register_count: ''
      },
      invatation_list: [],
      page: 1,
      page_size,
      page_sizes: TABLE_PAGE_SIEZS_LIST,
      total: 0
    }
  },
  computed: {},
  mounted: function() {
    this.reload_page()
  },
  methods: {
    reload_page: function() {
      const config = this.get_params()
      get_invite_statisis_data(config).then(res => {
        if (res.status === 0) {
          this.invatation_list = res.data.map((_c, _i) => {
            return {
              ..._c,
              _id: _i + 1
            }
          })
          this.total = res.total_count
          this.invatation.total_register_count = res.total_register_count
        } else {
          this.$message.error(res.message)
        }
      })
    },
    change_current: function(page) {
      this.page = page
      this.reload_page()
    },
    table_size_change: function(size) {
      this.page_size = size
      setPagenationSize(size)
      this.reload_page()
    },
    get_config: function() {
      return {
        page_no: this.page,
        page_num: this.page_size
      }
    },
    get_params: function() {
      const config = this.get_config()
      return config
    },
    download() {
      this.download_loading = true
      const config = this.get_params()
      delete config.page_no
      delete config.page_num
      config['page_no'] = 1
      config['page_num'] = this.total
      get_invite_statisis_data(config).then(res => {
        if (res.status === 0) {
          const remote_data = res.data
          this.export_excel(remote_data)
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.download_loading = false
      })
    },
    formatJson(filterVal, jsonData) {
      const convert_date_time_fields = [
        'create_time', 'begin_time', 'end_time'
      ]
      const convert_date_fields = [
        'child_birthdate'
      ]
      const convert_sex_fields = [
        'sex'
      ]
      const convert_grade_fields = [
        'grade'
      ]
      const grade_map = get_grade_label_map()
      return jsonData.map(v => filterVal.map(j => {
        if (convert_date_time_fields.indexOf(j) !== -1) {
          return date_formatter(v[j], DATE_TIME_FORMAT, false)
        } else if (convert_date_fields.indexOf(j) !== -1) {
          return date_formatter(v[j], DATE_FORMAT, false)
        } else if (convert_grade_fields.indexOf(j) !== -1) {
          return grade_map[v[j]]
        } else if (convert_sex_fields.indexOf(j) !== -1) {
          return get_sex_label(v[j])
        } else {
          return v[j]
        }
      }))
    },
    export_excel(data_list) {
      const filename = '活动参与用户'
      import('@/utils/Export2Excel').then(excel => {
        const t_header = ['用户昵称', '用户手机号', '注册成功人数', '奖励会员天数']
        // filter_val 必须为存在的字段，且filter_val的长度要小于t_header的长度
        const filter_val = ['nick_name', 'phone', 'register_count', 'member_days']
        const data = this.formatJson(filter_val, data_list)
        const options = {
          header: t_header,
          data,
          filename,
          autoWidth: true,
          bookType: 'xlsx'
        }
        excel.export_json_to_excel(options)
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
    border: 1px solid #c7d5ee;
    height: 100%;
    min-height: 400px;

    .search-area {
      /*padding: 20px 20px 0 20px;*/

      .invatation-title {
        width: 100%;
        height: 32px;
        line-height: 32px;
        vertical-align: center;
        padding-left: 10px;
        background-color: #304156;
        color: #FFFFFF;

        .title {
          font-size: 16px;
          font-weight: bolder;
        }
      }

      .invatation-pannel {
        min-height: 140px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 30px;

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
            }
          }
        }

        .items {
          display: flex;
          width: 100%;
          flex-direction: row;
          justify-content: space-between;

          .item {
            width: 300px;
            height: 82px;
            position: relative;
            display: flex;
            flex-direction: row;
            border: 1px solid #dfdfdf;

            .left {
              width: 80px;
              height: 80px;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              border-right: 1px solid #dfdfdf;

              &.blue {
                background-color: #57c8f2;
              }

              &.white {
                background-color: #fff;
              }

              &.orange {
                background-color: #fcd12c;
              }

              &.red {
                background-color: #ff886d;
              }

              &.green {
                background-color: #6ccac9;
              }

              .svg-icon {
                font-size: 48px;

                &.uv {
                  color: white;
                }

                &.share-people {
                  color: #00c250;
                }

                &.invatated-people {
                  color: white;
                }

                &.register-people {
                  color: white;
                }
              }
            }

            .right {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background-color: white;

              .item-data {
                color: #595959;
                font-size: 24px;
              }

              .item-label {
                color: #ababab;
                font-size: 14px;
                height: 20px;
                line-height: 20px;
              }
            }
          }
        }
      }
    }

    .between-search-area-and-table-display {
      height: 10px;
      /*margin: 10px 20px 15px 20px;*/
      /*background-color: #D0D0D7;*/
    }

    .invatation-data-list {
      width: 100%;

      .invatation-user-title {
        width: 100%;
        height: 32px;
        line-height: 32px;
        vertical-align: center;
        padding-left: 10px;
        background-color: #304156;
        color: #FFFFFF;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .title {
          font-size: 16px;
          font-weight: bolder;
        }

        .tools-area {
          padding-right: 10px;

          .details-tab {
            border: 0;
          }
        }
      }

      .table-block {
        /deep/ thead tr th {
          background-color: #fffde7;
          color: #4c4c4c;
        }
      }
    }
  }
}
</style>
