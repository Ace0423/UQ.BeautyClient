<script setup lang="ts">
import Icon_guest from "@/assets/Icon-guest.png";
import Icon from "@/assets/Icon zocial-guest.svg";
const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
}>();
onMounted(() => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
</script>
<template>
  <div class="container">
    <Header :Icon="Icon" :moduleType="'顧客管理'" :memuState="props.memuState" :handmemuStateBtn="props.handmemuStateBtn">
    </Header>
    <div class="content">
      <div class="nav">
        <router-link to="/memberManagerView/memberView">所有會員</router-link>
        <router-link to="/memberManagerView/groupView">標籤設定</router-link>
        <router-link to="/memberManagerView/blackListView">黑名單</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;

  >.content {
    position: absolute;
    top: 80px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: 2px 40px;

    >.nav {
      display: flex;
      // pointer-events: none;

      >a {
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
          color: #e6e2de;
        }

        >.router-link-exact-active {
          background-color: #e6e2de;
        }
      }

      >.router-link-exact-active {
        background-color: #e6e2de;
      }
    }
  }
}
</style>