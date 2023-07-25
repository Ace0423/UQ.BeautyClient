<script setup lang="ts">
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { useCompanyStore } from "@/stores/company";
import { useApptStore } from "@/stores/apptStore";
const appStore = useApptStore();
const companyStore = useCompanyStore();
const { getCourseDetailApi, getGoodsDetailApi } = appStore;
const { courseDataList, goodsDetailListRef } = storeToRefs(appStore);
const { postCheckOutType, putCheckOutType } = companyStore;
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const title = ref("贈送商品");
const products = ref([]);
const services = ref([]);
const currentIndex = ref(0);
const keyWord = ref("");
const props = defineProps<{
    handselType: any,
    promotional: any,
    handHandselView: Function,
}>();
const emits = defineEmits<{
    (e: "handSubmit", services: any, products: any): void;
}>();

const getDataDetailApi = (() => {
    if (currentIndex.value == 0) {
        getCourseDetailApi(0, 0);
    } else if (currentIndex.value == 1) {
        getGoodsDetailApi(0, 0)
    }
})
const getServicesListFn = (data: any) => {
    return (
        !keyWord.value ||
        data.nameTw.toLowerCase().includes(keyWord.value.toLowerCase())
    );
};
const getProductsListFn = (data: any) => {
    return (
        !keyWord.value ||
        data.pName.toLowerCase().includes(keyWord.value.toLowerCase())
    );
};
const filterServicesListFnData = computed(() => {
    const filter = courseDataList.value.filter(getServicesListFn);
    return filter;
});
const filterProductsListFnData = computed(() => {
    const filter = goodsDetailListRef.value.filter(getProductsListFn);
    return filter;
});

onMounted(() => {
    changeTab(props.handselType);
    services.value = props.promotional.topUpCardFreeServices;
    products.value = props.promotional.topUpCardFreeProducts;
    getDataDetailApi();
});
const changeTab = (index: number) => {
    currentIndex.value = index;
    getDataDetailApi();
};
const handSubmit = () => {
    emits("handSubmit", products, services);
};
</script>

<template>
    <div class="popup-mask" v-on:click.self="handHandselView()">
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
                    <div class="content-container">
                        <div class="content" v-for="item in filterServicesListFnData" :key="item.lessonId">
                            <input class="col-2" type="checkbox" :value="item.lessonId" v-model="services" />
                            <div class="col-6">
                                <p>{{ item.nameTw }}</p>
                                <p>{{ item.servicesTime }}分</p>
                            </div>
                            <p class="col-2">${{ item.price }}</p>
                        </div>
                    </div>
                </div>
                <div :class="currentIndex != 1 ? 'current' : ''">
                    <input class="select-input" placeholder="🔍搜尋產品" v-model="keyWord" />
                    <div class="content-container">
                        <div class="content" v-for="item in filterProductsListFnData" :key="item.pId">
                            <input class="col-2" type="checkbox" :value="item.pId" v-model="products" />
                            <div class="col-6">
                                <p>{{ item.pName }}</p>
                                <p>{{ item.memo }}分</p>
                            </div>
                            <p class="col-2">${{ item.price }}</p>
                        </div>
                    </div>
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


            >div {
                height: 100%;
                position: relative;

                .select-input {
                    width: 100%;
                    height: 40px;
                    padding: 10px 0 0 0;
                    border: none;
                }

                .content-container {
                    overflow: auto;
                    position: absolute;
                    top: 60px;
                    bottom: 0px;
                    right: 0px;
                    left: 0px;

                    >.content {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        border-bottom: solid 1px #707070;

                        >.col-2 {
                            width: 20%;
                        }

                        >.col-6 {
                            width: 60%;
                        }
                    }
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