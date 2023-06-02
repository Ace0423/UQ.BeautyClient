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
const handRouterLink = (() => {
  router.push("/" + routerLink.value[1]);
})
onMounted(() => {
  routerLink.value = route.path.split("/")
});
</script>

<template>
  <header>
    <div class="head-title">
      <button class="memu-btn" v-if="!memuState" v-on:click="handmemuStateBtn()">
        <img :src="memuIcon" />
      </button>
      <button v-on:click="handRouterLink()">
        <img :src="Icon" />
        <h1>{{ props.moduleType }}</h1>
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  height: 70px;
  padding: 5px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  z-index: 3;

  // height: 100px;
  // background-color: burlywood;
  >.head-title {
    display: flex;
    align-items: center;

    >button {
      display: flex;
      border: none;
      background-color: transparent;

      >img {
        width: 30px;
        height: 30px;
        // margin: 0 5px;
      }

      >h1 {
        // padding: 1%;
        // min-width: 150px;
        margin: 0 10px;
        font-family: STXihei;
        font-size: 25px;
        color: #707070;
      }
    }
  }


  .memu-btn {
    position: relative;
    // left: 10px;
    border: none;
    background-color: transparent;
  }
}
</style>