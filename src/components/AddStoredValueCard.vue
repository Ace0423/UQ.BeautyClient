<script setup lang="ts">
import { storeToRefs } from "pinia";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import Alert from "./alertCmpt";

const title = ref("新增儲值卡");
const newManager: any = reactive({
    email: "",
    password: "",
    phone: "",
    nameView: "",
    sex: 1,
    photo: "",
    memo: "",
    userLock: true,
    lineUserID: "",
    googleUserID: "",
    roleList: [],

});

const props = defineProps<{
    selectStoredValueCardItem: any
    handAddStoredValueCardView: Function;
}>();

const handSubmit = () => {


};


onMounted(() => {

});
</script>

<template>
    <div class="popup-mask" v-on:click.self="handAddStoredValueCardView()">
    <!-- 提示弹窗 -->
    <div class="popup-content">
        <h1>{{ title }}</h1>
        <div class="content">
                <div>
                    <p>儲值卡內容</p>
                        <p>填寫任何儲值卡上的內容</p>
                        <div>
                            <p>*儲值卡主題</p>
                            <input />
                        </div>
                        <div>
                            <p>*販售價格</p>
                            <input />
                        </div>
                        <div>
                            <p>*儲值卡面額</p>
                            <input />
                        </div>
                    </div>
                    <div>
                        <p>優惠方式</p>
                        <div>
                            <p>方式</p>
                            <input />
                        </div>
                    </div>
                    <div>
                        <p>贈送商品項目</p>
                        <a>加入贈送商品</a>
                    </div>
                    <div>
                        <p>使用限制</p>
                        <div>
                            <p>期限</p>
                            <input />
                        </div>
                        <div>
                            <p>對象</p>
                            <input />
                        </div>
                    </div>
                </div>

            <div class="btn">
                <button type="submit" v-on:click="handSubmit()">確認</button>
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
        position: absolute;
        top: 50px;
        left: 50px;
        bottom: 50px;
        right: 50px;
        background-color: #e6e2de;
        padding: 15px 50px;
        font-size: 20px;
        font-family: HeitiTC;
        color: #84715c;
        font-weight: bold;

        >h1 {
            text-align: center;
            font-size: 20px;
        }

        >.content {
            overflow: auto;
        }

        >.btn {
            display: flex;
            justify-content: center;

            >button {
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