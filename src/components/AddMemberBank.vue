<script setup lang="ts">
import { useMemberBankStore } from "@/stores/memberBank";
import { showErrorMsg, showApiStatus } from "@/types/IMessage";
const memberBankStore = useMemberBankStore();
const { creatMemberBankData, editMemberBankInfoData } = memberBankStore;
const title = ref("儲值");
const alertState = ref(false);
const alertInformation = reactive({
  messageText: "", // 提示內容
  buttonState: 0, //按鈕顯示狀態 0:全部 1:只顯示確定按鈕 2:不顯示按鈕
  timerVal: 0, //時間計時器
});
const newAddMemberBank = reactive({
  ubid: 0,
  userId: 0,
  state: 1,
  income: 0,
  memo: "",
});
const props = defineProps<{
  addMemberBankItem: any;
  memberBankInfo: any;
  handAddMemberBankView: Function;
}>();
const handAlertView = (msg: string, btnState: number, timer: number) => {
  alertInformation.messageText = msg;
  alertInformation.buttonState = btnState;
  alertInformation.timerVal = timer;
  alertState.value = !alertState.value;
};

const handSubmit = () => {
  if (newAddMemberBank.ubid == 0) {
    // if (newAddMemberBank.income <= 0) {
    //   handAlertView(ErroeCode.DE02, 2, 1);
    //   return;
    // }
    newAddMemberBank.income = Number(newAddMemberBank.income);
    creatMemberBankData(newAddMemberBank)
      .then((res) => {
        if (res.state == 1) {
          handAlertView("成功", 2, 1);
          setTimeout(() => {
            props.handAddMemberBankView();
          }, 1000);
        } else {
          handAlertView(showErrorMsg(res.msg), 2, 1);
        }
      })
      .catch((e: any) => {
        handAlertView(showApiStatus(e.response.status), 2, 1);
      });
  } else {
    let editMemberBankInfo = {
      ubid: newAddMemberBank.ubid,
      memo: newAddMemberBank.memo,
    };
    editMemberBankInfoData(editMemberBankInfo)
      .then((res) => {
        console.log(res.state);
        if (res.state == 1) {
          handAlertView("成功", 2, 1);
          setTimeout(() => {
            props.handAddMemberBankView();
          }, 1000);
        } else {
          handAlertView(showErrorMsg(res.msg), 2, 1);
        }
      })
      .catch((e: any) => {
        handAlertView(showApiStatus(e.response.status), 2, 1);
      });
  }
};

onMounted(() => {
  if (props.addMemberBankItem) {
    newAddMemberBank.userId = props.addMemberBankItem.userId;
    if (props.memberBankInfo) {
      title.value = "儲值明細修改";
      newAddMemberBank.ubid = props.memberBankInfo.ubid;
      newAddMemberBank.state = props.memberBankInfo.state;
      newAddMemberBank.income = props.memberBankInfo.income;
      newAddMemberBank.memo = props.memberBankInfo.memo;
    }
  }
});
</script>

<template>
  <div class="popup-mask" v-on:click.self="handAddMemberBankView()">
    <!-- 提示弹窗 -->
    <div class="popup-content">
      <h1>{{ title }}</h1>
      <div class="">
        <p>姓名</p>
        <input disabled :value="props.addMemberBankItem.nameView" />
      </div>
      <div class="">
        <p>電話</p>
        <input disabled :value="props.addMemberBankItem.phone" />
      </div>
      <div class="">
        <p>類型</p>
        <select
          v-model="newAddMemberBank.state"
          :disabled="props.memberBankInfo"
        >
          <option value="1">儲值</option>
          <option value="2">沖銷</option>
        </select>
      </div>
      <div class="">
        <p>金額</p>
        <input
          v-model="newAddMemberBank.income"
          onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
          placeholder="请输入金额"
          :disabled="props.memberBankInfo"
        />
      </div>
      <div class="">
        <p>備註</p>
        <textarea v-model="newAddMemberBank.memo"></textarea>
      </div>
      <div class="submi-btn">
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
  z-index: 4;
  background: rgba(255, 255, 255, 0.5);

  display: flex;
  align-items: center;
  justify-content: space-around;

  .popup-content {
    // max-width: 250px;
    text-align: center;
    background-color: #e6e2de;
    padding: 20px 50px;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;

    > h1 {
      font-size: 20px;
    }

    > div {
      display: flex;
      align-items: center;

      > input {
        padding-left: 15px;
        height: 30px;
        margin: 0 5px;
        border-radius: 6px;
        border: solid 1px #707070;
      }

      > select {
        padding-left: 15px;

        flex: 1;
        height: 30px;
        margin: 5px;
        border-radius: 6px;
        border: solid 1px #707070;
      }

      > textarea {
        flex: 1;
        padding-left: 15px;
        margin: 0 5px;
        border-radius: 6px;
        border: solid 1px #707070;
      }
    }

    > .submi-btn {
      margin: 10px;
      justify-content: center;

      > button {
        padding: 5px 20px;
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