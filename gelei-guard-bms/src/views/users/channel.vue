<template>
  <div class="page gelei-content">
    <div class="card-box">
      <div class="title-area"><span class="title">前五渠道数据</span></div>
      <div class="channel-line">
        <el-row :gutter="12">
          <el-col v-for="item in top5Data" :key="item.title" :md="8" :sm="12" :lg="4">
            <div class="box">
              <div class="title">
                <span>{{ item.title }}</span>
              </div>
              <div class="line">
                <div v-for="countItem in item.list" :key="countItem.index" class="line-item">
                  <span class="count-text">{{ countItem.count }}</span>
                  <span class="line-bo">
                    <span :style="{ height: countItem.count / item.max * 100 + '%' }" />
                  </span>
                  <span class="text">
                    {{ countItem.name }}
                  </span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card-box">
      <div class="title-area"><span class="title">渠道趋势对比</span></div>
      <div class="filter">
        <div class="label">
          <span>查询时间：</span>
        </div>
        <div class="input">
          <el-date-picker
            v-model="datePickerValue"
            type="daterange"
            size="medium"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="label">
          <span>查看维度：</span>
        </div>
        <div class="input">
          <el-radio-group v-model="showLineDayType" size="small" @change="lineDayTypeShowChange">
            <el-radio-button label="日"/>
            <el-radio-button label="周"/>
            <el-radio-button label="月"/>
          </el-radio-group>
        </div>
        <div class="label">
          <span>渠道选择：</span>
        </div>
        <div class="input">
          <el-select
            v-model="channelValue"
            multiple
            size="medium"
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
      </div>
      <el-tabs v-model="activeName" @tab-click="tabHandleClick">
        <el-tab-pane label="新增注册用户" name="0" />
        <el-tab-pane label="新增绑定用户" name="1" />
        <el-tab-pane label="新增付费用户" name="2" />
        <el-tab-pane label="充值金额" name="3" />
      </el-tabs>
      <ve-line :rel="1" :data="chartData" :settings="chartSettings"/>
    </div>
    <div class="card-box" style="padding-bottom: 24px">
      <div class="title-area"><span class="title">所有渠道数据</span></div>
      <el-table :data="channelTableData" stripe size="mini" style="width: 100%">
        <el-table-column align="center" label="渠道名称" prop="f1" />
        <el-table-column align="center" label="新增注册用户" prop="f2" />
        <el-table-column align="center" label="新增绑定用户" prop="f3" />
        <el-table-column align="center" label="绑定转化率" prop="f4" />
        <el-table-column align="center" label="新增付费用户" prop="f5" />
        <el-table-column align="center" label="付费转化率" prop="f6" />
        <el-table-column align="center" label="充值金额" prop="f7" />
        <el-table-column align="center" label="累计注册用户" prop="f7" />
        <el-table-column align="center" label="累计充值金额" prop="f7" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      top5Data: [
        {
          title: '注册用户总数',
          max: 500,
          list: [
            { count: 500, name: 'OPPO' },
            { count: 400, name: 'VIVO' },
            { count: 300, name: '华为' },
            { count: 200, name: '小米' },
            { count: 100, name: '百度' }
          ]
        },
        {
          title: '绑定用户数',
          max: 500,
          list: [
            { count: 500, name: 'OPPO' },
            { count: 400, name: 'VIVO' },
            { count: 300, name: '华为' },
            { count: 200, name: '小米' },
            { count: 400, name: '百度' }
          ]
        },
        {
          title: '绑定转化率',
          max: 700,
          list: [
            { count: 500, name: 'OPPO' },
            { count: 700, name: 'VIVO' },
            { count: 55, name: '华为' },
            { count: 22, name: '小米' },
            { count: 100, name: '百度' }
          ]
        },
        {
          title: '付费用户总数',
          max: 541,
          list: [
            { count: 500, name: 'OPPO' },
            { count: 541, name: 'VIVO' },
            { count: 300, name: '华为' },
            { count: 200, name: '小米' },
            { count: 100, name: '百度' }
          ]
        },
        {
          title: '付费转化率',
          max: 500,
          list: [
            { count: 500, name: 'OPPO' },
            { count: 400, name: 'VIVO' },
            { count: 300, name: '华为' },
            { count: 200, name: '小米' },
            { count: 100, name: '百度' }
          ]
        },
        {
          title: '充值金额',
          max: 500,
          list: [
            { count: 500, name: 'OPPO' },
            { count: 400, name: 'VIVO' },
            { count: 300, name: '华为' },
            { count: 200, name: '小米' },
            { count: 100, name: '百度' }
          ]
        }
      ],
      activeName: '0',
      datePickerValue: null,
      showLineDayType: '日',
      channelValue: [],
      channelOptions: [
        { label: 'OPPO', value: 1 },
        { label: 'VIVO', value: 2 },
        { label: '华为商店', value: 3 },
        { label: 'APP store', value: 4 }
      ],
      chartData: {
        columns: ['date', 'OPPO', 'VIVO', 'XIAOMI', 'HUAWEI', 'APPSTORE'],
        rows: [
          { 'date': '2020-01-01', OPPO: 500, VIVO: 600, HUAWEI: 700, XIAOMI: 800, APPSTORE: 900 },
          { 'date': '2020-01-02', OPPO: 200, VIVO: 300, HUAWEI: 700, XIAOMI: 400, APPSTORE: 500 },
          { 'date': '2020-01-03', OPPO: 600, VIVO: 800, HUAWEI: 1100, XIAOMI: 100, APPSTORE: 900 },
          { 'date': '2020-01-04', OPPO: 500, VIVO: 600, HUAWEI: 700, XIAOMI: 800, APPSTORE: 900 },
          { 'date': '2020-01-05', OPPO: 78, VIVO: 96, HUAWEI: 700, XIAOMI: 400, APPSTORE: 453 },
          { 'date': '2020-01-06', OPPO: 25, VIVO: 800, HUAWEI: 1100, XIAOMI: 100, APPSTORE: 900 },
          { 'date': '2020-01-07', OPPO: 500, VIVO: 600, HUAWEI: 700, XIAOMI: 78, APPSTORE: 45 },
          { 'date': '2020-01-08', OPPO: 200, VIVO: 300, HUAWEI: 25, XIAOMI: 400, APPSTORE: 500 },
          { 'date': '2020-01-09', OPPO: 600, VIVO: 36, HUAWEI: 1100, XIAOMI: 100, APPSTORE: 900 },
          { 'date': '2020-01-10', OPPO: 500, VIVO: 69, HUAWEI: 700, XIAOMI: 25, APPSTORE: 900 },
          { 'date': '2020-01-11', OPPO: 200, VIVO: 300, HUAWEI: 700, XIAOMI: 400, APPSTORE: 453 },
          { 'date': '2020-01-12', OPPO: 600, VIVO: 800, HUAWEI: 1100, XIAOMI: 100, APPSTORE: 900 },
          { 'date': '2020-01-13', OPPO: 500, VIVO: 600, HUAWEI: 700, XIAOMI: 25, APPSTORE: 900 },
          { 'date': '2020-01-14', OPPO: 200, VIVO: 89, HUAWEI: 700, XIAOMI: 400, APPSTORE: 500 },
          { 'date': '2020-01-15', OPPO: 600, VIVO: 87, HUAWEI: 1100, XIAOMI: 100, APPSTORE: 453 },
          { 'date': '2020-01-16', OPPO: 500, VIVO: 47, HUAWEI: 700, XIAOMI: 800, APPSTORE: 900 },
          { 'date': '2020-01-17', OPPO: 200, VIVO: 25, HUAWEI: 700, XIAOMI: 400, APPSTORE: 500 },
          { 'date': '2020-01-18', OPPO: 600, VIVO: 200, HUAWEI: 1100, XIAOMI: 100, APPSTORE: 683 },
          { 'date': '2020-01-19', OPPO: 500, VIVO: 600, HUAWEI: 700, XIAOMI: 800, APPSTORE: 900 },
          { 'date': '2020-01-20', OPPO: 200, VIVO: 300, HUAWEI: 700, XIAOMI: 400, APPSTORE: 453 },
          { 'date': '2020-01-21', OPPO: 600, VIVO: 800, HUAWEI: 1100, XIAOMI: 100, APPSTORE: 900 },
          { 'date': '2020-01-22', OPPO: 500, VIVO: 600, HUAWEI: 700, XIAOMI: 800, APPSTORE: 2112 },
          { 'date': '2020-01-23', OPPO: 200, VIVO: 300, HUAWEI: 700, XIAOMI: 400, APPSTORE: 322 },
          { 'date': '2020-01-24', OPPO: 600, VIVO: 800, HUAWEI: 1100, XIAOMI: 100, APPSTORE: 900 },
          { 'date': '2020-01-25', OPPO: 500, VIVO: 600, HUAWEI: 700, XIAOMI: 800, APPSTORE: 900 },
          { 'date': '2020-01-26', OPPO: 200, VIVO: 300, HUAWEI: 700, XIAOMI: 400, APPSTORE: 500 },
          { 'date': '2020-01-27', OPPO: 600, VIVO: 800, HUAWEI: 1100, XIAOMI: 100, APPSTORE: 324 },
          { 'date': '2020-01-28', OPPO: 1740, VIVO: 300, HUAWEI: 700, XIAOMI: 400, APPSTORE: 500 },
          { 'date': '2020-01-29', OPPO: 1600, VIVO: 800, HUAWEI: 1100, XIAOMI: 100, APPSTORE: 900 },
          { 'date': '2020-01-30', OPPO: 1800, VIVO: 300, HUAWEI: 700, XIAOMI: 400, APPSTORE: 500 },
          { 'date': '2020-01-31', OPPO: 2000, VIVO: 800, HUAWEI: 1100, XIAOMI: 100, APPSTORE: 900 }
        ]
      },
      chartSettings: {
        labelMap: {
          date: '日期',
          OPPO: 'OPPO应用商店',
          VIVO: 'VIVO应用商店',
          HUAWEI: '华为应用商店',
          XIAOMI: '小米应用商店',
          APPSTORE: '苹果应用商店'
        }
      },
      channelTableData: [
        { date: '2020-01-01', f1: 'OPPO应用商店', f2: 234, f3: 345, f4: 345, f5: 345, f6: 345, f7: 345 },
        { date: '2020-01-02', f1: 'VIVO应用商店', f2: 234, f3: 345, f4: 345, f5: 345, f6: 345, f7: 345 },
        { date: '2020-01-03', f1: '华为应用商店', f2: 234, f3: 345, f4: 345, f5: 345, f6: 345, f7: 345 },
        { date: '2020-01-04', f1: '小米应用商店', f2: 234, f3: 345, f4: 345, f5: 345, f6: 345, f7: 345 },
        { date: '2020-01-05', f1: '苹果应用商店', f2: 234, f3: 345, f4: 345, f5: 345, f6: 345, f7: 345 },
        { date: '2020-01-06', f1: 'OPPO', f2: 234, f3: 345, f4: 345, f5: 345, f6: 345, f7: 345 },
        { date: '2020-01-07', f1: 'OPPO', f2: 234, f3: 345, f4: 345, f5: 345, f6: 345, f7: 345 },
        { date: '2020-01-08', f1: 'OPPO', f2: 234, f3: 345, f4: 345, f5: 345, f6: 345, f7: 345 },
        { date: '2020-01-09', f1: 'OPPO', f2: 234, f3: 345, f4: 345, f5: 345, f6: 345, f7: 345 },
        { date: '2020-01-10', f1: 'OPPO', f2: 234, f3: 345, f4: 345, f5: 345, f6: 345, f7: 345 },
        { date: '2020-01-11', f1: 'OPPO', f2: 234, f3: 345, f4: 345, f5: 345, f6: 345, f7: 345 },
        { date: '2020-01-12', f1: 'OPPO', f2: 234, f3: 345, f4: 345, f5: 345, f6: 345, f7: 345 }
      ]
    }
  },
  methods: {
    /**
     * @description 渠道趋势对比折线图类型切换
     * */
    tabHandleClick(tab) {
      console.log(tab.name)
    },
    /**
     * @description 条形统计图切换 日 周 月
     * */
    lineDayTypeShowChange(e) {
      this.updateLineChart()
    }
  }
}
</script>

<style scoped lang="scss">
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
          height: 50%;
          opacity: .8;
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
