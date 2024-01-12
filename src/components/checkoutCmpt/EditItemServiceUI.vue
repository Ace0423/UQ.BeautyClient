<template>
    <div class="popup-editItemServiceUI" v-on:click.self="showUIFn(false)">
        <div class="popup-content">
            <div class="header-content">
                <span>調整 {{ formInputRef.name }}</span>
                <img :src="icon_closeX" @click="showUIFn(false)">
            </div>
            <div class="main-content">
                <div class="input-item" name="項目類型">
                    <div v-if="formInputRef.subName">
                        <span>子項目名稱</span>
                        <input v-model="formInputRef.subName" placeholder="" type="text" disabled />
                    </div>
                    <div>
                        <span>價格</span>
                        <input v-model="formInputRef.price" placeholder="" type="text" disabled />
                    </div>
                    <div>
                        <span>折扣</span>
                        <input v-if="formInputRef.sglDiscountList.length == 0" placeholder="請選擇折扣" type="text"
                            @click="showRdSgDcFn(true)" readonly />
                        <div v-else @click="showRdSgDcFn(true)">
                            <div class="sgdc-item" v-for="(sdItem, index) in formInputRef.sglDiscountList" :key="sdItem">
                                <span>{{ sdItem.title }}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span>*服務人員</span>
                        <input v-model="formInputRef.managerInfo.nameView" placeholder="請選擇服務人員" type="text"
                            @click="showManagerUIFn(true)" readonly />
                    </div>
                    <span class="p_error">
                        {{ ruleLists.ruleItem.price.warn }}
                    </span>
                </div>
            </div>
            <div class="footer-content">
                <button class="submit-btn" @click="delBtn()">結帳中移除</button>
                <button class="submit-btn" @click="submitBtn()">儲存確認</button>
                <!-- <button class="cancle-btn" @click="showAddSubUIFn(false)">取消</button> -->
            </div>
        </div>
    </div>
    <RdManagerUI v-if="showRdManagerRef" :selData="formInputRef.managerInfo" :getDataFn="getRdManagerFn"
        :showManagerUIFn="showManagerUIFn" />

    <RdSgDiscountUI v-if="showRdSgDcUIRef" :itemData="selData" :selData="formInputRef.sglDiscountList" :getDataFn="getRdDcFn"
        :showRdDFn="showRdSgDcFn" />
</template>
  
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePriceStore } from "@/stores/priceStore";
import search_ico from "@/assets/images/icon_search.png";
import icon_closeX from "@/assets/images/icon_closeX.png";
import { checkVerify_all, serviceTimer } from "@/utils/utils";

let showRdManagerRef = ref(false);
let showRdSgDcUIRef = ref(false);


let store = usePriceStore();
let { allDiscountList } = storeToRefs(store);
let { getAllDiscountApi } = store;

const props = defineProps<{
    showUIFn: Function;
    getDataFn: Function;
    selData: any;
    delDataFn: Function;
}>();
let formInputRef: any = ref({
    name: "",
    subName: "",
    price: 0,
    managerInfo: { nameView: "" },
    sglDiscountList: [],
});

onBeforeFn();
function onBeforeFn() {
    formInputRef.value.name = props.selData.name;
    formInputRef.value.price = props.selData.price;
    formInputRef.value.managerInfo = props.selData.managerInfo ? props.selData.managerInfo : formInputRef.value.managerInfo;
    formInputRef.value.sglDiscountList = props.selData.sglDiscountList ? props.selData.sglDiscountList : [];

    if (props.selData.subList.length > 0) {
        formInputRef.value.subName = props.selData.subList[0].name
        formInputRef.value.price = props.selData.subList[0].price
    }
}
onMounted(() => {
    // console.log('onMounted');
});
function changeValue() {

}

function showManagerUIFn(type: boolean) {
    showRdManagerRef.value = type;
}
function getRdManagerFn(data: any) {
    showManagerUIFn(false);
    formInputRef.value.managerInfo = data;
}
function showRdSgDcFn(state: boolean) {
    showRdSgDcUIRef.value = state;
}
function getRdDcFn(data: any) {
    if (data == "clearAll") {
        formInputRef.value.sglDiscountList = [];
    } else {
        let curSgiscount = [];
        for (let i = 0; i < formInputRef.value.sglDiscountList.length; i++) {
            const element = formInputRef.value.sglDiscountList[i];
            if (element.dType != data.dType) {
                curSgiscount.push(element)
            }
        }
        curSgiscount.push(data);
        formInputRef.value.sglDiscountList = curSgiscount;
    }
    showRdSgDcFn(false);
}
function submitBtn() {
    if (formInputRef.value.managerInfo.nameView != "")
        props.selData.managerInfo = formInputRef.value.managerInfo;
    props.selData.sglDiscountList = formInputRef.value.sglDiscountList;
    props.getDataFn(props.selData)
}
function delBtn() {
    props.delDataFn(props.selData)
}
//#region 規則
const ruleLists: any = reactive({
    ruleItem: {
        name: {
            label: "名稱",
            rules: {
                required: {
                    warn: "此項為必填",
                },
            },
            is_error: false,
            warn: "",
        },
        price: {
            label: "價格",
            rules: {
                required: {
                    warn: "此項為必填",
                },
            },
            is_error: false,
            warn: "",
        },
        servicesTime: {
            label: "時長",
            rules: {
                required: {
                    warn: "此項為必填",
                },
            },
            is_error: false,
            warn: "",
        },
    },
});
//#endregion
</script>
  
