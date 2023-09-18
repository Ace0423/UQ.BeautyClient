
<script setup lang="ts">
import router from '@/router';

const alertState = ref(false);
const alertInformation = reactive({
    messageText: 'LINE OA串接完成後，才可開始使用線上預訂設定。', // 提示內容
    buttonState: 2, //按鈕顯示狀態 0:全部 1:只顯示確定按鈕 2:不顯示按鈕
    timerVal: 1.5, //時間計時器
});
const handAlertView = () => {
    console.log(111)
    alertState.value = !alertState.value;
    router.go(-1);
};
onMounted(() => {
    alertState.value = true;
})
</script>
<template>
    <div class="group">

    </div>
    <Alert v-if="alertState" :alert-information="alertInformation" :hand-alert-view="handAlertView"></Alert>
</template>

<style lang="scss" scoped>
div.group {
    position: absolute;
    top: 80px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: #faf9f8;
    border: solid 0.5px #ddd;
    font-family: STXihei;
    color: #717171;
}
</style>