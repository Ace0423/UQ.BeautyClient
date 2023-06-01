<template>
  <div class="content">
    <div class="nav"></div>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import router from "@/router";
const currentIndex = ref(0);
const changeTab = (index: number) => {
  currentIndex.value = index;
};
onMounted(() => {
  router.push("/settingView/goodsMgmt/goodsPage");
});
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: 2px 40px;
  // pointer-events: none;

  > .nav {
    display: flex;
  }
}
</style>
