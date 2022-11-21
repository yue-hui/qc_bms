<template>
  <div class="control_app_timelimit">
    <div class="time-select" v-if="type==4">
      <div class="header">
        <div v-for="item in day" :key="item" class="item" :class="{ active: activeDay === item }" @click="changeActiveDay(item)">
          <span>{{ item }}</span>
        </div>
      </div>
      <div class="day-time" style="width: 800px" v-if="time.rule_time&&time.rule_time.length>0&&getDayTime(time.rule_time,activeIndex).length>0">
        <div v-for="(item, index) in changeTimeTab(getDayTime(time.rule_time,activeIndex)[0].rule_time_fragment)" :key="index" style="margin-bottom: 10px; margin-right: 9px" class="item">
          <span>{{ item }}</span>
        </div>
      </div>
      <div class="day-time" style="width: 800px" v-if="time.rule_time.length==0||time.rule_time&&time.rule_time.length>0&&getDayTime(time.rule_time,activeIndex).length==0">
          <div style="margin-bottom: 10px; margin-right: 9px" class="item">
               <span>00:00-24:00</span>
          </div>
      </div>
      <div class="hasTime" style="width: 900px">
        <div class="time_item" v-if="nowIndex==activeIndex&&notimePlan==0">当天剩余可用<span>{{timeH==0&&timeM==0?0+'分钟':timeH>0?timeH+'小时':''}}{{timeM>0?timeM+'分钟':''}}</span></div>
        <div class="time_item" v-if="nowIndex==activeIndex&&notimePlan!=0">当天剩余可用<span>{{notimePlan}}</span></div>
        <!-- <div class="time_item" v-if="nowIndex==activeIndex&&getDayTime(time.rule_time,activeIndex)[0].rule_time_fragment.length<=1">当天剩余可用<span>{{deviceUseInfo.rule_time_flag=='Y'?showTime(deviceUseInfo.surplus_used_time):'0分钟'}}</span></div> -->
        <div class="time_item" v-if="nowIndex>activeIndex">当天剩余可用 <span>0分钟</span></div>
        <div class="time_item" v-if="nowIndex<activeIndex">当天剩余可用 <span>{{time.rule_time.length>0&&getDayTime(time.rule_time,activeIndex).length>0?showTime(getDayTime(time.rule_time,activeIndex)[0].enabled_time):'24小时'}}</span></div>
        <div class="time_item">当天已用 <span>{{nowIndex==activeIndex?showTime(time.day_of_week_used_time[idx],true):showTime(time.day_of_week_used_time[activeIndex-1],true)}}</span></div>
        <div class="time_item">今日屏幕可用 <span>{{time.rule_time.length>0&&getDayTime(time.rule_time,activeIndex).length>0?showTime(getDayTime(time.rule_time,activeIndex)[0].enabled_time):'24小时'}}</span></div>
      </div>
      <div class="tip" v-if="nowIndex!=activeIndex||deviceUseInfo.rule_time_flag!='Y'">下列应用暂不可用：还未到屏幕使用时间</div>
    </div>
    <el-table :data="limited_soft_list.single_soft_list" style="width: 900px;" border stripe class="tableLimited">
      <el-table-column label="应用图标" prop="soft_icon" align="center" width="80px">
         <template slot-scope="scoped">
           <div class="app_icon">
             <img v-if="scoped.row.soft_icon" :src="scoped.row.soft_icon" alt="">
             <img v-else src="../../../assets/imgs/bg_icon_no.png" alt="">
             <div class="bg" v-if="nowIndex!=activeIndex||deviceUseInfo.rule_time_flag!='Y'||(rule_usable_temp&&!rule_usable_temp.bundle_ids.includes(scoped.row.bundle_id))||getNowHMS_app(scoped.row.soft_fragments)" >
               <span>不可用</span>
             </div>
           </div>
        </template>
      </el-table-column>
      <el-table-column label="应用名称" prop="soft_name" align="center"></el-table-column>
      <el-table-column label="类型" prop="type_name" align="center">
         <template slot-scope="scoped">
             <div>{{scoped.row.type_name?scoped.row.type_name:'未知'}}</div>
        </template>
      </el-table-column>
      <el-table-column label="使用时间段"  prop="soft_fragments" align="center">
          <template slot-scope="scoped">
             <div v-if="scoped.row.soft_fragments"><div v-for="(item,index) in changeTimeTab(scoped.row.soft_fragments)">{{item}}</div></div>
        </template>
      </el-table-column>
      <el-table-column label="可用时间" prop="timeLimits" align="center" :formatter="timerFormat"> </el-table-column>
      <el-table-column label="已用时间" prop="used_time" align="center">
         <template slot-scope="scoped">
             <div v-if="scoped.row.timeLimits">{{'已用'+timerFormatHMS(scoped.row.timeLimits)}}</div>
             <div v-else> - </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="title">分组应用：</div>
    <el-table :data="limited_soft_list.group_soft_list" style="width: 900px;" border stripe class="tableLimited">
      <el-table-column label="应用图标" prop="id" align="center" width='80'> 
          <template slot-scope="scoped">
              <div class="softList">
                 <div v-for="(item,index) in scoped.row.soft_list">
                    <img  v-if="item.soft_icon" :src="item.soft_icon" alt="">
                    <img  v-else src="../../../assets/imgs/bg_icon_no.png" alt="">
                    <div class="bg" v-if="nowIndex!=activeIndex||deviceUseInfo.rule_time_flag!='Y'" >
                      <span>不可用</span>
                    </div>
                 </div>
              </div>
        </template>
      </el-table-column>
      <el-table-column label="应用名称" prop="soft_group_name" align="center"> </el-table-column>
      <el-table-column label="应用" prop="soft_list" align="center" show-overflow-tooltip  width='220px' :formatter="setGroupapp"></el-table-column>
      <el-table-column label="使用时间段"  prop="group_fragment" align="center">
        <template slot-scope="scoped">
           <div><div v-for="(item,index) in changeTimeTab(scoped.row.group_fragment)"> {{item}}</div></div>
        </template>
      </el-table-column>
      <el-table-column label="可用时间" prop="timeLimits" align="center" :formatter="timerFormat"></el-table-column>
      <el-table-column label="已用时间" prop="used_time" align="center">
        <template slot-scope="scoped">
             <div v-if="scoped.row.timeLimits">{{'已用'+timerFormatHMS(scoped.row.timeLimits)}}</div>
             <div v-else> - </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const day = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
