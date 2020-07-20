<template>
  <div class="el-page-header">
    <div class="el-page-header__left" @click="$emit('back')">
      <i class="el-icon-back" />
      <div class="el-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div class="el-page-header__content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElPageHeader',

  props: {
    title: {
      type: String,
      default() {
        return '返回'
      }
    },
    content: {
      type: String,
      default() {
        return ''
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-page-header {
  display: flex;
  line-height: 24px;
}

.el-page-header__left {
  display: flex;
  cursor: pointer;
  margin-right: 40px;
  position: relative;
}

.el-page-header__left:after {
  content: "";
  position: absolute;
  width: 1px;
  height: 16px;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #dcdfe6;
}

.el-page-header__left .el-icon-back {
  font-size: 18px;
  margin-right: 6px;
  align-self: center;
}

.el-page-header__title {
  font-size: 14px;
  font-weight: 500;
}

.el-page-header__content {
  font-size: 16px;
  color: #303133;
}
</style>
