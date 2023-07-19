<template>
  <div class="popup-mask" v-on:click.self="showInfoUIHdr(false)">
    <div>
      <div class="topbar-form">
        <img :src="icon_closeX" v-on:click="showInfoUIHdr(false)" />
        <span>{{ selItemData.value.ffTitle }}</span>
      </div>
      <div class="content-form">
        <div class="ticket-skin">
          <div class="ticket">
            <div class="left-total">
              <span>{{ selItemData.value.ffTitle }}</span>
              <span>共{{ selItemData.value.ffLimit }}次</span>
              <span v-if="selItemData.value.ffDateType == 0">
                {{ "不限期" }}</span
              >
              <span v-else> {{ selItemData.value.ffDateType }}</span>
            </div>
            <div class="line-ticket"></div>
            <div class="right-total">
              <span>{{ selItemData.value.ffUsed }}</span>
              <span>{{ "剩餘數" }}</span>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="tabs-content">
            <button
              :class="infoListRef == 1 ? 'active' : ''"
              v-on:click="changeTabs(1)"
            >
              計次券內容
            </button>
            <button
              :class="infoListRef == 2 ? 'active' : ''"
              v-on:click="changeTabs(2)"
            >
              銷售紀錄
            </button>
          </div>
          <div class="main-content" v-if="infoListRef == 1">
            <p>建立時間</p>
            <!-- <span>{{ selItemData.value.dateCreate.replace("T", " , ") }}</span> -->
            <span v-if="addTime">{{ addTime[0]+":"+addTime[1] }}</span>

            <p>使用期限</p>
            <!-- <span>{{ selItemData.value.ffDateOfUsedDay }}</span> -->
            <span v-if="selItemData.value.ffDateType == 0">{{
              " 不限期"
            }}</span>
            <span v-if="selItemData.value.ffDateType == 2">
              {{ selItemData.value.ffDateOfUsedDay + "天" }}
            </span>
            <span v-if="selItemData.value.ffDateType == 1">
              {{ selItemData.value.ffSdt.split(" ")[0] + " 啟用" }}<br />{{
                selItemData.value.ffEdt.split(" ")[0] + " 到期"
              }}
            </span>

            <p>適用項目</p>
            <!-- <span>{{ selItemData.value.ffServiceId }}</span> -->
            <span>{{ serviceItem.nameTw }}</span>

            <p>贈送項目</p>
            <span>{{ filteItemData }}</span>

            <p>說明</p>
            <span>{{ selItemData.value.ffContext }}</span>
          </div>
          <div class="main-content" v-else>
            <div>
              <div>
                <span class="amount-content">{{ 0 }}</span>
                <span>銷售數量</span>
              </div>
              <div>
                <span class="amount-content">{{
                  selItemData.value.ffUsed + "/" + selItemData.value.ffLimit
                }}</span>
                <span>已兌換/總量</span>
              </div>
              <div>
                <span class="amount-content">{{
                  (selItemData.value.ffUsed / selItemData.value.ffLimit) * 100 +
                  "%"
                }}</span>
                <span>兌換率</span>
              </div>
            </div>
            <div class="uselist-content">
              <span>銷售紀錄</span>
              <table>
                <thead class="table-thead">
                  <tr>
                    <th>
                      <p class="nameview">顧客</p>
                    </th>
                    <th>
                      <p class="nameview">購買時間</p>
                    </th>
                  </tr>
                </thead>
                <tbody class="table-tbody">
                  <tr>
                    <td>
                      <p class="nameview">{{ "名字" }}</p>
                    </td>
                    <td>
                      <p class="nameview">{{ "xxxx-xx-xx" }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-form">
        <button
          v-if="selItemData.value.ffType == 0"
          class="otherpay-btn"
          v-on:click="updateCoupon()"
        >
          啟用此券
        </button>
        <button v-else class="otherpay-btn" v-on:click="updateCoupon()">
          停用此券
        </button>
        <button v-on:click="showEditUIFn(true)" class="cash-btn">編輯</button>
      </div>
    </div>
  </div>
  <EditCountTicket
    v-if="showEditUI"
    :selItemData="selItemData"
    :showUIFn="showEditUIFn"
  ></EditCountTicket>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePriceStore } from "@/stores/priceStore";
