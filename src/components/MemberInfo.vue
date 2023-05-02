<script setup lang="ts">
import closeIcon from '@/assets/Group32.svg';
import bitmapIcon from '@/assets/bitmap.svg';
import Icon from '@/assets/Icon zocial-guest.svg';
import birthdayIcon from '@/assets/Icon awesome-birthday-cake.svg';
import addressIcon from '@/assets/Icon awesome-address-book.svg';
import lineIcon from '@/assets/Icon awesome-line.svg';
import mailIcon from '@/assets/Icon feather-mail.svg';
import gMailIcon from '@/assets/g-mail.svg'
import { useCounterStore } from "@/stores/memberBank";

const store = useCounterStore();
const { getMemberBankDetail } = store;
const simpleView = ref(true);
const currentIndex = ref(2);
const memberDetailData: any = reactive({ accountBalance: 0, recentConsumption: { amount: '-', date: '-' }, recentDeposit: { amount: '-', date: '-' } })
const props = defineProps<{
    selectMemberItem: any,
    handMemberInfoView: Function,
    handAddMemberView: Function,
}>()

const handsimpleViewBtn = () => {
    simpleView.value = !simpleView.value;
}
const changeTab = (index: number) => {
    currentIndex.value = index;
    getmemberInfoApi();
}
const getmemberInfoApi = () => {
    switch (currentIndex.value) {
        case 2:
            getMemberBankDetail(props.selectMemberItem.userId).then((res) => {
                memberDetailData.accountBalance = res.accountBalance;
                if (res.recentConsumption != null) {
                    memberDetailData.recentConsumption.amount = res.recentConsumption.amount;
                    memberDetailData.recentConsumption.date = res.recentConsumption.date;
                }
                if (res.recentDeposit != null) {
                    memberDetailData.recentDeposit.amount = res.recentDeposit.amount;
                    memberDetailData.recentDeposit.date = res.recentDeposit.date;
                };
            });
            break;

        default:
            break;
    }
}
onMounted(() => {
    getmemberInfoApi();
})
</script>

