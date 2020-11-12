<template>
  <div class="right-bar-wrapper">
      <right-bar-top-manu v-on:addBtnClick="addBtnClick"
                          v-on:sortItemsBySelect="sortItemsBySelect($event)">
      </right-bar-top-manu>
      <right-bar-item v-for="(item, index) in rightBarCurrViewData.items"
                      :key="index"
                      :itemData="item"
                      :labels="labels"
                      :dragDropData="dragDropData"
                      v-on:doneIconClickHandler="doneIconClickHandler($event)"
                      v-on:itemDetailsClickHandler="itemDetailsClickHandler($event)"
                      v-on:updateItemName="updateItemName($event)"
                      v-on:deleteIconClickHandler="deleteIconClickHandler($event)"
                      v-on:popupWindowLabelClick="popupWindowLabelClick({item, $event})"
                      v-on:itemDragStart="itemDragStart($event)"
                      v-on:itemDrag="itemDrag($event)"
                      v-on:itemDragEnter="itemDragEnter($event)"
                      v-on:itemDragLeave="itemDragLeave($event)"
                      v-on:itemDrop="itemDrop($event)"
                      v-on:itemDragEnd=itemDragEnd>
      </right-bar-item>
  </div>
</template>
<script>
import rightBarItem from "./right-bar-item/right-bar-item.vue"
import rightBarTopManu from "./right-bar-top-manu/right-bar-top-manu.vue"
export default {
    props: {
        rightBarCurrViewData: {},
        labels: {},
        dragDropData: {}
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
            this.$emit("itemDragStart", data);
        },
        itemDrag(event) {
            this.$emit("itemDrag", event);
        },
        itemDragEnter(data) {
            this.$emit("itemDragEnter", data);
        },
        itemDragLeave(data) {
            this.$emit("itemDragLeave", data);
        },
        itemDrop() {
            this.$emit("itemDrop");
        },
        itemDragEnd() {
            this.$emit("itemDragEnd")
        }
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