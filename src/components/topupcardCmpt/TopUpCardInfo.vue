<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { storeToRefs } from "pinia";
import { usePriceStore } from "@/stores/priceStore";
const priceStore = usePriceStore();
const { getTopUpCardList, editTopUpCardInfo } = priceStore;
const { topUpCardList } = storeToRefs(priceStore);
const title = ref("");
const currentIndex = ref(1);
const infoDate: any = reactive({ data: [] });
const recordDate: any = reactive({ data: [] });
const props = defineProps<{
    selectItem: any,
    handTopUpCardInfoView: Function,
}>();
const getTopUpCardData = ((id: any) => {
    let allTopUpCard = {
        TUId: id,
        select: currentIndex.value,
        type: 0,
        pageindex: 0,
        count: 0,
    };
    getTopUpCardList(allTopUpCard)
        .then((res) => {
            if (res.table) {
                if (allTopUpCard.select == 1) {
                    infoDate.data = res.table[0];
                } else if (allTopUpCard.select == 2) {
                    recordDate.data = res.table;
                }
            }
            if (res.state == 2) {
                Alert.warning(showErrorMsg(res.msg), 2000);
            }
        })
        .catch((e: any) => {
            Alert.warning(showHttpsStatus(e.response.status), 2000);
        });
})
onMounted(() => {
    getTopUpCardData(props.selectItem.tuId);
})
const changeTab = (index: number) => {
    currentIndex.value = index;
    getTopUpCardData(props.selectItem.tuId);
};
const handStopCardBtn = (() => {
    let data: any = {
        dateCreate: infoDate.data.dateCreate,
        topUpCardFreeProducts: [],
        topUpCardFreeServices: [],
        topUpCardMapProducts: [],
        topUpCardMapServices: [],
        tuContext: infoDate.data.tuContext,
        tuId: infoDate.data.tuId,
        tuImage: infoDate.data.tuImage,
        tuLimitDay: infoDate.data.tuLimitDay,
        tuLimitType: infoDate.data.tuLimitType,
        tuSellCount: infoDate.data.tuSellCount,
        tuSellPrice: infoDate.data.tuSellPrice,
        tuType: infoDate.data.tuType,
        tuViewPrice: infoDate.data.tuViewPrice,
        tudType: infoDate.data.tudType,
        tuddPrice: infoDate.data.tuddPrice,
        tuddType: infoDate.data.tuddType,
        utShared: infoDate.data.utSharedv,
        tuTitle: infoDate.data.tuTitle
    }
    for (let index = 0; index < infoDate.data.topUpCardFreeProducts.length; index++) {
        data.topUpCardFreeProducts.push(infoDate.data.topUpCardFreeProducts[index].pid);
    }
    for (let index = 0; index < infoDate.data.topUpCardFreeServices.length; index++) {
        data.topUpCardFreeServices.push(infoDate.data.topUpCardFreeServices[index].lid);
    }
    for (let index = 0; index < infoDate.data.topUpCardMapProducts.length; index++) {
        data.topUpCardMapProducts.push(infoDate.data.topUpCardMapProducts[index].pid);
    }
    for (let index = 0; index < infoDate.data.topUpCardMapServices.length; index++) {
        data.topUpCardMapServices.push(infoDate.data.topUpCardMapServices[index].lid);
    }
    editTopUpCardInfo(data)
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
})
const handEditCardBtn = (() => {
    props.handTopUpCardInfoView();
})
</script>

