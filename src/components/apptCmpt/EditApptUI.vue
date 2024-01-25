<template>
  <div class="popup-mask" v-on:click.self="showEditApptFn(false)">
    <div class="popup-content">
      <div class="header-content">
        <img :src="icon_closeX" v-on:click="showEditApptFn(false)" />
        <span>編輯預約</span>
      </div>
      <div class="main-content">
        <div class="left-main">
          <div class="input-box">
            <div class="input-date" name="日期">
              <input type="date" v-model="formInputRef.selDate" />
            </div>
            <div class="link-bottom"></div>
            <div class="input-service" name="服務">
              <input type="time" v-model="formInputRef.timeBooking" />
              <span class="p_error" v-if="ruleItem.timeBooking.is_error">
                {{ ruleItem.timeBooking.warn }}
              </span>
              <div class="service-item" v-for="(item, index) in formInputRef.courses" :key="item"
                v-on:click="showItemTypeFn(1)">
                <!-- <img class="service-img" :src="icon_customer" /> -->
                <div>
                  <div class="title-main">
                    <span>{{ item.name }}</span>
                    <span class="service-price" v-if="item.subInfo">{{ " $ " + item.subInfo.price }}</span>
                    <span class="service-price" v-else>{{ " $ " + item.price }}</span>
                  </div>
                  <div class="time-main" v-if="item.subInfo">
                    <span v-if="formInputRef.isAssign">{{ formInputRef.managerInfo.nameView + " , " }}</span>
                    <span v-else>{{ "不指定(" + formInputRef.oldManagerInfo.nameView + ") , " }}</span>
                    <span>{{
                      item.subInfo.servicesTime + " 分 "
                    }}</span>
                    <span>{{
                      " , " + item.subInfo.name
                    }}</span>
                  </div>
                  <div class="time-main" v-else>
                    <span v-if="formInputRef.isAssign">{{ formInputRef.managerInfo.nameView + " , " }}</span>
                    <span v-else>{{ "不指定 , " }}</span>
                    <span>{{
                      item.servicesTime + " 分 "
                    }}</span>
                  </div>
                </div>
                <!-- <img class="delete_img" :src="icon_cancleItem" @click="cancleServiceFn(item, index)" /> -->
              </div>
            </div>
            <!-- <div class="bill-add" name="新增服務" v-on:click="showItemTypeFn(1)">
              <span>&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新增結帳項目</span>
            </div> -->
            <span class="p_error" v-if="ruleItem.lessonItem.is_error">
              {{ ruleItem.lessonItem.warn }}
            </span>
            <div class="link-bottom"></div>
            <div class="msg-add" name="備註">
              <el-input v-model="formInputRef.bookingMemo" maxlength="1000" placeholder="請輸入備註" show-word-limit
                type="text" />
            </div>
            <div class="link-bottom"></div>
          </div>

        </div>
        <div class="right-main">
          <div class="customer-btn" name="芳療師" v-on:click="showManagerUIFn(true)">
            <img class="customer-img" :src="icon_customer" />
            <div>
              <span>{{ formInputRef.managerInfo.nameView }}</span>
              <span class="customer-phone">{{
                formInputRef.managerInfo.phone
              }}</span>
            </div>
            <img :src="icon_right_arrow" />
          </div>
          <div class="customer-btn" name="顧客" v-on:click="showMemberUIFn(true)">
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
            <span class="customer-headcount">人數 {{ formInputRef.customerTotal }} 位</span>
            <span v-on:click="countCoustomerFn(+1)">+</span>
          </div>
          <div class="link-bottom"></div>
          <div class="customer-msg">
            <div>
              <!-- <span>總計</span>
              <span>{{ formInputRef.priceTotal }}</span> -->
            </div>
          </div>
          <div class="customer-submit">
            <button class="submit-btn" @click="submitBtn()">確認修改</button>
          </div>
        </div>
      </div>
      <div class="footer-content"></div>
    </div>
  </div>
  <!-- <MemberRadioUI v-if="showMemberUIRef" :selData="formInputRef.memberInfo" :showUIFn="showMemberUIFn"
    :getDataFn="getMembersFn" /> -->
  <SelItemMenuUI v-if="showAddItemMenuUIRef" :selData="formInputRef" :showUIFn="showItemMenuUIFn"
    :getDataFn="getItemInfoFn" />
  <RadioServicesUI v-if="showRServicesRef" :selData="formInputRef.selSId" :getDataFn="getRadioSListFn"
    :showServiceUIFn="showItemTypeFn">
  </RadioServicesUI>
  <RdManagerUI v-if="showRdManagerRef" :selData="formInputRef.managerInfo" :getDataFn="getRdManagerFn"
    :showManagerUIFn="showManagerUIFn">
  </RdManagerUI>
  <RdMemberUI v-if="showMemberUIRef" :selData="formInputRef.memberInfo" :showUIFn="showMemberUIFn"
    :getDataFn="getMembersFn" />
