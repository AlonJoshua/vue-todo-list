<template>
  <div class="item-info-btn-wrapper"
       @click="itemDetailsClickHandler">
      <div class="item-info-title" readonly>See item details</div>
  </div>
</template>

<script>
export default {
    props: {
        itemData: {}
    },
    data() {
        return {

        }
    },
    methods: {
        itemDetailsClickHandler() {
            this.$emit("itemDetailsClickHandler", this.itemData);
        }
    }
}
</script>

<style lang="scss" scoped>
.item-info-btn-wrapper {
    display: flex;
    width: fit-content;
    margin-top: 9px;
    margin-left: 0;
    user-select: none;
    .item-info-title {
        font-size: 0.9em;
        color: rgb(149, 176, 212);
    }
}
.item-info-btn-wrapper:hover {
    cursor: pointer;
}
</style>