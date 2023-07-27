<template>
  <div class="discountSingle_div">
    <div class="table-topBar">
      <p class="bar-title">單品折扣(所有{{ filterListCpt.length }}種折扣)</p>
      <div>
        <input
          class="search-control"
          v-model="search"
          placeholder="搜尋折扣名稱"
        />
        <button class="header-btn" @click="showAddFormFn()">新增</button>
      </div>
    </div>
    <table>
      <thead class="table-thead">
        <tr>
          <th>
            <p class="nameview">折扣名稱</p>
          </th>
          <th>
            <p>套用服務數</p>
          </th>
          <th>
            <p>套用商品數</p>
          </th>
          <th>
            <p>折扣內容</p>
          </th>
          <th>
            <p>操作</p>
          </th>
        </tr>
      </thead>
      <tbody class="content-tbody">
        <tr v-for="(item, index) in filterListCpt" :key="item.discountNo">
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
  <AddSingleDiscountUI
    v-if="showAddUI"
    :showAddUIFn="showAddUIFn"
  ></AddSingleDiscountUI>
  <EditSingleDiscountUI
    v-if="showEditUI"
    :showEditUIFn="showEditUIFn"
    :formInfo="selData"
  ></EditSingleDiscountUI>
</template>
<script setup lang="ts">
import { usePriceStore } from "@/stores/priceStore";
import { storeToRefs } from "pinia";
import search_ico from "@/assets/images/icon_search.png";
import Icon_edit from "@/assets/images/icon_edit.png";
import Icon_delete from "@/assets/images/icon_delete.png";
import Alert from "@/components/alertCmpt";

let store = usePriceStore();
let { singleDiscountListRef } = storeToRefs(store);
let { getSingleDiscountApi, delSingleDiscountApi } = store;

const showAddUI = ref(false);
const showEditUI = ref(false);
let search = ref("");
let selData: any = [];
onBeforeFn();
function onBeforeFn() {
  getSingleDiscountApi();
}

let filterListCpt: any = computed(() =>
  singleDiscountListRef.value.filter(getFilterListFn)
);
function getFilterListFn(data: any) {
  return (
    !search.value ||
    data.title.toLowerCase().includes(search.value.toLowerCase())
  );
}

function showAddUIFn(state: boolean) {
  showAddUI.value = state;
}
function showEditUIFn(state: boolean) {
  showEditUI.value = state;
  getSingleDiscountApi();
}
//新增
function showAddFormFn() {
  selData.value = [];
  showAddUIFn(true);
}
//編輯
function showEditFormFn(index: number, item: any) {
  selData.value = item;
  console.log(showEditUI.value);
  showEditUIFn(true);
}
//刪除
let deleteHdr = (index: number, item: any) => {
  selData = item;
  Alert.check("是否刪除", 1000, onDeleteAlertBtn);
};
const onDeleteAlertBtn = (data: any) => {
  if (data) {
    console.log("確認刪除");
    delSingleDiscountApi(selData.discountNo).then((res: any) => {
      console.log(res);
      if (res.state == 1) {
      } else {
      }
    });
  } else {
    console.log("取消刪除");
  }
  selData.value = [];
};
</script>
<style lang="scss" scoped>
.discountSingle_div {
  position: absolute;
  top: 45px;
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
    border: none;
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
        justify-content: space-between;

        > th {
          > p {
            min-width: 108px;
            text-align: left;
          }
        }
      }

      > tr > th:nth-child(1) {
        width: 60%;
      }
      > tr > th:nth-child(2) {
        width: 10%;
      }
      > tr > th:nth-child(3) {
        width: 10%;
      }
      > tr > th:nth-child(4) {
        width: 10%;
      }
      > tr > th:nth-child(5) {
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
        width: 60%;
      }
      > tr > td:nth-child(2) {
        width: 10%;
      }
      > tr > td:nth-child(3) {
        width: 10%;
      }
      > tr > td:nth-child(4) {
        width: 10%;
      }
      > tr > td:nth-child(5) {
        width: 10%;
      }
    }
  }
}
</style>
