<template>
    <div class="upper-section">
        <label for="app-name" class="app-name">{{ headerData.appName }}</label>
    </div>
</template>

<script>
export default {
    props: {
        headerData: Object
    }
}
</script>

<style lang="scss" scoped>
    .upper-section {
        display: flex;
        height: 100px;
        justify-content: center;
        align-items: center;
        .app-name {
            font-size: 2em;
        }
    }
</style>