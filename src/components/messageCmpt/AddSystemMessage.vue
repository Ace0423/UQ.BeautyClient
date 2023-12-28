<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import Icon from "@/assets/Icon zocial-guest.svg";
import logoImg from "@/assets/images/logo.png";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { useCompanyStore } from "@/stores/company";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const companyStore = useCompanyStore();
const { submitMessages } = companyStore;
const title = ref("");
const submitNameBtn = ref('確認儲存');
const idx = ref(0);
const color = ref('');
const weekDate: any = [
    {
        value: 0,
        label: "週日",
    },
    {
        value: 1,
        label: "周一",
    },
    {
        value: 2,
        label: "周二",
    },
    {
        value: 3,
        label: "周三",
    },

    {
        value: 4,
        label: "周四",
    },

    {
        value: 5,
        label: "周五",
    },

    {
        value: 6,
        label: "周六",
    },
];

const props = defineProps<{
    selectMessageItem: any;
    handEditMessageView: Function;
}>();

const add0 = (m: number) => {
    return m < 10 ? "0" + m : m;
};

const nowTime: any = computed(() => {
    let data = new Date();
    let m = data.getMonth() + 1;
    let d = data.getDate();
    let day = weekDate.filter((item: any) => {
        return item.value == data.getDay();
    });

    return (
        m +
        "月" +
        d +
        "日 " +
        day[0].label +
        " " +
        add0(data.getHours()) +
        ":" +
        add0(data.getMinutes())
    );
});

const simulationTime: any = computed(() => {
    let data = new Date();
    let m = data.getMonth() + 1;
    let d = data.getDate();
    let day = weekDate.filter((item: any) => {
        return item.value == data.getDay();
    });

    return (
        m +
        "月" +
        d +
        "日(" +
        day[0].label +
        ")"
    );
});

const timingData: any = [
    {
        value: 10,
        title: '新預約成立通知',
        context: "預約完成",
        color: '#00EC00',
    },
    {
        value: 11,
        title: '等待店家確認通知',
        context: "等待店家確認",
        color: '#FFDC35	',
    },
    {
        value: 12,
        title: '預約已取消通知',
        context: "預約已取消",
        color: '#FF0000',
    },
    {
        value: 13,
        title: '預約已變更通知',
        context: "預約已變更",
        color: '#00EC00',
    },
    {
        value: 14,
        title: '預約提醒通知',
        context: "預約提醒",
        color: '#00EC00',
    },
    {
        value: 15,
        title: '新取貨單成立通知',
        context: "新取貨單成立",
        color: '#00EC00',
    },
    {
        value: 16,
        title: '取貨單已取消通知',
        context: "取貨單已取消",
        color: '#FF0000',
    },
    {
        value: 17,
        title: '新預約成立通知(表單使用)',
        context: "新預約成立通知",
    },
    {
        value: 18,
        title: '消費完成通知(表單使用)',
        context: "消費完成通知",
    },
];

const messageData: any = reactive({
    mId: 0,
    mAuto: 1,
    mType: 2,
    mTheme: "",
    mTitle: '',
    mContext: "",
    mImage: "",
    mButtonText: "",
    mUrl: "",
    mTarget: 0,
    mSendTimer: 0,
    mSendTimeing: 0,
    mSendDateD: "",
    mSendDateT: "00:00",
    mFilter: {},
    mMapCouponCards: [],
    mapMembers: [],
    mEnabled: true,
    mEnabledLine: false,
    mEnabledMessage: false,
});
const getData = (Data: any = new Date()) => {
    let data = new Date(Data);
    let y = data.getFullYear();
    let m = data.getMonth() + 1;
    let d = data.getDate();
    return add0(y) + "-" + add0(m) + "-" + add0(d);
};
const headWitchBox = (val: any) => {
    idx.value = val;
}

