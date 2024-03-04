<template>
    <div class="popup-mask" v-on:click.self="showAddSubUIFn(false)">
        <div class="popup-content">
            <div class="header-content">
                <span>新增子項目</span>
                <img :src="icon_closeX" @click="showAddSubUIFn(false)">
            </div>
            <div class="main-content">
                <div class="input-item" name="項目類型">
                    <div>
                        <span>*項目名稱</span>
                        <input v-model="formInputRef.name" placeholder="請輸入服務名稱" type="text" />
                    </div>
                    <span class="p_error" v-if="ruleLists.ruleItem.name.is_error">
                        {{ ruleLists.ruleItem.name.warn }}
                    </span>
                    <div>
                        <span>*服務時長</span>
                        <div class="select-content">
                            <el-select :popper-append-to-body="false" popper-class="select"
                                v-model="formInputRef.servicesTime" placeholder="請選擇服務時數" @change="changeValue()">
                                <el-option v-for="(item, index) in serviceTimer" :key="index" :label="item" :value="item">
                                    {{ item }}
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <span class="p_error">
                        {{ ruleLists.ruleItem.servicesTime.warn }}
                    </span>
                    <div>
                        <span>*價格</span>
                        <input v-model="formInputRef.price" placeholder="請輸入價格" type="text" />
                    </div>
                    <span class="p_error">
                        {{ ruleLists.ruleItem.price.warn }}
                    </span>
                </div>
            </div>
            <div class="footer-content">
                <button class="submit-btn" @click="submitBtn()">儲存確認</button>
                <!-- <button class="cancle-btn" @click="showAddSubUIFn(false)">取消</button> -->
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePriceStore } from "@/stores/priceStore";
import search_ico from "@/assets/images/icon_search.png";
import icon_closeX from "@/assets/images/icon_closeX.png";
import { checkVerify_all, serviceTimer } from "@/utils/utils";

let store = usePriceStore();
let { allDiscountList } = storeToRefs(store);
let { getAllDiscountApi } = store;

const props = defineProps<{
    // showUIFn: Function;
    //   formInfo: any;
    //   addDetailTypeID?: any;
    showAddSubUIFn: Function;
    getSubDetailFn: Function;
}>();
let formInputRef: any = ref({
    name: "",
    servicesTime: 0,
    price: 0,
});

onBeforeFn();
function onBeforeFn() {
    // console.log('onBeforeFn');
}
onMounted(() => {
    // console.log('onMounted');
});
function changeValue() {

}

function submitBtn() {
    ruleLists.ruleItem.name.value = formInputRef.value.name;
    ruleLists.ruleItem.price.value = formInputRef.value.price;
    ruleLists.ruleItem.servicesTime.value = formInputRef.value.servicesTime;

    if (!checkVerify_all(ruleLists)) return;

    let subData = {
        name: formInputRef.value.name,
        servicesTime: formInputRef.value.servicesTime,
        price: formInputRef.value.price
    }
    props.getSubDetailFn(subData)
    console.log("提交");
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
.popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 3;
    background: rgba(65, 65, 65, 0.719);

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
                        height: 100%;

                        :deep(.el-select__wrapper) {
                            height: 100%;
                            font-size: 24px;
                            border: none;
                            box-shadow: none;
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

            }
        }

        .footer-content {
            display: flex;
            height: 70px;
            border-top: solid 1px #ddd;
            justify-content: right;
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
  