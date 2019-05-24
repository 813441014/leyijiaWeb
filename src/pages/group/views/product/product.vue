<template>
    <div class="main">
        <div v-wechat-title="$route.meta.title"></div>
        产品列表
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        created() {

        },
        methods: {}
    }
</script>

<style scoped>
    .main {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #FFFFFF;
    }
</style>