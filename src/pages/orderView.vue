<script setup lang="ts">
const Icon: string = "src/assets/Icon metro-shop.svg";
const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
}>();
</script>

<template>
  <Header
    :Icon="Icon"
    :moduleType="'訂單紀錄'"
    :memuState="props.memuState"
    :handmemuStateBtn="props.handmemuStateBtn"
  ></Header>
</template>

<style scoped lang="scss"></style>