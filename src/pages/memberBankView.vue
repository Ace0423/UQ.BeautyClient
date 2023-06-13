<script setup lang="ts">
import headIcon from "@/assets/Icon zocial-guest.svg";
import Icon from "@/assets/Icon awesome-money-check-alt.svg";
import InfoIcon from "@/assets/Icon ionic-ios-list-box.svg";
import AddIcon from "@/assets/Icon simple-addthis.svg";
import { useMemberBankStore } from "@/stores/memberBank";
import { storeToRefs } from "pinia";

const memberBankStore = useMemberBankStore();
const { memberBankList } = storeToRefs(memberBankStore);
const { getMemberBankList } = memberBankStore;

const currentIndex = ref(0);
const memberBankInfoView = ref(false);
const addMemberBankView = ref(false);
const memberBankInfoItem = ref();
const memberBankInfo = ref();
const addMemberBankItem = ref();
const keyWord = ref("");
const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
}>();
const changeTab = (index: number) => {
  currentIndex.value = index;
};
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
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  let allUserBank = {
    id: 0,
    pageindex: 0,
    count: 0,
  };
  getMemberBankList(allUserBank);
});
</script>

<template>
  <div class="container">
    <Header :Icon="Icon" :moduleType="'儲值金'" :memuState="props.memuState" :handmemuStateBtn="props.handmemuStateBtn">
    </Header>
    <div class="customer-tab">
      <div class="item-tab">
        <button :class="currentIndex == 0 ? 'active' : ''" v-on:click="changeTab(0)">
          所有顧客
        </button>
      </div>
      <div :class="currentIndex != 0 ? 'current' : ''">
        <table>
          <thead class="header-tab">
            <tr>
              <th>
                <p>顧客姓名</p>
              </th>
              <th>
                <p>儲值餘額</p>
              </th>
              <th>
                <p>最近一次儲值日期</p>
              </th>
              <th>
                <input placeholder="🔍搜尋名稱、暱稱或手機" v-model="keyWord" />
              </th>
            </tr>
          </thead>
          <tbody class="content-tab">
            <tr v-for="item in filterMemberListData" :key="item.userId">
              <td>
                <img :src="headIcon" />
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
                <button class="header-btn" v-on:click="handmemberBankInfoView(item)">
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
    </div>
  </div>
  <AddMemberBank v-if="addMemberBankView" :addMemberBankItem="addMemberBankItem"
    :handAddMemberBankView="handAddMemberBankView" :memberBankInfo="memberBankInfo" />
  <MemberBankInfo v-if="memberBankInfoView" :memberBankInfoItem="memberBankInfoItem"
    :handmemberBankInfoView="handmemberBankInfoView" @handEditmemberBank="handEditmemberBank" />
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;

  >.customer-tab {
    position: absolute;
    top: 80px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: 2px 40px;

    >.item-tab {
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      display: flex;

      >button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        width: 120px;
        height: 45px;
        border-radius: 10px 10px 0 0;
        background-color: #faf9f8;
        font-size: 20px;
        font-weight: bold;
        font-family: HeitiTC;
        color: #717171;
      }

      >button.active {
        background-color: #e6e2de;
      }
    }

    >div {
      position: absolute;
      top: 45px;
      bottom: 10px;
      left: 0px;
      right: 0px;

      >table {
        width: 100%;
        height: 100%;
        background-color: #faf9f8;
        border: solid 0.5px #ddd;
        font-family: STXihei;
        color: #717171;

        >.header-tab {
          display: block;
          height: 50px;
          color: #717171;
          border: solid 0.5px #707070;
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

              >p {
                min-width: 78px;
                text-align: left;
              }

              >input {
                // width: 134px;
                width: auto;
                height: 30px;
                border-radius: 6px;
                border: solid 1px #707070;
                background-color: #fff;
                margin-right: 10px;
                text-align: center;
              }
            }
          }
        }

        >.content-tab {
          position: absolute;
          width: 100%;
          top: 52px;
          bottom: 0px;
          overflow: auto;
          display: flex;
          flex-direction: column;

          tr {
            padding: 5px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;

            &::after {
              content: '';
              display: block;
              position: absolute;
              bottom: 0;
              width: 98%;
              height: 1px;
              background: #ddd;
              left: 50%;
              transform: translateX(-50%);
            }

            >td {
              display: flex;
              width: 25%;

              >img {
                padding: 0 10px;
              }

              >button {
                height: 100%;
                background-color: transparent;
                border: none;
                padding: 0 0 0 0;
                margin: 0 2px;

                >img {
                  cursor: pointer;
                  width: 40px;
                  height: 40px;
                  vertical-align: middle;
                }
              }

              >div {
                >p {
                  cursor: pointer;
                  margin: 0 0;
                }
              }
            }

            .td-btn {
              justify-content: center;
            }
          }
        }
      }
    }

    .current {
      display: none;
    }
  }
}
</style>