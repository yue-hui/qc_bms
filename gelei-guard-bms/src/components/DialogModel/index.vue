<template>
  <div class="component-card-with-dialog">
    <div class="component-card">
      <div class="dialog">
        <div class="head-area">
          <div class="title">创建套餐</div>
          <div class="close-icon"><i class="el-message-box__close el-icon-close" /></div>
        </div>
        <div class="body-area">
        </div>
        <div class="footer-area"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  beforecreate: function() {
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {}
  },
  computed: {},
  watch: {},
  mounted: function() {
  },
  methods: {
    handleClose: function() {
      console.log('x---')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$title_height: 40px;
$z_index: 2000;
.component-card-with-dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z_index;

  .component-card {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .dialog {
      width: 800px;
      heigth: 400px;
      position: relative;
      background-color: #FFF;
      z-index: $z_index + 1;
      overflow-y: scroll;

      .head-area {
        display: block;
        height: $title_height;
        line-height: $title_height;
        padding: 0 10px;
        position: relative;
        font-size: 16px;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        background-color: #fbfbff;
        border-bottom: rgba(103, 103, 103, 0.59) 1px solid;

        .title{
          flex: 1;
        }

        .close-icon {
          font-weight: 100;
          font-size: 20px;
          width: 20px;
          height: 20px;
          cursor: pointer;
          color: #909399;
        }
      }

      .body-area{
        min-height: 400px;
      }

      .footer-area{
        height: 60px;
        line-height: 60px;
        border-top: 1px solid #eee;
      }
    }
  }
}
</style>