import icon_closeX from "@/assets/images/icon_closeX.png";
import icon_ticket from "@/assets/images/icon_cancle.png";
import Alert from "../alertCmpt";
import { showErrorMsg } from "@/types/IMessage";
import { useApptStore } from "@/stores/apptStore";

let store = usePriceStore();
let { selectCountTicketRef } = storeToRefs(store);
let { updateCountTicketApi, getCountTicketApi } = store;

let storeAppt = useApptStore();
let { courseDataList, goodsDetailListRef } = storeToRefs(storeAppt);
let { getCourseDetailApi, getGoodsDetailApi } = storeAppt;

const simpleView = ref(true);
let showEditUI = ref(false);
const currentIndex = ref(2);
const infoListRef = ref(1);
const memberDetailData: any = reactive({
  accountBalance: 0,
  recentConsumption: { amount: "-", date: "-" },
  recentDeposit: { amount: "-", date: "-" },
});
const props = defineProps<{
  selItemData: any;
  showInfoUIHdr: Function;
}>();
let addTime = ref("");
props.selItemData.value.dateCreate = "";
getCountTicketApi(props.selItemData.value.ffId, 0).then((res: any) => {
  props.selItemData.value.dateCreate = selectCountTicketRef.value[0].dateCreate;
  addTime.value = selectCountTicketRef.value[0].dateCreate
    .replace("T", ",  ")
    .split(":");
});
onMounted(() => {
  // getmemberInfoApi();
});

let filteItemData: any = computed(() => {
  let curData: any = "";
  let curGiftServices = props.selItemData.value.forFreeCardMapServices;
  for (let i = 0; i < curGiftServices.length; i++) {
    const element = curGiftServices[i];
    curData = curData + element.lTitle + "x" + element.lCount + "、";
  }
  let curGiftGoods = props.selItemData.value.forFreeCardMapProducts;
  for (let i = 0; i < curGiftGoods.length; i++) {
    const element = curGiftGoods[i];
    curData = curData + element.pTitle + "x" + element.pCount + "、";
  }

  return curData.substring(0, curData.length - 1);
});

//取服務資料
let serviceItem: any = ref({});
getCourseDetailApi().then((res: any) => {
  //計次項目
  for (let i = 0; i < courseDataList.value.length; i++) {
    const element = courseDataList.value[i];
    if (element.lessonId == props.selItemData.value.ffServiceId) {
      serviceItem.value = element;
    }
  }
});

const changeTabs = (index: number) => {
  infoListRef.value = index;
};
const showEditUIFn = (state: boolean) => {
  showEditUI.value = state;
  getCountTicketApi();
  if (!state) props.showInfoUIHdr(false);
};
function updateCoupon() {
  let apiData = props.selItemData.value;
  apiData.ffType = apiData.ffType == 0 ? 1 : 0;
  apiData.serviceMaps = apiData.forFreeCardMapServices;
  apiData.productMaps = apiData.forFreeCardMapProducts;
  // for (let i = 0; i < apiData.forFreeCardMapServices.length; i++) {
  //   const element = apiData.forFreeCardMapServices[i];
  //   apiData.serviceMaps.push({ lid: element.lid, lCount: element.lCount });
  // }
  // for (let i = 0; i < apiData.forFreeCardMapProducts.length; i++) {
  //   const element = apiData.forFreeCardMapProducts[i];
  //   apiData.productMaps.push({ pid: element.pid, pCount: element.pCount });
  // }
  // delete apiData.forFreeCardMapServices;
  // delete apiData.forFreeCardMapProducts;

  /**更新 */
  updateCountTicketApi(apiData).then((res: any) => {
    if (res.state == 1) {
      Alert.sussess("成功", 1000);
      setTimeout(() => {
        props.showInfoUIHdr(false);
      }, 1000);
    } else {
      Alert.warning(showErrorMsg(res.msg), 1000);
    }
  });
}
</script>

