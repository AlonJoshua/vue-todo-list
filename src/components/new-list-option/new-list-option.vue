<template>
  <div class="new-list-wrapper">
      <div class="add-list-btn" @click="addNewList">
          <div class="new-list-decreption">Create new list</div>
          <img class="add-list-icon" :src="SVGFiles.PLUS2"/>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            SVGFiles: {
                PLUS2: require('../../assets/plus2.svg')
            }
        }
    },
    methods: {
        addNewList() {
            this.$emit('addNewList');
        }
    }
}
</script>

<style lang="scss" scoped>
.new-list-wrapper {
    display: flex;
    /* margin: 8px; */
    box-shadow: 0px 0px 3px 0.5px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    /* padding: 7px; */
    height: 45px;
    min-width: 400px;
    margin: 45px 28px 30px;
    justify-content: space-evenly;
    align-items: center;
    .add-list-btn {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        border: 1px solid  rgba(0, 0, 0, 0.5);
        min-width: 150px;
        height: 35px;
        border-radius: 4px;
        opacity: 0.5;
        transition: 0.25s;
        .add-list-icon {
            width: 25px;
            opacity: 0.5;
        }
    }
    .add-list-btn:hover {
        border: 1px solid  rgba(0, 0, 0, 0.5);
        opacity: 0.8;
        cursor: pointer;
        transition: 0.5s;
    }
}
</style>