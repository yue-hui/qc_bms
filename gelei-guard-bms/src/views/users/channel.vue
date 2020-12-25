<template>
  <div class="page gelei-content">
    <div class="card-box">
      <div class="title-area"><span class="title">前五渠道数据</span></div>
      <div class="channel-line">
        <el-row :gutter="12">
          <el-col v-for="item in top5Data" :key="item.title" :md="8" :sm="12" :lg="8">
            <div class="box">
              <div class="title">
                <span>{{ item.title }}</span>
              </div>
              <div class="line">
                <div v-for="countItem in item.list" :key="countItem.index" class="line-item">
                  <span class="count-text">{{ countItem.number }}</span>
                  <span class="line-bo">
                    <span :style="{ height: countItem.number / item.max * 100 + '%' }" />
                  </span>
                  <span class="text">
                    {{ countItem.tag | getTagName }}
                  </span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-loading="loading" class="card-box">
      <div class="title-area"><span class="title">渠道趋势对比</span></div>
      <div class="filter">
        <div class="label">
          <span>查询时间：</span>
        </div>
        <div class="input">
          <el-date-picker
            v-model="datePickerValue"
            type="daterange"
            size="small"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="label">
          <span>渠道选择：</span>
        </div>
        <div class="input">
          <el-select
            v-model="channelValue"
            multiple
            size="small"
            collapse-tags
            placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="input">
          <el-button size="small" type="primary" @click="getFilter">查询</el-button>
        </div>
      </div>
      <div class="tabs">
        <el-tabs v-model="activeName" @tab-click="tabHandleClick">
          <el-tab-pane label="新增注册用户" name="0" />
          <el-tab-pane label="新增绑定用户" name="1" />
          <el-tab-pane label="新增付费用户" name="2" />
          <el-tab-pane label="充值金额" name="3" />
        </el-tabs>
        <div class="input">
          <el-radio-group v-model="showLineDayType" size="small" @change="lineDayTypeShowChange">
            <el-radio-button label="日"/>
            <el-radio-button label="周"/>
            <el-radio-button label="月"/>
          </el-radio-group>
        </div>
      </div>
      <ve-line :rel="1" :data="chartData" :settings="chartSettings"/>
    </div>
    <div v-loading="loading" class="card-box" style="padding-bottom: 24px">
      <div class="title-area"><span class="title">所有渠道数据</span></div>
      <el-table :data="channelTableData" stripe size="mini" style="width: 100%">
        <el-table-column align="center" label="渠道名称" prop="tagName" />
        <el-table-column sortable align="center" label="新增注册用户" prop="incrRegUser" />
        <el-table-column sortable align="center" label="新增绑定用户" prop="incrBindUser" />
        <el-table-column sortable align="center" label="绑定转化率" prop="bindConversion" />
        <el-table-column sortable align="center" label="新增付费用户" prop="incrPayUser" />
        <el-table-column sortable align="center" label="付费转化率" prop="payConversion" />
        <el-table-column sortable align="center" label="充值金额（元）" prop="incrPayAmount" />
        <el-table-column sortable align="center" label="累计注册用户" prop="regUserTotal" />
        <el-table-column sortable align="center" label="累计充值金额（元）" prop="payAmountTotal" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { getStoreAllTags, getStoreTagTypeTop5, getStoreDetail, getStoreListDetail } from '../../api/interactive'
import { parseDateTime, cloneDeep, getWeekRangeTime, getMonthRangeTime } from '../../utils/index'
const JsBigDecimal = require('js-big-decimal')
let channelOptions = []

