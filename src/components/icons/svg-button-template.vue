<template>
  <div class="icon-wrapper">
      <img class="icon" :src="iconData.src" :width="iconData.iconSize.width" alt="">
  </div>
</template>

<script>
// import SVGs from "../../../images.json"

export default {
    props: {
        iconData: {}
    }
}
</script>

<style lang="scss" scoped>
.icon-wrapper {
    width: 25px;
}
</style>