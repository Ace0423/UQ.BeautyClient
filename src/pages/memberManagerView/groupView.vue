
<script setup lang="ts">
import Icon from "@/assets/Icon zocial-guest.svg";
import InfoIcon from "@/assets/Icon ionic-ios-list-box.svg";
import editIcon from "@/assets/Icon awesome-edit.svg";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useMemberStore } from "@/stores/member";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const memberStore = useMemberStore();
const { groupListData } = storeToRefs(memberStore);
const { getGroupData } = memberStore;

const addGroupView = ref(false);
const groupInfoView = ref(false);
const selectGroupItem = ref();
const groupInfoItem = ref();
const keyWord = ref("");
const handAddGroupView = (item: any) => {
  selectGroupItem.value = item;
  addGroupView.value = !addGroupView.value;
};
const handGroupInfoView = (item: any) => {
  groupInfoItem.value = item;
  groupInfoView.value = !groupInfoView.value;
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
  getGroupData();
});
</script>
<template>
  <div class="content">
    <div class="function-area">
      <input placeholder="🔍搜尋會員標籤" v-model="keyWord" />
      <button class="header-btn" @click="handAddGroupView('')">新增標籤</button>
    </div>
    <table>
      <thead class="header-tab">
        <tr>
          <th>
            <p class="groupview">
              會員標籤(全部{{ filterGroupListData.length }}個)
            </p>
          </th>
          <th>
            <p>已加入會員數量</p>
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody class="content-tab">
        <tr v-for="item in filterGroupListData" :key="item.groupId">
          <td class="content-name">
            <p>{{ item.label }}</p>
          </td>
          <td>
            <p>{{ item.count }}</p>
          </td>
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

          > .groupview {
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
            margin: 0 15px;
          }
        }
      }
    }
  }
}
</style>