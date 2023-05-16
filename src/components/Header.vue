<script setup lang="ts">
import memuIcon from "@/assets/memuIcon.svg";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

const store = useCounterStore();
const { userInfo } = storeToRefs(store);
const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
  moduleType: string;
  Icon: string;
}>();

onMounted(() => {
});
</script>

<template>
  <header>
    <div class="head-title">
      <button class="memu-btn"  v-if="!memuState" v-on:click="handmemuStateBtn()">
        <img :src="memuIcon" />
      </button>
      <img :src="Icon" />
      <h1>{{ props.moduleType }}</h1>
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
  // height: 100px;
  // background-color: burlywood;
  > .head-title {
    display: flex;
    align-items: center;
    > img {
      width: 30px;
      height: 30px;
      margin: 0 5px;
    }

    > h1 {
      padding: 1%;
      min-width: 150px;
      font-family: STXihei;
      font-size: 25px;
      color: #707070;
    }
  }
  > .user-info {
    > p {
      font-family: STXihei;
      font-size: 25px;
      color: #707070;
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