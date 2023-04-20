<script setup lang="ts">
import closeIcon from '@/assets/Group32.svg';
import bitmapIcon from '@/assets/bitmap.svg';
import Icon from '@/assets/Icon zocial-guest.svg';
import birthdayIcon from '@/assets/Icon awesome-birthday-cake.svg';
import addressIcon from '@/assets/Icon awesome-address-book.svg';
import lineIcon from '@/assets/Icon awesome-line.svg';
import mailIcon from '@/assets/Icon feather-mail.svg';

const simpleView = ref(true);
const currentIndex = ref(0);
const props = defineProps<{
    selectItem: any,
    handMemberInfoView: Function,
}>()

const handsimpleViewBtn = () => {
    simpleView.value = !simpleView.value;
}
const changeTab = (index: number) => {
    currentIndex.value = index;
}

</script>

<template>
    <div class="popup-mask" @click.self="props.handMemberInfoView">
        <div>
            <img :src="closeIcon" @click="props.handMemberInfoView">
            <img :src="bitmapIcon" class="bitmap-img" @click="handsimpleViewBtn()">
            <div>
                <div class="info-content">
                    <img class="head-shot" :src="Icon" />
                    <h1>{{ props.selectItem.nameView }}</h1>
                    <p>{{ props.selectItem.phone }}</p>
                    <div class="link-bottom"></div>
                    <div>
                        <button>訂單確認</button>
                        <button>出貨通知</button>
                    </div>
                    <div class="link-bottom"></div>
                    <div class="content-box">
                        <p>基本資料</p>
                        <div>
                            <div class="flex-box">
                                <img :src="addressIcon" />
                                <p v-if="props.selectItem.sex == 0">男</p>
                                <p v-if="props.selectItem.sex == 1">女</p>
                            </div>
                            <div class="flex-box">
                                <img :src="birthdayIcon" />
                                <p>{{ props.selectItem.birthday }}</p>
                            </div>
                            <div class="flex-box">
                                <img :src="mailIcon" />
                                <p>{{ props.selectItem.email }}</p>
                            </div>
                            <div class="flex-box">
                                <img :src="mailIcon" />
                                <p>{{ props.selectItem.googleUserID }}</p>
                            </div>
                            <div class="flex-box">
                                <img :src="lineIcon" />
                                <p>{{ props.selectItem.lineUserID }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="link-bottom"></div>
                    <div class="memo-box">
                        <div class="memo-box-title">
                            <p>備註</p>
                            <p>新增</p>
                        </div>
                        <textarea></textarea>
                    </div>
                </div>
                <div class="onsumption-content" v-if="simpleView" @click="">
                    <div class="item-tab">
                        <button :class='currentIndex == 0 ? "active" : ""' v-on:click="changeTab(0)">消費表現</button>
                        <button :class='currentIndex == 1 ? "active" : ""' v-on:click="changeTab(1)">消費紀錄</button>
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

        >.bitmap-img {
            position: relative;
            left: 220px;
        }

        >img {
            // display: contents;
            cursor: pointer;
            margin: 10px 20px;
        }

        >div {
            display: flex;
            margin: 0px 10px 10px 10px;

            >div {
                border-radius: 10px;
                box-shadow: inset 0 10px 6px 0 rgba(0, 0, 0, 0.16);
                min-width: 360px;
                min-height: 650px;
                margin: 0 10px;
                border: solid 1px #707070;
            }

            .info-content {
                text-align: center;

                .head-shot {
                    position: relative;
                    top: -20px;
                }

                >h1 {

                    font-family: STXihei;
                    font-size: 20px;
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
                    margin: 5px 30px;
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
                        img{
                            width: 20px;
                            height: 20px;
                        }
                    }
                }

                .memo-box {
                    margin: 5px 30px;
                    color: #877059;

                    textarea {
                        border: solid 1px #707070;
                        background-color: #e6e2de;
                        border-radius: 10px;
                        width: 100%;
                        min-height: 145px;
                        margin-top: 5px;
                    }

                    .memo-box-title {
                        display: flex;
                        justify-content: space-between;

                        p {
                            margin: 0;
                        }


                    }
                }

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


}
</style>