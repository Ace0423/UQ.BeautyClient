<script setup lang="ts">
import Icon from "@/assets/Icon material-settings.svg";
const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
}>();
onMounted(() => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
})
</script>
<template>
  <div class="container">
    <Header :Icon="Icon" :moduleType="'設定'" :memuState="props.memuState" :handmemuStateBtn="props.handmemuStateBtn">
    </Header>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;

}
</style>