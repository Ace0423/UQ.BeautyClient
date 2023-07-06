<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";

import { useCompanyStore } from "@/stores/company";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const companyStore = useCompanyStore();
const { submitMessages } = companyStore;
const addCouponView = ref(false);
const title = ref("");
const add0 = ((m: number) => {
    return m < 10 ? '0' + m : m
})
const getData = () => {
    let data = new Date()
    let y = data.getFullYear();
    let m = data.getMonth() + 1;
    let d = data.getDate();
    return add0(y) + "-" + add0(m) + "-" + add0(d);
}
const getTime = () => {
    let data = new Date()
    let h = data.getHours();
    let m = data.getMinutes();
    return add0(h) + ':' + add0(m);
}
const messageData: any = reactive({
    mId: 0,
    mAuto: 0,
    mType: 0,
    mTheme: '',
    mTitle: '',
    mContext: '',
    mImage: '',
    mButtonText: '',
    mUrl: '',
    mTarget: '',
    mSendTimer: "",
    mSendTimeing: 0,
    mSendDateD: getData(),
    mSendDateT: getTime(),
    mapCouponCards: [],
    mapMembers: [],
    mEnabled: true,
    mEnabledLine: false,
    mEnabledMessage: false
});
const mTarget: any = [
    {
        value: 0,
        label: '全部',
    },
    {
        value: 1,
        label: '符合特定條件客戶',
    },
]
const mSendTimer: any = [
    {
        value: 2,
        label: '固定日期',
    },
    {
        value: 3,
        label: '顧客生日',
    },
    {
        value: 4,
        label: '預約日期',
    },
    {
        value: 5,
        label: '首次消費',
    },
    {
        value: 6,
        label: '消費完成',
    },
]
const props = defineProps<{
    selectMessageItem: any;
    handAddMessageView: Function;
}>();
const handAddCouponView = () => {
    addCouponView.value = !addCouponView.value;
};

