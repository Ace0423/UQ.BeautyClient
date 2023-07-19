<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCompanyStore } from "@/stores/company";
import { useCounterStore } from "@/stores/counter";
import { useMemberStore } from "@/stores/member";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const companyStore = useCompanyStore();
const { submitMessages } = companyStore;
const memberStore = useMemberStore();
const { memberList } = storeToRefs(memberStore);
const { getMemberList } = memberStore;
const addCouponView = ref(false);
const addFilterView = ref(false);
const addReceiverView = ref(false)
const title = ref("");
const submitNameBtn = ref('確認儲存');



const props = defineProps<{
    selectMessageItem: any;
    handEditMessageView: Function;
}>();
onMounted(() => {
    title.value = props.selectMessageItem.mTheme;
});
const handSubmit = () => {
};
</script>

<template>
    <div class="popup-mask" v-on:click.self="handEditMessageView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <div class="top-content">
                <img :src="icon_closeX" v-on:click="handEditMessageView()" />
                <span>{{ title }}</span>
                <button class="otherpay-btn" v-on:click="handSubmit()">{{ submitNameBtn }}</button>
            </div>
            <div class="message-wrap">
                <div class="message-info">
                    <h2>啟用發送頻道</h2>
                    <p>系蓊將在每次預約成立時，自動發送通知訊息給顧客</p>
                    <div class="switch">
                        <div class="switch-title">
                            <p>發送頻道</p>
                        </div>
                        <div class="switch-content">
                            <el-switch size="large" style="--el-switch-on-color: #84715c"></el-switch>
                            <label>Line自動發送</label>
                        </div>
                        <div class="switch-content">
                            <el-switch size="large" style="--el-switch-on-color: #84715c"></el-switch>
                            <label>簡訊自動發送</label>
                        </div>
                    </div>
                </div>
                <div class="example-img">

                </div>

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

        >.message-wrap {
            height: calc(100% - 70px);
            color: #717171;
            display: flex;

            >.message-info {
                width: 60%;
                border-right: solid 1px #929090;
                height: 100%;
                overflow: auto;
                padding: 0 20px;

                >.switch {
                    // display: flex;
                    // align-items: center;
                    margin: 30px 10px;

                    // border-bottom: solid 1px #929090;
                    >.switch-title {
                        border-bottom: solid 1px #929090;
                    }

                    >.switch-content {
                        padding: 20px 0px 20px 0px;
                        display: flex;
                        align-items: center;

                        >label {
                            margin: 0 10px;
                        }

                        border-bottom: solid 1px #929090;
                        // text-align: left;
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