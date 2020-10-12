<template>
  <div class="done-icon-wrapper" @click="doneIconClickHandler">
     <canvas class="done-icon" width="40px" height="40px"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    itemStatus: {}
  },
  methods: {
    doneIconClickHandler() {
      this.$emit("doneIconClickHandler");
    },
    draw() {
      const canvases = document.getElementsByClassName("done-icon");
      for (let i = 0; i < canvases.length; i++) {
      const ctx = canvases[i].getContext("2d");
      const x = canvases[i].width / 2;
      const y = canvases[i].height / 2;
      const radius = 12;
      const startAngle = 0;
      const endAngle = 2 * Math.PI;
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      ctx.moveTo(14, 20);
      ctx.lineTo(19, 26);
      ctx.lineTo(25, 13);
      ctx.stroke();
      
      ctx.beginPath();
      if (this.itemStatus === "Done") {
        ctx.strokeStyle = "rgb(46, 200, 151)"
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.stroke();
      } else {
        ctx.strokeStyle = "rgb(200, 200, 200)"
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.stroke();
      }
      
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