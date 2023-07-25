<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { usePriceStore } from "@/stores/priceStore";
const priceStore = usePriceStore();
const { getTopUpCardList, addTopUpCardInfo, editTopUpCardInfo } = priceStore;

const title = ref("");
const specifiedItem = ref(0);
const submitNameBtn = ref('確認');
const promotionalItemsView = ref(false);
const handselItemsView = ref(false);
const handselType = ref(0)
const promotionMethod: any = [
    {
        value: 0,
        label: '無折扣',
    },
    {
        value: 1,
        label: '優惠折扣',
    }
]
const specifiedItemThem: any = [
    {
        value: 0,
        label: '所有服務與商品',
    },
    {
        value: 1,
        label: '指定服務與商品',
    }
]
const priceMethod: any = [
    {
        value: 1,
        label: '折扣佔比 (%)',
    },
    {
        value: 2,
        label: '折讓金額 ($)',
    }
]
const limitTime: any = [
    {
        value: 0,
        label: '不限期',
    },
    {
        value: 1,
        label: '限制天數',
    }
]
const limitDay: any = [
    {
        value: 1,
        label: '1周',
    },
    {
        value: 2,
        label: '2周',
    },
    {
        value: 3,
        label: '3周',
    },
    {
        value: 4,
        label: '1月',
    },
    {
        value: 5,
        label: '3月',
    },
    {
        value: 6,
        label: '6月',
    }
]
const shareObject: any = [
    {
        value: true,
        label: '所有人',
    },
    {
        value: false,
        label: '購買者本人',
    },
]
const errorHint: any = [
    {
        value: 0,
        label: '必填項目',
    },
    {
        value: 1,
        label: '輸入數值不得低於0%',
    },
    {
        value: 2,
        label: '輸入數值不得低於0元',
    },
]
const cardData: any = reactive({
    tuId: 0,
    tuTitle: "",
    tuContext: "",
    tuType: 0,
    tuImage: "",
    tuSellPrice: 0,
    tuViewPrice: 0,
    tudType: 0,
    tuddType: 0,
    tuddPrice: 0,
    tuLimitType: 0,
    tuLimitDay: 0,
    utShared: true,
    topUpCardMapProducts: [],
    topUpCardMapServices: [],
    topUpCardFreeProducts: [],
    topUpCardFreeServices: []
});

const cancelDiscount = (() => {
    if (cardData.tudType == 0) {
        cardData.tuddType = 0
        specifiedItem.value = 0;
        cardData.tuddPrice = 0;
    }
})
const props = defineProps<{
    selectTopUpCardItem: any;
    handAddTopUpCardView: Function;
}>();

