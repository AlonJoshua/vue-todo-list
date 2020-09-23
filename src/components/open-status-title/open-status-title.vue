<template>
  <div class="open-status-wrapper">
    <green-dot></green-dot>
    <div class="status-title">status placeholder</div>
  </div>
</template>

<script>
import greenDot from "../statuses/green-dot/green-dot.vue"
export default {
  components: {
    greenDot
  }
}
</script>

<style lang="scss" scoped>
.open-status-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .status-title {
    font-size: 1em;
    margin-left: 3px;
  }
}
</style>