<template>
  <div class="content">
    <div v-loading="loading" class="content-body">
      <el-form ref="form" :model="form" size="mini" class="invatation-form" label-width="140px">
        <el-form-item label="邀请注册活动名称">
          <el-input v-model="form.name" size="mini" />
        </el-form-item>
        <el-form-item size="mini" label="会员套餐ID">
          <el-select
            v-model="form.member_plan_id"
            :remote-method="user_search_member_plan_by_plan_name"
            size="mini"
            filterable
            clearable
            remote
            class="plan-list-select"
            placeholder="请选择活动区域"
            @change="member_plan_list_change"
            @clear="clear_member_plan_list">
            <el-option
              v-for="(membership, index) in membership_package_list"
              :key="index"
              :label="membership.label"
              :value="membership.value"
              size="mini" />
          </el-select>
        </el-form-item>
        <el-form-item label="会员套餐名称">
          <el-input v-model="form.member_plan_name" size="mini" />
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="form.datetime_range"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item label="备注（规则说明）">
          <el-input v-model="form.remark" size="mini" type="textarea" />
        </el-form-item>
        <el-form-item>
          <gl-button pid="20040" size="mini" type="primary" @click="init_page">重置</gl-button>
          <gl-button :disabled="is_busy" pid="20041" size="mini" type="primary" @click="save_invatation">保存</gl-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  edit_invite_register_activity,
  get_invite_register_activity_info,
  get_member_plan_list
} from '@/api/interactive'
import dayjs from 'dayjs'
import { DATE_TIME_FORMAT } from '@/utils/constant'

export default {
  name: 'InvatationDetails',
  components: {},
  data() {
    return {
      loading: false,
      is_busy: false,
      form: {
        name: '',
        member_plan_id: '',
        member_plan_name: '',
        datetime_range: '',
        remark: ''
      },
      membership_package_list: []
    }
  },
  computed: {},
  mounted: function() {
    this.load_member_list()
  },
  methods: {
    get_config() {
      const params = {}
      Object.keys(this.form).map(key => {
        if (key === 'datetime_range') {
          return
        }
        const value = this.form[key]
        if (value) {
          params[key] = value
        }
      })
      const date_range = this.form.datetime_range
      if (date_range && date_range[0] && date_range[1]) {
        const begin_time = dayjs(date_range[0]).valueOf()
        params['begin_time'] = begin_time
        const end_time = dayjs(date_range[1]).valueOf()
        params['end_time'] = end_time
      }
      return params
    },
    save_invatation() {
      this.is_busy = true
      const data = this.get_config()
      edit_invite_register_activity(data).then(res => {
        if (res.status === 0) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.is_busy = false
      })
    },
    user_search_member_plan_by_plan_name(plan_name) {
      this.fetch_member_plan_list(plan_name)
    },
    clear_member_plan_list() {
      this.form.member_plan_id = ''
      this.fetch_member_plan_list()
    },
    fetch_member_plan_list(plan_name) {
      return new Promise((resolve, reject) => {
        const config = {
          plan_type: '02'
        }
        if (plan_name) {
          config['plan_name'] = plan_name
        }
        get_member_plan_list(config).then(res => {
          if (res.status === 0) {
            const remote_data = res.data
            this.membership_package_list = remote_data.map(r => {
              return {
                value: r.plan_id,
                label: r.plan_name
              }
            })
          } else {
            this.$message.error(res.message)
          }
        }).finally(() => {
          resolve()
        })
      })
    },
    load_member_list() {
      this.loading = true
      this.fetch_member_plan_list().then(() => {
        this.init_page()
      }).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 300)
      })
    },
    init_page() {
      get_invite_register_activity_info().then(res => {
        if (res.status === 0) {
          const datetime_range = []
          if (!res.data.begin_time) {
            datetime_range[0] = dayjs().format(DATE_TIME_FORMAT)
          } else {
            datetime_range[0] = res.data.begin_time
          }
          if (!res.data.end_time) {
            datetime_range[1] = dayjs().format(DATE_TIME_FORMAT)
          } else {
            datetime_range[1] = res.data.end_time
          }
          this.form = {
            ...res.data,
            datetime_range
          }
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    member_plan_list_change(plan_id) {
      const member_plan = this.membership_package_list.find(r => r.value === plan_id)
      this.form.member_plan_name = member_plan.label
    }
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
    min-height: 120px;
    padding: 20px;

    .invatation-form {
      width: 800px;

      .plan-list-select {
        width: 200px;
      }
    }
  }
}
</style>
