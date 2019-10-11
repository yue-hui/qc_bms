<template>
  <div class="content">
    <div class="content-body">
      <div class="total-data-area">
        <div class="title-area"><span class="title">整体数据</span></div>
        <div class="summary-items-area">
          <div :style="'background-color: ' + theme_color[0]" class="summary-item">
            <div class="item-icon">
              <svg-icon icon-class="payed_user" />
            </div>
            <div class="item-info">
              <div class="item-name">付费用户数</div>
              <div class="item-value">{{ overall_data.pay_member_count }}</div>
            </div>
          </div>
          <div :style="'background-color: ' + theme_color[1]" class="summary-item">
            <div class="item-icon">
              <svg-icon icon-class="experience" />
            </div>
            <div class="item-info">
              <div class="item-name">体验用户数</div>
              <div class="item-value">{{ overall_data.experience_member_count }}</div>
            </div>
          </div>
          <div :style="'background-color: ' + theme_color[2]" class="summary-item">
            <div class="item-icon">
              <svg-icon icon-class="expired_time" />
            </div>
            <div class="item-info">
              <div class="item-name">即将到期会员</div>
              <div class="item-value">{{ overall_data.due_soon_member_count }}</div>
            </div>
          </div>
          <div :style="'background-color: ' + theme_color[3]" class="summary-item">
            <div class="item-icon">
              <svg-icon icon-class="volume" />
            </div>
            <div class="item-info">
              <div class="item-name">订单成交量</div>
              <div class="item-value">{{ overall_data.order_count }}</div>
            </div>
          </div>
          <div :style="'background-color: ' + theme_color[4]" class="summary-item">
            <div class="item-icon">
              <svg-icon icon-class="recharge_amount" />
            </div>
            <div class="item-info">
              <div class="item-name">充值金额</div>
              <div class="item-value">{{ overall_data.order_amount }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="search-area">
        <el-row :gutter="10" class="row-bg">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4" class="col-bg">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="8" class="order-number-list">选择日期:</el-col>
                <el-col :span="16">
                  <el-date-picker
                    v-model="datetime_range"
                    clearable
                    end-placeholder="结束日期"
                    range-separator="至"
                    start-placeholder="开始日期"
                    type="daterange"
                    size="mini"
                    unlink-panels
                    @change="page_query" />
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="data-comparison-area">
        <div class="new-user-and-amount-area">
          <div class="data-item">
            <div class="item-row item-title">新增绑定用户</div>
            <div class="item-row item-data-section">
              <div class="item-data">{{ growth_data.increase_bind_user }}</div>
              <div class="item-data-compare">
                <span>同比</span>
                <svg-icon
                  v-if="growth_data.increased_bind_user_comparison < 0"
                  class="upper"
                  icon-class="upper_direction" />
                <svg-icon
                  v-else-if="growth_data.increased_bind_user_comparison === 0"
                  class="fair"
                  icon-class="fair_direction" />
                <svg-icon v-else class="down" icon-class="down_direction" />
                <span>{{ growth_data.increased_bind_user_comparison | abs }}%</span>
              </div>
            </div>
            <div class="item-row item-reminder">(转化率{{ growth_data.increased_bind_user_conversion }}%)</div>
          </div>
          <div class="data-item">
            <div class="item-row item-title">新增付费用户</div>
            <div class="item-row item-data-section">
              <div class="item-data">{{ growth_data.increased_pay_user }}</div>
              <div class="item-data-compare">
                <span>同比</span>
                <svg-icon
                  v-if="growth_data.increased_pay_user_comparison < 0"
                  class="upper"
                  icon-class="upper_direction" />
                <svg-icon
                  v-else-if="growth_data.increased_pay_user_comparison === 0"
                  class="fair"
                  icon-class="fair_direction" />
                <svg-icon
                  v-else
                  class="down"
                  icon-class="down_direction" />
                <span>{{ growth_data.increased_pay_user_comparison | abs }}%</span>
              </div>
            </div>
            <div class="item-row item-reminder">(转化率{{ growth_data.increased_pay_user_conversion }}%)</div>
          </div>
          <div class="data-item">
            <div class="item-row item-title">充值金额</div>
            <div class="item-row item-data-section">
              <div class="item-data">{{ growth_data.order_amount }}</div>
              <div class="item-data-compare">
                <span>同比</span>
                <svg-icon
                  v-if="growth_data.order_amount_comparison < 0"
                  class="upper"
                  icon-class="upper_direction" />
                <svg-icon
                  v-else-if="growth_data.order_amount_comparison === 0"
                  class="fair"
                  icon-class="fair_direction" />
                <svg-icon
                  v-else
                  class="down"
                  icon-class="down_direction" />
                <span>{{ growth_data.order_amount_comparison | abs }}%</span>
              </div>
            </div>
            <div class="item-row item-reminder">
              <span>-</span>
            </div>
          </div>
        </div>
        <div class="diviser-with-cmount-and-chart" />
        <div class="ratio-with-chart-area">
          <div class="data-item">
            <div class="item-row item-title">新增注册用户</div>
            <div class="item-row item-data-section">
              <div class="item-data">{{ growth_data.increased_user }}</div>
              <div class="item-data-compare">
                <span>同比</span>
                <svg-icon
                  v-if="growth_data.increased_user_comparison < 0"
                  class="upper"
                  icon-class="upper_direction" />
                <svg-icon
                  v-else-if="growth_data.increased_user_comparison === 0"
                  class="fair"
                  icon-class="fair_direction" />
                <svg-icon
                  v-else
                  class="down"
                  icon-class="down_direction" />
                <span>{{ growth_data.increased_user_comparison | abs }}%</span>
              </div>
            </div>
            <div class="item-row item-chart-area">
              <div class="chart">
                <ve-pie
                  :data="increased_user_data"
                  :legend-visible="true"
                  :extend="chart_extend"
                  :settings="chart_settings"
                  height="240px" />
              </div>
            </div>
          </div>
          <div class="data-item">
            <div class="item-row item-title">新增绑定设备及占比</div>
            <div class="item-row item-data-section">
              <div class="item-data">{{ growth_data.increased_bind_device }}</div>
              <div class="item-data-compare">
                <span>同比</span>
                <svg-icon
                  v-if="growth_data.increased_bind_device_comparison < 0"
                  class="upper"
                  icon-class="upper_direction" />
                <svg-icon
                  v-else-if="growth_data.increased_bind_device_comparison === 0"
                  class="fair"
                  icon-class="fair_direction" />
                <svg-icon
                  v-else
                  class="down"
                  icon-class="down_direction" />
                <span>{{ growth_data.increased_bind_device_comparison | abs }}%</span>
              </div>
            </div>
            <div class="item-row item-chart-area">
              <div class="chart">
                <ve-pie
                  :data="device_ratio_data"
                  :legend-visible="true"
                  :extend="chart_extend"
                  :settings="chart_settings"
                  height="240px" />
              </div>
            </div>
          </div>
          <div class="data-item">
            <div class="item-row item-title">订单成交量及占比</div>
            <div class="item-row item-data-section">
              <div class="item-data">{{ growth_data.order_count }}</div>
              <div class="item-data-compare">
                <span>同比</span>
                <svg-icon
                  v-if="growth_data.order_count_comparison < 0"
                  class="upper"
                  icon-class="upper_direction" />
                <svg-icon
                  v-else-if="growth_data.order_count_comparison === 0"
                  class="fair"
                  icon-class="fair_direction" />
                <svg-icon v-else class="down" icon-class="down_direction" />
                <span>{{ growth_data.order_count_comparison | abs }}%</span>
              </div>
            </div>
            <div class="item-row item-chart-area">
              <div class="chart">
                <ve-pie
                  :data="order_radio_data"
                  :legend-visible="true"
                  :extend="chart_extend"
                  :settings="chart_settings"
                  height="240px" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="data-line-chart-area">
        <el-tabs
          v-model="active_name"
          type="border-card"
          @tab-click="tab_change">
          <el-tab-pane
            v-for="(line_chart_tab, index) in line_chart_tabs"
            :key="index"
            :name="line_chart_tab.name"
            :label="line_chart_tab.label">
            <div class="line-chart-area">
              <ve-line
                :ref="'chart' + line_chart_tab.name"
                :data="dimension_data"
                :settings="chart_settings"
                class="line-chart-style" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { get_homepage_growth_data, get_homepage_overall_data } from '@/api/interactive'

const theme_color = ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980',
  '#d87a80', '#8d98b3', '#e5cf0d', '#97b552',
  '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1',
  '#588dd5', '#f5994e', '#c05050', '#59678c',
  '#c9ab00', '#7eb00a', '#6f5553', '#c14089']

