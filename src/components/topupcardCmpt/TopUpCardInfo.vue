<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { storeToRefs } from "pinia";
const title = ref("");
const currentIndex = ref(0);
const props = defineProps<{
    selectItem: any,
    handTopUpCardInfoView: Function
}>();
onMounted(() => {
    title.value = props.selectItem.tuTitle;
})
const changeTab = (index: number) => {
    currentIndex.value = index;
};
</script>

<template>
    <div class="popup-mask" v-on:click.self="handTopUpCardInfoView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <div class="top-content">
                <img class="closeX" :src="icon_closeX" v-on:click="handTopUpCardInfoView()" />
                <span>{{ title }}</span>
            </div>
            <div class="style-card">
                <p>代碼</p>
                <div class="info-card">
                    <div>
                        <h1>{{ props.selectItem.tuTitle}}</h1>
                        <p v-if="props.selectItem.tuddType == 0">不限制</p>
                        <p v-if="props.selectItem.tuddType == 1">限{{props.selectItem.tuLimitDay}}周使用完</p>
                    </div>
                    <div>
                        <h1>${{props.selectItem.tuViewPrice}}</h1>
                        <p>剩餘面額</p>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="item-tab">
                    <button :class="currentIndex == 0 ? 'active' : ''" v-on:click="changeTab(0)">
                        儲值卡內容
                    </button>
                    <button :class="currentIndex == 1 ? 'active' : ''" v-on:click="changeTab(1)">
                        銷售紀錄
                    </button>
                </div>
                <div class="item-content">
                    <div class="card-content" v-if="currentIndex == 0">
                        <P>優惠方式</P>
                        <h3>優惠七折</h3>
                        <P>建立時間</P>
                        <h3>2023/05/29,13:43</h3>
                        <P>適用對象</P>
                        <h3>購買者本人</h3>
                        <P>適用項目</P>
                        <h3></h3>
                        <P>贈送項目</P>
                        <h3>-</h3>
                        <P>注意事項</P>
                        <div class="attention-content">
                            <h3>0000000000000000000000h000000000000000000000000000000000000000000000000000000</h3>
                        </div>
                    </div>
                    <div class="record-content" v-if="currentIndex == 1">

                    </div>
                </div>
            </div>
            <div class="sub-btn">
                <button class="cancelBtn" type="submit">停用儲值卡</button>
                <button class="submitBtn" type="submit">編輯</button>
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

                >.card-content {
                    // width: 100%;
                    height: 100%;
                    padding: 0px 40px 0px 40px;

                    >.attention-content {
                        word-wrap: break-word;
                    }

                }

                >.record-content {
                    width: 100%;
                    height: 100%;
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