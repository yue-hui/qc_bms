<template>
  <div class="page gelei-content">
    <div class="card-box" style="background: none;box-shadow: none;padding-left: 0;padding-right: 0;padding-top: 6px;padding-bottom: 1px">
      <div class="filter" style="position: relative;">
        <div class="label">
          <span>渠道选择：</span>
        </div>
        <div class="input">
          <el-select
            v-model="channelValue"
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
        <div class="label">
          <span>查询时间：</span>
        </div>
        <div class="input">
          <el-date-picker
            v-model="datePickerValue"
            :picker-options="pickerOptions"
            type="daterange"
            size="small"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="input">
          <el-button size="mini" type="primary" @click="getFilter">查询</el-button>
        </div>
        <el-radio-group v-model="showLineDayType" style="position: absolute;right: 0;" size="small" @change="lineDayTypeShowChange">
          <el-radio-button label="日"/>
          <el-radio-button :disabled="disabledWeekFilter" label="周"/>
          <el-radio-button :disabled="disabledMonthFilter" label="月"/>
        </el-radio-group>
      </div>
    </div>
    <div v-loading="loading" class="card-box" style="padding-bottom: 24px">
      <div class="title-area">
        <span class="title">明细数据</span>
        <div class="download">
          <el-button
            pid=""
            class="details-tab"
            size="mini"
            type="success"
            @click="download">导出
            <svg-icon icon-class="download" />
          </el-button>
        </div>
      </div>
      <div class="table-content table-block">
        <el-table :data="channelTableData" stripe size="mini" style="width: 100%">
          <el-table-column align="center" label="时间" prop="dateTime" />
          <el-table-column align="center" label="新增注册用户" prop="incrRegUser" />
          <el-table-column align="center" label="新增绑定用户" prop="incrBindUser" />
          <el-table-column align="center" label="绑定转化率" prop="bindConversion" />
          <el-table-column align="center" label="新增付费用户" prop="incrPayUser" />
          <el-table-column align="center" label="付费转化率" prop="payConversion" />
          <el-table-column align="center" label="充值金额（元）" prop="incrPayAmount" />
          <el-table-column align="center" label="累计注册用户" prop="regUserTotal" />
          <el-table-column align="center" label="累计绑定用户" prop="bindUserTotal" />
          <el-table-column align="center" label="累计付费用户" prop="payUserTotal" />
          <el-table-column align="center" label="累计充值金额（元）" prop="payAmountTotal" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getStoreAllTags, getStoreDetailList } from '../../api/interactive'
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
      datePickerValue: null,
      showLineDayType: '日',
      channelValue: '',
      channelOptions: [],
      channelTableData: [],
      originChannelTableData: []
    }
  },
  computed: {
    disabledWeekFilter() {
      // 大于 7 天才展示周
      const requestTime = this.getRequestTime()
      return Math.ceil((requestTime._endTime - requestTime._beginTime) / (24 * 3600 * 1000)) + 1 <= 7
    },
    disabledMonthFilter() {
      // 大于 31 天才展示周
      const requestTime = this.getRequestTime()
      return Math.ceil((requestTime._endTime - requestTime._beginTime) / (24 * 3600 * 1000)) + 1 <= 31
    }
  },
  mounted() {
    this.channelValue = this.$route.query.tag
    this.setDatePickerDefaultValue()
    this.makeDateStyleList()
    this.init()
  },
  methods: {
    /**
     * @description 条形统计图切换 日 周 月
     * */
    lineDayTypeShowChange(e) {
      this.parseStoreListDetail(cloneDeep(this.originChannelTableData))
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
          this.getStoreDetailList()
        })
        .catch(() => {})
        .finally(() => {})
    },
    /**
     * @description 获取所有渠道数据及占比
     * */
    getStoreDetailList() {
      this.loading = true
      getStoreDetailList(Object.assign({
        storeTag: this.channelValue
      }, this.getRequestTime(), {
        // beginTime: this.getRequestTime()._beginTime,
        // endTime: this.getRequestTime()._endTime
      }))
        .then(res => {
          if (res.status !== 0) throw res
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
            return item
          })
          // this.channelTableData = this.channelTableData.reverse()
          this.originChannelTableData = cloneDeep(this.channelTableData)
        })
        .catch((e) => {
          this.$message.error(e.message)
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
      return [new Date(new Date().getTime() - 31 * 3600 * 24 * 1000), new Date(new Date().getTime())]
    },
    getRequestTime() {
      if (this.datePickerValue) {
        return {
          beginTime: parseDateTime('y-m-d', this.datePickerValue[0].getTime()),
          _beginTime: this.datePickerValue[0].getTime(),
          endTime: parseDateTime('y-m-d', this.datePickerValue[1].getTime()),
          _endTime: this.datePickerValue[1].getTime()
        }
      }
      return {
        beginTime: parseDateTime('y-m-d', this.getDatePickerDefaultValue()[0].getTime()),
        _beginTime: this.getDatePickerDefaultValue()[0].getTime(),
        endTime: parseDateTime('y-m-d', this.getDatePickerDefaultValue()[1].getTime()),
        _endTime: this.getDatePickerDefaultValue()[1].getTime()
      }
    },
    getFilter() {
      this.showLineDayType = '日'
      this.makeDateStyleList()
      this.getStoreDetailList()
    },
    /**
     * @description 生成查询 开始时间 和 结束时间 生成 日 周 月 的时间范围
     * */
    makeDateStyleList() {
      const queryDateRange = {
        begin_time: this.getRequestTime().beginTime,
        end_time: this.getRequestTime().endTime
      }
      const begin_time = new Date()
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
      const end_time = new Date()
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
    },
    /**
     * @description 导出
     * */
    download() {
      import('@/utils/Export2Excel').then(excel => {
        const header = [
          '时间', '新增注册用户', '新增绑定用户',
          '绑定转化率', '新增付费用户', '付费转化率', '充值金额（元）',
          '累计注册用户', '累计绑定用户', '累计付费用户', '累计充值金额（元）']
        const data = this.channelTableData.map(item => {
          return [item.dateTime,
            item.incrRegUser,
            item.incrBindUser,
            item.bindConversion,
            item.incrPayUser,
            item.payConversion,
            item.incrPayAmount,
            item.regUserTotal,
            item.bindUserTotal,
            item.payUserTotal,
            item.payAmountTotal]
        })
        const time = this.getRequestTime()
        data.push([])
        const channelName = this.channelOptions.find(item => item.value === this.channelValue).label
        data.push([
          '数据统计渠道：',
          channelName
        ])
        data.push([
          '数据统计时间：',
          time.beginTime + ' 至 ' + time.endTime
        ])
        data.push([
          '导出时间：',
          parseDateTime('y-m-d h:i')
        ])
        const options = {
          header,
          data,
          filename: channelName + `_渠道明细数据_${time.beginTime}_${time.endTime}`,
          autoWidth: true,
          bookType: 'xlsx'
        }
        excel.export_json_to_excel(options)
      })
    },
    parseStoreListDetail(data) {
      this.channelTableData = []
      if (this.showLineDayType === '日') {
        this.channelTableData = cloneDeep(this.originChannelTableData)
      } else if (this.showLineDayType === '周' || this.showLineDayType === '月') {
        const weekList = []
        let rangeDate = this.showLineDayType === '周' ? cloneDeep(this.lineDateStyleList[1].date) : cloneDeep(this.lineDateStyleList[2].date)
        rangeDate = rangeDate.reverse()
        rangeDate.forEach(weekRange => {
          const weekRangeArray = weekRange.split('~')
          weekRangeArray[0] = weekRangeArray[0].replace(/-/g, '')
          weekRangeArray[1] = weekRangeArray[1].replace(/-/g, '')
          const item = Object.assign(cloneDeep(data[0]), { dateTime: weekRange })
          // 重置为 0
          Object.keys(item).forEach(key => {
            if (!['dateTime', 'bindConversion', 'payConversion'].includes(key)) {
              item[key] = 0
            }
          })
          data.forEach((_item, index) => {
            // console.log(_item) //
            // 是否在区间
            if (weekRangeArray[0] <= _item.dateTime.replace(/-/g, '') && weekRangeArray[1] >= _item.dateTime.replace(/-/g, '')) {
              Object.keys(item).forEach(key => {
                if (!['dateTime', 'bindConversion', 'payConversion'].includes(key)) {
                  item[key] = new JsBigDecimal(_item[key]).add(new JsBigDecimal(item[key])).getValue()
                }
              })
            }
          })
          // 绑定转化率 = 新增绑定 / 新增注册
          item.bindConversion = (() => {
            if (Number(item.incrRegUser) === 0) return '0%'
            return new JsBigDecimal(item.incrBindUser)
              .divide(new JsBigDecimal(item.incrRegUser), 4)
              .multiply(new JsBigDecimal(100)).getValue() + '%'
          })()
          // 付费转化率 = 新增付费 / 新增注册
          item.payConversion = (() => {
            if (Number(item.incrRegUser) === 0) return '0%'
            return new JsBigDecimal(item.incrPayUser)
              .divide(new JsBigDecimal(item.incrRegUser), 4)
              .multiply(new JsBigDecimal(100)).getValue() + '%'
          })()
          // 以下四个字段在周、月维度时获取区间最后一天的数据
          // 累计注册用户
          item.regUserTotal = (() => {
            for (let i = 0; i < data.length; i++) {
              if (weekRange.split('~')[1] === data[i].dateTime) {
                return data[i].regUserTotal
              }
            }
            return '-'
          })()
          // 累计绑定用户
          item.bindUserTotal = (() => {
            for (let i = 0; i < data.length; i++) {
              if (weekRange.split('~')[1] === data[i].dateTime) {
                return data[i].bindUserTotal
              }
            }
            return '-'
          })()
          // 累计付费用户
          item.payUserTotal = (() => {
            for (let i = 0; i < data.length; i++) {
              if (weekRange.split('~')[1] === data[i].dateTime) {
                return data[i].payUserTotal
              }
            }
            return '-'
          })()
          // 累计充值金额（元）
          item.payAmountTotal = (() => {
            for (let i = 0; i < data.length; i++) {
              if (weekRange.split('~')[1] === data[i].dateTime) {
                return data[i].payAmountTotal
              }
            }
            return '-'
          })()
          console.log()
          weekList.push(item)
        })
        this.channelTableData = weekList
      }
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
