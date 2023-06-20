<script setup lang="ts">
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { useCompanyStore } from "@/stores/company";
const companyStore = useCompanyStore();
const { postCheckOutType, putCheckOutType } = companyStore;
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const title = ref("新增付款方式");
const payName = ref("");
const enable = ref(false);
const payMethodData: any = reactive({
    cotId: 0,
    COTTitle: '',
    Enabled: false
});
const props = defineProps<{
    selectPayMethodItem: any,
    handAddManagerView: Function,
}>();
const filterRestTime = ((data: any) => {
    let filter = data.dayOn == "" ? [] : data.restTime;
    return filter;
})
const handSubmit = () => {
    if (props.selectPayMethodItem) {
        putCheckOutType(payMethodData)
            .then((res) => {
                if (res.state == 2) {
                    Alert.warning(showErrorMsg(res.msg), 2000);
                } else if (res.state == 1) {
                    Alert.warning("修改成功", 1500);
                    setTimeout(() => {
                        props.handAddManagerView();
                    }, 2000);
                }
            })
            .catch((e: any) => {
                Alert.warning(showHttpsStatus(e.response.status), 2000);
                if (e.response.status == 401) {
                    setTimeout(() => {
                        handLogOut();
                    }, 2000);
                }
            })
    } else {
        postCheckOutType(payMethodData)
            .then((res) => {
                if (res.state == 2) {
                    Alert.warning(showErrorMsg(res.msg), 2000);
                } else if (res.state == 1) {
                    Alert.warning("新增成功", 1500);
                    setTimeout(() => {
                        props.handAddManagerView();
                    }, 2000);
                }
            })
            .catch((e: any) => {
                Alert.warning(showHttpsStatus(e.response.status), 2000);
                if (e.response.status == 401) {
                    setTimeout(() => {
                        handLogOut();
                    }, 2000);
                }
            })
    }

};

onMounted(() => {
    if (props.selectPayMethodItem) {
        payMethodData.cotId = props.selectPayMethodItem.cotId;
        payMethodData.COTTitle = props.selectPayMethodItem.cotTitle;
        payMethodData.Enabled = props.selectPayMethodItem.enabled;
        title.value = "修改收款方式"
    }
});

</script>

<template>
    <div class="popup-mask" v-on:click.self="handAddManagerView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <h1>{{ title }}</h1>
            <div class="select-box">
                <div class="switch">
                    <label><input class="mui-switch" type="checkbox" v-model="payMethodData.Enabled"></label>
                    <div class="switch-content">
                        <p><strong>啟用此收款方式</strong></p>
                        <p>啟用後將可在結帳時使用並記錄於報表中</p>
                    </div>
                </div>
                <div class="pay-content">
                    <div>
                        <p>*收款名稱</p>
                    </div>
                    <input placeholder="請輸入收款名稱" v-model="payMethodData.COTTitle" />
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

        >h1 {
            font-size: 20px;
            margin: 10px 0;
        }

        >label {
            display: block;
            vertical-align: middle;
        }

        >label,
        input,
        select {
            vertical-align: middle;
        }

        >.select-box {
            overflow: auto;
            position: absolute;
            left: 0px;
            right: 0px;
            top: 55px;
            bottom: 70px;
            border-top: solid 1px #929090;
            border-bottom: solid 1px #929090;

            >.switch {
                display: flex;
                align-items: center;
                margin: 0 15px;
                border-bottom: solid 1px #929090;

                >.switch-content {
                    margin: 0 15px;
                    text-align: left;
                }

                .mui-switch {
                    width: 52px;
                    height: 31px;
                    position: relative;
                    border: 1px solid #dfdfdf;
                    margin-left: 15px;
                    background-color: #fdfdfd;
                    box-shadow: #dfdfdf 0 0 0 0 inset;
                    border-radius: 20px;
                    border-top-left-radius: 20px;
                    border-top-right-radius: 20px;
                    border-bottom-left-radius: 20px;
                    border-bottom-right-radius: 20px;
                    background-clip: content-box;
                    display: inline-block;
                    -webkit-appearance: none;
                    user-select: none;
                    outline: none;
                }

                .mui-switch:before {
                    content: '';
                    width: 29px;
                    height: 29px;
                    position: absolute;
                    top: 0px;
                    left: 0;
                    border-radius: 20px;
                    border-top-left-radius: 20px;
                    border-top-right-radius: 20px;
                    border-bottom-left-radius: 20px;
                    border-bottom-right-radius: 20px;
                    background-color: #fff;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
                }

                .mui-switch:checked {
                    border-color: #64bd63;
                    box-shadow: #64bd63 0 0 0 16px inset;
                    background-color: #64bd63;
                }

                .mui-switch:checked:before {
                    left: 21px;
                }
            }

            >.pay-content {
                display: flex;
                height: 70px;
                margin: 10px 15px;
                border: solid 0.5px #929090;

                >div {
                    width: 25%;
                    margin: 0 0;
                    height: 100%;
                    border-right: solid 1px #929090;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                input {
                    width: 75%;
                    text-align: center;
                    border: transparent;
                    font-size: 22px;
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

    }
}
</style>