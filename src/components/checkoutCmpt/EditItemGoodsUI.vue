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
                    <!-- <div>
                        <span>折扣</span>
                        <input v-model="formInputRef.discount" placeholder="請選擇折扣" type="text" @click="showCORdDcFn(true)"
                            readonly />
                    </div> -->
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

    <CORdDiscountUI v-if="showCORdDcUIRef" :selData="formInputRef.discountInfo" :getDataFn="getRdDcFn"
        :showRdDFn="showCORdDcFn" />
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
let showCORdDcUIRef = ref(false);

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
});

onBeforeFn();
function onBeforeFn() {
    // console.log('onBeforeFn', props.selData);
    formInputRef.value.name = props.selData.name;
    formInputRef.value.quantity = props.selData.quantity;

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
    console.log(data, "獲取getRadioSListFn");
    showManagerUIFn(false);
    formInputRef.value.managerInfo = data;
}
function showCORdDcFn(state: boolean) {
    showCORdDcUIRef.value = state;
}
function getRdDcFn(data: any) {
    console.log("getRdDiscountFn", data);
    formInputRef.value.discountInfo = data;
    showCORdDcFn(false);
}
function submitBtn() {
    if (formInputRef.value.managerInfo.nameView != "")
        props.selData.managerInfo = formInputRef.value.managerInfo;
    props.selData.sgDiscount = formInputRef.value.sgDiscount;
    props.selData.quantity = formInputRef.value.quantity;


    props.getDataFn(props.selData)
    console.log("提交");
}
function delBtn() {
    props.delDataFn(props.selData)
}
function countTotalBtn(data: number) {
    if (!formInputRef.value.quantity) formInputRef.value.quantity = 0;
    formInputRef.value.quantity += data;
    if (formInputRef.value.quantity < 0) formInputRef.value.quantity = 0;
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
                    }

                    ::placeholder {
                        color: #c1bdb8;
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
  