</template>

<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import icon_customer from "@/assets/images/icon_customer.png";
import icon_right_arrow from "@/assets/images/icon_right_arrow.png";
import icon_cancleItem from "@/assets/images/icon_cancleItem.png";
import { checkVerify_all, formatZeroDate } from "@/utils/utils";
import { useManagerStore } from "@/stores/manager";
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
const props = defineProps<{
  showEditApptFn: Function;
  oldSelList: any;
  //   addDetailTypeID?: any;
}>();
let showMemberUIRef = ref(false);
let showAddItemMenuUIRef = ref(false);
let showRServicesRef = ref(false);
let showRdManagerRef = ref(false);

const managerStore = useManagerStore();
const { getWorkingHours } = managerStore;
const { workingHoursList } = storeToRefs(managerStore);

let store = useApptStore();
const { postEditApptDataApi, getApptDataApi } = store;
let { memberList, timeGroup, serviceDetailList } =
  storeToRefs(store);

let noManagerInfo = { managerId: 0, nameView: "芳療師", phone: "請選擇芳療師" };
let formInputRef: any = ref({
  memberId: null,
  timeBooking: "",
  courses: [],
  selDate: "",
  selSId: 0,
  memberInfo: { userId: 0, nameView: "顧客", phone: "請選擇顧客" },
  isAssign: false,
  managerInfo: noManagerInfo,
  customerTotal: 1,
  bookingMemo: "",
  priceTotal: 0,

  buyServicesGroup: [],
  buyGoodsGroup: [],
  oldManagerInfo: [],
});
onBefore();
function onBefore() {
  // getManagerListApi(0, 5);
  formInputRef.value.courses = []
  getApptDataApi(props.oldSelList.bookingNo).then((res: any) => {
    let resData = res[0];
    //格式化
    resData.serviceInfo.subList = [];
    if (resData.subList)
      resData.serviceInfo.subList.push(res.subList);
    formInputRef.value.memberId = resData.userId;
    formInputRef.value.timeBooking = resData.dateBooking.split("T")[1].split(":")[0] + ":" +
      resData.dateBooking.split("T")[1].split(":")[1];
    formInputRef.value.memberId = resData.userId;
    formInputRef.value.selDate = resData.dateBooking.split("T")[0];
    formInputRef.value.selSId = resData.lessonId;
    formInputRef.value.bookingMemo = resData.bookingMemo ? res.bookingMemo : "";
    formInputRef.value.courses.push(resData.serviceInfo)
    formInputRef.value.bookingNo = resData.bookingNo;
    formInputRef.value.memberInfo = resData.memberInfo;
    formInputRef.value.isAssign = resData.isAssign;
    formInputRef.value.managerInfo = resData.isAssign ? resData.managerInfo : noManagerInfo;
    formInputRef.value.oldManagerInfo = resData.managerInfo;
  })

}
onMounted(() => {
  // console.log('onMounted');
});