onMounted(() => {
    if (props.selectTopUpCardItem != undefined) {
        cardData.tuId = props.selectTopUpCardItem.tuId;
        cardData.tuTitle = props.selectTopUpCardItem.tuTitle;
        cardData.tuContext = props.selectTopUpCardItem.tuContext;
        cardData.tuType = props.selectTopUpCardItem.tuType;
        cardData.tuImage = props.selectTopUpCardItem.tuImage;
        cardData.tuSellPrice = props.selectTopUpCardItem.tuSellPrice;
        cardData.tuViewPrice = props.selectTopUpCardItem.tuViewPrice;
        cardData.tudType = props.selectTopUpCardItem.tudType;
        cardData.tuddType = props.selectTopUpCardItem.tuddType;
        cardData.tuddPrice = props.selectTopUpCardItem.tuddPrice;
        cardData.tuLimitType = props.selectTopUpCardItem.tuLimitType;
        cardData.tuLimitDay = props.selectTopUpCardItem.tuLimitDay;
        cardData.utShared = props.selectTopUpCardItem.utShared;
        cardData.topUpCardMapProducts = props.selectTopUpCardItem.topUpCardMapProducts.filter((item: any) => {
            let val: number = item.pid;
            return val
        });
        cardData.topUpCardMapServices = props.selectTopUpCardItem.topUpCardMapProducts.filter((item: any) => {
            let val: number = item.lid;
            return val
        });
        cardData.topUpCardFreeProducts = props.selectTopUpCardItem.topUpCardFreeProducts.filter((item: any) => {
            let val: number = item.pid;
            return val
        });
        cardData.topUpCardFreeServices = props.selectTopUpCardItem.topUpCardFreeServices.filter((item: any) => {
            let val: number = item.lid;
            return val
        });
    }
    console.log(cardData)
});
const handPromotionalView = (() => {
    promotionalItemsView.value = !promotionalItemsView.value;
})
const handHandselView = ((type: any) => {
    handselType.value = type;
    handselItemsView.value = !handselItemsView.value;
})
const handSubmit = () => {
    if (cardData.tuId == 0) {
        addTopUpCardInfo(cardData)
            .then((res: any) => {
                if (res.table) {

                }
                if (res.state == 2) {
                    Alert.warning(showErrorMsg(res.msg), 2000);
                }
            })
            .catch((e: any) => {
                Alert.warning(showHttpsStatus(e.response.status), 2000);
            });
    } else if (cardData.tuId == 1) {
        editTopUpCardInfo(cardData)
            .then((res: any) => {
                if (res.table) {

                }
                if (res.state == 2) {
                    Alert.warning(showErrorMsg(res.msg), 2000);
                }
            })
            .catch((e: any) => {
                Alert.warning(showHttpsStatus(e.response.status), 2000);
            });
    }
};
const getErrorHint = computed(() => {
    if (cardData.tudType == 1 && cardData.tuddPrice != '') {
        let price = cardData.tuddPrice <= 0 ? true : false;
        switch (cardData.tuddType) {
            case 1:
                return price == true ? '輸入數值不得低於0%' : '';;
                break;
            case 2:
                return price == true ? '輸入數值不得低於0元' : '';
                break;
            default:
                break;
        }
    } else if (cardData.tudType == 1 && cardData.tuddType != 0 && cardData.tuddPrice == '') {
        return cardData.tuddPrice == "" ? '必填項目' : '';
    }

})
const handPromotionalSubmit = ((products: any, services: any) => {
    cardData.topUpCardMapProducts = products;
    cardData.topUpCardMapServices = services;
})
const handHandselSubmit = ((products: any, services: any) => {
    cardData.topUpCardFreeProducts = products;
    cardData.topUpCardFreeServices = services;
})
</script>

