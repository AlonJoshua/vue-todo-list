// 1) Fix progress bar placement change that moves depend on view title

<template>
  <div class="overview-card-wrapper">
      <progress-bar :leftBarCurrViewData="leftBarCurrViewData"></progress-bar>
      <div class="current-view-title-wrapper">
        <div class="current-view-title"> 
           {{ leftBarCurrViewData.name }} 
        </div>
      </div>
  </div>
</template>

<script>
import progressBar from "../../../components/progress-bar/progress-bar.vue"

export default {
  components: {
    progressBar
  },
  props: {
    leftBarCurrViewData: {}
  },
  data() {
    return {
      defaultOverviewTitle: "Current projects"
    }
  }
}
</script>

<style lang="scss" scoped>
.overview-card-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 150px;
  margin-top: 50px;
  margin-right: 40px;
  background-color: white;
  .current-view-title-wrapper {
    display: flex;
    flex: 1 1 auto;
    margin-left: 20px;
  }
}
</style>