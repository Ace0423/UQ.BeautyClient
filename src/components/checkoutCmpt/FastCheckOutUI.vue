<template>
  <div class="popup-mask" v-on:click.self="showUIFn(false)">
    <div class="popup-content">
      <div class="header-content">
        <img :src="icon_closeX" v-on:click="showUIFn(false)" />
        <span>結帳</span>
      </div>
      <div class="main-content">
        <div class="left-bg">
          <div class="left-main">
            <div>
              <span>結帳項目</span>
            </div>
            <div class="link-bottom"></div>
            <div class="form-item" name="列表">
              <div name="整合項目" v-if="formInputRef.buyItemsList.length > 0">
                <div class="info-list">
                  <div class="content-box" v-for="(bItem, index) in formInputRef.buyItemsList" :key="bItem">
                    <div name="服務Item" v-if="bItem.ItemType == 1" class="info-service"
                      @click="clickSvItem(bItem, bItem.Id)">
                      <div class="info-img"></div>
                      <div class="info-name">
                        <span class="fontBlack">{{ bItem.name }}</span>
                        <span>
                          <span v-if="bItem.managerInfo"> {{ bItem.managerInfo.nameView + " , " }}</span>
                          {{ bItem.timer + "分" }}
                          <span v-if="bItem.subInfo"> {{ " ," + bItem.subInfo.name
                          }}</span>
                        </span>
                        <span v-for="(sglItem, index) in bItem.sglDiscountList" :key="sglItem">
                          {{ sglItem.title }}
                        </span>
                      </div>
                      <div class="info-price"><span v-if="bItem.subInfo">{{ "$" +
                        bItem.salesPrice
                      }}</span>
                        <span v-else>{{ "$" + bItem.salesPrice }}</span>
                      </div>
                    </div>
                    <div name="商品Item" v-if="bItem.ItemType == 2" class="info-service"
                      @click="clickPdItem(bItem, bItem.Id)">
                      <div class="info-img"></div>
                      <div class="info-name">
                        <span class="fontBlack">{{ bItem.name }}</span>
                        <span>
                          <span v-if="bItem.managerInfo"> {{ bItem.managerInfo.nameView + " , " }}</span>
                          {{
                            bItem.quantity +
                            "個" + "," +
                            bItem.nickName

                          }}
                        </span>
                        <span v-for="(sglItem, index) in bItem.sglDiscountList" :key="sglItem">
                          {{ sglItem.title }}
                        </span>
                      </div>
                      <div class="info-price">
                        <span>{{ "$" + bItem.salesPrice }}</span>
                        <span class="fontBlack">{{ "x" + bItem.quantity }}</span>
                      </div>
                    </div>
                    <div name="儲值卡Item" v-if="bItem.ItemType == 3" class="info-service"
                      @click="clickPdItem(bItem, bItem.Id)">
                      <div class="info-img"></div>
                      <div class="info-name">
                        <span class="fontBlack">{{ bItem.name }}</span>
                        <span>
                          <span v-if="bItem.managerInfo"> {{ bItem.managerInfo.nameView + " , " }}</span>
                          {{ getLimitDay(bItem) + " , " + "面額$ " + bItem.tuViewPrice }}

                        </span>
                        <span v-for="(sglItem, index) in bItem.sglDiscountList" :key="sglItem">
                          {{ sglItem.title }}
                        </span>
                      </div>
                      <div class="info-price">
                        <span>{{ "$" + bItem.salesPrice }}</span>
                        <span class="fontBlack">{{ "x" + bItem.quantity }}</span>
                      </div>
                    </div>
                    <span class="p_error" v-if="!bItem.managerInfo">請選擇服務人員</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bill-add" name="按鈕" v-on:click="showItemMenuUIFn(true)">
              <span>&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新增結帳項目</span>
            </div>
            <span class="p_error" v-if="ruleItem.buyItem.is_error">
              {{ ruleItem.buyItem.warn }}
            </span>
            <div class="link-bottom"></div>
            <div name="備註" class="msg-add">
              <el-input v-model="formInputRef.memo" maxlength="1000" placeholder="請輸入備註" show-word-limit type="text" />
            </div>
            <div class="link-bottom"></div>
            <div name="其他項目" class="other-item">
              <span>其他項目</span>
              <div>
                <div class="discount-link">
                  <span class="name-link">全單折扣</span>
                  <span class="a-link" v-on:click="showRdAllDiscountFn(true)">新增折扣</span>
                </div>
                <div class="discount-btn">
                  <button v-for="(dItem, index) in formInputRef.allDiscount" :key="dItem"
                    @click="delDiscount(dItem.dType)">
                    <span>{{ dItem.title }}</span>
                    <img :src="icon_closeX" />
                  </button>
                </div>
              </div>
              <!-- <div>
                <span>優惠券</span>
              </div>
              <div>
                <span>儲值卡</span>
              </div> -->
            </div>
          </div>
        </div>
        <div class="right-main">
          <div>
            <div name="顧客" class="customer-btn" v-on:click="showMemberUIFn(true)">
              <img class="customer-img" :src="icon_customer" />
              <div>
                <span>{{ formInputRef.memberInfo.nameView }}</span>
                <span class="customer-phone">{{
                  formInputRef.memberInfo.phone
                }}</span>
              </div>
              <img :src="icon_right_arrow" />
            </div>
            <span class="p_error" v-if="ruleItem.name.is_error">
              {{ ruleItem.name.warn }}
            </span>
            <div class="customer-total">
              <span v-on:click="countCoustomerFn(-1)">-</span>
              <span class="customer-headcount">人數 {{ formInputRef.customerCount }} 位</span>
              <span v-on:click="countCoustomerFn(+1)">+</span>
            </div>
            <div class="link-bottom"></div>
            <div class="customer-msg">
              <div>
                <span>銷售總計</span>
                <span>{{ "$" + formInputRef.priceTotal }}</span>
              </div>
              <div v-for="(dItem, index) in allDCListCpt" :key="dItem">
                <span>{{ dItem.title }}</span>
                <!-- <span v-if="dItem.dType == 1">{{ "($ - " + Math.floor(dItem.discount * formInputRef.priceTotal) + ")" }}</span> -->
                <span v-if="dItem.dType == 1">{{ "($ - " + mathAllPercentFn(dItem) + ")" }}</span>
                <span v-if="dItem.dType == 2">{{ "($ - " + (dItem.discount) + ")" }}</span>
              </div>
            </div>
            <div class="link-bottom"></div>
            <div class="pay-msg">
              <span>應收金額</span>
              <span class="price-msg"> ${{ payAmountCpt }}</span>
            </div>
            <div class="customer-submit">
              <!-- <button class="otherpay-btn">其他收款方式</button> -->
              <div class="select-payType">
                <el-select :popper-append-to-body="false" placeholder="收款方式" popper-class="其他收款方式"
                  v-model="formInputRef.payTypeId" @change="changePayType()">
                  <el-option v-for="(item, index) in payTypeListRef" :key="index" :value="item.cotId"
                    :label="item.cotTitle">
                    <span> {{ item.cotTitle }}</span>
                  </el-option>
                </el-select>
              </div>
              <button class="cash-btn" @click="submitBtn()">確認</button>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-content"></div>
    </div>
  </div>
  <RdMemberUI v-if="showMemberUIRef" :selData="formInputRef.memberInfo" :showUIFn="showMemberUIFn"
    :getDataFn="getMembersFn" />
  <SelItemMenuUI v-if="showAddItemMenuUIRef" :selData="formInputRef" :showUIFn="showItemMenuUIFn"
    :getDataFn="getItemInfoFn" />
  <RdAllDiscountUI v-if="showRdAllDiscountUIRef" :selData="formInputRef.allDiscount" :getDataFn="getRdDiscountFn"
    :showRdDFn="showRdAllDiscountFn" />
  <EditItemServiceUI v-if="showEditItemServiceUIRef" :selData="selctItemInfoRef" :showUIFn="showEditSVInfoUIFn"
    :getDataFn="getEditSVInfoFn" :delDataFn="delItemFn" />
  <EditItemGoodsUI v-if="showEditItemGoodsUIRef" :selData="selctItemInfoRef" :showUIFn="showEditGdInfoUIFn"
    :getDataFn="getEditGdInfoFn" :delDataFn="delItemGdFn" />
  <EditItemTopUpUI v-if="showEditItemTopUpUIRef" :selData="selctItemInfoRef" :showUIFn="showEditTuInfoUIFn"
    :getDataFn="getEditTuInfoFn" :delDataFn="delItemGdFn" />
