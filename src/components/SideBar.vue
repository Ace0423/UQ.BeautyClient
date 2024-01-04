<script setup lang="ts">
import logoImg from "@/assets/images/logo.png";
import appointmentImg from "@/assets/Icon awesome-calendar-check.svg";
import courseImg from "@/assets/Icon awesome-spa.svg";
import settingImg from "@/assets/Icon material-settings.svg";
import customerImg from "@/assets/Icon zocial-guest.svg";
import bankImg from "@/assets/Icon awesome-money-check-alt.svg";
import orderImg from "@/assets/images/ico_order.png";

import closeIcon from "@/assets/Group32.svg";
import { getRole, getshowMap } from "@/plugins/js-cookie";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
const store = useCounterStore();
const { userInfo } = storeToRefs(store);
const { handLogOut } = store;
const props = defineProps<{
  handmemuStateBtn: Function;
}>();
const userMenuState = ref(false);
const showTestUI = ref(false);
const handUserMenuView = () => {
  userMenuState.value = !userMenuState.value;
};
var url = window.location.href;
showTestUI.value = false;
onMounted(() => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
</script>

<template>
  <div class="popup-mask" v-on:click.self="handmemuStateBtn()">
    <div class="sideBar">
      <img :src="logoImg" />
      <div class="nav">
        <ul @click="handmemuStateBtn()">
          <li>
            <img :src="appointmentImg" /><router-link to="/appointmentView">預約紀錄</router-link>
          </li>
          <li v-if="getshowMap('顧客管理', 'MemberData')">
            <img :src="customerImg" /><router-link to="/memberManagerView/memberView">顧客管理</router-link>
          </li>
          <!-- <li>
            <img :src="courseImg" /><router-link to="/courseView"
              >課程管理</router-link
            >
          </li> -->
          <li>
            <img :src="courseImg" /><router-link to="/orderRecordView/transactionPage">交易紀錄</router-link>
          </li>
          <li>
            <img :src="courseImg" /><router-link to="/serviceView/servicePage">服務管理</router-link>
          </li>
          <li>
            <img :src="bankImg" /><router-link to="/memberBankView/memberBankView">儲值金</router-link>
          </li>
          <li>
            <img :src="settingImg" /><router-link to="/settingView">設定</router-link>
          </li>
          <li v-if="getRole('userData') == 'Admin'">
            <img :src="settingImg" /><router-link to="/systemSettingView/managerAdmin">系統設定</router-link>
          </li>
          <li v-show="showTestUI">
            <img :src="settingImg" /><router-link to="/testView">Api測試</router-link>
          </li>
        </ul>
      </div>
      <div class="user-info">
        <div class="user-name" @click="handUserMenuView()">
          <div>
            <p>{{ userInfo.name }}</p>
            <p>{{ userInfo.email }}</p>
          </div>
          <button>></button>
        </div>
        <div class="user-menu" v-if="userMenuState">
          <button @click="handLogOut()">登出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.5);

  .sideBar {
    top: 0;
    width: 259px;
    min-width: 180px;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    background-color: #fff;
    border: solid 1px #707070;
    box-sizing: border-box;
    position: relative;

    >img {
      width: 100%;
    }

    >.nav {
      // padding-left: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;

      >ul {
        padding: 0 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;

        >li {
          font-family: STXihei;
          font-size: 20px;
          color: #707070;
          display: flex;
          align-items: center;
          padding-left: 15px;

          >img {
            padding: 15px;
            width: 30px;
            height: 30px;
          }

          >a {
            text-decoration: none;
            color: #707070;
          }

          >.router-link-active {
            font-weight: bold;
          }
        }
      }
    }

    >.user-info {
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      border-top: solid 2px #707070;

      >.user-name {
        width: 100%;
        display: flex;
        font-family: STXihei;
        font-size: 15px;
        color: #707070;
        background-color: transparent;
        border: none;
        justify-content: center;

        >button {
          background-color: transparent;
          border: none;
          margin: 0 0px 0 20px;
        }
      }

      >.user-menu {
        display: flex;
        flex-direction: column;
        z-index: 10;
        width: 100%;
        height: 100%;
        position: absolute;
        right: -102%;
        bottom: 0px;
        border-radius: 6px;
        border: solid 1px #707070;
        background-color: rgb(255, 255, 255);

        >button {
          margin: 5px 2px;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid #707070;
        }
      }
    }
  }
}
</style>
