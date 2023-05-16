<script setup lang="ts">
import { getToken } from "@/plugins/js-cookie";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import uictrl from "@/router/uictrl";
import { RouterView, useRouter } from "vue-router";
const store = useCounterStore();
const { isLogin } = storeToRefs(store);
const { setIsLogin, setUserData } = store;
const router = useRouter();
const memuState = ref(true);
const handmemuStateBtn = () => {
  memuState.value = !memuState.value;
};
// var isIE = navigator.userAgent.search("MSIE") > -1;
// var isIE7 = navigator.userAgent.search("MSIE 7") > -1;
// var isFirefox = navigator.userAgent.search("Firefox") > -1;
// var isOpera = navigator.userAgent.search("Opera") > -1;
// var isSafari = navigator.userAgent.search("Safari") > -1; //Google瀏覽器是用
// alert(navigator.userAgent);
// console.log(navigator.userAgent.split(" "));
// for (let i = 0; i < navigator.userAgent.split(" ").length; i++) {
//   const element = navigator.userAgent.split(" ")[i];
//   if (element.indexOf("Chrome") > -1) {
//     alert(element.split("/")[1].split(".")[0]);
//     element.split("/")[1].split(".")[0];
//   }
// }
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
      <RouterView
        :memuState="memuState"
        :handmemuStateBtn="handmemuStateBtn"
      ></RouterView>
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