<template>
    <div class="popup-mask" v-on:click.self="handMemberInfoView()">
        <div>
            <div class="info-head">
                <img :src="closeIcon" v-on:click="handMemberInfoView()">
                <img :src="bitmapIcon" class="bitmap-img" v-on:click="handsimpleViewBtn()">
                <img v-if="simpleView"/>
            </div>
            <div>
                <div class="info-content">
                    <img class="head-shot" :src="Icon" />
                    <h1>{{ props.selectMemberItem.nameView }}</h1>
                    <p>{{ props.selectMemberItem.phone }}</p>
                    <div class="link-bottom"></div>
                    <div>
                        <button>訂單確認</button>
                        <button v-on:click="handAddMemberView()">修改顧客</button>
                    </div>
                    <div class="link-bottom"></div>
                    <div class="content-box">
                        <p>基本資料</p>
                        <div>
                            <div class="flex-box">
                                <img :src="addressIcon" />
                                <p v-if="props.selectMemberItem.sex == 1">男</p>
                                <p v-if="props.selectMemberItem.sex == 0">女</p>
                            </div>
                            <div class="flex-box">
                                <img :src="birthdayIcon" />
                                <p>{{ props.selectMemberItem.birthday }}</p>
                            </div>
                            <div class="flex-box">
                                <img :src="mailIcon" />
                                <p>{{ props.selectMemberItem.email }}</p>
                            </div>
                            <!-- <div class="flex-box">
                                <img :src="gMailIcon" />
                                <p>{{ props.selectItem.googleUserID }}</p>
                            </div>
                            <div class="flex-box">
                                <img :src="lineIcon" />
                                <p>{{ props.selectItem.lineUserID }}</p>
                            </div> -->
                        </div>
                    </div>
                    <div class="link-bottom"></div>
                    <div class="memo-box">
                        <p>備註</p>
                        <textarea disabled>{{ props.selectMemberItem.memo }}</textarea>
                    </div>
                </div>
                <div class="onsumption-content" v-if="simpleView" v-on:click="">
                    <div class="item-tab">
                        <!-- <button :class='currentIndex == 0 ? "active" : ""' v-on:click="changeTab(0)">消費表現</button>
                        <button :class='currentIndex == 1 ? "active" : ""' v-on:click="changeTab(1)">消費紀錄</button> -->
                        <button :class='currentIndex == 2 ? "active" : ""' v-on:click="changeTab(2)">儲值紀錄</button>
                    </div>
                    <div class="link-bottom"></div>
                    <div class="consumption-performance" :class='currentIndex != 0 ? "current" : ""'>
                        <div>
                            <h1>0</h1>
                            <p>平均消費金額</p>
                        </div>
                        <div>
                            <h1>0</h1>
                            <p>總消費金額</p>
                        </div>
                        <div>
                            <h1>-</h1>
                            <p>近期回購</p>
                        </div>
                        <div>
                            <h1>0</h1>
                            <p>訂單完成次數</p>
                        </div>
                        <div>
                            <h1>0</h1>
                            <p>棄單次數</p>
                        </div>
                    </div>
                    <div class="consumption-performance" :class='currentIndex != 1 ? "current" : ""'>

                    </div>
                    <div class="consumption-performance" :class='currentIndex != 2 ? "current" : ""'>

                        <div>
                            <h1>{{ memberDetailData.accountBalance }}</h1>
                            <p>儲值金餘額</p>
                        </div>
                        <div>
                            <h1>{{ memberDetailData.recentConsumption.amount }}</h1>
                            <p>最後消費金額</p>
                        </div>
                        <div>
                            <h1>{{ memberDetailData.recentConsumption.date }}</h1>
                            <p>最後消費日期</p>
                        </div>
                        <div>
                            <h1>{{ memberDetailData.recentDeposit.amount }}</h1>
                            <p>最後儲值金額</p>
                        </div>
                        <div>
                            <h1>{{ memberDetailData.recentDeposit.date }}</h1>
                            <p>最後儲值日期</p>
                        </div>
                    </div>
                </div>
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
    z-index: 50001;
    background: rgba(137, 137, 137, 0.5);


    display: flex;
    align-items: center;
    justify-content: end;

    >div {
        height: 100%;
        border-radius: 10px 0 0 10px;
        border: solid 1px #707070;
        background-color: #faf9f8;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        >.info-head {
            justify-content: space-between;
            >img{
                display: flex;
                justify-content: center;
                margin: 10px 10px 10px 10px;
            }
        }

        >.bitmap-img {
            position: relative;
            left: 220px;
        }

        >img {
            cursor: pointer;
            margin: 10px 20px;
        }

        >div {
            display: flex;
            // height: 90%;
            margin: 0px 10px 10px 10px;

            >div {
                border-radius: 10px;
                box-shadow: inset 0 10px 6px 0 rgba(0, 0, 0, 0.16);
                min-width: 360px;
                // min-height: 650px;
                margin: 0 10px;
                border: solid 1px #707070;
            }

            .info-content {
                display: flex;
                flex-direction: column;
                text-align: center;

                .head-shot {
                    position: relative;
                    top: -35px;
                    width: 15%;
                    margin: auto;
                }

                >h1 {
                    font-family: STXihei;
                    font-size: 25px;
                    color: #717171;
                }

                >p {
                    margin: 5px;
                    font-family: STXigei;
                    font-size: 20px;
                    color: #717171;
                }

                >div {
                    button {
                        width: 115px;
                        height: 55px;
                        opacity: 0.5;
                        border-radius: 10px;
                        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
                        border: solid 1px #707070;
                        background-color: #e6e2de;
                        margin: 10px;
                    }
                }

                .content-box {
                    margin: 5px 30px 18px;
                    color: #877059;

                    P {
                        margin: 0 0 5px 0;
                    }

                    >div {
                        border: solid 1px #707070;
                        background-color: #e6e2de;
                        border-radius: 10px;
                    }

                    .flex-box {
                        display: flex;
                        height: 40px;
                        margin: 10px 10px;
                        align-items: center;

                        p {
                            margin: 10px;
                        }

                        img {
                            width: 20px;
                            height: 20px;
                        }
                    }
                }

                .memo-box {
                    margin: 5px 30px;
                    color: #877059;

                    // flex: 1;
                    >p {
                        margin: 0;
                    }

                    textarea {
                        border: solid 1px #707070;
                        background-color: #e6e2de;
                        border-radius: 10px;
                        width: 100%;
                        min-height: 120px;
                        margin-top: 5px;
                    }


                }

                // .info-content>div:last-child {
                //     flex: 1;
                // }
            }


            .onsumption-content {
                >.item-tab {
                    display: flex;
                    margin: 20px 30px 5px;

                    >button {
                        // display: flex;
                        justify-content: center;
                        align-items: center;
                        border: none;
                        // width: 120px;
                        // height: 45px;
                        border-radius: 10px 10px 0 0;
                        background: transparent;
                        font-size: 20px;
                        font-weight: bold;
                        font-family: HeitiTC;
                        color: #717171;
                        text-decoration: none;
                    }

                    >button.active {
                        box-shadow: 0 2px;
                        padding-bottom: 3px;
                        // text-decoration: underline;
                        color: #877059;
                    }
                }

                >.consumption-performance {
                    >div {
                        margin: 20px 30px;
                        padding: 5px 15px;
                        border: solid 1px #707070;
                        background-color: #e6e2de;
                        border-radius: 10px;
                        color: #717171;

                        >h1 {
                            font-size: 30px;
                        }

                        >p {
                            font-size: 16px;
                            margin: 0;
                        }
                    }
                }
            }

            .link-bottom {
                padding: 0 10px;
                opacity: 0.5;
                margin: auto;
                width: 80%;
                height: 2px;
                background-color: #707070;
            }

            .current {
                display: none;
            }
        }
    }

    >div>div:last-child {
        flex: 1;
    }

}
</style>