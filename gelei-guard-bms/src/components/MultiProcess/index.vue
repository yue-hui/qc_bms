<template>
  <div class="content">
    <div v-for="(item, index) in inner_items" :key="index" class="content-items">
      <div class="item-name">{{ item.name }}</div>
      <div :style="{ 'background-color': item.color, 'width': item.width + 'px' }" class="item-process" />
      <div class="item-value">{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiProcess',
  components: {},
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      offset_width: 0,
      inner_items: []
    }
  },
  mounted: function() {
    this.offset_width = this.$el.offsetWidth - 20 - 120
    const item_value_list = this.items.map(r => +r.value)
    const max_width = Math.max(...item_value_list)
    this.inner_items = this.items.map(r => {
      const width = parseInt((r.value / max_width) * this.offset_width)
      return {
        ...r,
        width
      }
    })
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
  align-items: center;

  .content-items {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .item-name {
      width: 60px;
      font-size: 14px;
      padding-right: 5px;
    }

    .item-process {
      height: 8px;
      border-radius: 5px;
      background-color: red;
    }

    .item-value {
      width: 60px;
      font-size: 14px;
      padding-left: 5px;
    }
  }
}
</style>
