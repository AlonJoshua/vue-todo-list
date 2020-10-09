<template>
  <div class="dot" :class=" { done: computedStatus } "></div>
</template>

<script>
export default {
  props: {
    itemStatus: {}
  },
  computed: {
    computedStatus() {
      if (this.itemStatus ==="Open") {
        return false;
      } else {
        return true;
      }
    } 
  }
}
</script>

<style lang="scss" scoped>
.dot {
    width: 11px;
    height: 11px;
    background-color:rgb(255, 106, 106);
    border-radius: 6px;
}
.done {
  background-color: rgb(46, 200, 151);
}
</style>