function getNowDay() {
  let datetime = new Date();
  let year = formatZeroDate(datetime.getFullYear());
  let month = formatZeroDate(datetime.getMonth() + 1);
  let date = formatZeroDate(datetime.getDate());
  return `${year}-${month}-${date}`;
}

function showMemberUIFn(state: boolean) {
  showMemberUIRef.value = state;
}
function showItemMenuUIFn(state: boolean) {
  showAddItemMenuUIRef.value = state;
}
function getMembersFn(data: any) {
  formInputRef.value.memberInfo = data;
  showMemberUIFn(false);
}
function countCoustomerFn(data: number) {
  if (formInputRef.value.customerTotal + data > 0)
    formInputRef.value.customerTotal += data;
}
function submitBtn() {
  ruleLists.ruleItem.name.value = formInputRef.value.memberInfo.userId;
  ruleLists.ruleItem.timeBooking.value = formInputRef.value.timeBooking;

  ruleLists.ruleItem.lessonItem.value =
    formInputRef.value.courses.length > 0
      ? formInputRef.value.courses[0].name
      : null;

  // if (!verify_all()) return;
  if (!checkVerify_all(ruleLists)) return;

  //判斷是否與休息時間重疊
  for (let i = 0; i < workingHoursList.value.data.length; i++) {
    const element = workingHoursList.value.data[i];
    if (element.managerId == formInputRef.value.memberId) {
    }
  }
  console.log('000', formInputRef.value.courses);

  let courseListData = [];
  for (let i = 0; i < formInputRef.value.courses.length; i++) {
    const element = formInputRef.value.courses[i];
    courseListData.push({
      listNo: i + 1,
      lid: element.sId,
      time: element.servicesTime,
      bookingNo: "",
      price: element.price,
      discount: element.discount ? element.discount : 0,
      subId: element.subId,
    });
  }

  let curService = formInputRef.value.courses[0];
  console.log(111, formInputRef.value);
  let editApptDate = {
    bookingNo: props.oldSelList.bookingNo,
    bkListNo: props.oldSelList.bkListNo,
    userId: formInputRef.value.memberInfo.userId,
    lessonId: curService.sId,
    subId: curService.subInfo ? curService.subInfo.subId : 0,
    timer: curService.subInfo ? curService.subInfo.servicesTime : curService.servicesTime,
    price: curService.price,
    isAssign: formInputRef.value.isAssign,
    managerId: formInputRef.value.managerInfo.managerId == 0 ? formInputRef.value.oldManagerInfo.managerId : formInputRef.value.managerInfo.managerId,
    dateBooking:
      formInputRef.value.selDate + "  " + formInputRef.value.timeBooking,
    tradeDone: props.oldSelList.tradeDone,
    state: props.oldSelList.state == 99 ? 0 : props.oldSelList.state,
    discount: props.oldSelList.discount,
    bookingMemo: formInputRef.value.bookingMemo,
  };
  console.log(222, editApptDate);

  // 修改預約
  postEditApptDataApi(editApptDate).then((res: any) => {
    let resData = res;
    if (resData.state == 1) {
      props.showEditApptFn(false);
    }
  });
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
  formInputRef.value.courses.splice(index, 1);
}
function getRadioSListFn(data: any) {
  console.log(data, "獲取getRadioSListFn");
  showItemTypeFn(0);
  if (data.subList.length > 0) {
    data.subInfo = data.subList[0];
  }
  formInputRef.value.courses = [];
  formInputRef.value.courses.push(data);
}

