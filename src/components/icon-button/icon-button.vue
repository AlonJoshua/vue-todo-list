<template>
  <div>
      <img :src="SVGs.src" alt="">
  </div>
</template>

<script>
import SVGs from "../../../images.json"

export default {
    props: {
        src: String
    },
    data() {
        return {
            SVGs: SVGs
        }
    }
}
</script>

<style>

</style>