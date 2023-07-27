<template>
  <div class="popup-mask" v-on:click.self="showUIFn(false)">
    <div class="popup-content">
      <div class="top-content">
        <img :src="icon_closeX" v-on:click="showUIFn(false)" />
        <span>結帳</span>
      </div>
      <div class="main-content">
        <div class="left-main">
          <div>
            <span>結帳項目</span>
          </div>
          <div class="link-bottom"></div>
          <div class="form-item">
            <div v-if="formInputRef.buyServicesGroup.length > 0">
              <table>
                <thead>
                  <tr>
                    <th>服務({{ formInputRef.buyServicesGroup.length }})</th>
                    <th>價格</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody
                  v-for="(item, index) in formInputRef.buyServicesGroup"
                  :key="item.pId"
                >
                  <tr>
                    <td>
                      <p>{{ item.nameTw + "(" + item.servicesTime + ")" }}</p>
                    </td>
                    <td>
                      <p>{{ item.price }}</p>
                    </td>
                    <td>
                      <img
                        class="delete_img"
                        :src="icon_cancleItem"
                        @click="cancleServiceFn(item, index)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="form-item">
            <div v-if="formInputRef.buyGoodsGroup.length > 0">
              <table>
                <thead>
                  <tr>
                    <th>商品({{ formInputRef.buyGoodsGroup.length }})</th>
                    <th>價格</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody
                  v-for="(item, index) in formInputRef.buyGoodsGroup"
                  :key="item.pId"
                >
                  <tr>
                    <td>
                      <p>{{ item.pName }}</p>
                    </td>
                    <td>
                      <p>{{ item.price }}</p>
                    </td>
                    <td>
                      <img
                        class="delete_img"
                        :src="icon_cancleItem"
                        @click="cancleGoodsFn(item, index)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="bill-add" v-on:click="showItemMenuUIFn(true)">
            <span
              >&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新增結帳項目</span
            >
          </div>
          <div class="link-bottom"></div>
          <div class="msg-add">
            <el-input
              v-model="formInputRef.memo"
              maxlength="1000"
              placeholder="請輸入備註"
              show-word-limit
              type="text"
            />
          </div>
          <div class="link-bottom"></div>
          <div class="other-add">
            <span>其他項目</span>
            <div>
              <span>全單折扣</span>
            </div>
            <div>
              <span>優惠券</span>
            </div>
            <div>
              <span>儲值卡</span>
            </div>
            <div>
              <span>計次券</span>
            </div>
          </div>
        </div>
        <div class="right-main">
          <div class="customer-btn" v-on:click="showMemberUIFn(true)">
            <img class="customer-img" :src="icon_customer" />
            <div>
              <span>{{ formInputRef.memberInfo.nameView }}</span>
              <span class="customer-phone">{{
                formInputRef.memberInfo.phone
              }}</span>
            </div>
            <img :src="icon_right_arrow" />
          </div>
          <div class="customer-total">
            <span v-on:click="countCoustomerFn(-1)">-</span>
            <span class="customer-headcount"
              >人數 {{ formInputRef.customerTotal }} 位</span
            >
            <span v-on:click="countCoustomerFn(+1)">+</span>
          </div>
          <div class="link-bottom"></div>
          <div class="customer-msg">
            <div>
              <span>總計</span>
              <span>{{ formInputRef.priceTotal }}</span>
            </div>
          </div>
          <div class="customer-submit">
            <button class="otherpay-btn">其他收款方式</button>
            <button class="cash-btn" @click="submitBtn()">現金收款</button>
          </div>
        </div>
      </div>
      <div class="bottom-content"></div>
    </div>
  </div>
  <MemberRadioUI
    v-if="showMemberUIRef"
    :selData="formInputRef.memberInfo"
    :showUIFn="showMemberUIFn"
    :getDataFn="getMembersFn"
  />
  <SelItemMenuUI
    v-if="showAddItemMenuUIRef"
    :selData="formInputRef"
    :showUIFn="showItemMenuUIFn"
    :getDataFn="getItemInfoFn"
  />
</template>

<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import icon_customer from "@/assets/images/icon_customer.png";
import icon_right_arrow from "@/assets/images/icon_right_arrow.png";
import icon_cancleItem from "@/assets/images/icon_cancleItem.png";
const props = defineProps<{
  showUIFn: Function;
  //   formInfo: any;
  //   addDetailTypeID?: any;
}>();
let showMemberUIRef = ref(false);
let showAddItemMenuUIRef = ref(false);
onMounted(() => {
  // console.log('onMounted');
});
let formInputRef: any = ref({
  memberInfo: { nameView: "顧客", phone: "請選擇顧客" },
  customerTotal: 1,
  memo: "",
  buyServicesGroup: [],
  buyGoodsGroup: [],
  priceTotal: 0,
});

