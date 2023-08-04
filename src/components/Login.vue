<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router";
// import { any, IMethods } from '../types/form'
const store = useCounterStore();
const { authHandler } = store;
const user = reactive({
  username: "testadmin@gamil.com",
  password: "1qazXSW@",
});
const error_message = reactive({
  username: "",
  password: "",
  request: "",
});
const state: any = reactive({
  form_items: {
    email: {
      label: "帳號",
      component: "input",
      type: "text",
      icon: "fa-solid fa-user",
      placeholder: "輸入使用者信箱",
      is_readonly: false,
      value: "testadmin@gamil.com",
      tip: "",
      rules: {
        required: {
          warn: "此項目為必填",
        },
        email: {
          warn: "email格式不符",
        },
      },
      is_error: false,
      warn: "",
      is_show: true,
    },
    password: {
      label: "密碼",
      component: "input",
      type: "password",
      icon: "fa-solid fa-key",
      placeholder: "請輸入密碼",
      is_readonly: false,
      value: "1qazXSW@",
      tip: "",
      rules: {
        required: {
          warn: "此項目為必填",
        },
        length: {
          min: 6,
          warn: "不得少於6位",
        },
        capital: {
          warn: "必須含一個大寫英文字母",
        },
        special: {
          warn: "必須含一個特殊字元",
        },
      },
      is_error: false,
      warn: "",
      is_show: true,
    },
  },
});
let { form_items } = toRefs(state);
const verify_methods: any = {
  required(component: any) {
    if (!component.value) {
      component.is_error = true;
      component.warn = component.rules.required?.warn || "";
      return false;
    } else {
      component.is_error = false;
      component.warn = "";
      return true;
    }
  },
  cellphone(component: any) {
    let rep = /^(09)[0-9]{8}$/;
    if (!rep.test(component.value)) {
      component.is_error = true;
      component.warn = component.rules.cellphone?.warn || "";
      return false;
    } else {
      component.is_error = false;
      component.warn = "";
      return true;
    }
  },
  email(component: any) {
    let rep = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!rep.test(component.value)) {
      component.is_error = true;
      component.warn = component.rules.email?.warn || "";
      return false;
    } else {
      component.is_error = false;
      component.warn = "";
      return true;
    }
  },
  capital(component: any) {
    const stringArray = component.value.split("");
    let capitalState = false;
    stringArray.forEach((t: any) => {
      if (/[A-Z]/.test(t)) {
        component.is_error = false;
        component.warn = "";
        capitalState = true;
      }
    });
    if (!capitalState) {
      component.is_error = true;
      component.warn = component.rules.capital?.warn || "";
    }
    return capitalState;
  },
  special(component: any) {
    let rep = new RegExp(
      "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
    );
    if (rep.test(component.value)) {
      component.is_error = false;
      component.warn = "";
      return true;
    } else {
      component.is_error = true;
      component.warn = component.rules.special?.warn || "";
      return false;
    }
  },
  length(component: any) {
    if (
      component.value.length < (component.rules.length?.min || 0) ||
      component.value.length > (component.rules.length?.max || 10000)
    ) {
      component.is_error = true;
      component.warn = component.rules.length?.warn || "";
      return false;
    } else {
      component.is_error = false;
      component.warn = "";
      return true;
    }
  },
  // confirm(component: any) {
  //   if (
  //     component.value !=
  //     state.form_items[component.rules.confirm?.password || "password"].value
  //   ) {
  //     component.is_error = true;
  //     component.warn = component.rules.confirm?.warn || "";
  //     return false;
  //   } else {
  //     component.is_error = false;
  //     component.warn = "";
  //     return true;
  //   }
  // },
};
const verify_all = () => {
  let is_valid = true;
  for (let component in state.form_items) {
    let item = state.form_items[component];
    for (let rule in item.rules) {
      if (!verify_methods[rule](item)) {
        is_valid = false;
        break;
      }
    }
  }
  return is_valid;
};
const loginFn = () => {
  if (verify_all()) {
    user.username = state.form_items.email.value;
    user.password = state.form_items.password.value;
    authHandler(user).then((res) => {
      if (res.state == 2) {
        error_message.request = "帳號或密碼錯誤";
      }
    });
  }
  // const router = useRouter();
  // router.push({ path: "/memberView" });
};
</script>
<template>
  <div class="loginBox">
    <div class="container">
      <img src="@/assets/images/logo.png" />
      <div class="input-box" v-for="item in form_items" :key="item.label">
        <p>{{ item.label }}</p>
        <input
          :type="item.type"
          :placeholder="item.placeholder"
          v-model="item.value"
        />
        <p v-show="item.is_error" class="error">
          {{ item.warn }}
        </p>
      </div>
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
  // width: 17%;
  // margin: auto;

  > .container {
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

    > .input-box {
      display: block;
      width: 324px;
      margin: 10px 0 20px 0;
      position: relative;

      > p {
        display: block;
        padding-left: 20px;
        font-weight: 500;
        line-height: 0;
        font-size: 15px;
        color: #707070;
      }

      > input {
        display: block;
        margin: auto;
        width: 90%;
        height: 45px;
        text-indent: 10px;
        font-size: 18px;
        border-radius: 20px;
        border: 1px solid #707070;
      }
      > .error {
        position: absolute;
        color: #ff0000;
      }
    }

    > .login-btn {
      width: 100%;
      margin-top: 20px;

      > button {
        display: block;
        width: 50%;
        padding: 10px;
        margin: auto;
        font-size: 18px;
        font-weight: bold;
        font-family: HeitiTC;
        color: #fff;
        border-radius: 13px;
        // border: 1px solid #707070;
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

      > .input-box {
        display: block;
        width: 211px;
        margin: 45px 0;

        > p {
          display: block;
          padding-left: 20px;
          font-weight: 500;
          line-height: 0;
          font-size: 15px;
          color: #707070;
        }

        > input {
          display: block;
          margin: auto;
          width: 90%;
          height: 45px;
          font-size: 18px;
          border-radius: 20px;
          border: 2px solid #707070;
        }
      }

      > .btn {
        width: 100%;
        margin-top: 70px;

        > button {
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