export default {
  components: {},
  filters: {
    abs: function(value) {
      if (value === undefined) {
        return ''
      }
      return Math.abs(value)
    }
  },
  data() {
    this.colors = theme_color
    const day = dayjs().subtract(1, 'days')
    const pre_week = dayjs().subtract(7, 'days')
    return {
      theme_color,
      datetime_range: [new Date(pre_week), new Date(day)],
      query_sets: {},
      overall_data: {
        pay_member_count: '-',
        experience_member_count: '-',
        due_soon_member_count: '-',
        order_count: '-',
        order_amount: '-'
      },
      growth_data: {},
      chart_settings: {
        hoverAnimation: false,
        labelMap: {
          date: '日期',
          count: '用户数量',
          amount: '充值金额'
        },
        radius: 80,
        offsetY: 120,
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        },
        series: {
          center: ['20%', '50%']
        }
      },
      chart_extend: {
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'center',
          textStyle: {
            color: '#A0A0A0',
            fontSize: 12
          }
        }
      },
      increased_user_data: {},
      device_ratio_data: {},
      order_radio_data: {},
      line_chart_tabs: [
        {
          label: '新增付费用户',
          name: '0'
        },
        {
          label: '订单成交量',
          name: '1'
        },
        {
          label: '充值金额',
          name: '2'
        }
      ],
      line_chart_tabs_data: [
        [],
        [],
        []
      ],
      active_name: '0',
      dimension_data: {}
    }
  },
  computed: {},
  watch: {
    active_name: {
      handler(v) {
        if (v !== '') {
          this.$nextTick(_ => {
            this.$refs[`chart${v}`][0].echarts.resize()
          })
        }
      },
      immediate: true
    }
  },
  mounted: function() {
    this.fetch_page_data()
  },
  methods: {
    fetch_page_data() {
      this.fetch_overall_data()
      this.fetch_growth_data()
    },
    fetch_overall_data() {
      get_homepage_overall_data().then(r => {
        if (r.status === 0) {
          this.overall_data = r.data
          // this.$message.success(r.message)
        } else {
          this.$message.error(r.message)
        }
      })
    },
    fetch_growth_data() {
      const config = this.get_query()
      get_homepage_growth_data(config).then(r => {
        if (r.status === 0) {
          this.growth_data = r.data
          // this.$message.success(r.message)
        } else {
          this.$message.error(r.message)
          this.growth_data = []
        }
      }).finally(() => {
        this.update_chat_chart()
        this.update_line_chart()
      })
    },
    update_chat_chart() {
      const growth_data = this.growth_data
      if (growth_data.length) {
        // 新增注册用户
        this.increased_user_data = {
          columns: ['name', 'value'],
          center: ['50%', '50%'],
          rows: [
            { 'name': '家长端', 'value': growth_data.patriarch_count },
            { 'name': '孩子端', 'value': growth_data.child_count }
          ]
        }
        // 新增绑定设备及占比
        const device_data = growth_data.increased_bind_device_list.map(r => {
          return {
            name: r.name,
            value: r.count
          }
        })
        this.device_ratio_data = {
          columns: ['name', 'value'],
          rows: device_data
        }
        // 订单成交量及占比
        const order_data = growth_data.member_order_count_list.map(r => {
          return {
            name: r.name,
            value: r.count
          }
        })
        this.order_radio_data = {
          columns: ['name', 'value'],
          rows: order_data
        }
      } else {
        this.increased_user_data = {}
        this.device_ratio_data = {}
        this.order_radio_data = {}
      }
    },
    update_line_chart() {
      const growth_data = this.growth_data
      if (Object.keys(growth_data).length) {
        const increased_pay_user_chart = {
          columns: ['date', 'count'],
          rows: growth_data.increased_pay_user_list
        }
        const order_count_list_chart = {
          columns: ['date', 'count'],
          rows: growth_data.order_count_list
        }
        const order_amount_list_chart = {
          columns: ['date', 'amount'],
          rows: growth_data.order_amount_list
        }
        this.line_chart_tabs_data = [
          increased_pay_user_chart,
          order_count_list_chart,
          order_amount_list_chart]
      } else {
        this.line_chart_tabs_data = [{}, {}, {}]
      }
      this.dimension_data = this.line_chart_tabs_data[+this.active_name]
    },
    get_query() {
      const config = {}
      config['begin_time'] = this.datetime_range[0].getTime()
      config['end_time'] = this.datetime_range[1].getTime()
      return config
    },
    page_query() {
      this.fetch_growth_data()
    },
    tab_change(obj) {
      const active_name = obj.name
      if (active_name === '0') {
        this.chart_settings['labelMap'] = {
          date: '日期',
          count: '用户数量'
        }
      } else if (active_name === '1') {
        this.chart_settings['labelMap'] = {
          date: '日期',
          count: '成交量'
        }
      } else if (active_name === '2') {
        this.chart_settings['labelMap'] = {
          date: '日期',
          amount: '充值金额'
        }
      }
      this.dimension_data = this.line_chart_tabs_data[+active_name]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$border_line_color: #c7d5ee;
$border_radius_size: 10px;
$box_shadow_color: #3c3c3c;
$radio_fair_color: rgba(0, 0, 0, 0.71);
.content {
  width: 100%;
  height: 100%;
  /*min-height: 480px;*/
  padding: 20px 10px 25px 10px;
  display: flex;
  flex-direction: column;
  background-color: #f8f6e7;

  .content-body {
    border: 1px solid #c7d5ee;
    height: 100%;
    min-height: 100px;
    min-width: 1260px;

    .total-data-area {
      width: 100%;
      padding: 15px 0;
      display: flex;
      flex-direction: column;

      .title-area {
        width: 100%;
        padding: 0 15px 15px 15px;

        .title {
          font-size: 16px;
          font-weight: 600;
        }
      }

      .summary-items-area {
        width: 100%;
        min-width: 1150px;
        display: flex;
        flex-direction: row;
        align-item: center;
        justify-content: space-between;
        padding: 0 15px 15px 15px;
        user-select: none;

        .summary-item-area {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .summary-item {
          width: 210px;
          height: 80px;
          border-radius: $border_radius_size;
          display: flex;
          flex-direction: row;
          padding: 10px;
          box-shadow: 2px 2px 10px $box_shadow_color;

          .item-icon {
            font-size: 48px;
            color: #FFF;
            display: flex;
            align-items: center;
          }

          .item-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;

            .item-name {
              font-weight: 600;
              font-size: 16px;
              text-align: right;
              padding: 5px 10px;
            }

            .item-value {
              font-size: 28px;
              text-align: right;
              padding: 5px 10px;
            }
          }
        }
      }
    }

    .search-area {
      padding: 20px 20px 0 20px;

      .row-bg {
        .col-bg {
          padding: 5px 0;

          &.col-right-button {
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
    }

    .data-comparison-area {
      width: 100%;

      .new-user-and-amount-area {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 15px 15px 15px;
        margin: 20px 0;

        .data-item {
          min-width: 400px;
          min-height: 120px;
          border: 1px solid rgba(128, 128, 128, 0.52);
          display: flex;
          flex-direction: column;
          border-radius: $border_radius_size;
          /*box-shadow:0px -2px 6px $box_shadow_color;
          padding: 15px 10px;*/

          .item-row {
            flex: 1;
            padding: 10px 15px;
          }

          .item-title {
            font-size: 16px;
            font-weight: 600;
            border-bottom: 1px solid $border_line_color;
            border-top-left-radius: $border_radius_size;
            border-top-right-radius: $border_radius_size;
            user-select: none;
          }

          .item-data-section {
            display: flex;
            flex-direction: row;
            vertical-align: bottom;
            align-items: flex-end;
            padding: 20px 15px;

            .item-data {
              font-size: 28px;
              font-weight: 600;
              padding-right: 20px;
            }

            .item-data-compare {
              font-size: 12px;

              .upper {
                color: green;
              }

              .fair {
                color: $radio_fair_color;
              }

              .down {
                color: red;
              }
            }
          }

          .item-reminder {
            font-size: 12px;

            span {
              opacity: 0;
            }
          }
        }
      }

      .diviser-with-cmount-and-chart {
        height: 1px;
        width: 100%;
        margin: 20px 0;
        background-color: $border_line_color;
      }

      .ratio-with-chart-area {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 15px 15px 15px;
        margin: 20px 0;

        .data-item {
          min-width: 400px;
          min-height: 120px;
          border: 1px solid rgba(128, 128, 128, 0.52);
          display: flex;
          flex-direction: column;
          border-radius: $border_radius_size;

          .item-row {
            padding: 10px 15px;
          }

          .item-title {
            height: 40px;
            font-size: 16px;
            font-weight: 600;
            border-bottom: 1px solid $border_line_color;
          }

          .item-data-section {
            display: flex;
            flex-direction: row;
            vertical-align: bottom;
            align-items: flex-end;

            .item-data {
              font-size: 28px;
              font-weight: 600;
              padding-right: 20px;
            }

            .item-data-compare {
              font-size: 12px;

              .upper {
                color: green;
              }

              .fair {
                color: $radio_fair_color;
              }

              .down {
                color: red;
              }
            }
          }

          .item-chart-area {
            flex: 1;
            display: flex;
            flex-direction: row;

            .chart {
              width: 100%;
            }
          }
        }
      }
    }

    .data-line-chart-area {
      padding: 0 15px 20px 15px;
      width: 100%;
      min-height: 400px;

      .line-chart-area {
        height: 400px;
      }
    }
  }
}
</style>