<template>
    <div class="popup-mask" v-on:click.self="handAddTopUpCardView('')">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <div class="top-content">
                <img :src="icon_closeX" v-on:click="handAddTopUpCardView('')" />
                <span>{{ title }}</span>
                <button class="otherpay-btn" v-on:click="handSubmit()">{{ submitNameBtn }}</button>
            </div>
            <div class="content">
                <div class="info-content">
                    <div class="stored-card-content">
                        <h2>儲值卡內容</h2>
                        <p>填寫儲值卡上的內容。</p>
                        <div class="stored-card-input">
                            <div>
                                <p>*儲值卡主體</p>
                                <input placeholder="請輸入儲值卡主體" v-model="cardData.tuTitle" />
                            </div>
                            <div>
                                <p>*販賣價格</p>
                                <input placeholder="請輸入販賣價格" v-model="cardData.tuSellPrice" />
                            </div>
                            <div>
                                <p>*儲值卡面額</p>
                                <input placeholder="請輸入儲值卡面額" v-model="cardData.tuViewPrice" />
                            </div>
                        </div>
                    </div>
                    <div class="promotion-content">
                        <h2>優惠方式</h2>
                        <div class="promotion-type">
                            <div class="container">
                                <p>*方式</p>
                                <div class="promotion-select">
                                    <select v-model="cardData.tudType" @change="cancelDiscount">
                                        <option disabled value="">請選擇優惠方式</option>
                                        <option v-for="item in promotionMethod" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="container" v-if="cardData.tudType == 1">
                                <p>*優惠方式</p>
                                <div class="promotion-select">
                                    <select v-model="cardData.tuddType">
                                        <option disabled value="0">請選擇優惠方式</option>
                                        <option v-for="item in priceMethod" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="discount-type" v-if="cardData.tudType == 1">
                                <div class="discount-container">
                                    <p>*折扣比</p>
                                    <div class="discount-input">
                                        <input type="number" v-model.number="cardData.tuddPrice" />
                                    </div>
                                </div>
                                <div class="discount-hint">
                                    <p>{{ getErrorHint }}</p>
                                </div>
                            </div>
                            <div class="container" v-if="cardData.tudType == 1">
                                <p>*指定項目</p>
                                <div class="promotion-select">
                                    <select v-model="specifiedItem">
                                        <option disabled value="">請選擇優惠方式</option>
                                        <option v-for="item in specifiedItemThem" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div v-if="specifiedItem == 1">
                                <u @click="handPromotionalView">加入項目</u>
                            </div>
                            <p v-if="cardData.tudType == 0" class="right-p">可作為單純儲值金使用</p>
                        </div>
                    </div>
                    <div class="products-content">
                        <h2>贈送商品項目</h2>
                        <div class="products-input">
                            <u @click="handHandselView(1)">加入贈送商品</u>
                        </div>
                    </div>
                    <div class="services-content">
                        <h2>贈送商品服務</h2>
                        <div class="services-input">
                            <u @click="handHandselView(0)">加入贈送服務</u>
                        </div>
                    </div>
                    <div class="usage-restrictions">
                        <h2>使用限制</h2>
                        <div class="usage-content">
                            <div>
                                <p>*期限</p>
                                <div class="usage-select">
                                    <select v-model="cardData.tuLimitType">
                                        <option disabled value="">請選擇期限</option>
                                        <option v-for="item in limitTime" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div v-if="cardData.tuLimitType == 1">
                                <p>*可使用天數</p>
                                <div class="usage-select">
                                    <select v-model="cardData.tuLimitDay">
                                        <option disabled value="0">請選擇期限</option>
                                        <option v-for="item in limitDay" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <p>*對象</p>
                                <div class="usage-select">
                                    <select v-model="cardData.utShared">
                                        <option disabled value="">請選擇對象</option>
                                        <option v-for="item in shareObject" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="example-img">

                </div>
            </div>
        </div>
    </div>
    <PromotionalItems v-if="promotionalItemsView" :handPromotionalView="handPromotionalView" :promotional="cardData"
        @handSubmit="handPromotionalSubmit"></PromotionalItems>
    <HandselItems v-if="handselItemsView" :handHandselView="handHandselView" :handselType="handselType"
        :promotional="cardData" @handSubmit="handHandselSubmit"></HandselItems>
</template>

