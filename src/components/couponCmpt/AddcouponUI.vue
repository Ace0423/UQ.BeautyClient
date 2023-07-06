<template>
  <div class="popup-mask" v-on:click.self="showUIFn(false)">
    <div class="popup-content">
      <div class="top-content">
        <img :src="icon_closeX" v-on:click="showUIFn(false)" />
        <span>新增優惠券</span>
        <button class="otherpay-btn" v-on:click="submitBtn()">確認新增</button>
      </div>
      <div class="main-content">
        <div class="left-main">
          <div class="input-item">
            <span class="title-content">優惠券名稱</span>
            <span class="msg-content"
              >幫助你更好任別你的優惠券，名稱將不會呈現給顧客。</span
            >
            <div>
              <span>券別名稱</span>
              <input
                v-model="formInputRef.name"
                placeholder="請輸入券別名稱"
                type="text"
              />
            </div>
          </div>
          <div class="input-item" name="theme">
            <span class="title-content">優惠券內容</span>
            <span class="msg-content">填寫任何你想表達給顧客的優惠內容。</span>
            <div>
              <span>優惠主題</span>
              <input
                v-model="formInputRef.theme"
                placeholder="請輸入優惠主題"
                type="text"
              />
            </div>
            <div>
              <span>附加圖片</span>
              <p v-on:click="updateImgUrl()">上傳圖片</p>
            </div>
            <span class="msg-content"
              >最大長寬 1200px x 1200px，檔案小於 1MB，支援JPG、JPEG，PNG</span
            >
          </div>
          <div class="radio-item" name="radio_item">
            <span>指定項目</span>
            <div class="radio-main">
              <div>
                <div class="radio-input">
                  <input
                    class="radio_type"
                    v-model="formInputRef.groupItem"
                    type="radio"
                    :value="0"
                    name="type"
                    id="radio1"
                  />
                </div>
                <div class="radio-label">
                  <label for="radio1">所有項目</label>
                  <label for="radio1">所有服務與商品皆可使用此優惠券</label>
                </div>
              </div>
              <div>
                <div class="radio-input">
                  <input
                    class="radio_type"
                    v-model="formInputRef.groupItem"
                    type="radio"
                    :value="1"
                    name="type"
                    id="radio2"
                  />
                </div>
                <div class="radio-label">
                  <label for="radio2">指定群組</label>
                  <label for="radio2">群組內所有項目皆可使用此優惠券</label>
                </div>
              </div>
              <div>
                <div class="radio-input">
                  <input
                    class="radio_type"
                    type="radio"
                    :value="2"
                    name="type"
                    id="radio3"
                  />
                </div>
                <div class="radio-label">
                  <label for="radio3">指定項目</label>
                  <label for="radio3">僅有指定項目可使用此優惠券</label>
                </div>
              </div>
            </div>
          </div>
          <div class="input-item" name="date">
            <span class="title-content">使用期限</span>
            <div>
              <span>期限方式</span>
              <div class="select-content">
                <el-select
                  :popper-append-to-body="false"
                  popper-class="select"
                  v-model="formInputRef.ccOnDate"
                  @change="changeValue()"
                >
                  <el-option
                    v-for="(item, index) in content"
                    :key="index"
                    :value="item.id"
                    :label="item.name"
                  >
                    {{ item.name }}
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <span>可使用天數</span>
              <div class="select-content">
                <el-select
                  :popper-append-to-body="false"
                  popper-class="select"
                  v-model="formInputRef.days"
                  placeholder="請選擇可使用天數"
                >
                  <el-option
                    v-for="(item, index) in selDays"
                    :key="index"
                    :value="item.id"
                    :label="item.name"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <span>開始日期</span>
              <input type="date" v-model="formInputRef.startDate" />
            </div>
            <div>
              <span>結束日期</span>
              <input type="date" v-model="formInputRef.endDate" />
            </div>
          </div>
          <div class="input-item" name="amount">
            <span class="title-content">發送數量</span>
            <div>
              <span>數量方式</span>
              <div class="select-content">
                <el-select
                  :popper-append-to-body="false"
                  v-model="formInputRef.amountType"
                  @change="changeValue()"
                >
                  <el-option
                    v-for="(item, index) in amountType"
                    :key="index"
                    :value="item.id"
                    :label="item.name"
                  >
                    {{ item.name }}
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <span>限制發送數</span>
              <input
                v-model="formInputRef.amountTotal"
                placeholder="請輸入限制數量"
                type="text"
              />
            </div>
          </div>
          <div class="input-item" name="useType">
            <span class="title-content">使用優惠</span>
            <div>
              <span>優惠方式</span>
              <div class="select-content">
                <el-select
                  :popper-append-to-body="false"
                  popper-class="select"
                  placeholder="請選擇優惠方式"
                  v-model="formInputRef.ccDiscountType"
                  @change="changeValue()"
                >
                  <el-option
                    v-for="(item, index) in discountType"
                    :key="index"
                    :value="item.id"
                    :label="item.name"
                  >
                    {{ item.name }}
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <span>折扣比</span>
              <input v-model="formInputRef.ccDiscount" type="text" />
            </div>
            <div>
              <span>折讓金額</span>
              <input v-model="formInputRef.ccDiscount" type="text" />
            </div>
          </div>
          <div class="radio-item" name="checkoutType">
            <span>折抵方式</span>
            <div class="radio-main">
              <div>
                <div class="radio-input">
                  <input
                    class="radio_type"
                    v-model="formInputRef.checkoutType"
                    type="radio"
                    :value="0"
                    name="radioType1"
                    id="radioType1"
                  />
                </div>
                <div class="radio-label">
                  <label for="radioType1">訂單內所有符合項目皆享有優惠</label>
                  <label for="radioType1"
                    >所有包含於訂單內的每一項產品與服務皆享有優惠‧</label
                  >
                </div>
              </div>
              <div>
                <div class="radio-input">
                  <input
                    class="radio_type"
                    v-model="formInputRef.checkoutType"
                    type="radio"
                    :value="1"
                    name="radioType1"
                    id="radioType2"
                  />
                </div>
                <div class="radio-label">
                  <label for="radioType2">訂單內僅唯一項目使用優惠</label>
                  <label for="radioType2"
                    >此優惠券僅能只用指定的唯一服務或產品做為優惠‧</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-main">
          <p>優惠券結果參考</p>
          <div class="coupon-skin">
            <div class="coupon-icon">
              <img :src="icon_ticket" />
            </div>
            <div class="coupon-info">
              <span>優惠 {{ 0 }} 元</span>
              <span class="coupon-date">{{ formInputRef.theme }}</span>
              <span class="coupon-date">{{ "不限期" }}</span>
            </div>
          </div>
          <p>用優惠券將取代其他折扣方式</p>
        </div>
      </div>
      <div class="bottom-content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/priceStore";
