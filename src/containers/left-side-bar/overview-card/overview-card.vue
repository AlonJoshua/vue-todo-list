<template>
  <div class="overview-card-wrapper">
      <div class="styled-view-status-bar"></div>
      <div class="current-view-title" v-if="!currentView">{{ mainCurrentViewTitle }}</div>
      <div class="current-view-title" v-else>{{ currentView }}</div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    currentView: {}
  },
  data() {
    return {
      mainCurrentViewTitle: "Projects"
    }
  }
}
</script>

<style lang="scss" scoped>
.overview-card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 250px;
  min-height: 150px;
  margin-top: 50px;
  margin-right: 40px;
  background-color: white;
}
</style>