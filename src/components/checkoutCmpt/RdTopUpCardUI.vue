<template>
  <div class="popup-RdTopUpCardUI" v-on:click.self="showUIFn(false)">
    <div class="popup-content">
      <div class="header-content">
        <span>使用儲值卡</span>
        <img :src="icon_closeX" @click="showUIFn(false)">
      </div>
      <div class="main-content">
        <div v-for="uItem in useTopUpDetailRef" :key="uItem"  @click="clickItem(uItem, uItem.Id)">
          <div class="main-title">
            <span class="name">{{ uItem.topUpCardInfo.tuTitle }}</span>
            <span v-if="uItem.topUpCardInfo.tuLimitType == 0">不限期</span>
            <span v-else>限期</span>
          </div>
          <div>
            <div class="main-price">
              <span class="price">{{ '$ ' + uItem.balance }}</span>
              <span>剩餘面額</span>
            </div>
            <img :src="icon_right_arrow" />
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <button class="cancle-btn" @click="clearAll()">移除儲值卡</button>
      </div>
      <div class="service-content" v-show="itemTypeRef == 1">
        <RadioServicesUI :showServiceUIFn="showItemTypeFn" :selData="formInputRef.selectService"
          :getDataFn="getRdServiceFn"></RadioServicesUI>
      </div>
      <div class="service-content" v-show="itemTypeRef == 2">
        <RadioGoodsUI :showGoodsUIFn="showItemTypeFn" :selData="formInputRef.selectGood" :getDataFn="getRdGoodsFn">
        </RadioGoodsUI>
      </div>
      <div class="service-content" v-show="itemTypeRef == 3">
        <RdTopUpUI :showTopUpsUIFn="showItemTypeFn" :selData="formInputRef.selectTopUp" :getDataFn="getRdTopUpsFn">
        </RdTopUpUI>
      </div>

      <div class="service-content" v-show="itemTypeRef == 3"></div>
      <div class="service-content" v-show="itemTypeRef == 4">
        <RadioCountTicketUI :showCountTicketUIFn="showItemTypeFn">
        </RadioCountTicketUI>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import icon_right_arrow from "@/assets/images/icon_right_arrow.png";
import icon_closeX from "@/assets/images/icon_closeX.png";
import { usePriceStore } from "@/stores/priceStore";
const priceStore = usePriceStore();
const { getTopUpUseDetailApi } = priceStore;
const props = defineProps<{
  showUIFn: Function;
  getDataFn: Function;
  selData: any;
}>();
let formInputRef: any = ref({
  name: "",
  selectService: null,
  selectGood: null,
  selectTopUp: null,
});
let useTopUpDetailRef: any = ref([]);
onBrfore();
function onBrfore() {
  getTopUpUseDetailApi(props.selData.userId).then((res) => {
    useTopUpDetailRef.value = res;
  });
}
onMounted(() => {
  // console.log('onMounted');
});
//1:服務，2:商品，
let itemTypeRef: any = ref(0);

function submitBtn() {
}
function showItemTypeFn(type: number) {
  itemTypeRef.value = type;
  if (!type) props.showUIFn(false);
}
function getRdServiceFn(data: any) {
  data.subInfo = data.subList[0] ? data.subList[0] : null;
  formInputRef.value.selectService = data;
  props.getDataFn(formInputRef.value);
  showItemTypeFn(0);
}
function getRdGoodsFn(data: any) {
  formInputRef.value.selectGood = data;
  props.getDataFn(formInputRef.value);
  showItemTypeFn(0);
}
function getRdTopUpsFn(data: any) {
  formInputRef.value.selectTopUp = data;
  props.getDataFn(formInputRef.value);
  showItemTypeFn(0);
}
function clickItem(item: any, id: number) {
  props.getDataFn(item);
  // props.showRdDFn(false)
}
function clearAll() {
  props.getDataFn(null);
}
</script>

<style scoped lang="scss">
.popup-RdTopUpCardUI {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1003;
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
      height: calc(100% - 70px - 70px);
      width: 90%;
      margin-left: 5%;

      >div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
        font-size: 30px;
        border-bottom: 1px solid #c1bdb8;

        >span {
          font-size: 30px;
          color: #707070;
        }

        >div {
          display: flex;
          align-items: center;

          >img {
            width: 20px;
            height: 20px;
          }
        }

        .main-title {
          display: grid;

          >span {
            font-size: 16px;
            color: #707070;
          }

          .name {
            font-size: 24px;
            color: #000000;
          }
        }

        .main-price {
          display: grid;

          >span {
            font-size: 16px;
            color: #707070;
          }

          .price {
            font-size: 24px;
            color: #000000;
          }
        }
      }
    }

    .service-content {
      height: 100%;
    }

    .bottom-content {
      display: flex;
      align-items: end;
      justify-content: left;
      border-top: solid 1px #ddd;
      box-sizing: border-box;


      // height: calc(65px);
      // width: 100px;
      >button {
        position: relative;
        width: 100px;
        height: 45px;
        margin: 10px;
        border-radius: 5px;
        font-size: 20px;
        font-weight: bold;
        color: #ff0000;
        background-color: #ffffff;
      }

      .submit-btn {
        display: block;
        width: 100px;
      }

      .cancle-btn {
        display: block;
        width: auto;
      }
    }
  }
}
</style>
