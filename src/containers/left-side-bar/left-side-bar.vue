<template>
  <div class="left-bar-wrapper">
      <over-view :leftBarCurrViewData="leftBarCurrViewData">          
      </over-view>
      <status-card></status-card>
      <status-card></status-card>
      <status-card></status-card>
  </div>
</template>

<script>
import overView from "./overview-card/overview-card.vue"
import StatusCard from "../../components/statuses/left-bar-status-card/lef-bar-status-card.vue"
export default {
    components: {
        overView,
        StatusCard
    },
    props: {
        leftBarCurrViewData: {}
    },
    methods: {
        dashboardBtnHandler() {
            console.log("click");
            this.$emit("dashboardBtnHandler");
        }
    }
}
</script>

<style lang="scss" scoped>
.left-bar-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    min-width: 300px;
    width: 100%;
    height: 100%;
}
</style>