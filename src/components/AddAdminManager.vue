<script setup lang="ts">
import { useCounterStore } from "@/stores/manager";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
const store = useCounterStore();
const { createAdminData, editAdminData } = store;
const alertState = ref(false);
const alertInformation = reactive({
  messageText: "", // 提示內容
  buttonState: 0, //按鈕顯示狀態 0:全部 1:只顯示確定按鈕 2:不顯示按鈕
  timerVal: 0, //時間計時器
});
const title = ref("新增管理員");

const newManager: any = reactive({
  managerId: 0,
  email: "",
  password: "",
  phone: "",
  nameView: "",
  sex: 1,
  photo: "",
  memo: "",
  userLock: true,
  lineUserID: "",
  googleUserID: "",
});

const props = defineProps<{
  selectAdminItem: any;
  handAddAdminManagerView: Function;
}>();

const handAlertView = (msg: string, btnState: number, timer: number) => {
  alertInformation.messageText = msg;
  alertInformation.buttonState = btnState;
  alertInformation.timerVal = timer;
  alertState.value = !alertState.value;
};

const handSubmit = () => {
  if (props.selectAdminItem) {
    editAdminData(newManager).then((res) => {
      if (res == 1) {
        handAlertView("修改成功", 2, 1);
        setTimeout(() => {
          props.handAddAdminManagerView();
        }, 1000);
      } else {
        handAlertView("修改失敗", 2, 1);
      }
    });
  } else {
    createAdminData(newManager).then((res) => {
      if (res == 1) {
        handAlertView("新增成功", 2, 1);
        setTimeout(() => {
          props.handAddAdminManagerView();
        }, 1000);
      } else {
        handAlertView("新增失敗", 2, 1);
      }
    });
  }
};

onMounted(() => {
  if (props.selectAdminItem) {
    newManager.managerId = props.selectAdminItem.managerId;
    newManager.email = props.selectAdminItem.email;
    newManager.phone = props.selectAdminItem.phone;
    newManager.nameView = props.selectAdminItem.nameView;
    newManager.sex = props.selectAdminItem.sex;
    newManager.password = props.selectAdminItem.password;
    newManager.photo = props.selectAdminItem.photo;
    newManager.memo = props.selectAdminItem.memo;
    newManager.userLock = props.selectAdminItem.userLock;
    newManager.lineUserID = props.selectAdminItem.lineUserID;
    newManager.googleUserID = props.selectAdminItem.googleUserID;
    title.value = "修改管理員";
  }
});
</script>

<template>
  <div class="popup-mask" v-on:click.self="handAddAdminManagerView()">
    <!-- 提示弹窗 -->
    <div class="popup-content">
      <h1>{{ title }}</h1>
      <div>
        <span>名稱</span>
        <input v-model="newManager.nameView" />
      </div>
      <div>
        <span>性別</span>
        <label
          ><input
            type="radio"
            name="gender"
            value="1"
            v-model="newManager.sex"
          />男</label
        >
        <label
          ><input
            type="radio"
            name="gender"
            value="0"
            v-model="newManager.sex"
          />女</label
        >
      </div>
      <div>
        <span>密碼</span>
        <input v-model="newManager.password" />
      </div>
      <div>
        <span>電話</span>
        <input v-model="newManager.phone" />
      </div>
      <div>
        <span>信箱</span>
        <input type="email" v-model="newManager.email" />
      </div>
      <div>
        <span>狀態</span>
        <select v-model="newManager.userLock">
          <option value="true">正常</option>
          <option value="false">凍結</option>
        </select>
      </div>
      <div>
        <span>備註</span>
        <textarea v-model="newManager.memo"></textarea>
      </div>

      <div class="btn">
        <button type="submit" v-on:click="handSubmit()">確認</button>
      </div>
    </div>
  </div>
  <Alert
    v-if="alertState"
    :alert-information="alertInformation"
    :hand-alert-view="handAlertView"
  ></Alert>
</template>

<style scoped lang="scss">
.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  background: rgba(255, 255, 255, 0.5);

  display: flex;
  align-items: center;
  justify-content: space-around;

  .popup-content {
    max-width: 360px;
    background-color: #e6e2de;
    padding: 15px 50px;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;

    > h1 {
      text-align: center;
      font-size: 20px;
    }

    > div {
      margin-top: 15px;
      display: flex;
      // justify-content: end;

      > span {
        min-width: 40px;
        margin: 3px 10px;
      }

      > input {
        max-width: 200px;
        height: 30px;
        text-align: center;
        border-radius: 6px;
        border: solid 1px #707070;
      }

      > label {
        margin: 0 10px;
      }

      > textarea {
        width: 250px;
        height: 100px;
        // text-align: center;
        border-radius: 6px;
        border: solid 1px #707070;
      }

      > input::placeholder {
        color: #e6e2de;
      }

      > .input-name-first {
        width: 40px;
      }

      > .input-name-last {
        margin: 0 5px;
        // width: 40px;
      }

      > .multiselectcheckbox {
        max-width: 320px;
        border-radius: 6px;
        border: solid 1px #707070;
      }
    }

    > .btn {
      display: flex;
      justify-content: center;

      > button {
        // width: 72px;
        // height: 38px;
        padding: 10px 10px;
        font-size: 20px;
        color: #84715c;
        border-radius: 10px;
        background-color: #faf9f8;
        border: solid 1px #707070;
      }
    }
  }
}
</style>