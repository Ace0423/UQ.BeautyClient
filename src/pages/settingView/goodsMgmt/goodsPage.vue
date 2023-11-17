<template>
  <div class="container">
    <div class="header"></div>
    <div class="content">
      <div class="content-top">
        <p>商品(全部{{ filterGoodsData.length }}個)</p>
        <div>
          <input v-model="search" class="search-control" placeholder="搜尋名稱" />
          <div class="btn-open" @click="showAddDetailFormHdr(true)">
            {{ $t("AddGoods") }}
          </div>
        </div>
      </div>
      <div class="content-main">
        <table>
          <thead>
            <tr>
              <td v-for="(item, value) in goodsTableTitle" :key="item">
                <p @click="sorttheadFn(value)">{{ item }}</p>
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
                <input type="checkbox" :checked="item.display == true" v-on:click="updataStutusBtn(index, item)" />
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

      <div>

      </div>
    </div>
    <div class="footer">

    </div>
  </div>
  <AddGoodsDetailUI v-if="showAddUIRef" :showAddUIFn="showAddDetailFormHdr" />
  <EditGoodsDetailUI v-if="showEditUIRef" :showUIFn="showEditDetailUIHdr" :formInfo="selItem" />
  <AddGoodsTypeUI v-if="showAddTypeRef" :showAddUIFn="showAddTypeFormHdr" />
</template>

<script lang="ts" setup>
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
} = store;


let showAddUIRef = ref(false);
let showEditUIRef = ref(false);
let showAddTypeRef = ref(false);
let goodsTableTitle = ["產品編號", "產品名稱", "售價(NT)", "上架", "操作"];

let selItem: any = [];
let sortUpDown: string = "";

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


onBeforeFn();
function onBeforeFn() {
  goodsDetailListRef.value = []
  getDetailByTypeFn(0, 0);
}

onMounted(() => {
  // console.log('onMounted');
});

//新增-顯示
let showAddDetailFormHdr = (state: boolean) => {
  showAddUIRef.value = state;
  if (!state) {
    getDetailByTypeFn(0, 0);
  }
};
function getDetailByTypeFn(id: any, isList: any) {
  getGoodsTypeApi().then((res: any) => {
    getGoodsDetailApi(
      id,
      isList
    );
  });
}
//新增分類-顯示
let showAddTypeFormHdr = (state: boolean) => {
  showAddTypeRef.value = state;
  getGoodsTypeApi(0);
};
const showEditDetailUIHdr = (state: boolean) => {
  showEditUIRef.value = state;
  getDetailByTypeFn(0, 0);
};
//編輯
function showEditFormFn(index: number, item: any) {
  selItem.value = item;
  showEditDetailUIHdr(true);
}
//改變狀態
function updataStutusBtn(index: number, item: any) {
  let curdata: any = {
    pId: item.pId,
    pCode: item.pCode,
    pName: item.pName,
    memo: item.memo,
    price: item.price,
    imageBig: item.imageBig,
    imageSmall: item.imageSmall,
    unit: item.unit,
    amount: item.amount,
    brand: item.brand,
    stock: item.stock,
    stockTrace: item.stockTrace,
    bonusOpen: item.amount,
    updateOpen: item.updateOpen,
    display: !item.display,
    stockOpen: item.stockOpen,
    productGroup: item.groupList,
    productProvider: item.providerList,
    productDiscount: item.discountList,
  };

  updateGoodsDetailApi(curdata).then((res: any) => {
    if (res.state == 1) {
      getDetailByTypeFn(0, 0);
    }
  });
}
//刪除
let deleteHdr = (item: any, index: number) => {
  selItem = item;
  Alert.check("是否刪除", 1000, (data: any) => {
    onDeleteAlertBtn(data, item)
  });
};

const onDeleteAlertBtn = (state: any, item: any) => {
  if (state) {
    let curPgId = goodsTypesListRef.value[goodsTypesListValueRef.value].pgId;
    delGoodsDetailApi(selItem.pId).then((res: any) => {
      getDetailByTypeFn(0, 0);
    });
  } else {
    console.log("取消刪除");
  }
  selItem.value = [];
};

//排序明細
function sorttheadFn(name: number) {
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
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 45px;
  bottom: 10px;
  width: 100%;

  .header {}

  .content {
    width: 100%;
    height: calc(100%);
    border: solid 0.5px #ddd;

    .content-top {
      height: 47px;
      width: calc(100%);
      font-weight: bold;
      display: flex;
      align-items: center;
      color: #717171;
      border: solid 1px #707070;
      box-sizing: border-box;
      background-color: #e6e2de;

      >div {
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
          box-sizing: border-box;
          background-color: #fff;
          margin-right: 10px;

          background: url("@/assets/images/icon_search.png") no-repeat;
          background-color: #fff;
          background-position: 97%;
          background-origin: content-box;
          text-indent: 5px;
        }

        >.btn-open {
          width: 90px;
          height: 30px;
          margin: 0;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          display: flex;
          // padding: 7px 11px 6px;
          border-radius: 6px;
          border: solid 1px #707070;
          box-sizing: border-box;
          background-color: #84715c;
          color: #ffffff;
        }
      }
    }

    .content-main {
      width: 100%;
      height: calc(100% - 47px);

      >table {
        // display: inline-block;
        padding: 10px 25px;
        width: 100%;
        font-family: STXihei;
        background-color: #faf9f8;
        border: solid 0.5px #ddd;
        box-sizing: border-box;
        color: #717171;
        height: 100%;
        overflow-y: scroll;

        // display: inline-table;
        >thead {
          display: inline-table;
          width: 100%;
          height: 50px;

          >tr>td:nth-child(1) {
            width: 40%;
          }

          >tr>td:nth-child(2) {
            width: 15%;
          }

          >tr>td:nth-child(3) {
            width: 20%;
          }

          >tr>td:nth-child(4) {
            width: 10%;
          }

          >tr>td:nth-child(5) {
            width: 15%;
          }
        }

        >tbody {
          overflow-y: scroll;
          display: block;
          width: 100%;
          height: calc(100% - 50px);

          >tr {
            display: flex;
            width: 100%;
            border-bottom: 2px solid rgba(112, 112, 112, 0.5);

            >td {
              align-items: center;
              display: flex;
              height: 47px;
              padding: 2px;

              >img {
                width: 40px;
                height: 40px;
                padding: 0 10px;
                border-radius: 45px;
              }

              >p {
                margin: 3px 5px;
              }

              >button {
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

              >input {}

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

          >tr>td:nth-child(1) {
            width: 40%;
          }

          >tr>td:nth-child(2) {
            width: 15%;
          }

          >tr>td:nth-child(3) {
            width: 20%;
          }

          >tr>td:nth-child(4) {
            width: 10%;
          }

          >tr>td:nth-child(5) {
            width: 15%;
            min-width: 85px;
          }
        }
      }
    }
  }

  .footer {}
}
</style>
