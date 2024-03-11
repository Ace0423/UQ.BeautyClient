<script setup lang="ts">
import closeIcon from "@/assets/Group32.svg";
import bitmapIcon from "@/assets/bitmap.svg";
import Icon from "@/assets/Icon zocial-guest.svg";
import birthdayIcon from "@/assets/Icon awesome-birthday-cake.svg";
import addressIcon from "@/assets/Icon awesome-address-book.svg";
import mailIcon from "@/assets/Icon feather-mail.svg";
import editIcon from "@/assets/Icon awesome-edit.svg";
import cardIcon from "@/assets/credit-card.svg";
import addIcon from "@/assets/images/icon_add.png";
import receiptIcon from "@/assets/receipt.svg";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { usePriceStore } from "@/stores/priceStore";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
import { useMemberStore } from "@/stores/member";
import { useBookingStore } from "@/stores/booking";
import { useOrderStore } from "@/stores/order";
const memberStore = useMemberStore();
const { getExpenseInfo } = memberStore;
const bookingStore = useBookingStore();
const { getBookingByUId } = bookingStore;
const orderStore = useOrderStore();
const { getOrderByUId } = orderStore;
const priceStore = usePriceStore();
const { getTopUpUseDetailApi } = priceStore;
const simpleView = ref(true);
const currentIndex = ref(0);
const memberExpenseInfo: any = reactive({
  averageAmount: '',
  bookingAmount: 0,
  bookingCount: 0,
  lastBookingTime: '',
});
const memberBookingInfo: any = reactive({ data: [] });
const memberOrderInfo: any = reactive({ data: [] });
const TopUpUseDetail: any = reactive({ data: [] });
const props = defineProps<{
  selectMemberItem: any;
  handMemberInfoView: Function;
  handAddMemberView: Function;
}>();
const limitDay: any = [
  {
    value: 1,
    label: '1周',
  },
  {
    value: 2,
    label: '2周',
  },
  {
    value: 3,
    label: '3周',
  },
  {
    value: 4,
    label: '1月',
  },
  {
    value: 5,
    label: '3月',
  },
  {
    value: 6,
    label: '6月',
  }
]
const handsimpleViewBtn = () => {
  simpleView.value = !simpleView.value;
};
const changeTab = (index: number) => {
  currentIndex.value = index;
  getmemberInfoApi();
};
const getmemberInfoApi = () => {
  let data = {
    uid: props.selectMemberItem.userId,
    pageIndex: 0,
    count: 0
  };
  switch (currentIndex.value) {

    case 0:
      getExpenseInfo(data)
        .then((res: any) => {
          if (res.data.state == 1) {
            memberExpenseInfo.averageAmount = res.data.data.table.averageAmount
            memberExpenseInfo.bookingAmount = res.data.data.table.bookingAmount
            memberExpenseInfo.bookingCount = res.data.data.table.bookingCount
            memberExpenseInfo.lastBookingTime = new Date(res.data.data.table.lastBookingTime).toISOString().split('T')[0]
          } else if (res.data.state == 2) {
            // Alert.warning(showErrorMsg(res.data.msg), 2000);
          }
        })
        .catch((e: any) => {
          Alert.warning(showHttpsStatus(e.response.status), 2000);
          if (e.response.status == 401) {
            setTimeout(() => {
              handLogOut();
            }, 2000);
          }
        });
      break;
    case 1:
      getBookingByUId(data)
        .then((res: any) => {
          if (res.data.state == 1) {
            memberBookingInfo.data = res.data.data.table;
          } else if (res.data.state == 2) {
            // Alert.warning(showErrorMsg(res.data.msg), 2000);
          }
        })
        .catch((e: any) => {
          Alert.warning(showHttpsStatus(e.response.status), 2000);
          if (e.response.status == 401) {
            setTimeout(() => {
              handLogOut();
            }, 2000);
          }
        });
      break;
    case 2:
      getOrderByUId(data)
        .then((res: any) => {
          if (res.data.state == 1) {
            memberOrderInfo.data = res.data.data.table;
          } else if (res.data.state == 2) {
            // Alert.warning(showErrorMsg(res.data.msg), 2000);
          }
        })
        .catch((e: any) => {
          Alert.warning(showHttpsStatus(e.response.status), 2000);
          if (e.response.status == 401) {
            setTimeout(() => {
              handLogOut();
            }, 2000);
          }
        });
      break;
    case 3:
      getTopUpUseDetailApi(props.selectMemberItem.userId, 0, 0)
        .then((res: any) => {
          TopUpUseDetail.data = res;
        })
        .catch((e: any) => {
          Alert.warning(showHttpsStatus(e.response.status), 2000);
          if (e.response.status == 401) {
            setTimeout(() => {
              handLogOut();
            }, 2000);
          }
        });
      break;
    default:
      break;
  }
};
const parseDate = ((time: any) => {
  const date = new Date(time);
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
})
onMounted(() => {
  getmemberInfoApi();
});

