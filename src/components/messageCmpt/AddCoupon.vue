<script setup lang="ts">
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { Search } from '@element-plus/icons-vue';
import { useApptStore } from "@/stores/priceStore";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const priceStore = useApptStore();
const { getCouponApi } = priceStore;
const title = ref("優惠劵");
const props = defineProps<{
    handAddCouponView: Function
}>();
const handSubmit = () => {

};

onMounted(() => {
    getCouponApi(0, 0, 1, 0, 0)
});

</script>

<template>
    <div class="popup-mask" v-on:click.self="handAddCouponView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <h1>{{ title }}</h1>
            <el-input
      class="w-50 m-2"
      size="large"
      placeholder="搜尋"
      :prefix-icon="Search"
    />
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