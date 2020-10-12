<template>
  <div class="right-bar-top-manu-wrapper">
    <div class="add-btn-wrapper" @click="addBtnClick">
      <icon-btn class="add-btn-icon" :iconData="addBtnData"></icon-btn>
      <label class="add-btn-label" for=""> {{addBtnData.label}} </label>
      
    </div>
    <div class="changing-sort-by-title">sort title placeholder</div>
      
  </div>
</template>

<script>
import iconBtn from "../../../components/icons/svg-button-template.vue"

export default {
  components: {
    iconBtn
  },
  data() {
    return {
      addBtnData: {
        src: require("../../../assets/plus.svg"),
        label: "add item",
        iconSize: {
          width: "24px"
        }
      }
    }
  },
  methods: {
    addBtnClick() {
      this.$emit("addBtnClick");
    }
  }
}
</script>

<style lang="scss" scoped>
.right-bar-top-manu-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 450px;
    height: 50px;
    box-shadow: 0 1px 0px 0px rgb(218, 218, 218);
    .add-btn-wrapper {
      display: flex;
      justify-content: space-evenly;
      border: 1px solid rgb(218, 218, 218);
      border-radius: 5px;
      align-items: center;
      width: 105px;
      height: 30px;
      .add-btn-icon {
        display: flex;
      }
    }
}
</style>