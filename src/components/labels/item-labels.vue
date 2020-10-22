<template>
  <div class="item-labels-wrapper">
      <div class="active-labels" 
           v-for="(label, index) in itemData.labels"
           :key="index">
           <span class="item-label-span"
                 :style="{backgroundColor: label.color}">
                 {{label.title}}
           </span>
      </div>
  </div>
</template>

<script>

export default {
    props: {
        itemData: {},
        labels: {}
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.item-labels-wrapper {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    .active-labels {
        display: flex;
        margin-left: 6px;
        .item-label-span {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-radius: 6px;
            height: 1em;
            margin: 4px 1px;
            padding: 2px 6px;
            color: white;
            font-size: 0.9em;
        }
    }
}
</style>