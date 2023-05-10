<script setup lang="ts">
import { useCounterStore } from "@/stores/manager";
const store = useCounterStore();
const { createRoleData, editRoleData } = store;
const alertState = ref(false);
const alertInformation = reactive({
  messageText: "", // 提示內容
  buttonState: 0, //按鈕顯示狀態 0:全部 1:只顯示確定按鈕 2:不顯示按鈕
  timerVal: 0, //時間計時器
});
const title = ref("新增");

const newRole: any = reactive({
  id: 0,
  name: "",
  memo: "",
});

const props = defineProps<{
  selectRoleItem: any;
  handAddRoleManagerView: Function;
}>();

const handAlertView = (msg: string, btnState: number, timer: number) => {
  alertInformation.messageText = msg;
  alertInformation.buttonState = btnState;
  alertInformation.timerVal = timer;
  alertState.value = !alertState.value;
};

const handSubmit = () => {
  if (props.selectRoleItem) {
     console.log(newRole);
    editRoleData(newRole).then((res) => {
      if (res == 1) {
        handAlertView("修改成功", 2, 1);
        setTimeout(() => {
          props.handAddRoleManagerView();
        }, 1000);
      } else {
        handAlertView("修改失敗", 2, 1);
      }
    });
  } else {
    createRoleData(newRole).then((res) => {
      if (res == 1) {
        handAlertView("新增成功", 2, 1);
        setTimeout(() => {
          props.handAddRoleManagerView();
        }, 1000);
      } else {
        handAlertView("新增失敗", 2, 1);
      }
    });
  }
};

onMounted(() => {
  if (props.selectRoleItem) {
    console.log(props.selectRoleItem);
    newRole.id = props.selectRoleItem.roleId;
    newRole.name = props.selectRoleItem.label;
    newRole.memo = props.selectRoleItem.memo;
    title.value = "修改";
  }
});
</script>

<template>
  <div class="popup-mask" v-on:click.self="handAddRoleManagerView()">
    <!-- 提示弹窗 -->
    <div class="popup-content">
      <h1>{{ title }}</h1>
      <div>
        <span>角色</span>
        <input v-model="newRole.name" />
      </div>
      <div>
        <span>備註</span>
        <input v-model="newRole.memo" />
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