export default {
  watch: {},
  data() {
    return {
      timeH:0,
      timeM:0,
      notimePlan:0,
      dayUseTime:'',
      surplus_used_time:'',
      day: day,
      idx:(()=>{
      let index = new Date().getDay() - 1;
        if (index === -1) {
          index = 6;
        }
        return index
      })(),
      activeDay: (() => {
        let index = new Date().getDay() - 1;
        if (index === -1) {
          index = 6;
        }
        return day[index]
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
    };
  },
  props: {
    type: {
      type: String,
      default: "",
    },
    rule_usable_temp:{},
    time:{},
    deviceUseInfo:{},
    limited_soft_list:[]
  },
  watch: {
   
   },
  mounted() {
    if (this.type!=3) {
    this.getNowHMS()
    }
  },
  methods: {
    changeActiveDay(item){
      this.activeDay=item
      this.activeIndex=this.getActiveDayIndex()
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
    // 根据星期-秒数换算-小时
    timerFormat(_,__, time){
      if (!time) {
        return '-'
      }
       let index = new Date().getDay()
       if(index==0){
         index=7
       }
       let list=time.filter(item=>{
         return item.whatDay==index
       })
      return Number(list[0].timeLimit)/3600+'小时'
    },
     // 根据星期-秒数换算-时分秒
    timerFormatHMS(time){
       let index = new Date().getDay()
       if(index==0){
         index=7
       }
       let list=time.filter(item=>{
         return item.whatDay==index
       })
      return this.showTime(Number(list[0].usedTime),true)
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
  //当前时间-判断是否在当前时间段-获取剩余时分秒
  getNowHMS(){
   let time= this.getDayTime(this.time.rule_time,this.nowIndex)[0]
   if (time) {
    time=time.rule_time_fragment
    let date=new Date()
    let h=date.getHours()
    let m=date.getMinutes()
    let s=date.getSeconds()
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
   //应用分组-获取分组应用名
    setGroupapp(_,__, list){
       let str=list.map(item=>{
         return item.soft_name
       })
       if (str.length>2) {
         str=str.slice(0,2).join(',')+`等${str.length}个应用`
       }else{
        str=str.join(',')
       }
       return str 
    },
 //限时应用-判断是否在当前时间段
  getNowHMS_app(time){
   if (time) {
    let date=new Date()
    let h=date.getHours()
    let m=date.getMinutes()
    let index=''
    let times=time
    times.forEach((item,idx )=> {
       let end_time_h=item.end_time.slice(0,2)
        end_time_h=end_time_h.slice(0,1)==0?end_time_h.slice(1,2):end_time_h
       if (h>Number(end_time_h)) {
          index=idx
       }
        return index
    });
    times=index===''?times:times.slice(index+1)
    let timeMap=times[0]||{}
     if (timeMap) {
    let end_time_h=timeMap.end_time.slice(0,2)
     end_time_h=end_time_h.slice(0,1)==0?end_time_h.slice(1,2):end_time_h
    let end_time_m=timeMap.end_time.slice(3,5)
    end_time_m=end_time_m.slice(3,4)==0?end_time_m.slice(4,5):end_time_m
  
    let begin_time_h=timeMap.begin_time.slice(0,2)
      begin_time_h=begin_time_h.slice(0,1)==0?begin_time_h.slice(1,2):begin_time_h
    let begin_time_m=timeMap.begin_time.slice(3,5)
      begin_time_m=begin_time_h.slice(3,4)==0?begin_time_m.slice(4,5):begin_time_m    
     if (Number(begin_time_h)<=h&&h<Number(end_time_h)) {
      return false
     }else if(end_time_h==h){
       if(end_time_m>m&&m<begin_time_m){
          return false
       }else{
          return true
       }
     }else{
       return true
     }
     }
   }
  }, 
     getActiveDayIndex() {
      return this.day.indexOf(this.activeDay) + 1
    },
  },
};
</script>
<style scoped lang="scss">
</style>
<style lang="scss">
.tableLimited{
   th,  td{
    padding: 5px 0 !important;
  }
}
.app_icon{
  position: relative;
  width: 40px;
  margin: 0 auto;
  text-align: center;
  img{
    width: 30px;
    height: 30px;
  }
  .bg{
   position: absolute;
   width: 100%;
   text-align: center;
   font-size: 12px;
   bottom: 0;
   left: 0;
   color: #fff;
   height: 15px;
   border-bottom-left-radius: 10px;
   border-bottom-right-radius: 10px;
   background-color: rgba(0,0,0,.4);
   span{
     font-size: 12px;
     margin-top: -4px;
     display: block;
     transform: scale(.7);
   }
 }
}
.softList{
 border: 1px solid #ccc;
 min-height: 60px;
 border-radius: 10px;
 display: flex;
 flex-wrap: wrap;
 padding: 5px 0;
 position: relative;
 img{
   display: block;
   width: 20px;
   height: 20px;
   margin-left: 5px;
 }
  .bg{
   position: absolute;
   width: 100%;
   text-align: center;
   font-size: 12px;
   bottom: 0;
   left: 0;
   color: #fff;
   height: 15px;
   border-bottom-left-radius: 10px;
   border-bottom-right-radius: 10px;
   background-color: rgba(0,0,0,.1);
   span{
     font-size: 12px;
     margin-top: -4px;
     display: block;
     transform: scale(.7);
   }
 }
}
.bg-active {
  background-color: #A3B2C6;
  border: 1px solid #A3B2C6;
}
.text-white {
  color: #fff;
}
.control_app_timelimit {
  padding: 20px 60px;
  .title {
    font-size: 14px;
    color: #606266;
    font-weight: 700;
    margin: 40px 0 20px;
  }
  .el-table th {
    background-color: #f8fafc;
  }
  .el-table thead {
    color: #606266;
    font-weight: normal;
  }
  .header {
    height: 40px;
    width: 800px;
    background-color: #f8fafc;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f1f1f1;

    .item {
      float: left;
      height: 100%;
      width: 68px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      color: #000;
      span {
        font-size: 12px;
      }
    }
    .active {
      position: relative;
      color: #fff;
      background-color: #A3B2C6;
      // &::before {
      //   content: "";
      //   display: block;
      //   width: 40px;
      //   height: 3px;
      //   position: absolute;
      //   background-color: #A3B2C6;
      //   left: 13px;
      //   bottom: 5px;
      // }
    }
  }
  .day-time {
    margin-top: 20px;
    overflow: hidden;
    .item {
      float: left;
      width: 120px;
      height: 28px;
      border: 1px solid #f1f1f1;
      border-radius: 3px;
      line-height: 28px;
      text-align: center;
      margin-right: 12px;
      img {
        position: relative;
        margin-left: 10px;
        top: 2px;
        cursor: pointer;
      }
      span {
        font-size: 12px;
        color: #181818;
      }
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
  .tip {
    font-size: 12px;
    color: #606266;
    margin-bottom: 20px;
  }
}
</style>
