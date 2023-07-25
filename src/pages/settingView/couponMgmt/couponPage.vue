<template>
  <div class="coupon_div">
    <div class="top-content">
      <div class="news-filter">
        <el-select
          v-model="couponStateValue"
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder=" "
        >
          <el-option
            v-for="(item, index) in couponStateTabs"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="couponTypeValue"
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder=" "
        >
          <el-option
            v-for="(item, index) in couponTypeTabs"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="main-content">
      <div class="table-topBar">
        <p class="bar-title">優惠券(全部{{ filterCouponDataCpt.length }}個)</p>
        <div>
          <input
            class="search-control"
            v-model="search"
            placeholder="搜尋名稱"
          />
          <button class="header-btn" @click="showAddFormFn()">新增</button>
        </div>
      </div>
      <table>
        <thead class="table-thead">
          <tr>
            <th @click="sortDataListFn(0)">
              <p class="nameview">名稱</p>
            </th>
            <th @click="sortDataListFn(1)">
              <p>期限</p>
            </th>
            <th @click="sortDataListFn(2)">
              <p>數量</p>
            </th>
            <th @click="sortDataListFn(3)">
              <p>狀態</p>
            </th>
            <th @click="sortDataListFn(4)">
              <p>優惠方式</p>
            </th>
            <th>
              <p>操作</p>
            </th>
          </tr>
        </thead>
        <tbody class="content-tbody">
          <tr
            v-for="(item, index) in filterCouponDataCpt"
            :key="item.discountNo"
          >
            <td>
              <p>{{ item.ccTitle }}</p>
            </td>
            <td>
              <p v-if="item.ccOnDate == 2">{{ item.ccDateOfDay + "天" }}</p>
              <p v-else>
                {{ item.ccSdt.split(" ")[0] + " 啟用" }}<br />{{
                  item.ccEdt.split(" ")[0] + " 到期"
                }}
              </p>
            </td>
            <td>
              <p v-if="item.ccLimit == -1">無限制</p>
              <p v-else>{{ item.ccLimit }}</p>
            </td>
            <td>
              <p v-if="item.ccType">啟用中</p>
              <p v-else>未啟用</p>
            </td>
            <td>
              <p v-if="item.ccDiscountType == 1">
                優惠 {{ item.ccDiscount }} 折
              </p>
              <p v-if="item.ccDiscountType == 2">
                優惠 {{ item.ccDiscount }} 元
              </p>
              <p v-if="item.ccDiscountType == 3">免費使用</p>
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
  </div>
  <CouponInfoUI
    v-if="showInfoUI"
    :showInfoUIHdr="showInfoUIFn"
    :selItemData="selData"
  />
  <AddCouponUI v-if="showAddUI" :showUIFn="showAddUIFn"></AddCouponUI>
</template>
<script setup lang="ts">
import search_ico from "@/assets/images/icon_search.png";
import Icon_edit from "@/assets/images/icon_edit.png";
import Icon_delete from "@/assets/images/icon_delete.png";
import { usePriceStore } from "@/stores/priceStore";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
let store = usePriceStore();
let { couponListRef } = storeToRefs(store);
let { getCouponApi, delCouponApi } = store;
let couponStateValue = ref(-1);
let couponTypeValue = ref(-1);
let couponStateTabs: any = [
  { label: "所有狀態", value: -1 },
  { label: "啟用中", value: 1 },
  { label: "已失效", value: 0 },
];
let couponTypeTabs: any = [
  { label: "所有優惠方式", value: -1 },
  { label: "折扣佔比(%)", value: 0 },
  { label: "折讓現金($)", value: 1 },
  { label: "免費", value: 2 },
];
let showAddUI = ref(false);
let showEditUI = ref(false);
let showInfoUI = ref(false);
let search = ref("");
let filterCouponDataCpt: any = computed(() =>
  couponListRef.value.filter(getFilterCouponFn)
);
function getFilterCouponFn(data: any) {
  return (
    (!search.value ||
      data.ccTitle.toLowerCase().includes(search.value.toLowerCase())) &&
    (couponStateValue.value == -1 || data.ccType == couponStateValue.value) &&
    (couponTypeValue.value == -1 ||
      data.ccDiscountType == couponTypeValue.value)
  );
}
getCouponFn();

const showAddUIFn = (state: boolean) => {
  showAddUI.value = state;
  getCouponFn();
};
const showInfoUIFn = (state: boolean, item: any) => {
  showInfoUI.value = state;
  selData.value = item;
  // getAllDiscountFn();
};

