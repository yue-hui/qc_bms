<template>
  <div class="gelei-content">
    <div class="content-body">
      <div class="total-data-area">
        <div class="title-area"><span class="title">整体数据</span></div>
        <div class="summary-items-area">
          <div :style="'background-color: ' + theme_color[0]" class="summary-item">
            <div class="item-info">
              <div class="item-value">{{ overall_data.pay_member_count }}</div>
              <div class="item-name">付费用户数</div>
            </div>
          </div>
          <div :style="'background-color: ' + theme_color[1]" class="summary-item">
            <div class="item-info">
              <div class="item-value">{{ overall_data.experience_member_count }}</div>
              <div class="item-name">体验用户数</div>
            </div>
          </div>
          <div :style="'background-color: ' + theme_color[1]" class="summary-item">
            <div class="item-info">
              <div class="item-value">{{ overall_data.telecom_count || '--' }}</div>
              <div class="item-name">电信付费用户数</div>
            </div>
          </div>
          <div :style="'background-color: ' + theme_color[2]" class="summary-item">
            <div class="item-info">
              <div class="item-value">{{ overall_data.due_soon_member_count }}</div>
              <div class="item-name">即将到期会员</div>
            </div>
          </div>
          <div :style="'background-color: ' + theme_color[3]" class="summary-item">
            <div class="item-info">
              <div class="item-value">{{ overall_data.order_count }}</div>
              <div class="item-name">订单成交量</div>
            </div>
          </div>
          <div :style="'background-color: ' + theme_color[4]" class="summary-item">
            <div class="item-info">
              <div class="item-value">¥{{ overall_data.order_amount }}</div>
              <div class="item-name">充值金额</div>
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
                    size="medium"
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
              <p class="item-subscribe">
                <span>
                  <span class="total-count">{{ growth_data.increase_bind_user }}</span>
                  <label class="item-label">总数</label>
                </span>
                <span>
                  <span class="total-count">{{ growth_data.increase_bind_ios_user }}</span>
                  <label class="item-label">苹果</label>
                </span>
                <span>
                  <span class="total-count">{{ growth_data.increase_bind_android_user }}</span>
                  <label class="item-label">安卓</label>
                </span>
              </p>
              <div class="diviser" />
              <p class="ratio-data">
                <span>
                  <span class="ratio-name">同比:</span>
                  <span
                    :class="{green: growth_data.increased_bind_user_comparison < 0, red: growth_data.increased_bind_user_comparison > 0, blue: growth_data.increased_bind_user_comparison === 0 }"
                    class="ratio-value">
                    {{ growth_data.increased_bind_user_comparison | abs }}%
                    <template v-if="growth_data.increased_bind_user_comparison > 0">↑</template>
                    <template v-else-if="growth_data.increased_bind_user_comparison === 0" />
                    <template v-else>↓</template>
                  </span>
                </span>
                <span>
                  <span class="ratio-name">转化率:</span>
                  <span
                    :class="{green: growth_data.increased_bind_user_conversion < 0, red: growth_data.increased_bind_user_conversion > 0, blue: growth_data.increased_bind_user_conversion === 0 }"
                    class="ratio-value">
                    {{ growth_data.increased_bind_user_conversion | abs }}%
                    <template v-if="growth_data.increased_bind_user_conversion > 0">↑</template>
                    <template v-else-if="growth_data.increased_bind_user_conversion === 0" />
                    <template v-else>↓</template>
                  </span>
                </span>
              </p>
            </div>
          </div>
          <div class="data-item">
            <div class="item-row item-title">新增付费用户</div>
            <div class="item-row item-data-section">
              <p class="item-subscribe">
                <span>
                  <span class="total-count">{{ growth_data.increased_pay_user }}</span>
                  <label class="item-label">总数</label>
                </span>
                <span>
                  <span class="total-count">{{ growth_data.increased_pay_ios_user }}</span>
                  <label class="item-label">IOS</label>
                </span>
                <span>
                  <span class="total-count">{{ growth_data.increased_pay_we_chat_user }}</span>
                  <label class="item-label">微信</label>
                </span>
                <span>
                  <span class="total-count">{{ growth_data.increased_pay_ali_user }}</span>
                  <label class="item-label">支付宝</label>
                </span>
                <span>
                  <span class="total-count">{{ growth_data.increased_pay_telecom_user }}</span>
                  <label class="item-label">电信</label>
                </span>
              </p>
              <div class="diviser" />
              <p class="ratio-data">
                <span>
                  <span class="ratio-name">同比:</span>
                  <span
                    :class="{green: growth_data.increased_pay_user_comparison < 0, red: growth_data.increased_pay_user_comparison > 0, blue: growth_data.increased_pay_user_comparison === 0 }"
                    class="ratio-value">
                    {{ growth_data.increased_pay_user_comparison | abs }}%
                    <template v-if="growth_data.increased_pay_user_comparison > 0">↑</template>
                    <template v-else-if="growth_data.increased_pay_user_comparison === 0" />
                    <template v-else>↓</template>
                  </span>
                </span>
                <span>
                  <span class="ratio-name">转化率:</span>
                  <span
                    :class="{green: growth_data.increased_pay_user_conversion < 0, red: growth_data.increased_pay_user_conversion > 0, blue: growth_data.increased_pay_user_conversion === 0 }"
                    class="ratio-value">
                    {{ growth_data.increased_pay_user_conversion | abs }}%
                    <template v-if="growth_data.increased_pay_user_conversion > 0">↑</template>
                    <template v-else-if="growth_data.increased_pay_user_conversion === 0" />
                    <template v-else>↓</template>
                  </span>
                </span>
              </p>
            </div>
          </div>
          <div class="data-item">
            <div class="item-row item-title">充值金额</div>
            <div class="item-row item-data-section">
              <div class="item-row-box">
                <div class="item-subscribe-line">
                  <div>
                    <label class="item-label">总数: </label>
                    <span class="total-count">
                      <template v-if="growth_data.order_amount">¥</template>
                      {{ growth_data.order_amount || '--' }}
                    </span>
                  </div>
                </div>
                <div class="item-subscribe-line">
                  <div>
                    <label class="item-label">微信: </label>
                    <span class="total-count">
                      <template v-if="growth_data.we_chat_order_amount">¥</template>
                      {{ growth_data.we_chat_order_amount || '--' }}
                    </span>
                  </div>
                  <div>
                    <label class="item-label">IOS: </label>
                    <span class="total-count">
                      <template v-if="growth_data.ios_order_amount">¥</template>
                      {{ growth_data.ios_order_amount || '--' }}
                    </span>
                  </div>
                </div>
                <div class="item-subscribe-line">
                  <div>
                    <label class="item-label">支付宝: </label>
                    <span class="total-count">
                      <template v-if="growth_data.ali_order_amount">¥</template>
                      {{ growth_data.ali_order_amount || '--' }}
                    </span>
                  </div>
                  <div>
                    <label class="item-label">电信: </label>
                    <span class="total-count">
                      <template v-if="growth_data.telecom_order_amount">¥</template>
                      {{ growth_data.telecom_order_amount || '--' }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="diviser" />
              <p class="ratio-data">
                <span>
                  <span class="ratio-name">同比:</span>
                  <span
                    :class="{green: growth_data.order_amount_comparison < 0, red: growth_data.order_amount_comparison > 0, blue: growth_data.order_amount_comparison === 0 }"
                    class="ratio-value">
                    {{ growth_data.order_amount_comparison | abs }}%
                    <template v-if="growth_data.order_amount_comparison > 0">↑</template>
                    <template v-else-if="growth_data.order_amount_comparison === 0" />
                    <template v-else>↓</template>
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="ratio-with-chart-area">
          <div class="data-item">
            <div class="item-row item-title">新增注册用户</div>
            <div class="item-row item-data-section">
              <p class="item-subscribe">
                <span>
                  <label class="item-label">总数: </label>
                  <span class="total-count">{{ growth_data.increased_user }}</span>
                </span>
                <span>
                  <span class="item-label">同比: </span>
                  <span
                    :class="{green: growth_data.increased_user_comparison < 0, red: growth_data.increased_user_comparison > 0, blue: growth_data.increased_user_comparison === 0 }"
                    class="ratio-value">
                    {{ growth_data.increased_user_comparison | abs }}%
                    <template v-if="growth_data.increased_user_comparison > 0">↑</template>
                    <template v-else-if="growth_data.increased_user_comparison === 0" />
                    <template v-else>↓</template>
                  </span>
                </span>
              </p>
            </div>
            <div class="item-row item-chart-area">
              <div class="chart">
                <ve-ring
                  :data="increased_user_data"
                  :legend-visible="true"
                  :extend="chart_extend"
                  :settings="chart_settings"
                  height="205px" />
              </div>
            </div>
          </div>
          <div class="data-item">
            <div class="item-row item-title">新增绑定设备及占比</div>
            <div class="item-row item-data-section">
              <p class="item-subscribe">
                <span>
                  <label class="item-label">总数: </label>
                  <span class="total-count">{{ growth_data.increased_bind_device }}</span>
                </span>
                <span>
                  <label class="item-label">同比: </label>
                  <span
                    :class="{green: growth_data.increased_bind_device_comparison < 0, red: growth_data.increased_bind_device_comparison > 0, blue: growth_data.increased_bind_device_comparison === 0 }"
                    class="ratio-value">
                    {{ growth_data.increased_bind_device_comparison | abs }}%
                    <template v-if="growth_data.increased_bind_device_comparison > 0">↑</template>
                    <template v-else-if="growth_data.increased_bind_device_comparison === 0" />
                    <template v-else>↓</template>
                  </span>
                </span>
              </p>
            </div>
            <div class="item-row item-chart-area">
              <div class="chart">
                <ve-ring
                  :data="device_ratio_data"
                  :legend-visible="true"
                  :extend="chart_extend"
                  :settings="chart_settings"
                  height="205px" />
              </div>
            </div>
          </div>
          <div class="data-item">
            <div class="item-row item-title">订单类型及支付渠道占比</div>
            <div class="item-row item-data-section">
              <p class="item-subscribe">
                <span>
                  <label class="item-label">总数: </label>
                  <span class="total-count">{{ growth_data.order_count }}</span>
                </span>
                <span>
                  <label class="item-label">同比: </label>
                  <span
                    :class="{green: growth_data.order_count_comparison < 0, red: growth_data.order_count_comparison > 0, blue: growth_data.order_count_comparison === 0 }"
                    class="ratio-value">
                    {{ growth_data.order_count_comparison | abs }}%
                    <template v-if="growth_data.order_count_comparison > 0">↑</template>
                    <template v-else-if="growth_data.order_count_comparison === 0" />
                    <template v-else>↓</template>
                  </span>
                </span>
              </p>
            </div>
            <div class="item-row item-chart-area">
              <div class="chart">
                <ve-pie
                  :data="order_radio_data"
                  :legend-visible="false"
                  :extend="order_chart_extend"
                  :settings="chart_settings_array"
                  height="205px" />
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
              <ve-histogram
                :ref="'chart' + line_chart_tab.name"
                :data="dimension_data"
                :extend="dimension_chart_extend"
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
import MultiProcess from '@/components/MultiProcess'
import { get_homepage_growth_data, get_homepage_overall_data } from '@/api/interactive'

const theme_color = ['#3EC0C6', '#FBB444', '#8596F1', '#D87FE2',
  '#FFA069', '#8d98b3', '#e5cf0d', '#97b552',
  '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1',
  '#588dd5', '#f5994e', '#c05050', '#59678c',
  '#c9ab00', '#7eb00a', '#6f5553', '#c14089']

const echart_colors = [
  '#338DE8', '#ED6060', '#EFAE3E', '#3CE5D5', '#92CC52'
]

export default {
  filters: {
    abs: function(value) {
      if (value === undefined) {
        return ''
      }
      return Math.abs(value)
    }
  },
  components: {
    MultiProcess
  },
  data() {
    const day = dayjs().subtract(1, 'days')
    const pre_week = dayjs().subtract(7, 'days')
    return {
      theme_color,
      increase_bind_items_list: [],
      increased_pay_items_list: [],
      order_amount_items_list: [],
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
        }
      },
      chart_settings_array: {
        hoverAnimation: false,
        radius: 70,
        label: {
          show: false
        },
        level: [
          ['普通会员', '高级会员'],
          ['IOS', '微信', '支付宝', '电信']
        ],
        offsetY: 180
      },
      chart_extend: {
        color: echart_colors,
        legend: {
          orient: 'vertical',
          icon: 'circle',
          x: '244',
          y: 'center',
          textStyle: {
            color: '#A0A0A0',
            fontSize: 12
          }
        },
        series: {
          type: 'pie',
          center: [90, '50%']
        }
      },
      order_chart_extend: {
        color: echart_colors,
        legend: {
          orient: 'vertical',
          icon: 'circle',
          x: '244',
          y: 'center',
          textStyle: {
            color: '#A0A0A0',
            fontSize: 12
          }
        },
        series: {
          type: 'pie',
          center: [90, '50%']
        }
      },
      dimension_chart_extend: {
        barMaxWidth: 30
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
          label: '电信充值金额',
          name: '3'
        },
        {
          label: '充值金额',
          name: '2'
        }
      ],
      line_chart_tabs_data: [{}, {}, {}, {}],
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
          this.growth_data.ali_order_amount = r.data.ali_order_amount.toFixed(2)
          this.growth_data.telecom_order_amount = r.data.telecom_order_amount.toFixed(2)
          // this.$message.success(r.message)
        } else {
          this.$message.error(r.message)
          this.growth_data = []
        }
      }).finally(() => {
        this.update_platform_ratio()
        this.update_chat_chart()
        this.update_line_chart()
      })
    },
    update_chat_chart() {
      const growth_data = this.growth_data
      if (Object.keys(growth_data).length) {
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
        // 订单类型及支付渠道占比
        const field_filter_list = ['IOS', '微信', '支付宝', '电信']
        const order_data = [
          {
            name: '普通会员',
            value: growth_data.vip_order_count
          },
          {
            name: '高级会员',
            value: growth_data.svip_order_count
          },
          {
            name: 'IOS',
            value: growth_data.ios_order_count
          },
          {
            name: '微信',
            value: growth_data.we_chat_order_count
          },
          {
            name: '支付宝',
            value: growth_data.ali_order_count
          },
          {
            name: '电信',
            value: growth_data.telecom_order_count
          }
        ]
        // 后台返回数据格式不正确，前端用数据填补
        field_filter_list.forEach(_c => {
          const _item = order_data.filter(r => r.name === _c)
          if (_item.length === 0) {
            order_data.push(
              {
                name: _c,
                value: 0
              }
            )
          }
        })
        this.order_radio_data = {
          columns: ['name', 'value'],
          rows: order_data
        }
        this.chart_settings_array.level[1] = field_filter_list
        this.order_chart_extend.legend = [
          {
            orient: 'vertical',
            icon: 'circle',
            x: '244',
            y: 'center',
            data: ['普通会员', '高级会员']
          },
          {
            orient: 'vertical',
            icon: 'circle',
            x: '350',
            y: 'center',
            data: field_filter_list
          }
        ]
      } else {
        this.increased_user_data = {
          columns: ['name', 'value'],
          center: ['50%', '50%'],
          rows: [
            { 'name': '家长端', 'value': growth_data.patriarch_count },
            { 'name': '孩子端', 'value': growth_data.child_count }
          ]
        }
        this.device_ratio_data = {}
        this.order_radio_data = {
          columns: ['name', 'value'],
          center: ['20%', '50%'],
          rows: [
            { 'name': '6个月会员', 'value': 0 },
            { 'name': '12个月会员', 'value': 0 },
            { 'name': '24个月会员', 'value': 0 },
            { 'name': 'IOS', 'value': 0 },
            { 'name': '安卓', 'value': 0 }
          ]
        }
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
        const telecom_order_amount_list_chart = {
          columns: ['date', 'amount'],
          rows: growth_data.telecom_order_amount_list || []
        }
        this.line_chart_tabs_data = [
          increased_pay_user_chart,
          order_count_list_chart,
          order_amount_list_chart,
          telecom_order_amount_list_chart]
      } else {
        this.line_chart_tabs_data = [{}, {}, {}, {}]
      }
      this.dimension_data = this.line_chart_tabs_data[+this.active_name]
    },
    update_platform_ratio() {
      const growth_data = this.growth_data
      const ios_color = '#2ec7c9'
      const and_color = '#b6a2de'
      // 新增绑定平台类型占比
      this.increase_bind_items_list = [
        {
          name: 'IOS',
          value: growth_data.increase_bind_android_user,
          color: ios_color
        },
        {
          name: '安卓',
          value: growth_data.increase_bind_ios_user,
          color: and_color
        }
      ]
      // 新增付费平台类型占比
      this.increased_pay_items_list = [
        {
          name: 'IOS',
          value: growth_data.increased_pay_ios_user,
          color: ios_color
        },
        {
          name: '安卓',
          value: growth_data.increased_pay_android_user,
          color: and_color
        }
      ]
      // 充值金额平台类型占比
      this.order_amount_items_list = [
        {
          name: 'IOS',
          value: growth_data.ios_order_amount,
          color: ios_color
        },
        {
          name: '安卓',
          value: growth_data.android_order_amount,
          color: and_color
        }
      ]
    },
    get_query() {
      const config = {}
      if (this.datetime_range) {
        config['begin_time'] = this.datetime_range[0].getTime()
        config['end_time'] = this.datetime_range[1].getTime()
      }
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
      } else if (active_name === '3') {
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
$border_radius_size: 5px;
$box_shadow_color: #3c3c3c;
$radio_fair_color: rgba(0, 0, 0, 0.71);
.gelei-content {
  width: 100%;
  height: 100%;
  /*min-height: 480px;*/
  padding: 20px 40px 36px 40px;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;

  .content-body {
    /*border: 1px solid #c7d5ee;*/
    height: 100%;
    min-height: 100px;
    min-width: 1260px;

    .total-data-area {
      width: 100%;
      padding: 23px 30px 48px 30px;
      display: flex;
      flex-direction: column;
      background: #FFFFFF;
      border: 1px solid #EAEAEA;
      border-radius: 5px;
      margin-bottom: 40px;

      .title-area {
        width: 100%;
        padding: 0 15px 15px 15px;

        .title {
          font-family: PingFangSC-Regular, 微软雅黑, serif;
          font-size: 20px;
          color: #454545;
        }
      }

      .summary-items-area {
        width: 100%;
        min-width: 1150px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px 15px 15px;
        user-select: none;

        .summary-item {
          width: 260px;
          height: 120px;
          border-radius: $border_radius_size;
          display: flex;
          flex-direction: row;
          padding: 22px 24px;
          flex-basis: calc((100% - 80px) / 6);

          .item-icon {
            font-size: 48px;
            color: #FFF;
            display: flex;
            align-items: center;
          }

          .item-info {
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
            color: white;
            text-align: left;

            .item-name {
              font-family: PingFangSC-Regular, 微软雅黑, serif;
              font-size: 16px;
              color: #FFFFFF;
            }

            .item-value {
              text-align: left;
              font-size: 36px;
              color: #FFFFFF;
              margin-bottom: 4px;
            }
          }
        }
      }
    }

    .search-area {
      padding: 29px 30px;
      background: #FFFFFF;
      border: 1px solid #EAEAEA;
      border-radius: 5px;
      height: 100px;
      margin-bottom: 40px;

      .row-bg {
        .col-bg {
          padding: 5px 0;

          &.col-right-button {
            text-align: right;
          }

          .order-number-list {
            height: 36px;
            line-height: 36px;
            white-space: nowrap;
            font-family: PingFangSC-Regular, 微软雅黑, serif;
            font-size: 16px;
            color: #454545;
          }
        }
      }
    }

    .data-comparison-area {
      width: 100%;
      margin-bottom: 30px;

      .new-user-and-amount-area {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 20px 0;

        .data-item {
          flex-basis: calc((100% - 40px) / 3);
          min-width: 380px;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          border: 1px solid #EAEAEA;
          border-radius: $border_radius_size;
          padding: 34px 35px 27px 32px;

          .item-title {
            border-top-left-radius: $border_radius_size;
            border-top-right-radius: $border_radius_size;
            user-select: none;
            font-family: PingFangSC-Regular, 微软雅黑, serif;
            font-size: 20px;
            color: #454545;
            height: 28px;
            line-height: 28px;
          }

          .item-data-section {
            display: flex;
            flex-direction: column;
            vertical-align: bottom;
            align-items: flex-end;
            margin-top: 21px;

            .item-subscribe {
              width: 100%;
              text-align: center;
              display: flex;
              align-items: center;
              flex-direction: row;
              justify-content: space-between;

              span {
                display: flex;
                flex-direction: column;

                .item-label {
                  font-family: PingFangSC-Regular, 微软雅黑, serif;
                  font-size: 14px;
                  color: #454545;
                }

                .item-number {
                  font-size: 12px;
                  font-weight: 200;
                }

                .total-count {
                  font-family: PingFangSC-Regular, 微软雅黑, serif;
                  font-size: 28px;
                  color: #454545;
                  margin-bottom: 10px;
                }

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

            .item-row-box {
              width: 100%;
              height: 58px;
              margin: 16px auto;

              .item-subscribe-line {
                width: 100%;
                position: relative;
                display: flex;
                flex-direction: row;

                div {
                  width: 50%;

                  .item-label {
                    font-family: PingFangSC-Regular, 微软雅黑, serif;
                    font-size: 12px;
                    color: #454545;
                    width: 46px;
                    display: inline-block;
                  }

                  .item-number {
                    font-size: 12px;
                    font-weight: 200;
                  }

                  .total-count {
                    padding-left: 7px;
                    font-family: PingFangSC-Regular, 微软雅黑, serif;
                    font-size: 14px;
                    color: #454545;
                    margin-bottom: 10px;
                  }

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
            }

            .diviser {
              height: 1px;
              background-color: #EAEAEA;
              width: 100%;
            }

            .ratio-data {
              width: 100%;
              display: flex;
              justify-content: space-between;

              .ratio-name {
                font-family: PingFangSC-Regular, 微软雅黑, serif;
                font-size: 14px;
                color: #454545;
              }

              .ratio-value {
                font-family: PingFangSC-Regular, 微软雅黑, serif;
                font-size: 20px;
                color: #000000;
                line-height: 20px;

                &.green {
                  color: #5EC821;
                }

                &.red {
                  color: #F14F4F;
                }

                &.blue {
                  color: #368EE0;
                }
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

      .ratio-with-chart-area {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 20px 0;

        .data-item {
          flex-basis: calc((100% - 40px) / 3);
          min-width: 380px;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          border-radius: $border_radius_size;
          background: #FFFFFF;
          border: 1px solid #EAEAEA;
          padding: 34px 35px 27px 32px;

          .item-title {
            height: 28px;
            line-height: 28px;
            font-family: PingFangSC-Regular, 微软雅黑, serif;
            font-size: 20px;
            color: #454545;
            margin-bottom: 33px;
          }

          .item-data-section {
            display: flex;
            flex-direction: row;
            vertical-align: bottom;
            align-items: flex-end;

            .item-subscribe {
              width: 100%;
              text-align: center;
              display: flex;
              align-items: center;
              flex-direction: row;
              height: 50px;
              margin: 0;

              span {
                flex: 1;
                text-align: left;
                height: 50px;
                line-height: 50px;

                .item-label {
                  font-family: PingFangSC-Regular, 微软雅黑, serif;
                  font-size: 14px;
                  color: #454545;
                  font-weight: 400;
                  vertical-align: bottom;
                }

                .ratio-value {
                  font-family: PingFangSC-Regular, 微软雅黑, serif;
                  font-size: 20px;
                  color: #000000;
                  line-height: 20px;

                  &.green {
                    color: #5EC821;
                  }

                  &.red {
                    color: #F14F4F;
                  }

                  &.blue {
                    color: #368EE0;
                  }
                }

                .total-count {
                  font-size: 36px;
                  font-weight: bolder;
                }
              }
            }

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
      width: 100%;
      min-height: 400px;

      .line-chart-area {
        height: 400px;
      }
    }
  }
}
</style>