<style scoped lang="scss">
.popup-editItemServiceUI {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 3;
    background: rgba(80, 80, 80, 0.8);

    display: flex;
    align-items: center;
    justify-content: space-around;

    .popup-content {
        width: 500px;
        height: 70%;
        background-color: #ffffff;
        // padding: 15px 50px;
        font-size: 20px;
        font-family: HeitiTC;
        color: #84715c;
        font-weight: bold;
        border-radius: 12px;

        .header-content {
            display: flex;
            height: 70px;
            width: calc(100%);
            border-bottom: solid 1px #ddd;
            box-sizing: border-box;

            >span {
                position: absolute;
                display: flex;
                width: calc(100%);
                justify-content: center;
                align-items: center;
                font-size: 28px;
                height: 70px;
                justify-content: center;
                left: 0;
                right: 0;

            }

            >img {
                position: relative;
                width: 41px;
                height: 38px;
                top: 15px;
                left: 15px;
            }


            >button {
                position: relative;
                width: 41px;
                height: 38px;
                top: 15px;
                right: 15px;
            }

        }

        .main-content {
            display: block;
            height: calc(100% - 70px - 70px);
            width: 96%;
            // margin-left: 3%;


            .input-item {
                display: grid;
                width: 100%;
                // margin-left: 5%;
                padding: 2% 2%;

                .title-content {
                    font-size: 28px;
                    width: 100%;
                }


                .msg-content {
                    font-size: 20px;
                    color: #c1bdb8;
                    margin-bottom: 10px;
                }

                .select-content {
                    width: calc(100% - 180px);

                    .el-select {
                        width: 100%;

                        :deep(.el-input__wrapper) {
                            width: 100%;
                            height: 77px;
                            font-size: 24px;

                            :deep(.el-select-dropdown) {
                                border: 1px solid #ff0000 !important;
                            }
                        }

                        input {
                            font-size: 12px;
                            border: none;
                            background: none;
                            text-align: center;
                            font-weight: bold;
                        }
                    }
                }


                .input-timer {
                    width: calc(100% - 180px);
                    height: 100%;
                    margin-left: 0;

                    .el-input__inner {
                        height: 100px;
                    }
                }

                .percent-input {
                    width: calc(100% - 180px - 180px);
                }

                .textMsg-content {
                    display: flex;
                    height: 100px;
                    width: 100%;
                    border: solid 0.5px #ddd;
                    box-sizing: border-box;

                    textarea {
                        width: calc(100% - 180px);
                        height: 99%;
                        border: solid 0px #ddd;
                        box-sizing: border-box;
                    }
                }

                >div {
                    display: flex;
                    height: 80px;
                    width: 100%;
                    border: solid 0.5px #ddd;
                    box-sizing: border-box;

                    // margin: 15px 0;
                    .link {
                        display: flex;
                        height: 100%;
                        width: calc(100% - 180px);
                        justify-content: center;
                        align-items: center;
                        color: #87ceeb;
                    }

                    >span {
                        height: 100%;
                        width: 180px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #faf9f8;
                        font-size: 24px;
                    }

                    >input {
                        border: solid 0px #c1bdb8;
                        box-sizing: border-box;
                        height: 100%;
                        width: calc(100% - 180px);
                        font-size: 22px;
                    }

                    >p {
                        color: #87ceeb;
                        width: calc(100% - 180px);
                    }

                    ::placeholder {
                        color: #c1bdb8;
                    }

                    >div {
                        display: flex;
                        width: calc(268px);
                        height: 100%;
                        justify-content: left;
                        align-items: center;
                        overflow-x: auto;

                        .sgdc-item {
                            display: flex;
                            height: 100%;
                            justify-content: center;
                            align-items: center;
                            margin: 0 5px;

                            >span {
                                background-color: #717171;
                                color: #fff;
                                padding: 5px;
                                white-space: nowrap;
                            }
                        }

                    }
                }

                .link-btn {
                    font-size: 28px;
                    width: 100%;

                    >span {
                        color: #87ceeb;
                        font-size: 28px;
                        width: 100%;
                    }
                }

                input:disabled {
                    background-color: #e8e8e8;
                }
            }
        }

        .footer-content {
            display: flex;
            height: 70px;
            border-top: solid 1px #ddd;
            justify-content: space-around;
            align-items: center;

            .submit-btn {
                width: 150px;
                height: 50px;
                border-radius: 5px;
                border: none;
                background-color: #84715c;
                color: #fff;
                font-size: 20px;
                font-weight: bold;
                margin-right: 10px;
            }

            .cancle-btn {
                display: block;
            }
        }
    }
}

.p_error {
    color: #fc0505;
    width: 100%;
    font-size: 16px;
}
</style>
  