<style scoped lang="scss">
.popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 3;
    background: rgba(255, 255, 255, 0.5);

    display: flex;
    align-items: center;
    justify-content: space-around;

    .popup-content {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        font-size: 20px;
        font-family: HeitiTC;
        color: #84715c;
        font-weight: bold;

        ::placeholder {
            color: #d3d3d3;
        }

        .top-content {
            display: flex;
            height: 70px;
            border: solid 1px #ddd;
            box-sizing: border-box;

            >span {
                display: flex;
                width: calc(100%);
                justify-content: center;
                align-items: center;
                font-size: 28px;
                height: 70px;
                // height: 100px;
                justify-content: center;
            }

            >img {
                position: absolute;
                width: 41px;
                height: 38px;
                top: 15px;
                left: 15px;
            }

            >button {
                position: absolute;
                width: 150px;
                height: 50px;
                top: 10px;
                right: 10px;
                border-radius: 5px;
                border: none;
                background-color: #84715c;
                color: #fff;
            }
        }



        >.content {
            height: calc(100% - 70px);
            color: #717171;
            display: flex;
            margin: 0 15px;

            >.info-content {
                width: 60%;
                border-right: solid 1px #929090;
                height: 100%;
                overflow: auto;

                >.stored-card-content {
                    margin: 0 15px;

                    >h2 {
                        margin: 10px 0;
                    }

                    >p {
                        margin: 0 0;
                    }

                    >.stored-card-input {
                        >div {
                            display: flex;
                            width: 100%;
                            border: solid 0.5px #a19f9f;
                            border-radius: 5px 5px 5px 5px;
                            text-align: left;
                            margin: 5px 0;
                            background: #e6e2de;

                            P {
                                width: 20%;
                                margin: 20px 10px;
                            }

                            input {
                                text-align: center;
                                border: transparent;
                                display: inline-block;
                                flex: 1;
                                border-left: solid 0.5px #a19f9f;
                                border-radius: 0 5px 5px 0;
                            }
                        }
                    }
                }

                >.promotion-content {
                    margin: 0 15px;

                    >.promotion-type {
                        >.container {
                            display: flex;
                            width: 100%;
                            border: solid 0.5px #a19f9f;
                            border-radius: 5px 5px 5px 5px;
                            text-align: left;
                            margin: 5px 0;
                            background: #e6e2de;

                            P {
                                width: 20%;
                                margin: 20px 10px;
                            }

                            .promotion-select {
                                position: relative;
                                border-left: solid 0.5px #a19f9f;
                                flex: 1;
                                margin: 0 0;

                                input {
                                    position: absolute;
                                    top: 1px;
                                    left: 1px;
                                    right: 1px;
                                    bottom: 1px;
                                    border: transparent;
                                    text-align: center;
                                }

                                >select {
                                    position: absolute;
                                    top: 1px;
                                    left: 1px;
                                    right: 1px;
                                    bottom: 1px;
                                    border: transparent;
                                    text-align: center;
                                }
                            }


                        }

                        .price-type {
                            display: none;
                        }

                        .right-p {
                            text-align: right;
                            margin-right: 10px;
                        }

                        >.discount-type {

                            >.discount-container {
                                display: flex;
                                width: 100%;
                                border: solid 0.5px #a19f9f;
                                border-radius: 5px 5px 5px 5px;
                                text-align: left;
                                margin: 5px 0;
                                background: #e6e2de;

                                P {
                                    width: 20%;
                                    margin: 20px 10px;
                                }

                                .discount-input {
                                    position: relative;
                                    border-left: solid 0.5px #a19f9f;
                                    flex: 1;
                                    margin: 0 0;

                                    input {
                                        position: absolute;
                                        top: 1px;
                                        left: 1px;
                                        right: 1px;
                                        bottom: 1px;
                                        border: transparent;
                                        text-align: center;
                                    }
                                }
                            }

                            >.discount-hint {
                                p {
                                    margin: 0 0;
                                    padding: 0px 10px;
                                    color: #ff0000;
                                }
                            }
                        }

                    }
                }

                >.products-content {
                    margin: 50px 15px;

                    >h2 {
                        margin: 10px 0;
                    }

                    >p {
                        margin: 0 0;
                    }

                    >.products-input {
                        border-top: solid 0.5px #a19f9f;
                        border-bottom: solid 0.5px #a19f9f;
                        padding: 20px 10px;
                    }
                }

                >.services-content {
                    margin: 50px 15px;

                    >h2 {
                        margin: 10px 0;
                    }

                    >p {
                        margin: 0 0;
                    }

                    >.services-input {
                        border-top: solid 0.5px #a19f9f;
                        border-bottom: solid 0.5px #a19f9f;
                        padding: 20px 10px;
                    }
                }

                >.usage-restrictions {
                    margin: 50px 15px;

                    >h2 {
                        margin: 10px 0;
                    }

                    >p {
                        margin: 0 0;
                    }

                    >.usage-content {
                        >div {
                            display: flex;
                            width: 100%;
                            border: solid 0.5px #a19f9f;
                            border-radius: 5px 5px 5px 5px;
                            text-align: left;
                            margin: 5px 0;
                            background: #e6e2de;
                            position: relative;

                            P {
                                width: 20%;
                                margin: 20px 10px;
                            }

                            .usage-select {
                                position: relative;
                                border-left: solid 0.5px #a19f9f;
                                flex: 1;
                                margin: 0 0;

                                >input {
                                    width: auto;
                                    height: 100%;
                                    border: transparent;
                                    background: transparent;
                                    box-sizing: border-box;
                                    text-align: center;
                                    outline: transparent;
                                }

                                >select {
                                    position: absolute;
                                    top: 1px;
                                    left: 1px;
                                    right: 1px;
                                    bottom: 1px;
                                    border: transparent;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
            }

        }

        .current {
            display: none;
        }

        >.sub-btn {
            position: absolute;
            height: 67px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            border-top: solid 0.5px#a19f9f;

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