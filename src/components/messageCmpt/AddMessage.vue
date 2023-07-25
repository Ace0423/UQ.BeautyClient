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
const submitNameBtn = ref('確認新增');
const add0 = ((m: number) => {
    return m < 10 ? '0' + m : m
})
const getData = (Data: any = new Date()) => {
    let data = new Date(Data)
    let y = data.getFullYear();
    let m = data.getMonth() + 1;
    let d = data.getDate();
    return add0(y) + "-" + add0(m) + "-" + add0(d);
}
const getTime = (Data: any = "") => {
    let data = new Date(Data)
    let h = data.getHours();
    let m = data.getMinutes();
    return add0(h) + ':' + add0(m);
}
const mSend: any = ref('');
const dSend: any = ref('');
const mMapCouponCards: any = ref([]);
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
    mSendTimeing: '',
    mSendDateD: '',
    mSendDateT: '',
    mMapCouponCards: [],
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
const mSendMethod: any = [

    {
        value: 0,
        label: '直接發送',
    },
    {
        value: 1,
        label: '指定時段發送',
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
const fixedDate: any = [
    {
        value: 0,
        label: '每天',
    },
    {
        value: 1,
        label: '每周',
    },
    {
        value: 2,
        label: '每月',
    },
    {
        value: 3,
        label: '每年',
    },
]
const birData: any = [
    {
        value: -3,
        label: '3天前',
    },
    {
        value: -2,
        label: '2天前',
    },
    {
        value: -1,
        label: '1天前',
    },
    {
        value: 0,
        label: '直接發送',
    },
    {
        value: 1,
        label: '1天後',
    },
    {
        value: 2,
        label: '2天後',
    },
    {
        value: 3,
        label: '3天後',
    },
]
const dayData: any = [
    {
        value: 0,
        label: '當下',
    },
    {
        value: 1,
        label: '1天後',
    },
    {
        value: 2,
        label: '2天後',
    },
    {
        value: 3,
        label: '3天後',
    },
    {
        value: 4,
        label: '4天後',
    },
    {
        value: 5,
        label: '5天後',
    }
]
const monthDate: any = [
    {
        value: 1,
        label: '1月',
    },
    {
        value: 2,
        label: '2月',
    },
    {
        value: 3,
        label: '3月',
    },
    {
        value: 4,
        label: '4月',
    },
    {
        value: 5,
        label: '5月',
    },
    {
        value: 6,
        label: '6月',
    },
    {
        value: 7,
        label: '7月',
    },
    {
        value: 8,
        label: '8月',
    },
    {
        value: 9,
        label: '9月',
    },
    {
        value: 10,
        label: '10月',
    },
    {
        value: 11,
        label: '11月',
    },
    {
        value: 12,
        label: '12月',
    },
]
const weekDate: any = [
    {
        value: 0,
        label: '週日',
    },
    {
        value: 1,
        label: '周一',
    },
    {
        value: 2,
        label: '周二',
    },
    {
        value: 3,
        label: '周三',
    },

    {
        value: 4,
        label: '周四',
    },

    {
        value: 5,
        label: '周五',
    },

    {
        value: 6,
        label: '周六',
    },
]
const dateDate: any = [
    {
        value: 1,
        label: '1日',
    },
    {
        value: 2,
        label: '2日',
    },
    {
        value: 3,
        label: '3日',
    },

    {
        value: 4,
        label: '4日',
    },

    {
        value: 5,
        label: '5日',
    },

    {
        value: 6,
        label: '6日',
    },
    {
        value: 7,
        label: '7日',
    },
    {
        value: 8,
        label: '8日',
    },
    {
        value: 9,
        label: '9日',
    },
    {
        value: 10,
        label: '10日',
    },
    {
        value: 11,
        label: '11日',
    },
    {
        value: 12,
        label: '12日',
    },
    {
        value: 13,
        label: '13日',
    },
    {
        value: 14,
        label: '14日',
    },
    {
        value: 15,
        label: '15日',
    },
    {
        value: 16,
        label: '16日',
    },
    {
        value: 17,
        label: '17日',
    },
    {
        value: 18,
        label: '18日',
    },
    {
        value: 19,
        label: '19日',
    },
    {
        value: 20,
        label: '20日',
    },
    {
        value: 21,
        label: '21日',
    },
    {
        value: 22,
        label: '22日',
    },
    {
        value: 23,
        label: '23日',
    },
    {
        value: 24,
        label: '24日',
    },
    {
        value: 25,
        label: '25日',
    },
    {
        value: 26,
        label: '26日',
    },
    {
        value: 27,
        label: '27日',
    },
    {
        value: 28,
        label: '28日',
    },
    {
        value: 29,
        label: '29日',
    },
    {
        value: 30,
        label: '30日',
    },
    {
        value: 31,
        label: '31日',
    },
]
const periodTime: any = [
    {
        value: '00:00',
        label: '上午 12:00',
    },
    {
        value: '01:00',
        label: '上午 01:00',
    },
    {
        value: '02:00',
        label: '上午 02:00',
    },
    {
        value: '03:00',
        label: '上午 03:00',
    },
    {
        value: '04:00',
        label: '上午 04:00',
    },
    {
        value: '05:00',
        label: '上午 05:00',
    },
    {
        value: '06:00',
        label: '上午 06:00',
    },
    {
        value: '07:00',
        label: '上午 07:00',
    },
    {
        value: '08:00',
        label: '上午 08:00',
    },
    {
        value: '09:00',
        label: '上午 09:00',
    },
    {
        value: '10:00',
        label: '上午 10:00',
    },
    {
        value: '11:00',
        label: '上午 11:00',
    },
    {
        value: '12:00',
        label: '下午 12:00',
    },
    {
        value: '13:00',
        label: '下午 01:00',
    },
    {
        value: '14:00',
        label: '下午 02:00',
    },
    {
        value: '15:00',
        label: '下午 03:00',
    },
    {
        value: '16:00',
        label: '下午 04:00',
    },
    {
        value: '17:00',
        label: '下午 05:00',
    },
    {
        value: '18:00',
        label: '下午 06:00',
    },
    {
        value: '19:00',
        label: '下午 07:00',
    },
    {
        value: '20:00',
        label: '下午 08:00',
    },
    {
        value: '21:00',
        label: '下午 09:00',
    },
    {
        value: '22:00',
        label: '下午 10:00',
    },
    {
        value: '23:00',
        label: '下午 11:00',
    },
]

const props = defineProps<{
    selectMessageItem: any;
    handAddMessageView: Function;
}>();
const handAddCouponView = () => {
    addCouponView.value = !addCouponView.value;
}
const handAddFilterView = () => {
    addFilterView.value = !addFilterView.value;
}
const handAddReceiverView = () => {
    addReceiverView.value = !addReceiverView.value;
}
onMounted(() => {
    if (props.selectMessageItem.item == "") {
        title.value = props.selectMessageItem.auto == 1 ? "新增自動化" : "新增"
        title.value += props.selectMessageItem.type == 1 ? "簡訊" : "LINE訊息"
    } else if (props.selectMessageItem.item) {
        submitNameBtn.value = '確認修改'
        messageData.mId = props.selectMessageItem.item.mId;
        messageData.mTheme = props.selectMessageItem.item.mTheme;
        messageData.mTitle = props.selectMessageItem.item.mTitle;
        messageData.mContext = props.selectMessageItem.item.mContext;
        messageData.mImage = props.selectMessageItem.item.mImage;
        messageData.mButtonText = props.selectMessageItem.item.mButtonText;
        messageData.mUrl = props.selectMessageItem.item.mUrl;
        messageData.mTarget = props.selectMessageItem.item.mTarget;
        messageData.mSendTimer = props.selectMessageItem.item.mSendTimer;
        messageData.mSendTimeing = props.selectMessageItem.item.mSendTimeing;
        messageData.mSendDateD = props.selectMessageItem.item.mSendDateD == '0001-01-01' ? '' : props.selectMessageItem.item.mSendDateD;
        messageData.mSendDateT = props.selectMessageItem.item.mSendDateT;
        messageData.mapMembers = props.selectMessageItem.item.mapMembers;
        messageData.mEnabled = props.selectMessageItem.item.mEnabled;
        messageData.mEnabledLine = props.selectMessageItem.item.mEnabledLine;
        messageData.mEnabledMessage = props.selectMessageItem.item.mEnabledMessage;
        messageData.mFilter = props.selectMessageItem.item.mFilter;
        mMapCouponCards.value = props.selectMessageItem.item.mMapCouponCards;
        if ((messageData.mSendTimer == 2 && messageData.mSendTimeing == 2) || (messageData.mSendTimer == 2 && messageData.mSendTimeing == 3)) {
            let data = new Date(messageData.mSendDateD);
            if (messageData.mSendTimeing == 2) {
                messageData.mSendDateD = data.getDate();;
            } else if (messageData.mSendTimeing == 3) {
                mSend.value = data.getMonth();
                dSend.value = data.getDate();
            }
        }
        console.log(props.selectMessageItem.item.mSendDateD)
    }
    messageData.mAuto = props.selectMessageItem.auto;
    messageData.mType = props.selectMessageItem.type;
});
const handSubmit = () => {
    // }
    switch (messageData.mSendTimer) {
        case 2:
            let yy = new Date().getFullYear();
            if (messageData.mSendTimeing == 2) {
                let mm = new Date().getMonth() + 1;
                messageData.mSendDateD = yy + "-" + add0(mm) + "-" + add0(messageData.mSendDateD);
            } else if (messageData.mSendTimeing == 3) {
                messageData.mSendDateD = yy + "-" + add0(mSend.value) + "-" + add0(dSend.value);
            }
            break;
        default:
            messageData.mSendDateD = getData();
            break;
    }
    messageData.mMapCouponCards = mMapCouponCards.value.length == 0 ? [] : [mMapCouponCards.value[0].ccId]
    submitMessages(messageData)
        .then((res) => {
            if (res.state == 1) {
                if (messageData.mId == 0) {
                    Alert.warning("新增成功", 1500);
                } else {
                    Alert.warning("修改成功", 1500);
                }
                setTimeout(() => {
                    props.handAddMessageView();
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
}
const handAddCouponSubmit = (selectData: any) => {
    mMapCouponCards.value = selectData;
    messageData.mTheme = selectData[0].ccTheme;
    messageData.mTitle = selectData[0].ccTitle;
    messageData.mContext = selectData[0].ccTheme;
};
const handAddFilterSubmit = (filterData: any) => {
    messageData.mFilter = filterData;
};
const handAddReceiverSubmit = (receiverData: any) => {
    messageData.mFilter = receiverData;
};
const handCancelTicketBtn = () => {
    mMapCouponCards.value = [];
}
</script>

<template>
    <div class="popup-mask" v-on:click.self="handAddMessageView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <div class="top-content">
                <img :src="icon_closeX" v-on:click="handAddMessageView()" />
                <span>{{ title }}</span>
                <button class="otherpay-btn" v-on:click="handSubmit()">{{ submitNameBtn }}</button>
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
                        <div class="link-txt" v-if="mMapCouponCards.length == 0">
                            <u @click="addCouponBtn()" class="add-coupon-btn">加入優惠劵</u>
                        </div>
                        <div class="coupon-ticket" v-if="mMapCouponCards.length > 0">
                            <p>{{ mMapCouponCards[0].ccTitle }}</p>
                            <img :src="icon_closeX" v-on:click="handCancelTicketBtn()" />
                        </div>
                    </div>
                    <div class="auto">
                        <h2 v-if="props.selectMessageItem.auto == 0">開始建立您的簡訊訊息</h2>
                        <h2 v-if="props.selectMessageItem.auto == 1">開始建立您的自動化訊息</h2>
                        <p>請輸入訊息主題</p>
                        <div class="auto-message">
                            <p>訊息主題</p>
                            <input placeholder="請輸入訊息主題" v-model="messageData.mTheme" />
                        </div>
                    </div>
                    <div class="news">
                        <h2>你的簡訊內容</h2>
                        <p>填寫任何您想發送給顧客的簡訊內容</p>
                        <div class="news-content">
                            <p>內容</p>
                            <input placeholder="請輸入訊息內容" v-model="messageData.mContext" />
                        </div>
                        <div class="news-ref">
                            <p>按鈕網址</p>
                            <input placeholder="請輸入網址(例:https://xxxxx.com)" v-model="messageData.mUrl" />
                        </div>
                        <div class="news-img">
                            <p>附加圖片</p>
                            <input class="updata-input" type="file" ref="img"
                                accept="image/gif,image/jpeg,image/jpg,image/png" @change="handkeFileChange">
                            <div class="updata-btn">
                                <button @click="choiceImg">上傳圖片</button>
                            </div>
                        </div>
                    </div>
                    <div class="take-over">
                        <h3>發送對象</h3>
                        <p>系統將自動發送訊息給符合特定條件的顧客</p>
                        <div class="receiver">
                            <p>對象</p>
                            <div class="receiver-select" v-if="props.selectMessageItem.auto == 1">
                                <select v-model="messageData.mTarget">
                                    <option disabled value="">請選擇人員</option>
                                    <option v-for="item in mTarget" :key="item.value" :value="item.value">
                                        {{ item.label }}</option>
                                </select>
                            </div>
                            <div class="receiver-select" v-if="props.selectMessageItem.auto == 0">
                                <div>
                                    <u class="add-coupon-btn" @click="handAddReceiverView">請選擇加入對象</u>
                                </div>
                            </div>
                        </div>
                        <div class="specific" v-if="messageData.mTarget == 1">
                            <p>特定條件</p>
                            <div class="specific-select">
                                <u class="add-coupon-btn" @click="handAddFilterView">加入特定條件</u>
                            </div>
                        </div>
                    </div>
                    <div class="send-time" v-if="props.selectMessageItem.auto == 0">
                        <h3>訊息排程</h3>
                        <div class="time">
                            <p>發送方式</p>
                            <div class="time-select">
                                <select v-model="messageData.mSendTimer">
                                    <option disabled value="">請選擇發送時機</option>
                                    <option v-for="item in mSendMethod" :key="item.value" :value="item.value">
                                        {{ item.label }}</option>
                                </select>
                            </div>
                        </div>
                        <!-- mSendTimer == 1 (指定排程) -->
                        <div v-if="messageData.mSendTimer == 1">
                            <div class="time">
                                <p>指定日期</p>
                                <div class="time-select">
                                    <input type="date" v-model="messageData.mSendDateD" />
                                </div>
                            </div>
                            <div class="time">
                                <p>指定時段</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendDateT">
                                        <option disabled value="">請選擇指定時段</option>
                                        <option v-for="item in periodTime" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="send-time" v-if="props.selectMessageItem.auto == 1">
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
                        <!-- mSendTimer == 2 (固定日期) -->
                        <div v-if="messageData.mSendTimer == 2">
                            <div class="time">
                                <p>固定方式</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendTimeing">
                                        <option disabled value="">請選擇固定時間</option>
                                        <option v-for="item in fixedDate" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="time" v-if="messageData.mSendTimeing != 0">
                                <p>固定日期</p>
                                <div class="time-select" v-if="messageData.mSendTimeing == 1">
                                    <select v-model="messageData.mSendDateD">
                                        <option disabled value="">請選擇日期</option>
                                        <option v-for="item in weekDate" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                                <div class="time-select" v-if="messageData.mSendTimeing == 2">
                                    <select v-model="messageData.mSendDateD">
                                        <option disabled value="">請選擇日期</option>
                                        <option v-for="item in dateDate" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                                <div class="time-select" v-if="messageData.mSendTimeing == 3">
                                    <select v-model="mSend">
                                        <option disabled value="">請選擇月份</option>
                                        <option v-for="item in monthDate" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                                <div class="time-select" v-if="messageData.mSendTimeing == 3">
                                    <select v-model="dSend">
                                        <option disabled value="">請選擇日期</option>
                                        <option v-for="item in dateDate" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="time">
                                <p>時段</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendDateT">
                                        <option disabled value="">請選擇指定時段</option>
                                        <option v-for="item in periodTime" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- mSendTimer == 3 (顧客生日) -->
                        <div v-if="messageData.mSendTimer == 3">
                            <div class="time">
                                <p>日期</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendTimeing">
                                        <option disabled value="">請選擇日期</option>
                                        <option v-for="item in birData" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="time">
                                <p>時段</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendDateT">
                                        <option disabled value="">請選擇指定時段</option>
                                        <option v-for="item in periodTime" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- mSendTimer == 4 (預約日期) -->
                        <div v-if="messageData.mSendTimer == 4">
                            <div class="time">
                                <p>日期</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendTimeing">
                                        <option disabled value="">請選擇日期</option>
                                        <option v-for="item in dayData" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="time" v-if="messageData.mSendTimeing != 0">
                                <p>時段</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendDateT">
                                        <option disabled value="">請選擇指定時段</option>
                                        <option v-for="item in periodTime" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- mSendTimer == 5(首次消費) -->
                        <div v-if="messageData.mSendTimer == 5">
                            <div class="time">
                                <p>日期</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendTimeing">
                                        <option disabled value="">請選擇日期</option>
                                        <option v-for="item in dayData" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="time" v-if="messageData.mSendTimeing != 0">
                                <p>時段</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendDateT">
                                        <option disabled value="">請選擇指定時段</option>
                                        <option v-for="item in periodTime" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- mSendTimer == 6(消費完成,) -->
                        <div v-if="messageData.mSendTimer == 6">
                            <div class="time">
                                <p>日期</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendTimeing">
                                        <option disabled value="">請選擇日期</option>
                                        <option v-for="item in dayData" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="time" v-if="messageData.mSendTimeing != 0">
                                <p>時段</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendDateT">
                                        <option disabled value="">請選擇指定時段</option>
                                        <option v-for="item in periodTime" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
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
                        <div class="link-txt" v-if="mMapCouponCards.length == 0">
                            <u @click="addCouponBtn()" class="add-coupon-btn">加入優惠劵</u>
                        </div>
                        <div class="coupon-ticket" v-if="mMapCouponCards.length > 0">
                            <p>{{ mMapCouponCards[0].ccTitle }}</p>
                            <img :src="icon_closeX" v-on:click="handCancelTicketBtn()" />
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
                            <div class="receiver-select" v-if="props.selectMessageItem.auto == 1">
                                <select v-model="messageData.mTarget">
                                    <option disabled value="">請選擇人員</option>
                                    <option v-for="item in mTarget" :key="item.value" :value="item.value">
                                        {{ item.label }}</option>
                                </select>
                            </div>
                            <div class="receiver-select" v-if="props.selectMessageItem.auto == 0">
                                <div>
                                    <u class="add-coupon-btn" @click="handAddReceiverView">請選擇加入對象</u>
                                </div>
                            </div>
                        </div>
                        <div class="specific" v-if="messageData.mTarget == 1">
                            <p>特定條件</p>
                            <div class="specific-select">
                                <u class="add-coupon-btn" @click="handAddFilterView">加入特定條件</u>
                            </div>
                        </div>
                    </div>
                    <div class="send-time" v-if="props.selectMessageItem.auto == 0">
                        <h3>訊息排程</h3>
                        <div class="time">
                            <p>發送方式</p>
                            <div class="time-select">
                                <select v-model="messageData.mSendTimer">
                                    <option disabled value="">請選擇發送時機</option>
                                    <option v-for="item in mSendMethod" :key="item.value" :value="item.value">
                                        {{ item.label }}</option>
                                </select>
                            </div>
                        </div>
                        <!-- mSendTimer == 1 (指定排程) -->
                        <div v-if="messageData.mSendTimer == 1">
                            <div class="time">
                                <p>指定日期</p>
                                <div class="time-select">
                                    <input type="date" v-model="messageData.mSendDateD" />
                                </div>
                            </div>
                            <div class="time">
                                <p>指定時段</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendDateT">
                                        <option disabled value="">請選擇指定時段</option>
                                        <option v-for="item in periodTime" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="send-time" v-if="props.selectMessageItem.auto == 1">
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
                        <!-- mSendTimer == 2 (固定日期) -->
                        <div v-if="messageData.mSendTimer == 2">
                            <div class="time">
                                <p>固定方式</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendTimeing">
                                        <option disabled value="">請選擇固定時間</option>
                                        <option v-for="item in fixedDate" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="time" v-if="messageData.mSendTimeing != 0">
                                <p>固定日期</p>
                                <div class="time-select" v-if="messageData.mSendTimeing == 1">
                                    <select v-model="messageData.mSendDateD">
                                        <option disabled value="">請選擇日期</option>
                                        <option v-for="item in weekDate" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                                <div class="time-select" v-if="messageData.mSendTimeing == 2">
                                    <select v-model="messageData.mSendDateD">
                                        <option disabled value="">請選擇日期</option>
                                        <option v-for="item in dateDate" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                                <div class="time-select" v-if="messageData.mSendTimeing == 3">
                                    <select v-model="mSend">
                                        <option disabled value="">請選擇月份</option>
                                        <option v-for="item in monthDate" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                                <div class="time-select" v-if="messageData.mSendTimeing == 3">
                                    <select v-model="dSend">
                                        <option disabled value="">請選擇日期</option>
                                        <option v-for="item in dateDate" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="time">
                                <p>時段</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendDateT">
                                        <option disabled value="">請選擇指定時段</option>
                                        <option v-for="item in periodTime" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- mSendTimer == 3 (顧客生日) -->
                        <div v-if="messageData.mSendTimer == 3">
                            <div class="time">
                                <p>日期</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendTimeing">
                                        <option disabled value="">請選擇日期</option>
                                        <option v-for="item in birData" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="time">
                                <p>時段</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendDateT">
                                        <option disabled value="">請選擇指定時段</option>
                                        <option v-for="item in periodTime" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- mSendTimer == 4 (預約日期) -->
                        <div v-if="messageData.mSendTimer == 4">
                            <div class="time">
                                <p>日期</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendTimeing">
                                        <option disabled value="">請選擇日期</option>
                                        <option v-for="item in dayData" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="time" v-if="messageData.mSendTimeing != 0">
                                <p>時段</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendDateT">
                                        <option disabled value="">請選擇指定時段</option>
                                        <option v-for="item in periodTime" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- mSendTimer == 5(首次消費) -->
                        <div v-if="messageData.mSendTimer == 5">
                            <div class="time">
                                <p>日期</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendTimeing">
                                        <option disabled value="">請選擇日期</option>
                                        <option v-for="item in dayData" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="time" v-if="messageData.mSendTimeing != 0">
                                <p>時段</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendDateT">
                                        <option disabled value="">請選擇指定時段</option>
                                        <option v-for="item in periodTime" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- mSendTimer == 6(消費完成,) -->
                        <div v-if="messageData.mSendTimer == 6">
                            <div class="time">
                                <p>日期</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendTimeing">
                                        <option disabled value="">請選擇日期</option>
                                        <option v-for="item in dayData" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="time" v-if="messageData.mSendTimeing != 0">
                                <p>時段</p>
                                <div class="time-select">
                                    <select v-model="messageData.mSendDateT">
                                        <option disabled value="">請選擇指定時段</option>
                                        <option v-for="item in periodTime" :key="item.value" :value="item.value">
                                            {{ item.label }}</option>
                                    </select>
                                </div>
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
    <AddCoupon v-if="addCouponView" :handAddCouponView="handAddCouponView" :mMapCouponCards="messageData.mMapCouponCards"
        @handSubmit="handAddCouponSubmit" />
    <AddFilter v-if="addFilterView" :handAddFilterView="handAddFilterView" :mFilter="messageData.mFilter"
        @handSubmit="handAddFilterSubmit" />
    <AddReceiver v-if="addReceiverView" :handAddReceiverView="handAddReceiverView" :mFilter="messageData.mFilter"
        @handSubmit="handAddReceiverSubmit" />
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



        >.news-wrap {
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
                }

                >.coupon {
                    margin: 25px 10px;
                    padding: 0px 0px;
                    border: solid 0.5px #a19f9f;
                    border-radius: 5px 5px 5px 5px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    text-align: left;
                    background: #ffffff;

                    >.link-txt {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    >.coupon-ticket {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 35px;
                        padding: 10px 10px;
                        border: solid 0.5px #a19f9f;
                        border-radius: 5px 5px 5px 5px;
                        font-size: 30px;

                        img {
                            margin: 0 10px;
                            height: 80%;
                        }
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

                        >.receiver-select {
                            // width: 100%;
                            position: relative;
                            border-left: solid 0.5px #a19f9f;
                            flex: 1;
                            align-content: center;

                            >select {
                                position: absolute;
                                top: 1px;
                                left: 1px;
                                right: 1px;
                                bottom: 1px;
                                border: transparent;
                                text-align: center;
                            }

                            >div {
                                display: flex;
                                height: 100%;
                                align-items: center;
                                justify-content: center;

                            }
                        }

                    }

                    >.specific {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        margin: 5px 0;
                        border-radius: 5px 5px 5px 5px;

                        P {
                            margin: 20px 10px;
                            width: 20%;
                        }

                        >.specific-select {
                            display: flex;
                            justify-content: center;
                            align-content: center;
                            border-left: solid 0.5px #a19f9f;
                            flex: 1;

                            >u {
                                display: flex;
                                align-items: center;

                            }
                        }

                    }

                }

                >.send-time {
                    text-align: left;
                    margin: 25px 10px;

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
                    align-items: center;
                    text-align: left;
                    background: #ffffff;

                    >.link-txt {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    >.coupon-ticket {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 35px;
                        padding: 10px 10px;
                        border: solid 0.5px #a19f9f;
                        border-radius: 5px 5px 5px 5px;
                        font-size: 30px;

                        img {
                            margin: 0 10px;
                            height: 80%;
                        }
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

                            >div {
                                display: flex;
                                height: 100%;
                                align-items: center;
                                justify-content: center;

                            }
                        }

                    }

                    >.specific {
                        display: flex;
                        text-align: center;
                        border: solid 0.5px #a19f9f;
                        margin: 5px 0;
                        border-radius: 5px 5px 5px 5px;

                        P {
                            margin: 20px 10px;
                            width: 20%;
                        }

                        >.specific-select {
                            display: flex;
                            justify-content: center;
                            align-content: center;
                            border-left: solid 0.5px #a19f9f;
                            flex: 1;

                            >u {
                                display: flex;
                                align-items: center;

                            }
                        }

                    }

                }

                >.send-time {
                    text-align: left;
                    margin: 25px 10px;

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