</template>

<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import icon_customer from "@/assets/images/icon_customer.png";
import icon_right_arrow from "@/assets/images/icon_right_arrow.png";
import icon_cancleItem from "@/assets/images/icon_cancleItem.png";
import { useApptStore } from "@/stores/apptStore";
import { storeToRefs } from "pinia";
import { TopUpLimitDay, checkVerify_all } from "@/utils/utils";
const props = defineProps<{
  showUIFn: Function;
  selData: any;
  //   formInfo: any;
  //   addDetailTypeID?: any;
}>();
let showMemberUIRef = ref(false);
let showAddItemMenuUIRef = ref(false);
let showRdAllDiscountUIRef = ref(false);
let showEditItemServiceUIRef = ref(false);
let showEditItemGoodsUIRef = ref(false);
let showEditItemTopUpUIRef = ref(false);
let selctItemInfoRef = ref(null);

let store = useApptStore();
let { payTypeListRef } = storeToRefs(store);
let { addCheckOutApi, getPayTypeListApi, getApptDataApi, getApptDataByUserApi } = store;

let formInputRef: any = ref({
  memberInfo: { nameView: "顧客", phone: "請選擇顧客" },
  customerCount: 1,
  memo: "",
  payTypeId: 1,
  priceTotal: 0,
  percentAllDC: null,
  priceAllDC: null,
  buyItemsList: [],
  allDiscount: [],
});

