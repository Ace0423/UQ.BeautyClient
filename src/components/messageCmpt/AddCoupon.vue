<script setup lang="ts">
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { Search } from '@element-plus/icons-vue';
import { usePriceStore} from "@/stores/priceStore";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const priceStore = usePriceStore();
const { getCouponApi } = priceStore;
const { couponListRef } = storeToRefs(priceStore);
const title = ref("優惠劵");
const selectItem: any = ref("");
const selectData: any = ref([]);
const props = defineProps<{
    mMapCouponCards: any
    handAddCouponView: Function
}>();
const emits = defineEmits<{
    (e: "handSubmit", item: any): void;
}>();

onMounted(() => {
    getCouponApi(0, 1, 1, 0, 0);
    // selectArr.value = props.mMapCouponCards;
});
const changeSelect = (data: any) => {
    selectData.value.push(data);
};
const handSubmit = () => {
    emits("handSubmit", selectData.value);
    props.handAddCouponView();
};
</script>

<template>
    <div class="popup-mask" v-on:click.self="handAddCouponView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <h1>{{ title }}</h1>
            <el-input class="w-50 m-2" size="large" placeholder="搜尋" :prefix-icon="Search" />
            <div class="content">
                <el-radio-group v-model="selectItem">
                    <el-radio v-for="item in couponListRef" :key="item.ccId" :label="item.ccId" size="large"
                        @change="changeSelect(item)">{{ item.ccTitle }}</el-radio>
                </el-radio-group>
            </div>
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
        font-size: 20px;
        font-family: HeitiTC;
        color: #84715c;
        // font-weight: bold;
        text-align: center;

        >h1 {
            font-size: 20px;
            margin: 10px 0;
        }

        >.content {
            position: absolute;
            top: 93px;
            bottom: 66px;
            left: 0px;
            right: 0px;

            >ul {
                padding-left: 0;
                margin: 0 15px;

                .coupon-content {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 10px;
                    height: 54px;



                    p {
                        margin: 0px 0px 0px 0px;
                    }

                    button {
                        border: transparent;
                        background: transparent;
                    }
                }
            }
        }



        >.sub-btn {
            position: absolute;
            // width: 98%;
            height: 66px;
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