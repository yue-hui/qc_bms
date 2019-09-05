<template>
  <div class="content">
    <!--搜索栏 start -->
    <div class="header-line">
      <div class="header-line-left">
        <div class="header-block search-time">
          <label class="search-item">时间范围:</label>
          <div class="block">
            <el-date-picker
              v-model="datetime_range"
              end-placeholder="结束日期"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              unlink-panels
              size="mini"
              @change="date_range_change" />
          </div>
        </div>
      </div>

      <!--<div class="header-line-right">-->
      <!--<el-button type="success" size="mini" @click="search">搜索</el-button>-->
      <!--</div>-->
    </div>
    <!--<hr class="hr-diviser">-->
    <!--搜索栏 end -->

    <div class="content-body">
      <!--概况数据 start -->
      <div class="statistics-summary">
        <kids-statistics-pannel ref="summary" />
      </div>
      <!--概况数据 end -->

      <hr class="hr-diviser">

      <!--图表数据 start -->
      <div class="statistics-diagram">
        <kids-diagram ref="diagram" :condition="condition" />
      </div>
      <!--图表数据 end -->

      <hr class="hr-diviser">

      <!--详情信息 start -->
      <kids-statics-details ref="details" :condition="condition" />
      <!--详情信息 end -->
    </div>
  </div>
</template>

<script>
import kidsStatisticsPannel from '@/views/analysis/components/kids_statistics_pannel'
import kidsDiagram from '@/views/analysis/components/kids_diagram'
import kidsStaticsDetails from '@/views/analysis/components/kids_details'
import dayjs from 'dayjs'

export default {
  components: {
    kidsStatisticsPannel,
    kidsDiagram,
    kidsStaticsDetails
  },
  data() {
    return {
      datetime_range: [],
      condition: {}
    }
  },
  computed: {},
  create: function() {
  },
  mounted: function() {
    this.init_data()
    this.$nextTick(() => {
      this.load_data()
    })
  },
  methods: {
    init_data: function() {
      const begin_time = dayjs().subtract(1, 'month').valueOf()
      const end_time = dayjs().subtract(1, 'day').valueOf()
      this.datetime_range = [begin_time, end_time]
      this.condition = {
        begin_time,
        end_time
      }
    },
    date_range_change(values) {
      this.condition = {
        begin_time: this.datetime_range[0].getTime(),
        end_time: this.datetime_range[1].getTime()
      }
      this.$nextTick(() => {
        this.search()
      })
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
      // const options = this.get_config()
      // this.$refs.summary.search(options)
      this.$refs.diagram.search()
      this.$refs.details.search()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$label_height: 28px;

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

    .hr-diviser {
      border: 0;
    }
  }

  .header-line {
    display: flex;
    flex-direction: row;
    padding: 15px 0;

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
          min-width: 60px;
          color: #4d4d4d;
          font-size: 14px;
          font-weight: 600;
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
}
</style>
