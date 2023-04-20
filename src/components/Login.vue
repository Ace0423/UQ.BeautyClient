<script setup lang="ts">

import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router";

const store = useCounterStore();
const { authHandler } = store;
const user = reactive({
  username: "thai@gmail.com",
  password: "1qaz@WSX"
})
const error_message = reactive({
  username: "",
  password: ""
})
const loginFn = () => {
  authHandler(user);
  // const router = useRouter();
  // router.push({ path: "/memberView" });
}

</script>
<template>
  <div class="loginBox">
    <div class="container">
      <img src="@/assets/images/logo.png" />
      <div class="input-box">
        <p>帳號</p>
        <input type="text" placeholder="輸入使用者名稱" v-model="user.username" />
        <p v-if="error_message.username" class="error">
          {{ error_message.username }}
        </p>
      </div>
      <div class="input-box">
        <p>密碼</p>
        <input type="password" placeholder="輸入密碼" v-model="user.password" />
        <p v-if="error_message.password" class="error">
          {{ error_message.password }}
        </p>
      </div>
      <div class="btn">
        <button @click="loginFn">登入</button>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.loginBox {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 100%;
  // width: 17%;
  // margin: auto;

  >.container {
    height: 100%;

    img {
      display: block;
      margin: auto;
      padding-top: 79px;
      width: 324px;
      height: 122px;
    }

    >.input-box {
      display: block;
      width: 324px;
      margin: 45px 0;

      >p {
        display: block;
        padding-left: 20px;
        font-weight: 500;
        line-height: 0;
        font-size: 15px;
        color: #707070;
      }

      >input {
        display: block;
        margin: auto;
        width: 90%;
        height: 45px;
        text-indent: 10px;
        font-size: 18px;
        border-radius: 20px;
        border: 1px solid #707070;
      }
    }

    >.btn {
      width: 100%;
      margin-top: 70px;

      >button {
        display: block;
        width: 50%;
        padding: 10px;
        margin: auto;
        font-size: 18px;
        font-weight: bold;
        font-family: HeitiTC;
        color: #fff;
        border-radius: 13px;
        border: 1px solid #707070;
        background-color: #877059;
      }
    }


    @media screen and (max-width: 640px) {
      img {
        display: block;
        margin: auto;
        padding-top: 82px;
        width: 211px;
        height: 79px;
      }

      >.input-box {
        display: block;
        width: 211px;
        margin: 45px 0;

        >p {
          display: block;
          padding-left: 20px;
          font-weight: 500;
          line-height: 0;
          font-size: 15px;
          color: #707070;
        }

        >input {
          display: block;
          margin: auto;
          width: 90%;
          height: 45px;
          font-size: 18px;
          border-radius: 20px;
          border: 2px solid #707070;
        }
      }

      >.btn {
        width: 100%;
        margin-top: 70px;

        >button {
          display: block;
          width: 50%;
          padding: 10px;
          margin: auto;
          font-size: 18px;
          font-weight: bold;
          font-family: HeitiTC;
          color: #fff;
          border-radius: 13px;
          border: 1px solid #707070;
          background-color: #877059;
        }
      }
    }
  }
}
</style>
