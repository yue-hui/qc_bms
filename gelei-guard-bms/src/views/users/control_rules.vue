<template>
  <div class="content users-detail">
      <div v-loading="loading" class="content-body">
      <el-card class="box-card parent-card-block gg-user-details-with-all">
        <div slot="header" class="clearfix-header" style="display: flex;justify-content: space-between">
          <span>基础信息</span>
        </div>
      <div class="card-block-body">
          <el-form ref="form" label-suffix=":" label-width="140px" style="padding:20px 0">
            <el-row :gutter="24">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="用户昵称">
                    <span>{{ chlid_info.nick_name }}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="家长手机号码">
                    <span>{{ information.phone }}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="查看设备">
                     <el-select v-model="device_id" size="mini" placeholder="请选择设备"  @change="getDeviceId">
                       <el-option v-for="item in device_list":key="item.device_id":label="item.device_name":value="item.device_id" />
                     </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="守护等级">
                     <el-select v-model="mode_type" size="mini" placeholder="请选择设备" disabled>
                       <el-option v-for="(value,key,i)  in modeList" :key="i" :label="value"  :value="key" />
                     </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="守护状态">
                    <span v-if="device_list.length==0">暂无绑定设备</span>
                    <span v-if="rule_info.deviceUseInfo&&!rule_info.rule_usable_temp">{{rule_info.deviceUseInfo.rule_time_flag=='Y'?'已解锁':'守护中' }}</span>
                    <span v-if="rule_info.deviceUseInfo&&rule_info.rule_usable_temp">守护中</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          <el-row :gutter="24">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="临时锁屏">
                    <span >{{rule_info.rule_usable_temp&&rule_info.rule_usable_temp.mode==1?'已启用':'未启用'}}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8" v-if="rule_info.rule_usable_temp&&timeDifference&&rule_info.rule_usable_temp.mode==1">
                <div class="grid-content bg-purple">
                  <el-form-item label="锁屏时间">
                    <span>{{timeDifference}}</span>
                  </el-form-item>
                </div>
              </el-col>
           </el-row>
          <el-row :gutter="24" v-if="rule_info.rule_usable_temp&&rule_info.rule_usable_temp.mode==1&&device_type!='PC'">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  <el-form-item label="锁屏应用">
                     <div class="rule_usable_temp_app" v-if="app_list&&app_list.length>0">
                        <div class="item" v-for="(item,index) in app_list" :key="index">
                           <img v-if="item.soft_icon" :src="item.soft_icon" alt="">
                           <img v-else src="../../assets/imgs/bg_icon_no.png" alt="">
                           <div>{{item.soft_name}}</div>
                        </div>
                     </div>
                  </el-form-item>
                </div>
              </el-col>
          </el-row>
             <el-row :gutter="24" v-if="mode_type==2||mode_type==4">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="临时可用">
                    <span >{{rule_info.rule_usable_temp&&rule_info.rule_usable_temp.mode==0?'已启用':'未启用'}}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8" v-if="rule_info.rule_usable_temp&&rule_info.rule_usable_temp.mode==0">
                <div class="grid-content bg-purple">
                  <el-form-item label="可用时间">
                    <span>{{timeDifference}}</span>
                  </el-form-item>
                </div>
              </el-col>
           </el-row>
          <el-row :gutter="24" v-if="rule_info.rule_usable_temp&&rule_info.rule_usable_temp.mode==0&&device_type!='PC'">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  <el-form-item label="可用应用">
                     <div class="rule_usable_temp_app" v-if="app_list&&app_list.length>0">
                        <div class="item" v-for="(item,index) in app_list" :key="index">
                           <img v-if="item.soft_icon" :src="item.soft_icon" alt="">
                           <img v-else src="../../assets/imgs/bg_icon_no.png" alt="">
                           <div>{{item.soft_name}}</div>
                        </div>
                     </div>
                  </el-form-item>
                </div>
              </el-col>
          </el-row>
         </el-form>
        </div>
     </el-card>
     <el-card class="box-card parent-card-block gg-user-details-with-all">
        <div slot="header" class="clearfix-header" style="display: flex;justify-content: space-between">
          <span  v-if="mode_type==2&&bind_type==1">守护时间设置</span>
          <span  v-if="mode_type==3&&bind_type==1">应用守护设置</span>
          <span  v-if="mode_type==4&&bind_type==1">时间应用守护设置</span>
        </div>
      <div class="card-block-body">
          <el-form ref="form" label-suffix=":" label-width="140px" style="padding:20px 0">
            <el-row :gutter="24" v-if="mode_type==2&&bind_type==1">
              <el-col :span="24">
                 <controlTime :time='rule_info.rule_time_list' :ruleTimePlanB='rule_info.ruleTimePlanB'></controlTime>
              </el-col>
            </el-row>
            <el-row :gutter="24" v-if="mode_type>2&&mode_type<5&&bind_type==1">
               <el-col :span="24">
                   <div class="head_tab">
                      <div class="tab" v-if="mode_type==4" :class="tab_index==0?'active':''" @click="changeTab(0)">可用时间</div>
                      <div class="tab" v-if="device_type!='PC'" :class="tab_index==1?'active':''" @click="changeTab(1)">限时应用</div>
                      <div class="tab" :class="tab_index==2?'active':''" @click="changeTab(2)">禁止使用</div>
                      <div class="tab" :class="tab_index==3?'active':''" @click="changeTab(3)">始终可用</div>
                      <div class="tab" v-if="device_type!='PC'" :class="tab_index==4?'active':''" @click="changeTab(4)">未计划</div>
                      <div class="tab"  :class="tab_index==5?'active':''" @click="changeTab(5)">待审批</div>
                   </div>
                   <div>
                     <controlTime :device_type='device_type' :time='rule_info.rule_time_list' :ruleTimePlanB='rule_info.ruleTimePlanB' :deviceUseInfo='rule_info.deviceUseInfo' v-if="tab_index==0" :type='mode_type'></controlTime>
                     <controlAppTimelimit :limited_soft_list="rule_info.limited_soft_list" :rule_usable_temp="rule_info.rule_usable_temp" :deviceUseInfo='rule_info.deviceUseInfo' :time="rule_info.rule_time_list" v-if="tab_index==1" :type='mode_type'></controlAppTimelimit>
                     <controlAppList :list="rule_info.forbidden_soft_list" v-if="tab_index==2"></controlAppList>
                     <controlAppList :list="rule_info.free_soft_list" v-if="tab_index==3"></controlAppList>
                     <controlAppList :list="rule_info.default_soft_list" v-if="tab_index==4"></controlAppList>
                     <controlAppList :list="rule_info.pending_soft_list" v-if="tab_index==5"></controlAppList>
                   </div>
              </el-col>
            </el-row>
            </el-form>
        </div>
     </el-card>
     </div>
  </div>
