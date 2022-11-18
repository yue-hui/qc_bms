<template>
    <div class="control_app_list">
        <div class="content">
            <div class="item" v-for="(item,index) in list" :key="index">
               <img v-if="item.soft_icon" :src="item.soft_icon" alt="">
               <img v-if="!item.soft_icon" src="../../../assets/imgs/bg_icon_no.png" alt="">
               <div class="soft">
                  <div class="softName">{{item.soft_name}}</div>
                  <div class="softType">{{item.type_name?item.type_name:'未知'}}</div>
               </div>
            </div>
        </div>  
    </div>
</template>

<script>
export default {
      mounted() { },
      watch: { },
      data() {
        return {
        }
      },
      props: {
        list: {
          type: Array,
          default() {
            return [] 
          }
        },
        time: {
          type: String,
          default: '' 
        }
      },
      methods: {
      
      }
    }

</script>
<style scoped lang="scss">
</style>
<style lang="scss">
  .text-white{
    color: #fff;
  }
.control_app_list{
   padding: 20px 60px;
   font-size: 14px;
   color: #606266;
   font-weight: normal;
   .content{
     border: 1px solid #ebeef5;
     min-height: 400px;
     display: flex;
     align-content:flex-start;
     flex-wrap: wrap;
     padding: 20px 0;
     .item{
       display: flex;
       height: 50px;
       width: 120px;
       margin:0 20px;
       margin-bottom: 20px;
       img{
         margin-right: 10px;
         width: 50px;
         height: 50px;
         display: block;
       }
       .soft{
         display: flex;
         flex-direction: column;
         justify-content: space-around;
         .softName{
           overflow:hidden; 
text-overflow:ellipsis;
display:-webkit-box; 
-webkit-box-orient:vertical;
-webkit-line-clamp:1; 
         }
       }
     }
   }
}
</style>
