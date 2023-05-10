<script setup lang="ts">
import Icon from "@/assets/Icon zocial-guest.svg";
import AddIcon from "@/assets/Icon simple-addthis.svg";
import DeleteIcon from "@/assets/Icon material-delete.svg";
import InfoIcon from "@/assets/Icon ionic-ios-list-box.svg";
import editIcon from "@/assets/Icon awesome-edit.svg";
import { useCounterStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const store = useCounterStore();
const { memberList, groupListData } = storeToRefs(store);
const { getMemberList, getGroupData } = store;

const currentIndex = ref(0);
const memberInfoView = ref(false);
const addMemberView = ref(false);
const addGroupView = ref(false);
const groupInfoView = ref(false);
const selectMemberItem = ref();
const selectGroupItem = ref();
const groupInfoItem = ref();
const keyWord = ref("");
const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
}>();
const changeTab = (index: number) => {
  currentIndex.value = index;
};
const handMemberInfoView = (item: any) => {
  selectMemberItem.value = item;
  memberInfoView.value = !memberInfoView.value;
};
const handAddMemberView = () => {
  addMemberView.value = !addMemberView.value;
};
const handAddGroupView = (item: any) => {
  selectGroupItem.value = item;
  addGroupView.value = !addGroupView.value;
};
const handGroupInfoView = (item: any) => {
  groupInfoItem.value = item;
  groupInfoView.value = !groupInfoView.value;
};
const filterMemberListData = computed(() => {
  const filter = memberList.value.data.filter(getMemberListFn);
  return filter;
});
const getMemberListFn = (data: any) => {
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
const filterGroupListData = computed(() => {
  const filter = groupListData.value.data.filter(getGroupListFn);
  return filter;
});
const getGroupListFn = (data: any) => {
  return (
    !keyWord.value ||
    data.label.toLowerCase().includes(keyWord.value.toLowerCase())
  );
};
onMounted(() => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  getMemberList();
  getGroupData();
});
</script>

<template>
  <div class="container">
    <Header
      :Icon="Icon"
      :moduleType="'顧客管理'"
      :memuState="props.memuState"
      :handmemuStateBtn="props.handmemuStateBtn"
    ></Header>
    <div class="customer-tab">
      <div class="item-tab">
        <button
          :class="currentIndex == 0 ? 'active' : ''"
          v-on:click="changeTab(0)"
        >
          所有顧客
        </button>
        <button
          :class="currentIndex == 1 ? 'active' : ''"
          v-on:click="changeTab(1)"
        >
          標籤設定
        </button>
      </div>
      <div :class="currentIndex != 0 ? 'current' : ''">
        <table>
          <thead class="header-tab">
            <tr>
              <th>
                <p class="nameview">
                  顧客(全部{{ filterMemberListData.length }}個)
                </p>
              </th>
              <th>
                <p>標籤</p>
              </th>
              <th>
                <p>最後消費時間</p>
              </th>
              <th>
                <input placeholder="🔍搜尋名稱、暱稱或手機" v-model="keyWord" />
              </th>
              <th>
                <button class="header-btn" v-on:click="handAddMemberView()">
                  新增顧客
                </button>
              </th>
            </tr>
          </thead>
          <tbody class="content-tab">
            <tr v-for="item in filterMemberListData" :key="item.userId">
              <td>
                <img :src="Icon" />
                <div>
                  <p>{{ item.nameView }}</p>
                  <p>{{ item.phone }}</p>
                </div>
              </td>
              <td>
                <div
                  class="group-frame"
                  v-for="gItem in item.groupList"
                  :key="gItem.groupId"
                >
                  {{ gItem.label }}
                </div>
              </td>
              <td>{{ item.tradingTime }}</td>
              <td></td>
              <td class="td-btn">
                <button
                  class="header-btn"
                  v-on:click="handMemberInfoView(item)"
                >
                  <img :src="InfoIcon" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div :class="currentIndex != 1 ? 'current' : ''">
        <div class="header-tab">
          <div></div>
        </div>
        <table>
          <thead class="header-tab">
            <tr>
              <th>
                <p>顧客標籤(全部{{ filterGroupListData.length }}個)</p>
              </th>
              <th></th>
              <th>
                <input placeholder="🔍搜尋顧客標籤" v-model="keyWord" />
              </th>
              <th>
                <button class="header-btn" v-on:click="handAddGroupView('')">
                  新增標籤
                </button>
              </th>
            </tr>
          </thead>
          <tbody class="content-tab">
            <tr v-for="item in filterGroupListData" :key="item.groupId">
              <td>
                <p>{{ item.label }}</p>
              </td>
              <td></td>
              <td></td>
              <td class="td-btn">
                <button class="header-btn" v-on:click="handGroupInfoView(item)">
                  <img :src="InfoIcon" />
                </button>
                <button class="header-btn" v-on:click="handAddGroupView(item)">
                  <img :src="editIcon" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <AddMember
    v-if="addMemberView"
    :hand-add-member-view="handAddMemberView"
    :select-member-item="selectMemberItem"
  />
  <MemberInfo
    v-if="memberInfoView"
    :hand-member-info-view="handMemberInfoView"
    :select-member-item="selectMemberItem"
    :hand-add-member-view="handAddMemberView"
  />
  <AddGroup
    v-if="addGroupView"
    :hand-add-group-view="handAddGroupView"
    :select-group-item="selectGroupItem"
  />
  <GroupInfo
    v-if="groupInfoView"
    :group-info-item="groupInfoItem"
    :hand-group-info-view="handGroupInfoView"
  />
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;

  > .customer-tab {
    position: absolute;
    top: 80px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: 2px 40px;

    > .item-tab {
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      display: flex;

      > button {
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

      > button.active {
        background-color: #e6e2de;
      }
    }

    > div {
      position: absolute;
      top: 45px;
      bottom: 10px;
      left: 0px;
      right: 0px;

      > table {
        width: 100%;
        height: 100%;
        background-color: #faf9f8;
        border: solid 0.5px #ddd;
        font-family: STXihei;
        color: #717171;

        > .header-tab {
          display: block;
          height: 50px;
          color: #717171;
          border: solid 1px #707070;
          background-color: #e6e2de;
          box-sizing: border-box;

          > tr {
            display: flex;
            align-items: center;
            height: 100%;
            justify-content: space-between;
            // margin: 0 10px;

            > th {
              width: 25%;

              > p {
                min-width: 108px;
                text-align: left;
              }

              > input {
                width: auto;
                height: 30px;
                border-radius: 6px;
                border: solid 1px #707070;
                background-color: #fff;
                margin-right: 10px;
                text-align: center;
              }
              > button {
                border-radius: 6px;
                height: 30px;
                min-width: 78px;
                border: solid 1px #707070;
                background-color: #84715c;
                color: #fff;
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
          display: flex;
          flex-direction: column;

          tr {
            display: flex;
            padding: 5px 0;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px #717171 solid;
            > td {
              display: flex;
              width: 25%;

              > img {
                padding: 0 10px;
              }

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

              > div {
                > p {
                  cursor: pointer;
                  margin: 0 0;
                }
              }
              > .roup-frame {
                background-color: #84715c;
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