<script setup lang="ts">
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { Search } from '@element-plus/icons-vue';
import { usePriceStore } from "@/stores/priceStore";
import { useCounterStore } from "@/stores/counter";
import { useMemberStore } from "@/stores/member";
import { useManagerStore } from "@/stores/manager";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const priceStore = usePriceStore();
const { getCouponApi } = priceStore;
const { couponListRef } = storeToRefs(priceStore);
const memberStore = useMemberStore();
const { groupListData } = storeToRefs(memberStore);
const { getGroupData } = memberStore;
const managerstore = useManagerStore();
const { managerList } = storeToRefs(managerstore);
const { getManagerList } = managerstore;
const title = ref("更多篩選條件");
const selectItem: any = reactive({
    msfId: 0,
    mId: 0,
    msfSex: [],
    msfRegister: [],
    msfAvgPriceA: 0,
    msfAvgPriceB: 0,
    msfTolPriceA: 0,
    msfTolPriceB: 0,
    msfBirthday: [],
    msfLabel: [],
    msfConsumer: 0,
    msfUnConsumer: 0,
    msfConCycleA: 0,
    msfConCycleB: 0,
    msfStaff: [],
    msfMember: [],
    msfOther: []
}
);
const sexData: any = [
    {
        value: 0,
        label: '小姐',
    },
    {
        value: 1,
        label: '先生',
    },
    {
        value: 2,
        label: '不透漏',
    },
]
const registerData: any = [
    {
        value: 0,
        label: '路過',
    },
    {
        value: 1,
        label: '網路預約',
    },
    {
        value: 2,
        label: '不透漏',
    },
]
const amountRange: any = [
    {
        value: 0,
        label: '$500 以下',
        maxAmount: 500,
        minAmount: 0
    },
    {
        value: 1,
        label: '$500 ~ $1000',
        maxAmount: 1000,
        minAmount: 500
    },
    {
        value: 2,
        label: '$1000 ~ $2500',
        maxAmount: 2500,
        minAmount: 1000
    },
    {
        value: 3,
        label: '$2500 ~ $5000',
        maxAmount: 5000,
        minAmount: 2500
    },
    {
        value: 4,
        label: '$5000 以上',
        maxAmount: 0,
        minAmount: 5000
    },
]
const monthData: any = [
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
const consumerData: any = [
    {
        value: 1,
        label: '當天有消費',
    },
    {
        value: 2,
        label: '最近一周有消費',
    },
    {
        value: 3,
        label: '最近一個月有消費',
    },
    {
        value: 4,
        label: '最近三個月有消費',
    },
    {
        value: 5,
        label: '最近半年有消費',
    },
    {
        value: 6,
        label: '最近一年有消費',
    },
    {
        value: 7,
        label: '最近一年半有消費',
    },
]
const unConsumerData: any = [
    {
        value: 1,
        label: '最近一周無消費',
    },
    {
        value: 2,
        label: '最近一月無消費',
    },
    {
        value: 3,
        label: '最近三個月無消費',
    },
    {
        value: 4,
        label: '最近半年無消費',
    },
    {
        value: 5,
        label: '最近一年無消費',
    },
    {
        value: 6,
        label: '最近一年半無消費',
    },
]
const otherData: any = [
    {
        value: 0,
        label: '本周新增',
    },
    {
        value: 1,
        label: ' 被封鎖客戶',
    },
]
const consumeCycleData: any = ref([0, 0]);
const marks = reactive({
    0: '1月',
    11: '12月'
})
const props = defineProps<{
    mFilter: any,
    handAddFilterView: Function
}>();
const emits = defineEmits<{
    (e: "handSubmit", item: any): void;
}>();

onMounted(() => {
    if (props.mFilter.msfId != 0 || props.mFilter.mId != 0) {
        selectItem.msfId = props.mFilter.msfId;
        selectItem.mId = props.mFilter.mId;
        selectItem.msfSex = props.mFilter.msfSex.split(',');
        selectItem.msfRegister = props.mFilter.msfRegister.split(',');
        selectItem.msfAvgPriceA = props.mFilter.msfAvgPriceA;
        selectItem.msfAvgPriceB = props.mFilter.msfAvgPriceB;
        selectItem.msfTolPriceA = props.mFilter.msfTolPriceA;
        selectItem.msfTolPriceB = props.mFilter.msfTolPriceB;
        selectItem.msfBirthday = props.mFilter.msfBirthday.split(',');
        selectItem.msfLabel = props.mFilter.msfLabel.split(',');
        selectItem.msfConsumer = props.mFilter.msfConsumer;
        selectItem.msfUnConsumer = props.mFilter.msfUnConsumer;
        selectItem.msfConCycleA = props.mFilter.msfConCycleA;
        selectItem.msfConCycleB = props.mFilter.msfConCycleB;
        selectItem.msfStaff = props.mFilter.msfStaff.split(',');
        selectItem.msfMember = props.mFilter.msfMember.split(',');
        selectItem.msfOther = props.mFilter.msfOther.split(',');
        consumeCycleData.value[0] = props.mFilter.msfConCycleA;
        consumeCycleData.value[1] = props.mFilter.msfConCycleB;
    }
    console.log(selectItem.msfSex)
});
const changeEvent = (type: any, data: any) => {
    if (type == 3) {
        selectItem.msfAvgPriceA = data.minAmount;
        selectItem.msfAvgPriceB = data.maxAmount;
    } else if (type == 4) {
        selectItem.msfTolPriceA = data.minAmount;
        selectItem.msfTolPriceB = data.maxAmount;
    }
};
const handSubmit = () => {
    selectItem.msfConCycleA = consumeCycleData.value[0] == consumeCycleData.value[1] ? 0 : consumeCycleData.value[0];
    selectItem.msfConCycleB = consumeCycleData.value[1] == consumeCycleData.value[0] ? 0 : consumeCycleData.value[1];
    selectItem.msfSex = selectItem.msfSex.toString();
    selectItem.msfRegister = selectItem.msfRegister.toString();
    selectItem.msfBirthday = selectItem.msfBirthday.toString();
    selectItem.msfLabel = selectItem.msfLabel.toString();
    selectItem.msfStaff = selectItem.msfStaff.toString();
    selectItem.msfMember = selectItem.msfMember.toString();
    selectItem.msfOther = selectItem.msfOther.toString();
    emits("handSubmit", selectItem);
    props.handAddFilterView();
};
const handCancel = () => {
    selectItem.msfId = props.mFilter.msfId != 0 ? props.mFilter.msfId : 0;
    selectItem.mId = props.mFilter.mId != 0 ? props.mFilter.mId : 0;
    selectItem.msfSex = [];
    selectItem.msfRegister = [];
    selectItem.msfAvgPriceA = 0;
    selectItem.msfAvgPriceB = 0;
    selectItem.msfTolPriceA = 0;
    selectItem.msfTolPriceB = 0;
    selectItem.msfBirthday = [];
    selectItem.msfLabel = [];
    selectItem.msfConsumer = 0;
    selectItem.msfUnConsumer = 0;
    selectItem.msfConCycleA = 0;
    selectItem.msfConCycleB = 0;
    selectItem.msfStaff = [];
    selectItem.msfMember = [];
    selectItem.msfOther = [];
    consumeCycleData.value[0] = 0;
    consumeCycleData.value[1] = 0;

}
</script>

<template>
    <div class="popup-mask" v-on:click.self="handAddFilterView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <h1>{{ title }}</h1>
            <div class="content">
                <!-- 性別 -->
                <div class="demo-collapse">
                    <el-collapse>
                        <el-collapse-item title="性別" name="1">
                            <div class="checkbox-block" v-for="item in sexData" :key="item.value">
                                <input type="checkbox" :id="item.value" :value="item.value" v-model="selectItem.msfSex" />
                                <label>{{ item.label }}</label>

                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <!-- 建立管道 -->
                <div class="demo-collapse">
                    <el-collapse>
                        <el-collapse-item title="建立管道" name="2">
                            <div class="checkbox-block" v-for="item in registerData" :key="item.value">
                                <input type="checkbox" :id="item.value" :value="item.value"
                                    v-model="selectItem.msfRegister" />
                                <label>{{ item.label }}</label>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <!-- 平均消費金額 -->
                <div class="demo-collapse">
                    <el-collapse>
                        <el-collapse-item title="平均消費金額" name="3">
                            <div class="input-border">
                                <input placeholder="最低" v-model="selectItem.msfAvgPriceA" />
                                <input placeholder="最高" v-model="selectItem.msfAvgPriceB" />
                            </div>
                            <div class="radio-block" v-for="item in amountRange" :key="item.value">
                                <input type="radio" name="amount" @change="changeEvent(3, item)" />
                                <label>{{ item.label }}</label>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <!-- 總消費金額 -->
                <div class="demo-collapse">
                    <el-collapse>
                        <el-collapse-item title="總消費金額" name="4">
                            <div class="input-border">
                                <input placeholder="最低" v-model="selectItem.msfTolPriceA" />
                                <input placeholder="最高" v-model="selectItem.msfTolPriceB" />
                            </div>
                            <div class="radio-block" v-for="item in amountRange" :key="item.value">
                                <input type="radio" name="amount" @change="changeEvent(4, item)" />
                                <label>{{ item.label }}</label>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <!-- 生日月分 -->
                <div class="demo-collapse">
                    <el-collapse>
                        <el-collapse-item title="生日月分" name="5">
                            <div class="checkbox-block" v-for="item in monthData" :key="item.value">
                                <input type="checkbox" :id="item.value" :value="item.value"
                                    v-model="selectItem.msfBirthday" />
                                <label>{{ item.label }}</label>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <!-- 客戶標籤 -->
                <div class="demo-collapse">
                    <el-collapse @change="getGroupData()">
                        <el-collapse-item title="客戶標籤" name="6">
                            <div class="checkbox-block" v-for="item in groupListData.data" :key="item.groupId">
                                <input type="checkbox" :id="item.groupId" :value="item.groupId"
                                    v-model="selectItem.msfLabel" />
                                <label>{{ item.label }}</label>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <!-- 近期有消費 -->
                <div class="demo-collapse">
                    <el-collapse>
                        <el-collapse-item title="近期有消費" name="7">
                            <div class="radio-block" v-for="item in consumerData" :key="item.value">
                                <input type="radio" name="amount" :value="item.value" v-model="selectItem.msfConsumer" />
                                <label>{{ item.label }}</label>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <!-- 近期無消費 -->
                <div class="demo-collapse">
                    <el-collapse>
                        <el-collapse-item title="近期無消費" name="8">
                            <div class="radio-block" v-for="item in unConsumerData" :key="item.value">
                                <input type="radio" name="unamount" :value="item.value"
                                    v-model="selectItem.msfUnConsumer" />
                                <label>{{ item.label }}</label>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <!-- 消費週期 -->
                <div class="demo-collapse">
                    <el-collapse>
                        <el-collapse-item title="消費週期" name="9">
                            <div class="slider-demo-block">
                                <el-slider v-model="consumeCycleData" range :marks="marks" show-stops :max="11" />
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <!-- 服務人員 -->
                <div class="demo-collapse">
                    <el-collapse @change="getManagerList({ id: 0, pageindex: 0, count: 0, })">
                        <el-collapse-item title="服務人員" name="10">
                            <div class="checkbox-block" v-for="item in managerList.data" :key="item.managerId">
                                <input type="checkbox" :id="item.managerId" :value="item.managerId"
                                    v-model="selectItem.msfStaff" />
                                <label>{{ item.nameView }}</label>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <!-- 其他 -->
                <div class="demo-collapse">
                    <el-collapse>
                        <el-collapse-item title="其他" name="11">
                            <div class="checkbox-block" v-for="item in otherData" :key="item.value">
                                <input type="checkbox" :id="item.value" :value="item.value" v-model="selectItem.msfOther" />
                                <label>{{ item.label }}</label>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <div class="sub-btn">
                <button class="cancelBtn" type="submit" v-on:click="handCancel()">清除所有條件</button>
                <button class="submitBtn" type="submit" v-on:click="handSubmit()">確認儲存</button>
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
        font-size: 20px;
        font-family: HeitiTC;
        color: #84715c;
        // font-weight: bold;
        text-align: center;

        >h1 {
            font-size: 20px;
            margin: 10px 0;
        }

        >.content {
            position: absolute;
            top: 50px;
            bottom: 66px;
            left: 0px;
            right: 0px;
            background: #faf9f8;
            overflow: auto;
            padding: 10px 30px;

            .checkbox-block {
                display: flex;
                justify-items: start;
                align-items: center;
                height: 40px;
                margin: 0 30px;
                font-size: 16px;
                color: #717171;

                >input {
                    margin: 0 5px;
                }

                >label {
                    color: #717171;
                    margin: 0 5px;
                }

            }

            .input-border {
                input {
                    width: 40%;
                    height: 32px;
                    border: solid 0.5px #a19f9f;
                    margin: 0px 5px;
                    border-radius: 5px 5px 5px 5px;
                }
            }

            .radio-block {
                display: flex;
                justify-items: start;
                align-items: center;
                height: 40px;
                margin: 0 30px;
                font-size: 16px;
                color: #717171;

                input {
                    margin: 0 5px;
                }
            }

            .slider-demo-block {
                margin: 0 30px;
            }

            >ul {
                padding-left: 0;
                margin: 0 15px;

                .coupon-content {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 10px;
                    height: 54px;



                    p {
                        margin: 0px 0px 0px 0px;
                    }

                    button {
                        border: transparent;
                        background: transparent;
                    }
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