function showMemberUIFn(state: boolean) {
  showMemberUIRef.value = state;
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
  console.log("現金收款");
  props.showUIFn(false);
}

function getItemInfoFn(data: any) {
  console.log("獲取", data);
  if (data.selectGood) {
    formInputRef.value.buyGoodsGroup = data.selectGood;
  }
  if (data.selectService) {
    formInputRef.value.buyServicesGroup = data.selectService;
  }
  console.log(data.selectGood);
  console.log(data.selectService);

  let priceTotal = 0;
  for (let i = 0; i < data.selectGood.length; i++) {
    const element = data.selectGood[i];
    priceTotal += element.price;
  }
  for (let i = 0; i < data.selectService.length; i++) {
    const element = data.selectService[i];
    priceTotal += element.price;
  }
  formInputRef.value.priceTotal = priceTotal;
  console.log("選擇", formInputRef.value);
}
function cancleServiceFn(item: any, index: number) {
  formInputRef.value.buyServicesGroup.splice(index, 1);
}
function cancleGoodsFn(item: any, index: number) {
  formInputRef.value.buyGoodsGroup.splice(index, 1);
}
</script>

<style scoped lang="scss">
.popup-mask {
  position: absolute;
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
        font-size: 30px;
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
        > div {
          width: 90%;
          margin-left: 5%;
          margin-top: 15px;
        }
        .form-item {
          width: 90%;
          > span {
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            height: 40px;
          }
          > div {
            display: flex;
            width: 100%;
            justify-content: center;
            > table {
              // display: flex;
              width: 100%;
              > thead {
                background-color: #c1bdb8;
                color: #877059;

                > tr > th:nth-child(1) {
                  width: 70%;
                }
                > tr > th:nth-child(2) {
                  width: 20%;
                }
                > tr > th:nth-child(3) {
                  width: 10%;
                }
              }
              > tbody {
                border-bottom: 1px solid #877059;
                > tr > td:nth-child(1) {
                  width: 70%;
                }
                > tr > td:nth-child(2) {
                  width: 20%;
                }
                > tr > th:nth-child(3) {
                  width: 10%;
                }
              }
            }
          }
          .link-btn {
            color: #b89087;
          }
        }
        .bill-add {
          height: 60px;
          background-color: #faf9f8;
          display: flex;
          align-items: center;
        }
        .msg-add {
          height: 40px;
          // background-color: #faf9f8;
          :deep(.el-input__inner) {
            background-color: #ffffff;
            font-size: 18px;
          }
        }
        .other-add {
          display: grid;
          > div {
            display: flex;
            align-items: center;
            margin-left: 5%;
            height: 60px;
            border-bottom: solid 0.5px #ddd;
            box-sizing: border-box;
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
        .customer-btn {
          display: flex;
          width: 90%;
          height: 80px;
          background-color: #faf9f8;
          align-items: center;
          border-radius: 5px;
          > div {
            width: calc(100% - 50px);
            height: 100%;
            > span {
              display: flex;
              height: 50%;
              // justify-content: center;
              margin-left: 10%;
              align-items: center;
              font-size: 28px;
            }
            .customer-phone {
              color: #c1bdb8;
              font-size: 18px;
              font-size: 20px;
            }
          }
          > img {
            margin-left: 10%;
            width: 20px;
            height: 20px;
          }
          .customer-img {
            width: 33px;
            height: 39px;
          }
        }
        .customer-total {
          display: flex;
          height: 60px;
          background-color: #faf9f8;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          > span {
            display: flex;
            justify-content: center;
            font-weight: bold;
            width: 20%;
            font-size: 30px;
          }
          .customer-headcount {
            display: flex;
            width: 60%;
            justify-content: center;
            font-size: 20px;
          }
        }

        .customer-msg {
          flex-grow: 1;
          // border-top: solid 0.5px #ddd;
          box-sizing: border-box;
          > div {
            display: block;
            display: flex;
            justify-content: space-between;
            margin-top: 2%;
          }
        }
        .customer-submit {
          height: 70px;
          display: flex;
          justify-content: center;
          border-top: solid 0.5px #ddd;
          box-sizing: border-box;
          .otherpay-btn {
            position: relative;
            width: 200px;
            height: 50px;
            margin: 10px;
            border-radius: 8px;
            font-size: 20px;
            font-weight: bold;
            color: #717171;
            background-color: #fff;
          }
          .cash-btn {
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