let subTab = [
  {
    id: 0,
    name: "無子項目",
  },
  {
    id: 1,
    name: "多項子項目",
  },
];


onBeforeFn();
function onBeforeFn() {
  getPayTypeListFn()

  if (props.selData == '快速結帳') {
    console.log(111, props.selData);

  } else {
    formInputRef.value.memberInfo = props.selData.memberInfo;
    // getApptDataApi("", props.selData.bkListNo).then((res) => {
    //   for (let i = 0; i < res.length; i++) {
    //     const element = res[i];
    //     element.serviceInfo.managerInfo=element.managerInfo
    //     getItemInfoFn({ selectService: element.serviceInfo })
    //   }
    // });

    getApptDataByUserApi(props.selData.memberInfo.userId, props.selData.dateBooking).then((res) => {
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        element.serviceInfo.managerInfo = element.managerInfo
        getItemInfoFn({ selectService: element.serviceInfo })
      }
    });
  }
}
onMounted(() => {
  // console.log('onMounted');
});
function getPayTypeListFn(id: any = 0) {
  getPayTypeListApi(id).then((res: any) => {
  });
}

let payAmountCpt = computed(() => {
  let curPrice = formInputRef.value.priceTotal;
  let dcPrice = 0;
  for (let i = 0; i < formInputRef.value.allDiscount.length; i++) {
    const element = formInputRef.value.allDiscount[i];
    if (element.dType == 1 || element.dType == 3) {
      dcPrice += Math.floor(mathAllPercentFn(element))
    } else {
      dcPrice += element.discount
    }
  }

  let amount = (curPrice < dcPrice) ? 0 : (curPrice - dcPrice)
  return amount
});
let allDCListCpt = computed(() => {
  return formInputRef.value.allDiscount
});
let percentPriceCpt = computed(() => {
  let curprice = formInputRef.value.priceAllDC ? formInputRef.value.priceAllDC.discount : 0;
  return (
    curprice
  )
});
//計算全單折扣排除單品折扣(%數折扣)
function mathAllPercentFn(params: any) {
  let curP = 0;
  if (params.dType == 1) {
    for (let i = 0; i < formInputRef.value.buyItemsList.length; i++) {
      const element = formInputRef.value.buyItemsList[i];
      let havePercent = false;
      let cMinus = 0;
      if (element.sglDiscountList)
        for (let j = 0; j < element.sglDiscountList.length; j++) {
          const sdList = element.sglDiscountList[j];
          if (sdList.dType == 3) {
            havePercent = true;
          } else {
            cMinus += sdList.discount;
          }
        }
      //無單品折扣
      if (!havePercent) {
        curP += Math.floor(params.discount * (element.price - cMinus))
      }
    }
  }
  return curP
}