function showItemTypeFn(type: number) {
  showRServicesRef.value = type == 1;
}
function showManagerUIFn(type: boolean) {
  showRdManagerRef.value = type;
}
function getRdManagerFn(data: any) {
  console.log(data, "獲取getRadioSListFn");
  showManagerUIFn(false);

  if (data) {
    formInputRef.value.isAssign = true;
    formInputRef.value.managerInfo = data;
  }
  else {
    formInputRef.value.isAssign = false;
    formInputRef.value.managerInfo = noManagerInfo;
  }
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
    timeBooking: {
      label: "時程",
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
    lessonItem: {
      label: "課程",
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

      .left-main {
        width: 60%;
        height: 100%;
        border-right: solid 0.5px #ddd;
        box-sizing: border-box;
        overflow-y: auto;

        .input-box {
          width: 90%;
          margin-left: 5%;
          margin-top: 15px;

          >div {
            // padding: 5px;
          }

          .form-item {
            width: 90%;

            >span {
              display: flex;
              width: 100%;
              justify-content: center;
              align-items: center;
              height: 40px;
            }

            >div {
              display: flex;
              width: 100%;
              justify-content: center;
            }

            .link-btn {
              color: #b89087;
            }
          }


          .input-service {
            >input {
              width: 178px;
              height: 30px;
              text-align: center;
              border-radius: 6px;
              border: solid 1px #707070;
            }

            .service-item {
              display: flex;
              width: calc(100% - 20px);
              height: 80px;
              background-color: #faf9f8;
              align-items: center;
              border-radius: 5px;
              padding: 10px;
              margin-bottom: 10px;

              >div {
                width: calc(100% - 20px);
                height: 100%;
                margin-left: 10%;

                >span {
                  display: flex;
                  height: 70%;
                  align-items: center;
                  font-size: 24px;
                }

                .time-main {
                  height: 40%;
                  display: flex;

                  >span {
                    color: #8a8a8a;
                    font-size: 18px;
                    font-size: 20px;
                  }
                }

                .title-main {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  height: 60%;

                  >span {
                    display: flex;
                    height: 70%;
                    align-items: center;
                    font-size: 24px;
                  }

                  .service-price {

                    font-size: 20px;
                    color: #8a8a8a;
                  }
                }

              }

              >img {
                width: 20px;
                height: 20px;
                margin: 10px;
              }

              .service-img {
                width: 33px;
                height: 39px;
              }

            }
          }

          .input-date {
            display: flex;
            width: 99%;
            height: 40px;
            justify-content: left;
            font-size: 20px;
            font-family: HeitiTC;
            color: #84715c;
            font-weight: bold;
            margin-bottom: 10px;
            // border-bottom: solid 2px #707070;


            >input {
              width: 178px;
              height: 30px;
              text-align: center;
              border-radius: 6px;
              border: solid 1px #707070;
            }
          }

          .bill-add {
            height: 60px;
            background-color: #faf9f8;
            display: flex;
            align-items: center;
            margin: 10px 0;
            // border-bottom: solid 2px #707070;
          }

          .msg-add {
            height: 40px;
            margin-bottom: 10px;
            // border-bottom: solid 2px #707070;

            // background-color: #faf9f8;
            :deep(.el-input__inner) {
              background-color: #ffffff;
              font-size: 18px;
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

        .customer-btn {
          display: flex;
          width: 90%;
          height: 80px;
          background-color: #faf9f8;
          align-items: center;
          border-radius: 5px;

          >div {
            width: calc(100% - 50px);
            height: 100%;

            >span {
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

        >span {
          margin-left: 5%;
          width: 90%;
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
          // border-top: solid 0.5px #ddd;
          box-sizing: border-box;

          >div {
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

          .submit-btn {
            position: relative;
            width: 80%;
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

    .footer-content {
      display: flex;
    }
  }
}

.link-bottom {
  // padding: 0 5px;
  opacity: 0.5;
  margin: auto;
  width: 100%;
  height: 2px;
  background-color: #707070;
  margin: 10px 0;
}

.p_error {
  color: #fc0505;
  width: 100%;
  font-size: 16px;
}
</style>