export default {
  filters: {
    getTagName(tag) {
      try {
        return channelOptions.find(item => item.value === tag).label
      } catch (e) {
        return '未知'
      }
    }
  },
  data() {
    return {
      loading: false,
      top5Data: [
        {
          title: '注册用户总数',
          max: 0,
          list: [
            { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }
          ]
        },
        {
          title: '绑定用户总数',
          max: 0,
          list: [
            { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }
          ]
        },
        {
          title: '绑定转化率',
          max: 0,
          list: [
            { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }
          ]
        },
        {
          title: '付费用户总数',
          max: 0,
          list: [
            { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }
          ]
        },
        {
          title: '付费转化率',
          max: 0,
          list: [
            { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }
          ]
        },
        {
          title: '充值金额',
          max: 0,
          list: [
            { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }, { number: 0, tag: '-' }
          ]
        }
      ],
      activeName: '0',
      datePickerValue: null,
      showLineDayType: '日',
      channelValue: [],
      channelOptions: [],
      chartData: {
        columns: ['date'],
        rows: [
          // { 'date': '2020-01-01', OPPO: 500, VIVO: 600, HUAWEI: 700, XIAOMI: 800, APPSTORE: 900 }
        ]
      },
      chartSettings: {
        labelMap: {
          date: '日期'
        }
      },
      channelTableData: [],
      originStoreDetailList: []
    }
  },
  mounted() {
    this.setDatePickerDefaultValue()
    this.makeDateStyleList()
    this.init()
  },
  methods: {
    /**
     * @description 渠道趋势对比折线图类型切换
     * */
    tabHandleClick(tab) {
      this.getStoreListDetail()
    },
    /**
     * @description 条形统计图切换 日 周 月
     * */
    lineDayTypeShowChange(e) {
      this.parseStoreListDetail(cloneDeep(this.originStoreDetailList))
    },
    /**
     * @description 获取所有标签
     * */
    init() {
      getStoreAllTags()
        .then((res) => {
          if (res.status !== 0) throw res
          channelOptions = this.channelOptions = res.data.map(item => {
            return {
              label: item.tagName,
              value: item.tag
            }
          })
          this.getStoreTagTypeTop5()
          this.getStoreDetail()
          this.getStoreListDetail()
        })
        .catch(() => {})
        .finally(() => {})
    },
    /**
     * @description 获取前五渠道总体数据
     * */
    getStoreTagTypeTop5() {
      getStoreTagTypeTop5()
        .then(res => {
          if (res.status !== 0) throw res
          function getMax(list) {
            const arr = []
            list.forEach(item => {
              arr.push(item.number)
            })
            return Math.max.apply(null, arr)
          }
          const data = res.data
          this.top5Data = [
            {
              title: '注册用户总数',
              max: getMax(data.regUserTop5),
              list: data.regUserTop5
            },
            {
              title: '绑定用户总数',
              max: getMax(data.bindUserTop5),
              list: data.bindUserTop5
            },
            {
              title: '绑定转化率',
              max: getMax(data.bindRateTop5),
              list: data.bindRateTop5
            },
            {
              title: '付费用户总数',
              max: getMax(data.payUserTop5),
              list: data.payUserTop5
            },
            {
              title: '付费转化率',
              max: getMax(data.payRateTop5),
              list: data.payRateTop5
            },
            {
              title: '充值金额',
              max: getMax(data.payAmountTop5),
              list: data.payAmountTop5
            }
          ]
        })
        .catch(() => {})
    },
    /**
     * @description 获取所有渠道数据及占比
     * */
    getStoreDetail() {
      this.loading = true
      getStoreDetail(this.getRequestTime())
        .then(res => {
          if (res.status !== 0) throw res
          // 全部渠道注册用户总数
          const regUserTotal = (() => {
            let count = 0
            res.data.forEach(item => {
              count += Number(item.regUserTotal)
            })
            return count
          })()
          // 全部渠道累计充值金额
          const payAmountTotal = (() => {
            let count = 0
            res.data.forEach(item => {
              count += Number(new JsBigDecimal(item.payAmountTotal).divide(new JsBigDecimal(100), 2).getValue())
            })
            return count
          })()
          this.channelTableData = res.data.map(item => {
            // 绑定转化率 = 新增绑定 / 新增注册
            item.bindConversion = (() => {
              if (item.incrRegUser === 0) return '0%'
              return new JsBigDecimal(item.incrBindUser)
                .divide(new JsBigDecimal(item.incrRegUser), 4)
                .multiply(new JsBigDecimal(100)).getValue() + '%'
            })()
            // 付费转化率 = 新增付费 / 新增注册
            item.payConversion = (() => {
              if (item.incrRegUser === 0) return '0%'
              return new JsBigDecimal(item.incrPayUser)
                .divide(new JsBigDecimal(item.incrRegUser), 4)
                .multiply(new JsBigDecimal(100)).getValue() + '%'
            })()
            // 金额 分 =》 元
            item.payAmountTotal = new JsBigDecimal(item.payAmountTotal).divide(new JsBigDecimal(100), 2).getValue()
            item.incrPayAmount = new JsBigDecimal(item.incrPayAmount).divide(new JsBigDecimal(100), 2).getValue()
            // 渠道名称
            item.tagName = channelOptions.find(tag => tag.value === item.tag).label
            // 累计注册用户
            item.regUserTotal = (() => {
              if (regUserTotal === 0) return `${item.regUserTotal}(0%)`
              return `${item.regUserTotal}(${new JsBigDecimal(item.regUserTotal).divide(new JsBigDecimal(regUserTotal), 2).multiply(new JsBigDecimal(100)).getValue()}%)`
            })()
            // 累计充值金额
            item.payAmountTotal = (() => {
              if (payAmountTotal === 0) return `${item.payAmountTotal}(0%)`
              return `${item.payAmountTotal}(${new JsBigDecimal(item.payAmountTotal).divide(new JsBigDecimal(payAmountTotal), 2).multiply(new JsBigDecimal(100)).getValue()}%)`
            })()
            return item
          })
          /* eslint-disable */
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          this.loading = false
        })
    },
    /**
     * @description 设置渠道趋势对比默认时间
     * */
    setDatePickerDefaultValue() {
      this.datePickerValue = this.getDatePickerDefaultValue()
    },
    getDatePickerDefaultValue() {
      return [new Date(new Date().getTime() - 7 * 3600 * 24 * 1000), new Date(new Date().getTime() - 3600 * 24 * 1000)]
    },
    getRequestTime() {
      if (this.datePickerValue) {
        return {
          beginTime: parseDateTime('y-m-d', this.datePickerValue[0].getTime()),
          endTime: parseDateTime('y-m-d', this.datePickerValue[1].getTime())
        }
      }
      return {
        beginTime: parseDateTime('y-m-d', this.getDatePickerDefaultValue()[0].getTime()),
        endTime: parseDateTime('y-m-d', this.getDatePickerDefaultValue()[1].getTime())
      }
    },
    getFilter() {
      this.showLineDayType = '日'
      this.makeDateStyleList()
      this.getStoreDetail()
      this.getStoreListDetail()
    },
    /**
     * @description 获取渠道列表
     * */
    getStoreListDetail() {
      this.loading = true
      getStoreListDetail(Object.assign(this.getRequestTime(), {
        storeTagList: this.channelValue,
        type: '0' + (Number(this.activeName) + 1)
      }))
        .then(res => {
          if (res.status !== 0) throw res
          /* eslint-disable */
          // 所有渠道标签
          const data = res.data.map(item => {
            if (this.activeName === '3') {
              console.warn(item)
              // 充值金额 分 =》 元
              item.list.map(item => {
                item.number = Number(new JsBigDecimal(item.number).divide(new JsBigDecimal(100), 2).getValue())
                return item
              })
            }
            return item
          })
          this.originStoreDetailList = cloneDeep(data)

          const allStore = data[0].list.map(item => {
            return item.tag
          })
          this.chartData.columns = ['date']
          this.chartData.columns = this.chartData.columns.concat(allStore)
          allStore.forEach(tag => {
            this.chartSettings.labelMap[tag] = this.channelOptions.find(item => item.value === tag).label
          })
          // 渠道数据
          this.parseStoreListDetail(cloneDeep(data))
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          this.loading = false
        })
    },
    parseStoreListDetail(data) {
      this.chartData.rows = []
      if (this.showLineDayType === '日') {
        data.forEach(item => {
          // { 'date': '2020-01-01', OPPO: 500, VIVO: 600, HUAWEI: 700, XIAOMI: 800, APPSTORE: 900 }
          const row = {
            date: item.dateStr
          }
          item.list.forEach(tag => {
            row[tag.tag] = tag.number
          })
          this.chartData.rows.push(row)
        })
      } else if (this.showLineDayType === '周' || this.showLineDayType === '月') {
        const dayArray = []
        data.forEach(item => {
          const row = {
            date: item.dateStr
          }
          item.list.forEach(tag => {
            row[tag.tag] = tag.number
          })
          dayArray.push(row)
        })
        const weekList = []
        const rangeDate = this.showLineDayType === '周' ? this.lineDateStyleList[1].date : this.lineDateStyleList[2].date
        rangeDate.forEach(weekRange => {
          const weekRangeArray = weekRange.split('~')
          weekRangeArray[0] = weekRangeArray[0].replace(/-/g, '')
          weekRangeArray[1] = weekRangeArray[1].replace(/-/g, '')
          // console.log(weekRangeArray) // ["20201213", "20201219"]
          let item = {
            date: weekRange
          }
          item = Object.assign(cloneDeep(dayArray[0]), item) // {date: "2020-12-20~2020-12-26", ios_storte: 1, Huawei: 0, Oppo: 0}
          // 重置为 0
          Object.keys(item).forEach(key => {
            if (key !== 'date') {
              item[key] = 0
            }
          }) // {date: "2020-12-20~2020-12-26", ios_storte: 0, Huawei: 0, Oppo: 0}
          dayArray.forEach((_item, index) => {
            // console.log(_item) //
            // 是否在区间
            if (weekRangeArray[0] <= _item.date.replace(/-/g, '') && weekRangeArray[1] >= _item.date.replace(/-/g, '')) {
              Object.keys(item).forEach(key => {
                if (key !== 'date') {
                  item[key] = _item[key] + item[key]
                }
              })
            }
          })
          weekList.push(item)
        })
        this.chartData.rows = weekList
      }
    },
    /**
     * @description 生成查询 开始时间 和 结束时间 生成 日 周 月 的时间范围
     * */
    makeDateStyleList() {
      let queryDateRange = {
        begin_time: this.getRequestTime().beginTime,
        end_time: this.getRequestTime().endTime
      }
      let begin_time = new Date()
      const begin_timeArr = queryDateRange.begin_time.split('-')
      begin_time.setFullYear(begin_timeArr[0])
      begin_time.setMonth(begin_timeArr[1] - 1)
      begin_time.setDate(begin_timeArr[2])
      begin_time.setHours(0)
      begin_time.setMinutes(0)
      begin_time.setSeconds(0)
      begin_time.setMilliseconds(0)
      queryDateRange.begin_time = begin_time.getTime()
      //
      let end_time = new Date()
      const end_timeArr = queryDateRange.end_time.split('-')
      end_time.setFullYear(end_timeArr[0])
      end_time.setMonth(end_timeArr[1] - 1)
      end_time.setDate(end_timeArr[2])
      end_time.setHours(0)
      end_time.setMinutes(0)
      end_time.setSeconds(0)
      end_time.setMilliseconds(0)
      queryDateRange.end_time = end_time.getTime()
      //

      this.lineDateStyleList = []
      this.lineDateStyleList.push(
        { type: '日', date: [], startDate: parseDateTime('y-m-d', queryDateRange.begin_time), endDate: parseDateTime('y-m-d', queryDateRange.end_time) }
      )
      const weekDate = getWeekRangeTime(queryDateRange.begin_time, queryDateRange.end_time)
      this.lineDateStyleList.push(
        { type: '周', date: weekDate.map(item => {
            return item.startDate + '~' + item.endDate
          }), startDate: weekDate[0].startDate, endDate: weekDate[weekDate.length - 1].endDate }
      )
      const monthDate = getMonthRangeTime(queryDateRange.begin_time, queryDateRange.end_time)
      this.lineDateStyleList.push(
        { type: '月', date: monthDate.map(item => {
            return item.startDate + '~' + item.endDate
          }), startDate: monthDate[0].startDate, endDate: monthDate[monthDate.length - 1].endDate }
      )
      // console.log(JSON.stringify(this.lineDateStyleList, null, 2))
    }
  }
}
</script>

