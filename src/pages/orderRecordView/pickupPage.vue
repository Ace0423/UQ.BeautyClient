<template>
  <div class="container">
    <div class="header">
      <div class="demo-date-picker">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker v-model="formInputRef.datePicker" type="daterange" range-separator="一" start-placeholder="開始日期"
            end-placeholder="結束日期" :size="datePickerSize" @change="dateChange" />
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-topBar">
        <p>訂單(全部{{ filterOrderData.length }}個)</p>
        <div>
          <input v-model="search" class="search-control" placeholder="搜尋編號、顧客" />
        </div>
      </div>
      <div class="content-main">
        <el-table :data="filterOrderData" id="dragTable" style="width: 100%; height: 100%; " :cell-style="rowStyle"
          :header-cell-style="headerRowStyle">
          <el-table-column prop="coNo" label="訂單" min-width="50%" :sort-by="['name']" sortable>
            <template #default="scope">
              <div class="order-name">
                <!-- <img class="customer-img" :src="icon_customer" /> -->
                <el-icon :size="30">
                  <CreditCard />
                </el-icon>
                <div>
                  <span>{{ scope.row.coNo }}</span>
                  <div>
                    <span>{{ scope.row.coCheckTime.split("T")[0] + " " }}</span>
                    <span>{{ scope.row.coCheckTime.split("T")[1].split(":")[0] + ":" }}</span>
                    <span>{{ scope.row.coCheckTime.split("T")[1].split(":")[1] }}</span>
                  </div>

                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="memberInfo.name" label="顧客" min-width="30%" sortable />
          <el-table-column prop="coAmount" label="狀態" min-width="10%" sortable>
            <template #default="scope">
              <div class="handle-price">
                <span>{{ scope.row.coAmount }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="coAmount" label="金額" min-width="10%" sortable>
            <template #default="scope">
              <div class="handle-price">
                <span>{{ scope.row.coAmount }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="" min-width="10%">
            <template #default="scope">
              <div class="handle-drag" @click="selectDataFn(scope.row)">
                <img class="edit_img" :src="icon_right_arrow" />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
      </div>
    </div>
    <div class="footer">
    </div>
  </div>
  <InfoOrderDetail v-if="showOrderInfoRef" :showUIHdr="showOrderInfoFn" :selItemData="selItem" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import Alert from "@/components/alertCmpt";
import icon_right_arrow from "@/assets/images/icon_right_arrow.png";
import icon_customer from "@/assets/images/icon_customer.png";
import {
  User, Edit, ShoppingBag, CreditCard
} from '@element-plus/icons-vue';
import { formatZeroDate } from "@/utils/utils";

let store = useApptStore();
let { pickUpList } =
  storeToRefs(store);
let {
  getPickUpListApi,
} = store;

let showOrderInfoRef: any = ref(false);
let editServiceInfo: any = ref([]);
const datePickerSize = ref<'default' | 'large' | 'small'>('large')

let formInputRef: any = ref({
  datePicker: ["2024-01-17", "2024-01-17"],
});

let search = ref("");
let filterOrderData: any = computed(() =>
  pickUpList.value.filter(getOrderFn)
);
function getOrderFn(data: any) {
  return (
    !search.value ||
    data.coNo.toLowerCase().includes(search.value.toLowerCase()) ||
    data.memberInfo.name.toLowerCase().includes(search.value.toLowerCase())
  );
}

var nowDate = new Date();
// var addDate = new Date(nowDate.getTime() - 14*24*60*60*1000);
var startDate = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate();
var endDate = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate();
formInputRef.value.datePicker[0] = startDate
formInputRef.value.datePicker[1] = endDate

onBefore();
function onBefore() {
  getPickUpListApi(0, formInputRef.value.datePicker[0], formInputRef.value.datePicker[1]);
}
onMounted(() => { });

watchEffect(() => {

});


function selectDataFn(params: any) {
  selItem = params;
  showOrderInfoFn(true);
}
let selItem: any = [];
//刪除課程
let deleteHdr = (index: number, item: any) => {
  Alert.check("是否刪除", 1000, (data: any) => {
    onDeleteAlertBtn(data, item.sId)
  });
};
const onDeleteAlertBtn = (state: any, id: number) => {
  if (state) {
    // delServiceDetailApi(id).then((res: any) => {
    //   getServiceDetailApi(0);
    // });
  } else {
  }
  selItem.value = [];
};


function dateChange() {
  let start: Date = formInputRef.value.datePicker[0]
  let end: Date = formInputRef.value.datePicker[1]
  let startDate: string = start.getFullYear() + "-" + (start.getMonth() + 1) + "-" + formatZeroDate(start.getDate());
  let endDate: string = end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + formatZeroDate(end.getDate());
  getPickUpListApi(0, startDate, endDate);
}

function showEditUIFn(index: number, item: any) {
  editServiceInfo.value = item;
  showOrderInfoFn(true);
}
function showOrderInfoFn(state: boolean) {
  showOrderInfoRef.value = state;
  // getOrderListApi(0);
}

//改變課程狀態
let changeStutusHdr = (index: number, item: any) => {
  let curdata: any = {
    sId: item.sId,
    display: !item.display,
    color: item.color,
    isBonusOpen: item.isBonusOpen,
    isEditAccounting: item.isEditAccounting,
    memo: item.memo,
    nickName: item.nickName,
    sgIdList: item.sgIdList,
    subType: item.subType,
    name: item.name,
    servicesTime: item.servicesTime,
    price: item.price,
    subList: item.subList,
  };
  // updateServiceDetailApi(curdata).then((res: any) => {
  //   getOrderListApi(0);
  // });
}
//-------------------------------------------------------------------------表格css
//內容css
const rowStyle = ({ row, column, rowIndex, columnIndex }: any) => {
  return {
    backgroundColor: '#fff',
    color: '#717171',
    fontSize: "16px",
    fontWeight: "bold",
    margin: "3px 5px",
    fontFamily: " STXihei",
    borderBottom: "2px solid rgba(112, 112, 112, 0.5)"
  }
}
//標頭css
const headerRowStyle = ({ row, column, rowIndex, columnIndex }: any) => {
  return {
    height: "50px",
    backgroundColor: '#fff',
    fontSize: "20px",
    borderBottom: "0px solid rgba(112, 112, 112, 0.5)"
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  top: 45px;
  bottom: 10px;
  left: 20px;
  right: 20px;
  // width: calc(100% - 40px);

  .header {
    position: absolute;
    height: 45px;
    top: -45px;
    right: 0px;
    // border: none;
    // background-color: transparent;
    // display: flex;
    // justify-content: end;
    // align-items: center;
    // width: auto;
  }

  .content {
    position: absolute;
    top: 0px;
    bottom: 45px;

    width: 100%;
    display: block;
    // height: calc(100% - 50px);
    border: solid 0.5px #ddd;
    color: #717171;
    background-color: #faf9f8;
    font-family: STXihei;

    >.nav {
      display: flex;
      // pointer-events: none;

      >a {
        border: none;
        width: 120px;
        height: 45px;
        border-radius: 10px 10px 0 0;
        background-color: #faf9f8;
        font-size: 20px;
        font-weight: bold;
        font-family: HeitiTC;
        color: #717171;
        display: flex;
        justify-content: center;
        align-items: center;

        a:link {
          color: #717171;
        }

        a:visited {
          color: #717171;
        }

        a:hover {
          color: #717171;
        }

        >.router-link-exact-active {
          background-color: #e6e2de;
        }
      }

      >.router-link-exact-active {
        background-color: #e6e2de;
      }
    }

    .content-topBar {
      height: 50px;
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
          width: 200px;
          height: 60%;
          border-radius: 6px;
          border: solid 1px #707070;
          box-sizing: border-box;
          background-color: #fff;
          margin-right: 10px;

          background: url("@/assets/images/icon_search.png") no-repeat;
          background-color: #fff;
          background-position: 99%;
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
      // display: block;
      // height: calc(100% - 50px);
      height: 100%;

      .el-table {
        .checked_state {
          input {
            display: none;
          }

          label {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 5px;
            border: 1px solid #8b6f6d;
            box-sizing: border-box;
            position: relative;
            cursor: pointer;
          }

          label::before {
            display: inline-block;
            content: " ";
            width: 12px;
            border: 2px solid #fff;
            box-sizing: border-box;
            height: 4px;
            border-top: none;
            border-right: none;
            transform: rotate(-45deg);
            top: 5px;
            left: 3px;
            position: absolute;
            opacity: 0;
          }

          input:checked+label {
            background: #8b6f6d;
          }

          input:checked+label::before {
            opacity: 1;
            transform: all 0.5s;
          }
        }

        .order-name {
          display: flex;
          align-items: center;

          >img {
            width: 35px;
            height: 40px;
          }

          >div {
            display: grid;
            padding-left: 10px;

            >span {
              color: #000000;
              font-size: 20px;
            }

            >div {
              >span {
                color: rgb(113, 113, 113);

                font-size: 18px;
              }
            }
          }
        }

        .handle-drag {
          display: flex;
          justify-content: end;
          align-items: center;
          width: 100%;
          height: 46px;

          .edit_img {
            width: 27px;
            height: 27px;
          }
        }


        .del_img {
          width: 20px;
          height: 27px;
        }



        .handle-price {

          >span {
            width: 100%;
            margin-left: 2px;
          }
        }
      }
    }
  }


}
</style>


<style lang="scss" scoped>
.demo-date-picker {
  display: flex;
  // width: 50%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  // padding: 30px 0;
  text-align: left;
  border-right: solid 1px var(--el-border-color);
  flex: 1;

  :deep(.el-range-input) {
    font-size: 20px;
    // color: rgb(0, 0, 0);
  }
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  // margin-bottom: 20px;
}
</style>