function showMemberUIFn(state: boolean) {
  showMemberUIRef.value = state;
}
function showItemMenuUIFn(state: boolean) {
  showAddItemMenuUIRef.value = state;
}
function showRdAllDiscountFn(state: boolean) {
  showRdAllDiscountUIRef.value = state;
}
function getRdDiscountFn(data: any) {
  let curAllDiscount = [];
  for (let i = 0; i < formInputRef.value.allDiscount.length; i++) {
    const element = formInputRef.value.allDiscount[i];
    if (element.dType != data.dType) {
      curAllDiscount.push(element)
    }
  }
  curAllDiscount.push(data);
  formInputRef.value.allDiscount = curAllDiscount;
  showRdAllDiscountFn(false);
}
function delDiscount(type: any) {
  let curAllDiscount = [];
  for (let i = 0; i < formInputRef.value.allDiscount.length; i++) {
    const element = formInputRef.value.allDiscount[i];
    if (element.dType != type) {
      curAllDiscount.push(element)
    }
  }
  formInputRef.value.allDiscount = curAllDiscount;
}
function getMembersFn(data: any) {
  formInputRef.value.memberInfo = data;
  showMemberUIFn(false);
}
function countCoustomerFn(data: number) {
  if (formInputRef.value.customerCount + data > 0)
    formInputRef.value.customerCount += data;
}

function getItemInfoFn(data: any) {
  //itemType  -   1:服務 2:商品 3:儲值卡
  let curItemData = null;
  let odDetail: any = {};
  if (data.selectService) {
    curItemData = data.selectService
    odDetail.ItemType = 1;
    odDetail.Id = curItemData.sId;
    odDetail.name = curItemData.name;
    odDetail.nickName = curItemData.nickName;
    odDetail.price = curItemData.price;
    odDetail.timer = curItemData.servicesTime;
    if (curItemData.subInfo) {
      odDetail.subId = curItemData.subInfo.subId
      odDetail.price = curItemData.subInfo.price;
      odDetail.timer = curItemData.subInfo.servicesTime;
    } else {
      odDetail.subId = 0;
      odDetail.price = curItemData.price;
      odDetail.timer = curItemData.servicesTime;
    }
    odDetail.subInfo = curItemData.subInfo;
    odDetail.color = curItemData.color;
  }
  if (data.selectGood) {
    curItemData = data.selectGood

    odDetail.ItemType = 2;
    odDetail.Id = curItemData.pId;
    odDetail.name = curItemData.pName;
    odDetail.nickName = curItemData.pCode;
    odDetail.price = curItemData.price;
    odDetail.timer = 0;
    odDetail.subId = 0;
    odDetail.subInfo = null;
    odDetail.stock = curItemData.stock;
    odDetail.color = "";
  }
  if (data.selectTopUp) {
    curItemData = data.selectTopUp

    odDetail.ItemType = 3;
    odDetail.Id = curItemData.tuId;
    odDetail.name = curItemData.tuTitle;
    odDetail.nickName = "";
    odDetail.tuLimitType = curItemData.tuLimitType;
    odDetail.timer = curItemData.tuLimitDay;
    odDetail.subId = 0;
    odDetail.subInfo = null;
    odDetail.stock = 0;
    odDetail.color = curItemData.color;
    odDetail.price = curItemData.tuViewPrice;
    odDetail.tuViewPrice = curItemData.tuViewPrice;
  }
  odDetail.managerInfo = curItemData.managerInfo;
  odDetail.salesPrice = odDetail.price;
  odDetail.stock = 0;
  odDetail.quantity = 1;
  odDetail.isManual = null;
  odDetail.percentSgDC = null;

  formInputRef.value.buyItemsList.push(odDetail);
  updataPrice();
}
function updataPrice() {
  let priceTotal = 0;
  for (let i = 0; i < formInputRef.value.buyItemsList.length; i++) {
    const element = formInputRef.value.buyItemsList[i];
    if (element.ItemType == 2) {
      priceTotal += element.salesPrice;
    } else if (element.ItemType == 1) {
      priceTotal += element.salesPrice;
    } else if (element.ItemType == 3) {
      priceTotal += element.salesPrice;
    }
  }
  formInputRef.value.priceTotal = priceTotal;
}
function showEditGdInfoUIFn(state: any) {
  showEditItemGoodsUIRef.value = state;
}

