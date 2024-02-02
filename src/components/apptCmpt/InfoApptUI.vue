<template>
  <div class="popup-InfoApptUI" v-on:click.self="showUIHdr(false)">
    <div>
      <div class="info-head">
        <div class="info-img">
          <img :src="closeIcon" v-on:click="showUIHdr(false)" />
          <img v-if="simpleView" />
        </div>
        <div class="link-bottom"></div>
      </div>
      <div class="content">
        <div class="info-content">
          <div class="info-user">
            <span>{{ weekDayCpt }}</span>
            <h1>{{ dateCpt }}</h1>
            <div class="info-guest">
              <img class="head-shot" :src="Icon" />
              <div>
                <span>{{ memberDataCpt.nameView }}</span>
                <span>{{ memberDataCpt.phone }}</span>
              </div>
            </div>
          </div>
          <div class="info-edit">
            <div class="list_btn">
              <button :class="{
                finish: selItemData.state == 1 || selItemData.state == 4,
              }" @click="infoBtnState(2)">
                編輯預約
              </button>
              <button :class="{
                finish: selItemData.state == 1 || selItemData.state == 4,
              }" @click="infoBtnState(3)">
                刪除預約
              </button>
            </div>
            <div class="grey-guest">
              <div class="grey-box">
                <span v-if="formInputRef.bookingList.length > 0">人數{{ formInputRef.bookingList[0].customerCount }}位</span>
              </div>
            </div>
            <div class="list_btn">
              <button :class="{
                finish: selItemData.state == 1 || selItemData.state == 4,
              }" @click="infoBtnState(1)">
                預約完成
              </button>
              <!-- <button :class="{
                finish: selItemData.state == 1 || selItemData.state == 4,
              }" @click="infoBtnState(4)">
                未出席
              </button> -->
            </div>
          </div>
          <div class="link-bottom"></div>
          <div class="info-list">
            <div class="content-box" v-for="(item, index) in  formInputRef.bookingList " :key="item">
              <span class="time-service">{{ item.dateBooking.split("T")[1].split(":")[0] + " : "
                + item.dateBooking.split("T")[1].split(":")[1] }}
                <!-- <span v-if="item.bookingNo == props.selItemData.bookingNo">(選擇)</span> -->
              </span>
              <div class="info-service">
                <img class="head-shot" />
                <div>
                  <span class="name-service">{{ item.serviceInfo.name }}</span>
                  <div>
                    <span v-if="!item.isAssign"> 不指定 </span>
                    <span v-if="!item.isAssign">(</span>
                    <span>{{ item.managerInfo.nameView }}</span>
                    <span v-if="!item.isAssign">)</span>
                    <span v-if="item.serviceInfo.subInfo">
                      {{ "," + item.serviceInfo.subInfo.servicesTime + "分 ," + item.serviceInfo.subInfo.name }}
                    </span>
                    <span v-else>{{ "," + item.serviceInfo.servicesTime + "分" }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="link-bottom"></div>
        <div class="content-checkoutbtn" v-if="formInputRef.bookingList.length > 0">
          <!-- <span>結帳</span> -->
          <button v-if="formInputRef.bookingList[0].state != 4" @click="showCheckOutUIHdr(true)">結帳</button>
          <button v-else @click="showOrderInfoFn(true)">查看結帳明細</button>
        </div>
      </div>

    </div>
  </div>
  <FastCheckOutUI v-if="showCheckOutRef" :showUIFn="showCheckOutUIHdr" :selData="selItemData" />
  <EditApptUI v-if="showEditReserveFormRef" :showEditApptFn="showEditReserveForm" :oldSelList="props.selItemData">
  </EditApptUI>
  <InfoOrderDetail v-if="showOrderInfoRef" :showUIHdr="showOrderInfoFn" :selItemData="orderItem" />
</template>
<script setup lang="ts">
import closeIcon from "@/assets/Group32.svg";
import Icon from "@/assets/Icon zocial-guest.svg";
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import { useManagerStore } from "@/stores/manager";
import Alert from "../alertCmpt";


let store = useApptStore();
let { bookingList, courseDataList, timeGroup, tuiBookingListRef } =
  storeToRefs(store);
let {
  getApptDataApi,
  postEditApptStateApi,
} = store;

const managerstore = useManagerStore();
const { managerRoleList, } = storeToRefs(managerstore);
const { getManagerListNew } = managerstore;
const simpleView = ref(true);
let showCheckOutRef = ref(false);
let showEditReserveFormRef = ref(false);
let showOrderInfoRef: any = ref(false);
// let curBookingList = ref([]);

const props = defineProps<{
  selItemData: any;
  showUIHdr: Function;
  // infoBtnState: Function;
}>();

let formInputRef: any = ref({
  bookingList: [],
});

let dateCpt: any = computed(() => {
  return (
    props.selItemData.dateBooking.split("T")[0]
  );
});
let memberDataCpt: any = computed(() => {
  return props.selItemData.memberInfo
});

getManagerListNew({ id: 0, pageindex: 0, count: 0 })

let managerCpt: any = computed(() => {
  return props.selItemData.managerInfo
});

let weekDayCpt: any = computed(() => {
  var weekArray = new Array(
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  );
  var week = weekArray[new Date(props.selItemData.dateBooking).getDay()];
  return week;
});
let orderItem = ref({});
onBeforeFn();
function onBeforeFn() {
  getApptDataApi(props.selItemData.bookingNo).then((res) => {
    // getApptDataApi("", props.selItemData.bkListNo).then((res) => {
    formInputRef.value.bookingList = res;
    orderItem.value = { coNo: "", bkListNo: res[0].bkListNo };
  });
}
onMounted(() => {
  // getmemberInfoApi();
});
//新增分類-顯示
let showCheckOutUIHdr = (state: boolean) => {
  showCheckOutRef.value = state;
  // getGoodsGroupApi(0);
};

const infoBtnState = (state: number) => {
  switch (state) {
    case 1:
      //完成
      // showApptInfoRef.value = false;
      changeStutusFn(1, props.selItemData);
      break;
    case 2:
      //修改
      // showApptInfoRef.value = false;
      editAddReserveBtn();
      break;
    case 3:
      //刪除
      // showApptInfoRef.value = false;
      delReserveId(props.selItemData);
      break;
    case 4:
      //未出席
      // showApptInfoRef.value = false;
      changeStutusFn(4, props.selItemData);
      break;
    default:
      break;
  }
};
//改變課程狀態
let changeStutusFn = (state: number, item: any) => {
  item.state = state;
  let editApptDate = {
    bookingNo: item.id ? item.id : item.bookingNo,
    state: item.state,
  };
  //修改預約
  postEditApptStateApi(editApptDate).then((res: any) => {
    props.showUIHdr(false);
  });
};

function editAddReserveBtn() {
  // if (oldSelList) {
  //   newApptDataRef.value.memberId = oldSelList.userId;

  //   for (let i = 0; i < courseDataList.value.length; i++) {
  //     let element = courseDataList.value[i];
  //     if (element.lessonId == oldSelList.lessonId) {
  //       newApptDataRef.value.courses = element;
  //     }
  //   }

  //   newApptDataRef.value.beauticianId = oldSelList.managerId;
  //   newApptDataRef.value.selDate = oldSelList.dateBooking.split("T")[0];
  //   newApptDataRef.value.timeBooking =
  //     oldSelList.dateBooking.split("T")[1].split(":")[0] +
  //     ":" +
  //     oldSelList.dateBooking.split("T")[1].split(":")[1];
  //   showOkBtnRef.value = true;
  //   showEditReserveForm(true);
  // }
  showEditReserveForm(true);
}

//修改預約表單-顯示
let showEditReserveForm = (state: boolean) => {
  showEditReserveFormRef.value = state;
  if (!state) props.showUIHdr(false);
};
//刪除預約
let delReserveId = (item: any) => {
  Alert.check("是否刪除", 0, (data: any) => {
    if (data) {
      changeStutusFn(3, item)
      props.showUIHdr(false);
    }
  });
};
function showOrderInfoFn(state: boolean) {
  showOrderInfoRef.value = state;
  // getOrderListApi(0);
}
</script>

<style scoped lang="scss">
.popup-InfoApptUI {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1002;
  background: rgba(137, 137, 137, 0.5);

  display: flex;
  align-items: center;
  justify-content: end;

  >div {
    height: 100%;
    width: 40%;
    border-radius: 10px 0 0 10px;
    border: solid 1px #707070;
    background-color: #faf9f8;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    >.info-head {
      height: 7%;

      .info-img {
        height: calc(100% - 2px);

        >img {
          position: relative;
          height: 60%;
          top: 20%;
          left: 10px;
        }
      }
    }

    >.bitmap-img {
      position: relative;
      left: 220px;
    }

    >img {
      cursor: pointer;
      //margin: 10px 20px;
    }

    >.content {
      height: calc(100% - 10% - 7%);

      >div {
        min-width: 360px;
        //margin: 0 10px;
      }

      .info-content {
        display: flex;
        flex-direction: column;
        // text-align: center;
        height: 100%;
        width: calc(100% - 6%);
        position: relative;
        left: 3%;


        .info-user {
          height: 30%;

          .info-guest {
            display: flex;
            width: 90%;
            margin-left: 5%;
            justify-content: center;
            height: 40%;

            // //margin: 5px 30px;

            .head-shot {
              //margin: 5px 30px;
              position: relative;
              width: 15%;
            }

            >div {
              height: 100%;
              padding-left: 10px;
              width: calc(85% - 10px);

              >span {
                height: 50%;
                justify-content: left;
                align-items: center;
                display: flex;
                font-family: STXihei;
                font-size: 20px;
                color: #717171;
                font-weight: bold;
              }
            }
          }

          >h1 {
            // //margin: 5px 30px;
            font-family: STXihei;
            font-size: 25px;
            color: #717171;
            text-align: left;
            height: 20%;
          }

          >span {
            // //margin: 5px 30px;
            display: flex;
            font-family: STXigei;
            font-size: 20px;
            color: #717171;
            text-align: left;
            height: 20%;
          }
        }

        .info-edit {
          position: relative;
          height: 30%;

          .list_btn {
            position: relative;
            height: 40%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            >button {
              height: 45px;
              border-radius: 10px;
              box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
              border: solid 1px #707070;
              //margin: 5px;
              font-weight: bold;

              color: #906e6c;
              background-color: #ffffff;
              border: solid 1px #707070;
              font-size: 18px;
            }

            .finish {
              opacity: 0.5;
              /*設定蒙版效果*/
              pointer-events: none;
              /*禁止滑鼠事件*/
            }

            button {
              width: 40%;
              height: 55px;
              // opacity: 0.5;
              border-radius: 10px;
              box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
              border: solid 1px #707070;
              //margin: 5px;
              font-weight: bold;

              color: #906e6c;
              background-color: #ffffff;
              border: solid 1px #707070;
              font-size: 18px;
              margin: 5px;
            }

            .finish {
              opacity: 0.5;
              /*設定蒙版效果*/
              pointer-events: none;
              /*禁止滑鼠事件*/
            }
          }

          .grey-guest {
            align-items: center;
            justify-content: center;
            display: flex;
            height: 20%;
            width: 100%;

            .grey-box {
              align-items: center;
              justify-content: center;
              display: flex;
              height: 100%;
              width: 100%;
              background-color: #e6e2de;
              border-radius: 10px;
              color: #717171;
              font-weight: bold;

              span {
                font-size: 18px;
              }
            }
          }
        }


        .info-list {
          height: 40%;
          overflow-y: auto;

          .content-box {
            color: #877059;
            color: #877059;
            width: 90%;
            margin: 10px 5%;

            span {
              text-align: left;
              font-weight: bold;
              color: #717171;
              font-size: 20px;
            }

            >div {
              border: solid 1px #707070;
              background-color: #e6e2de;
              border-radius: 10px;
              width: 100%;

              P {
                //margin: 0 0 5px 0;
              }

            }

            .info-service {
              display: flex;
              width: 100%;
              height: 80px;
              justify-content: center;
              align-items: center;

              .head-shot {
                position: relative;
                width: 15px;
              }

              >div {
                height: 80%;
                width: calc(100% - 15px);
                padding-left: 10px;

                >div {
                  display: flex;
                  height: 100%;
                  width: 100%;

                  >span {
                    display: flex;
                    align-items: center;
                    height: 50%;
                    justify-content: left;
                    display: flex;
                    font-family: STXihei;
                    font-size: 20px;
                    color: #717171;
                    font-weight: bold;
                  }
                }
              }

              .name-service {
                color: #000000;
              }
            }

            .time-service {
              color: #000000;
            }
          }
        }

        .memo-box {
          //margin: 5px 30px;
          color: #877059;

          // flex: 1;
          >p {
            //margin: 0;
          }

          textarea {
            border: solid 1px #707070;
            background-color: #e6e2de;
            border-radius: 10px;
            width: 100%;
            min-height: 120px;
            //margin-top: 5px;
          }
        }

      }

      .current {
        display: none;
      }
    }

    .footer {
      height: 10%;

      .content-checkoutbtn {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          width: 84%;
          height: 55px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          border: solid 1px #707070;
          //margin: 5px;
          font-weight: bold;
          color: #906e6c;
          background-color: #ffffff;
          border: solid 1px #707070;
          font-size: 18px;
        }
      }

    }
  }

  .link-bottom {
    // padding: 0 10px;
    opacity: 0.5;
    //margin: auto;
    width: 100%;
    height: 2px;
    background-color: #707070;
  }
}
</style>