<style scoped lang="scss">
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1002;
  background: rgba(137, 137, 137, 0.5);

  display: flex;
  align-items: center;
  justify-content: end;

  > div {
    height: 100%;
    width: 40%;
    border-radius: 10px 0 0 10px;
    border: solid 1px #707070;
    background-color: #ffffff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .topbar-form {
      display: flex;
      height: 70px;
      border-bottom: solid 1px #ddd;
      box-sizing: border-box;
      width: calc(100%);
      > img {
        position: relative;
        width: 41px;
        height: 38px;
        top: 15px;
        left: 15px;
      }
      > span {
        display: flex;
        width: calc(100%);
        margin-right: 41px;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        height: 70px;
        justify-content: center;
        font-size: 28px;
        font-family: HeitiTC;
        color: #84715c;
        font-weight: bold;
      }
    }

    .content-form {
      display: block;
      width: 100%;
      justify-content: center;
      height: calc(100% - 70px - 70px);
      .ticket-skin {
        margin: 15px;
        height: 120px;
        .ticket {
          display: flex;
          width: 300px;
          height: 120px;
          position: relative;
          background: rgb(0, 180, 81);
          margin: 0 auto;
          justify-content: center;
          align-items: center;
          .left-total {
            display: grid;
            width: 30%;
            align-items: center;
          }
          .right-total {
            display: grid;
            width: 30%;
            height: 50%;
            justify-content: center;
            align-items: center;
            text-align: end;
            border-left: dashed 3px #ffffff;
            box-sizing: border-box;
          }
          .line-ticket {
            display: grid;
            width: 30%;
          }
          span {
            color: #ffffff;
          }
        }
        .ticket:before,
        .ticket:after {
          content: "";
          display: block;
          width: 24px;
          height: 100%;
          background-size: 24px 24px; /* 一个repeat的大小 */
          background-repeat: repeat-y;
          background-image: radial-gradient(#fff 7px, transparent 8px);
          position: absolute;
          top: 0;
        }
        .ticket:before {
          left: -12px; /* 半圆，只显示一个repeat的一半 */
        }
        .ticket:after {
          right: -12px;
        }
      }
      .content {
        height: calc(100% - 120px - 15px - 15px);
        .tabs-content {
          display: flex;
          justify-content: center;
          height: 45px;
          border-bottom: solid 0.5px #ddd;
          //   box-sizing: border-box;
          > button {
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            width: 120px;
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
        .main-content {
          height: calc(100% - 45px);
          width: 90%;
          margin-left: 5%;
          overflow-y: auto;
          > button {
            width: 100%;
            height: 45px;
            background-color: #faf9f8;
            border: none;
            font-size: 16px;
            font-weight: bold;
            font-family: HeitiTC;
            color: #717171;
            margin-top: 5px;
          }
          > p {
            color: #c1bdb8;
            font-weight: bold;
            font-size: 16px;
          }
          > span {
            font-weight: bold;
            font-size: 18px;
          }

          > div {
            background-color: #faf9f8;
            display: flex;
            justify-content: center;
            width: 90%;
            height: 130px;
            margin: 5px 5%;
            > div {
              display: grid;
              justify-content: center;
              width: 30%;
              height: 100%;
              > span {
                display: flex;
                justify-content: left;
                align-items: center;
                font-size: 16px;
                font-family: HeitiTC;
                font-weight: bold;
              }
              .amount-content {
                font-size: 28px;
                // font-weight: bold;
                font-family: sans-serif;
              }
            }
          }
          .uselist-content {
            background-color: #ffffff;
            justify-content: left;
            display: block;
            > span {
              font-weight: bold;
            }
            > table {
              width: 100%;
              .table-thead {
                display: block;
                height: 50px;
                width: 100%;
                background-color: #faf9f8;
                border-radius: 10px 10px 0 0;
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
                  width: 70%;
                }
                > tr > th:nth-child(2) {
                  width: 30%;
                }
              }

              .table-tbody {
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
                  width: 70%;
                }
                > tr > td:nth-child(2) {
                  width: 30%;
                }
              }
            }
          }
        }
      }
    }
    .footer-form {
      display: flex;
      justify-content: center;
      height: 70px;
      bottom: 0px;
      border-top: solid 1px #ddd;
      box-sizing: border-box;
      width: calc(100%);
      > button {
        position: relative;
        width: 150px;
        height: 50px;
        margin: 10px;
        border-radius: 8px;
        font-size: 20px;
        font-weight: bold;
        color: #717171;
        background-color: #fff;
      }
    }
  }
}
</style>
