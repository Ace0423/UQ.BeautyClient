<script setup lang="ts">
import { getToken } from "@/plugins/js-cookie";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
const store = useCounterStore();
const { isLogin } = storeToRefs(store);
const { setIsLogin, setUserData } = store;
const memuState = ref(false);
const handmemuStateBtn = () => {
  memuState.value = !memuState.value;
};

onMounted(() => {
  setIsLogin(false);
  if (getToken("token")) {
    setIsLogin(true);
    setUserData();
  }

  scrollListenerHandler();
  window.addEventListener(
    "onorientationchange" in window ? "orientationchange" : "resize",
    onResize,
    false
  );
});

function onResize() {
  setTimeout(() => {
    scrollListenerHandler(); //此处为要执行方法
  }, 10);
}

const scrollListenerHandler = () => {
  const clientHeight = document.documentElement.clientHeight;
  const clientWidth = document.documentElement.clientWidth;
  // 滚动到了底部
  if (clientWidth >= clientHeight) {
    document.getElementById("MoblileR")!.style.display = "none";
  } else {
    document.getElementById("effect")!.classList.add("pad");
    document.getElementById("MoblileR")!.style.display = "block";
  }
};
</script>

<template>
  <Login v-if="!isLogin"></Login>
  <main v-if="isLogin" class="main-display">
    <side-bar v-if="memuState" :handmemuStateBtn="handmemuStateBtn"></side-bar>
    <div class="wraps">
      <RouterView :memuState="memuState" :handmemuStateBtn="handmemuStateBtn"></RouterView>
    </div>
  </main>
</template>
<style lang="scss">
html,
body {
  display: block;
  height: 100%;
  margin: auto;
  font-family: HeitiTC;
}

#app {
  height: 100%;
}

.main-display {
  display: flex;
}

.wraps {
  width: 100%;
}
</style>
