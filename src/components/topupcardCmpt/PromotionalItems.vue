<script setup lang="ts">
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { useCompanyStore } from "@/stores/company";
import { useApptStore } from "@/stores/apptStore";
const appStore = useApptStore();
const companyStore = useCompanyStore();
const { getCourseTypeApi } = appStore;
const { courseTypesTabs } = storeToRefs(appStore);
const { postCheckOutType, putCheckOutType } = companyStore;
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const title = ref("加入商品");
const products = ref([]);
const services = ref([]);
const currentIndex = ref(0);
const keyWord = ref("");
const props = defineProps<{
    // promotional: any,
    handTopUpCardInfoView: Function,
}>();
const handSubmit = () => {
};

onMounted(() => {
    getCourseTypeApi(0);
});
const changeTab = (index: number) => {
    currentIndex.value = index;
};
</script>

<template>
    <div class="popup-mask" v-on:click.self="handTopUpCardInfoView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <h1>{{ title }}</h1>
            <div class="item-tab">
                <button :class="currentIndex == 0 ? 'active' : ''" v-on:click="changeTab(0)">
                    服務
                </button>
                <button :class="currentIndex == 1 ? 'active' : ''" v-on:click="changeTab(1)">
                    產品
                </button>
            </div>
            <div class="container">
                <div :class="currentIndex != 0 ? 'current' : ''">
                    <input class="select-input" placeholder="🔍搜尋服務" v-model="keyWord" />
                    <div class="services-container">
                        <div class="content" v-for="item in courseTypesTabs" :key="item">
                            <input type="checkbox" />
                            <p>{{item.nameTw}}</p>
                            <div>
                                <p>111</p>
                                <p>222</p>
                            </div>
                            <p> ${{item.price}}</p>
                        </div>
                    </div>
                </div>
                <div :class="currentIndex != 1 ? 'current' : ''">
                    <input class="select-input" placeholder="🔍搜尋產品" v-model="keyWord" />
                </div>
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
        font-size: 16px;
        font-family: HeitiTC;
        color: #84715c;
        // font-weight: bold;
        text-align: center;


        >.item-tab {
            display: flex;

            >button {
                display: flex;
                justify-content: center;
                align-items: center;
                border: none;
                width: 50%;
                height: 45px;
                border-radius: 10px 10px 0 0;
                background-color: #e6e2de;
                font-size: 20px;
                font-weight: bold;
                font-family: HeitiTC;
                color: #717171;
            }

            >button.active {
                background-color: #faf9f8;
            }
        }

        >.container {
            position: absolute;
            top: 92px;
            bottom: 65px;
            left: 20px;
            right: 20px;
            background-color: #faf9f8;

            .select-input {
                width: 100%;
                height: 40px;
                padding: 10px 0 0 0;
                border: none;
            }

            .services-container {
                >.content {
                    display: flex;
                }
            }
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

        .current {
            display: none;
        }
    }
}
</style>