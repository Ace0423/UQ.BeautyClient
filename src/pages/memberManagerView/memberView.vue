<script setup lang="ts">
import Icon_guest from "@/assets/Icon-guest.png";
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
const filterView = ref(false);
const addMemberView = ref(false);
const memberInfoView = ref(false);
const selectMemberItem = ref();
const filterItem = ref({
  sex: [],
  register: [],
  avgPriceA: 0,
  avgPriceB: 0,
  tolPriceA: 0,
  tolPriceB: 0,
  birthday: [],
  label: [],
  consumer: 0,
  unConsumer: 0,
  conCycleA: 0,
  conCycleB: 0,
  service: [],
  staff: [],
  other: []
})
const keyWord = ref("");
const handAddMemberView = (item: any) => {
  addMemberView.value = !addMemberView.value;
};
const handFilterView = () => {
  filterView.value = !filterView.value;
  if(!filterView.value){
    memberListData();
  }
};
const handAddFilterSubmit = (filterData: any) => {
  filterItem.value = filterData;
  memberListData
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
const memberListData = (() => {
  getMemberList(filterItem)
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
})
onMounted(() => {
  memberListData();
});
</script>
<template>
  <div class="content">
    <div class="function-area">
      <input placeholder="🔍搜尋名稱、暱稱或手機" v-model="keyWord" />
      <button class="header-btn" @click="handFilterView()">
        更多篩選條件
      </button>
      <button class="header-btn" @click="handAddMemberView('')">
        新增會員
      </button>
    </div>
    <table>
      <thead class="header-tab">
        <tr>
          <th>
            <p class="nameview">
              會員(全部{{ filterMemberListData.length }}個)
            </p>
          </th>
          <th>
            <p>未出席次數</p>
          </th>
          <th>
            <p>標籤</p>
          </th>
          <th>
            <p>最後消費時間</p>
          </th>
          <th class="header-btn"></th>
        </tr>
      </thead>
      <tbody class="content-tab">
        <tr v-for="item in filterMemberListData" :key="item.userId">
          <td class="content-name">
            <img v-if="!item.photo" class="img-name" :src="Icon_guest" />
            <img v-if="item.photo" class="img-name" :src="item.photo" />
            <div>
              <p>{{ item.nameView }}</p>
              <p>{{ item.phone }}</p>
            </div>
          </td>
          <td>
            <p>
              {{ item.userLock }}
            </p>
          </td>
          <td>
            <div class="group-frame" v-for="gItem in item.groupList" :key="gItem.groupId">
              {{ gItem.label }}
            </div>
          </td>
          <td>
            <p>{{ item.tradingTime }}</p>
          </td>
          <td class="content-btn">
            <button class="header-btn" @click="handMemberInfoView(item)">
              >
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <FilterView v-if="filterView" :hand-filter-view="handFilterView" :mFilter="filterItem"
    @handSubmit="handAddFilterSubmit" />
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
      margin-right: 5px;
      text-align: center;
    }

    >button {
      border-radius: 6px;
      // min-width: 100px;
      height: 70%;
      font-weight: bold;
      border: solid 1px #e6e2de;
      background-color: #e6e2de;
      color: #717171;
      margin: 0 5px;
    }
  }

  >table {
    width: 100%;
    height: 100%;

    >.header-tab {
      width: 100%;
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
        width: 100%;
        justify-content: space-between;

        >th {
          width: 23.75%;

          >p {
            min-width: 108px;
            text-align: left;
          }

          >.nameview {
            padding-left: 10px;
          }
        }

        >.header-btn {
          width: 5%;
        }
      }

      >tr>th:nth-child(1) {
        width: 25%;
      }

      >tr>th:nth-child(2) {
        width: 10%;
      }

      >tr>th:nth-child(3) {
        width: 35%;
        display: flex;
        text-align: center;
        justify-content: center;

        >p {
          text-align: center;
        }
      }

      >tr>th:nth-child(4) {
        width: 25%;
      }

      >tr>th:nth-child(5) {
        width: 5%;
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
        // justify-content: space-between;
        position: relative;
        // width: 100%;
        height: 50px;

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
          width: 23.75%;

          >.group-frame {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            border: solid 0px #707070;
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

        .content-btn {
          width: 5%;
        }


        .content-name {
          // padding-left: 10px;
          display: flex;

          >.img-name {
            width: 35px;
            height: 35px;
            margin: 0 15px;
            clip-path: circle(50% at 50% 50%);
          }

          P {
            margin: 0 0;
          }
        }
      }

      >tr>td:nth-child(1) {
        width: 25%;
      }

      >tr>td:nth-child(2) {
        width: 10%;
      }

      >tr>td:nth-child(3) {
        width: 35%;
        display: flex;
        text-align: center;
        justify-content: center;
      }

      >tr>td:nth-child(4) {
        width: 25%;
      }

      >tr>td:nth-child(5) {
        width: 5%;
      }
    }
  }
}
</style>