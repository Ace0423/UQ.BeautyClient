<template>
  <div class="popup-selItemMenuUI" v-on:click.self="showUIFn(false)">
    <div class="popup-content">
      <div class="menu-content" v-show="itemTypeRef == 0">
        <div class="header-content">
          <span>新增項目</span>
          <img :src="icon_closeX" @click="showUIFn(false)">
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
            <!-- <div v-on:click="showItemTypeFn(4)">
              <span>計次券</span>
              <img :src="icon_right_arrow" />
            </div> -->
          </div>
        </div>
        <div class="bottom-content" v-show="false">
          <button class="submit-btn" @click="submitBtn()">確認</button>
          <button class="cancle-btn" @click="showUIFn(false)">取消</button>
        </div>
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
onBrfore();
function onBrfore() {
  // formInputRef.value.selectService = props.selData.buyServicesGroup;
  // formInputRef.value.selectGood = props.selData.buyGoodsGroup;
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
</script>

<style scoped lang="scss">
.popup-selItemMenuUI {
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
      height: calc(100% - 40px - 65px);
      width: 90%;
      margin-left: 5%;

      >div {
        height: 100%;

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

          >img {
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
