<template>
  <div class="component-card">
    <el-tabs v-model="active_name" type="border-card" @tab-click="tab_change">
      <el-tab-pane label="新增注册用户" name="1">
        <ve-line ref="chart1" :data="options" />
      </el-tab-pane>
      <el-tab-pane label="新增绑定用户" name="2">
        <ve-line ref="chart2" :data="options" />
      </el-tab-pane>
      <el-tab-pane label="新增绑定设备" name="3">
        <ve-line ref="chart3" :data="options" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  get_bind_device_increased_data,
  get_bind_user_increased_data,
  get_user_increased_data
} from '@/api/interactive'

export default {
  name: 'Diagram',
  beforecreate: function() {
  },
  props: {
    condition: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    return {
      active_name: '1',
      options: {}
    }
  },
  computed: {},
  watch: {
    active_name(v) {
      this.$nextTick(_ => {
        this.$refs[`chart${v}`].echarts.resize()
      })
    }
  },
  mounted: function() {
    // this.build_xzyh()
  },
  methods: {
    tab_change: function(active_name) {
      if (this.active_name === '1') {
        this.build_xzyh()
      } else if (this.active_name === '2') {
        this.build_xzsb()
      } else if (this.active_name === '3') {
        this.build_bd_yh()
      } else {
        console.error('error active name', this.active_name)
      }
    },
    chart_events: function(res) {
    },
    build_xzyh: function() {
      const options = this.condition
      get_user_increased_data(options).then(res => {
        this.options = {
          columns: ['日期', '新增注册用户'],
          rows: res.data.map(r => {
            return {
              '日期': r.date,
              '新增注册用户': r.count
            }
          })
        }
      })
    },
    build_xzsb: function() {
      const options = this.condition
      get_bind_user_increased_data(options).then(res => {
        this.options = {
          columns: ['日期', '新增绑定用户'],
          rows: res.data.map(r => {
            return {
              '日期': r.date,
              '新增绑定用户': r.count
            }
          })
        }
      })
    },
    build_bd_yh: function() {
      const options = this.condition
      get_bind_device_increased_data(options).then(res => {
        this.options = {
          columns: ['日期', '新增绑定设备'],
          rows: res.data.map(r => {
            return {
              '日期': r.date,
              '新增绑定设备': r.count
            }
          })
        }
      })
    },
    search() {
      this.tab_change(this.active_name)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-card {
  width: 100%;
  height: 100%;

  .chart-area {
    /*width: 1000px;*/
    /*height: 600px;*/
    min-width: 400px;
    min-height: 400px;
  }
}
</style>
