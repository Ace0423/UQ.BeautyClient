

<template>
  <div class="content">
    <div class="nav">
      <router-link
        :class="currentIndex == 0 ? 'active' : ''"
        v-on:click="changeTab(0)"
        to="/settingView/discountManger/discountAll"
        >全單折扣</router-link
      >
      <router-link
        :class="currentIndex == 1 ? 'active' : ''"
        v-on:click="changeTab(1)"
        to="/settingView/discountManger/discountSingle"
        >單品折扣</router-link
      >
    </div>
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
  console.log("index");
  router.push("/settingView/discountManger/discountAll");
});
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 80px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: 2px 40px;

  > .nav {
    display: flex;

    > a {
      border: none;
      width: 120px;
      height: 45px;
      border-radius: 10px 10px 0 0;
      background-color: #faf9f8;
      font-size: 20px;
      font-weight: bold;
      font-family: HeitiTC;
      color: #717171;
      display: flex;
      justify-content: center;
      align-items: center;

      a:link {
        color: #717171;
      }

      a:visited {
        color: #717171;
      }

      a:hover {
        color: #717171;
      }
    }

    > a.active {
      background-color: #e6e2de;
    }
  }
}
</style>