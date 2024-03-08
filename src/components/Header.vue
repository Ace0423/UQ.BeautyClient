<script setup lang="ts">
import memuIcon from "@/assets/memuIcon.svg";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const routerLink = ref();
const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
  moduleType: string;
  Icon: string;
}>();
const handRouterLink = () => {
  if (routerLink.value[1] == "settingView") {
    router.push("/" + routerLink.value[1]);
  }
};
onMounted(() => {
  routerLink.value = route.path.split("/");
});
</script>

<template>
  <header>
    <div class="head-title">
      <div class="memu-btn" v-if="!memuState" v-on:click="handmemuStateBtn()">
        <img :src="memuIcon" />
      </div>
      <div class="head-btn" v-on:click="handRouterLink()">
        <img :src="Icon" />
        <h1>{{ props.moduleType }}</h1>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  height: 70px;
  padding: 5px 40px;
  z-index: 3;

  >.head-title {
    display: flex;
    align-items: center;
    height: 100%;

    >.head-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      height: 35px;
      margin-left: 15px;

      >img {
        width: 30px;
        height: 30px;
        // margin: 0 5px;
      }

      >h1 {
        margin-left: 10px;
        font-family: STXihei;
        font-size: 25px;
        color: #707070;
      }
    }
  }

  .memu-btn {
    position: relative;
    height: 35px;
    border: none;
    background-color: transparent;
  }
}
</style>