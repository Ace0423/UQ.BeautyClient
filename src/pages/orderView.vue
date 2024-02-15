<template>
  <div class="container">
    <div class="goods-div">
      <Header
        :Icon="Icon"
        :moduleType="'訂單紀錄'"
        :memuState="props.memuState"
        :handmemuStateBtn="props.handmemuStateBtn"
      ></Header>
      <div class="header">
        <div class="top_menu">
          <img :src="icon_msg" />
          <img :src="icon_export" />
        </div>
      </div>
      <div class="content">
        <div class="content-tab">
          <button
            :class="tableTabsValueRef == index ? 'active' : ''"
            v-for="(item, index) in tableTabs"
            :key="item.id"
            v-on:click="changeTab(index, item)"
          >
            {{ item.title }}
          </button>
        </div>
        <div class="content-main">
          <div class="search-bar">
            <p>課程(全部{{ filterOrderData.length }}個)</p>
            <div>
              <div class="sel_date">
                <input type="date" v-model="selDateRef.startDate" />
                <span>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</span>
                <input type="date" v-model="selDateRef.endDate" />
                <span>&nbsp;&nbsp;&nbsp;</span>
              </div>
              <input v-model="search" class="search-control" placeholder="" />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <td v-for="(item, value) in orderTableThead" :key="item">
                  <p @click="sorttheadHdr(value)">{{ item }}</p>
                </td>
              </tr>
            </thead>
            <tbody>
              <template
                v-for="(item, index) in filterOrderData"
                :key="item.lessonId"
              >
                <tr v-if="item.state == showStateRef">
                  <td>
                    <p>{{ item.nameTw }}</p>
                  </td>
                  <td>
                    <p>{{ item.lessonId }}</p>
                  </td>
                  <td>
                    <p>{{ item.price }}</p>
                  </td>
                  <td>
                    <p>{{ item.state }}</p>
                  </td>
                  <td>
                    <p>{{ item.display }}</p>
                  </td>
                  <td class="checkbox_state">
                    <input
                      type="checkbox"
                      :checked="item.state == selStateRef"
                      v-on:click="updateStutusFn(index, item)"
                    />
                  </td>
                  <td>
                    <!-- <button v-on:click="showEditFormFn(index, item)">
                    <img class="edit_img" :src="icon_edit" />
                  </button> -->
                    <button @click="deleteHdr(item, index)">
                      <img class="delete_img" :src="icon_delete" />
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="content-foot">
          <button class="submit-btn" v-on:click="submitStateFn()">確認</button>
        </div>
      </div>
      <div class="foot"></div>
    </div>
  </div>
  <!-- <AddGoodsDetailUI v-if="showAddUIRef" :showAddUIFn="showAddDetailFormHdr" />
  <EditGoodsDetailUI
    v-if="showEditUIRef"
    :showUIFn="showEditDetailUIHdr"
    :formInfo="selItem"
  />
  <AddGoodsGroupUI v-if="showAddTypeRef" :showAddUIFn="showAddTypeFormHdr" /> -->
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import Icon from "@/assets/images/ico_order.png";
import icon_add from "@/assets/images/icon_add.png";
import icon_export from "@/assets/images/icon_export.png";
import icon_date from "@/assets/images/icon_date.png";
import icon_msg from "@/assets/images/icon_msg.png";
import { useApptStore } from "@/stores/apptStore";
import icon_delete from "@/assets/images/icon_delete.png";

let store = useApptStore();
let { orderDetailListRef } = storeToRefs(store);
let { getOrderApptDetailApi } = store;
const props = defineProps<{
  memuState: any;
  handmemuStateBtn: Function;
}>();
let selDateRef = ref({
  startDate: "",
  endDate: "",
});
let showStateRef = ref(0);
let selStateRef = ref(1);
let orderTableThead = [
  "訂單資訊",
  "顧客",
  "價格",
  "訂單狀態",
  "付款方式",
  "可出貨",
  "操作",
];
let search = ref("");
let tableTabsValueRef = ref(0);
let tableTabs = [
  {
    id: 0,
    title: "交易紀錄",
  },
  {
    id: 1,
    title: "待付款",
  },
  {
    id: 2,
    title: "待出貨",
  },
  {
    id: 3,
    title: "已完成",
  },
];

let changeTab = (index: number, item: any) => {
  curChangeState = [];
  showStateRef = item.id;
  selStateRef.value = item.id + 1;
  tableTabsValueRef.value = index;
  switch (item.id) {
    case 0:
      // checkStateRef.value = 0;

      break;

    default:
      // checkStateRef.value = 1;

      break;
  }
  // getOrderApptDetailApi(item.id, 0);
};
let filterOrderData: any = computed(() =>
  orderDetailListRef.value.filter(getCourseFn)
);
function getCourseFn(data: any) {
  return (
    !search.value ||
    data.nameTw.toLowerCase().includes(search.value.toLowerCase())
  );
}