import icon_closeX from "@/assets/images/icon_closeX.png";
import icon_ticket from "@/assets/images/icon_cancle.png";
import icon_customer from "@/assets/images/icon_customer.png";
import icon_right_arrow from "@/assets/images/icon_right_arrow.png";
import { formatZeroDate } from "@/utils/utils";
import Alert from "../alertCmpt";
import { showErrorMsg } from "@/types/IMessage";

let store = useApptStore();
let { allDiscountList } = storeToRefs(store);
let { addCouponApi } = store;

const props = defineProps<{
  showUIFn: Function;
  //   formInfo: any;
  //   addDetailTypeID?: any;
}>();
let showMemberUIRef = ref(false);
let showAddItemMenuUIRef = ref(false);
let showAddServicesUIRef = ref(false);
let content = [
  {
    id: 0,
    name: "不限期",
  },
  {
    id: 1,
    name: "限制日期區間",
  },
  {
    id: 2,
    name: "限制天數",
  },
];
let selDays = [
  {
    id: 7,
    name: "7天",
  },
  {
    id: 14,
    name: "14天",
  },
  {
    id: 21,
    name: "21天",
  },
  {
    id: 30,
    name: "30天",
  },
  {
    id: 90,
    name: "90天",
  },
  {
    id: 180,
    name: "180天",
  },
];
let amountType = [
  {
    id: -1,
    name: "無限制",
  },
  {
    id: 1,
    name: "限制數量",
  },
];
let discountType = [
  {
    id: 1,
    name: "折扣佔比(%)",
  },
  {
    id: 2,
    name: "折讓金額($)",
  },
  {
    id: 3,
    name: "免費",
  },
];
onMounted(() => {
  // console.log('onMounted');
});
let formInputRef: any = ref({
  name: "",
  theme: "",
  imgUrl: "",
  days: null,
  startDate: "",
  endDate: "",
  amountTotal: null,
  amountType: -1,
  ccOnDate: 0,
  ccDiscountType: null,
  ccDiscount: 0,
  groupItem: 0,
  checkoutType: 0,
});

