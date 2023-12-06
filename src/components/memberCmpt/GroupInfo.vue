<script setup lang="ts">
import { useMemberStore } from "@/stores/member";
import DeleteIcon from "@/assets/Icon material-delete.svg";
import type { IBackStatus } from "@/types/IData";
const memberStore = useMemberStore();
const {
  getGroupInfoData,
  groupInfoData,
  deleteGroupInfoData,
  memberList,
  addGroupInfoData,
} = memberStore;
const alertState = ref(false);
const alertInformation = reactive({
  selfData: {},
  selfType: "",
  messageText: "", // 提示內容
  buttonState: 0, //按鈕顯示狀態 0:全部 1:只顯示確定按鈕 2:不顯示按鈕
  timerVal: 0, //時間計時器
});
const addGroupMemberView = ref(false);
const selectMember = ref();
const groupInfo = reactive({
  groupId: 0,
  label: "",
  memo: "",
});
const props = defineProps<{
  groupInfoItem: any;
  handGroupInfoView: Function;
}>();
const handAlertView = (msg: string, btnState: number, timer: number) => {
  alertInformation.messageText = msg;
  alertInformation.buttonState = btnState;
  alertInformation.timerVal = timer;
  alertState.value = !alertState.value;
};

const handAddGroupMenberView = () => {
  selectMember.value = "";
  addGroupMemberView.value = !addGroupMemberView.value;
};
const handAddGroupMenberBtn = () => {
  let selectMenberData = {
    groupId: groupInfo.groupId,
    label: groupInfo.label,
    userId: selectMember.value.userId,
    nameView: selectMember.value.nameView,
  };
  addGroupInfoData(selectMenberData).then((res) => {
    if (res == 1) {
      handAlertView("新增成功", 2, 1);
      setTimeout(() => {
        handAddGroupMenberView();
      }, 1000);
    } else {
      handAlertView("新增失敗", 2, 1);
    }
  });
};
const handDeleteBtn = (data: any) => {
  alertInformation.selfType = "deleteMemberGroup";
  alertInformation.selfData = data;
  handAlertView("是否刪除", 0, 0);
};
const alertSumitBtn = (val: IBackStatus) => {
  switch (alertInformation.selfType) {
    case "deleteMemberGroup":
      if (val.btnStatus) {
        deleteGroupInfoData(alertInformation.selfData).then((res) => {
          if (res == 1) {
            handAlertView("刪除成功", 2, 1);
          } else {
            handAlertView("刪除失敗", 2, 1);
          }
        });
      }
      break;

    default:
      break;
  }
  alertState.value = !alertState.value;
};
onMounted(() => {
  if (props.groupInfoItem) {
    groupInfo.groupId = props.groupInfoItem.groupId;
    groupInfo.label = props.groupInfoItem.label;
    groupInfo.memo = props.groupInfoItem.memo;
  }
  getGroupInfoData(props.groupInfoItem).then((res) => {
    if (res == 1) {
      // props.handGroupInfoView()
    }
  });
});
</script>

<template>
  <div class="popup-mask" v-on:click.self="handGroupInfoView()">
    <!-- 提示弹窗 -->
    <div class="popup-content">
      <h1>{{ groupInfo.label }}</h1>
      <div class="group-information">
        <p>備註:{{ groupInfo.memo }}</p>
        <p v-if="groupInfoData.data.length == null">顧客:0位</p>
        <p v-if="groupInfoData.data.length > 0">
          顧客:{{ groupInfoData.data.length }}位
        </p>
        <button @click="handAddGroupMenberView">新增顧客</button>
      </div>
      <div class="group-information-list">
        <table>
          <thead class="header-tab">
            <tr>
              <th>顧客</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody class="content-tab">
            <tr v-for="item in groupInfoData.data" :key="item">
              <td>
                <p>{{ item.nameView }}</p>
              </td>
              <td></td>
              <td></td>
              <td>
                <button class="header-btn" v-on:click="handDeleteBtn(item)">
                  <img :src="DeleteIcon" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="groupinfo-add-member" v-if="addGroupMemberView">
      <h1>新增客戶</h1>
      <div class="content">
        <p>客戶</p>
        <select v-model="selectMember" >
          <option v-for="item in memberList.data" :key="item.userId" :value="item">
            {{ item.nameView }}
          </option>
        </select>
      </div>
      <div><button @click="handAddGroupMenberBtn">新增</button></div>
    </div>
  </div>
  <Alert v-if="alertState" :alert-information="alertInformation" :hand-alert-view="handAlertView"
    @callback-btn="alertSumitBtn"></Alert>
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
    width: 60%;
    height: 60%;
    text-align: center;
    position: relative;
    background-color: #e6e2de;
    // padding: 20px 50px;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;

    >h1 {
      // height: 20px;
      font-size: 30px;
    }

    >.group-information {
      display: flex;
      justify-content: space-around;
      align-items: center;

      >p {
        margin: 0px 0px;
      }

      >button {
        // height: 100%;
        margin: 2px 2px;
      }
    }

    >.group-information-list {
      position: absolute;
      left: 0px;
      right: 0px;
      top: 75px;
      bottom: 0px;

      >table {
        display: block;
        position: absolute;
        top: 0px;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background-color: #faf9f8;
        border: solid 0.5px #ddd;
        font-family: STXihei;
        color: #717171;

        >.header-tab {
          display: block;
          height: 50px;
          position: absolute;
          left: 0px;
          right: 0px;
          color: #717171;
          border: solid 1px #707070;
          background-color: #e6e2de;
          box-sizing: border-box;

          >tr {
            display: flex;
            align-items: center;
            height: 100%;
            justify-content: space-between;
            margin: 0 10px;

            >th {
              width: 25%;
            }
          }
        }

        >.content-tab {
          position: absolute;
          width: 100%;
          top: 52px;
          bottom: 0px;
          overflow: auto;
          display: block;

          tr {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px #717171 solid;

            >td {
              display: flex;
              justify-content: center;
              width: 25%;

              >img {
                cursor: pointer;
                width: 40px;
                height: 40px;
                padding: 5px 10px;
                border-radius: 45px;
              }

              >button {
                height: 100%;
                background-color: transparent;
                border: none;
              }

              >p {
                cursor: pointer;
                margin: 10px 0;
              }
            }
          }
        }
      }
    }
  }

  .groupinfo-add-member {
    width: 60%;
    height: 60%;
    text-align: center;
    position: absolute;
    background-color: #e6e2de;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;

    >h1 {
      text-align: center;
      font-size: 35px;
    }

    >.content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 10%;
      padding: 40px 0px;
      width: 100%;

      >p {
        min-width: 50px;
        margin: 10px;
        font-size: 25px;
      }

      >select {
        width: 60%;
        height: 100%;
        margin: 10px;
      }
    }

    >div {
      display: flex;
      justify-content: center;

      >button {
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        margin: 10px;
        padding: 20px 10px;
        border-radius: 10px 10px 10px 10px;
        background-color: #84715c;
        font-size: 18px;
        font-weight: bold;
        font-family: HeitiTC;
        color: #ffffff;
      }
    }
  }
}
</style>