<style scoped lang="scss">
.tabs{
  position: relative;
  .input{
    position: absolute;
    right: 0;
    top: -5px;
  }
}
.filter{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .input{
    margin-left: 6px;
    margin-right: 16px;
  }
}
.channel-line{
  .box{
    border: 1px solid #EAEAEA;
    padding: 20px;
    height: 266px;
    border-radius: 5px;
    margin-bottom: 20px;
    .count-text{
      font-size: 13px;
    }
    .title{
      font-size: 20px;
      color: #454545;
      padding-bottom: 10px;
      border-bottom: 1px solid #f5f5f5;
    }
    .line{
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .line-item:nth-child(1) {
        .line-bo{
          span{
            background-color: #8bc34a;
          }
        }
      }
      .line-item:nth-child(2) {
        .line-bo{
          span{
            background-color: #e3af39;
          }
        }
      }
      .line-item:nth-child(3) {
        .line-bo{
          span{
            background-color: #dceef7;
          }
        }
      }
      .line-item:nth-child(4) {
        .line-bo{
          span{
            background-color: #6a6868;
          }
        }
      }
      .line-item:nth-child(5) {
        .line-bo{
          span{
            background-color: #dfd576;
          }
        }
      }
    }
    .line-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .line-bo{
        height: 140px;
        width: 20px;
        display: flex;
        align-items: flex-end;
        margin-top: 6px;
        span{
          display: flex;
          width: 100%;
          min-height: 1px;
          opacity: .8;
          transition: all 2s;
          &:hover{
            opacity: 1;
            box-shadow: 6px 4px 20px 5px #f1f1f1;
          }
        }
      }
      .text{
        margin-top: 10px;
        font-size: 12px;
        opacity: .7;
      }
    }
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
    }
  }
}
</style>