var date = new Date();

formInputRef.value.startDate =
  date.getFullYear() +
  "-" +
  formatZeroDate(date.getMonth() + 1) +
  "-" +
  formatZeroDate(date.getDate());
formInputRef.value.endDate =
  date.getFullYear() +
  "-" +
  formatZeroDate(date.getMonth() + 1) +
  "-" +
  formatZeroDate(date.getDate());

function showMemberUIFn(state: boolean) {
  showMemberUIRef.value = state;
}
function showServicesUIFn(state: boolean) {
  showAddServicesUIRef.value = state;
}
function showItemMenuUIFn(state: boolean) {
  showAddItemMenuUIRef.value = state;
}
function getMembersFn(data: any) {
  formInputRef.value.memberInfo = data;
}
function countCoustomerFn(data: number) {
  if (formInputRef.value.customerTotal + data > 0)
    formInputRef.value.customerTotal += data;
}
function submitBtn() {
  console.log("提交formInputRef", formInputRef.value);
  let apiData = {
    ccId: 0,
    ccTitle: formInputRef.value.name,
    ccTheme: formInputRef.value.theme,
    ccType: 0,
    ccImage: formInputRef.value.imgUrl,
    ccItemType: formInputRef.value.groupItem,
    ccOnDate: formInputRef.value.ccOnDate,
    ccSdt: formInputRef.value.startDate + " 00:00:00",
    ccEdt: formInputRef.value.endDate + " 23:59:59",
    ccDateOfDay: formInputRef.value.days,
    ccLimit:
      formInputRef.value.amountType == -1 ? -1 : formInputRef.value.amountTotal,
    ccDiscountType: formInputRef.value.ccDiscountType,
    ccDiscount: formInputRef.value.ccDiscount,
    ccAccountType: formInputRef.value.checkoutType,
    serviceMaps: [],
    productMaps: [],
    groupMaps: [],
  };
  console.log("提交apiData", apiData);

  /**新增 */
  addCouponApi(apiData).then((res: any) => {
    if (res.state == 1) {
      Alert.sussess("成功", 1000);
      setTimeout(() => {
        props.showUIFn(false);
      }, 1000);
    } else {
      Alert.warning(showErrorMsg(res.msg), 1000);
    }
  });
}
function updateImgUrl() {
  console.log("更新圖片");
}
function changeValue() {
  console.log(formInputRef.value);
}
</script>