watch(() => messageData.mSendTimer, (val, oldva) => {
    messageData.mTitle = (timingData.filter((j: any) => { return j.value == val }))[0].title;
    messageData.mContext = (timingData.filter((j: any) => { return j.value == val }))[0].context;
    color.value = (timingData.filter((j: any) => { return j.value == val }))[0].color;
})

onMounted(() => {
    if (props.selectMessageItem != '') {
        messageData.mId = props.selectMessageItem.mId;
        messageData.mAuto = props.selectMessageItem.mAuto;
        messageData.mType = props.selectMessageItem.mType;
        messageData.mTheme = props.selectMessageItem.mTheme;
        messageData.mTitle = props.selectMessageItem.mTitle;
        messageData.mContext = props.selectMessageItem.mContext;
        messageData.mImage = props.selectMessageItem.mImage;
        messageData.mButtonText = props.selectMessageItem.mButtonText;
        messageData.mUrl = props.selectMessageItem.mUrl;
        messageData.mTarget = props.selectMessageItem.mTarget;
        messageData.mSendTimer = props.selectMessageItem.mSendTimer;
        messageData.mSendTimeing = props.selectMessageItem.mSendTimeing;
        messageData.mSendDateD = props.selectMessageItem.mSendDateD;
        // messageData.mSendDateT = props.selectMessageItem.item.mSendDateT;
        messageData.mapMembers = props.selectMessageItem.mapMembers;
        messageData.mEnabled = props.selectMessageItem.mEnabled;
        messageData.mEnabledLine = props.selectMessageItem.mEnabledLine;
        messageData.mEnabledMessage = props.selectMessageItem.mEnabledMessage;
        messageData.mFilter = props.selectMessageItem.mFilter;
        messageData.mMapCouponCards = props.selectMessageItem.mMapCouponCards;
    }
});
const handSubmit = () => {
    messageData.mSendDateD = getData();
    submitMessages(messageData)
        .then((res) => {
            if (res.state == 1) {
                if (messageData.mId == 0) {
                    Alert.warning("新增成功", 1500);
                } else {
                    Alert.warning("修改成功", 1500);
                }
                setTimeout(() => {
                    props.handEditMessageView();
                }, 1500);
            } else if (res.state == 2) {
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
        });
};
</script>

<template>
    <div class="popup-mask" v-on:click.self="handEditMessageView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <div class="top-content">
                <img :src="icon_closeX" v-on:click="handEditMessageView()" />
                <span>{{ messageData.mTitle }}</span>
                <button class="otherpay-btn" v-on:click="handSubmit()">{{ submitNameBtn }}</button>
            </div>
            <div class="message-wrap">
                <div class="message-info">
                    <h2>啟用發送頻道</h2>
                    <p>系統將在每次預約成立時，自動發送通知訊息給顧客</p>
                    <div class="switch-warp">
                        <div class="switch">
                            <p>發送頻道</p>
                        </div>
                        <div class="switch">
                            <label><input class="mui-switch" type="checkbox" v-model="messageData.mEnabledLine"></label>
                            <div class="switch-content">
                                <label>Line自動發送</label>
                            </div>
                        </div>
                        <div class="switch">
                            <label><input class="mui-switch" type="checkbox" v-model="messageData.mEnabledMessage"></label>
                            <div class="switch-content">
                                <label>簡訊自動發送</label>
                            </div>
                        </div>
                    </div>
                    <div v-if="messageData.mId == 0" class="message-edite">
                        <div class="message-timer">
                            <div class="time">
                                <p>主題類型</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendTimer">
                                        <option disabled='false' value="">請選擇類型</option>
                                        <option v-for="item in timingData" :key="item.value" :value="item.value">
                                            {{ item.context }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="message-input">
                            <p>名稱</p>
                            <input :value="messageData.mTitle" />
                        </div>
                        <div class="message-input">
                            <p>內容</p>
                            <input :value="messageData.mContext" />
                        </div>

                    </div>
                </div>
                <div class="example-img">
                    <p>你的系統訊息樣式參考</p>
                    <div class="switch-box">
                        <button class="line-btn" :class="{ active: idx == 0 }" @click="headWitchBox(0)">LINE</button>
                        <button class="message-btn" :class="{ active: idx == 1 }" @click="headWitchBox(1)">簡訊</button>
                    </div>
                    <div v-if="idx == 0" class="line-example-bg">
                        <div>
                            <div>
                                <div class="top-block">

                                </div>
                                <div class="now-time">
                                    <p>{{ nowTime }}</p>
                                </div>
                                <div class="example-content">
                                    <div>
                                        <img :src="Icon" />
                                    </div>
                                    <div v-if="messageData.mSendTimer != 17 && messageData.mSendTimer != 18"
                                        class="msg-content">
                                        <img :src="logoImg" />
                                        <div class="p-content">
                                            <div>{{ messageData.mContext }}</div>
                                        </div>
                                        <div class="msg-info">
                                            <p>預約日期</p>
                                            <h3>{{ simulationTime }}</h3>
                                        </div>
                                        <div class="service-info">
                                            <p>您的服務名稱</p>
                                            <p>服務人員</p>
                                        </div>
                                    </div>
                                    <div v-if="messageData.mSendTimer == 17 || messageData.mSendTimer == 18"
                                        class="msg-content">
                                        <div class="p-content">
                                            <div>MajoyReesa</div>
                                        </div>
                                        <div class="service-info">
                                            <p>您的表單名稱</p>
                                            <p>您的表單說明</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div v-if="idx == 1" class="message-example-bg">
                        <div>
                            <div>
                                <div class="top-block">
                                    <img :src="Icon" />
                                </div>
                                <div class="now-time">
                                    <p>{{ nowTime }}</p>
                                </div>
                                <div class="example-content">
                                    <img />
                                    <div v-if="messageData.mSendTimer != 17 && messageData.mSendTimer != 18"
                                        class="msg-content">
                                        <p class="p-content">Majoy Reesa{{ simulationTime }}染髮、剪髮{{ messageData.mContext
                                        }}。查看連結:www123321</p>
                                    </div>
                                    <div v-if="messageData.mSendTimer == 17 || messageData.mSendTimer == 18"
                                        class="msg-content">
                                        <p class="p-content">Majoy Reesa 請您填寫「諮詢同意書」 表單</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hint-content">
                        <p v-if="idx == 0">
                            發送訊息將使用您的 LINE OA 訊息量
                        </p>
                        <p v-if="idx == 1">
                            將消耗發送簡訊點數
                        </p>
                    </div>
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
                border-right: solid 1px #ddd;
                height: 100%;
                overflow: auto;
                padding: 0 20px;

                >.switch-warp {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    >.switch {
                        display: flex;
                        align-items: center;
                        // margin: 20px 10px 20px 10px;
                        border-bottom: solid 1px #ddd;

                        height: 60px;

                        >p {
                            margin: 0px 0px;
                        }

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

                >.message-edite {
                    margin: 15px 0;

                    >.message-input {
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

                    >.message-timer {
                        text-align: left;
                        margin: 5px 0px;

                        .time {
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

                                >input {
                                    width: auto;
                                    height: 100%;
                                    border: transparent;
                                    background: transparent;
                                    box-sizing: border-box;
                                    text-align: center;
                                    outline: transparent;
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
                    }

                }

            }

            >.example-img {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 40%;
                text-align: center;

                >.switch-box {
                    display: flex;
                    width: 60%;
                    height: 45px;
                    border-radius: 10px;
                    background-color: #e6e6e6;

                    .line-btn {
                        width: 50%;
                        margin: 2.5px 2.5px;
                        border-radius: 7px;
                        background-color: transparent;
                        border: transparent;
                    }

                    .message-btn {
                        width: 50%;
                        margin: 3px 3px;
                        border-radius: 7px;
                        background-color: transparent;
                        border: transparent;
                    }

                    .active {
                        background-color: #ffffff;
                    }
                }

                >.line-example-bg {
                    display: flex;
                    justify-items: center;
                    height: 370px;
                    width: 85%;
                    border-radius: 50px 50px 0px 0px;
                    background: #f6f6f6;
                    position: relative;
                    margin: 10px 0px;

                    >div {
                        border-radius: 50px 50px 0px 0px;
                        background: #e6e6e6;
                        position: absolute;
                        top: 5px;
                        left: 5px;
                        right: 5px;
                        bottom: 0px;

                        >div {
                            border-radius: 30px 30px 0px 0px;
                            background: #7294c2;
                            position: absolute;
                            top: 20px;
                            left: 20px;
                            right: 20px;
                            bottom: 0px;
                            overflow: auto;

                            >.top-block {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 55px;
                                border-radius: 30px 30px 0px 0px;
                                background: rgba(0, 0, 0, 0.7);
                            }

                            >.now-time {
                                display: flex;
                                justify-content: center;

                                >p {
                                    font-size: 14px;
                                    padding: 4px 12px;
                                    background: rgba(0, 0, 0, 0.3);
                                    color: #ffffff;
                                    border-radius: 30px 30px;
                                }
                            }

                            >.example-content {
                                display: flex;
                                margin: 0 10px;

                                >.msg-content {
                                    width: 70%;
                                    margin: 10px 5px;
                                    border-radius: 15px 15px;
                                    background: #ffffff;

                                    img {
                                        margin-top: 10px;
                                        width: 70%;
                                    }

                                    >.p-content {
                                        font-size: 14px;
                                        margin: 12px 15px;

                                        >div {
                                            color: #000000;
                                            padding: 8px 15x;
                                            border-radius: 15px 15px;
                                            background-color: v-bind(color);
                                        }
                                    }

                                    >.msg-info {
                                        margin: 5px 10px;
                                        font-size: 10px;
                                        text-align: left;
                                        border-bottom: solid 1px #ddd;
                                    }

                                    >.service-info {
                                        margin: 5px 10px;
                                        font-size: 14px;
                                        text-align: left;
                                    }
                                }
                            }
                        }
                    }
                }

                >.message-example-bg {

                    display: flex;
                    justify-items: center;
                    height: 370px;
                    width: 85%;
                    border-radius: 50px 50px 0px 0px;
                    background: #f6f6f6;
                    position: relative;
                    margin: 10px 0px;

                    >div {
                        border-radius: 50px 50px 0px 0px;
                        background: #e6e6e6;
                        position: absolute;
                        top: 5px;
                        left: 5px;
                        right: 5px;
                        bottom: 0px;

                        >div {
                            border-radius: 30px 30px 0px 0px;
                            background: #ffffff;
                            position: absolute;
                            top: 20px;
                            left: 20px;
                            right: 20px;
                            bottom: 0px;

                            >.top-block {
                                height: 60px;
                                border-radius: 30px 30px 0px 0px;
                                background: #f6f6f6;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }

                            >.now-time {
                                display: flex;
                                justify-content: center;

                                >p {
                                    font-size: 14px;
                                    padding: 4px 12px;
                                    color: #717171;
                                    border-radius: 30px 30px;
                                }
                            }

                            >.example-content {
                                display: flex;
                                margin: 0 10px;

                                >.msg-content {
                                    width: 80%;
                                    // min-height: 100px;
                                    margin: 0 10px;
                                    border-radius: 15px 15px;
                                    background: #f6f6f6;
                                    font-size: 14px;

                                    >.p-content {
                                        // font-size: 18px;
                                        text-align: left;
                                        margin: 12px 15px;
                                        color: #0c0c0c;
                                    }
                                }
                            }
                        }
                    }
                }

                >.hint-content {
                    margin: 0 30px;
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