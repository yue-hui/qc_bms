<template>
  <button
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled || !buttonPermission,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
    class="el-button"
    @click="handleClick">
    <i v-if="loading" class="el-icon-loading" />
    <i v-if="icon && !loading" :class="icon" />
    <span v-if="$slots.default"><slot /></span>
  </button>
</template>
<script>
import { mapGetters } from 'vuex'
import { W_CONSTANT } from '@/utils/constant'
import { getButtonPermission } from '@/utils/auth'

const open_btn_permission = getButtonPermission()

export default {
  name: 'GlButton',
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    pid: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      tooltipDisabled: true // 带权限接口true 有权限 false 无权限
    }
  },
  computed: {
    own_permission() {
      const permission = this.pid.replace(/ /g, '')
      const permission_split = permission.split(',')
      return permission_split.map(r => '' + r)
    },
    ...mapGetters({
      'permission': 'btns',
      'auths': 'auths'
    }),
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    buttonSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    buttonPermission() {
      if (['true', true].indexOf(open_btn_permission) !== -1) {
        return true
      }
      const permissions = this.permission.concat(this.auths)
      return this.own_permission.some(p => {
        return permissions.indexOf(p) !== -1
      })
    },
    buttonDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    }
  },
  mounted() {
    // console.log('buttonPermission:', this.buttonPermission, this.permission.concat(this.auths), this.own_permission)
    // const permissions = this.permission.concat(this.auths)
    // const result = this.own_permission.some(p => {
    //   console.log('compare: ', p, permissions)
    //   return permissions.indexOf(p) !== -1
    // })
    // console.log('result: ', result)
  },
  methods: {
    handleClick(evt) {
      if (!this.buttonPermission) {
        if (this.own_permission.length && parseInt(this.own_permission[0] / W_CONSTANT) === 1) {
          // 英文逗号
          this.$message.info('你暂未开通该权限, 请联系管理员开通')
        } else {
          this.$message.info('你暂未开通该权限，请联系管理员开通')
        }
      } else {
        this.$emit('click', evt)
      }
    }
  }
}
</script>
