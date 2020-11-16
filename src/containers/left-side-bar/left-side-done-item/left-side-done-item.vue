<template>
  <div class="done-item-wrapper">
        <span class="item-name">{{itemData.name}}</span>
            <done-icon :itemStatus="itemData.status">    
            </done-icon>
  </div>
</template>

<script>
import doneIcon from "../../../components/icons/done-icon"

export default {
    components: {
        doneIcon
    },
    props: {
        itemData: {}
    }
}
</script>

<style lang="scss" scoped>
    .done-item-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        width: 350px;
        margin-right: 40px;
        background-color: white;
        .item-name {
            margin-left: 20px;
        }
    }   done-icon {
        margin-right: 20px;
    }
</style>