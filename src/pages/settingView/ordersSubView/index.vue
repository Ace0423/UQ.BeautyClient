
<script setup lang="ts">

onMounted(() => {

})
</script>
<template>
    <div class="group">
        <div class="wrap">
            <h1>帳單訂閱</h1>
            <div class="content">
                <h2>目前方案</h2>
                <p>Free方案</p>
            </div>
            <div class="content">
                <h2>剩餘天數</h2>
                <p>------------------</p>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
div.group {
    position: absolute;
    top: 80px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: #faf9f8;
    border: solid 0.5px #ddd;
    font-family: STXihei;
    color: #717171;
.wrap{
    padding: 15px 50px;
    .content{
        padding: 5px 20px;
        >p{
            padding: 0px 5px;
        }
    }
}
}
</style>