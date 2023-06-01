<template>
  <div class="coupon_div">
    <div class="table-topBar">
      <p class="bar-title">優惠券(全部{{ 0 }}個)</p>
      <div>
        <input class="seach-control" placeholder="搜尋折扣名稱、商品" />
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
            <p>已使用</p>
          </th>
          <th>
            <p>狀態</p>
          </th>
          <th>
            <p>優惠方式</p>
          </th>
          <th>
            <p>操作</p>
          </th>
        </tr>
      </thead>
      <tbody class="content-tbody">
        <tr v-for="(item, index) in allDiscountList" :key="item.discountNo">
          <td>
            <p>{{ item.title }}</p>
          </td>
          <td>
            <p>{{ item.discount }}</p>
          </td>
          <td>
            <p>{{ item.discount }}</p>
          </td>
          <td>
            <p>{{ item.discount }}</p>
          </td>
          <td>
            <p>{{ item.discount }}</p>
          </td>
          <td>
            <button v-on:click="showEditFormFn(index, item)">
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
  <AddAllDiscountUI
    v-if="showAddUI"
    :showAddUIFn="showAddUIFn"
    :formInfo="selData"
  ></AddAllDiscountUI>
  <EditAllDiscountUI
    v-if="showEditUI"
    :showEditUIFn="showEditUIFn"
    :formInfo="selData"
  ></EditAllDiscountUI>
</template>
<script setup lang="ts">
import seach_ico from "@/assets/images/icon_seach.png";
import Icon_edit from "@/assets/images/icon_edit.png";
import Icon_delete from "@/assets/images/icon_delete.png";
import { useApptStore } from "@/stores/priceStore";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
let store = useApptStore();
let { allDiscountList } = storeToRefs(store);
let { getAllDiscountApi, delAllDiscountApi } = store;
const showAddUI = ref(false);
const showEditUI = ref(false);
getAllDiscountFn();

const showAddUIFn = (state: boolean) => {
  showAddUI.value = state;
  getAllDiscountFn();
};

const showEditUIFn = (state: boolean) => {
  showEditUI.value = state;
  getAllDiscountFn();
};

function getAllDiscountFn() {
  getAllDiscountApi();
}
let selData: any = [];
const onDeleteAlertBtn = (data: any) => {
  if (data) {
    console.log("確認刪除");
    delAllDiscountApi(selData.discountNo);
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
.coupon_div {
  position: absolute;
  top: 0px;
  bottom: 10px;
  left: 0px;
  right: 0px;
  width: 100%;
  background-color: #faf9f8;
  border: solid 0.5px #ddd;
  font-family: STXihei;
  color: #717171;

  > .table-topBar {
    height: 50px;
    width: calc(100% - 2px);
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    left: auto;
    color: #717171;
    border: solid 1px #707070;
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
        margin-right: 10px;
        background: #fff url("@/assets/images/icon_seach.png") no-repeat;
        background-position: 97%;
        background-origin: content-box;
        text-indent: 5px;
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
    p {
      width: 80%;
    }
  }

  > table {
    width: 100%;
    height: 100%;

    > .table-thead {
      display: block;
      > tr {
        display: flex;
        align-items: center;
        height: 50px;
        justify-content: space-between;

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
      > tr {
        display: flex;
        border-bottom: solid 1px #707070;
        align-items: center;
        > td {
          > button {
            background-color: transparent;
            border: none;
            .edit_img {
              width: 27px;
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
