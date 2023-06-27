<script setup lang="ts">
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";


const title = ref("人員快速排班");
const props = defineProps<{
    handQuicklyscheduleView: Function;
    requestWorkingHoursList: Function;
}>();


const handSubmit = () => {
  
};


onMounted(() => {

});
</script>

<template>
    <div class="popup-mask" v-on:click.self="handQuicklyscheduleView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <h1>{{ title }}</h1>
            <p>可安排未來人員未來每周排班工時。</p>
        
            <div class="sub-btn">
                <button class="btn" type="submit" v-on:click="handSubmit()">確認儲存</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.popup-mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    background: rgba(255, 255, 255, 0.5);

    display: flex;
    align-items: center;
    justify-content: space-around;

    .popup-content {
        // max-width: 360px;
        position: relative;
        width: 40%;
        height: 80%;
        background-color: #e6e2de;
        padding: 5px 20px;
        font-size: 16px;
        font-family: HeitiTC;
        color: #84715c;
        // font-weight: bold;
        text-align: center;

        >h1 {
            font-size: 20px;
            margin: 10px 0;
        }


        >.sub-btn {
            position: absolute;
            // width: 98%;
            left: 0px;
            right: 0px;
            bottom: 0px;
            border-top: solid 0.5px#707070;

            >.btn {
                padding: 10px 10px;
                margin: 10px 10px;
                font-size: 18px;
                color: #717171;
                border-radius: 10px;
                background-color: #faf9f8;
                border: solid 1px #707070;
            }
        }

    }
}
</style>