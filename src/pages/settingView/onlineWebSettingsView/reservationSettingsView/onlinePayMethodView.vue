<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { useCompanyStore } from "@/stores/company";
import { useCounterStore } from "@/stores/counter";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const companyStore = useCompanyStore();
const { getOnlinePayMeth,postOnlinePayMeth } = companyStore;
const { onlinePayMethList } = storeToRefs(companyStore);
const timer: any = [{ value: 1, text: '1天前' }, { value: 2, text: '2天前' }, { value: 3, text: '3天前' }, { value: 4, text: '4天前' },]
const payMethListData: any = reactive({ data: [] });
const payMethList = computed(() => {
    payMethListData.data = JSON.parse(JSON.stringify(onlinePayMethList.value.data));
    return payMethListData.data;
})
onMounted(() => {
    getOnlinePayMeth()
        .then((res: any) => {
            if (res.state == 2) {
                Alert.warning(showErrorMsg(res.msg), 2000);
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
})
const handCancel = (() => {
    payMethListData.data = JSON.parse(JSON.stringify(onlinePayMethList.value.data));
});
const handSubmit = () => {
    postOnlinePayMeth(payMethListData.data)
        .then((res: any) => {
            if (res.state == 1) {
                Alert.warning("修改成功", 2000);
            }
            if (res.state == 2) {
                Alert.warning(showErrorMsg(res.msg), 2000);
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
};
</script>
<template>
    <div class="wrap">
        <div class="content">
            <div class="pay-block">
                <h3>現場到附設定</h3>
                <p>顧客線上預約時，選擇現場付款的相關設定</p>
            </div>
            <div class="pay-setting">
                <div class="switch">
                    <label><input class="mui-switch" type="checkbox" v-model="payMethList.onSitePayment"></label>
                    <div class="switch-content">
                        <p><strong>啟用現場到付</strong></p>
                        <p>開啟後將提供現場到付選項，消費者需現場付款。</p>
                    </div>
                </div>
                <div class="switch">
                    <label><input class="mui-switch" type="checkbox" v-model="payMethList.cancellation"></label>
                    <div class="switch-content">
                        <p><strong>啟用現場到付允許取消預約</strong></p>
                        <p>現場到付預約成立後，是否允許消費者取消預約。</p>
                    </div>
                </div>
                <div class="deadline">
                    <p>取消期限</p>
                    <div class="deadline-select">
                        <select v-model="payMethList.deadlineDays">
                            <option disabled value="">請選擇優惠方式</option>
                            <option v-for="item in timer" :key="item.value" :value="item.value">
                                {{ item.text }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="pay-block">
                <h3>線上收款設定</h3>
                <p>顧客線上預約時，選擇線上付款的相關設定</p>
            </div>
            <div class="pay-setting">
                <div class="online-setting">
                    <div class="online-text">
                        <h3>您在找線上刷卡及ATM轉帳的收款方式嗎?</h3>
                        <p>已開放提供線上刷卡及ATM轉帳收款方式，只需要填寫申請開通後立即使用。</p>
                    </div>
                    <button>立即申請</button>
                </div>
            </div>
        </div>
        <div class="bottom-block">
            <button v-on:click="handCancel()">取消變更</button>
            <button v-on:click="handSubmit()">儲存變更</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrap {
    position: absolute;
    top: 50px;
    bottom: 0px;
    left: 0px;
    right: 0px;

    >.content {
        overflow: auto;
        position: absolute;
        top: 0px;
        bottom: 60px;
        width: 100%;
        // left: 0px;
        // right: 0px;

        >.pay-block {
            color: #717171;
            margin: 20px 10px;
            height: 60px;

            h3 {
                color: #000000;
            }
        }

        >.pay-setting {


            >.switch {
                display: flex;
                align-items: center;
                border-top: solid 1px #c1bdb8;
                margin: 0px 10px;

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

            >.deadline {
                display: flex;
                border: solid 0.5px #a19f9f;
                border-radius: 5px 5px 5px 5px;
                text-align: left;
                margin: 5px 10px;
                background: #e6e2de;

                P {
                    width: 20%;
                    margin: 20px 10px;
                }

                .deadline-select {
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

            >.online-setting {
                margin: 0px 10px;
                // padding: 5px 10px;
                border-radius: 5px;
                background-color: #e6e2de;
                display: flex;
                align-items: center;

                >.online-text {
                    padding: 5px 15px;
                }

                >button {
                    width: 10%;
                    border: transparent;
                }
            }
        }
    }

    >.bottom-block {
        position: absolute;
        bottom: 0px;
        height: 60px;
        left: 0px;
        right: 0px;
        display: flex;
        align-items: center;
        justify-content: end;
        border-top: 1px solid #c1bdb8;

        button {
            height: 70%;
            margin: 0 10px;
            border: transparent;
            border-radius: 3px;
        }
    }
}
</style>