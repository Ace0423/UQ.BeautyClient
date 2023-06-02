

<template>
  <div class="popup-mask" v-on:click.self="showUIHdr(false)">
    <div>
      <div class="info-head">
        <img :src="closeIcon" v-on:click="showUIHdr(false)" />
        <!-- <img
          :src="bitmapIcon"
          class="bitmap-img"
          v-on:click="handsimpleViewBtn()"
        /> -->
        <img v-if="simpleView" />
      </div>
      <div class="content">
        <div class="link-bottom"></div>
        <div class="info-content">
          <h1>111</h1>
          <p>222</p>
          <img class="head-shot" :src="Icon" />
          <div class="link-bottom"></div>
          <div>
            <div class="grey-box">
              <span>人數1位</span>
            </div>
            <button>預約完成</button>
            <!-- <button v-on:click="handAddMemberView()">修改顧客</button> -->
          </div>
          <div class="link-bottom"></div>
          <div class="content-box">
            <p>基本資料</p>
            <div>
              <div class="flex-box">
                <p>男</p>
              </div>
              <div class="flex-box">
                <p>10/15</p>
              </div>
              <div class="flex-box">
                <p>xxx@xxx</p>
              </div>
            </div>
          </div>
        </div>
        <div class="link-bottom"></div>
        <div class="content-checkoutbtn">
          <span>結帳</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import closeIcon from "@/assets/Group32.svg";
import bitmapIcon from "@/assets/bitmap.svg";
import Icon from "@/assets/Icon zocial-guest.svg";
import lineIcon from "@/assets/Icon awesome-line.svg";
import gMailIcon from "@/assets/g-mail.svg";
import { useCounterStore } from "@/stores/memberBank";

const store = useCounterStore();
const { getMemberBankDetail } = store;
const simpleView = ref(true);
const currentIndex = ref(2);
const memberDetailData: any = reactive({
  accountBalance: 0,
  recentConsumption: { amount: "-", date: "-" },
  recentDeposit: { amount: "-", date: "-" },
});
const props = defineProps<{
  selItemData: any;
  showUIHdr: Function;
  // handMemberInfoView: Function;
  // handAddMemberView: Function;
}>();

console.log(props.selItemData);

const handsimpleViewBtn = () => {
  simpleView.value = !simpleView.value;
};
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
  z-index: 1;
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
      // justify-content: space-between;
      // display: flex;
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

        .head-shot {
          position: relative;
          // top: -35px;
          width: 15%;
          margin: auto;
        }

        > h1 {
          font-family: STXihei;
          font-size: 25px;
          color: #717171;
        }

        > p {
          margin: 5px;
          font-family: STXigei;
          font-size: 20px;
          color: #717171;
        }

        > div {
          button {
            width: 84%;
            height: 55px;
            opacity: 0.5;
            border-radius: 10px;
            box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
            border: solid 1px #707070;
            // background-color: #e6e2de;
            margin: 5px;
            font-weight: bold;
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
          }
        }

        .content-box {
          margin: 5px 30px 18px;
          color: #877059;

          P {
            margin: 0 0 5px 0;
          }

          > div {
            border: solid 1px #707070;
            background-color: #e6e2de;
            border-radius: 10px;
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
      }
      // .link-bottom {
      //   padding: 0 10px;
      //   opacity: 0.5;
      //   margin: auto;
      //   width: 80%;
      //   height: 2px;
      //   background-color: #707070;
      // }

      .current {
        display: none;
      }
      .content-checkoutbtn {
        // width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
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