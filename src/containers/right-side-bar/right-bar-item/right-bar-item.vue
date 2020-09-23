<template>
  <div class="right-bar-item-wrapper">
      <item-info-btn :itemData="itemData"></item-info-btn>
      <div class="item-title-wrapper">
          <green-dot></green-dot>
          <div class="item-title">{{itemData.name}}</div>
    </div>
  </div>
</template>

<script>
import greenDot from "../../../components/statuses/green-dot/green-dot.vue"
import itemInfoBtn from "../item-info-btn/item-info-btn.vue"
export default {
    props: {
        itemData: {}
    },
    components: {
        greenDot,
        itemInfoBtn
    }
}
</script>

<style lang="scss" scoped>
.right-bar-item-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 2px;
    width: 450px;
    box-shadow: 0 1px 0px 0px rgb(218, 218, 218);
    .item-title-wrapper {
        display: flex;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 5px;
        .item-title {
        margin-left: 5px;
        }
    }
}
</style>