<template>
    <div class="popup-mask" v-on:click.self="handTopUpCardInfoView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <div class="top-content">
                <img class="closeX" :src="icon_closeX" v-on:click="handTopUpCardInfoView()" />
                <h3>{{ infoDate.data.tuTitle }}</h3>
            </div>
            <div class="style-card">
                <p>代碼</p>
                <div class="info-card">
                    <div>
                        <h1>{{ infoDate.data.tuTitle }}</h1>
                        <p v-if="infoDate.data.tuLimitType == 0">不限制</p>
                        <p v-if="infoDate.data.tuLimitType == 1">限{{ infoDate.data.tuLimitDay }}周使用完</p>
                    </div>
                    <div>
                        <h1>${{ infoDate.data.tuViewPrice }}</h1>
                        <p>剩餘面額</p>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="item-tab">
                    <button :class="currentIndex == 1 ? 'active' : ''" v-on:click="changeTab(1)">
                        儲值卡內容
                    </button>
                    <button :class="currentIndex == 2 ? 'active' : ''" v-on:click="changeTab(2)">
                        銷售紀錄
                    </button>
                </div>
                <div class="item-content">
                    <div class="card-content" v-if="currentIndex == 1">
                        <P>優惠方式</P>
                        <ul>
                            <li>
                                <h3 v-if="infoDate.data.tuddType == 0">。無優惠</h3>
                                <h3 v-if="infoDate.data.tuddType == 1">。優惠{{ infoDate.data.tuddPrice }}折</h3>
                                <h3 v-if="infoDate.data.tuddType == 2">。折扣{{ infoDate.data.tuddPrice }}</h3>
                            </li>
                        </ul>
                        <P>建立時間</P>
                        <ul>
                            <li v-if="infoDate.data.dateCreate">
                                <h3>。{{ infoDate.data.dateCreate.replace('T', ' ') }}</h3>
                            </li>
                        </ul>
                        <P>適用對象</P>
                        <ul>
                            <li>
                                <h3 v-if="infoDate.data.utShared">。購買者本人</h3>
                                <h3 v-if="!infoDate.data.utShared">。購買者本人</h3>
                            </li>
                        </ul>
                        <P>適用項目</P>
                        <div>
                            <ul>
                                <li v-for="item in infoDate.data.topUpCardMapProducts" :key="item.pid">
                                    <h3>。{{ item.pTitle }}</h3>
                                </li>
                                <li v-for="item in infoDate.data.topUpCardMapServices" :key="item.lid">
                                    <h3>。{{ item.lTitle }}</h3>
                                </li>
                            </ul>
                        </div>
                        <P>贈送項目</P>
                        <div>
                            <ul>
                                <li v-for="item in infoDate.data.topUpCardFreeProducts" :key="item.pid">
                                    <h3>。{{ item.pTitle }}</h3>
                                </li>
                                <li v-for="item in infoDate.data.topUpCardFreeServices" :key="item.lid">
                                    <h3>。{{ item.lTitle }}</h3>
                                </li>
                            </ul>
                        </div>
                        <div>

                        </div>
                        <P>注意事項</P>
                        <div class="attention-content">
                            <ul>
                                <li>
                                    <h3>。{{ infoDate.data.tuContext }}</h3>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="record-content" v-if="currentIndex == 2">
                        <div class="sale-block">
                            <h1>{{ recordDate.data.length }}</h1>
                            <h1>銷售數量</h1>
                        </div>
                        <h3>銷售紀錄</h3>
                        <div class="sale-record">
                            <div class="sale-record-title">
                                <label>顧客</label>
                                <label>購買時間</label>
                            </div>
                            <div v-if="recordDate.data.length == 0">
                                <h3>無銷售紀錄</h3>
                            </div>
                            <div v-if="recordDate.data.length > 0">
                                <div class="sale-record-content" v-for="item in recordDate.data[0].sellList" :key="item">
                                    <label>{{ item.userName }}</label>
                                    <label>{{ item.dateBuy }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sub-btn">
                <button class="cancelBtn" type="submit" @click="handStopCardBtn()">停用儲值卡</button>
                <button class="submitBtn" type="submit" @click="handEditCardBtn()">編輯</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 3;
    background: rgba(5, 5, 5, 0.5);

    display: flex;
    align-items: center;
    justify-content: space-around;

    .popup-content {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        width: 40%;
        background-color: #ffffff;
        border-radius: 10px 0 0;

        .top-content {
            height: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;

            >.closeX {
                position: absolute;
                left: 20px;
            }
        }

        .style-card {
            border-radius: 10px;
            border: solid 1px #707070;
            height: 20%;
            margin: 0 25px;
            padding: 0px 15px;

            >.info-card {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }

        >.content {
            position: absolute;
            top: 236px;
            bottom: 66px;
            left: 0px;
            right: 0px;
            // background: #faf9f8;

            padding: 10px 30px;

            >.item-tab {
                display: flex;
                justify-content: center;
                border-bottom: solid 0.5px #a19f9f;
                color: #c4c4c4;


                >button {
                    height: 45px;
                    background-color: transparent;
                    border: transparent;
                }

                >button.active {
                    color: #707070;
                    border-bottom: solid 0.5px #707070;
                }
            }

            >.item-content {
                position: absolute;
                top: 56px;
                bottom: 0px;
                left: 0px;
                right: 0px;
                overflow: auto;
                margin: 0 0 10px 0;

                >.card-content {
                    // width: 100%;
                    height: 100%;
                    padding: 0px 40px 0px 40px;

                    >.attention-content {
                        word-wrap: break-word;
                    }

                }

                >.record-content {
                    // width: 100%;
                    height: 100%;
                    margin: 10px 25px;

                    >.sale-block {
                        border-radius: 10px;
                        background-color: #faf9f8;
                        height: 30%;
                        // margin: 10px 25px;
                        padding: 0px 15px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;


                    }

                    >.sale-record {
                        border-bottom: solid 0.5px #faf9f8;

                        >.sale-record-title {
                            display: flex;
                            justify-content: space-between;
                            border-radius: 10px 10px 0 0;
                            background-color: #faf9f8;
                            padding: 15px 15px;
                        }

                        .sale-record-content {
                            display: flex;
                            justify-content: space-between;
                            padding: 10px 10px;
                        }
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
            display: flex;
            justify-content: space-around;
            border-top: solid 0.5px #707070;

            >.cancelBtn {
                padding: 10px 10px;
                margin: 10px 10px;
                font-size: 18px;
                color: #e70909;
                border-radius: 10px;
                background-color: #faf9f8;
                border: solid 1px #707070;
            }

            >.submitBtn {
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