onMounted(() => {
    if (props.selectMessageItem.item == "") {
        title.value = props.selectMessageItem.auto == 1 ? "新增自動化" : "新增"
        title.value += props.selectMessageItem.type == 1 ? "簡訊" : "LINE訊息"
    }
    messageData.mAuto = props.selectMessageItem.auto;
    messageData.mType = props.selectMessageItem.type;
});
const handSubmit = () => {
    console.log(messageData)
    submitMessages(messageData)
        .then((res) => {
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
const addCouponBtn = () => {
    handAddCouponView();
};
const choiceImg = (e: any) => {
    let a = document.querySelector('.updata-input');
    (a as HTMLElement).click()
}
const handkeFileChange = (e: any) => {
    let file = e.target.files[0];
    console.log(file)
}
</script>

<template>
    <div class="popup-mask" v-on:click.self="handAddMessageView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <div class="top-content">
                <img :src="icon_closeX" v-on:click="handAddMessageView()" />
                <span>{{ title }}</span>
                <button class="otherpay-btn" v-on:click="handSubmit()">確認新增</button>
            </div>
            <div class="news-wrap" v-if="props.selectMessageItem.type == 1">
                <div class="message-info">
                    <div class="switch" v-if="props.selectMessageItem.auto == 1">
                        <el-switch size="large" v-model="messageData.mEnabled"
                            style="--el-switch-on-color: #84715c"></el-switch>
                        <div class="switch-content">
                            <p><strong>啟用此自動化訊息</strong></p>
                            <p>關閉橫將不再自動執行訊息發送，可以隨時關閉或啟用</p>
                        </div>
                    </div>
                    <div class="coupon">
                        <div>
                            <h3>附加優惠劵</h3>
                            <p>你可以選擇附加優惠劵作為行銷用送給顧客</p>
                        </div>
                        <div class="link-txt">
                            <p>加入優惠劵</p>
                        </div>
                    </div>
                    <div class="auto">
                        <h2 v-if="props.selectMessageItem.auto == 0">開始建立您的簡訊訊息</h2>
                        <h2 v-if="props.selectMessageItem.auto == 1">開始建立您的自動化訊息</h2>
                        <p>請輸入訊息主題</p>
                        <div class="auto-message">
                            <p>訊息主題</p>
                            <input />
                        </div>
                    </div>
                    <div class="news">
                        <h2>你的簡訊內容</h2>
                        <p>填寫任何您想發送給顧客的簡訊內容</p>
                        <div class="news-content">
                            <p>內容</p>
                            <input />
                        </div>
                        <div class="news-ref">
                            <p>附加網址</p>
                            <input />
                        </div>
                        <div class="news-img">
                            <p>附加圖片</p>
                            <input />
                        </div>
                    </div>
                    <div class="take-over">
                        <h3>發送對象</h3>
                        <p>系統將自動發送訊息給符合特定條件的顧客</p>
                        <div class="receiver">
                            <p>對象</p>
                            <input />
                        </div>
                    </div>
                    <div class="send-time">
                        <h3>時間</h3>
                        <p>系統將在特定時間自動發送訊息給顧客</p>
                        <div class="time">
                            <p>發送時機</p>
                            <input />
                        </div>
                    </div>
                    <div class="send-result">
                        <h3>系統發送結果</h3>
                        <p>系統將在特定時間自動發送訊息給顧客</p>
                    </div>
                </div>
                <div class="example-img">

                </div>
            </div>
            <div class="line-wrap" v-if="props.selectMessageItem.type == 0">
                <div class="message-info">
                    <div class="switch" v-if="props.selectMessageItem.auto == 1">
                        <el-switch size="large" v-model="messageData.mEnabled"
                            style="--el-switch-on-color: #84715c"></el-switch>
                        <div class="switch-content">
                            <p><strong>啟用此自動化訊息</strong></p>
                            <p>關閉橫將不再自動執行訊息發送，可以隨時關閉或啟用</p>
                        </div>
                    </div>
                    <div class="coupon">
                        <div>
                            <h3>附加優惠劵</h3>
                            <p>你可以選擇附加優惠劵作為行銷用送給顧客</p>
                        </div>
                        <div class="link-txt">
                            <u @click="addCouponBtn()" class="add-coupon-btn">加入優惠劵</u>
                        </div>
                    </div>
                    <div class="auto">
                        <h2 v-if="props.selectMessageItem.auto == 0">開始建立您的LINE訊息主題</h2>
                        <h2 v-if="props.selectMessageItem.auto == 1">開始建立您的自動化訊息</h2>
                        <p>請輸入訊息主題</p>
                        <div class="auto-message">
                            <p>訊息主題</p>
                            <input placeholder="請輸入訊息主題" v-model="messageData.mTheme" />
                        </div>
                    </div>
                    <div class="line">
                        <h2>你的LINE訊息內容</h2>
                        <p>填寫任何您想發送給顧客的訊息內容</p>
                        <div class="line-title">
                            <p>標題</p>
                            <input placeholder="請輸入訊息標題" v-model="messageData.mTitle" />
                        </div>
                        <div class="line-content">
                            <p>內容</p>
                            <input placeholder="請輸入訊息內容" v-model="messageData.mContext" />
                        </div>
                        <div class="line-img">
                            <p>附加圖片</p>
                            <input class="updata-input" type="file" ref="img"
                                accept="image/gif,image/jpeg,image/jpg,image/png" @change="handkeFileChange">
                            <div class="updata-btn">
                                <button @click="choiceImg">上傳圖片</button>
                            </div>
                        </div>
                        <div class="line-btn-name">
                            <p>按鈕名稱</p>
                            <input placeholder="請輸入按鈕名稱" v-model="messageData.mButtonText" />
                        </div>
                        <div class="line-btn-ref">
                            <p>按鈕網址</p>
                            <input placeholder="請輸入網址(例:https://xxxxx.com)" v-model="messageData.mUrl" />
                        </div>
                    </div>
                    <div class="take-over">
                        <h3>發送對象</h3>
                        <p>系統將自動發送訊息給符合特定條件的顧客</p>
                        <div class="receiver">
                            <p>對象</p>
                            <div class="receiver-select">
                                <select v-model="messageData.mTarget">
                                    <option disabled value="">請選擇人員</option>
                                    <option v-for="item in mTarget" :key="item.value" :value="item.value">
                                        {{ item.label }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="send-time">
                        <h3>時間</h3>
                        <p>系統將在特定時間自動發送訊息給顧客</p>
                        <div class="time">
                            <p>發送時機</p>
                            <div class="time-select">
                                <select v-model="messageData.mSendTimer">
                                    <option disabled value="">請選擇發送時機</option>
                                    <option v-for="item in mSendTimer" :key="item.value" :value="item.value">
                                        {{ item.label }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="send-result">
                        <h3>系統發送結果</h3>
                        <p>系統將在特定時間自動發送訊息給顧客</p>
                    </div>
                </div>
                <div class="example-img">

                </div>
            </div>
        </div>
    </div>
    <AddCoupon v-if="addCouponView" :handAddCouponView="handAddCouponView" />
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


        >.item-tab {
            // position: absolute;
            // top: 0px;
            // bottom: 0px;
            // left: 0px;
            // right: 0px;
            display: flex;
            width: 100%;

            >button {
                display: flex;
                justify-content: center;
                align-items: center;
                border: solid 0.5px #a19f9f;
                width: 50%;
                height: 45px;
                border-radius: 10px 10px 0 0;
                background-color: #f5f5f5;
                font-size: 20px;
                font-weight: bold;
                font-family: HeitiTC;
                color: #717171;
            }

            >button.active {
                background-color: #e6e2de;
            }
        }

        >.news-wrap {
            position: absolute;
            top: 102px;
            left: 20px;
            right: 20px;
            bottom: 75px;
            border: solid 0.5px #a19f9f;
            border-radius: 0 0 10px 10px;
            overflow: auto;
            color: #717171;
            display: flex;

            >.message-info {
                width: 60%;
                border-right: solid 1px #929090;
                height: 100%;
                overflow: auto;

                >.switch {
                    display: flex;
                    align-items: center;
                    margin: 0 10px;
                    border-bottom: solid 1px #929090;

                    >.switch-content {
                        margin: 0 15px;
                        text-align: left;
                    }
                }

                >.coupon {
                    margin: 25px 10px;
                    padding: 0px 0px;
                    border: solid 0.5px #a19f9f;
                    border-radius: 5px 5px 5px 5px;
                    display: flex;
                    justify-content: space-around;
                    text-align: left;
                    background: #ffffff;

                    >.link-txt {
                        display: flex;
                        justify-content: center;
                        align-items: center;


                    }
                }

                >.auto {
                    text-align: left;
                    margin: 25px 10px;
                    padding: 5px 5px;

                    >.auto-message {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        border-radius: 5px 5px 5px 5px;

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

                >.news {
                    text-align: left;
                    margin: 25px 10px;
                    padding: 5px 5px;

                    >.news-content {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        margin: 5px 0;
                        border-radius: 5px 5px 5px 5px;

                        P {
                            margin: 20px 10px;
                            width: 20%;
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

                    >.news-img {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        margin: 5px 0;
                        border-radius: 5px 5px 5px 5px;

                        P {
                            margin: 20px 10px;
                            width: 20%;
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

                    >.news-ref {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        margin: 5px 0;
                        border-radius: 5px 5px 5px 5px;

                        P {
                            margin: 20px 10px;
                            width: 20%;
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

                >.take-over {
                    text-align: left;
                    margin: 25px 10px;

                    >.receiver {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        margin: 5px 0;
                        border-radius: 5px 5px 5px 5px;

                        P {
                            margin: 20px 10px;
                            width: 20%;
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

                >.send-time {
                    text-align: left;
                    margin: 25px 10px;

                    >.time {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        margin: 5px 0;
                        border-radius: 5px 5px 5px 5px;

                        P {
                            margin: 20px 10px;
                            width: 20%;
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

                >.send-result {
                    text-align: left;
                    padding: 0 0 10px 0;
                    margin: 25px 10px;

                    >p {
                        padding: 20px 10px;
                        border: solid 0.5px #a19f9f;
                        border-radius: 5px 5px 5px 5px;
                        background: #ffffff;
                    }
                }
            }

        }

        >.line-wrap {
            height: calc(100% - 70px);
            color: #717171;
            display: flex;

            >.message-info {
                width: 60%;
                border-right: solid 1px #929090;
                height: 100%;
                overflow: auto;

                >.switch {
                    display: flex;
                    align-items: center;
                    margin: 0 10px;
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

                >.coupon {
                    margin: 25px 10px;
                    padding: 0px 0px;
                    border: solid 0.5px #a19f9f;
                    border-radius: 5px 5px 5px 5px;
                    display: flex;
                    justify-content: space-around;
                    text-align: left;
                    background: #ffffff;

                    >.link-txt {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }

                >.auto {
                    text-align: left;
                    margin: 25px 10px;
                    padding: 5px 5px;

                    >.auto-message {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        border-radius: 5px 5px 5px 5px;

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

                >.line {
                    text-align: left;
                    margin: 25px 10px;
                    padding: 5px 5px;

                    >.line-title {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        margin: 5px 0;
                        border-radius: 5px 5px 5px 5px;

                        P {
                            margin: 20px 10px;
                            width: 20%;
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

                    >.line-content {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        margin: 5px 0;
                        border-radius: 5px 5px 5px 5px;

                        P {
                            margin: 20px 10px;
                            width: 20%;
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

                    >.line-img {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        margin: 5px 0;
                        border-radius: 5px 5px 5px 5px;

                        P {
                            margin: 20px 10px;
                            width: 20%;
                        }

                        >.updata-input {
                            text-align: center;
                            border: transparent;
                            display: none;
                            justify-content: center;
                            align-content: center;
                            border-left: solid 0.5px #a19f9f;
                            border-radius: 0 5px 5px 0;
                        }

                        >.updata-btn {
                            text-align: center;
                            border: transparent;
                            border-left: solid 0.5px #a19f9f;
                            border-radius: 0 5px 5px 0;
                            flex: 1;
                            display: flex;
                            justify-content: center;
                            align-items: center;


                            >button {
                                height: 50%;
                                margin: 0 20px;
                                border: transparent;
                                background: transparent;
                            }
                        }
                    }

                    >.line-btn-name {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        margin: 5px 0;
                        border-radius: 5px 5px 5px 5px;

                        P {
                            margin: 20px 10px;
                            width: 20%;
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

                    >.line-btn-ref {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        margin: 5px 0;
                        border-radius: 5px 5px 5px 5px;

                        P {
                            margin: 20px 10px;
                            width: 20%;
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

                >.take-over {
                    text-align: left;
                    margin: 25px 10px;

                    >.receiver {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        margin: 5px 0;
                        border-radius: 5px 5px 5px 5px;

                        P {
                            margin: 20px 10px;
                            width: 20%;
                        }

                        >.receiver-select {
                            // width: 100%;
                            position: relative;
                            border-left: solid 0.5px #a19f9f;
                            flex: 1;

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

                >.send-time {
                    text-align: left;
                    margin: 25px 10px;

                    >.time {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        margin: 5px 0;
                        border-radius: 5px 5px 5px 5px;

                        P {
                            margin: 20px 10px;
                            width: 20%;
                        }

                        >.time-select {
                            // width: 100%;
                            position: relative;
                            border-left: solid 0.5px #a19f9f;
                            flex: 1;
                            margin: 0 0;

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

                >.send-result {
                    text-align: left;
                    padding: 0 0 10px 0;
                    margin: 25px 10px;

                    >p {
                        padding: 20px 10px;
                        border: solid 0.5px #a19f9f;
                        border-radius: 5px 5px 5px 5px;
                        background: #ffffff;
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