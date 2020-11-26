<template>
  <div class="right-bar-wrapper">
      <right-bar-top-manu :sortSelectData="sortSelectData"
                          @addBtnClick="addBtnClick"
                          @sortItemsBySelect="sortItemsBySelect($event)">
      </right-bar-top-manu>
      <div class="scrollbar-wrapper">
        <right-bar-item v-for="(item, index) in rightBarCurrViewData"
                        :key="index"
                        :itemData="item"
                        :labels="labels"
                        :dragDropData="dragDropData"
                        @doneIconClickHandler="doneIconClickHandler($event)"
                        @itemDetailsClickHandler="itemDetailsClickHandler($event)"
                        @updateItemName="updateItemName($event)"
                        @deleteIconClickHandler="deleteIconClickHandler($event)"
                        @popupWindowLabelClick="popupWindowLabelClick({item, $event})"
                        @itemDragStart="itemDragStart($event)"
                        @itemDrag="itemDrag($event)"
                        @itemDragEnter="itemDragEnter($event)"
                        @itemDrop="itemDrop($event)"
                        @itemDragEnd=itemDragEnd($event)>
        </right-bar-item>
      </div>
  </div>
</template>
<script>
import rightBarItem from "./right-bar-item/right-bar-item.vue"
import rightBarTopManu from "./right-bar-top-manu/right-bar-top-manu.vue"
export default {
    props: {
        rightBarCurrViewData: {},
        labels: {},
        dragDropData: {},
        sortSelectData: {},
        itemStatuses: {}
    },
    components: {
        rightBarItem,
        rightBarTopManu
    },
    methods: {
        itemDetailsClickHandler(itemData) {
            this.$emit("itemDetailsClickHandler", itemData);
        },
        doneIconClickHandler(itemData) {
            this.$emit("doneIconClickHandler", itemData);
        },
        sortItemsBySelect(optionSelect) {
            this.$emit("sortItemsBySelect", optionSelect);
        },
        updateItemName(name) {
            this.$emit("updateItemName", name);
        },
        deleteIconClickHandler(itemData) {
            this.$emit("deleteIconClickHandler", itemData);
        },
        addBtnClick() {
            this.$emit("addBtnClick");
        },
        popupWindowLabelClick(data) {
            this.$emit("popupWindowLabelClick", data);
        },
        itemDragStart(data) {
            data.listData = this.rightBarCurrViewData;
            this.$emit("itemDragStart", data);
        },
        itemDrag(event) {
            // console.log("2 right")
            this.$emit("itemDrag", event);
        },
        itemDragEnter(data) {
            data.listData = this.rightBarCurrViewData;
            this.$emit("itemDragEnter", data);
        },
        itemDrop(data) {
            data.listData = this.rightBarCurrViewData;
            this.$emit("itemDrop", data);
        },
        itemDragEnd(data) {
            data.listData = this.rightBarCurrViewData;
            this.$emit("itemDragEnd", data)
        }
    },
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