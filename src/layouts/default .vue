<script setup lang="ts">
import { getToken } from "@/plugins/js-cookie";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
const route = useRoute();
const store = useCounterStore();
const { isLogin } = storeToRefs(store);
const { setIsLogin, setUserData } = store;
const idx = ref();
const routeVal = reactive({ type: -1, token: '' });
const memuState = ref(false);
const handmemuStateBtn = () => {
  memuState.value = !memuState.value;
};
onBeforeMount(() => {
  setTimeout(() => {
    if (route.query.type && route.query.type == "1") {
      let token: string = route.query.token == undefined ? '' : route.query.token?.toString();
      routeVal.type = 1;
      routeVal.token = token;
    }
  }, 300);
})
onMounted(() => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
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
  }, 30);
}

const scrollListenerHandler = () => {
  var isIpad = (navigator.userAgent.search("iPad") > -1) || (navigator.userAgent.search("Macintosh") > -1 &&
    navigator.userAgent.search("OS") > -1);

  if (!isIpad) {
    document.getElementById("strLanguage")!.innerHTML =
      "不支援此設備，請換ipad";

    document.getElementById("effect")!.style.display = "none";
    document.getElementById("MoblileR")!.style.display = "block";
  } else {
    document.getElementById("strLanguage")!.innerHTML =
      "為了更好的體驗，請將設備橫過來";
    document.getElementById("effect")!.style.display = "block";
    document.getElementById("MoblileR")!.style.display = "none";
    checkTurn();
  }
};
function checkTurn() {
  const clientHeight = document.documentElement.clientHeight;
  const clientWidth = document.documentElement.clientWidth;
  // 滚动到了底部
  if (clientWidth >= clientHeight) {
    document.getElementById("MoblileR")!.style.display = "none";
    // changeSize();
  } else {
    document.getElementById("effect")!.classList.add("pad");
    document.getElementById("MoblileR")!.style.display = "block";
  }
}

function changeSize() {
  const bodyW = ref(0);
  const bodyH = ref(0);


  const body: any = document.querySelector('.body')!;
  const bodyHeight = body.offsetHeight;
  const bodyWidth = body.offsetWidth;

  const aspectRatio = 1280 / 768; //4:3
  const bodyAspectRatio = Math.floor(bodyHeight / bodyWidth);

  if (bodyAspectRatio > aspectRatio) {
    bodyH.value = bodyHeight;
    bodyW.value = Math.floor(bodyHeight / aspectRatio);
  } else {
    bodyW.value = bodyWidth;
    bodyH.value = Math.floor(bodyHeight / aspectRatio);
  }
}
</script>

<template>
  <Login v-if="!isLogin && routeVal.type == 0"></Login>
  <ResetPassword v-if="!isLogin && routeVal.type == 1" :route-val="routeVal"></ResetPassword>
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

  .main-display {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    position: relative;
  }
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
