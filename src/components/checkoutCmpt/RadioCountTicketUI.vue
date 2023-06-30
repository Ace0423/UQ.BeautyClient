<template>
    <div class="popup-mask" v-on:click.self="showCountTicketUIFn(0)">
      <div class="popup-content">
        <div class="top-content">
          <img :src="icon_closeX" v-on:click="showCountTicketUIFn(0)" />
          <span>計次券</span>
        </div>
        <div class="main-content">
          <input placeholder="搜尋" v-model="formInputRef.search" />
          <div class="group-content"></div>
        </div>
        <div class="bottom-content" v-show="false">
          <button class="submit-btn" @click="submitBtn()">確認</button>
          <button class="cancle-btn" @click="showCountTicketUIFn(0)">取消</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useApptStore } from "@/stores/priceStore";
  import search_ico from "@/assets/images/icon_search.png";
  import icon_right_arrow from "@/assets/images/icon_right_arrow.png";
  import icon_closeX from "@/assets/images/icon_closeX.png";
  
  let store = useApptStore();
  let { allDiscountList } = storeToRefs(store);
  let { getAllDiscountApi } = store;
  
  const props = defineProps<{
    showCountTicketUIFn: Function;
    //   formInfo: any;
    //   addDetailTypeID?: any;
  }>();
  
  onMounted(() => {
    // console.log('onMounted');
  });
  let formInputRef: any = ref({
    name: "",
    search: "",
  });
  
  function submitBtn() {
    console.log("提交");
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
        display: flex;
        height: 50px;
        width: 100%;
        border: solid 1px #ddd;
        box-sizing: border-box;
        > span {
          display: flex;
          // width: 200px;
          align-items: center;
          font-size: 30px;
          height: 40px;
          position: absolute;
          left: calc(50% - 41px);
        }
        > img {
          position: relative;
          width: 41px;
          height: 38px;
          top: 0px;
          left: 0px;
        }
      }
      .main-content {
        display: block;
        height: calc(100% - 40px - 65px);
        > input {
          box-sizing: border-box;
          width: 100%;
          height: 35px;
  
          border-radius: 6px;
          border: solid 1px #707070;
          box-sizing: border-box;
          margin-right: 10px;
          background: #fff url("@/assets/images/icon_search.png") no-repeat;
          background-position: 3%;
          background-origin: content-box;
          text-indent: 5px;
        }
        > input::placeholder {
          position: relative;
          left: 33px;
          top: 1px;
        }
        .group-content {
          height: calc(100% - 35px);
          border: solid 1px #ff0000;
          box-sizing: border-box;
        }
      }
      .bottom-content {
        display: flex;
        align-items: end;
        justify-content: center;
        height: calc(65px);
        width: 100px;
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
  