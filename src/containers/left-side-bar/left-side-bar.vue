<template>
  <div class="left-bar-wrapper">
      <over-view :progressBarData="currBarsView">          
      </over-view>
      <div class="left-bar-done-list-wrapper">
        <left-side-done-item 
        v-for="(item, index) in leftBarDoneItems"
        :key="index"
        :itemData="item"
        @itemDragStart="itemDragStart($event)"
        @itemDrag="itemDrag($event)"
        @itemDragEnter="itemDragEnter($event)"
        @itemDrop="itemDrop($event)"
        @itemDragEnd=itemDragEnd($event)>
        </left-side-done-item>
      </div>
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
        currBarsView: {},
        leftBarDoneItems: {},
        itemStatuses: {}
    },
    methods: {
        // dashboardBtnHandler() {
        //     console.log("click");
        //     this.$emit("dashboardBtnHandler");
        // }
        itemDragStart(data) {
            data.listData = this.leftBarDoneItems;
            this.$emit("itemDragStart", data);
        },
        itemDrag(event) {
            // console.log("2 left")
            // console.log(event)
            this.$emit("itemDrag", event);
        },
        itemDragEnter(data) {
            data.listData = this.leftBarDoneItems;
            this.$emit("itemDragEnter", data);
        },
        itemDrop(data) {
            data.listData = this.leftBarDoneItems;
            this.$emit("itemDrop", data);
        },
        itemDragEnd(data) {
            data.listData = this.leftBarDoneItems;
            this.$emit("itemDragEnd", data)
        }
    },
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
    .left-bar-done-list-wrapper {
        margin-right: 40px;
        padding: 5px;
        background-color: white;
    }
}
</style>