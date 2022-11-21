<template>
  <div class="group-action-time-page" style="">
    <div style="position: relative;padding: 20px 60px;" class="container time-con">
      <!---->
      <div class="time-select">
        <div class="header">
          <div v-for="item in day" :key="item" class="item" :class="{active: activeDay === item}" @click="changeActiveDay(item)">
            <span>{{ item }}</span>
          </div>
        </div>
        <div class="body" v-if="activeDayTime.length>0">
          <div v-for="hour in 24" :key="hour" class="item">
            <div  class="number" :h="hour">
              <span :class="{'text-white': hourBlockActiveLength[hour - 1] > 1}" style="">{{ hour - 1 }}</span>
            </div>
            <div class="border" />
            <mergeTime
              v-for="number in 12"
              :ref="'background-block' + (hour * 60 - (60 - 5 * number))"
              :key="number"
              :index="number"
              :active-day-time="copyToTime"
              :style="{left: (number - 1) * 7 + 'px'}"
              :m="hour * 60 - (60 - 5 * number)"
              :h="hour"
              :time="hour - 1 + ':' + ((5 * number) - 5)"
              :_time="hour - 1 + ':' + ((5 * number) - 5)"
              class="bb-color"
            />
          </div>
        </div>
        <div class="notDayTime" v-if="activeDayTime.length==0">
           <img src="../../../assets/imgs/img_kongzhuangtai_quesheng@2x.png" alt="">
            <p>本日未设置时间计划，设备自由可用喔</p>
        </div>
      </div>
      <!---->
      <div class="day-time" style="width: 530px">
        <div v-for="(item,index) in activeDayTime" :key="index" style="margin-bottom: 10px;margin-right: 9px" class="item">
          <span>{{ item }}</span>
        </div>
      </div>
        <div class="nowDayhasTime" v-if="activeDayTime.length>0">{{activeDay}}屏幕可用时长: <span>{{time.rule_time.length>0&&getDayTime(time.rule_time,activeIndex).length>0?showTime(getDayTime(time.rule_time,activeIndex)[0].enabled_time):'24小时'}}</span> </div>
        <div class="hasTime" style="width: 900px" v-if="activeDayTime.length>0">
        <div class="time_item" v-if="nowIndex==activeIndex&&notimePlan==0">当天剩余可用<span>{{timeH==0&&timeM==0?0+'分钟':timeH>0?timeH+'小时':''}}{{timeM>0?timeM+'分钟':''}}</span></div>
        <div class="time_item" v-if="nowIndex==activeIndex&&notimePlan!=0">当天剩余可用<span>{{notimePlan}}</span></div>
        <div class="time_item" v-if="nowIndex>activeIndex">当天剩余可用 <span>0分钟</span></div>
        <div class="time_item" v-if="nowIndex<activeIndex">当天剩余可用 <span>{{time.rule_time.length>0&&getDayTime(time.rule_time,activeIndex).length>0?showTime(getDayTime(time.rule_time,activeIndex)[0].enabled_time):'24小时'}}</span></div>
        <div class="time_item">当天已用 <span>{{nowIndex==activeIndex?showTime(time.day_of_week_used_time[idx],true):showTime(time.day_of_week_used_time[activeIndex-1],true)}}</span></div>
        <div class="time_item">今日屏幕可用 <span>{{time.rule_time.length>0&&getDayTime(time.rule_time,activeIndex).length>0?showTime(getDayTime(time.rule_time,activeIndex)[0].enabled_time):'24小时'}}</span></div>
    </div>
    </div>
  <div  v-if="ruleTimePlanB&&ruleTimePlanB.length>0&&device_type!='PC'">
    <el-card class="box-card parent-card-block gg-user-details-with-all standby_time">
        <div slot="header" class="clearfix-header" style="display: flex;justify-content: space-between">
          <span>备用时间</span>
        </div>
      <div class="card-block-body">
       <div class="card-block-body order-list" style="padding:20px 30px ">
        <el-table :data="ruleTimePlanB" style="width: 100%;line-height:40px;border:1px solid #F1F1F1"> 
        <el-table-column type="expand">
         <template slot-scope="props">
          <div class="item" v-for="(item,index) in props.row.batch_list">
               <div class="week">{{day[item.what_day-1]}} </div>
               <div class="day">{{showTime(item.enabled_time)}}/天</div> 
               <div class="time" v-for="(time,i) in changeTimeTab(item.rule_time_fragment)">{{time}}</div> 
          </div>
         </template>
        </el-table-column>
        <el-table-column label="计划名称" prop="batch_name"></el-table-column>
        <el-table-column label="每周可用时长" prop="weekly_time" :formatter="timerFormat" ></el-table-column>
        <el-table-column label="" prop="enabled"> 
           <template slot-scope="scoped">
             <div>{{scoped.row.enabled==1?'生效中':'未启用'}}</div>
            </template>
        </el-table-column>
       </el-table>
      </div>
       </div>
     </el-card>
    </div>
  </div>