function showEditTuInfoUIFn(state: any) {
  showEditItemTopUpUIRef.value = state;
}

function getEditGdInfoFn(data: any) {
  for (let i = 0; i < formInputRef.value.buyItemsList.length; i++) {
    const element = formInputRef.value.buyItemsList[i];
    if (element.Id == data.Id && element.ItemType == data.ItemType) {
      element.managerInfo = data.managerInfo;
      element.quantity = data.quantity;
      element.sglDiscountList = data.sglDiscountList;
      setSglDiscountItem(element);
      break;
    }
  }
  updataPrice();
  showEditGdInfoUIFn(false);
}
function getEditTuInfoFn(data: any) {
  for (let i = 0; i < formInputRef.value.buyItemsList.length; i++) {
    const element = formInputRef.value.buyItemsList[i];
    if (element.Id == data.Id && element.ItemType == data.ItemType) {
      element.managerInfo = data.managerInfo;
      element.quantity = data.quantity;
      element.sglDiscountList = data.sglDiscountList;
      setSglDiscountItem(element);
      break;
    }
  }
  updataPrice();
  showEditGdInfoUIFn(false);
}
function setSglDiscountItem(params: any) {
  let curPercent = 0;
  let curMinus = 0;
  for (let i = 0; i < params.sglDiscountList.length; i++) {
    const element = params.sglDiscountList[i];
    if (element.dType == 3) {
      curPercent = Math.floor(params.price * element.discount);
    }
  }
  for (let i = 0; i < params.sglDiscountList.length; i++) {
    const element = params.sglDiscountList[i];
    if (element.dType == 4) {
      curMinus = (element.discount);
    }
  }
  if (params.price > (curPercent + curMinus))
    params.salesPrice = params.price - (curPercent + curMinus);
  else
    params.salesPrice = 0

  return params.salesPrice;
}
//刪除商品
function delItemGdFn(data: any) {
  for (let i = 0; i < formInputRef.value.buyItemsList.length; i++) {
    const element = formInputRef.value.buyItemsList[i];
    if (element.Id == data.Id && element.ItemType == data.ItemType) {
      formInputRef.value.buyItemsList.splice(i, 1);
      break;
    }
  }
  updataPrice();
  showEditGdInfoUIFn(false);
}

function showEditSVInfoUIFn(state: any) {
  showEditItemServiceUIRef.value = state;
}
function getEditSVInfoFn(data: any) {
  for (let i = 0; i < formInputRef.value.buyItemsList.length; i++) {
    const element = formInputRef.value.buyItemsList[i];
    if (element.Id == data.Id && element.ItemType == data.ItemType) {
      element.managerInfo = data.managerInfo;
      element.sglDiscountList = data.sglDiscountList;
      setSglDiscountItem(element);
      break;
    }
  }
  updataPrice();
  showEditSVInfoUIFn(false);
}
function delItemFn(data: any) {
  for (let i = 0; i < formInputRef.value.buyItemsList.length; i++) {
    const element = formInputRef.value.buyItemsList[i];
    if (element.Id == data.Id && element.ItemType == data.ItemType) {
      formInputRef.value.buyItemsList.splice(i, 1);
      break;
    }
  }
  updataPrice();
  showEditSVInfoUIFn(false);
}
function clickSvItem(params: any, id: any) {
  selctItemInfoRef.value = params;
  showEditSVInfoUIFn(true);
}
function clickPdItem(params: any, id: any) {
  selctItemInfoRef.value = params;
  if (params.ItemType == 1) {
    showEditSVInfoUIFn(true);
  } else if (params.ItemType == 2) {
    showEditGdInfoUIFn(true);
  } else if (params.ItemType == 3) {
    showEditGdInfoUIFn(true);
  }
}
function cancleServiceFn(item: any, index: number) {
  formInputRef.value.buyServicesGroup.splice(index, 1);
}
function cancleGoodsFn(item: any, index: number) {
  formInputRef.value.buyGoodsGroup.splice(index, 1);
}

