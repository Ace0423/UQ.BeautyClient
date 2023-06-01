<template>
  <div class="container">
    <div class="goods-div">
      <div class="header">
        <div class="top_menu">
          <div @click="showAddDetailFormHdr(true)"><img :src="icon_add" /></div>
        </div>
      </div>
      <div class="content">
        <div class="content-tab">
          <button
            :class="goodsTypesListValueRef == index ? 'active' : ''"
            v-for="(item, index) in goodsTypesListRef"
            :key="item.pgTitle"
            v-on:click="changeTab(index, item)"
          >
            {{ item.pgTitle }}
          </button>
        </div>
        <div class="content-main">
          <div class="search-bar">
            <p>課程(全部{{ filterGoodsData.length }}個)</p>
            <div>
              <input
                v-model="search"
                class="seach-control"
                placeholder="搜尋產品"
              />
              <div class="btn-open" @click="showAddTypeFormHdr(true)">
                {{ $t("typeMgmt") }}
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <td v-for="(item, value) in goodsTableThead" :key="item">
                  <p @click="sorttheadHdr(value)">{{ item }}</p>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in filterGoodsData" :key="item.lessonId">
                <td>
                  <p>{{ item.pCode }}</p>
                </td>
                <td>
                  <p>{{ item.pName }}</p>
                </td>
                <td>
                  <p>{{ item.price }}</p>
                </td>
                <td class="checkbox_state">
                  <input
                    type="checkbox"
                    :checked="item.display == true"
                    v-on:click="updataStutusFn(index, item)"
                  />
                </td>
                <td>
                  <button v-on:click="showEditFormFn(index, item)">
                    <img class="edit_img" :src="icon_edit" />
                  </button>
                  <button @click="deleteHdr(item, index)">
                    <img class="delete_img" :src="icon_delete" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="foot"></div>
    </div>
  </div>
  <AddGoodsDetailUI v-if="showAddUIRef" :showAddUIFn="showAddDetailFormHdr" />
  <AddGoodsTypeUI v-if="showAddTypeRef" :showAddUIFn="showAddTypeFormHdr" />
</template>

<script lang="ts" setup>
import icon_goods from "@/assets/images/icon_goods.png";
import icon_add from "@/assets/images/icon_add.png";
import icon_edit from "@/assets/images/icon_edit.png";
import icon_delete from "@/assets/images/icon_delete.png";
import { useApptStore } from "@/stores/apptStore";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";

let store = useApptStore();
let { goodsTypesListRef, goodsTypesListValueRef, goodsDetailListRef } =
  storeToRefs(store);
let {
  getGoodsTypeApi,
  getGoodsDetailApi,
  updateGoodsDetailApi,
  delGoodsDetailApi,
  getGoodsTypeDataApi,
} = store;
let showAddUIRef = ref(false);
let showEditUIRef = ref(false);
let showAddTypeRef = ref(false);
let goodsTableThead = ["產品編號", "產品名稱", "售價(NT)", "上架", "操作"];

let search = ref("");
let filterGoodsData: any = computed(() =>
  goodsDetailListRef.value.filter(getGoodsFn)
);
function getGoodsFn(data: any) {
  return (
    !search.value ||
    data.pName.toLowerCase().includes(search.value.toLowerCase())
  );
}
setTableFn();
function setTableFn() {
  getGoodsTypeApi().then((res: any) => {
    getGoodsDetailApi(
      goodsTypesListRef.value[goodsTypesListValueRef.value].pgId,
      0
    );
  });
}
//新增-顯示
let showAddDetailFormHdr = (state: boolean) => {
  showAddUIRef.value = state;
};
//新增分類-顯示
let showAddTypeFormHdr = (state: boolean) => {
  showAddTypeRef.value = state;
  getGoodsTypeApi(0);
};
const showEditUIFn = (state: boolean) => {
  console.log(state);

  showEditUIRef.value = state;
  getGoodsDetailApi(0, 0);
};
//刪除
let deleteHdr = (item: any, index: number) => {
  selData = item;
  Alert.check("是否刪除", 1000, onDeleteAlertBtn);
};
const onDeleteAlertBtn = (data: any) => {
  if (data) {
    delGoodsDetailApi(selData.pId,goodsTypesListRef.value[goodsTypesListValueRef.value].pgId);
  } else {
    console.log("取消刪除");
  }
  selData.value = [];
};

