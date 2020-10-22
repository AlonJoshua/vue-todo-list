<template>
  <div class="three-dots-options-wrapper">
    <canvas @mouseover="draw(canvasHoverColor)"
            @mouseleave="draw(canvasDefaultColor)"
            @click="threeDotsOptionsClick"
            :id="canvasId"
            width="25" 
            height="25"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {}
  },
  data() {
    return {
      canvasId: `dots options ${this.itemData.id}`,
      canvasHoverColor: "rgba(66, 82, 110, 0.1)",
      canvasDefaultColor: "#ffffff"
    }
  },
  methods: {
    threeDotsOptionsClick(event) {
      this.$emit("threeDotsOptionsClick", event);
    },
    draw(bgColor) {
      const canvas = document.getElementById(this.canvasId);
      const ctx = canvas.getContext("2d");
      const radius = 1.8;
      const startAngle = 1 * Math.PI;
      const endAngle = 3 * Math.PI;
      const anticlockwise = false;
      const dots = {
        leftDot: { x: canvas.width / 2 - (canvas.width / 4.5), y: canvas.height / 2 },
        middleDot: { x: canvas.width / 2, y: canvas.height / 2 },
        righttDot: { x: canvas.width / 2 + (canvas.width / 4.5), y: canvas.height / 2 }
      }
      function drawBg () {
        ctx.beginPath();
        if (!bgColor) {
          ctx.fillStyle = "#ffffff";
        } else {
          ctx.fillStyle = bgColor;
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      function drawDot(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        ctx.fillStyle = "#95b0d4" 
        ctx.fill();
      }
      drawBg();
      drawDot(dots.leftDot.x, dots.leftDot.y);
      drawDot(dots.middleDot.x, dots.middleDot.y);
      drawDot(dots.righttDot.x, dots.righttDot.y);
    }
  },
  watch: {
    itemData: function() {
      this.draw();
    }
  },
  mounted() {
    this.draw();
  }
}
</script>

<style lang="scss" scoped>
.three-dots-options-wrapper {
  margin-top: 5px;
}
</style>