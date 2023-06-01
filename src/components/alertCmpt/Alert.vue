<script setup lang="ts" name="GlAlert">
const messageText = ref("alert_test"); // 提示內容
const buttonState = ref(0); //按鈕顯示狀態 0:全部 1:只顯示確定按鈕 2:不顯示按鈕
const timerVal = ref(0);
const props = defineProps({
  type: {
    type: Number,
    default: 0,
  },
  message: {
    type: String,
    default: "!!!",
  },
  showTimer: {
    type: Number,
    default: 0,
  },
  alertBtnHdr: {
    type: Function,
  },
});

const isShow = ref(false);
onMounted(() => {
  messageText.value = props.message;
  buttonState.value = props.type;
  timerVal.value = props.showTimer;
  isShow.value = true;
  // if (timerVal.value > 0) {
  //   setTimeout(() => {
  //     props.handAlertView();
  //   }, timerVal.value * 1000);
  // }
});
</script>

<template>
  <div class="alert-mask" v-show="isShow">
    <!-- 提示弹窗 -->
    <div class="alert-content">
      <h1>提示</h1>
      <p>{{ messageText }}</p>
      <div class="alert-btn" v-if="buttonState == 0">
        <button @click="alertBtnHdr(0)">取消</button>
        <button @click="alertBtnHdr(1)">確定</button>
      </div>
      <div class="alert-btn" v-if="buttonState == 1">
        <button @click="alertBtnHdr(1)">確定</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.alert-mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  // background: rgba(255, 255, 255, 0.5);

  display: flex;
  align-items: center;
  justify-content: space-around;

  .alert-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 20%;
    height: 25%;
    text-align: center;
    background-color: #e6e2de;
    font-size: 20px;
    font-family: HeitiTC;
    color: #84715c;
    font-weight: bold;
    border: solid 1px #707070;
    min-width: 250px;
    > h1 {
      font-size: 25px;
    }

    > .alert-btn {
      > button {
        margin: 0 10px;
        min-width: 70px;
        border-radius: 10px;
        border: solid 1px #707070;
        background-color: white;
        color: #84715c;
      }
    }
  }
}
</style>