function submitBtn() {
  console.log("結帳確認", formInputRef.value);
  ruleLists.ruleItem.name.value = formInputRef.value.memberInfo.userId;
  ruleLists.ruleItem.buyItem.value = formInputRef.value.buyItemsList.length;

  let checkManager = true;
  for (let i = 0; i < formInputRef.value.buyItemsList.length; i++) {
    const element = formInputRef.value.buyItemsList[i];
    if (!element.managerInfo)
      checkManager = false;
  }
  ruleLists.ruleItem.buyItemManager.value = checkManager;

  if (!checkVerify_all(ruleLists)) return;

  let formData: any = formInputRef.value;
  let apiData: any = {};
  apiData.COCustomerCount = formData.customerCount;
  apiData.COBuyItemsList = formData.buyItemsList;
  apiData.COMemberId = formData.memberInfo.userId;
  apiData.payTypeId = formData.memberInfo.payTypeId;
  apiData.COMemo = formData.memo;
  apiData.COTotalPrice = formData.priceTotal;
  apiData.COAllDCList = formInputRef.value.allDiscount;
  apiData.COAmount = payAmountCpt.value;

  /**新增結帳 */
  addCheckOutApi(apiData).then((res: any) => {
    if (res.state == 1) {
      setTimeout(() => {
        props.showUIFn(false);
      }, 1000);
    }
  });
}

function getLimitDay(params: any) {
  let curLimitDay = "不限期"
  if (params.tuLimitType != 0) {
    let limitDays = TopUpLimitDay;
    for (let i = 0; i < limitDays.length; i++) {
      const element = limitDays[i];
      if (params.timer == element.value) {
        curLimitDay = element.label;
      }
    }
  }
  return curLimitDay
}
function changePayType() {
  // formInputRef.value.subType = formInputRef.value.subType == 0 ? 1 : 0;
}
//#region 規則

const ruleLists: any = reactive({
  ruleItem: {
    name: {
      label: "名稱",
      component: "input",
      type: "number",
      is_readonly: false,
      value: "",
      rules: {
        required: {
          warn: "此項為必填",
        },
      },
      is_error: false,
      warn: "",
      is_show: true,
    },
    buyItem: {
      label: "購買項目",
      component: "input",
      type: "number",
      is_readonly: false,
      value: "",
      rules: {
        required: {
          warn: "此項為必填",
        },
      },
      is_error: false,
      warn: "",
      is_show: true,
    },
    buyItemManager: {
      label: "購買項目服務人員",
      component: "input",
      type: "number",
      is_readonly: false,
      value: "",
      rules: {
        required: {
          warn: "此項為必填",
        },
      },
      is_error: false,
      warn: "",
      is_show: true,
    },
  },
});
let { ruleItem } = toRefs(ruleLists);
//#endregion


</script>

