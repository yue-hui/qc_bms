<template>
  <div class="content">
    <div class="content-body">
      <div class="header-line">
        <div class="header-line-left">
          <div class="header-block search-time">
            <label class="search-item">注册时间:</label>
            <div class="block">
              <el-date-picker
                @change="date_range_change"
                end-placeholder="结束日期"
                range-separator="至"
                start-placeholder="开始日期"
                type="daterange"
                unlink-panels
                v-model="datetime_range" />
            </div>
          </div>
        </div>

        <div class="header-line-right">
          <el-button @click="search" type="success">搜索</el-button>
        </div>
      </div>

      <hr class="hr-diviser">

      <!--概况数据-->
      <div class="statistics-summary">
        <statistics-pannel ref="summary" style="display: none" />
      </div>

      <!--图表数据-->
      <div class="statistics-diagram">
        <diagram :condition="condition" ref="diagram" />
      </div>

      <!--详情信息-->
      <statics_details :condition="condition" ref="details" />
    </div>
  </div>
</template>

<script>
import statisticsPannel from '@/views/analysis/components/statistics_pannel'
import diagram from '@/views/analysis/components/diagram'
import statics_details from '@/views/analysis/components/details'
import { DAY_MICROSECOND } from '@/utils/constant'

export default {
  components: {
    statisticsPannel,
    diagram,
    statics_details
  },
  data() {
    return {
      datetime_range: [],
      condition: {}
    }
  },
  computed: {},
  create: function() {
    this.init_data()
    this.load_data()
  },
  mounted: function() {
  },
  methods: {
    init_data: function() {
      const pre_day_unix_stamp = new Date().getTime() - DAY_MICROSECOND
      this.datetime_range = [new Date(pre_day_unix_stamp), new Date(pre_day_unix_stamp)]
      this.condition = {
        begin_time: pre_day_unix_stamp,
        end_time: pre_day_unix_stamp
      }
    },
    date_range_change() {
      this.condition = {
        begin_time: this.datetime_range[0],
        end_time: this.datetime_range[1]
      }
    },
    get_config() {
      const config = {
        begin_time: this.datetime_range[0].getTime(),
        end_time: this.datetime_range[1].getTime()
      }
      return config
    },
    search() {
      this.load_data()
    },
    load_data: function() {
      // 总况数据
      const options = this.get_config()
      this.$refs.summary.search(options)
      this.$refs.diagram.search()
      this.$refs.details.search()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$label_height: 40px;

.content {
  width: 100%;
  height: 100%;
  /*min-height: 480px;*/
  padding: 20px 10px 25px 10px;
  display: flex;
  flex-direction: column;

  .content-body {
    border: 1px solid #c7d5ee;
    height: 100%;
    padding: 15px 25px;
    min-height: 120px;

    .header-line {
      display: flex;
      flex-direction: row;

      .header-line-left {
        flex: 1;
        display: flex;
        flex-direction: row;

        .header-block {
          display: flex;
          flex-direction: row;

          .search-item {
            vertical-align: middle;
            display: inline-block;
            height: $label_height;
            line-height: $label_height;
            padding-right: 8px;
            min-width: 64px;
            color: grey;
            font-size: 16px;
            font-weight: 400;
          }
        }

        .phone-block {
          width: 200px;
        }

        .search-time {
          width: 440px;
        }
      }

      .header-line-right {
        min-width: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }

    .hr-diviser {
      border-top: solid #c8c8c8 1px;
      border-bottom: 0;
    }
  }
}
</style>