</template>

<script>

import { get_parent_details, deviceRules } from '../../api/interactive'
import { mapGetters } from 'vuex'
import controlTime from './components/control_time'
import controlAppTimelimit from './components/control_app_timelimit'
import controlAppList from './components/control_app_list'
const modeList={
  5:'轻度守护',
  4:'超强守护',
  3:'重度守护',
  2:'中度守护',
}
export default {
  components: {
    controlTime,controlAppTimelimit,controlAppList
  },
  filters: {

  },
  data() {
    return {
      tab_index:0,
      loading: false,
      user_id:'',
      patriarch_id:'',
      information:{},
      chlid_info:{},
      rule_info:{},
      device_list:[],
      app_list:[],
      timeInfo:{},
      device_id:'',
      device_type:'',
      mode_type:'',
      bind_type:'',
      modeList:modeList,
      timeDifference:'',
      timer:null,
      nowTime:''
    }
  },
  watch:{
  },
  computed: {
    ...mapGetters([
      'is_agent'
    ])
  },
  mounted: function() {
    window.clearInterval(this.timer)
    this.timer=null
    this.user_id=this.$route.params.pid.split('&')[1]
    this.patriarch_id=this.$route.params.pid.split('&')[0]
    this.fetch_details()
  },
  beforeDestroy(){
    this.timer=null
    sessionStorage.removeItem('device_id')
  },
  methods: {
    fetch_details() {
      const config = {
        user_id: this.$route.params.pid.split('&')[0]
      }
      this.loading = true
      get_parent_details(config).then(res => {
        if (res.status === 0) {
          this.information = res.data
          this.chlid_info=this.information.chlid_list.find(item=>{
            return item.user_id==this.user_id
          })
          this.device_list=this.chlid_info.device_list.filter(item=>{
            return item.bind_type==1
          })
           const device_id=sessionStorage.getItem("device_id")
            let list=this.device_list.filter(item=>{
            return item.device_id==device_id
           })
          if(list.length>0){
            this.device_id=sessionStorage.getItem("device_id")
            let list=this.device_list.filter(item=>{
            return item.device_id==this.device_id
           })
          this.bind_type=list[0].bind_type
          this.device_type=list[0].device_type
          }else{
           if(this.device_list&&this.device_list.length>0){
            this.device_id=this.device_list[0].device_id
            this.bind_type=this.device_list[0].bind_type
            this.device_type=this.device_list[0].device_type
            }
          }
          if(this.device_id){
            this.getDeviceRules()
          }
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 获取设备管控规则
    getDeviceRules(){
      const form={
        user_id:this.patriarch_id,
        child_user_id:this.user_id,
        child_device_id:this.device_id
      }
      deviceRules(form).then(item=>{
        window.clearInterval(this.timer)
        this.timer=null
        this.tab_index=0
        this.rule_info=item.data
        this.mode_type=String(item.data.mode)
        if (this.rule_info.rule_usable_temp&&JSON.stringify(this.rule_info.rule_usable_temp)!=null) {
          this.app_list= this.rule_info.rule_usable_temp.softs
          this.timer=setInterval(()=>{
          let end=(this.rule_info.rule_usable_temp.usable_end_time)/1000
          this.nowTime=Math.floor((new Date().getTime())/1000)
          // let begin=this.rule_info.rule_usable_temp.usable_begin_time  
          let difTime=end-this.nowTime-1
          this.timeDifference=this.setTimeDifference(difTime)
          if(this.timeDifference==0){
             window.clearInterval(this.timer)
             this.timer=null
          }
           },1000)  
        }
        if(this.mode_type==3){
         this.tab_index=1
        }
      })
    },
    // tab栏切换
    changeTab(index){
       this.tab_index=index
    },
    //设备切换
    getDeviceId(e){
      window.clearInterval(this.timer)
      this.timer=null
      this.tab_index=-1
      this.device_id=e
      sessionStorage.setItem('device_id',this.device_id)
      const list = this.device_list.filter(item=>{
         return item.device_id==this.device_id
      })
      this.bind_type=list[0].bind_type
      this.device_type=list[0].device_type
      this.getDeviceRules()
    },
    // 临时锁屏时间换算
    setTimeDifference(time){
        if (time<=0) { 
        window.clearInterval(this.timer)
        this.timer=null
        this.timeDifference=0 
          return 
      }
      if (time<60) {
        if (time<10) {
          return '00:'+'00:'+'0'+time
        }
        return '00:'+'00:'+time
      }else{
        let min_total=Math.floor(time/60) //分钟
        let sec =Math.floor(time%60) //余秒
        if (sec<10) {
          sec='0'+sec
        }
        if (min_total<60) {
            if (min_total<10) {
             min_total='0'+min_total
         }
        return  '00:'+min_total+':'+sec 
        }else{
          let hour_total=Math.floor(min_total/60) //小时
          hour_total=hour_total<10?'0'+hour_total:hour_total
          let min=Math.floor(min_total%60) //余分
           min=min<10?'0'+min:min
          if(hour_total!="00"&&min=="00"&&sec=="00"){
            return hour_total+':00'+':00'
          }else{
           return hour_total+':'+min+':'+sec 
          }
        }
      }
    },
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
    border: 1px solid #EAEAEA;
    height: 100%;
    padding: 15px 25px;
    min-height: 120px;

    .parent-card-block {
      /*width: 500px;*/

      .order-unsubscribe-history {
        border-bottom: 1px solid rgba(97, 168, 255, 0.79);
        color: rgba(97, 168, 255, 0.79);
        margin-left: 5px;
        cursor: pointer;
      }

      .order-list {
        padding: 0;

        .table-no-data {
          text-align: center;
          font-size: 10px;
          color: #909399;
          line-height: 80px;
          min-height: 80px;
        }
      }

      .table {
        width: 100%;
        text-align: center;
        border: none;
        /*margin: 2px auto;*/
        margin-bottom: 10px;
        border-collapse: collapse;

        tr {
          height: 30px;
          line-height: 30px;

          &:nth-child(2n - 1) {
            background-color: rgba(128, 128, 128, 0.41);
          }

          &:nth-child(2n) {
            background-color: white;
          }

          th, td {
            padding: 0;
            border: 0;
            font-size: 14px;

            .order-callback {
              border: none;
              background-color: transparent;
              /*border-bottom: 1px solid #303133;*/
              outline: none;

              &:hover {
                /*border-bottom: 1px solid dodgerblue;*/
                color: dodgerblue;
              }
            }
          }
        }
      }
    }

    .black-block {
      width: 100%;
      height: 20px;
      background-color: #f6fff4;
    }
  }
}
.head_tab{
  display: flex;
  font-size: 14px;
  border-bottom: 1px solid #F1F1F1;
  padding-left: 60px;
  .tab{
    padding: 10px 30px;
    border: 1px solid #F1F1F1;
    border-bottom: none;
    color: #888888;
    background-color: #F8FAFC;
    cursor: pointer;
  }
  .active{
    color: #fff;
    font-weight: 700;
    background-color: #A3B2C6;
  }
}
.rule_usable_temp_app{
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  .item{
  margin-right: 20px;
  text-align: center;
  line-height: normal;
  font-size: 12px;
    img{
      width: 40px;
      height: 40px
    }   
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
@import "style/index";
</style>