const showEditUIFn = (state: boolean) => {
  showEditUI.value = state;
  getCouponFn();
};

function getCouponFn() {
  getCouponApi();
}
let selData: any = [];
const onDeleteAlertBtn = (data: any) => {
  if (data) {
    console.log("確認刪除");
    delCouponApi(selData.ccId);
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
let sortState: boolean = false;
//排序明細
function sortDataListFn(name: number) {
  let nameGroup = ["ccTitle", "ccOnDate", "ccLimit", "ccType", "ccDiscount"];
  let sortName = nameGroup[name];
  if (sortName)
    if (sortState) {
      couponListRef.value.sort(function (a: any, b: any) {
        return a[sortName] > b[sortName] ? 1 : -1;
      });
      sortState = !sortState;
    } else {
      couponListRef.value.sort(function (a: any, b: any) {
        return a[sortName] > b[sortName] ? -1 : 1;
      });
      sortState = !sortState;
    }
  console.log(couponListRef.value);
}
</script>

<style lang="scss" scoped>
.coupon_div {
  position: absolute;
  top: 0px;
  bottom: 10px;
  left: 0px;
  right: 0px;
  width: 100%;
  .top-content {
    .news-filter {
      .el-select {
        width: 150px;
        margin-right: 10px;
        :deep(.el-input__wrapper) {
          height: 35px;
        }
      }
    }
  }

  .main-content {
    width: 100%;
    height: 95%;
    margin-top: 5px;
    background-color: #faf9f8;
    border: solid 0.5px #ddd;
    box-sizing: border-box;
    font-family: STXihei;
    color: #717171;

    .table-topBar {
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
}
</style>

.popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 3;
    background: rgba(5, 5, 5, 0.5);

    display: flex;
    align-items: center;
    justify-content: space-around;

    .popup-content {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        width: 40%;
        background-color: #ffffff;
        border-radius: 10px 0 0;

        .top-content {
            height: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;

            >.closeX {
                position: absolute;
                left: 20px;
            }
        }

        .style-card {
            border-radius: 10px;
            border: solid 1px #707070;
            height: 20%;
            margin: 0 25px;
            padding: 0px 15px;

            >.info-card {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }

        >.content {
            position: absolute;
            top: 236px;
            bottom: 66px;
            left: 0px;
            right: 0px;
            // background: #faf9f8;

            padding: 10px 30px;

            >.item-tab {
                display: flex;
                justify-content: center;
                border-bottom: solid 0.5px #a19f9f;
                color: #c4c4c4;


                >button {
                    height: 45px;
                    background-color: transparent;
                    border: transparent;
                }

                >button.active {
                    color: #707070;
                    border-bottom: solid 0.5px #707070;
                }
            }

            >.item-content {
                position: absolute;
                top: 56px;
                bottom: 0px;
                left: 0px;
                right: 0px;
                overflow: auto;
                margin: 0 0 10px 0;

                >.card-content {
                    // width: 100%;
                    height: 100%;
                    padding: 0px 40px 0px 40px;

                    >.attention-content {
                        word-wrap: break-word;
                    }

                }

                >.record-content {
                    // width: 100%;
                    height: 100%;
                    margin: 10px 25px;

                    >.sale-block {
                        border-radius: 10px;
                        background-color: #faf9f8;
                        height: 30%;
                        // margin: 10px 25px;
                        padding: 0px 15px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;


                    }

                    >.sale-record {
                        border-bottom: solid 0.5px #faf9f8;

                        >.sale-record-title {
                            display: flex;
                            justify-content: space-between;
                            border-radius: 10px 10px 0 0;
                            background-color: #faf9f8;
                            padding: 15px 15px;
                        }
                    }
                }
            }
        }



        >.sub-btn {
            position: absolute;
            // width: 98%;
            height: 66px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            display: flex;
            justify-content: space-around;
            border-top: solid 0.5px #707070;

            >.cancelBtn {
                padding: 10px 10px;
                margin: 10px 10px;
                font-size: 18px;
                color: #e70909;
                border-radius: 10px;
                background-color: #faf9f8;
                border: solid 1px #707070;
            }

            >.submitBtn {
                padding: 10px 10px;
                margin: 10px 10px;
                font-size: 18px;
                color: #717171;
                border-radius: 10px;
                background-color: #faf9f8;
                border: solid 1px #707070;
            }
        }

    }
}
</style>