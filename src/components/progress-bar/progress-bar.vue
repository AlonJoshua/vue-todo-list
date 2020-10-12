<template>
  <div class="progress-bar-wrapper">
      <canvas id="progress-bar-canvas"
              width="180px" 
              height="150">
      </canvas>
  </div>
</template>

<script>
export default {
    props: {
        leftBarCurrViewData: {}
    },
    methods: {
        draw() {
            const canvas = document.getElementById('progress-bar-canvas');
            const ctx = canvas.getContext("2d");
            const x = canvas.width / 2;
            const y = canvas.height / 2;
            let radius = 60;
            let redArcStartAngle = this.calculateProgressBar.redArc.startAngle;
            let redArcEndAngle = this.calculateProgressBar.redArc.endAngle;
            let greenArcStartAngle = this.calculateProgressBar.greenArc.startAngle;
            let greenArcEndAngle = this.calculateProgressBar.greenArc.endAngle;
            let percentage = this.calculateProgressBar.percentageDone;
            let anticlockwise = false;
            ctx.lineWidth = 14;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(x, y, radius, redArcStartAngle, redArcEndAngle, anticlockwise);
            ctx.strokeStyle = "rgb(255, 106, 106)";
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x, y, radius, greenArcStartAngle, greenArcEndAngle, anticlockwise);
            ctx.strokeStyle = "rgb(46, 200, 151)";
            ctx.stroke();
            ctx.font = "1.6em sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`${percentage}%`, x, y);
            
        }
    },
    computed: {
        calculateProgressBar() {
            let itemsStatusesCount = {
                OPEN: 0,
                CLOSE: 0
            }
            let calculatedArcs = {
                redArc: {
                    startAngle: 1 * Math.PI,
                    endAngle: 3 * Math.PI
                },
                greenArc: {
                    startAngle: 1 * Math.PI,
                    endAngle: 1 * Math.PI
                },
                percentageDone: 0
            }
            if (this.leftBarCurrViewData.items.length) {
                for (let i = 0; i < this.leftBarCurrViewData.items.length; i++) {
                    if (this.leftBarCurrViewData.items[i].status === "Open") {
                        itemsStatusesCount.OPEN ++;
                    }
                    else if (this.leftBarCurrViewData.items[i].status === "Done") {
                        itemsStatusesCount.CLOSE ++;
                    }
                }
                calculatedArcs.greenArc.endAngle = (1 + (itemsStatusesCount.CLOSE / this.leftBarCurrViewData.items.length) * 2) * Math.PI;
                calculatedArcs.redArc.startAngle = (1 + (itemsStatusesCount.CLOSE / this.leftBarCurrViewData.items.length) * 2) * Math.PI;
                calculatedArcs.percentageDone = Math.round((itemsStatusesCount.CLOSE / this.leftBarCurrViewData.items.length) * 100);
            }
            return calculatedArcs;
        }
    },
    watch: {
        leftBarCurrViewData: function() {
            this.draw();
        }
    },
    mounted() {
        this.draw();
    }
}
</script>

<style lang="scss" scoped>
.progress-bar-wrapper {
    display: flex;
    margin-left: 10px;
}
</style>