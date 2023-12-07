<template>
  <div class="popup-mask" v-on:click.self="showUIFn(false)">
    <div class="popup-content">
      <div class="top-content">
        <img :src="icon_closeX" v-on:click="showUIFn(false)" />
        <span>新增計次券</span>
        <button class="otherpay-btn" v-on:click="submitBtn()">確認新增</button>
      </div>
      <div class="main-content">
        <div class="left-main">
          <div class="input-item">
            <span class="title-content">基本資訊</span>
            <span class="msg-content">填寫你的計次券基本資訊。</span>
            <div>
              <span>名稱</span>
              <input v-model="formInputRef.name" placeholder="請輸入名稱" type="text" />
            </div>
            <div class="directions-content">
              <span>說明</span>
              <textarea v-model="formInputRef.msg" placeholder="請輸入說明或注意事項"></textarea>
            </div>
            <span class="p_error" v-if="ruleLists.ruleItem.ticketName.is_error">
              {{ ruleLists.ruleItem.ticketName.warn }}
            </span>
            <span class="p_error" v-if="ruleLists.ruleItem.ticketMsg.is_error">
              {{ ruleLists.ruleItem.ticketMsg.warn }}
            </span>
          </div>
          <div class="input-item">
            <span class="title-content">計次券項目與價格</span>
            <span class="msg-content">選擇你的計次券對象項目與填寫販售價格。</span>
            <div>
              <span>計次項目</span>
              <div v-on:click="showItemTypeFn(1)">
                <p v-if="formInputRef.ffServiceId == 0">請選擇計次項目</p>
                <p v-else>{{ formInputRef.ffServiceItem.nameTw }}</p>
              </div>
            </div>
            <span class="p_error" v-if="ruleLists.ruleItem.ticketItem.is_error">
              {{ ruleLists.ruleItem.ticketItem.warn }}
            </span>
            <div class="limit-content" v-if="formInputRef.ffServiceId != 0">
              <span>可兌換數量</span>
              <!-- <input
                v-model="formInputRef.amountTotal"
                placeholder="請輸入優惠主題"
                type="text"
              /> -->
              <div class="total-content">
                <img :src="icon_minus" @click="countLimitTotalBtn(-1)" />
                <span>{{ formInputRef.limitTotal }}</span>
                <img :src="icon_plus" @click="countLimitTotalBtn(+1)" />
              </div>
            </div>
            <div v-if="formInputRef.ffServiceId != 0">
              <span>原始價格</span>
              <!-- <span>{{ formInputRef.oldPrice }}</span> -->
              <input v-model="formInputRef.oldPrice" type="text" disabled="false" />
            </div>
          </div>
          <div class="input-item" v-if="formInputRef.ffServiceId != 0">
            <div>
              <span>販售價格</span>
              <input v-model="formInputRef.ffPrice" placeholder="請輸入計次券銷售金額" type="text" />
            </div>
          </div>
          <div class="check-item" name="check_item">
            <span class="title-content">贈送服務項目</span>
            <!-- <div v-if="selServiceGroupRef.length > 0"> -->
            <div>
              <table>
                <tbody v-for="(item, index) in formInputRef.giftServices" :key="item.lessonId">
                  <tr>
                    <td>
                      <p>{{ item.nameTw }}</p>
                    </td>
                    <td>
                      <img :src="icon_minus" @click="countTotalBtn(-1, item)" />
                    </td>
                    <td>
                      <p>{{ item.giftTotal }}</p>
                    </td>
                    <td>
                      <img :src="icon_plus" @click="countTotalBtn(+1, item)" />
                    </td>
                    <td>
                      <img class="delete_img" :src="icon_cancleItem" @click="cancleServiceFn(item, index)" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-on:click="showServiceUIFn(true)">加入贈送服務</p>
            <span class="title-content">贈送商品項目</span>
            <div v-if="formInputRef.giftGoods.length > 0">
              <table>
                <tbody v-for="(item, index) in formInputRef.giftGoods" :key="item.pId">
                  <tr>
                    <td>
                      <p>{{ item.pName }}</p>
                    </td>
                    <td>
                      <img :src="icon_minus" @click="countTotalBtn(-1, item)" />
                    </td>
                    <td>
                      <p>{{ item.giftTotal }}</p>
                    </td>
                    <td>
                      <img :src="icon_plus" @click="countTotalBtn(+1, item)" />
                    </td>
                    <td>
                      <img class="delete_img" :src="icon_cancleItem" @click="cancleGoodsFn(item, index)" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-on:click="showGoodsUIFn(true)">加入贈送商品</p>
          </div>
          <div class="input-item" name="date">
            <span class="title-content">使用期限</span>
            <div>
              <span>期限方式</span>
              <div class="select-content">
                <el-select style="width: 100%" :popper-append-to-body="false" popper-class="select"
                  v-model="formInputRef.ffDateType" @change="changeValue()">
                  <el-option v-for="(item, index) in content" :key="index" :value="item.id" :label="item.name">
                    {{ item.name }}
                  </el-option>
                </el-select>
              </div>
            </div>
            <div v-if="formInputRef.ffDateType == 2">
              <span>可使用天數</span>
              <div class="select-content">
                <el-select style="width: 100%" :popper-append-to-body="false" popper-class="select"
                  v-model="formInputRef.days" placeholder="請選擇可使用天數">
                  <el-option v-for="(item, index) in selDays" :key="index" :value="item.id" :label="item.name">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div v-if="formInputRef.ffDateType == 1">
              <span>開始日期</span>
              <input type="date" v-model="formInputRef.startDate" />
            </div>
            <div v-if="formInputRef.ffDateType == 1">
              <span>結束日期</span>
              <input type="date" v-model="formInputRef.endDate" />
            </div>
            <span class="msg-content">開始和結束時間，預設為 0:00 和 23:59</span>
          </div>
        </div>
        <div class="right-main">
          <p>優惠券結果參考</p>
          <div class="ticket-skin">
            <div class="ticket">
              <div class="left-total">
                <span>{{ formInputRef.name }}</span>
                <span>共{{ formInputRef.limitTotal }}次</span>
                <span v-if="formInputRef.ffDateType == 0"> {{ "不限期" }}</span>
                <span v-if="formInputRef.ffDateType == 1">
                  {{ "日期起迄" }}
                </span>
                <span v-if="formInputRef.ffDateType == 2">
                  {{ formInputRef.days }} 天</span>
              </div>
              <div class="right-total">
                <span>{{ 1 }} <br />
                  {{ "剩餘數" }}</span>
              </div>
            </div>
          </div>
          <p>用優惠券將取代其他折扣方式</p>
        </div>
      </div>
      <div class="bottom-content"></div>
    </div>
  </div>
  <CheckboxServiceUI v-if="showServiceUIRef" :selData="formInputRef.giftServices" :showCServiceUIFn="showServiceUIFn"
    :getDataFn="getSelServiceFn"></CheckboxServiceUI>
  <CheckboxGoodsUI v-if="showGoodsUIRef" :selData="formInputRef.giftGoods" :showCGoodsUIFn="showGoodsUIFn"
    :getDataFn="getGoodsFn"></CheckboxGoodsUI>
  <RadioServicesUI v-if="itemTypeRef" :selData="formInputRef.ffServiceId" :getDataFn="getRadioServiceFn"
    :showServiceUIFn="showItemTypeFn">
  </RadioServicesUI>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePriceStore } from "@/stores/priceStore";