</template>

<script>
import timeUtils from './merge-time.util'
import { cloneDeep,isEmpty } from './utilt'
import mergeTime from './merge-time'
const day = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
export default {
  components: {
    mergeTime
  },
  props: {
    actionType: {
      type: String,
      default: ''
    },
   time: {},
   type:'',
   device_type:'',
   ruleTimePlanB:[],
   deviceUseInfo:{},
   controlType:{
      type: Boolean,
      default: false
   } 
  },
  data() {
    return {
      day: day,
      // 当前选中日
      activeDay: (() => {
        let index = new Date().getDay() - 1
        if (index === -1) {
          index = 6
        }
        return day[index]
      })(),
      // 当前选中日的可是时间
      // activeDayTime: ['23:00-23:05', '23:20-23:30'],
      activeDayTime: [],
      // 每个小时段里面的选中块数
      hourBlockActiveLength: [],
      timeH:0,
      timeM:0,
      notimePlan:0,
      dayUseTime:'',
      surplus_used_time:'',
      idx:(()=>{
      let index = new Date().getDay() - 1;
        if (index === -1) {
          index = 6;
        }
        return index
      })(),
      nowIndex:(()=>{
         let index = new Date().getDay()
        if(index==0){
          index=7
         }
         return index
      })(),
      activeIndex:(()=>{
         let index = new Date().getDay()
        if(index==0){
          index=7
         }
         return index
      })()
    }
  },
  watch: {
    time:{
       handler(newVal,oldVal) {
         this.time=newVal
      },
      deep: true
    },
    // 周几发生改变
    activeDay() {
      let index =this.getActiveDayIndex()
       let activeDay=this.data.filter(item=>{
            return item.what_day==index
         })
       if(activeDay.length>0){
         let activeDayTime=activeDay[0].rule_time_fragment
         if (activeDayTime&&activeDayTime.length>0) {
           this.activeDayTime=activeDayTime.map(item=>{
             item.begin_time=item.begin_time.slice(0,5)
             item.end_time=item.end_time.slice(0,5)
             return item.begin_time+'-'+item.end_time
           })
           this.copyToTime=cloneDeep(this.activeDayTime)
           if (this.copyToTime[0]=='00:00-00:00') {
               this.copyToTime=[]
           }
         }else{
           this.activeDayTime=[]
           this.copyToTime=[]
         }
       }else{
           this.activeDayTime=[]
           this.copyToTime=[]
       }
    },
    // 当前时间发生改变
    activeDayTime: {
      handler(val) {
        // 设置小时白色字体
        this.setBlockWhiteTextColor()
      },
      deep: true
    },
  },
  mounted() {
    if (this.time) {
       let times=this.time.rule_time
        if (times.length==0) {
           times=[
          { 'what_day': 1, 'rule_time_fragment': [] },
          { 'what_day': 2, 'rule_time_fragment': [] },
          { 'what_day': 3, 'rule_time_fragment': [] },
          { 'what_day': 4, 'rule_time_fragment': [] },
          { 'what_day': 5, 'rule_time_fragment': [] },
          { 'what_day': 6, 'rule_time_fragment': [] },
          { 'what_day': 7, 'rule_time_fragment': [] }
           ]
         }
         let index =this.getActiveDayIndex()
         this.data=times
          if (this.data.length<6) {
           let alltime=[
          { 'what_day': 1, 'rule_time_fragment': [] },
          { 'what_day': 2, 'rule_time_fragment': [] },
          { 'what_day': 3, 'rule_time_fragment': [] },
          { 'what_day': 4, 'rule_time_fragment': [] },
          { 'what_day': 5, 'rule_time_fragment': [] },
          { 'what_day': 6, 'rule_time_fragment': [] },
          { 'what_day': 7, 'rule_time_fragment': [] }
           ]  
        }
         let activeDay=this.data.filter(item=>{
            return item.what_day==index
         })
         if(activeDay.length>0){
         let activeDayTime=activeDay[0].rule_time_fragment
         if (activeDayTime&&activeDayTime.length>0) {
           this.activeDayTime=activeDayTime.map(item=>{
             item.begin_time=item.begin_time.slice(0,5)
             item.end_time=item.end_time.slice(0,5)
             return item.begin_time+'-'+item.end_time
           })
           this.copyToTime=cloneDeep(this.activeDayTime)
           if (this.copyToTime[0]=='00:00-00:00') {
               this.copyToTime=[]
           }
         }else{
           this.activeDayTime=[]
           this.copyToTime=[]
         }
       }else{
           this.activeDayTime=[]
           this.copyToTime=[]
       }
    }
    if (this.type!=3) {
     this.getNowHMS()
    }
    this.setBlockWhiteTextColor()
  },
  methods: {
    /**
     * @description 从时间表上选择一个时间
     * @param number {Number}
     * */
    selectTimeNumber(number) {
      if (this.actionType === 'detail'|| this.controlType) return
      // 判断当前块是否已经选满 选满则放弃本次选择 并且切割当前已经选择的时间
      if (this.hourBlockActiveLength[number + 24] === 12) {
        this.clearHourOneTime(number)
      } else {
        // 单击一次选择
        const maxTime = (number + 1) + ':00'
        // 最大时间为 24:00
        if (maxTime === '24:00') {
          // maxTime = '23:59'
        }
        const newSelectTime = number + ':00-' + maxTime // 22:00-22:00
        // --------------------------- 先合并
        const activeDayTime = this.activeDayTime = timeUtils.mergeTimeRangeString(newSelectTime, this.activeDayTime)
        // 当前块是否已经存在选择，不存在则添加
        if (this.hourBlockActiveLength[number + 24] === 0) {
          this.activeDayTime = activeDayTime
        } else {
          // 只要存在 一个切片选择 则认为要清除当前时段
          this.clearHourOneTime(number)
        }
      }
      this.$nextTick(() => {
        this.syncAllTime()
      })
    },
    /**
     * @description 通过背景色块来判断是否显示白色数字
     * */
    async setBlockWhiteTextColor() {
      try {
        for (let i = 0; i < 48; i++) {
          this.$set(this.hourBlockActiveLength, i, 0)
        }
        await this.$nextTick()
        Object.keys(this.$refs).forEach(item => {
          const refVm = this.$refs[item][0]
          // 中间6-7的时候变白色字体
          if (refVm.bgActive && [6, 7].includes(refVm.$attrs.index)) {
            const index = refVm.$attrs.h - 1
            this.$set(this.hourBlockActiveLength, index,
              this.hourBlockActiveLength[index] + 1)
          }
          if (refVm.bgActive) {
            const index = refVm.$attrs.h - 1 + 24
            this.$set(this.hourBlockActiveLength, index,
              this.hourBlockActiveLength[index] + 1)
          }
        })
        // console.log(this.hourBlockActiveLength)
        // eslint-disable-next-line no-empty
      } catch (e) {
      }
    },

    /**
     * @description 获取当前天数的索引
     * @return {Number} 1-7：周一 - 周日
     * */
    getActiveDayIndex() {
      return this.day.indexOf(this.activeDay) + 1
    },

   /**
     * @description 时间转换
     * */
    timerFormat(_,__, time) { 
      const val= this.showTime(time)
      return val
    },
    changeActiveDay(item){
      this.activeDay=item
      this.activeIndex=this.getActiveDayIndex()
    },
    //当前时间-判断是否在当前时间段-获取剩余时分秒
  getNowHMS(){
   let time= this.getDayTime(this.time.rule_time,this.nowIndex)[0]
   if (time) {
    time=time.rule_time_fragment
    let date=new Date()
    let h=date.getHours()
    let m=date.getMinutes()
    let index=''
    time.forEach((item,idx )=> {
       let end_time_h=item.end_time.slice(0,2)
        end_time_h=end_time_h.slice(0,1)==0?end_time_h.slice(1,2):end_time_h
       if (h>end_time_h) {
          index=idx
       }
        return index
    });
    time=index==''?time:time.slice(index+1)
    let timeMap=time[0]||{}
     if (timeMap) {
    let end_time_h=timeMap.end_time.slice(0,2)
     end_time_h=end_time_h.slice(0,1)==0?end_time_h.slice(1,2):end_time_h
    let end_time_m=timeMap.end_time.slice(3,5)
    end_time_m=end_time_m.slice(3,4)==0?end_time_m.slice(4,5):end_time_m
  
    let begin_time_h=timeMap.begin_time.slice(0,2)
      begin_time_h=begin_time_h.slice(0,1)==0?begin_time_h.slice(1,2):begin_time_h
      
    let begin_time_m=timeMap.begin_time.slice(3,5)
      begin_time_m=begin_time_h.slice(3,4)==0?begin_time_m.slice(4,5):begin_time_m
     let time_h=0
     let time_m=0
     if (h<begin_time_h) {
       time_h=(end_time_h==0?24:end_time_h)-begin_time_h
     }else if (h==begin_time_h) { 
       time_h=(end_time_h==0?24:end_time_h)-h-1
       time_m=(end_time_m==0?60:end_time_m)-m
     }else if (h==end_time_h) { 
       time_h=0
       time_m=0
     } else if (h>begin_time_h&&h<end_time_h) {
       time_h=(end_time_h==0?24:end_time_h)-h-1
       time_m=(end_time_m==0?60:end_time_m)-m
     }else if(h>end_time_h){
      time_h=0
      time_m=0
     }else{
      time_h=(end_time_h==0?24:end_time_h)-h
      time_m=(end_time_m==0?60:end_time_m)-m
     }
     time=time.slice(1)
      let timeRest= time.map((item,index) => {
      let end_time_h=item.end_time.slice(0,2)
      end_time_h=end_time_h.slice(0,1)==0?end_time_h.slice(1,2):end_time_h
      
      let end_time_m=item.end_time.slice(3,5)
      end_time_m=end_time_m.slice(3,4)==0?end_time_m.slice(4,5):end_time_m

      let begin_time_h=item.begin_time.slice(0,2)
      begin_time_h=begin_time_h.slice(0,1)==0?begin_time_h.slice(1,2):begin_time_h
      
      let begin_time_m=item.begin_time.slice(3,5)
      begin_time_m=begin_time_h.slice(3,4)==0?begin_time_m.slice(4,5):begin_time_m
      item.h=end_time_h-begin_time_h,
      item.m=end_time_m-begin_time_m
      return item
    })
    let obj={
      restH:0,
      restM:0
    }
    timeRest.forEach(item=>{
       obj.restH+=item.h
       obj.restM+=item.m
       return obj 
    })
   this.timeH=time_h+obj.restH
   this.timeM=time_m+obj.restM
   if(this.nowIndex==this.activeIndex&&this.getDayTime(this.time.rule_time,this.activeIndex).length>0){
      let has_timeH=this.timeH>0?Number(this.timeH)*3600:0
      let has_timeM=this.timeM>0?Number(this.timeM)*60:0
      let has_time=has_timeH+has_timeM
      let val=this.getDayTime(this.time.rule_time,this.activeIndex)[0].enabled_time
      if (has_time>val) {
         if (val<60) {
        if (val==0) {
         this.timeH=0
         this.timeM=0
        }else{
         this.timeH=0
         this.timeM=1
        }
      }else{
        let min_total=Math.floor(val/60) //分钟
        let sec =Math.floor(val%60) //余秒
        if (min_total<60) {
         this.timeH=0
         this.timeM=min_total
        }else{
          let hour_total=Math.floor(min_total/60) //小时
          let min=Math.floor(min_total%60) //余分
          if(hour_total>0&&min==0&&sec==0){
             this.timeH=hour_total
             this.timeM=0
          }else{
            if(sec>0){
             this.timeH=hour_total
             this.timeM=min+1
            }else{
             this.timeH=hour_total
             this.timeM=min
            }
          }
        }
      }
      }
     }
    }
   }else{
      this.notimePlan=this.showTime(this.deviceUseInfo.surplus_used_time)
    }
  },  
       // 根据星期-获取时间管控列表
    getDayTime(list,i){
        let index = new Date().getDay()
        if(index==0){
          index=7
       }
       let time_list=[]
       if (i) {
        time_list=list.filter(item=>{
         return item.what_day==i
       })
       }else{
         time_list=list.filter(item=>{
         return item.what_day==index
       })
       }
       return time_list
    },
       // 时间换算
    showTime(val,ms=false){
      if (val===null) { return 0 }
      if (val<60) {
        if (val==0) {
          return val+"分钟"
        }
        if(ms){
          return val +'秒'
        }
        return 1+'分钟'
      }else{
        let min_total=Math.floor(val/60) //分钟
        let sec =Math.floor(val%60) //余秒
        if (min_total<60) {
           return  min_total +'分钟'
        }else{
          let hour_total=Math.floor(min_total/60) //小时
          let min=Math.floor(min_total%60) //余分
          if(hour_total>0&&min==0&&sec==0){
            return hour_total+'小时'
          }else{
            if(sec>0){
              return hour_total+'小时'+(min+1)+'分钟'
            }
           return hour_total+'小时'+min+'分钟'
          }
        }
      }
    },
     /**
     * @description 时间类型切换
     * @return {Array} 
     * */
    changeTimeTab(time){
      let times=time.map(item=>{
        item.begin_time=item.begin_time.slice(0,5)
         item.end_time=item.end_time.slice(0,5)
        return item.begin_time+'-'+item.end_time
      })
      return times
    },
  }
}
</script>
<style scoped lang="scss">
.standby_time{
  // padding: 0px 120px;
  font-size: 14px;
  color: #606266;
  .item{
    font-size: 12px;
    color: #606266;
    display: flex;
    font-weight: normal;
    padding: 0 60px;
    .week{
      width: 30%;
    }
    .day{
      margin: 0 30px;
    }
    .time{
      margin: 0 10px;
    }
  }
}
.order-list{
  border: 1px solid #F1F1F1;
}
.copy-to{
  .title{
    font-size: 12px;
    color: #181818;
    margin-bottom: 6px;
    display: block;
  }
}
.day-time{
  margin-top: 20px;
  overflow: hidden;
  .item{
    float: left;
    width: 120px;
    height: 28px;
    border: 1px solid #F1F1F1;
    border-radius: 3px;
    line-height: 28px;
    text-align: center;
    margin-right: 12px;
    img{
      position: relative;
      margin-left: 10px;
      top: 2px;
      cursor: pointer;
    }
    span{

      font-size: 12px;
      color: #181818;
    }
  }
}
.time-select{
  border: 1px solid #F1F1F1;
  width: 506px;
  margin-top: 12px;
  *{
    user-select: none;
  }
  .header{
    height: 50px;
    background-color: #f8fafc;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #F1F1F1;

    .item{
      float: left;
      height: 100%;
      width: 68px;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      color: #000;
      span{
        font-size: 12px;
      }
    }
    .active{
      position: relative;
      color: #fff;
      background-color: #A3B2C6;
      // &::before{
      //   content: '';
      //   display: block;
      //   width: 40px;
      //   height: 3px;
      //   position: absolute;
      //   background-color: #a3b2c6;
      //   left: 13px;
      //   bottom: 10px;
      // }
    }
  }
  .body{
    overflow: hidden;
    .item{
      width: 84px;
      height: 60px;
      float: left;
      position: relative;
      .number{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        line-height: 60px;
        text-align: center;
        z-index: 4;
        font-size: 14px;
        color: #888888;
        // cursor: pointer;
      }
      .number{
        border-bottom: 1px solid #F1F1F1;
        //border-right: 1px solid #F1F1F1;
      }
      .border{
        width: 100%;
        height: 100%;
        z-index: 2;
        border-bottom: 1px solid #F1F1F1;
        //border-right: 1px solid #F1F1F1;
        position: absolute;
        left: 0;
        top: 0;
      }
      .bb-color{
        position: absolute;
        width: 7px;
        height: calc(100% + 0px);
        left: 0;
        top: 0;
        z-index: 3;
        //display: none;
        opacity: 1;
        //background-color: #0cbb73;
        //border: 1px solid #0cbb73;
      }
      &:nth-child(19),
      &:nth-child(20),
      &:nth-child(21),
      &:nth-child(22),
      &:nth-child(23),
      &:nth-child(24){
        .border{
          border-bottom: 0;
        }
        .number{
          border-bottom: 0;
        }
      }
      &:nth-child(6),
      &:nth-child(12),
      &:nth-child(18),
      &:nth-child(24){
        .border{
          border-right: 0;
        }
        .number{
          border-right: 0;
        }
      }
    }
  }
}
</style>
<style lang="scss">
// @import "../../element-ui/element-var";
.group-action-time-page{
  .el-radio-group{
    overflow: hidden;
    border-radius: 3px;
  }
  .copy-to{
    .el-checkbox__label{
      font-size: 12px;
    }
   
  }
  .qy-time-range{
    display: flex;
    align-items: center;
    margin-top: 15px;
    span:nth-child(1){

      font-size: 12px;
      color: #181818;
    }
    span:nth-child(2){
      display: inline-block;
      width: 12px;
      height: 12px;
      background-color: #0cbb73;
      margin-left: 2px;
    }
    span:nth-child(3){

      font-size: 12px;
      color: #888888;
      margin-left: 6px;

    }
    span:nth-child(4){
      display: inline-block;
      width: 12px;
      height: 12px;
      border: 1px solid #F1F1F1;
      margin-left: 12px;

    }
    span:nth-child(5){

      font-size: 12px;
      color: #888888;
      margin-left: 6px;

    }
    span:nth-child(6){

      font-size: 12px;
      color: #FA7274;
      margin-left: 32px;

    }
  }
  // .bg-active{
  //   background-color: #0cbb73;
  //   border: 1px solid #a3b2c6;
  // }
  // .text-white{
  //   color: #fff;
  // }
  .day-time{
    .item{
      position: relative;
    }
    .el-date-editor{
      width: 50%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .el-date-editor:nth-child(2){
      right: 0;
      left: auto;
    }
  }

  .copy-to-box{
    position: relative;float: left;margin-right: 20px;
    .item{
      position: absolute;left: 0;top: 0;background-color: darkgrey;height: 100%;width: 100%;opacity: 0;
      z-index: 9;
      cursor: pointer;
    }
  }
}
.group-action-change-item-dialog{
  .el-dialog__header{
    display: none;
  }
  .el-form-item__content{
    margin-left: 0 !important;
    height: 40px;
    .el-form-item__error{
      left: 100px !important;
    }
  }
  .header{
    padding: 0;
    padding-top: 20px;
    padding-bottom: 30px;
    position: relative;
    .title{
      line-height: 24px;
      font-size: 18px;
      color: #181818;
    }
    .el-button{
      position: absolute;
      right: 12px;
      top: 13px;
    }
  }
  width: 400px;
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 240px;
  }
  .el-dialog__body{
    overflow: hidden;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 30px;
    padding-top: 0;
  }
  .title{
    margin-right: 10px;
  }
  .item{
    margin: 0 10px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .action-button{
    text-align: center;
    .el-button{
      margin: 20px;
      margin-bottom: 0;
      margin-top: 10px;
    }
  }
}
.not-have-time-list{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 122px;
  img{
    display: block;
  }
  span{
    display: block;

    font-size: 14px;
    color: #181818;
    margin-top: 24px;
    text-align: center;
  }
}
.standby_time{
  .el-table th{
    padding: 0px 0;
    background-color: #A3B2C6;
    color: #FFFFFF;
  }
   .el-table tr td .cell{
   font-weight: bold;
   color: #181818;
   }
   .el-table tr{
    background-color: #FAFCFF;
   }
  .el-table__expanded-cell{
    padding: 0;
  }
  .el-table thead{
   color: #606266;
   font-weight: normal;
  }
}
.notDayTime{
  width: 100%;
  min-height: 240px;
  text-align: center;
  font-size: 14px;

  img{
    width: 320px;
    display: block;
    margin: 20px auto;
    color: 888888;
  }
}
  .hasTime {
    font-size: 14px;
    color: #606266;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    span {
      font-size: 16px;
      margin-left: 10px;
      font-weight: 700;
    }
  }
  .nowDayhasTime{
    margin: 20px 0;
    font-size: 14px;
    color: #606266;
     span {
      font-size: 16px;
      margin-left: 10px;
      font-weight: 700;
      display: inline-block;
      border: 1px solid #F1F1F1;
      padding: 5px 40px;
    }
  }
</style>
