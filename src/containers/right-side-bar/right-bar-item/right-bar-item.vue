<template>
  <div class="right-bar-item-wrapper">
      <item-info-btn :itemData="itemData"
                     v-on:itemDetailsClickHandler="itemDetailsClickHandler($event)">
      </item-info-btn>
      <div class="item-title-wrapper">
          <status-dot :itemStatus="itemData.status"></status-dot>
          <div class="item-title">{{itemData.name}}</div>
    </div>
  </div>
</template>

<script>
import statusDot from "../../../components/statuses/status-dot/status-dot.vue"
import itemInfoBtn from "../item-info-btn/item-info-btn.vue"
export default {
    props: {
        itemData: {}
    },
    components: {
        statusDot,
        itemInfoBtn
    },
    data() {
        return {}
    },
    methods: {
        itemDetailsClickHandler(itemData) {
            this.$emit("itemDetailsClickHandler", itemData);
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
        }
    },
    computed: {}
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
    .item-title-wrapper {
        display: flex;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 5px;
        .item-title {
        margin-left: 5px;
        }
    }
}
</style>