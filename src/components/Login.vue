<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router";
import { useForm, Form, Field, ErrorMessage, defineRule } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { validateEmai, validatePassword } from "@/utils/utils";
defineRule('required', required);
defineRule('email', email);
const store = useCounterStore();
const { authHandler } = store;
const user = reactive({
  username: "test@gmail.com",
  password: "",
});
let url = location.href;
let isDebug = url.indexOf("localhost") > 0;
if (isDebug) {
  user.username = 'aaa@gmail.com';
  user.password = '1qazXSW@';
}
const loginFn = () => {
  authHandler(user).then((res) => {
    if (res.state == 2) {
      Alert.warning(showErrorMsg(res.msg), 2000);
    }
  });
};
</script>
<template>
  <div class="loginBox">
    <div class="container">
      <img src="@/assets/images/logo.png" />
      <Form>
        <Field v-model="user.username" name="username" type="email" placeholder="請輸入E-mail" :rules="validateEmai" />
        <ErrorMessage name="username" />
      </Form>
      <Form>
        <Field v-model="user.password" name="password" type="password" placeholder="請輸入密碼" :rules="validatePassword" />
        <ErrorMessage name="password" />
      </Form>
      <div class="login-btn">
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

  >.container {
    height: 100%;
    display: flex;
    flex-direction: column;

    img {
      // display: block;
      margin: 79px 0 0 0;
      // padding-top: 79px;
      width: 324px;
      height: 122px;
    }

    >form {
      display: flex;
      flex-direction: column;
      width: 324px;
      height: 80px;
      margin: 10px 0 20px 0;

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

      >span {
        display: block;
        padding-left: 20px;
        font-size: 15px;
        color: #ff0000;
      }
    }

    >.login-btn {
      width: 100%;
      margin-top: 20px;

      >button {
        display: block;
        width: 50%;
        padding: 10px;
        margin: auto;
        font-size: 18px;
        font-weight: bold;
        font-family: HeitiTC;
        color: #fff;
        border: solid 1px #707070;
        border-radius: 13px;
        background-color: #877059;
        // border: #000000 1px solid;   
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
