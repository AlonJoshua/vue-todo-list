<template>
  <div class="left-bar-wrapper">
      <over-view :leftBarCurrViewData="leftBarCurrViewData">          
      </over-view>
      
      <left-side-done-item 
      v-for="(item, index) in doneListData"
      :key="index.status === itemStatuses.DONE"
      :itemData="item">
      </left-side-done-item>
  </div>
</template>

<script>
import overView from "./overview-card/overview-card.vue"
import leftSideDoneItem from "../left-side-bar/left-side-done-item/left-side-done-item.vue"
export default {
    components: {
        overView,
        leftSideDoneItem
    },
    props: {
        leftBarCurrViewData: {},
        itemStatuses: {}
    },
    methods: {
        dashboardBtnHandler() {
            console.log("click");
            this.$emit("dashboardBtnHandler");
        }
    },
    computed: {
        doneListData() {
            return this.leftBarCurrViewData.items.filter(item => item.status === this.itemStatuses.DONE);
        }
    }
}
</script>

<style lang="scss" scoped>
.left-bar-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-width: 300px;
    width: 100%;
    height: 100%;
}
</style>