</script>

<template>
  <div class="popup-mask" v-on:click.self="handMemberInfoView()">
    <div class="content">
      <div class="info-frame">
        <div class="info-head">
          <img :src="closeIcon" v-on:click="handMemberInfoView()" />
          <img :src="bitmapIcon" v-on:click="handsimpleViewBtn()" />
        </div>
        <div class="info-content">
          <div class="info-simple">
            <img class="head-photo" v-if="!props.selectMemberItem.photo" :src="Icon" />
            <img class="head-photo" v-if="props.selectMemberItem.photo" :src="props.selectMemberItem.photo" />
            <img class="edit-btn" :src="editIcon" v-on:click="handAddMemberView()" />
            <h1>{{ props.selectMemberItem.nameView }}</h1>
            <p>{{ props.selectMemberItem.phone }}</p>
            <div class="group-lab">
              <div v-for="item in props.selectMemberItem.groupList" :key="item.groupId">
                <p>{{ item.label }}</p>
              </div>
              <img class="circle" :src="addIcon" v-on:click="handAddMemberView()" />
            </div>
          </div>
          <div class="detail">
            <div class="info-detail">
              <p>基本資料</p>
              <div class="content-box">
                <div class="flex-box">
                  <img :src="addressIcon" />
                  <p v-if="props.selectMemberItem.sex == 1">男</p>
                  <p v-if="props.selectMemberItem.sex == 0">女</p>
                </div>
                <div class="flex-box">
                  <img :src="birthdayIcon" />
                  <p>{{ props.selectMemberItem.birthday }}</p>
                </div>
                <div class="flex-box">
                  <img :src="mailIcon" />
                  <p>{{ props.selectMemberItem.email }}</p>
                </div>
              </div>
            </div>
            <div class="info-memo">
              <h4>來源</h4>
              <p3 v-if="props.selectMemberItem.fromWhere == 0">現場</p3>
              <p3 v-if="props.selectMemberItem.fromWhere == 1">網路</p3>
              <h4>加入時間</h4>
              <p3>{{ props.selectMemberItem.dateCreate }}</p3>
            </div>
          </div>

        </div>
      </div>
      <div class="consumption-frame" v-if="simpleView">
        <div class="item-tab">
          <button :class="currentIndex == 0 ? 'active' : ''" v-on:click="changeTab(0)">
            <nobr>消費表現</nobr>
          </button>
          <button :class="currentIndex == 1 ? 'active' : ''" v-on:click="changeTab(1)">
            <nobr>消費紀錄</nobr>
          </button>
          <button :class="currentIndex == 2 ? 'active' : ''" v-on:click="changeTab(2)">
            <nobr>紀錄訂單</nobr>
          </button>
          <button :class="currentIndex == 3 ? 'active' : ''" v-on:click="changeTab(3)">
            <nobr>儲值卡</nobr>
          </button>
        </div>
        <div class="consumption-content">
          <div class="consumption-performance" :class="currentIndex != 0 ? 'current' : ''">
            <div>
              <h1>{{ memberExpenseInfo.bookingCount }}</h1>
              <p>完成預約數</p>
            </div>
            <div>
              <h1>{{ memberExpenseInfo.bookingAmount }}</h1>
              <p>總消費金額</p>
            </div>
            <div>
              <h1>{{ memberExpenseInfo.averageAmount }}</h1>
              <p>平均消費金額</p>
            </div>
            <div>
              <h1>{{ memberExpenseInfo.lastBookingTime }}</h1>
              <p>最後來訪時間</p>
            </div>
          </div>
          <div class="consumption-record" :class="currentIndex != 1 ? 'current' : ''">
            <div v-for="item in memberBookingInfo.data" :key="item.bookingNo">
              <div>
                <p>{{ parseDate(item.dateBooking) }}</p>
                <p>{{ item.serviceName }}</p>
                <p>{{ item.timer }}分鐘</p>
              </div>
              <h3 v-if="item.price != 0">$ {{ item.price }}</h3>
              <h3 v-if="item.price == 0">$ {{ item.subInfo.price }}</h3>
            </div>
          </div>
          <div class="order-record" :class="currentIndex != 2 ? 'current' : ''">
            <div v-for="item in memberOrderInfo.data" :key="item.bookingNo">
              <div style="width: 40px;">
                <img style="width: 70%;" :src="receiptIcon">
              </div>
              <div>
                <p>{{ item.coNo }}</p>
                <p>{{ parseDate(item.coCheckTime) }}</p>
              </div>
              <h3>$ {{ item.coTotalPrice }}</h3>
            </div>
          </div>
          <div class="order-record" :class="currentIndex != 3 ? 'current' : ''">
            <div v-for="item in TopUpUseDetail.data" :key="item.id">
              <div style="width: 40px;">
                <img style="width: 70%;" :src="cardIcon">
              </div>
              <div>
                <p>{{ item.topUpCardInfo.tuTitle }}</p>
                <p v-if="item.topUpCardInfo.tuLimitDay == 0">不限期</p>
                <p v-if="item.topUpCardInfo.tuLimitDay != 0">{{ limitDay[item.topUpCardInfo.tuLimitDay].label }}</p>
              </div>
              <h3>$ {{ item.balance }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: rgba(137, 137, 137, 0.5);

  display: flex;
  align-items: center;
  justify-content: end;

  >.content {
    display: flex;
    height: 100%;
    border-radius: 10px 0 0 10px;
    border: solid 1px #707070;
    background-color: #faf9f8;
    box-sizing: border-box;
    display: flex;
    color: #717171;

    >.info-frame {
      display: flex;
      height: 100%;
      flex-direction: column;
      min-width: 300px;
      margin: 0 10px;

      >.info-head {
        justify-content: space-between;
        display: flex;
        height: 65px;

        >img {
          justify-content: center;
          margin: 10px 10px 10px 10px;
        }
      }

      >.info-content {
        position: relative;
        border-radius: 10px;
        box-shadow: inset 0 10px 6px 0 rgba(0, 0, 0, 0.16);
        min-width: 300px;
        border: solid 1px #707070;
        height: calc(99% - 65px);

        >.info-simple {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 10px;
          border-bottom: 2px #707070 solid;

          .group-lab {
            display: flex;
            width: 100%;
            height: 30px;
            justify-content: center;
            flex-wrap: wrap;

            >div {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 14px;
              border: solid 1px #707070;
              background-color: #e6e2de;
              padding: 1px 1px;
              margin: 2px 2px;

              >p {
                margin: 0px 0px;
              }
            }

            .circle {
              clip-path: circle(50% at 50% 50%);
            }
          }

          .head-photo {
            position: relative;
            top: -30px;
            width: 60px;
            height: 60px;
            clip-path: circle(50% at 50% 50%);

          }

          .edit-btn {
            position: absolute;
            top: 10px;
            right: 0px;
            width: 36px;
            height: 36px;
          }
        }

        >.detail {
          position: absolute;
          top: 180px;
          bottom: 0px;
          left: 0px;
          right: 0px;
          overflow: auto;

          >.info-detail {
            margin: 0 10px;
            border-bottom: 2px #707070 solid;
            color: #877059;

            >.content-box {
              border: solid 1px #707070;
              background-color: #e6e2de;
              border-radius: 10px;
              margin-bottom: 25px;

              P {
                margin: 0 0 5px 0;
              }

              .flex-box {
                display: flex;
                height: 40px;
                margin: 10px 10px;
                align-items: center;

                p {
                  margin: 10px;
                }

                img {
                  width: 20px;
                  height: 20px;
                }
              }
            }
          }

          .info-memo {
            display: flex;
            flex-direction: column;
            margin: 0 10px;
            border-bottom: 2px #707070 solid;
            color: #877059;
          }
        }

      }
    }

    >.consumption-frame {
      margin: 0 10px;

      >.item-tab {
        display: flex;
        overflow: auto;
        width: 300px;
        height: 65px;

        >button {
          justify-content: center;
          align-items: center;
          border: none;
          margin: 5px;
          padding: 0 0 0 0;
          background: transparent;
          font-size: 20px;
          font-weight: bold;
          font-family: HeitiTC;
          color: #717171;
          text-decoration: none;
        }

        >button.active {
          box-shadow: 0 2px;
          padding-bottom: 3px;
          color: #877059;
        }
      }

      >.consumption-content {
        border-radius: 10px;
        box-shadow: inset 0 10px 6px 0 rgba(0, 0, 0, 0.16);
        min-width: 300px;
        border: solid 1px #707070;
        height: calc(99% - 65px);
        overflow: auto;

        >.consumption-performance {
          >div {
            margin: 20px 30px;
            padding: 5px 15px;
            border: solid 1px #707070;
            background-color: #e6e2de;
            border-radius: 10px;
            color: #717171;

            >h1 {
              font-size: 20px;
            }

            >p {
              font-size: 16px;
              margin: 0;
            }
          }
        }

        >.consumption-record {
          >div {
            margin: 20px 30px;
            padding: 5px 15px;
            border: solid 1px #707070;
            background-color: #e6e2de;
            border-radius: 10px;
            color: #717171;
            display: flex;
            justify-content: space-between;
            align-items: center;

            >div {
              >h3 {
                font-size: 20px;
              }

              >p {
                font-size: 16px;
                margin: 0;
              }
            }
          }
        }

        >.order-record {
          >div {
            margin: 20px 30px;
            padding: 5px 15px;
            border: solid 1px #707070;
            background-color: #e6e2de;
            border-radius: 10px;
            color: #717171;
            display: flex;
            justify-content: space-between;
            align-items: center;

            >div {
              >h3 {
                font-size: 20px;
              }

              >p {
                font-size: 16px;
                margin: 0;
              }
            }
          }
        }

        .current {
          display: none;
        }
      }
    }
  }
}
</style>