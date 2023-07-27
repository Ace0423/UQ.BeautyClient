
<script setup lang="ts">
import Icon from "@/assets/Icon zocial-guest.svg";
import InfoIcon from "@/assets/Icon ionic-ios-list-box.svg";
import AddIcon from "@/assets/Icon simple-addthis.svg";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useMemberBankStore } from "@/stores/memberBank";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const memberBankStore = useMemberBankStore();
const { memberBankList } = storeToRefs(memberBankStore);
const { getMemberBankList } = memberBankStore;

const memberBankInfoView = ref(false);
const addMemberBankView = ref(false);
const memberBankInfoItem = ref();
const memberBankInfo = ref();
const addMemberBankItem = ref();
const keyWord = ref("");
const handmemberBankInfoView = (item: any) => {
  memberBankInfoItem.value = item;
  addMemberBankItem.value = item;
  memberBankInfoView.value = !memberBankInfoView.value;
};
const handAddMemberBankView = (item: any) => {
  memberBankInfo.value = undefined;
  addMemberBankItem.value = item;
  addMemberBankView.value = !addMemberBankView.value;
};
const filterMemberListData = computed(() => {
  const filter = memberBankList.value.data.filter(getMemberBankLiskFn);
  return filter;
});
const getMemberBankLiskFn = (data: any) => {
  if (
    keyWord.value.substring(0, 1) == "0" ||
    keyWord.value.substring(0, 2) == "09"
  ) {
    return (
      !keyWord.value ||
      data.phone.toLowerCase().includes(keyWord.value.toLowerCase())
    );
  } else {
    return (
      !keyWord.value ||
      data.nameView.toLowerCase().includes(keyWord.value.toLowerCase())
    );
  }
};
const handEditmemberBank = (res: any) => {
  addMemberBankItem.value = memberBankInfoItem.value;
  memberBankInfo.value = res;
  addMemberBankView.value = !addMemberBankView.value;
};
onMounted(() => {
  let allUserBank = {
    id: 0,
    pageindex: 0,
    count: 0,
  };
  getMemberBankList(allUserBank);
});
</script>
<template>
  <div class="content">
    <div class="function-area">
      <input placeholder="🔍搜尋名稱、暱稱或手機" v-model="keyWord" />
    </div>
    <table>
      <thead class="header-tab">
        <tr>
          <th>
            <p class="nameview">顧客姓名</p>
          </th>
          <th>
            <p>儲值餘額</p>
          </th>
          <th>
            <p>最近一次儲值日期</p>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody class="content-tab">
        <tr v-for="item in filterMemberListData" :key="item.userId">
          <td class="content-name">
            <img class="img-name" :src="Icon" />
            <div>
              <p>{{ item.nameView }}</p>
              <p>{{ item.phone }}</p>
            </div>
          </td>
          <td>
            <p>{{ item.balaance }}</p>
          </td>
          <td>
            <p>{{ item.storedDate }}</p>
          </td>
          <td class="td-btn">
            <button
              class="header-btn"
              v-on:click="handmemberBankInfoView(item)"
            >
              <img :src="InfoIcon" />
            </button>
            <button class="header-btn" v-on:click="handAddMemberBankView(item)">
              <img :src="AddIcon" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <AddMemberBank
    v-if="addMemberBankView"
    :addMemberBankItem="addMemberBankItem"
    :handAddMemberBankView="handAddMemberBankView"
    :memberBankInfo="memberBankInfo"
  />
  <MemberBankInfo
    v-if="memberBankInfoView"
    :memberBankInfoItem="memberBankInfoItem"
    :handmemberBankInfoView="handmemberBankInfoView"
    @handEditmemberBank="handEditmemberBank"
  />
</template>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 45px;
  bottom: 10px;
  left: 0px;
  right: 0px;
  width: 100%;
  background-color: #faf9f8;
  border: solid 0.5px #ddd;
  font-family: STXihei;
  color: #717171;

  > .function-area {
    height: 50px;
    position: absolute;
    top: -50px;
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: end;
    align-items: center;
    right: 0px;
    width: auto;

    > input {
      width: auto;
      height: 60%;
      border-radius: 6px;
      border: solid 1px #707070;
      background-color: #fff;
      margin-right: 10px;
      text-align: center;
    }

    > button {
      border-radius: 6px;
      min-width: 100px;
      height: 70%;
      border: solid 1px #707070;
      background-color: #84715c;
      color: #fff;
      margin: 0 20px;
    }
  }

  > table {
    width: 100%;
    height: 100%;

    > .header-tab {
      display: block;
      // height: 50px;
      color: #717171;
      border: solid 1px #707070;
      background-color: #e6e2de;
      box-sizing: border-box;

      > tr {
        display: flex;
        align-items: center;
        height: 50px;
        justify-content: space-between;

        > th {
          width: calc(100% / 4);

          > p {
            min-width: 108px;
            text-align: left;
          }

          > .nameview {
            padding-left: 10px;
          }
        }
      }
    }

    > .content-tab {
      position: absolute;
      width: 100%;
      top: 52px;
      bottom: 0px;
      overflow: auto;
      display: block;

      > tr {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;

        &::after {
          content: "";
          display: block;
          position: absolute;
          bottom: 0;
          width: 98%;
          height: 1px;
          background: #ddd;
          left: 50%;
          transform: translateX(-50%);
        }

        > td {
          display: flex;
          width: calc(100% / 4);

          > button {
            height: 100%;
            background-color: transparent;
            border: none;
            padding: 0 0 0 0;
            margin: 0 2px;

            > img {
              cursor: pointer;
              width: 40px;
              height: 40px;
              vertical-align: middle;
            }
          }
        }
        .content-name {
          // padding-left: 10px;
          display: flex;

          img {
            margin: 0 15px;
          }
          P {
            margin: 0 0;
          }
        }
      }
    }
  }
}
</style>