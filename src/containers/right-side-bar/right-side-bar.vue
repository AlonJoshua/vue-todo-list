<template>
  <div class="right-bar-wrapper">
      <right-bar-top-manu></right-bar-top-manu>
      <right-bar-item v-for="(item, index) in currentViewData"
                      :key="index"
                      :itemData="item">
      </right-bar-item>
      <div class="list-wrapper">
          <list v-show="!lists" 
                v-for="(item, index) in currentViewData"
                :key="index"
                :itemData="item"
                :sortOptions="sortOptions">
          </list>
      </div>
  </div>
</template>

<script>
import list from "../../containers/list/list.vue"
import rightBarItem from "./right-bar-item/right-bar-item.vue"
import rightBarTopManu from "./right-bar-top-manu/right-bar-top-manu.vue"
export default {
    props: {
        currentViewData: {},
        sortOptions: {}
    },
    components: {
        list,
        rightBarItem,
        rightBarTopManu
    }
}
</script>

<style lang="scss" scoped>
.right-bar-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-top: 50px;
    margin-left: 40px;
    min-width: 500px;
    height: 100%;
    background-color: white;
}
</style>