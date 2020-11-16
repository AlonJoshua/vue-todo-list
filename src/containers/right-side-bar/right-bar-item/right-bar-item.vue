<template>
  <div class="right-bar-item-wrapper"
       :class="{'empty-item-spot': itemData.isHidden}"
       draggable="true" 
       @dragstart="itemDragStart"
       @drag="itemDrag"
       @dragover.prevent
       @dragenter="itemDragEnter"
       @dragleave="itemDragLeave"
       @drop="itemDrop"
       @dragend="itemDragEnd">
       <div class="transparent-item-wrapper"
            :class="{'dragged': itemData.isHidden}">
            <div class="mid-sticker"></div>
            <div class="item-top-manu-wrapper">
                <item-info-btn :itemData="itemData"
                                v-on:itemDetailsClickHandler="itemDetailsClickHandler($event)">
                </item-info-btn>
                <item-labels :itemData="itemData" 
                            :labels="labels"
                            v-on:popupWindowLabelClick="popupWindowLabelClick($event)">
                </item-labels>
                <div class="options-popup-wrapper">
                    <three-dots-option-btn :itemData="itemData"
                                            v-on:threeDotsOptionsClick="threeDotsOptionsClick($event)">
                    </three-dots-option-btn>
                    <three-dots-option-popup-window ref="optionsWindow"
                                                    :optionsWindowProps="{isWindowOpen, isPopupWindowFocused}" 
                                                    :labels="labels"
                                                    v-on:popupWindowLabelClick="popupWindowLabelClick($event)"
                                                    v-on:closeOptionsWindow="closeOptionsWindow">
                    </three-dots-option-popup-window>
                </div>
            </div>
            <div class="item-content-wrapper">
                <status-dot :itemStatus="itemData.status"></status-dot>
                <text-title :itemData="itemData" 
                            v-on:updateItemName="updateItemName($event)">
                </text-title>
                <!-- <div class="action-icons-wrapper">
                    <done-icon :itemStatus="itemData.status" 
                                v-on:doneIconClickHandler="doneIconClickHandler(itemData)"></done-icon>
                    <delete-icon :itemData="itemData"
                                v-on:deleteIconClickHandler="deleteIconClickHandler($event)">
                    </delete-icon>
                </div> -->
            </div>
       </div>
  </div>
</template>

<script>
import statusDot from "../../../components/statuses/status-dot/status-dot.vue"
import itemInfoBtn from "../item-info-btn/item-info-btn.vue"
import itemLabels from "../../../components/labels/item-labels.vue"
import textTitle from "../../../components/texts/editable-text.vue"
// import doneIcon from "../../../components/icons/done-icon.vue"
// import deleteIcon from "../../../components/icons/delete-icon.vue"
import threeDotsOptionBtn from "../../../components/icons/three-dots-option-btn.vue"
import threeDotsOptionPopupWindow from "../../../components/windows/three-dot-pop-up-window.vue"

export default {
    props: {
        itemData: {},
        labels: {},
        dragDropData: {}
    },
    components: {
        statusDot,
        itemInfoBtn,
        itemLabels,
        textTitle,
        // doneIcon,
        // deleteIcon,
        threeDotsOptionBtn,
        threeDotsOptionPopupWindow
    },
    data() {
        return {
                isWindowOpen: false,
                isPopupWindowFocused: false,
                isOptionsBtnClicksToOpen: false,
        }
    },
    methods: {
        itemDetailsClickHandler(itemData) {
            this.$emit("itemDetailsClickHandler", itemData);
        },
        doneIconClickHandler(itemData) {
            this.$emit("doneIconClickHandler", itemData);
        },
        updateItemName(name) {
            this.$emit("updateItemName", {itemId: this.itemData.id, newName: name});
        },
        deleteIconClickHandler(itemData) {
            this.$emit("deleteIconClickHandler", itemData);
        },
        threeDotsOptionsClick(event) {
            event.preventDefault();
            if (!this.isOptionsBtnClicksToOpen || !this.isWindowOpen & !this.isPopupWindowFocused) {
                this.isWindowOpen = true;
                this.isPopupWindowFocused = true;
                this.isOptionsBtnClicksToOpen = true;
                this.$nextTick(() => this.$refs.optionsWindow.$el.focus());
            } else {
                this.isWindowOpen = false;
                this.isOptionsBtnClicksToOpen = false;
            }
        },
        closeOptionsWindow() {
            this.isPopupWindowFocused = false;
        },
        popupWindowLabelClick(label) {
            this.$emit("popupWindowLabelClick", label);
        },
        setCurrStatus() {
            let isAllItemsStatusesDone = true;
            for (let i = 0; i < this.itemData.items.length; i++) {
                if (this.itemData.items[i].status === "Open") {
                    isAllItemsStatusesDone = false;
                }
            }
            if (isAllItemsStatusesDone === true) {
                return "Done";
            } else {
                return "Open";
            }
        },
        itemDragStart(event) {
            this.$emit("itemDragStart", {itemData: this.itemData, event: event});
        },
        itemDrag(event) {
            this.$emit("itemDrag", event);
        },
        itemDragEnter(event) {
            if (event.srcElement.className === "mid-sticker") {
                this.$emit("itemDragEnter", this.itemData);
                // console.log("enter to mid-sticker")
            }
        },
        itemDragLeave() {
            // console.log(event.cancelable);
            this.$emit("itemDragLeave", this.itemData);
        },
        itemDrop(event) {
            event.preventDefault;
            this.$emit("itemDrop");
        },
        itemDragEnd() {
            this.$emit("itemDragEnd");
        }
    },
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
    .transparent-item-wrapper {
        margin: 5px;
    }
    .mid-sticker {
        opacity: 0;
        position: absolute;
        height: 20px;
        // background-color: black;
        z-index: 2;
        // background: lightgreen;
        width: 420px;
        margin-left: 10px;
        margin-top: 25px; 
        
        // top: -25px;
        // height: 7em;
        opacity: 0.9
    }
    .item-top-manu-wrapper {
        display: flex;
        justify-content: space-between;
        min-width: 430px;  
    }
    .item-content-wrapper {
        display: flex;
        align-items: center;
        width: 420px;
        margin-top: 5px;
        margin-bottom: 5px;
        .item-title {
        margin-left: 5px;
        }
    }
    .action-icons-wrapper {
        display: flex;
        margin-left: auto;
    }
}
.dragged {
    opacity: 0;
}
.empty-item-spot {
    background-color: #edf0f5;
}
</style>