
<script setup lang="ts">
import Icon from "@/assets/Icon zocial-guest.svg";
import editIcon from "@/assets/Icon awesome-edit.svg";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useMemberStore } from "@/stores/member";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const memberStore = useMemberStore();
const { memberList } = storeToRefs(memberStore);
const { getMemberList } = memberStore;

const addMemberView = ref(false);
const memberInfoView = ref(false);
const selectMemberItem = ref();
const keyWord = ref("");
const handAddMemberView = (item: any) => {
  addMemberView.value = !addMemberView.value;
};
const handMemberInfoView = (item: any) => {
  selectMemberItem.value = item;
  memberInfoView.value = !memberInfoView.value;
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

onMounted(() => {
  getMemberList()
    .then((res) => {
      if (res.state == 2) {
        Alert.warning(showErrorMsg(res.msg), 2000);
      }
    })
    .catch((e: any) => {
      Alert.warning(showHttpsStatus(e.response.status), 2000);
      if (e.response.status == 401) {
        setTimeout(() => {
          handLogOut();
        }, 2000);
      }
    });
});
</script>
<template>
  <div class="content">
    <div class="function-area">
      <input placeholder="🔍搜尋名稱、暱稱或手機" v-model="keyWord" />
      <button class="header-btn" @click="handAddMemberView('')">
        新增使用者
      </button>
    </div>
    <table>
      <thead class="header-tab">
        <tr>
          <th>
            <p class="nameview">
              使用者(全部{{ filterMemberListData.length }}個)
            </p>
          </th>
          <th>
            <p>標籤</p>
          </th>
          <th>
            <p>最後消費時間</p>
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
            <div class="group-frame" v-for="gItem in item.groupList" :key="gItem.groupId">
              {{ gItem.label }}
            </div>
          </td>
          <td>
            <p>{{ item.tradingTime }}</p>
          </td>
          <td>
            <button class="header-btn" v-on:click="handMemberInfoView(item)">
              <img :src="editIcon" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <AddMember v-if="addMemberView" :hand-add-member-view="handAddMemberView" :select-member-item="selectMemberItem" />
  <MemberInfo v-if="memberInfoView" :hand-member-info-view="handMemberInfoView" :select-member-item="selectMemberItem"
    :hand-add-member-view="handAddMemberView" />
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

  >.function-area {
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

    >input {
      width: auto;
      height: 60%;
      border-radius: 6px;
      border: solid 1px #707070;
      background-color: #fff;
      margin-right: 10px;
      text-align: center;
    }

    >button {
      border-radius: 6px;
      min-width: 100px;
      height: 70%;
      border: solid 1px #707070;
      background-color: #84715c;
      color: #fff;
      margin: 0 20px;
    }
  }

  >table {
    width: 100%;
    height: 100%;

    >.header-tab {
      display: block;
      // height: 50px;
      color: #717171;
      border: solid 1px #707070;
      background-color: #e6e2de;
      box-sizing: border-box;

      >tr {
        display: flex;
        align-items: center;
        height: 50px;
        justify-content: space-between;

        >th {
          width: calc(100% / 4);

          >p {
            min-width: 108px;
            text-align: left;
          }

          >.nameview {
            padding-left: 10px;
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
      display: block;

      >tr {
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

        >td {
          display: flex;
          width: calc(100% / 4);

          >.group-frame {
            display: flex;
              justify-content: center;
              align-items: center;
              font-size: 14px;
              border: solid 1px #707070;
              background-color: #e6e2de;
              padding: 1px 1px;
              margin: 2px 2px;

              >p {
                margin: 0px 0px;
              }
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