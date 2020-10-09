// 1) depend on item status, 

<template>
  <div class="right-bar-wrapper">
      <right-bar-top-manu></right-bar-top-manu>
      <right-bar-item v-for="(item, index) in rightBarCurrViewData.items"
                      :key="index"
                      :itemData="item"

                      v-on:itemDetailsClickHandler="itemDetailsClickHandler($event)">
      </right-bar-item>
  </div>
</template>
<script>
import rightBarItem from "./right-bar-item/right-bar-item.vue"
import rightBarTopManu from "./right-bar-top-manu/right-bar-top-manu.vue"
export default {
    props: {
        rightBarCurrViewData: {},
        sortOptions: {}
    },
    components: {
        rightBarItem,
        rightBarTopManu
    },
    data() {
        return {
        }
    },
    methods: {
        itemDetailsClickHandler(itemData) {
            this.$emit("itemDetailsClickHandler", itemData);
        },
        checkItems() {
            console.log()
        }
    },
    computed: {
        
    },
    mounted() {
        // console.log("Mounted right bar comp data: ", this.rightBarCurrViewData);
    },
    updated() {
        // console.log("Updated right bar comp data: ", this.rightBarCurrViewData);
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