<template>
  <div class="popup-mask" v-on:click.self="showUIFn(false)">
    <div class="popup-content">
      <div class="top-content">
        <img :src="icon_closeX" v-on:click="showUIFn(false)" />
        <span>結帳</span>
      </div>
      <div class="main-content">
        <div class="left-main">
          <p>結帳項目</p>
          <div class="item-add"></div>
          <div class="bill-add">
            <span
              >&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;結帳項目</span
            >
          </div>
          <div class="msg-add">
            <el-input
              v-model="formInputRef.memo"
              maxlength="1000"
              placeholder="請輸入備註"
              show-word-limit
              type="text"
            />
          </div>
          <div class="other-add">
            <span>全單折扣</span>
            <span>優惠券</span>
            <span>儲值卡</span>
            <span>計次券</span>
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
          <div class="customer-msg">
            <div>
              <span>總計</span>
              <span>$599</span>
            </div>
          </div>
          <div class="customer-submit">
            <button class="other-btn">其他收款方式</button>
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
  <AddServicesUI
    v-if="showAddServicesUIRef"
    :selData="formInputRef.memberInfo"
    :showUIFn="showMemberUIFn"
    :getDataFn="getMembersFn"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/priceStore";
import search_ico from "@/assets/images/icon_search.png";
import icon_closeX from "@/assets/images/icon_closeX.png";
import icon_customer from "@/assets/images/icon_customer.png";
import icon_right_arrow from "@/assets/images/icon_right_arrow.png";

let store = useApptStore();
let { allDiscountList } = storeToRefs(store);
let { getAllDiscountApi } = store;

const props = defineProps<{
  showUIFn: Function;
  //   formInfo: any;
  //   addDetailTypeID?: any;
}>();
let showMemberUIRef = ref(false);
let showAddServicesUIRef = ref(false);

onMounted(() => {
  // console.log('onMounted');
});
let formInputRef: any = ref({
  memberInfo: { nameView: "顧客", phone: "請選擇顧客" },
  customerTotal: 1,
  memo: "",
});

function showMemberUIFn(state: boolean) {
  showMemberUIRef.value = state;
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
        > div {
          width: 90%;
          margin-left: 5%;
          margin-top: 5%;
        }
        .item-add {
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
          :deep(.el-input__inner)  {
            background-color: #ffffff;
            font-size: 18px;
          }
        }
        .other-add {
          display: grid;
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
          border-top: solid 0.5px #ddd;
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
          .other-btn {
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
</style>
