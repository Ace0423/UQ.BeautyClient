<template>
  <div class="popup-mask" v-on:click.self="showInfoUIHdr(false)">
    <div>
      <div class="topbar-form">
        <img :src="icon_closeX" v-on:click="showInfoUIHdr(false)" />
        <span>優惠券</span>
      </div>
      <div class="content-form">
        <div class="coupon-skin">
          <div class="coupon-icon">
            <img :src="icon_ticket" />
          </div>
          <div class="coupon-info">
            <span v-if="selItemData.value.ccDiscountType == 2"
              >優惠 {{ selItemData.value.ccDiscount }} 元</span
            >
            <span
              v-if="
                selItemData.value.ccDiscountType == 1 &&
                selItemData.value.ccDiscount != 0
              "
              >優惠 {{ 100 - selItemData.value.ccDiscount + "折" }}
            </span>
            <span v-if="selItemData.value.ccDiscountType == 3"> 免費</span>
            <span class="coupon-date" v-if="selItemData.value.ccOnDate == 2">{{
              selItemData.value.ccDateOfDay + "天"
            }}</span>
            <span class="coupon-date" v-if="selItemData.value.ccOnDate == 0">{{
              "不限期"
            }}</span>
            <span class="coupon-date" v-if="selItemData.value.ccOnDate == 1">
              {{ selItemData.value.ccSdt.split(" ")[0] + " 啟用" }}<br />{{
                selItemData.value.ccEdt.split(" ")[0] + " 到期"
              }}</span
            >
          </div>
        </div>
        <div class="content">
          <div class="tabs-content">
            <button
              :class="infoListRef == 1 ? 'active' : ''"
              v-on:click="changeTabs(1)"
            >
              優惠內容
            </button>
            <button
              :class="infoListRef == 2 ? 'active' : ''"
              v-on:click="changeTabs(2)"
            >
              使用紀錄
            </button>
          </div>
          <div class="main-content" v-if="infoListRef == 1">
            <button>寄送優惠</button>
            <p>適用項目</p>
            <span>{{ "所有服務與商品" }}</span>
            <p>建立時間</p>
            <span v-if="addTime">{{ addTime[0] + ":" + addTime[1] }}</span>
            <p>注意事項</p>
            <span>{{
              "僅於店內或線上預約消費時使用，店家將保留最終決議隨時可能撤銷‧"
            }}</span>
          </div>
          <div class="main-content" v-else>
            <div>
              <div>
                <span class="amount-content">{{ 0 }}</span>
                <span>有效瀏覽數</span>
              </div>
              <div>
                <span class="amount-content">{{ 0 }}</span>
                <span>實際領取數</span>
              </div>
              <div>
                <span class="amount-content">{{ 0 }}</span>
                <span>使用數</span>
              </div>
            </div>
            <div class="uselist-content">
              <span>使用紀錄</span>
              <table>
                <thead class="table-thead">
                  <tr>
                    <th>
                      <p class="nameview">顧客</p>
                    </th>
                    <th>
                      <p class="nameview">使用時間</p>
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
          v-if="selItemData.value.ccType == 0"
          class="otherpay-btn"
          v-on:click="updateCoupon()"
        >
          啟用優惠券
        </button>
        <button v-else class="otherpay-btn" v-on:click="updateCoupon()">
          停用優惠券
        </button>
        <button v-on:click="showEditUIFn(true)" class="cash-btn">編輯</button>
      </div>
    </div>
  </div>
  <EditCouponUI
    v-if="showEditUI"
    :selItemData="selItemData"
    :showUIFn="showEditUIFn"
  ></EditCouponUI>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePriceStore } from "@/stores/priceStore";
import icon_closeX from "@/assets/images/icon_closeX.png";
import icon_ticket from "@/assets/images/icon_cancle.png";
import Alert from "../alertCmpt";
import { showErrorMsg } from "@/types/IMessage";

let store = usePriceStore();
let { selectCouponRef } = storeToRefs(store);
let { updateCouponApi, getCouponApi } = store;

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
console.log(props.selItemData);
let addTime = ref("");
getCouponApi(props.selItemData.value.ccId, 0).then((res: any) => {
  props.selItemData.value.dateCreate = selectCouponRef.value[0].dateCreate;
  addTime.value = props.selItemData.value.dateCreate
    .replace("T", " ")
    .split(":");
});
onMounted(() => {
  // getmemberInfoApi();
});

const changeTabs = (index: number) => {
  infoListRef.value = index;
};
const showEditUIFn = (state: boolean) => {
  showEditUI.value = state;
  getCouponApi();
  if (!state) props.showInfoUIHdr(false);
};
function updateCoupon() {
  let apiData = props.selItemData.value;
  apiData.ccType = apiData.ccType == 0 ? 1 : 0;

  /**更新 */
  updateCouponApi(apiData).then((res: any) => {
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
      .coupon-skin {
        display: flex;
        width: 90%;
        height: 150px;
        align-items: center;
        border-radius: 10px;
        box-shadow: 0 0 5px;
        box-sizing: border-box;
        // margin-top: 20px;
        // margin-left: 5%;
        // margin-bottom: 5%;
        margin: 20px 5% 5% 5%;
        .coupon-icon {
          display: flex;
          width: calc(30%);
          height: 100%;
          align-items: center;
          background-color: #faf9f8;
          justify-content: center;
          border-radius: 10px 0px 0px 10px;
          > img {
            width: 30px;
            height: 20px;
          }
        }
        .coupon-info {
          width: calc(70%);
          height: 100%;
          > span {
            display: flex;
            height: 50%;
            // justify-content: center;
            margin-left: 10%;
            align-items: center;
            font-size: 28px;
          }
          .coupon-date {
            color: #c1bdb8;
            font-size: 18px;
            font-size: 20px;
            align-items: baseline;
          }
        }
      }
      .content {
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
