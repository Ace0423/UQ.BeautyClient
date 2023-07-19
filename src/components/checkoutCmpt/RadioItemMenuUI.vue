<template>
  <div class="popup-mask" v-on:click.self="showUIFn(false)">
    <div class="popup-content">
      <div class="menu-content" v-show="itemTypeRef == 0">
        <div class="top-content">
          <span>新增結帳項目</span>
        </div>
        <div class="main-content">
          <div>
            <div v-on:click="showItemTypeFn(1)">
              <span>服務</span>
              <img :src="icon_right_arrow" />
            </div>
            <div v-on:click="showItemTypeFn(2)">
              <span>商品</span>
              <img :src="icon_right_arrow" />
            </div>
            <div v-on:click="showItemTypeFn(3)">
              <span>儲值卡</span>
              <img :src="icon_right_arrow" />
            </div>
            <div v-on:click="showItemTypeFn(4)">
              <span>計次券</span>
              <img :src="icon_right_arrow" />
            </div>
          </div>
        </div>
        <div class="bottom-content" v-show="false">
          <button class="submit-btn" @click="submitBtn()">確認</button>
          <button class="cancle-btn" @click="showUIFn(false)">取消</button>
        </div>
      </div>
      <div class="service-content" v-show="itemTypeRef == 1">
        <RadioServicesUI
          :selData="formInputRef.ServiceId"
          :getDataFn="getRadioServiceFn"
          :showServiceUIFn="showItemTypeFn"
        >
        </RadioServicesUI>
      </div>
      <div class="service-content" v-show="itemTypeRef == 2">
        <RadioGoodsUI :showGoodsUIFn="showItemTypeFn"> </RadioGoodsUI>
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
import { storeToRefs } from "pinia";
import { usePriceStore} from "@/stores/priceStore";
import search_ico from "@/assets/images/icon_search.png";
import icon_right_arrow from "@/assets/images/icon_right_arrow.png";

let store = usePriceStore();
let { allDiscountList } = storeToRefs(store);
let { getAllDiscountApi } = store;

const props = defineProps<{
  showUIFn: Function;
  //   formInfo: any;
  //   addDetailTypeID?: any;
}>();

onMounted(() => {
  // console.log('onMounted');
});
let formInputRef: any = ref({
  name: "",
  ServiceId:0,
});
//1:服務，2:商品，
let itemTypeRef: any = ref(0);

function submitBtn() {
  console.log("提交");
}
function showItemTypeFn(type: number) {
  itemTypeRef.value = type;
}
function getRadioServiceFn(data: any) {
  console.log(data, "獲取");
  formInputRef.value.ffServiceId = data;
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
    width: 400px;
    height: 450px;
    background-color: #e6e2de;
    padding: 15px;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;
    .top-content {
      display: block;
      height: calc(40px);
      > span {
        display: flex;
        justify-content: center;
        font-size: 26px;
      }
    }
    .main-content {
      display: block;
      height: calc(100% - 40px - 65px);
      > div {
        height: 100%;
        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50px;
          font-size: 20px;
          border-bottom: 1px solid #c1bdb8;
          > span {
            font-size: 24px;
            color: #707070;
          }
          > img {
            width: 20px;
            height: 20px;
          }
        }
      }
      .service-content {
        height: 100%;
      }
    }
    .bottom-content {
      display: flex;
      align-items: end;
      justify-content: center;
      height: calc(65px);
      > button {
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
      }
      .cancle-btn {
        display: block;
      }
    }
  }
}
</style>
