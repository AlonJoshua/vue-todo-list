<template>
  <div class="delete-icon-wrapper"
       @click="deleteIconClickHandler">
     <canvas class="delete-icon" width="40px" height="40px"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {}
  },
  methods: {
    deleteIconClickHandler() {
      this.$emit("deleteIconClickHandler", this.itemData);
    },
    draw() {
      const canvases = document.getElementsByClassName("delete-icon");
      for (let i = 0; i < canvases.length; i++) {
      const ctx = canvases[i].getContext("2d");
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgb(200, 200, 200)"
      ctx.beginPath();
      ctx.moveTo(14, 13);
      ctx.lineTo(27, 27);
      ctx.moveTo(14, 27);
      ctx.lineTo(27, 13);
      ctx.stroke();
      ctx.beginPath();
        
        // ctx.arc(x, y, radius, startAngle, endAngle);
        // ctx.stroke();
      }
    }
  },
  watch: {
    itemStatus: function() {
      this.draw();
    }
  },
  mounted() {
    this.draw();
  }
}
</script>

<style>
img {
  color: rgb(212, 212, 212);
}
</style>