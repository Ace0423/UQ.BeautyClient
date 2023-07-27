<template>
  <div class="popup-mask" v-on:click.self="showUIHdr(false)">
    <div>
      <div class="info-head">
        <img :src="closeIcon" v-on:click="showUIHdr(false)" />
        <img v-if="simpleView" />
      </div>
      <div class="content">
        <div class="link-bottom"></div>
        <div class="info-content">
          <p>{{ weekDayCpt }}</p>
          <h1>{{ dateCpt }}</h1>
          <div class="info-guest">
            <img class="head-shot" :src="Icon" />
            <div>
              <p>{{ customerDataCpt.nameView }}</p>
              <p>{{ customerDataCpt.phone }}</p>
            </div>
          </div>
          <div class="list_btn">
            <button
              :class="selItemData.state == 1 ? 'finish' : ''"
              @click="infoBtnState(2)"
            >
              修改預約
            </button>
            <button
              :class="selItemData.state == 1 ? 'finish' : ''"
              @click="infoBtnState(3)"
            >
              刪除預約
            </button>
          </div>
          <div class="link-bottom"></div>
          <div>
            <div class="grey-box">
              <span>人數1位</span>
            </div>
            <button
              :class="selItemData.state == 1 ? 'finish' : ''"
              @click="infoBtnState(1)"
            >
              預約完成
            </button>
          </div>
          <div class="link-bottom"></div>
          <div class="content-box">
            <p>{{ props.selItemData.timePeriod }}</p>
            <div class="info-guest">
              <img class="head-shot" :src="Icon" />
              <div>
                <p>{{ props.selItemData.lesson }}</p>
                <p>
                  {{
                    beauticianCpt.nameView +
                    "," +
                    props.selItemData.timer +
                    "分"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="link-bottom"></div>
        <div class="content-checkoutbtn">
          <!-- <span>結帳</span> -->
          <button>結帳</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import closeIcon from "@/assets/Group32.svg";
import Icon from "@/assets/Icon zocial-guest.svg";
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";

let store = useApptStore();
let { memberList, beauticianList } = storeToRefs(store);

const simpleView = ref(true);
const props = defineProps<{
  selItemData: any;
  showUIHdr: Function;
  infoBtnState: Function;
}>();

let dateCpt: any = computed(() => {
  return (
    props.selItemData.dateBooking.split("T")[0].split("-")[1] +
    "月" +
    props.selItemData.dateBooking.split("T")[0].split("-")[2] +
    "日"
  );
});
let customerDataCpt: any = computed(() => {
  let customerData = [];
  for (let i = 0; i < memberList.value.length; i++) {
    const element = memberList.value[i];
    if (element.userId == props.selItemData.userId) {
      customerData = element;
    }
  }
  return customerData;
});

let beauticianCpt: any = computed(() => {
  let beauticianData = [];
  for (let i = 0; i < beauticianList.value.length; i++) {
    const element = beauticianList.value[i];
    if (element.userId == props.selItemData.serverId) {
      beauticianData = element;
    }
  }
  return beauticianData;
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
onMounted(() => {
  // getmemberInfoApi();
});
</script>

<style scoped lang="scss">
.popup-mask {
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

  > div {
    height: 100%;
    border-radius: 10px 0 0 10px;
    border: solid 1px #707070;
    background-color: #faf9f8;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    > .info-head {
      height: 7%;
      > img {
        justify-content: center;
        margin: 10px 10px 10px 10px;
      }
    }

    > .bitmap-img {
      position: relative;
      left: 220px;
    }

    > img {
      cursor: pointer;
      margin: 10px 20px;
    }

    > .content {
      height: 92%;

      > div {
        min-width: 360px;
        margin: 0 10px;
      }

      .info-content {
        display: flex;
        flex-direction: column;
        text-align: center;
        height: 90%;

        .info-guest {
          display: flex;
          width: 80%;
          margin: 5px 30px;
          .head-shot {
            margin: 5px 30px;
            position: relative;
            width: 15%;
          }
          > div {
            > p {
              justify-content: left;
              display: flex;
              font-family: STXihei;
              font-size: 20px;
              color: #717171;
              font-weight: bold;
            }
          }
        }

        > h1 {
          margin: 5px 30px;
          font-family: STXihei;
          font-size: 25px;
          color: #717171;
          text-align: left;
        }

        > p {
          margin: 5px 30px;
          font-family: STXigei;
          font-size: 20px;
          color: #717171;
          text-align: left;
        }

        > div {
          button {
            width: 84%;
            height: 55px;
            // opacity: 0.5;
            border-radius: 10px;
            box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
            border: solid 1px #707070;
            margin: 5px;
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
          .grey-box {
            align-items: center;
            justify-content: center;
            display: flex;
            // width: 100%;
            height: 50px;
            background-color: #e6e2de;
            margin: 5px 30px;
            border-radius: 10px;
            color: #717171;
            font-weight: bold;
            span {
              font-size: 18px;
            }
          }
        }

        .content-box {
          margin: 5px 30px 18px;
          color: #877059;
          min-height: 200px;
          P {
            text-align: left;
            font-weight: bold;
            color: #717171;
            font-size: 20px;
          }

          > div {
            border: solid 1px #707070;
            background-color: #e6e2de;
            border-radius: 10px;
            P {
              margin: 0 0 5px 0;
            }
          }

          // .flex-box {
          //   display: flex;
          //   height: 40px;
          //   margin: 10px 10px;
          //   align-items: center;

          //   p {
          //     margin: 10px;
          //   }

          //   img {
          //     width: 20px;
          //     height: 20px;
          //   }
          // }
        }

        .memo-box {
          margin: 5px 30px;
          color: #877059;

          // flex: 1;
          > p {
            margin: 0;
          }

          textarea {
            border: solid 1px #707070;
            background-color: #e6e2de;
            border-radius: 10px;
            width: 100%;
            min-height: 120px;
            margin-top: 5px;
          }
        }

        .list_btn {
          margin: 0px 30px;
          position: relative;
          height: 35px;
          display: flex;
          justify-content: center;
          > button {
            height: 45px;
            border-radius: 10px;
            box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
            border: solid 1px #707070;
            margin: 5px;
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
        }
      }
      .current {
        display: none;
      }
      .content-checkoutbtn {
        height: 65px;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          width: 84%;
          height: 55px;
          border-radius: 10px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          border: solid 1px #707070;
          margin: 5px;
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
    padding: 0 10px;
    opacity: 0.5;
    margin: auto;
    width: 80%;
    height: 2px;
    background-color: #707070;
  }
}
</style>
