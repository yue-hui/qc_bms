<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="summary-title">整体数据指标(昨日)</span>
    </div>
    <div class="component-card">
      <div class="row row-1">
        <div class="column column-1">新增注册用户</div>
        <div class="column column-2">{{ statistics.increased_user }}</div>
        <div class="column column-3">
          日
          <svg-icon
            :icon-class="judge_direction(statistics.increased_user_percent)"
            :class="increased_user_percent_class" />
          {{ statistics.increased_user_percent | abs }}%
        </div>
      </div>
      <div class="row row-2">
        <div class="column column-1">新增绑定用户</div>
        <div class="column column-2">{{ statistics.increased_bind_user }}</div>
        <div class="column column-3">
          日
          <svg-icon
            :icon-class="judge_direction(statistics.increased_bind_user_percent)"
            :class="increased_bind_user_percent_class" />
          {{ statistics.increased_bind_user_percent | abs }}%
        </div>
      </div>
      <!--<div class="row row-3">
        <div class="column column-1">新增绑定设备</div>
        <div class="column column-2">{{ statistics.increased_bind_device }}</div>
        <div class="column column-3">
          日
          <svg-icon
            :icon-class="judge_direction(statistics.increased_bind_device_percent)"
            :class="judge_direction(statistics.increased_user_percent)" />
          {{ statistics.increased_bind_device_percent | abs }}%
        </div>
      </div>-->
      <div class="row row-4">
        <div class="column column-1">总注册用户数</div>
        <div class="column column-2">{{ statistics.total_user }}</div>
        <div class="column column-3" />
      </div>
    </div>
  </el-card>
</template>

<script>
import { get_user_analysis_child_summary } from '@/api/interactive'
import { DAY_MICROSECOND } from '@/utils/constant'

export default {
  name: 'StatisticsPannel',
  beforecreate: function() {
  },
  filters: {
    abs: function(percent) {
      if (percent === undefined) {
        return ''
      } else {
        return Math.abs(percent)
      }
    }
  },
  props: {},
  data: function() {
    return {
      statistics: {}
    }
  },
  computed: {
    increased_user_percent_class: function() {
      if (this.statistics && this.statistics.increased_user_percent) {
        return this.judge_direction(this.statistics.increased_user_percent)
      } else {
        return ''
      }
    },
    increased_bind_user_percent_class: function() {
      if (this.statistics && this.statistics.increased_bind_user_percent) {
        return this.judge_direction(this.statistics.increased_bind_user_percent)
      } else {
        return ''
      }
    }
  },
  watch: {},
  mounted: function() {
    this.search()
  },
  methods: {
    judge_direction: function(direct) {
      direct = +direct
      if (direct > 0) {
        return 'upper'
      } else if (direct < 0) {
        return 'down'
      } else {
        return 'fair'
      }
    },
    load_summary: function(data) {
      get_user_analysis_child_summary(data).then(res => {
        this.statistics = res.data
      })
    },
    search() {
      // search 如果参数为
      const pre_day_unix_stamp = new Date().getTime() - DAY_MICROSECOND
      const data = {
        begin_time: pre_day_unix_stamp,
        end_time: pre_day_unix_stamp
      }
      this.load_summary(data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$column_1_height: 28px;
$column_2_height: 40px;
$column_3_height: 28px;
$pannel_border_color: 1px solid rgba(192, 214, 206, 0.4);
.summary-title {
  font-size: 16px;
}

.component-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  border: $pannel_border_color;

  .row {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-right: $pannel_border_color;

    &:last-child {
      border-right: 0;
    }

    .column {
      text-align: center;
      /*padding: 5px 10px;*/
    }

    .column-1 {
      font-size: 14px;
      height: $column_1_height;
      line-height: $column_1_height;
      display: flex;
      justify-content: center;
      vertical-align: center;
    }

    .column-2 {
      font-size: 32px;
      font-weight: 600;
      height: $column_2_height;
      line-height: $column_2_height;
    }

    .column-3 {
      font-size: 14px;
      height: $column_3_height;
      line-height: $column_3_height;
    }
  }

  .row-1, .row-2, .row-3, .row-4 {
    padding: 10px 0;
  }
}

.upper {
  color: red;
}

.fair {
  color: grey;
}

.down {
  color: green;
}
</style>
