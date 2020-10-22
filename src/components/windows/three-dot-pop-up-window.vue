<template>
  <div class="three-dots-popup-window-wrapper"
       v-show="labelOptionsWindow"
       tabindex="-1"
       @blur="closeOptionsWindow">
    <span class="popup-title">
      {{labels.popupTitle}}
    </span>
    <div v-for="(card, index) in labels.popupCardsList" 
        :key="index"
        class="labels-card-list">
      <span class="label-card" 
            :style="{backgroundColor: card.color}"
            @click="popupWindowLabelClick(card)">{{card.title}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    labelOptionsWindow: {},
    labels: {}
  },
  methods: {
    popupWindowLabelClick(card) {
      this.$emit("popupWindowLabelClick", card);
    },
    closeOptionsWindow() {
      this.$emit("closeOptionsWindow");
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
}
.three-dots-popup-window-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  min-width: 200px;
  min-height: 200px;
  margin-left: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 2px 1px #dadada;
  .popup-title {
    display: flex;
    justify-content: center;
    margin: 0 12px;
    border-bottom: 1px solid #dadada;
    color: #95b0d4;
    font-weight: 400;
    line-height: 40px;
    user-select: none;
  }
  .labels-card-list {
    display: flex;
    justify-content: center;
    .label-card {
      display: flex;
      padding: 5px 10px;
      flex: 1 1 auto;
      color: white;
      margin: 10px 12px;
      border-radius: 4px;
      user-select: none;
    }
    .label-card:hover {
      cursor: pointer;
    }
  }
}
.three-dots-popup-window-wrapper:focus {
    outline: 0px solid transparent;
}
</style>