<script setup lang="ts">
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { useMemberStore } from "@/stores/member";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const memberStore = useMemberStore();
const { memberList } = storeToRefs(memberStore);
const { getMemberList } = memberStore;
const keyWord = ref("");
const title = ref("選擇發送對象");
const selectReceiver: any = reactive({
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

const props = defineProps<{
    mFilter: any,
    handAddReceiverView: Function
}>();
const emits = defineEmits<{
    (e: "handSubmit", item: any): void;
}>();

onMounted(() => {
    console.log(props.mFilter)
    if (props.mFilter != undefined) {
        selectReceiver.msfId = props.mFilter.msfId;
        selectReceiver.mId = props.mFilter.mId;
        selectReceiver.msfMember = props.mFilter.msfMember == "" ? [] : props.mFilter.msfMember.split(',');

    }
    getMemberList();
});
const getMemberListFn = (data: any) => {
    if (
        keyWord.value.substring(0, 1) == "0" ||
        keyWord.value.substring(0, 2) == "09"
    ) {
        return (
            !keyWord.value ||
            data.phone.toLowerCase().includes(keyWord.value.toLowerCase())
        );
    } else {
        return (
            !keyWord.value ||
            data.nameView.toLowerCase().includes(keyWord.value.toLowerCase())
        );
    }
};
const filterMemberListData = computed(() => {
    const filter = memberList.value.data.filter(getMemberListFn);
    return filter;
});
const handSubmit = () => {
    selectReceiver.msfMember = selectReceiver.msfMember.toString();
    selectReceiver.msfSex = selectReceiver.msfSex.toString();
    selectReceiver.msfRegister = selectReceiver.msfRegister.toString();
    selectReceiver.msfBirthday = selectReceiver.msfBirthday.toString();
    selectReceiver.msfLabel = selectReceiver.msfLabel.toString();
    selectReceiver.msfStaff = selectReceiver.msfStaff.toString();
    selectReceiver.msfOther = selectReceiver.msfOther.toString();
    emits("handSubmit", selectReceiver);
    props.handAddReceiverView();
};
</script>

<template>
    <div class="popup-mask" v-on:click.self="handAddReceiverView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <h1>{{ title }}</h1>
            <div class="content">
                <div class="filter-input">
                    <input placeholder="🔍搜尋名稱、暱稱或手機" v-model="keyWord" />
                </div>
                <div class="receiver-block">
                    <div class="receiver-content" v-for="item in filterMemberListData" :key="item.userId">
                        <input type="checkbox" :id="item.userId" :value="item.userId" v-model="selectReceiver.msfMember" />
                        <div>
                            <p>{{ item.nameView }}</p>
                            <p>{{ item.phone }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sub-btn">
                <button class="submitBtn" type="submit" v-on:click="handSubmit()">確認加入</button>
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
            // padding: 10px 30px;

            >.filter-input {
                // display: flex;
                margin: 10px 10px;

                >input {
                    width: 80%;
                    height: 30px;
                    border-radius: 6px;
                    border: solid 1px #707070;
                    background-color: #fff;
                    margin-right: 10px;
                    // text-align: center;
                }
            }

            >.receiver-block {
                margin: 10px 0px;
                padding: 10px 0px;
                border-top: solid 1px #dadada;
                border-bottom: solid 1px #dadada;
                position: absolute;
                top: 44px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                overflow: auto;

                .receiver-content {
                    display: flex;
                    margin: 10px 10px;

                    >input {
                        width: 5%;
                        margin: 15px 15px;
                    }

                    >div {
                        margin: 0 10px;

                        p {
                            margin: 0 0;
                        }
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