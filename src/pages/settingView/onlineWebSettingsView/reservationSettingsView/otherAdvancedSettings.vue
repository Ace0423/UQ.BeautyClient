<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { useCompanyStore } from "@/stores/company";
import { useCounterStore } from "@/stores/counter";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const companyStore = useCompanyStore()
const { getOnlineOtherSettings, postOnlinePayMeth } = companyStore;
const { onlinePayMethList } = storeToRefs(companyStore);
const openAuto: any = [{ value: 0, text: '自動開放' }, { value: 1, text: '自訂開放' }]
const openDaily: any = [{ value: 0, text: '每日' }, { value: 1, text: '每周' }, { value: 2, text: '每月' }]
const openWeek: any = [{ value: 1, text: '一' }, { value: 2, text: '二' }, { value: 3, text: '三' }, { value: 4, text: '四' }, { value: 5, text: '五' }, { value: 6, text: '六' }, { value: 7, text: '日' }]
const openDay: any = [{ value: 1, text: '1日' }, { value: 2, text: '2日' }, { value: 3, text: '3日' }, { value: 4, text: '4日' }, { value: 5, text: '5日' }, { value: 6, text: '6日' }, { value: 7, text: '7日' }, { value: 8, text: '8日' }, { value: 9, text: '9日' }, { value: 10, text: '10日' }, { value: 11, text: '11日' }, { value: 12, text: '12日' }, { value: 13, text: '13日' }, { value: 14, text: '14日' }, { value: 15, text: '15日' }, { value: 16, text: '16日' }, { value: 17, text: '17日' }, { value: 18, text: '18日' }, { value: 19, text: '19日' }, { value: 20, text: '20日' }, { value: 21, text: '21日' }, { value: 22, text: '22日' }, { value: 23, text: '23日' }, { value: 24, text: '24日' }, { value: 25, text: '25日' }, { value: 26, text: '26日' }, { value: 27, text: '27日' }, { value: 28, text: '28日' }, { value: 29, text: '29日' }, { value: 30, text: '30日' }, { value: 31, text: '31日' }]
const openForDay: any = [{ value: 1, text: '一周' }, { value: 2, text: '二周' }, { value: 3, text: '三周' }, { value: 4, text: '1個月' }, { value: 5, text: '2個月' }, { value: 6, text: '3個月' }, { value: 7, text: '4個月' }, { value: 8, text: '5個月' }, { value: 9, text: '6個月' }, { value: 10, text: '7個月' }, { value: 11, text: '8個月' }, { value: 12, text: '9個月' }, { value: 13, text: '10個月' }, { value: 14, text: '11個月' }, { value: 15, text: '1年' }, { value: 16, text: '1年半' }, { value: 17, text: '2年' },]
const openForWeek: any = [{ value: 1, text: '一周' }, { value: 2, text: '二周' }, { value: 3, text: '三周' }, { value: 4, text: '四周' }, { value: 5, text: '五周' }, { value: 6, text: '六周' }, { value: 7, text: '七周' }, { value: 8, text: '八周' }, { value: 9, text: '九周' }, { value: 10, text: '十周' }, { value: 11, text: '十一周' }, { value: 12, text: '十二周' }]
const openForMonth: any = [{ value: 1, text: '1個月' }, { value: 2, text: '2個月' }, { value: 3, text: '3個月' }, { value: 4, text: '4個月' }, { value: 5, text: '5個月' }, { value: 6, text: '6個月' }, { value: 7, text: '7個月' }, { value: 8, text: '8個月' }, { value: 9, text: '9個月' }, { value: 10, text: '10個月' }, { value: 11, text: '11個月' }, { value: 12, text: '12個月' }, { value: 13, text: '13個月' }, { value: 14, text: '14個月' }, { value: 15, text: '15個月' }, { value: 16, text: '16個月' }, { value: 17, text: '17個月' }, { value: 18, text: '18個月' }, { value: 19, text: '19個月' }, { value: 20, text: '20個月' }, { value: 21, text: '21個月' }, { value: 22, text: '22個月' }, { value: 23, text: '23個月' }, { value: 24, text: '24個月' }]
const timeVal = ref(0)
onMounted(() => {
    getOnlineOtherSettings()
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
</script>
<template>
    <div class="wrap">
        <div class="content">
            <div class="hint-block">
                <h3>目前預約開放至2023/11/12(日)</h3>
            </div>
            <div class="appointment">
                <h3>線上預約開放時段設定</h3>
                <div class="condition-block">
                    <p style="white-space: nowrap;">預約採</p>
                    <select v-model="timeVal">
                        <option v-for="item in openAuto" :key="item.value" :value="item.value">
                            {{ item.text }}</option>
                    </select>
                    <p style="white-space: nowrap;">將於</p>
                    <select v-model="timeVal">
                        <option v-for="item in openDaily" :key="item.value" :value="item.value">
                            {{ item.text }}</option>
                    </select>
                    <div class="opentime-block" v-if="timeVal == 0">
                        <input type="time">
                    </div>
                    <div class="opentime-block" v-if="timeVal == 1">
                        <select v-model="timeVal">
                            <option v-for="item in openWeek" :key="item.value" :value="item.value">
                                {{ item.text }}</option>
                        </select>
                        <input type="time">
                    </div>
                    <div class="opentime-block" v-if="timeVal == 2">
                        <select v-model="timeVal">
                            <option v-for="item in openDay" :key="item.value" :value="item.value">
                                {{ item.text }}</option>
                        </select>
                        <input type="time">
                    </div>
                    <p style="white-space: nowrap;">自動開放未來</p>
                    <select v-model="timeVal" v-if="timeVal == 0">
                        <option v-for="item in openForDay" :key="item.value" :value="item.value">
                            {{ item.text }}</option>
                    </select>
                    <select v-model="timeVal" v-if="timeVal == 1">
                        <option v-for="item in openForWeek" :key="item.value" :value="item.value">
                            {{ item.text }}</option>
                    </select>
                    <select v-model="timeVal" v-if="timeVal == 2">
                        <option v-for="item in openForMonth" :key="item.value" :value="item.value">
                            {{ item.text }}</option>
                    </select>
                    <p style="white-space: nowrap;">的預約。</p>
                </div>
            </div>

            <div class="other-setting">
                <h3>其它</h3>
                <div class="switch">
                    <label><input class="mui-switch" type="checkbox"></label>
                    <div class="switch-content">
                        <p><strong>你的預約是否需要事前確認?</strong></p>
                        <p>顧客預約後將會由您選擇是否接受此預約單。(在此前您的顧客將等待您的回應)</p>
                    </div>
                </div>
                <div class="switch">
                    <label><input class="mui-switch" type="checkbox"></label>
                    <div class="switch-content">
                        <p><strong>啟用多組數預約</strong></p>
                        <p>顧客預約可以選擇多人一起預約。</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-block">
            <button>取消變更</button>
            <button>儲存變更</button>
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

        >.hint-block {
            margin: 5px 10px;
            padding: 3px 10px;
            background-color: #e6e2de;
            border-radius: 8px;
        }

        >.appointment {
            margin: 0 10px;

            >div {
                display: flex;
                align-items: center;

                select {
                    margin: 0px 10px;
                    padding: 10px;
                    background-color: #e6e2de;
                    border: transparent;
                }
            }

            >.condition-block {
                display: flex;
                flex-wrap: wrap;

                >.opentime-block {
                    display: flex;

                    >input {
                        margin: 0px 10px;
                        padding: 10px;
                        border: transparent;
                        background-color: #e6e2de;
                    }
                }
            }

        }

        >.other-setting {
            margin: 0 10px;

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