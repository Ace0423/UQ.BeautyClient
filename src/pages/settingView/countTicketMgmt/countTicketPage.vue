<template>
  <div class="countTicket_div">
    <div class="table-topBar">
      <p class="bar-title">計次券(全部{{ filterCTicketListCpt.length }}個)</p>
      <div>
        <input class="search-control" v-model="search" placeholder="搜尋名稱" />
        <button class="header-btn" @click="showAddFormFn()">新增</button>
      </div>
    </div>
    <table>
      <thead class="table-thead">
        <tr>
          <th>
            <p class="nameview">名稱</p>
          </th>
          <th>
            <p>期限</p>
          </th>
          <th>
            <p>可兌換數量</p>
          </th>
          <th>
            <p>狀態</p>
          </th>
          <th>
            <p>售價</p>
          </th>
          <th>
            <p>操作</p>
          </th>
        </tr>
      </thead>
      <tbody class="content-tbody">
        <tr
          v-for="(item, index) in filterCTicketListCpt"
          :key="item.discountNo"
        >
          <td>
            <p>{{ item.ffTitle }}</p>
          </td>
          <td>
            <p v-if="item.ffDateType == 0">{{ " 不限期" }}</p>
            <p v-if="item.ffDateType == 2">{{ item.ffDateOfUsedDay + "天" }}</p>
            <p v-if="item.ffDateType == 1">
              {{ item.ffSdt.split(" ")[0] + " 啟用" }}<br />{{
                item.ffEdt.split(" ")[0] + " 到期"
              }}
            </p>
          </td>
          <td>
            <p>{{ item.ffLimit }}</p>
          </td>
          <td>
            <p v-if="item.ffType == 0">已停用</p>
            <p v-else>啟用中</p>
          </td>
          <td>
            <p>${{ item.ffPrice }}</p>
          </td>
          <td>
            <button v-on:click="showInfoUIFn(true, item)">
              <img class="edit_img" :src="Icon_edit" />
            </button>
            <button v-on:click="deleteHdr(index, item)">
              <img class="delete_img" :src="Icon_delete" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CountTicketInfo
    v-if="showInfoUI"
    :showInfoUIHdr="showInfoUIFn"
    :selItemData="selData"
  />
  <AddCountTicket v-if="showAddUI" :showUIFn="showAddUIFn"></AddCountTicket>
</template>
<script setup lang="ts">
import Icon_edit from "@/assets/images/icon_edit.png";
import Icon_delete from "@/assets/images/icon_delete.png";
import { usePriceStore } from "@/stores/priceStore";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
let store = usePriceStore();
let { countTicketListRef } = storeToRefs(store);
let { getCountTicketApi, delCountTicketApi } = store;
const showAddUI = ref(false);
const showEditUI = ref(false);
let showInfoUI = ref(false);
getAllDiscountFn();

let filterCTicketListCpt: any = computed(() =>
  countTicketListRef.value.filter(getCTicketListFn)
);
let search = ref("");
function getCTicketListFn(data: any) {
  return (
    !search.value ||
    data.ffTitle.toLowerCase().includes(search.value.toLowerCase())
  );
}

const showAddUIFn = (state: boolean) => {
  showAddUI.value = state;
  getAllDiscountFn();
};
const showInfoUIFn = (state: boolean, item: any) => {
  showInfoUI.value = state;
  selData.value = item;
  // getAllDiscountFn();
};

const showEditUIFn = (state: boolean) => {
  showEditUI.value = state;
  getAllDiscountFn();
};

function getAllDiscountFn() {
  getCountTicketApi().then((res: any) => {
    console.log(countTicketListRef.value);
  });
}
let selData: any = [];
const onDeleteAlertBtn = (data: any) => {
  if (data) {
    console.log("確認刪除");
    delCountTicketApi(selData.ffId);
  } else {
    console.log("取消刪除");
  }
  selData.value = [];
};
//新增
function showAddFormFn() {
  selData.value = [];
  showAddUIFn(true);
}
//編輯
function showEditFormFn(index: number, item: any) {
  selData.value = item;
  showEditUIFn(true);
}
//刪除
let deleteHdr = (index: number, item: any) => {
  selData = item;
  Alert.check("是否刪除", 1000, onDeleteAlertBtn);
};
</script>

<style lang="scss" scoped>
.countTicket_div {
  position: absolute;
  top: 0px;
  bottom: 10px;
  left: 0px;
  right: 0px;
  width: 100%;
  background-color: #faf9f8;
  border: solid 0.5px #ddd;
  box-sizing: border-box;
  font-family: STXihei;
  color: #717171;

  > .table-topBar {
    height: 50px;
    width: calc(100%);
    background-color: transparent;
    display: flex;
    align-items: center;
    left: auto;
    color: #717171;
    border: solid 1px #707070;
    box-sizing: border-box;
    background-color: #e6e2de;
    font-weight: 700;
    > div {
      display: flex;
      height: 100%;
      justify-content: right;
      align-items: center;
      > input {
        width: auto;
        height: 60%;
        border-radius: 6px;
        border: solid 1px #707070;
        box-sizing: border-box;
        margin-right: 10px;
        background: #fff url("@/assets/images/icon_search.png") no-repeat;
        background-position: 97%;
        background-origin: content-box;
        text-indent: 5px;
      }

      > button {
        border-radius: 6px;
        min-width: 100px;
        height: 70%;
        border: solid 1px #707070;
        box-sizing: border-box;
        background-color: #84715c;
        color: #fff;
        margin: 0 20px;
      }
    }
    p {
      width: 80%;
    }
  }

  > table {
    width: 100%;
    height: calc(100% - 50px);

    > .table-thead {
      display: block;
      height: 50px;
      > tr {
        display: flex;
        align-items: center;
        height: 50px;
        // justify-content: space-between;

        > th {
          > p {
            min-width: 108px;
            text-align: left;
          }
        }
      }

      > tr > th:nth-child(1) {
        width: 20%;
      }
      > tr > th:nth-child(2) {
        width: 20%;
      }
      > tr > th:nth-child(3) {
        width: 10%;
      }
      > tr > th:nth-child(4) {
        width: 20%;
      }
      > tr > th:nth-child(5) {
        width: 20%;
      }
      > tr > th:nth-child(6) {
        width: 10%;
      }
    }

    > .content-tbody {
      display: block;
      width: 100%;
      overflow-y: auto;
      height: calc(100% - 50px);
      > tr {
        display: flex;
        border-bottom: solid 1px #707070;
        align-items: center;
        > td {
          > button {
            background-color: transparent;
            border: none;
            .edit_img {
              width: 32px;
              height: 27px;
            }
            .delete_img {
              width: 21px;
              height: 27px;
            }
          }
        }
      }

      > tr > td:nth-child(1) {
        width: 20%;
      }
      > tr > td:nth-child(2) {
        width: 20%;
      }
      > tr > td:nth-child(3) {
        width: 10%;
      }
      > tr > td:nth-child(4) {
        width: 20%;
      }
      > tr > td:nth-child(5) {
        width: 20%;
      }
      > tr > td:nth-child(6) {
        width: 10%;
      }
    }
  }
}
</style>