//編輯
let selData: any = [];
function showEditFormFn(index: number, item: any) {
  selData.value = item;
  showEditUIFn(true);

  getGoodsDetailApi(0, item.pId).then((res: any) => {
    console.log(res);
    
  });
}

let changeTab = (index: number, item: any) => {
  goodsTypesListValueRef.value = index;

  if (item.pgId == 0) {
    getGoodsDetailApi(item.pgId, 0);
  } else {
    getGoodsTypeDataApi(item.pgId);
  }
};
//排序明細
let sortUpDown: string = "";
function sorttheadHdr(name: number) {
  let nameGroup = ["nameTw", "servicesTime", "price", "display"];
  let sortName = nameGroup[name];
  if (sortName)
    if (sortUpDown == sortName) {
      goodsDetailListRef.value.sort(function (a: any, b: any) {
        return a[sortName] > b[sortName] ? -1 : 1;
      });
      sortUpDown = "";
    } else {
      goodsDetailListRef.value.sort(function (a: any, b: any) {
        return a[sortName] > b[sortName] ? 1 : -1;
      });
      sortUpDown = sortName;
    }
}
//改變狀態
let updataStutusFn = (index: number, item: any) => {
  let curdata: any = {
    amount: item.amount,
    bonusOpen: item.amount,
    brand: item.brand,
    display: !item.display,
    imageBig: item.imageBig,
    imageSmall: item.imageSmall,
    memo: item.memo,
    pCode: item.pCode,
    pId: item.pId,
    pName: item.pName,
    price: item.price,
    stock: item.stock,
    stockOpen: item.stockOpen,
    stockTrace: item.stockTrace,
    unit: item.unit,
    updateOpen: item.updateOpen,
  };
  console.log(curdata, "curdata");
  updateGoodsDetailApi(curdata);
  // getCourseDetailApi(courseTypesTabs.value[courseTypesTabsValue.value].pgId, 0);
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
        }

        > button.active {
          background-color: #e6e2de;
        }
      }
      .content-main {
        // margin: 0px 40px;
        // width: calc(100% - 80px);
        height: calc(100% - 80px);
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
            .seach-control {
              width: auto;
              height: 60%;
              border-radius: 6px;
              border: solid 1px #707070;
              background-color: #fff;
              margin-right: 10px;

              background: url("@/assets/images/icon_seach.png") no-repeat;
              background-color: #fff;
              background-position: 97%;
              background-origin: content-box;
              text-indent: 5px;
            }
            > .btn-open {
              width: 80px;
              height: 20px;
              margin: 0;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              display: flex;
              padding: 7px 11px 6px;
              border-radius: 6px;
              border: solid 1px #707070;
              background-color: #84715c;
              color: #ffffff;
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
          height: 95%;
          overflow-y: scroll;
          // display: inline-table;
          > thead {
            display: inline-table;
            width: 100%;
            > tr > td:nth-child(1) {
              width: 40%;
            }
            > tr > td:nth-child(2) {
              width: 15%;
            }
            > tr > td:nth-child(3) {
              width: 20%;
            }
            > tr > td:nth-child(4) {
              width: 10%;
            }
            > tr > td:nth-child(5) {
              width: 15%;
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
                  border-radius: 50%;
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
              width: 40%;
            }
            > tr > td:nth-child(2) {
              width: 15%;
            }
            > tr > td:nth-child(3) {
              width: 20%;
            }
            > tr > td:nth-child(4) {
              width: 10%;
            }
            > tr > td:nth-child(5) {
              width: 15%;
              min-width: 85px;
            }
          }
        }
      }
    }
  }
}
</style>
