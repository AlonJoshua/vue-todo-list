<template>
  <div class="done-item-wrapper" 
       :class="{'empty-spot': itemData.isHidden}"
       draggable="true" 
       @dragstart="itemDragStart"
       @drag="itemDrag"
       @dragover.prevent
       @dragenter="itemDragEnter"
       @drop="itemDrop"
       @dragend="itemDragEnd">
       <div class="mid-sticker"></div>
       <div  class="sticker"
             :class="{'empty-spot': itemData.isHidden}"
             >
             <div  class="sticker"
                   :class="{'transparent': itemData.isHidden}">
                   <span class="item-name">{{itemData.name}}</span>
                   <done-icon :itemStatus="itemData.status"></done-icon>
             </div>
      </div>
  </div>
</template>

<script>
import doneIcon from "../../../components/icons/done-icon"

export default {
    components: {
        doneIcon
    },
    data() {
        return {
            event: null
        }
    },
    props: {
        itemData: {}
    },
    methods: {
        itemDragStart(event) {
            this.$emit("itemDragStart", {itemData: this.itemData, event: event});
        },
        itemDrag(event) {
            if (event.srcElement === null) {
                event = this.event;
                console.log("was null")
                this.$emit("itemDrag", event);
            } else {
                console.log(event)
                this.event = event;
                console.log("was ok")
                this.$emit("itemDrag", event);
            }
            // console.log(event)
            // console.log("1 left")
        },
        itemDragEnter(event) {
            event.itemData = this.itemData;
            if (event.srcElement.className === "mid-sticker") {
                this.$emit("itemDragEnter", event);
            }
        },
        itemDrop(event) {
            event.preventDefault;
            this.$emit("itemDrop", event);
        },
        itemDragEnd(event) {
            this.$emit("itemDragEnd", event);
        }
    }
}
</script>

<style lang="scss" scoped>
    .done-item-wrapper {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        width: 350px;
        background-color: white;
        box-shadow: 0 1px 0px 0px rgb(218, 218, 218);
        .mid-sticker {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        height: 20px;
        z-index: 2;
        width: 330px;
        }
        .sticker {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1 1 auto;
        }
        .transparent {
            opacity: 0;
        }
        .item-name {
            margin-left: 20px;
        }
    }
    .done-item-wrapper:not(:last-child) {
        margin-bottom: 5px;
    }
    done-icon {
        margin-right: 20px;
    }
    .empty-spot {
        background-color: #edf0f5;
    }
</style>