setTableFn();
function setTableFn() {
  // changeTab(0, { id: 0 });
  getOrderApptDetailApi(0, 0);
}
//排序明細
let sortUpDown: string = "";
function sorttheadHdr(name: number) {
  // let nameGroup = ["nameTw", "servicesTime", "price", "display"];
  // let sortName = nameGroup[name];
  // if (sortName)
  //   if (sortUpDown == sortName) {
  //     goodsDetailListRef.value.sort(function (a: any, b: any) {
  //       return a[sortName] > b[sortName] ? -1 : 1;
  //     });
  //     sortUpDown = "";
  //   } else {
  //     goodsDetailListRef.value.sort(function (a: any, b: any) {
  //       return a[sortName] > b[sortName] ? 1 : -1;
  //     });
  //     sortUpDown = sortName;
  //   }
}
let curChangeState: any = [];
//改變狀態
let updateStutusFn = (index: number, item: any) => {
  // item.state = selStateRef;
  item.changeState = selStateRef;
  curChangeState.push(item);

  // let curdata: any = {
  //   pId: item.pId,
  //   pCode: item.pCode,
  //   pName: item.pName,
  //   memo: item.memo,
  //   price: item.price,
  //   imageBig: item.imageBig,
  //   imageSmall: item.imageSmall,
  //   unit: item.unit,
  //   amount: item.amount,
  //   brand: item.brand,
  //   stock: item.stock,
  //   stockTrace: item.stockTrace,
  //   bonusOpen: item.amount,
  //   updateOpen: item.updateOpen,
  //   display: !item.display,
  //   stockOpen: item.stockOpen,
  //   productGroup: item.groupList,
  //   productProvider: item.providerList,
  //   productDiscount: item.discountList,
  // };
  // updateGoodsDetailApi(curdata).then((res: any) => {
  //   if (res.state == 1) {
  //     Alert.sussess("成功", 1000);
  //   } else {
  //     Alert.warning(showErrorMsg(res.msg), 1000);
  //   }
  // });
  // getGoodsDetailApi(
  //   goodsGroupsListRef.value[goodsGroupsListValueRef.value].pgId,
  //   0
  // );
};
function submitStateFn() {
  for (let i = 0; i < curChangeState.length; i++) {
    const element = curChangeState[i];
    element.state = element.changeState;
  }
  curChangeState = [];
}
//刪除
let deleteHdr = (item: any, index: number) => {
  // selItem = item;
  // Alert.check("是否刪除", 1000, onDeleteAlertBtn);
};
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  position: relative;
  //   pointer-events: none;
  .goods-div {
    width: 100%;
    height: 100%;
    // pointer-events: none;
    .header {
      display: flex;
      width: 100%;
      height: 80px;
      justify-content: end;
      //   pointer-events: none;
      .top_menu {
        display: flex;
        width: 20%; // calc(100% - 300px);;
        justify-content: right;
        height: 29px;
        position: relative;
        right: 15px;
        top: 15px;
        > img {
          margin-right: 10px;
          height: 29px;
          width: 29px;
        }
      }
    }
    .content {
      margin: 0px 40px;
      width: calc(100% - 80px);
      height: calc(100% - 80px);
      .content-tab {
        display: flex;
        overflow-x: scroll;
        height: 45px;
        display: -webkit-box;
        > button {
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          min-width: 100px;
          height: 45px;
          border-radius: 10px 10px 0 0;
          background-color: #faf9f8;
          font-size: 20px;
          font-weight: bold;
          font-family: HeitiTC;
          color: #717171;
          white-space: nowrap;
        }

        > button.active {
          background-color: #e6e2de;
        }
      }
      .content-main {
        // margin: 0px 40px;
        // width: calc(100% - 80px);
        height: calc(90% - 45px);
        .search-bar {
          height: 47px;
          width: calc(100% - 2px);
          font-weight: bold;
          display: flex;
          align-items: center;
          color: #717171;
          border: solid 1px #707070;
          background-color: #e6e2de;
          > div {
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: right;
            width: 88%;
            .search-control {
              width: auto;
              height: 60%;
              border-radius: 6px;
              border: solid 1px #707070;
              background-color: #fff;
              margin-right: 10px;

              background: url("@/assets/images/icon_search.png") no-repeat;
              background-color: #fff;
              background-position: 97%;
              background-origin: content-box;
              text-indent: 5px;
            }
          }

          .sel_date {
            height: 100%;
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: right;
            > input[type="date"] {
              width: 110px;
              height: 60%;
              border-radius: 6px;
              border: solid 1px #707070;
            }
            > input[type="date"]::-webkit-calendar-picker-indicator {
              background: url("@/assets/images/icon_date.png") no-repeat center;
              background-size: 19px 22px;
              // background-position: 70%;
            }
          }
        }

        > table {
          // display: inline-block;
          padding: 10px 25px;
          width: 100%;
          font-family: STXihei;
          background-color: #faf9f8;
          border: solid 0.5px #ddd;
          color: #717171;
          height: calc(100% - 49px);
          overflow-y: scroll;
          // display: inline-table;
          > thead {
            display: inline-table;
            width: 100%;
            > tr > td:nth-child(1) {
              width: 20%;
            }
            > tr > td:nth-child(2) {
              width: 15%;
            }
            > tr > td:nth-child(3) {
              width: 15%;
            }
            > tr > td:nth-child(4) {
              width: 15%;
            }
            > tr > td:nth-child(5) {
              width: 15%;
            }
            > tr > td:nth-child(6) {
              width: 10%;
            }
            > tr > td:nth-child(7) {
              width: 10%;
            }
          }
          > tbody {
            overflow-y: scroll;
            display: block;
            width: 100%;
            height: 90%;

            > tr {
              display: flex;
              width: 100%;
              border-bottom: 2px solid rgba(112, 112, 112, 0.5);

              > td {
                align-items: center;
                display: flex;
                height: 47px;
                padding: 2px;

                > img {
                  width: 40px;
                  height: 40px;
                  padding: 0 10px;
                  border-radius: 45px;
                }

                > p {
                  margin: 3px 5px;
                }

                > button {
                  background-color: transparent;
                  border: none;
                  .edit_img {
                    height: 27px;
                    height: 27px;
                  }
                  .delete_img {
                    width: 21px;
                    height: 27px;
                  }
                }

                > input {
                }

                .checked_status {
                  width: 27px;
                  height: 27px;
                  display: flex;
                  justify-content: center;
                  object-fit: contain;
                }

                .checked_status:checked::after {
                  content: "✓";
                  color: #fff;
                  font-size: 36px;
                  line-height: 27px;
                  font-weight: bold;
                  background-color: #84715c;
                }
              }

              .checkbox_state {
                [type="checkbox"] {
                  width: 2rem;
                  height: 2rem;
                  color: #84715c;
                  vertical-align: middle;
                  -webkit-appearance: none;
                  background: none;
                  border: 0;
                  outline: 0;
                  flex-grow: 0;
                  border-radius: 20%;
                  background-color: #ffffff;
                  transition: background 300ms;
                  cursor: pointer;
                }

                /* Pseudo element for check styling */

                [type="checkbox"]::before {
                  content: "";
                  color: transparent;
                  display: block;
                  width: inherit;
                  height: inherit;
                  border-radius: inherit;
                  border: 0;
                  background-color: transparent;
                  background-size: contain;
                  box-shadow: inset 0 0 0 1px #ccd3d8;
                }

                /* Checked */

                [type="checkbox"]:checked {
                  background-color: currentcolor;
                }

                [type="checkbox"]:checked::before {
                  box-shadow: none;
                  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
                }

                /* Disabled */

                [type="checkbox"]:disabled {
                  background-color: #ccd3d8;
                  opacity: 0.84;
                  cursor: not-allowed;
                }

                /* IE */

                [type="checkbox"]::-ms-check {
                  content: "";
                  color: transparent;
                  display: block;
                  width: inherit;
                  height: inherit;
                  border-radius: inherit;
                  border: 0;
                  background-color: transparent;
                  background-size: contain;
                  box-shadow: inset 0 0 0 1px #ccd3d8;
                }

                [type="checkbox"]:checked::-ms-check {
                  box-shadow: none;
                  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
                }
              }
            }

            > tr > td:nth-child(1) {
              width: 20%;
            }
            > tr > td:nth-child(2) {
              width: 15%;
            }
            > tr > td:nth-child(3) {
              width: 15%;
            }
            > tr > td:nth-child(4) {
              width: 15%;
            }
            > tr > td:nth-child(5) {
              width: 15%;
            }
            > tr > td:nth-child(6) {
              width: 10%;
            }
            > tr > td:nth-child(7) {
              width: 10%;
            }
          }
        }
      }
      .content-foot {
        justify-content: center;
        display: flex;
        align-items: center;
        height: 10%;
        .submit-btn {
          width: 110px;
          height: 40px;
          border-radius: 10px;
          border: solid 1px #707070;
          background-color: #fff;
          font-size: 20px;
          font-weight: bold;
          color: #84715c;
        }
      }
    }
  }
}
</style>
