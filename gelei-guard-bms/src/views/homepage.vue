<template>
  <div class="gelei-content" style="overflow-x: auto">
    <div class="content-body">
      <div class="card-box" style="margin-bottom: 30px">
        <div class="total-data-area">
          <div class="title-area">
            <span class="title">整体数据</span>
            <el-popover
              placement="top-start"
              title=""
              width="500"
              trigger="hover"
              content="">
              <div class="item-list tips-dialog-custom-class">
                <h3>整体数据说明</h3>
                <div v-for="item in tipsDialog.list" :key="item.label" class="item">
                  <span class="label">{{ item.label }}：</span>
                  <span class="content">{{ item.content }}</span>
                </div>
              </div>
              <span slot="reference" class="title-tips">？</span>
            </el-popover>
            <div class="time" v-if="picker_time_show">
               截止 ： 
                <el-date-picker
                   v-model="picker_time"
                   type="date"
                   value-format="yyyy-MM-dd"
                   @change="pickertimeChange"
                   placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="title-area-img"  :class="picker_time_show?'active':''" @click="setPickerTimeShow"><i class="el-icon-arrow-right"></i></div>
          </div>
         <!-- 整体数据 -->
         <transition name='pickTime'>
          <div  v-if="picker_time_show">
           <div class="summary-items-area">
            <div :style="'background-color: ' + theme_color[0]" :class="{ 'summary-items-active': overallDataDetailIndex === 0 }" class="summary-item" @click="parseOverallDataDetail(0)">
              <div class="item-info">
                <div class="item-value">{{ overallData.payUser.count }}</div>
                <div class="item-name">付费会员数</div>
              </div>
            </div>
            <div :style="'background-color: ' + theme_color[1]" :class="{ 'summary-items-active': overallDataDetailIndex === 1 }" class="summary-item" @click="parseOverallDataDetail(1)">
              <div class="item-info">
                <div class="item-value">{{ overallData.order.count }}</div>
                <div class="item-name">订单成交量</div>
              </div>
            </div>
            <div :style="'background-color: ' + theme_color[3]" :class="{ 'summary-items-active': overallDataDetailIndex === 3 }" class="summary-item" @click="parseOverallDataDetail(3)">
              <div class="item-info">
                <div class="item-value">{{ overallData.register.count }}</div>
                <div class="item-name">注册用户总数</div>
              </div>
            </div>
            <div :style="'background-color: ' + theme_color[2]" :class="{ 'summary-items-active': overallDataDetailIndex === 2 }" class="summary-item" @click="parseOverallDataDetail(2)">
              <div class="item-info">
                <div class="item-value">{{ overallData.bind.count }}</div>
                <div class="item-name">累计绑定设备</div>
              </div>
            </div>
            <div :style="'background-color: ' + theme_color[4]" :class="{ 'summary-items-active': overallDataDetailIndex === 4 }" class="summary-item" @click="parseOverallDataDetail(4)">
              <div class="item-info">
                <div class="item-value">¥{{ overallData.amount.count }}</div>
                <div class="item-name">充值到账金额</div>
              </div>
            </div>
          </div>
          <div style="width: 100%">
            <ve-histogram
              :extend="overallDataChartExtend"
              :legend-visible="false"
              :colors="overallDataChartColor"
              :data="overallDataChartData"/>
          </div>
          </div>
          </transition>
         <!-- 整体数据 -->
        </div>
      </div>
      <div class="card-box">
        <div class="title-area">
          <span class="title">关键数据</span>
          <el-popover
            placement="top-start"
            title=""
            width="500"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <div class="item-list tips-dialog-custom-class">
              <h3>关键数据说明</h3>
              <div v-for="item in tipsDialog.list2" :key="item.label" class="item">
                <span class="label">{{ item.label }}：</span>
                <span class="content">{{ item.content }}</span>
              </div>
            </div>
            <span slot="reference" class="title-tips">？</span>
          </el-popover>
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
                      :picker-options="pickerOptions"
                      clearable
                      end-placeholder="结束日期"
                      range-separator="至"
                      start-placeholder="开始日期"
                      type="daterange"
                      size="medium"
                      unlink-panels
                      @change="dateTimeChange" />
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="data-comparison-area">
          <div class="new-user-and-amount-area" style="background: #f9f9f9; padding: 20px;position: relative;padding-top: 50px;">
            <div style="position: absolute;top: 0;margin-top: 14px;font-size: 18px;font-weight: bold;opacity: .7">
              <span>付费用户看板</span>
            </div>
            <div class="new-user-and-amount-area-2">
              <!-- 付费用户总数 ------------------------------------ -->
              <div style="margin-right: 10px;" class="data-item">
                <div class="item-row item-title">付费用户总数</div>
                <div class="item-row item-data-section">
                  <p class="item-subscribe">
                    <span>
                      <span class="total-count">{{ payUser.count }}</span>
                      <label class="item-label">总数</label>
                    </span>
                  </p>
                  <div class="diviser" />
                  <p class="ratio-data">
                    <span v-if="isShowComparison">
                      <span class="ratio-name">较上一周:</span>
                      <span
                        :class="{green: payUser.comparison < 0, red: payUser.comparison > 0, blue: payUser.comparison === 0 }"
                        class="ratio-value">
                        {{ payUser.comparison | abs }}%
                        <template v-if="payUser.comparison > 0">↑</template>
                        <template v-else-if="payUser.comparison === 0" />
                        <template v-else>↓</template>
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              <div class="data-item-line" />
              <!-- 新增付费用户 ------------------------------------ -->
              <div style="margin-right: 10px;width: 50%" class="data-item">
                <div class="item-row item-title">新增付费用户</div>
                <div class="item-row item-data-section">
                  <p class="item-subscribe">
                    <span>
                      <span class="total-count">{{ increasedPayUserType.count }}</span>
                      <label class="item-label">总数</label>
                    </span>
                    <span>
                      <span class="total-count">{{ increasedPayUserType.app }}</span>
                      <label class="item-label">APP新增</label>
                    </span>
                    <span>
                      <span class="total-count">{{ increasedPayUserType.ctcc }}</span>
                      <label class="item-label">电信新增</label>
                    </span>
                  </p>
                  <div class="diviser" />
                  <p class="ratio-data">
                    <span v-if="isShowComparison">
                      <span class="ratio-name">较上一周:</span>
                      <span
                        :class="{green: increasedPayUserType.comparison < 0, red: increasedPayUserType.comparison > 0, blue: increasedPayUserType.comparison === 0 }"
                        class="ratio-value">
                        {{ increasedPayUserType.comparison | abs }}%
                        <template v-if="increasedPayUserType.comparison > 0">↑</template>
                        <template v-else-if="increasedPayUserType.comparison === 0" />
                        <template v-else>↓</template>
                      </span>
                    </span>
                    <span>
                      <span class="ratio-name">转化率:</span>
                      <span
                        :class="{green: increasedPayUserType.conversion < 0, red: increasedPayUserType.conversion > 0, blue: increasedPayUserType.conversion === 0 }"
                        class="ratio-value">
                        {{ increasedPayUserType.conversion | abs }}%
                        <template v-if="increasedPayUserType.conversion > 0">↑</template>
                        <template v-else-if="increasedPayUserType.conversion === 0" />
                        <template v-else>↓</template>
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              <div class="data-item-line" />
              <!-- 复购付费用户 ------------------------------------ -->
              <div style="width: 50%" class="data-item">
                <div class="item-row item-title">复购付费用户</div>
                <div class="item-row item-data-section">
                  <p class="item-subscribe">
                    <span>
                      <span class="total-count">{{ repurchaseUser.count }}</span>
                      <label class="item-label">总数</label>
                    </span>
                    <span>
                      <span class="total-count">{{ repurchaseUser.app }}</span>
                      <label class="item-label">APP复购</label>
                    </span>
                    <span>
                      <span class="total-count">{{ repurchaseUser.ctcc }}</span>
                      <label class="item-label">电信复购</label>
                    </span>
                  </p>
                  <div class="diviser" />
                  <p class="ratio-data">
                    <span v-if="isShowComparison">
                      <span class="ratio-name">较上一周:</span>
                      <span
                        :class="{green: repurchaseUser.comparison < 0, red: repurchaseUser.comparison > 0, blue: repurchaseUser.comparison === 0 }"
                        class="ratio-value">
                        {{ repurchaseUser.comparison | abs }}%
                        <template v-if="repurchaseUser.comparison > 0">↑</template>
                        <template v-else-if="repurchaseUser.comparison === 0" />
                        <template v-else>↓</template>
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="new-user-and-amount-area-3">
              <!-- 充值金额 -->
              <div class="data-item">
                <div class="item-row item-title">充值到账金额</div>
                <div class="item-row item-data-section">
                  <div class="item-row-box order-amount-2">
                    <div class="item-subscribe-line">
                      <div >
                        <label class="item-label">总数: </label>
                        <span class="total-count" style="font-size: 20px">
                          {{ orderAmount2.count }}
                        </span>
                      </div>
                    </div>
                    <div class="item-subscribe-line">
                      <div >
                        <label class="item-label">微信: </label>
                        <span class="total-count">
                          {{ orderAmount2.wechat }}
                        </span>
                      </div>
                      <div >
                        <label class="item-label">IOS: </label>
                        <span class="total-count">
                          {{ orderAmount2.ios }}
                        </span>
                      </div>
                    </div>
                    <div class="item-subscribe-line">
                      <div >
                        <label class="item-label">支付宝: </label>
                        <span class="total-count">
                          {{ orderAmount2.aliPay }}
                        </span>
                      </div>
                      <div >
                        <label class="item-label">电信: </label>
                        <span class="total-count">
                          {{ orderAmount2.ctcc }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="diviser" />
                  <p class="ratio-data">
                    <span v-if="isShowComparison">
                      <span class="ratio-name">较上一周:</span>
                      <span
                        :class="{green: orderAmount2.comparison < 0, red: orderAmount2.comparison > 0, blue: orderAmount2.comparison === 0 }"
                        class="ratio-value">
                        {{ orderAmount2.comparison | abs }}%
                        <template v-if="orderAmount2.comparison > 0">↑</template>
                        <template v-else-if="orderAmount2.comparison === 0" />
                        <template v-else>↓</template>
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="new-user-and-amount-area" style="background: #f9f9f9; padding: 20px;position: relative;padding-top: 50px;">
            <div style="position: absolute;top: 0;margin-top: 14px;font-size: 18px;font-weight: bold;opacity: .7">
              <span>会员订单看板</span>
            </div>
            <!-- 订单总数 -->
            <div class="data-item" style="border: 0;margin-right: 10px">
              <div class="item-row item-title">订单总数</div>
              <div class="item-row item-data-section">
                <p class="item-subscribe">
                  <span>
                    <span class="total-count">{{ orderCountData.count }}</span>
                    <label class="item-label">总数</label>
                  </span>
                  <span>
                    <span class="total-count">{{ newOrderCountData.ios + reOrderCountData.ios }}</span>
                    <label class="item-label">IOS</label>
                  </span>
                  <span>
                    <span class="total-count">{{ newOrderCountData.wechat + reOrderCountData.wechat }}</span>
                    <label class="item-label">微信</label>
                  </span>
                  <span>
                    <span class="total-count">{{ newOrderCountData.aliPay + reOrderCountData.aliPay }}</span>
                    <label class="item-label">支付宝</label>
                  </span>
                  <span>
                    <span class="total-count">{{ newOrderCountData.ctcc + reOrderCountData.ctcc }}</span>
                    <label class="item-label">电信</label>
                  </span>
                </p>
                <div class="diviser" />
                <p class="ratio-data">
                  <span v-if="isShowComparison">
                    <span class="ratio-name">较上一周:</span>
                    <span
                      :class="{green: orderCountData.comparison < 0, red: orderCountData.comparison > 0, blue: orderCountData.comparison === 0 }"
                      class="ratio-value">
                      {{ orderCountData.comparison | abs }}%
                      <template v-if="orderCountData.comparison > 0">↑</template>
                      <template v-else-if="orderCountData.comparison === 0" />
                      <template v-else>↓</template>
                    </span>
                  </span>
                </p>
              </div>
            </div>
            <div class="data-item-line" />
            <!-- 新增订单数 -->
            <div class="data-item" style="border: 0;margin-right: 10px">
              <div class="item-row item-title">新增订单数</div>
              <div class="item-row item-data-section">
                <p class="item-subscribe">
                  <span>
                    <span class="total-count">{{ newOrderCountData.count }}</span>
                    <label class="item-label">总数</label>
                  </span>
                  <span>
                    <span class="total-count">{{ newOrderCountData.ios }}</span>
                    <label class="item-label">IOS</label>
                  </span>
                  <span>
                    <span class="total-count">{{ newOrderCountData.wechat }}</span>
                    <label class="item-label">微信</label>
                  </span>
                  <span>
                    <span class="total-count">{{ newOrderCountData.aliPay }}</span>
                    <label class="item-label">支付宝</label>
                  </span>
                  <span>
                    <span class="total-count">{{ newOrderCountData.ctcc }}</span>
                    <label class="item-label">电信</label>
                  </span>
                </p>
                <div class="diviser" />
                <p class="ratio-data">
                  <span v-if="isShowComparison">
                    <span class="ratio-name">较上一周:</span>
                    <span
                      :class="{green: newOrderCountData.comparison < 0, red: newOrderCountData.comparison > 0, blue: newOrderCountData.comparison === 0 }"
                      class="ratio-value">
                      {{ newOrderCountData.comparison | abs }}%
                      <template v-if="newOrderCountData.comparison > 0">↑</template>
                      <template v-else-if="newOrderCountData.comparison === 0" />
                      <template v-else>↓</template>
                    </span>
                  </span>
                </p>
              </div>
            </div>
            <div class="data-item-line" />
            <!-- 复购订单数 -->
            <div class="data-item" style="border: 0;margin-right: 10px">
              <div class="item-row item-title">复购订单数</div>
              <div class="item-row item-data-section">
                <p class="item-subscribe">
                  <span>
                    <span class="total-count">{{ reOrderCountData.count }}</span>
                    <label class="item-label">总数</label>
                  </span>
                  <span>
                    <span class="total-count">{{ reOrderCountData.ios }}</span>
                    <label class="item-label">IOS</label>
                  </span>
                  <span>
                    <span class="total-count">{{ reOrderCountData.wechat }}</span>
                    <label class="item-label">微信</label>
                  </span>
                  <span>
                    <span class="total-count">{{ reOrderCountData.aliPay }}</span>
                    <label class="item-label">支付宝</label>
                  </span>
                  <span>
                    <span class="total-count">{{ reOrderCountData.ctcc }}</span>
                    <label class="item-label">电信</label>
                  </span>
                </p>
                <div class="diviser" />
                <p class="ratio-data">
                  <span v-if="isShowComparison">
                    <span class="ratio-name">较上一周:</span>
                    <span
                      :class="{green: reOrderCountData.comparison < 0, red: reOrderCountData.comparison > 0, blue: reOrderCountData.comparison === 0 }"
                      class="ratio-value">
                      {{ reOrderCountData.comparison | abs }}%
                      <template v-if="reOrderCountData.comparison > 0">↑</template>
                      <template v-else-if="reOrderCountData.comparison === 0" />
                      <template v-else>↓</template>
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="ratio-with-chart-area" style="background: #f9f9f9; padding: 20px;position: relative;padding-top: 50px;">
            <div style="position: absolute;top: 0;margin-top: 14px;font-size: 18px;font-weight: bold;opacity: .7">
              <span>注册用户和绑定数据看板</span>
            </div>
            <!-- 新增注册用户 ------------------------------------ -->
            <div class="data-item">
              <div class="item-row item-title">新增注册用户</div>
              <div class="item-row item-data-section">
                <p class="item-subscribe">
                  <span>
                    <label class="item-label">总数: </label>
                    <span class="total-count">{{ newRegisterUser.count }}</span>
                  </span>
                  <span v-if="isShowComparison">
                    <span class="item-label">较上一周: </span>
                    <span
                      :class="{green: newRegisterUser.comparison < 0, red: newRegisterUser.comparison > 0, blue: newRegisterUser.comparison === 0 }"
                      class="ratio-value">
                      {{ newRegisterUser.comparison | abs }}%
                      <template v-if="newRegisterUser.comparison > 0">↑</template>
                      <template v-else-if="newRegisterUser.comparison === 0" />
                      <template v-else>↓</template>
                    </span>
                  </span>
                </p>
              </div>
              <div class="item-row item-chart-area">
                <div class="chart">
                  <ve-ring
                    :data="newRegisterUser.chartData"
                    :legend-visible="true"
                    :extend="chart_extend"
                    :settings="chart_settings"
                    height="205px" />
                </div>
              </div>
            </div>
            <!-- 家长端新增绑定用户 ------------------------------------ -->
            <div class="data-item">
              <div class="item-row item-title">家长端-新增绑定用户</div>
              <div class="item-row item-data-section">
                <p class="item-subscribe">
                  <span>
                    <label class="item-label">总数: </label>
                    <span class="total-count">{{ newBindUser.count }}</span>
                  </span>
                  <span v-if="isShowComparison">
                    <span class="item-label">较上一周: </span>
                    <span
                      :class="{green: newBindUser.comparison < 0, red: newBindUser.comparison > 0, blue: newBindUser.comparison === 0 }"
                      class="ratio-value">
                      {{ newBindUser.comparison | abs }}%
                      <template v-if="newBindUser.comparison > 0">↑</template>
                      <template v-else-if="newBindUser.comparison === 0" />
                      <template v-else>↓</template>
                    </span>
                  </span>
                  <span>
                    <span class="item-label">转化率: </span>
                    <span
                      :class="{green: newBindUser.conversion < 0, red: newBindUser.conversion > 0, blue: newBindUser.conversion === 0 }"
                      class="ratio-value">
                      {{ newBindUser.conversion | abs }}%
                      <template v-if="newBindUser.conversion > 0">↑</template>
                      <template v-else-if="newBindUser.conversion === 0" />
                      <template v-else>↓</template>
                    </span>
                  </span>
                </p>
              </div>
              <div class="item-row item-chart-area">
                <div class="chart">
                  <ve-ring
                    :data="newBindUser.chartData"
                    :legend-visible="true"
                    :extend="chart_extend"
                    :settings="chart_settings"
                    height="205px" />
                </div>
              </div>
            </div>
            <!-- 新增绑定设备 ------------------------------------ -->
            <div class="data-item">
              <div class="item-row item-title">孩子端-新增绑定设备</div>
              <div class="item-row item-data-section">
                <p class="item-subscribe">
                  <span>
                    <label class="item-label">总数: </label>
                    <span class="total-count">{{ newBindDevice.count }}</span>
                  </span>
                  <span v-if="isShowComparison">
                    <label class="item-label">较上一周: </label>
                    <span
                      :class="{green: newBindDevice.comparison < 0, red: newBindDevice.comparison > 0, blue: newBindDevice.comparison === 0 }"
                      class="ratio-value">
                      {{ newBindDevice.comparison | abs }}%
                      <template v-if="newBindDevice.comparison > 0">↑</template>
                      <template v-else-if="newBindDevice.comparison === 0" />
                      <template v-else>↓</template>
                    </span>
                  </span>
                </p>
              </div>
              <div class="item-row item-chart-area">
                <div class="chart">
                  <ve-ring
                    :data="newBindDevice.chartData"
                    :legend-visible="true"
                    :extend="chart_extend"
                    :settings="chart_settings"
                    height="205px" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="data-line-chart-area">
          <div style="margin-top: 20px;margin-bottom: 10px;display: flex;align-items: center">
            <div>
              <span class="order-number-list">查看维度：</span>
            </div>
            <el-radio-group v-model="showLineDayType" size="small" @change="lineDayTypeShowChange">
              <el-radio-button label="日"/>
              <el-radio-button :disabled="disabledWeekFilter" label="周"/>
              <el-radio-button :disabled="disabledMonthFilter" label="月"/>
            </el-radio-group>
          </div>
          <el-tabs
            v-model="active_name"
            @tab-click="tabChange">
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
        <div style="margin-top: 0px;margin-bottom: 30px;display: flex;align-items: center">
          <div style="">
            <span class="order-number-list">详细数据：</span>
          </div>
          <el-radio-group v-model="showLineTable" size="small" @change="showLineTableShowChange">
            <el-radio-button label="展开"/>
            <el-radio-button label="收起"/>
          </el-radio-group>
        </div>
        <transition name="el-zoom-in-top">
          <div v-if="showLineTable === '展开'" class="table-content table-block">
            <el-table v-if="active_name === '0'" :data="increasedPayUserListTableData" stripe size="mini" style="width: 100%">
              <el-table-column align="center" label="日期" prop="date" width="180" />
              <el-table-column align="center" label="APP付费用户数" prop="app" />
              <el-table-column align="center" label="电信付费用户数" prop="ctcc" />
              <el-table-column align="center" label="总付费用户数" prop="count" />
            </el-table>
            <el-table v-if="active_name === '1'" :data="orderCountListTableData" stripe size="mini" style="width: 100%">
              <el-table-column align="center" label="日期" prop="date" width="180" />
              <el-table-column align="center" label="高级会员" prop="senior" />
              <el-table-column align="center" label="电信会员" prop="ctcc" />
              <el-table-column align="center" label="普通会员" prop="common" />
              <el-table-column align="center" label="总订单总数" prop="count" />
            </el-table>
            <el-table v-if="active_name === '2'" :data="registerUserListTableData" stripe size="mini" style="width: 100%">
              <el-table-column align="center" label="日期" prop="date" width="180" />
              <el-table-column align="center" label="家长用户" prop="parent" />
              <el-table-column align="center" label="孩子用户" prop="child" />
              <el-table-column align="center" label="总注册用户数" prop="count" />
            </el-table>
            <el-table v-if="active_name === '3'" :data="orderAmountListTableData" stripe size="mini" style="width: 100%">
              <el-table-column align="center" label="日期" prop="date" width="180" />
              <el-table-column align="center" label="APP充值金额" prop="app" />
              <el-table-column align="center" label="电信充值金额" prop="ctcc" />
              <el-table-column align="center" label="总充值金额" prop="count" />
            </el-table>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import MultiProcess from '@/components/MultiProcess'
import { get_homepage_growth_data, get_homepage_overall_data } from '../api/interactive'
import { parseDateTime, getWeekRangeTime, getMonthRangeTime, cloneDeep } from '../utils'
const theme_color = ['#3EC0C6', '#FBB444', '#8596F1', '#D87FE2',
  '#FFA069', '#8d98b3', '#e5cf0d', '#97b552',
  '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1',
  '#588dd5', '#f5994e', '#c05050', '#59678c',
  '#c9ab00', '#7eb00a', '#6f5553', '#c14089']

const echart_colors = [
  '#338DE8', '#ED6060', '#EFAE3E', '#3CE5D5', '#92CC52'
]
const JsBigDecimal = require('js-big-decimal')

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
      pickerOptions: {
        // 限制仅选择近3650天
        disabledDate(time) {
          let curDate = new Date()
          curDate.setHours(0)
          curDate.setMinutes(0)
          curDate.setMilliseconds(0)
          curDate.setSeconds(0)
          curDate = new Date(curDate.getTime())
          const day = 3650 * 24 * 3600 * 1000
          const dateRegion = curDate - day
          return time.getTime() > curDate || time.getTime() < dateRegion
        }
      },
      datetime_range: [new Date(pre_week), new Date(day)],
      defaultDateRange: [new Date(pre_week), new Date(day)],
      query_sets: {},
      // 整体数据
      overallOriginData: [],
      overallData: {
        payUser: {
          count: '-'
        },
        order: {
          count: '-'
        },
        bind: {
          count: '-'
        },
        register: {
          count: '-'
        },
        amount: {
          count: '-'
        }
      },
      overallDataChartData: {
        columns: ['name', '总数'],
        rows: [
          { name: '-', 总数: 0 },
          { name: '-', 总数: 0 },
          { name: '-', 总数: 0 },
          { name: '-', 总数: 0 },
          { name: '-', 总数: 0 }
        ]
      },
      overallDataChartColor: [],
      overallDataChartExtend: {
        // metrics: ['总数'],
        label: {
          show: true,
          position: 'top'
        },
        series(v) {
          v.forEach(i => {
            i.barWidth = 30
          })
          return v
        },
        tooltip(v) {
          // v.trigger = 'none'
          return v
        }
      },
      overallDataDetailIndex: 0,
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
          ['iOS', '微信', '支付宝', '电信']
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
      line_chart_tabs: [
        {
          label: '新增付费用户',
          name: '0'
        },
        {
          label: '新增注册用户',
          name: '2'
        },
        {
          label: '订单成交量',
          name: '1'
        },
        {
          label: '充值金额',
          name: '3'
        }
      ],
      line_chart_tabs_data: [{}, {}, {}, {}],
      active_name: '0',
      dimension_data: {},
      // 条形统计图天数类型
      showLineDayType: '日',
      // 条形统计图的时间样式
      lineDateStyleList: [
        // { type: '日', date: ['2020-01-01', '2020-01-02', '2020-01-03'], startDate: '2020-01-01', endDate: '2020-01-03' },
        // { type: '周', date: ['2020-01-01~2020-01-07', '2020-01-08~2020-01-15'], startDate: '2020-01-01', endDate: '2020-01-15' },
        // { type: '月', date: ['2020-01-01~2020-01-31', '2020-02-01~2020-02-29'], startDate: '2020-01-01', endDate: '2020-02-29' }
      ],
      // 明细数据 - 新增付费用户列表
      increasedPayUserListTableData: [],
      // 明细数据 - 订单成交量
      orderCountListTableData: [],
      // 明细数据 - 新增用户注册
      registerUserListTableData: [],
      // 明细数据 - 充值金额
      orderAmountListTableData: [],
      // 展开详细
      showLineTable: '收起',
      tipsDialog: {
        list: [
          {
            label: '付费用户数',
            content: '累计在青葱守护7付费买过会员的用户，包括iOS高级会员、安卓高级会员、iOS普通会员、安卓普通会员和电信会员'
          },
          {
            label: '订单成交量',
            content: '累计在青葱守护7付费成功的订单总量，包括iOS高级会员、iOS普通会员、安卓高级会员、安卓普通会员和电信会员'
          },
          {
            label: '注册用户总数',
            content: '累计在青葱守护7注册成功的用户总量，第三方平台家长注册用户指通过分销、邀请好友注册成功但没登录APP，无法获取平台信息的用户'
          },
          {
            label: '累计绑定设备',
            content: '累计在青葱守护7成功绑定的孩子设备总量，包括公版、华为企业模式、小米企业模式、定制机、iOS设备和PC设备'
          },
          {
            label: '充值金额',
            content: '在青葱守护7所有付费成功订单的总金额，包括iOS高级会员收入、iOS普通会员收入、安卓高级会员收入、安卓普通会员收入、电信会员收入'
          }
        ],
        list2: [
          {
            label: '付费用户总数',
            content: '统计筛选时间段内新增和复购用户的总数，若某个用户既是新增用户，又是复购用户，则只计算为1个付费用户（去重）'
          },
          {
            label: '新增付费用户',
            content: '筛选的时间段内第一次付费成功的用户数（包含电信会员），支持查询更多时间段的数据，转化率=新增家长端付费用户数/新增家长端注册用户数'
          },
          {
            label: '复购付费用户',
            content: '以前买过任意一个会员套餐的用户，再次付费进行会员购买的用户'
          },
          {
            label: '充值金额',
            content: '筛选的时间段内付费成功订单的总金额，支持查询更多时间段的数据'
          },
          {
            label: '新增订单数',
            content: '筛选时间段内第一次付费成功用户的订单（包含电信订单），支持查询更多时间段的数据'
          },
          {
            label: '复购订单数',
            content: '以前付费成功过任意会员套餐的用户再次下单成功的订单，即为复购订单'
          },
          {
            label: '新增注册用户数',
            content: '筛选的时间段内注册成功的家长和孩子用户数，支持查询更多时间段的数据'
          },
          {
            label: '家长端-新增绑定用户',
            content: '筛选的时间段内第一次成功绑定设备的家长用户数，支持查询更多时间段的数据，转化率=新增家长端绑定用户数/新增家长端注册用户数'
          },
          {
            label: '孩子端-新增绑定设备',
            content: '筛选的时间段内新增绑定成功设备的类型，包括公版、定制机、企业模式和PC'
          }
        ]
      },
      // /////////////////////////
      // 付费用户总数卡片
      payUser: {
        count: '-', // 总数
        comparison: 0 // 较上一周
      },
      // 新增付费用户卡片
      increasedPayUserType: {
        count: '-', // 总数
        app: '-', // APP
        ctcc: '-', // 电信
        comparison: 0, // 较上一周
        conversion: 0 // 转化率
      },
      // 复购付费用户卡片
      repurchaseUser: {
        count: '-', // 总数
        app: '-', // APP
        ctcc: '-', // 电信
        comparison: 0 // 较上一周
      },
      // 新增绑定用户卡片
      newBindUser: {
        count: '-', // 总数
        comparison: 0, // 较上一周
        conversion: 0, // 转化率
        chartData: {
          columns: [
            'name',
            'value'
          ],
          center: [
            '50%',
            '50%'
          ],
          rows: [
            // ###
            { 'name': 'iOS', 'value': 0 },
            { 'name': '安卓', 'value': 0 }
          ]
        }
      },
      // 新增注册用户卡片
      newRegisterUser: {
        count: '-', // 总数
        comparison: 0, // 较上一周
        chartData: {
          columns: ['name', 'value'],
          center: ['50%', '50%'],
          rows: [
            // ###
            { name: '家长端', value: 2020 },
            { name: '孩子端', value: 2020 }
          ]
        }
      },
      // 充值金额卡片2
      orderAmount2: {
        count: '-',
        ios: '-', // iOS
        wechat: '-', // 微信
        aliPay: '-', // 支付宝
        ctcc: '-', // 电信
        comparison: 0 // 较上一周
      },
      // 新增绑定设备
      newBindDevice: {
        count: '-',
        comparison: 0, // 较上一周
        chartData: {
          columns: ['name', 'value'],
          center: ['50%', '50%'],
          rows: [
            // ###
            { name: 'VIVO', value: 2020 },
            { name: 'OPPO', value: 2020 },
            { name: '公版', value: 2020 }
          ]
        }
      },
      // 订单总数
      orderCountData: {
        count: '-',
        comparison: 0 // 较上一周
      },
      // 新增订单数
      newOrderCountData: {
        count: '-',
        ios: '-', // iOS
        wechat: '-', // 微信
        aliPay: '-', // 支付宝
        ctcc: '-', // 电信
        comparison: 0 // 较上一周
      },
      // 复购订单数
      reOrderCountData: {
        count: '-',
        ios: '-', // iOS
        wechat: '-', // 微信
        aliPay: '-', // 支付宝
        ctcc: '-', // 电信
        comparison: 0 // 较上一周
      },
      // 整体数据 截止日期
      picker_time:parseDateTime('y-m-d',new Date().getTime()),
      picker_time_show:false
    }
  },
  computed: {
    disabledWeekFilter() {
      // 大于 7 天才展示周
      const requestTime = this.getQuery()
      return Math.ceil((requestTime.end_time - requestTime.begin_time) / (24 * 3600 * 1000)) + 1 <= 7
    },
    disabledMonthFilter() {
      // 大于 31 天才展示周
      const requestTime = this.getQuery()
      return Math.ceil((requestTime.end_time - requestTime.begin_time) / (24 * 3600 * 1000)) + 1 <= 31
    },
    isShowComparison() {
      if (!this.datetime_range) return true
      return parseDateTime('y-m-d', this.datetime_range[0].getTime()) === parseDateTime('y-m-d', this.defaultDateRange[0].getTime()) &&
        parseDateTime('y-m-d', this.datetime_range[1].getTime()) === parseDateTime('y-m-d', this.defaultDateRange[1].getTime())
    }
  },
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
  mounted() {
    this.makeDateStyleList()
    this.fetchPageData()
  },
  methods: {
    fetchPageData() {
      // this.fetchOverallData()
      this.fetchGrowthData()
    },
    pickertimeChange(){
      this.fetchOverallData()
    },
   async setPickerTimeShow(){
      this.picker_time_show=true
      if (this.picker_time_show) {
         await this.fetchOverallData()
      }
    },
    /**
     * @description 获取首页整体数据
     * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=106
     * */
   async fetchOverallData() {
    const date_Hour=new Date().getHours()
    const date=new Date().getTime()
     const form={
        end_time:this.picker_time,
        begin_time:'2000-01-01'
     }
     await get_homepage_overall_data(form).then(r => {
        if (r.status === 0) {
          /* r.data = [
            {
              'category': '01',
              'list': [
                {
                  'type': '01',
                  'number': 600
                },
                {
                  'type': '02',
                  'number': 500
                },
                {
                  'type': '03',
                  'number': 400
                },
                {
                  'type': '04',
                  'number': 300
                },
                {
                  'type': '05',
                  'number': 200
                },
                {
                  'type': '00',
                  'number': 100
                }
              ]
            },
            {
              'category': '02',
              'list': [
                {
                  'type': '00',
                  'number': 100
                },
                {
                  'type': '01',
                  'number': 100
                },
                {
                  'type': '02',
                  'number': 200
                },
                {
                  'type': '03',
                  'number': 300
                },
                {
                  'type': '04',
                  'number': 400
                },
                {
                  'type': '05',
                  'number': 500
                }
              ]
            },
            {
              'category': '03',
              'list': [
                {
                  'type': '01',
                  'number': 100
                },
                {
                  'type': '02',
                  'number': 200
                },
                {
                  'type': '03',
                  'number': 300
                },
                {
                  'type': '04',
                  'number': 400
                },
                {
                  'type': '05',
                  'number': 500
                },
                {
                  'type': '06',
                  'number': 600
                },
                {
                  'type': '00',
                  'number': 900
                }
              ]
            },
            {
              'category': '04',
              'list': [
                {
                  'type': '00',
                  'number': 2000
                },
                {
                  'type': '01',
                  'number': 100
                },
                {
                  'type': '02',
                  'number': 200
                },
                {
                  'type': '03',
                  'number': 300
                },
                {
                  'type': '04',
                  'number': 400
                },
                {
                  'type': '05',
                  'number': 500
                },
                {
                  'type': '06',
                  'number': 600
                },
                {
                  'type': '07',
                  'number': 700
                }
              ]
            },
            {
              'category': '05',
              'list': [
                {
                  'type': '00',
                  'number': 6000
                },
                {
                  'type': '01',
                  'number': 1000
                },
                {
                  'type': '02',
                  'number': 2000
                },
                {
                  'type': '03',
                  'number': 3000
                },
                {
                  'type': '04',
                  'number': 4000
                },
                {
                  'type': '05',
                  'number': 5000
                }
              ]
            }
          ]*/
          const data = r.data
          this.overallOriginData = cloneDeep(data)
          // 付费会员数
          this.overallData.payUser.count = data.find(item => item.category === '01').list.find(item => item.type === '00').number
          // 订单成交量
          this.overallData.order.count = data.find(item => item.category === '02').list.find(item => item.type === '00').number
          // 累计绑定设备
          this.overallData.bind.count = data.find(item => item.category === '03').list.find(item => item.type === '00').number
          // 注册用户总数
          this.overallData.register.count = data.find(item => item.category === '04').list.find(item => item.type === '00').number
          // 充值金额
          this.overallData.amount.count = this.transformRMB(data.find(item => item.category === '05').list.find(item => item.type === '00').number)
          this.parseOverallDataDetail(this.overallDataDetailIndex)
        } else {
          this.$message.error(r.message)
        }
      })
    },
    /**
     * @description 获取关键数据
     * @doc http://showdoc.dev.zhixike.net/web/#/1?page_id=1464
     * */
    fetchGrowthData() {
      const config = this.getQuery()
      config.begin_time = parseDateTime('y-m-d', config.begin_time)
      config.end_time = parseDateTime('y-m-d', config.end_time)
      get_homepage_growth_data(config).then(data => {
        // data = testData
        // eslint-disable-next-line no-empty
        if (data.status === 0) {
          this.growth_data = data.data
          this.parseChatChart(cloneDeep(data.data))
          this.updateLineChart()
        } else {
          this.$message.error(data.message)
          this.growth_data = {}
        }
      }).finally(() => {
      })
    },
    /**
     * @description 解析卡片数据
     * @param data {Object} 后台数据
     * */
    parseChatChart(data) {
      // 付费用户总数
      this.payUser.count = data.pay_user_count
      this.payUser.comparison = data.pay_user_count_conversion// || 0
      // 新增付费用户
      this.increasedPayUserType.count = data.increased_pay_user_sum
      this.increasedPayUserType.app = (() => {
        try {
          return data.increased_pay_user_type.find(item => item.name === '04').count
        } catch (e) {
          console.log(1, e)
          return 0
        }
      })()
      this.increasedPayUserType.ctcc = (() => {
        try {
          return data.increased_pay_user_type.find(item => item.name === '06').count
        } catch (e) {
          console.log(2, e)
          return 0
        }
      })()
      this.increasedPayUserType.comparison = data.increased_pay_user_conversion// || 0
      this.increasedPayUserType.conversion = data.increased_pay_user_comparison// || 0
      // 复购付费用户
      this.repurchaseUser.count = data.repurchase_user_count
      this.repurchaseUser.comparison = data.repurchase_user_count_conversion// || 0
      this.repurchaseUser.app = (() => {
        try {
          return data.repurchase_user_count_type.find(item => item.name === '01').count
        } catch (e) {
          console.log(3, e)
          return 0
        }
      })()
      this.repurchaseUser.ctcc = (() => {
        try {
          return data.repurchase_user_count_type.find(item => item.name === '02').count
        } catch (e) {
          console.log(4, e)
          return 0
        }
      })()
      // 充值金额
      this.orderAmount2.count = data.order_amount_sum// || 0
      this.orderAmount2.ios = (() => {
        try {
          return data.order_amount_type.find(item => item.name === '04').count
        } catch (e) {
          console.log(5, e)
          return 0
        }
      })()
      this.orderAmount2.wechat = (() => {
        try {
          return data.order_amount_type.find(item => item.name === '01').count
        } catch (e) {
          console.log(6, e)
          return 0
        }
      })()
      this.orderAmount2.aliPay = (() => {
        try {
          return data.order_amount_type.find(item => item.name === '02').count
        } catch (e) {
          console.log(7, e)
          return 0
        }
      })()
      this.orderAmount2.ctcc = (() => {
        try {
          return data.order_amount_type.find(item => item.name === '06').count
        } catch (e) {
          console.log(8, e)
          return 0
        }
      })()
      this.orderAmount2.comparison = data.order_amount_conversion// || 0
      // 订单总数
      this.orderCountData.count = data.pay_order_count// || 0
      this.orderCountData.comparison = data.pay_order_count_conversion// || 0
      // 新增订单数
      this.newOrderCountData.count = data.add_order_sum// || 0
      this.newOrderCountData.comparison = data.add_order_conversion// || 0
      this.newOrderCountData.ios = (() => {
        try {
          return data.add_order_type.find(item => item.name === '04').count
        } catch (e) {
          console.log(9, e)
          return 0
        }
      })()
      this.newOrderCountData.wechat = (() => {
        try {
          return data.add_order_type.find(item => item.name === '01').count
        } catch (e) {
          console.log(10, e)
          return 0
        }
      })()
      this.newOrderCountData.aliPay = (() => {
        try {
          return data.add_order_type.find(item => item.name === '02').count
        } catch (e) {
          console.log(11, e)
          return 0
        }
      })()
      this.newOrderCountData.ctcc = (() => {
        try {
          return data.add_order_type.find(item => item.name === '06').count
        } catch (e) {
          console.log(12, e)
          return 0
        }
      })()
      // 复购订单数
      this.reOrderCountData.count = data.repurchase_order_type_count// || 0
      this.reOrderCountData.comparison = data.repurchase_order_type_conversion// || 0
      this.reOrderCountData.ios = (() => {
        try {
          return data.repurchase_order_type.find(item => item.name === '04').count
        } catch (e) {
          console.log(13, e)
          return 0
        }
      })()
      this.reOrderCountData.wechat = (() => {
        try {
          return data.repurchase_order_type.find(item => item.name === '01').count
        } catch (e) {
          console.log(14, e)
          return 0
        }
      })()
      this.reOrderCountData.aliPay = (() => {
        try {
          return data.repurchase_order_type.find(item => item.name === '02').count
        } catch (e) {
          console.log(15, e)
          return 0
        }
      })()
      this.reOrderCountData.ctcc = (() => {
        try {
          return data.repurchase_order_type.find(item => item.name === '06').count
        } catch (e) {
          console.log(16, e)
          return 0
        }
      })()
      // 新增绑定用户
      this.newBindUser.count = data.bind_user_sum
      this.newBindUser.comparison = data.bind_user_conversion// || 0
      this.newBindUser.conversion = data.bind_user_comparison// || 0
      this.newBindUser.chartData.rows = [
        // { 'name': 'iOS', 'value': 0 },
        { name: 'iOS', value: (() => {
          try {
            return data.bind_user_type.find(item => item.name === '02').count
          } catch (e) {
            console.log(17, e)
            return 0
          }
        })() },
        { name: '安卓', value: (() => {
          try {
            return data.bind_user_type.find(item => item.name === '03').count
          } catch (e) {
            console.log(18, e)
            return 0
          }
        })() }
      ]
      // 新增注册用户
      this.newRegisterUser.count = data.increased_reg_user_sum
      this.newRegisterUser.comparison = data.increased_reg_user_conversion// || 0
      this.newRegisterUser.chartData.rows = [
        // { 'name': 'iOS', 'value': 0 },
        { name: '家长端', value: (() => {
          try {
            return data.increased_reg_user_type.find(item => item.name === '01').count
          } catch (e) {
            console.log(19, e)
            return 0
          }
        })() },
        { name: '孩子端', value: (() => {
          try {
            return data.increased_reg_user_type.find(item => item.name === '02').count
          } catch (e) {
            console.log(20, e)
            return 0
          }
        })() }
      ]
      // 新增绑定设备
      this.newBindDevice.count = data.bind_device_sum
      this.newBindDevice.comparison = data.bind_device_conversion// || 0
      const newBindDeviceType = {
        '03': '安卓公版',
        '02': 'iOS',
        '04': '企业模式',
        '05': '定制机',
        '01': 'PC'
      }
      this.newBindDevice.chartData.rows = Object.keys(newBindDeviceType).map(key => {
        const value = data.bind_device_type.find(item => item.name === key)
        return {
          name: newBindDeviceType[key],
          value: value ? value.count : 0
        }
      })
    },
    /**
     * @description 解析条形统计图数据
     * */
    updateLineChart() {
      const growth_data = cloneDeep(this.growth_data)
      if (Object.keys(growth_data).length) {
        // 新增付费用户列表 --------------
        /* growth_data.increased_pay_user_list = [
          { date: '2020-12-07', count: 200, type: 'app' },
          { date: '2020-12-07', count: 100, type: 'ctcc' },

          { date: '2020-12-08', count: 200, type: 'app' },
          { date: '2020-12-08', count: 100, type: 'ctcc' },

          { date: '2020-12-09', count: 100, type: 'app' },
          { date: '2020-12-09', count: 300, type: 'ctcc' },

          { date: '2020-12-10', count: 500, type: 'app' },
          { date: '2020-12-10', count: 400, type: 'ctcc' },

          { date: '2020-12-11', count: 200, type: 'app' },
          { date: '2020-12-11', count: 300, type: 'ctcc' },

          { date: '2020-12-12', count: 100, type: 'app' },
          { date: '2020-12-12', count: 200, type: 'ctcc' },

          { date: '2020-12-13', count: 200, type: 'app' },
          { date: '2020-12-13', count: 100, type: 'ctcc' },

          { date: '2020-12-14', count: 400, type: 'app' },
          { date: '2020-12-14', count: 100, type: 'ctcc' }
        ]*/

        growth_data.increased_pay_user_list = this.parseLineData(cloneDeep(growth_data.increased_pay_user_list), 0, this.showLineDayType)
        // 明细数据
        this.increasedPayUserListTableData = cloneDeep(growth_data.increased_pay_user_list)
        // console.log(JSON.stringify(growth_data.increased_pay_user_list, null, 2))
        const increased_pay_user_chart = {
          columns: ['date', 'count', 'app', 'ctcc'],
          rows: growth_data.increased_pay_user_list
        }
        // 新增付费用户列表 end
        // 订单成交量 ---------------
        /*  growth_data.order_count_list = [
          { date: '2020-12-07', count: 100, type: 'senior' },
          { date: '2020-12-07', count: 100, type: 'ctcc' },
          { date: '2020-12-07', count: 100, type: 'common' },

          { date: '2020-12-08', count: 100, type: 'senior' },
          { date: '2020-12-08', count: 100, type: 'ctcc' },
          { date: '2020-12-08', count: 100, type: 'common' },

          { date: '2020-12-09', count: 100, type: 'senior' },
          { date: '2020-12-09', count: 100, type: 'ctcc' },
          { date: '2020-12-09', count: 100, type: 'common' },

          { date: '2020-12-10', count: 100, type: 'senior' },
          { date: '2020-12-10', count: 100, type: 'ctcc' },
          { date: '2020-12-10', count: 100, type: 'common' },

          { date: '2020-12-11', count: 100, type: 'senior' },
          { date: '2020-12-11', count: 100, type: 'ctcc' },
          { date: '2020-12-11', count: 100, type: 'common' },

          { date: '2020-12-12', count: 100, type: 'senior' },
          { date: '2020-12-12', count: 100, type: 'ctcc' },
          { date: '2020-12-12', count: 100, type: 'common' },

          { date: '2020-12-13', count: 100, type: 'senior' },
          { date: '2020-12-13', count: 100, type: 'ctcc' },
          { date: '2020-12-13', count: 100, type: 'common' }
        ]*/
        growth_data.order_count_list = this.parseLineData(cloneDeep(growth_data.order_count_list), 2, this.showLineDayType)
        // 明细数据
        this.orderCountListTableData = cloneDeep(growth_data.order_count_list)
        // console.log(JSON.stringify(growth_data.order_count_list, null, 2))
        const order_count_list_chart = {
          columns: ['date', 'count', 'senior', 'ctcc', 'common'],
          rows: growth_data.order_count_list
        }
        // 订单成交量 end
        // 新增注册用户
        /* growth_data.register_user_list = [
          { date: '2020-12-10', count: 200, type: 'parent' },
          { date: '2020-12-10', count: 200, type: 'child' },

          { date: '2020-12-11', count: 200, type: 'parent' },
          { date: '2020-12-11', count: 100, type: 'child' },

          { date: '2020-12-12', count: 100, type: 'parent' },
          { date: '2020-12-12', count: 200, type: 'child' },

          { date: '2020-12-13', count: 100, type: 'parent' },
          { date: '2020-12-13', count: 200, type: 'child' },

          { date: '2020-12-14', count: 200, type: 'parent' },
          { date: '2020-12-14', count: 100, type: 'child' }
        ]*/
        growth_data.register_user_list = this.parseLineData(growth_data.register_user_list, 1, this.showLineDayType)
        // 明细数据
        this.registerUserListTableData = cloneDeep(growth_data.register_user_list)
        const register_user_list = {
          columns: ['date', 'count', 'parent', 'child'],
          rows: growth_data.register_user_list
        }
        // 新增注册用户 end
        // 充值金额
        /* growth_data.order_amount_list = [
          { date: '2020-12-10', count: 200, type: 'app' },
          { date: '2020-12-10', count: 200, type: 'ctcc' },

          { date: '2020-12-11', count: 200, type: 'app' },
          { date: '2020-12-11', count: 200, type: 'ctcc' },

          { date: '2020-12-12', count: 200, type: 'app' },
          { date: '2020-12-12', count: 200, type: 'ctcc' },

          { date: '2020-12-13', count: 200, type: 'app' },
          { date: '2020-12-13', count: 200, type: 'ctcc' },

          { date: '2020-12-14', count: 400, type: 'app' },
          { date: '2020-12-14', count: 200, type: 'ctcc' },

          { date: '2020-12-15', count: 200, type: 'app' },
          { date: '2020-12-15', count: 200, type: 'ctcc' },

          { date: '2020-12-16', count: 200, type: 'app' },
          { date: '2020-12-16', count: 100, type: 'ctcc' },

          { date: '2020-12-17', count: 300, type: 'app' },
          { date: '2020-12-17', count: 500, type: 'ctcc' }
        ]*/
        growth_data.order_amount_list = this.parseLineData(growth_data.order_amount_list, 3, this.showLineDayType)
        // 明细数据
        this.orderAmountListTableData = cloneDeep(growth_data.order_amount_list)
        const order_amount_list_chart = {
          columns: ['date', 'count', 'app', 'ctcc'],
          rows: growth_data.order_amount_list
        }
        // 充值金额 end
        this.line_chart_tabs_data = [
          increased_pay_user_chart,
          order_count_list_chart,
          register_user_list,
          order_amount_list_chart
        ]
      } else {
        this.line_chart_tabs_data = [{}, {}, {}, {}]
      }
      this.tabChange({ name: this.active_name })
    },
    /**
     * @description 获取查询数据
     * */
    getQuery() {
      const config = {}
      if (this.datetime_range) {
        config['begin_time'] = this.datetime_range[0].getTime()
        config['end_time'] = this.datetime_range[1].getTime()
      } else {
        config['begin_time'] = this.defaultDateRange[0].getTime()
        config['end_time'] = this.defaultDateRange[1].getTime()
      }
      return config
    },
    /**
     * @description 查询时间发生改变
     * */
    dateTimeChange() {
      this.showLineDayType = '日'
      this.increasedPayUserListTableData = []
      this.orderCountListTableData = []
      this.registerUserListTableData = []
      this.orderAmountListTableData = []
      this.makeDateStyleList()
      this.fetchGrowthData()
    },
    /**
     * @description 条形统计图 tab 切换
     * */
    tabChange(obj) {
      const active_name = obj.name
      if (active_name === '0') {
        this.chart_settings['labelMap'] = {
          date: '日期',
          count: '总付费用户',
          app: 'APP付费用户',
          ctcc: '电信付费用户'
        }
      } else if (active_name === '1') {
        this.chart_settings['labelMap'] = {
          date: '日期',
          count: '总订单数',
          senior: '高级会员',
          ctcc: '电信会员',
          common: '普通会员'
        }
      } else if (active_name === '3') {
        this.chart_settings['labelMap'] = {
          date: '日期',
          count: '总充值金额',
          app: 'APP充值金额',
          ctcc: '电信充值金额'
        }
      } else if (active_name === '2') {
        this.chart_settings['labelMap'] = {
          date: '日期',
          count: '总注册用户',
          parent: '家长用户',
          child: '孩子用户'
        }
      }
      this.dimension_data = this.line_chart_tabs_data[Number(active_name)]
    },
    /**
     * @description 条形统计图切换 日 周 月
     * */
    lineDayTypeShowChange(e) {
      this.increasedPayUserListTableData = []
      this.orderCountListTableData = []
      this.registerUserListTableData = []
      this.orderAmountListTableData = []
      this.updateLineChart()
    },
    /**
     * @description 解析条形统计图的数据
     * @param list {Array} 后台原数据
     * @param type {Number} 0 新增付费用户 | 1 新增注册用户 | 2 订单成交量 | 3 充值金额
     * @param showType {String} 日 周 月
     * @return {Object}
     * */
    parseLineData(list, type, showType) {
      if (type === 0 && showType === '日') {
        return [...new Set(list.map(item => item.date))].map(date => {
          const ctcc = list.find(_item => {
            return _item.date === date && _item.type === 'ctcc'
          })
          const app = list.find(_item => {
            return _item.date === date && _item.type === 'app'
          })
          return {
            date: date,
            count: ctcc.count + app.count,
            ctcc: ctcc.count,
            app: app.count
          }
        })
      }
      if (type === 2 && showType === '日') {
        return [...new Set(list.map(item => item.date))].map(date => {
          // 高级会员
          const senior = list.find(_item => {
            return _item.date === date && _item.type === 'senior'
          })
          // 电信会员
          const ctcc = list.find(_item => {
            return _item.date === date && _item.type === 'ctcc'
          })
          // 普通会员
          const common = list.find(_item => {
            return _item.date === date && _item.type === 'common'
          })
          // 普通会员
          return {
            date: date,
            count: senior.count + ctcc.count + common.count,
            senior: senior.count,
            ctcc: ctcc.count,
            common: common.count
          }
        })
      }
      if (type === 1 && showType === '日') {
        return [...new Set(list.map(item => item.date))].map(date => {
          // 家长
          const parent = list.find(_item => {
            return _item.date === date && _item.type === 'parent'
          })
          // 孩纸
          const child = list.find(_item => {
            return _item.date === date && _item.type === 'child'
          })
          // 普通会员
          return {
            date: date,
            count: parent.count + child.count,
            parent: parent.count,
            child: child.count
          }
        })
      }
      if (type === 3 && showType === '日') {
        return [...new Set(list.map(item => item.date))].map(date => {
          // app
          const app = list.find(_item => {
            return _item.date === date && _item.type === 'app'
          })
          // 电信
          const ctcc = list.find(_item => {
            return _item.date === date && _item.type === 'ctcc'
          })

          return {
            date: date,
            count: Number(app.count) + Number(ctcc.count),
            app: app.count,
            ctcc: ctcc.count
          }
        })
      }
      const rangeDate = showType === '周' ? this.lineDateStyleList[1].date : this.lineDateStyleList[2].date
      if (type === 0 && (showType === '周' || showType === '月')) {
        // [{"date": "2020-12-07", "count": 32, "ctcc": 22, "app": 10}]
        const weekList = []
        rangeDate.forEach(weekRange => {
          const weekRangeArray = weekRange.split('~')
          weekRangeArray[0] = weekRangeArray[0].replace(/-/g, '')
          weekRangeArray[1] = weekRangeArray[1].replace(/-/g, '')
          // app 付费用户
          let appCount = 0
          // 电信付费用户
          let ctccCount = 0
          list.forEach(item => {
            if (item.type === 'app') {
              // 是否在区间
              if (weekRangeArray[0] <= item.date.replace(/-/g, '') && weekRangeArray[1] >= item.date.replace(/-/g, '')) {
                appCount += item.count
              }
            }
            if (item.type === 'ctcc') {
              // 是否在区间
              if (weekRangeArray[0] <= item.date.replace(/-/g, '') && weekRangeArray[1] >= item.date.replace(/-/g, '')) {
                ctccCount += item.count
              }
            }
          })
          weekList.push({
            date: weekRange,
            count: appCount + ctccCount,
            ctcc: ctccCount,
            app: appCount
          })
        })
        return weekList
      }
      if (type === 2 && (showType === '周' || showType === '月')) {
        // [{"date": "2020-12-07", "count": 32, "senior": 22, "ctcc": 22, "common": 10}]
        const weekList = []
        rangeDate.forEach(weekRange => {
          const weekRangeArray = weekRange.split('~')
          weekRangeArray[0] = weekRangeArray[0].replace(/-/g, '')
          weekRangeArray[1] = weekRangeArray[1].replace(/-/g, '')
          // 高级会员
          let seniorCount = 0
          // 电信会员
          let ctccCount = 0
          // 普通会员
          let commonCount = 0
          list.forEach(item => {
            if (item.type === 'senior') {
              // 是否在区间
              if (weekRangeArray[0] <= item.date.replace(/-/g, '') && weekRangeArray[1] >= item.date.replace(/-/g, '')) {
                seniorCount += item.count
              }
            }
            if (item.type === 'ctcc') {
              // 是否在区间
              if (weekRangeArray[0] <= item.date.replace(/-/g, '') && weekRangeArray[1] >= item.date.replace(/-/g, '')) {
                ctccCount += item.count
              }
            }
            if (item.type === 'common') {
              // 是否在区间
              if (weekRangeArray[0] <= item.date.replace(/-/g, '') && weekRangeArray[1] >= item.date.replace(/-/g, '')) {
                commonCount += item.count
              }
            }
          })
          weekList.push({
            date: weekRange,
            count: seniorCount + ctccCount + commonCount,
            senior: seniorCount,
            ctcc: ctccCount,
            common: commonCount
          })
        })
        return weekList
      }
      if (type === 1 && (showType === '周' || showType === '月')) {
        const weekList = []
        rangeDate.forEach(weekRange => {
          const weekRangeArray = weekRange.split('~')
          weekRangeArray[0] = weekRangeArray[0].replace(/-/g, '')
          weekRangeArray[1] = weekRangeArray[1].replace(/-/g, '')
          // 家长
          let parentCount = 0
          // 孩纸
          let childCount = 0
          list.forEach(item => {
            if (item.type === 'parent') {
              // 是否在区间
              if (weekRangeArray[0] <= item.date.replace(/-/g, '') && weekRangeArray[1] >= item.date.replace(/-/g, '')) {
                parentCount += item.count
              }
            }
            if (item.type === 'child') {
              // 是否在区间
              if (weekRangeArray[0] <= item.date.replace(/-/g, '') && weekRangeArray[1] >= item.date.replace(/-/g, '')) {
                childCount += item.count
              }
            }
          })
          weekList.push({
            date: weekRange,
            count: parentCount + childCount,
            parent: parentCount,
            child: childCount
          })
        })
        return weekList
      }
      if (type === 3 && (showType === '周' || showType === '月')) {
        const weekList = []
        rangeDate.forEach(weekRange => {
          const weekRangeArray = weekRange.split('~')
          weekRangeArray[0] = weekRangeArray[0].replace(/-/g, '')
          weekRangeArray[1] = weekRangeArray[1].replace(/-/g, '')
          // app
          let appCount = 0
          // 电信
          let ctccCount = 0
          list.forEach(item => {
            if (item.type === 'app') {
              // 是否在区间
              if (weekRangeArray[0] <= item.date.replace(/-/g, '') && weekRangeArray[1] >= item.date.replace(/-/g, '')) {
                appCount += item.count
              }
            }
            if (item.type === 'ctcc') {
              // 是否在区间
              if (weekRangeArray[0] <= item.date.replace(/-/g, '') && weekRangeArray[1] >= item.date.replace(/-/g, '')) {
                ctccCount += item.count
              }
            }
          })
          weekList.push({
            date: weekRange,
            count: appCount + ctccCount,
            app: appCount,
            ctcc: ctccCount
          })
        })
        return weekList
      }
    },
    /**
     * @description 生成查询 开始时间 和 结束时间 生成 日 周 月 的时间范围
     * */
    makeDateStyleList() {
      const queryDateRange = this.getQuery()
      this.lineDateStyleList = []
      this.lineDateStyleList.push(
        { type: '日', date: [], startDate: parseDateTime('y-m-d', queryDateRange.begin_time), endDate: parseDateTime('y-m-d', queryDateRange.end_time) }
      )
      // ///////////////
      const weekDate = getWeekRangeTime(queryDateRange.begin_time, queryDateRange.end_time)
      this.lineDateStyleList.push(
        { type: '周', date: weekDate.map(item => {
          return item.startDate + '~' + item.endDate
        }), startDate: weekDate[0].startDate, endDate: weekDate[weekDate.length - 1].endDate }
      )
      // 更改周的起止时间
      this.lineDateStyleList[1].date[0] = parseDateTime('y-m-d', queryDateRange.begin_time) + '~' + this.lineDateStyleList[1].date[0].split('~')[1]
      const weekLength = this.lineDateStyleList[1].date.length
      this.lineDateStyleList[1].date[weekLength - 1] = this.lineDateStyleList[1].date[weekLength - 1].split('~')[0] + '~' + parseDateTime('y-m-d', queryDateRange.end_time)
      // ///////////////
      const monthDate = getMonthRangeTime(queryDateRange.begin_time, queryDateRange.end_time)
      this.lineDateStyleList.push(
        { type: '月', date: monthDate.map(item => {
          return item.startDate + '~' + item.endDate
        }), startDate: monthDate[0].startDate, endDate: monthDate[monthDate.length - 1].endDate }
      )
      // 更改月的起止时间
      this.lineDateStyleList[2].date[0] = parseDateTime('y-m-d', queryDateRange.begin_time) + '~' + this.lineDateStyleList[2].date[0].split('~')[1]
      const monthLength = this.lineDateStyleList[2].date.length
      this.lineDateStyleList[2].date[monthLength - 1] = this.lineDateStyleList[2].date[monthLength - 1].split('~')[0] + '~' + parseDateTime('y-m-d', queryDateRange.end_time)
      // console.log(JSON.stringify(this.lineDateStyleList, null, 2))
    },
    /**
     * @description 展开详细数据切换
     * */
    showLineTableShowChange(val) {
    },
    parseOverallDataDetail(overallDataDetailIndex) {
      this.overallDataDetailIndex = overallDataDetailIndex
      if (overallDataDetailIndex === 0) {
        this.overallDataChartData = {
          columns: ['name', '总数'],
          rows: [
            { name: 'iOS高级付费会员数', 总数: this.overallOriginData.find(item => item.category === '01').list.find(item => item.type === '01').number },
            { name: 'iOS普通付费会员数', 总数: this.overallOriginData.find(item => item.category === '01').list.find(item => item.type === '02').number },
            { name: '安卓高级付费会员数', 总数: this.overallOriginData.find(item => item.category === '01').list.find(item => item.type === '03').number },
            { name: '安卓普通付费会员数', 总数: this.overallOriginData.find(item => item.category === '01').list.find(item => item.type === '04').number },
            { name: '电信付费会员数', 总数: this.overallOriginData.find(item => item.category === '01').list.find(item => item.type === '05').number }
          ]
        }
        this.overallDataChartColor = ['#3ec0c6']
      }
      if (overallDataDetailIndex === 1) {
        this.overallDataChartData = {
          columns: ['name', '总数'],
          rows: [
            { name: 'iOS高级会员', 总数: this.overallOriginData.find(item => item.category === '02').list.find(item => item.type === '01').number },
            { name: 'iOS普通会员', 总数: this.overallOriginData.find(item => item.category === '02').list.find(item => item.type === '02').number },
            { name: '安卓高级会员', 总数: this.overallOriginData.find(item => item.category === '02').list.find(item => item.type === '03').number },
            { name: '安卓普通会员', 总数: this.overallOriginData.find(item => item.category === '02').list.find(item => item.type === '04').number },
            { name: '电信会员', 总数: this.overallOriginData.find(item => item.category === '02').list.find(item => item.type === '05').number }
          ]
        }
        this.overallDataChartColor = ['#fbb444']
      }
      if (overallDataDetailIndex === 2) {
        this.overallDataChartData = {
          columns: ['name', '总数'],
          rows: [
            { name: '安卓公版设备', 总数: this.overallOriginData.find(item => item.category === '03').list.find(item => item.type === '01').number },
            { name: '华为企业模式', 总数: this.overallOriginData.find(item => item.category === '03').list.find(item => item.type === '02').number },
            { name: '小米企业模式', 总数: this.overallOriginData.find(item => item.category === '03').list.find(item => item.type === '03').number },
            { name: '定制机', 总数: this.overallOriginData.find(item => item.category === '03').list.find(item => item.type === '04').number },
            { name: 'iOS设备', 总数: this.overallOriginData.find(item => item.category === '03').list.find(item => item.type === '05').number },
            { name: 'PC设备', 总数: this.overallOriginData.find(item => item.category === '03').list.find(item => item.type === '06').number }
          ]
        }
        this.overallDataChartColor = ['#8596f1']
      }
      if (overallDataDetailIndex === 3) {
        this.overallDataChartData = {
          columns: ['name', '总数'],
          rows: [
            { name: 'iOS家长注册用户', 总数: this.overallOriginData.find(item => item.category === '04').list.find(item => item.type === '01').number },
            { name: '安卓家长注册用户', 总数: this.overallOriginData.find(item => item.category === '04').list.find(item => item.type === '02').number },
            { name: '电信家长注册用户', 总数: this.overallOriginData.find(item => item.category === '04').list.find(item => item.type === '03').number },
            { name: '第三方平台家长注册用户', 总数: this.overallOriginData.find(item => item.category === '04').list.find(item => item.type === '04').number },
            { name: 'iOS孩子注册用户', 总数: this.overallOriginData.find(item => item.category === '04').list.find(item => item.type === '05').number },
            { name: '安卓孩子注册用户', 总数: this.overallOriginData.find(item => item.category === '04').list.find(item => item.type === '06').number },
            { name: 'PC孩子注册用户', 总数: this.overallOriginData.find(item => item.category === '04').list.find(item => item.type === '07').number }
          ]
        }
        this.overallDataChartColor = ['#d87fe2']
      }
      if (overallDataDetailIndex === 4) {
        this.overallDataChartData = {
          columns: ['name', '总数'],
          rows: [
            { name: 'iOS高级会员充值到账金额', 总数: this.transformRMB(this.overallOriginData.find(item => item.category === '05').list.find(item => item.type === '01').number) },
            { name: 'iOS普通会员充值到账金额', 总数: this.transformRMB(this.overallOriginData.find(item => item.category === '05').list.find(item => item.type === '02').number) },
            { name: '安卓高级会员充值到账金额', 总数: this.transformRMB(this.overallOriginData.find(item => item.category === '05').list.find(item => item.type === '03').number) },
            { name: '安卓普通会员充值到账金额', 总数: this.transformRMB(this.overallOriginData.find(item => item.category === '05').list.find(item => item.type === '04').number) },
            { name: '电信会员充值到账金额', 总数: this.transformRMB(this.overallOriginData.find(item => item.category === '05').list.find(item => item.type === '05').number) }
          ]
        }
        this.overallDataChartColor = ['#ffa069']
      }
      // this.overallDataChartData.rows = this.overallDataChartData.rows.sort((a, b) => {
      //   return b['总数'] - a['总数']
      // })
    },
    transformRMB(number) {
      return new JsBigDecimal(number).divide(new JsBigDecimal(100), 2).getValue()
    }
  }
}
</script>
<style lang="scss">
.tips-dialog-custom-class{
  .el-dialog__body{
    padding: 12px 20px !important;
    padding-bottom: 0 !important;
  }
  .el-dialog__footer{
    padding-top: 0 !important;
  }
  .item{
    //display: flex;
    margin-bottom: 20px;
  }
  .label{
    //width: 105px;
    font-weight: bold;
    //position: relative;
    //top: 2px;
    margin-right: 10px;
    margin-bottom: 6px;
    display: block;
    font-size: 15px;
    color: #409eff;
  }
  .content{
    line-height: 1.5;
    //max-width: calc(100% - 110px);
  }
}
</style>
<style scoped lang="scss">
.card-box{
  background-color: #ffffff;
  padding: 24px;
  box-shadow: 6px 4px 20px 5px #f1f1f1;
  border-radius: 4px;
  .title-area {
    width: 100%;
    padding: 0 0 30px 0;
    display: flex;
    align-items: center;
    .title {
      font-family: PingFangSC-Regular, 微软雅黑, serif;
      font-size: 20px;
      color: #454545;
      font-weight: bold;
    }
    .title-area-img{
      margin-left: auto;
      font-weight: bold;
      font-size: 24px;
      cursor: pointer;
    }
    .active{
      transform: rotate(90deg);
    }
    .time{
      font-size: 16px;
      color: #454545;
      margin-left: 40px;
      font-weight: bold;
    }
  }
  .pickTime-enter-active{
    transition: opacity 3s;
  }
  .pickTime-enter{
     opacity: 0;
  }
  .pickTime-leave-active{
    transition: opacity 3s;
  }
  .pickTime-leave-to{
    opacity: 0;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
$border_line_color: #c7d5ee;
$border_radius_size: 3px;
$box_shadow_color: #3c3c3c;
$radio_fair_color: rgba(0, 0, 0, 0.71);
.gelei-content {
  width: 100%;
  height: 100%;
  /*min-height: 480px;*/
  padding: 20px 30px 36px 30px;
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
      display: flex;
      flex-direction: column;
      background: #FFFFFF;
      .summary-items-area {
        width: 100%;
        min-width: 1150px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 0 15px 0;
        user-select: none;
        .summary-items-active{
          transform: scale(1.05);
          box-shadow: 6px 4px 20px 5px #c7c7c7;
        }
        .summary-item {
          width: 260px;
          height: 120px;
          border-radius: $border_radius_size;
          display: flex;
          flex-direction: row;
          padding: 22px 24px;
          flex-basis: calc((100% - 80px) / 6);
          cursor: pointer;
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
        align-items: center;
        .data-item {
          //flex-basis: calc((100% - 40px) / 3);
          min-width: 380px;
          width: 33.33333%;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          //border: 1px solid #EAEAEA;
          border-radius: $border_radius_size;
          padding: 20px 32px;

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
        .data-item-line{
          height: 180px;
          width: 1px;
          background-color: #eaeaea;
          max-width: 1px;
          padding: 0 !important;
          display: none;
        }
        .new-user-and-amount-area-2{
          display: flex;
          //border: 1px solid rgb(234, 234, 234);
          margin-right: 10px;
          align-items: center;
          width: calc(100% - 430px);

          > div{
            border: 0;
          }
          div:nth-child(1) {
            width: 300px;
            min-width: auto;
          }
        }
        .new-user-and-amount-area-3{
          width: 430px;
          > div{
            width: 100%;
          }
        }
        @media screen and (max-width: 1900px) {
          .new-user-and-amount-area-2{
            width: calc(100% - 300px);
            > div{
              padding: 20px;
            }
            div:nth-child(1) {
              width: 170px;
              .item-title{
                padding: 0;
              }
            }
            .data-item{
              min-width: 282px;
              .ratio-data{
                span{
                  span{
                    //display: block;
                  }
                  span:last-child{
                    margin-top: 6px;
                  }
                }
              }
            }
          }
          .new-user-and-amount-area-3{
            width: 300px;
            > div{
              min-width: auto;
              padding: 20px;
            }
            .data-item{
              min-width: 282px;
              .ratio-data{
                span{
                  span{
                    //display: block;
                  }
                  span:last-child{
                    margin-top: 6px;
                  }
                }
              }
            }
          }
          // .ratio-with-chart-area{
          //   .data-item{}
          // }
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
          //border: 1px solid #EAEAEA;
          padding: 20px 32px;
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
              justify-content: space-between;
              span {
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
    }

    .data-line-chart-area {
      width: 100%;
      min-height: 400px;

      .line-chart-area {
        height: 400px;
      }
    }
  }
  .title-tips{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #ccc;
    color: #ababab;
    font-size: 12px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    line-height: 1;
    cursor: pointer;
  }
}
.order-amount-2{
  width: 100%;
  label{
    font-family: PingFangSC-Regular,微软雅黑,serif;
    font-size: 12px;
    color: #454545;
    width: 46px;
    display: inline-block;
  }
  .item-subscribe-line{
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    div{
      width: 50%;
    }
  }
}
</style>
