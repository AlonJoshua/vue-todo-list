<template>
    <div class="main-nav">
        <div class="back-home-btn-wrapper">
            <label for="back-home-btn-title" class="back-home-btn-title">{{ mainNavData.homeBtnName }}</label>
            <div class="back-home-btn-bottom-marker"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        mainNavData: Object
    }
}
</script>

<style lang="scss" scoped>
    .main-nav {
        display: flex;
        height: 50px;
        width: 99%;
        border-radius: 10px 10px 0 0;
        justify-content: start;
        align-items: center;
        background-color: 	rgb(47, 50, 62);
        .back-home-btn-wrapper {
            margin-left: 70px;
            height: auto;
            .back-home-btn-title {
                color: rgb(89, 92, 102);
                font-size: 1.6em;
            }
            .back-home-btn-bottom-marker {
                height: 3px;
                background-color: rgb(214, 54, 91);
                margin-bottom: 0;
            }
        }
    }
</style>