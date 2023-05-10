<script setup lang="ts">
const Icon: string = "src/assets/Icon awesome-shopping-bag.svg";
const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
}>();
</script>

<template>
  <Header
    :Icon="Icon"
    :moduleType="'商品管理'"
    :memuState="props.memuState"
    :handmemuStateBtn="props.handmemuStateBtn"
  ></Header>
</template>

<style scoped lang="scss"></style>