import icon_closeX from "@/assets/images/icon_closeX.png";
import icon_cancleItem from "@/assets/images/icon_cancleItem.png";
import icon_plus from "@/assets/images/icon_plus.png";
import icon_minus from "@/assets/images/icon_minus.png";
import { checkVerify_all, formatZeroDate, verify_methods } from "@/utils/utils";
import Alert from "../alertCmpt";
import { showErrorMsg } from "@/types/IMessage";

let store = usePriceStore();
let { } = storeToRefs(store);
let { addCountTicketApi } = store;

const props = defineProps<{
  showUIFn: Function;
}>();
let showGoodsUIRef: any = ref(false);
let showServiceUIRef: any = ref(false);
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
let formInputRef: any = ref({
  name: "",
  msg: "",
  imgUrl: "",
  ffServiceId: 0,
  ffServiceItem: 0,
  limitTotal: 1,
  ffPrice: 0,
  ffDateType: 0,
  days: 0,
  startDate: "",
  endDate: "",
  oldPrice: 0,
  giftServices: [],
  giftGoods: [],
});

onMounted(() => {
  // console.log('onMounted');
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
function submitBtn() {
  console.log("提交formInputRef", formInputRef.value);
  ruleLists.ruleItem.ticketName.value = formInputRef.value.name;
  ruleLists.ruleItem.ticketMsg.value = formInputRef.value.msg;
  ruleLists.ruleItem.ticketItem.value = formInputRef.value.ffServiceId == 0 ? "" : formInputRef.value.ffServiceId;
  // if (!verify_all()) return;
  if(!checkVerify_all(ruleLists)) return;

  //整理贈送服務資料
  let giftServicesVo = [];
  for (let i = 0; i < formInputRef.value.giftServices.length; i++) {
    const element = formInputRef.value.giftServices[i];
    giftServicesVo.push({
      lid: element.lessonId,
      lCount: element.giftTotal,
    });
  }
  //整理贈送商品資料
  let giftGoodsVo = [];
  for (let i = 0; i < formInputRef.value.giftGoods.length; i++) {
    const element = formInputRef.value.giftGoods[i];
    giftGoodsVo.push({
      pid: element.pId,
      pCount: element.giftTotal,
    });
  }

  let apiData = {
    ffId: 0,
    ffTitle: formInputRef.value.name,
    ffContext: formInputRef.value.msg,
    ffType: "0",
    ffImage: formInputRef.value.imgUrl,
    ffServiceId: formInputRef.value.ffServiceId,
    ffLimit: formInputRef.value.limitTotal,
    ffUsed: 0,
    ffPrice: formInputRef.value.ffPrice,
    ffDateType: formInputRef.value.ffDateType,
    ffSdt: formInputRef.value.startDate,
    ffEdt: formInputRef.value.endDate,
    ffDateOfUsedDay: formInputRef.value.days,
    serviceMaps: giftServicesVo,
    productMaps: giftGoodsVo,
  };
  console.log("提交apiData", apiData);

  /**新增 */
  addCountTicketApi(apiData).then((res: any) => {
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
function changeValue() {
  console.log(formInputRef.value);
}
function showGoodsUIFn(state: boolean) {
  showGoodsUIRef.value = state;
}
function getGoodsFn(data: any) {
  console.log(data, "獲取");
  formInputRef.value.giftGoods = data;
}
function showServiceUIFn(state: boolean) {
  showServiceUIRef.value = state;
}
function getSelServiceFn(data: any) {
  console.log(data, "獲取");
  formInputRef.value.giftServices = data;
}
function getRadioServiceFn(data: any) {
  console.log(data, "獲取");
  formInputRef.value.ffServiceItem = data;
  formInputRef.value.ffServiceId = data.lessonId;
  formInputRef.value.oldPrice = "$" + data.price;
}
function cancleServiceFn(item: any, index: number) {
  formInputRef.value.giftServices.value.splice(index, 1);
}
function cancleGoodsFn(item: any, index: number) {
  formInputRef.value.giftGoods.value.splice(index, 1);
}
function countTotalBtn(data: number, item: any) {
  if (item.giftTotal + data > 0) item.giftTotal += data;
}
function countLimitTotalBtn(data: number) {
  if (formInputRef.value.limitTotal + data > 0)
    formInputRef.value.limitTotal += data;
}
//1:服務，2:商品，
let itemTypeRef: any = ref(0);
function showItemTypeFn(type: number) {
  itemTypeRef.value = type;
}


//-------------------------------------form驗證
const ruleLists: any = reactive({
  ruleItem: {
    ticketName: {
      label: "名稱",
      rules: {
        required: {
          warn: "此項為必填",
        },
      },
      is_error: false,
      warn: "",
    },
    ticketMsg: {
      label: "說明",
      rules: {
        required: {
          warn: "此項為必填",
        },
      },
      is_error: false,
      warn: "",
    },
    ticketItem: {
      label: "服務項目",
      rules: {
        required: {
          warn: "此項為必填",
        },
      },
      is_error: false,
      warn: "",
    },
  },
});
// let { ruleItem } = toRefs(ruleLists);
// const verify_all = () => {
//   let is_valid = true;
//   for (let component in ruleLists.ruleItem) {
//     let item = ruleLists.ruleItem[component];
//     for (let rule in item.rules) {
//       if (!verify_methods[rule](item)) {
//         is_valid = false;
//         break;
//       }
//     }
//   }
//   return is_valid;
// };
//-------------------------------------------------------------------
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

      >span {
        display: flex;
        width: calc(100%);
        justify-content: center;
        align-items: center;
        font-size: 28px;
        height: 70px;
        // height: 100px;
        justify-content: center;
      }

      >img {
        position: absolute;
        width: 41px;
        height: 38px;
        top: 15px;
        left: 15px;
      }

      >button {
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
          }

          .select-content {
            width: calc(100% - 180px);

            .el-select {
              width: 100%;

              :deep(.el-input__wrapper) {
                width: 370.5px;
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

          >div {
            display: flex;
            height: 80px;
            width: 100%;
            border: solid 0.5px #ddd;
            box-sizing: border-box;

            >span {
              height: 100%;
              width: 180px;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #faf9f8;
              font-size: 24px;
            }

            >input {
              border: solid 0px #c1bdb8;
              box-sizing: border-box;
              height: 100%;
              width: calc(100% - 180px);
              font-size: 22px;
            }

            div {
              display: flex;
              width: calc(100% - 180px);
              height: 100%;

              >p {
                display: flex;
                color: #87ceeb;
                width: calc(100% - 180px);
              }
            }

            ::placeholder {
              color: #c1bdb8;
            }

            textarea {
              width: calc(100% - 180px);
              height: 160px;
              border: solid 0px #ddd;
              box-sizing: border-box;
            }
          }

          .directions-content {
            display: flex;
            height: 160px;
            width: 100%;
            border: solid 0.5px #ddd;
            box-sizing: border-box;

            textarea {
              width: calc(100% - 180px);
              height: 99%;
              border: solid 0px #ddd;
              box-sizing: border-box;
            }
          }

          .limit-content {
            display: flex;
            width: calc(100%);
            align-items: center;

            .total-content {
              display: flex;
              width: calc(100% - 180px);
              align-items: center;

              img {
                width: 30px;
                height: 30px;
                margin: 10px;
              }

              span {
                display: flex;
                flex: 1;
                justify-content: center;
                align-items: center;
                font-size: 24px;
              }
            }
          }
        }

        .check-item {
          display: grid;
          width: 90%;
          margin-left: 5%;
          margin-top: 3%;

          >span {
            height: 100%;
            width: 180px;
            display: flex;
            // justify-content: center;
            align-items: center;
            background-color: #faf9f8;
            font-size: 24px;
          }

          .title-content {
            font-size: 28px;
            width: 100%;
            // .el-select{
          }

          p {
            color: #87ceeb;
            // width: calc(100% - 180px);
          }

          div {
            width: 100%;

            table {
              width: 100%;

              p {
                color: #000000;
              }

              tbody {
                tr {

                  // display: flex;
                  td {
                    // display: flex;
                    border-bottom: solid 0.5px #ddd;
                    box-sizing: border-box;
                  }
                }

                >tr>td:nth-child(1) {
                  width: 60%;
                }

                >tr>td:nth-child(2) {
                  text-align: center;
                }

                >tr>td:nth-child(3) {
                  text-align: center;
                }

                >tr>td:nth-child(4) {
                  text-align: center;
                }

                >tr>td:nth-child(5) {
                  text-align: center;
                }
              }
            }
          }
        }

        .radio-item {
          display: grid;
          width: 90%;
          margin-left: 5%;
          margin-top: 3%;

          >span {
            font-size: 28px;
          }

          .radio-main {
            display: grid;

            >div {
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

              .radio_type:checked+label {
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

        >div {
          width: 90%;
          margin-left: 5%;
          margin-top: 5%;
        }

        >p {
          display: flex;
          justify-content: center;
          color: #c1bdb8;
        }

        .ticket-skin {
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
              width: 50%;
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
            background-size: 24px 24px;
            /* 一个repeat的大小 */
            background-repeat: repeat-y;
            background-image: radial-gradient(#fff 7px, transparent 8px);
            position: absolute;
            top: 0;
          }

          .ticket:before {
            left: -12px;
            /* 半圆，只显示一个repeat的一半 */
          }

          .ticket:after {
            right: -12px;
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

.p_error {
  color: #fc0505;
  width: 100%;
}
</style>
