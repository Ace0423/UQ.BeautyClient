<template>
    <div class="popup-editItemGoodsUI" v-on:click.self="showUIFn(false)">
        <div class="popup-content">
            <div class="header-content">
                <span>調整 {{ formInputRef.name }}</span>
                <img :src="icon_closeX" @click="showUIFn(false)">
            </div>
            <div class="main-content">
                <div class="input-form" name="商品">
                    <div class="input-quantity">
                        <span>數量</span>
                        <div>
                            <img :src="icon_minus" @click="countTotalBtn(-1)" />
                            <input type="text" v-model="formInputRef.quantity"
                                onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">
                            <img :src="icon_plus" @click="countTotalBtn(+1)" />
                        </div>
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
                    <div class="checked-div">
                        <div class="checked_state">
                            <input class="checked_status" type="checkbox" name="sub" value="" :id="'isPickUp'"
                                :checked="formInputRef.isPickUp" v-model="formInputRef.isPickUp" />
                            <label :for="'isPickUp'"></label>
                            <!-- <label >已取貨</label> -->
                            <span>已取貨</span>
                        </div>
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

    <RdSgDiscountUI v-if="showRdSgDcUIRef" :itemData="selData" :selData="formInputRef.sglDiscountList"
        :getDataFn="getRdDcFn" :showRdDFn="showRdSgDcFn" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePriceStore } from "@/stores/priceStore";
import search_ico from "@/assets/images/icon_search.png";
import icon_closeX from "@/assets/images/icon_closeX.png";
import { checkVerify_all, serviceTimer } from "@/utils/utils";
import icon_plus from "@/assets/images/icon_plus.png";
import icon_minus from "@/assets/images/icon_minus.png";

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
    managerInfo: { nameView: "" },
    quantity: 0,
    sglDiscountList: [],
    isPickUp: true,
});

onBeforeFn();
function onBeforeFn() {
    console.log(props.selData);

    formInputRef.value.name = props.selData.name;
    formInputRef.value.quantity = props.selData.quantity;
    formInputRef.value.sglDiscountList = props.selData.sglDiscountList ? props.selData.sglDiscountList : [];
    if (props.selData.managerInfo)
        formInputRef.value.managerInfo = props.selData.managerInfo;
    if (props.selData.isPickUp == false)
        formInputRef.value.isPickUp = props.selData.isPickUp;

    // formInputRef.value.sglDiscountList = props.selData.curSgDiscountList;
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
        let curSgDiscountList = [];
        for (let i = 0; i < formInputRef.value.sglDiscountList.length; i++) {
            const element = formInputRef.value.sglDiscountList[i];
            if (element.dType != data.dType) {
                curSgDiscountList.push(element)
            }
        }
        curSgDiscountList.push(data);
        formInputRef.value.sglDiscountList = curSgDiscountList;
    }
    showRdSgDcFn(false);
}
function submitBtn() {
    console.log(formInputRef.value);

    if (formInputRef.value.managerInfo.nameView != "")
        props.selData.managerInfo = formInputRef.value.managerInfo;

    props.selData.sglDiscountList = formInputRef.value.sglDiscountList;
    props.selData.quantity = formInputRef.value.quantity;
    props.selData.isPickUp = formInputRef.value.isPickUp;
    props.getDataFn(props.selData)
}
function delBtn() {
    props.delDataFn(props.selData)
}
function countTotalBtn(data: number) {
    if (!formInputRef.value.quantity) formInputRef.value.quantity = 0;
    formInputRef.value.quantity += data;
    if (formInputRef.value.quantity < 0) formInputRef.value.quantity = 0;
}

//改變課程狀態
let changeStutusHdr = (state: any) => {
    formInputRef.value.isPickUp = state
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
.popup-editItemGoodsUI {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1003;
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


            .input-form {
                display: grid;
                width: 100%;
                // margin-left: 5%;
                padding: 2% 2%;

                >div {
                    display: flex;
                    height: 80px;
                    width: 100%;
                    border: solid 0.5px #ddd;
                    box-sizing: border-box;

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
                        overflow-x: auto;
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

                input:disabled {
                    background-color: #e8e8e8;
                }

                .input-quantity {
                    display: flex;
                    width: 100%;


                    >div {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: calc(100% - 180px);

                        >input {
                            display: flex;
                            border: solid 0px #ddd;
                            height: 90%;
                            width: 100%;
                            text-align: center;
                            font-size: 32px;
                        }

                        >img {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 30px;
                            width: 30px;
                        }
                    }
                }

                .checked-div {
                    border: 0px solid #8b6f6d;

                    .checked_state {
                        margin-left: 10px;

                        input {
                            display: none;
                        }

                        label {
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            border-radius: 5px;
                            border: 1px solid #8b6f6d;
                            box-sizing: border-box;
                            position: relative;
                            cursor: pointer;
                        }

                        label::before {
                            display: inline-block;
                            content: " ";
                            width: 12px;
                            border: 2px solid #fff;
                            box-sizing: border-box;
                            height: 4px;
                            border-top: none;
                            border-right: none;
                            transform: rotate(-45deg);
                            top: 5px;
                            left: 3px;
                            position: absolute;
                            opacity: 0;
                        }

                        input:checked+label {
                            background: #8b6f6d;
                        }

                        input:checked+label::before {
                            opacity: 1;
                            transform: all 0.5s;
                        }

                        >span {
                            margin-left: 10px;
                        }
                    }
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