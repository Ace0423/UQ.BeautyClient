<template>
  <div class="popup-mask" v-on:click.self="showAddSubUIFn(false)">
      <div class="popup-content">
          <div class="header-content">
              <img :src="icon_closeX" v-on:click="showAddSubUIFn(false)">
              <span>新增子項目</span>

          </div>
          <div class="main-content"></div>
          <div class="footer-content">
              <button class="submit-btn" @click="submitBtn()">確認</button>
              <button class="cancle-btn" @click="showAddSubUIFn(false)">取消</button>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePriceStore } from "@/stores/priceStore";
import search_ico from "@/assets/images/icon_search.png";
import icon_closeX from "@/assets/images/icon_closeX.png";

let store = usePriceStore();
let { allDiscountList } = storeToRefs(store);
let { getAllDiscountApi } = store;

const props = defineProps<{
  // showUIFn: Function;
  //   formInfo: any;
  //   addDetailTypeID?: any;
  showAddSubUIFn: Function;
}>();

onBeforeFn();
function onBeforeFn() {
  // console.log('onBeforeFn');
}
onMounted(() => {
  // console.log('onMounted');
});
let formInputRef: any = ref({
  name: "",
});

function submitBtn() {
  console.log("提交");
}
</script>

<style scoped lang="scss">
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  background: rgba(65, 65, 65, 0.719);

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
      }

      .footer-content {
          display: flex;
          height: 70px;
          border-top: solid 1px #ddd;
          justify-content: center;

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
          }

          .cancle-btn {
              display: block;
          }
      }
  }
}
</style>
