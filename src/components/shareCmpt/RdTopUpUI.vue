<template>
  <div class="popup-radioGoodsUI" v-on:click.self="showGoodsUIFn(0)">
    <div class="popup-content">
      <div class="header-content">
        <span>儲值卡</span>
        <img :src="icon_closeX" v-on:click="showGoodsUIFn(0)" />
      </div>
      <div class="main-content">
        <input placeholder="搜尋" v-model="formInputRef.search" />
        <div class="list-content">
          <div v-for="item in filterTopUpData" :key="item">
            <label class="label-item" :value="item">
              <input class="input-item" type="radio" :key="item" :value="item" :id="'RadioTopUps_' + item"
                v-model="formInputRef.courses" @click="clickItem(item, item.pId)" />
              <!-- <label :for="'RadioTopUps_' + item.SId"></label> -->
              <div class="title-input">
                <span value="{{item}}" name="{{item.pName}}">{{
                  item.pName
                }}</span>
                <span class="pCode-msg" value="{{item}}" name="{{item.pCode}}">{{ item.pCode }}</span>
              </div>
              <div class="price-input">
                <span>{{ "$" + item.price }}</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <!-- <button class="submit-btn" @click="submitBtn()">確認</button>
        <button class="cancle-btn" @click="showTopUpsUIFn(0)">取消</button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import icon_closeX from "@/assets/images/icon_closeX.png";
import { usePriceStore } from "@/stores/priceStore";
import Alert from "../alertCmpt";
import { showErrorMsg, showHttpsStatus } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";

const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const priceStore = usePriceStore();
const { getTopUpCardList, editTopUpCardInfo } = priceStore;
const { topUpCardList } = storeToRefs(priceStore);

const props = defineProps<{
  showGoodsUIFn: Function;
  getDataFn: Function;
  selData: any;
  //   formInfo: any;
  //   addDetailTypeID?: any;
}>();

const getTopUpCardData = ((id: any) => {
  let allTopUpCard = {
    TUId: 0,
    select: 0,
    type: 1,
    pageindex: 0,
    count: 0,
  };
  getTopUpCardList(allTopUpCard)
    .then((res) => {
      if (res.table) {
        
      }
      if (res.state == 2) {
        Alert.warning(showErrorMsg(res.msg), 2000);
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
})

onBeforeFn();
function onBeforeFn() {
  getTopUpCardData(0);
}

onMounted(() => {
  // console.log('onMounted');
});
let formInputRef: any = ref({
  name: "",
  search: "",
  TopUps: null,
});


let filterTopUpData: any = computed(() =>
  topUpCardList.value.data.filter(getTopUpFn)
);
function getTopUpFn(data: any) {
  return (
    data.display &&
    (!formInputRef.value.search ||
      data.pName
        .toLowerCase()
        .includes(formInputRef.value.search.toLowerCase()))
  );
}



function clickItem(item: any, id: number) {
  formInputRef.value.TopUps = item;
  props.getDataFn(formInputRef.value.TopUps);
}
function submitBtn() {
  props.getDataFn(formInputRef.value.TopUps);
}
</script>

<style scoped lang="scss">
.popup-radioGoodsUI {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  background: rgba(80, 80, 80, 0.8);

  display: flex;
  align-items: center;
  justify-content: space-around;

  .popup-content {
    width: 500px;
    height: 70%;
    background-color: #ffffff;
    // padding: 15px 50px;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;
    border-radius: 12px;

    .header-content {
      display: flex;
      height: 70px;
      width: calc(100%);
      border-bottom: solid 1px #ddd;
      box-sizing: border-box;

      >span {
        position: absolute;
        display: flex;
        width: calc(100%);
        justify-content: center;
        align-items: center;
        font-size: 28px;
        height: 70px;
        justify-content: center;
        left: 0;
        right: 0;

      }

      >img {
        position: relative;
        width: 41px;
        height: 38px;
        top: 15px;
        left: 15px;
      }


      >button {
        position: relative;
        width: 41px;
        height: 38px;
        top: 15px;
        right: 15px;
      }

    }

    .main-content {
      display: block;
      height: calc(100% - 40px - 65px);
      width: 90%;
      margin-left: 5%;

      >input {
        box-sizing: border-box;
        width: 100%;
        height: 45px;

        border-radius: 6px;
        border: solid 1px #707070;
        box-sizing: border-box;
        margin-top: 10px;
        background: #fff url("@/assets/images/icon_search.png") no-repeat;
        background-position: 97%;
        background-origin: content-box;
        text-indent: 5px;
      }

      >input::placeholder {
        position: relative;
        left: 0px;
        top: 1px;
      }

      .list-content {
        height: calc(100% - 35px);
        box-sizing: border-box;
        overflow-y: auto;

        >div {
          .label-group {
            display: flex;
            align-items: center;
            width: 100%;
            margin-left: 5px;

            input {
              display: none;
            }

            label {
              display: inline-block;
              width: 17px;
              height: 17px;
              border-radius: 5px;
              border: 1px solid #8b6f6d;
              position: relative;
              cursor: pointer;
            }

            label::before {
              display: inline-block;
              content: " ";
              width: 10px;
              border: 2px solid #fff;
              height: 4px;
              border-top: none;
              border-right: none;
              transform: rotate(-45deg);
              top: 4px;
              left: 3px;
              position: absolute;
              opacity: 0;
            }

            input:checked+label {
              background: #8b6f6d;
            }

            input:checked+label::before {
              opacity: 1;
              transform: all 0.5s;
            }

            >span {
              margin-left: 10px;
              font-size: 17px;
            }
          }

          .label-item {
            display: flex;
            align-items: center;
            width: calc(100% - 15px - 15px);
            margin-left: 15px;
            border-bottom: solid 1px #8b6f6d;
            box-sizing: border-box;
            padding: 5px;

            input {
              display: none;
            }

            >label {
              display: inline-block;
              width: 20px;
              height: 20px;
              border-radius: 5px;
              border: 1px solid #8b6f6d;
              position: relative;
              cursor: pointer;
            }

            >label::before {
              display: inline-block;
              content: " ";
              width: 12px;
              border: 2px solid #fff;
              height: 4px;
              border-top: none;
              border-right: none;
              transform: rotate(-45deg);
              top: 5px;
              left: 3px;
              position: absolute;
              opacity: 0;
            }

            >input:checked+label {
              background: #8b6f6d;
            }

            >input:checked+label::before {
              opacity: 1;
              transform: all 0.5s;
            }

            >span {
              margin-left: 10px;
            }

            >div {
              display: grid;
              margin-left: 10px;

              .pCode-msg {
                font-size: 15px;
              }
            }

            .title-input {
              flex: 1;
            }

            .price-input {
              width: 50px;
            }
          }
        }
      }
    }

    .bottom-content {
      display: flex;
      align-items: end;
      justify-content: center;

      // height: calc(65px);
      // width: 100px;
      >button {
        position: relative;
        width: 100px;
        height: 45px;
        margin: 10px;
        border-radius: 10px;
        font-size: 20px;
        font-weight: bold;
        color: #717171;
        background-color: #fff;
      }

      .submit-btn {
        display: block;
        width: 100px;
      }

      .cancle-btn {
        display: block;
        width: 100px;
      }
    }
  }
}
</style>