<style scoped lang="scss">
.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1003;
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

    .header-content {
      display: flex;
      height: 70px;
      border: solid 1px #ddd;
      box-sizing: border-box;

      >span {
        display: flex;
        width: calc(100%);
        justify-content: center;
        align-items: center;
        font-size: 30px;
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
    }

    .main-content {
      display: flex;
      height: calc(100% - 70px);

      .left-bg {
        width: 60%;
        height: 100%;
        border-right: solid 0.5px #ddd;
        box-sizing: border-box;
        overflow-y: auto;

        .left-main {
          width: 90%;
          margin-left: 5%;
          margin-top: 15px;
          height: 85%;
          // border-right: solid 0.5px #ddd;
          box-sizing: border-box;
          overflow-y: auto;

          >div {
            width: 100%;
            margin-top: 15px;
          }

          .form-item {
            width: 98%;
            margin-left: 1%;

            >span {
              display: flex;
              width: 100%;
              justify-content: center;
              align-items: center;
              height: 40px;
            }

            >div {
              // display: flex;
              width: 100%;
              justify-content: center;

              .info-list {
                height: 40%;

                .content-box {
                  max-height: 300px;
                  display: block;
                  margin-top: 10px;

                  P {
                    text-align: left;
                    font-weight: bold;
                    color: #717171;
                    font-size: 20px;
                  }

                  >div {
                    border: solid 1px #707070;
                    background-color: #e6e2de;
                    border-radius: 10px;

                    P {
                      //margin: 0 0 5px 0;
                    }
                  }

                  .info-service {
                    display: flex;
                    width: 100%;
                    min-height: 80px;
                    align-items: center;

                    .head-shot {
                      position: relative;
                      width: 15%;
                    }

                    >div {
                      height: 80%;
                      // padding-left: 30px;
                      display: grid;
                      align-items: center;

                      >span {
                        // height: 50%;
                        justify-content: left;
                        display: flex;
                        font-family: STXihei;
                        font-size: 20px;
                        color: #717171;
                        font-weight: bold;
                      }
                    }

                    .info-img {
                      width: 30px;
                    }

                    .info-name {
                      flex: auto;
                    }

                    .fontBlack {
                      color: #000000;
                    }

                    .info-price {
                      width: 100px;
                      margin-right: 10px;

                      >span {
                        width: 100%;
                        display: flex;
                        justify-content: right;
                      }
                    }
                  }
                }
              }

              >table {
                // display: flex;
                width: 100%;

                >thead {
                  background-color: #c1bdb8;
                  color: #877059;

                  >tr>th:nth-child(1) {
                    width: 70%;
                  }

                  >tr>th:nth-child(2) {
                    width: 20%;
                  }

                  >tr>th:nth-child(3) {
                    width: 10%;
                  }
                }

                >tbody {
                  border-bottom: 1px solid #877059;

                  >tr>td:nth-child(1) {
                    width: 70%;
                  }

                  >tr>td:nth-child(2) {
                    width: 20%;
                  }

                  >tr>th:nth-child(3) {
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

          .other-item {
            display: grid;
            width: 100%;

            >div {
              display: grid;
              align-items: center;
              margin-left: 5%;
              width: calc(100% - 5%);
              // height: 60px;
              border-bottom: solid 0.5px #ddd;
              box-sizing: border-box;


              .discount-link {
                display: flex;
                justify-content: space-between;

                .name-link {
                  display: flex;
                  height: 60px;
                  align-items: center;
                  font-size: 24px;
                }

                .a-link {
                  display: flex;
                  height: 60px;
                  align-items: center;
                  color: #00b7ff;
                  font-size: 18px;
                }
              }

              .discount-btn {
                display: flex;
                // height: 30px;

                >button {
                  display: flex;
                  align-items: center;
                  margin-right: 5px;
                  border: 0px;
                  background-color: #717171;

                  >span {
                    display: flex;
                    padding: 0 5px;
                    align-items: center;
                    color: #fff;

                    border-right: solid 0.5px #ddd;
                  }

                  >img {
                    width: 20px;
                    height: 20px;
                    padding: 0 5px;
                  }
                }
              }
            }
          }
        }
      }

      .right-main {
        display: flex;
        flex-flow: column;
        width: 40%;
        height: 100%;
        margin: 0;

        >div {
          display: flex;
          height: 100%;
          width: 90%;
          margin-left: 5%;
          // margin-top: 5%;
          flex-flow: column;

          >div {
            // height: 100%;
            width: 100%;
            // width: 90%;
            // margin-left: 5%;
            margin-top: 3%;
          }

          .customer-btn {
            display: flex;
            width: 100%;
            height: 80px;
            background-color: #faf9f8;
            align-items: center;
            border-radius: 5px;

            >div {
              width: calc(100% - 50px);
              height: 100%;

              >span {
                display: flex;
                height: 40px;
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

            >img {
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

            >span {
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
            box-sizing: border-box;

            >div {
              display: block;
              display: flex;
              justify-content: space-between;
              margin-top: 2%;
            }
          }

          .pay-msg {
            display: flex;
            justify-content: space-between;
            // height: 60px;

            .price-msg {
              font-size: 35px;
            }

          }

          .customer-submit {
            height: 70px;
            display: flex;
            justify-content: center;
            border-top: solid 0.5px #ddd;
            box-sizing: border-box;

            .select-payType {
              width: calc(180px);
              display: flex;
              align-items: center;
              justify-content: center;

              .el-select {
                width: 100%;
                border-radius: 8px;

                :deep(.el-input__inner) {
                  &::placeholder {
                    color: #717171;
                  }

                  text-align: center;
                }

                :deep(.el-input__wrapper) {
                  width: 100%;
                  font-size: 20px;
                  height: 50px;
                  border-radius: 8px;
                  border: 2px solid #717171;
                  box-sizing: border-box;

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
    }

    .footer-content {
      display: flex;
    }
  }
}

.link-bottom {
  opacity: 0.5;
  width: 90%;
  height: 2px;
  background-color: #707070;
}

.p_error {
  color: #fc0505;
  width: 100%;
  font-size: 16px;
}
</style>
