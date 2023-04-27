<script setup lang="ts">
const props = defineProps<{
    moduleType: string,
    Icon:string,
}>()
</script>

<template>
    <header>
        <img :src="props.Icon">
        <h1>{{ props.moduleType }}</h1>
    </header>
</template>

<style scoped lang="scss">
header {
    height: 70px;
    padding: 5px 40px;
    display: flex;
    align-items: center;

    // height: 100px;
    // background-color: burlywood;
    >img {
        width: 30px;
        height: 30px;
    }

    >h1 {
        padding: 1%;
        min-width: 150px;
        font-family: STXihei;
        font-size: 25px;
        color: #707070;
    }
}
</style>