<style lang="scss">
.el-select-dropdown {
  top: 0px;
}
</style>
<style scoped lang="scss">
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  background: rgba(255, 255, 255, 0.5);

  display: flex;
  align-items: center;
  justify-content: space-around;

  .popup-content {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;
    .top-content {
      display: flex;
      height: 70px;
      border: solid 1px #ddd;
      box-sizing: border-box;
      > span {
        display: flex;
        width: calc(100%);
        justify-content: center;
        align-items: center;
        font-size: 28px;
        height: 70px;
        // height: 100px;
        justify-content: center;
      }
      > img {
        position: absolute;
        width: 41px;
        height: 38px;
        top: 15px;
        left: 15px;
      }
      > button {
        position: absolute;
        width: 150px;
        height: 50px;
        top: 10px;
        right: 10px;
        border-radius: 5px;
        border: none;
        background-color: #84715c;
        color: #fff;
      }
    }
    .main-content {
      display: flex;
      height: calc(100% - 70px);
      .left-main {
        width: 60%;
        height: 100%;
        border-right: solid 0.5px #ddd;
        box-sizing: border-box;
        overflow-y: auto;
        .input-item {
          display: grid;
          width: 90%;
          margin-left: 5%;
          margin-top: 3%;
          .title-content {
            font-size: 28px;
            width: 100%;
            // .el-select{
          }
          .select-content {
            width: calc(100% - 180px);
            .el-select {
              width: 100%;
              :deep(.el-input__wrapper) {
                width: 100%;
                height: 77px;
                font-size: 24px;
                :deep(.el-select-dropdown) {
                  border: 1px solid #ff0000 !important;
                }
              }
              input {
                font-size: 12px;
                border: none;
                background: none;
                text-align: center;
                font-weight: bold;
              }
            }
          }
          .msg-content {
            font-size: 20px;
            color: #c1bdb8;
            margin-bottom: 10px;
          }
          > div {
            display: flex;
            height: 80px;
            width: 100%;
            border: solid 0.5px #ddd;
            box-sizing: border-box;
            > span {
              height: 100%;
              width: 180px;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #faf9f8;
              font-size: 24px;
            }
            > input {
              border: solid 0px #c1bdb8;
              box-sizing: border-box;
              height: 100%;
              width: calc(100% - 180px);
              font-size: 22px;
            }
            > p {
              color: #87ceeb;
              width: calc(100% - 180px);
            }
            ::placeholder {
              color: #c1bdb8;
            }
          }
        }

        .radio-item {
          display: grid;
          width: 90%;
          margin-left: 5%;
          margin-top: 3%;
          > span {
            font-size: 28px;
          }
          .radio-main {
            display: grid;
            > div {
              display: flex;
              height: 70px;
              align-items: center;
              .radio-label {
                display: grid;
                height: 60px;
              }
              .radio-input {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
              }
              label {
                line-height: 20px;
                display: inline-block;
                margin-left: 5px;
                margin-right: 15px;
                color: #777;
              }
              .radio_type {
                width: 20px;
                height: 20px;
                appearance: none;
                position: relative;
              }
              .radio_type:before {
                content: "";
                width: 20px;
                height: 20px;
                border: 1px solid #7d7d7d;
                display: inline-block;
                border-radius: 50%;
                vertical-align: middle;
              }
              .radio_type:checked:before {
                content: "";
                width: 20px;
                height: 20px;
                border: 1px solid #c59c5a;
                background: #c59c5a;
                display: inline-block;
                border-radius: 50%;
                vertical-align: middle;
              }
              .radio_type:checked:after {
                content: "";
                width: 10px;
                height: 5px;
                border: 2px solid white;
                border-top: transparent;
                border-right: transparent;
                text-align: center;
                display: block;
                position: absolute;
                top: 8px;
                left: 5px;
                vertical-align: middle;
                transform: rotate(-45deg);
              }
              .radio_type:checked + label {
                color: #c59c5a;
              }
            }
          }
        }
      }
      .right-main {
        // display: block;
        display: flex;
        flex-flow: column;
        width: 40%;
        height: 100%;
        // justify-content: center;
        margin: 0;
        > div {
          width: 90%;
          margin-left: 5%;
          margin-top: 5%;
        }
        > p {
          display: flex;
          justify-content: center;
          color: #c1bdb8;
        }
        .coupon-skin {
          display: flex;
          width: 90%;
          height: 150px;
          align-items: center;
          border-radius: 5px;
          box-shadow: 0 0 5px;
          box-sizing: border-box;
          .coupon-icon {
            width: calc(30%);
            height: 100%;
            display: flex;
            align-items: center;
            background-color: #faf9f8;
            justify-content: center;
            // border-radius: 10px;
            border-radius: 10px 0px 0px 10px;
            > img {
              width: 30px;
              height: 20px;
            }
          }
          .coupon-info {
            display: block;
            width: calc(70% - 50px);
            height: 100%;
            align-items: center;
            > span {
              display: flex;
              height: 25%;
              margin-left: 10%;
              align-items: center;
              font-size: 28px;
            }
            .coupon-date {
              color: #c1bdb8;
              font-size: 18px;
            }
          }
        }
      }
    }
    .bottom-content {
      display: flex;
    }
  }
}
.link-bottom {
  padding: 0 5px;
  opacity: 0.5;
  margin: auto;
  width: 80%;
  height: 2px;
  background-color: #707070;
}
</style>
