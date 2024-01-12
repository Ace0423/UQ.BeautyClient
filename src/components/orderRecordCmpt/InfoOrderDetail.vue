<template>
    <div class="popup-InfoOrderDetail" v-on:click.self="showUIHdr(false)">
        <div>
            <div class="info-head">
                <div class="info-img">
                    <img :src="closeIcon" v-on:click="showUIHdr(false)" />
                </div>
                <div class="link-bottom"></div>
            </div>
            <div class="content">
                <div class="info-content">
                    <div name="狀態" class="info-pay">
                        <span>{{ " $ " + formInputRef.orderInfo.coAmount }}</span>
                        <div>
                            <span class="info-state">{{ "完成結帳" }}</span>
                            <span v-if="formInputRef.orderInfo.coCheckTime">
                                {{ formInputRef.orderInfo.coCheckTime.split("T")[0] }}
                                {{ formInputRef.orderInfo.coCheckTime.split("T")[1].split(":")[0] + " : " }}
                                {{ formInputRef.orderInfo.coCheckTime.split("T")[1].split(":")[1] }}
                            </span>
                        </div>
                    </div>
                    <div class="link-bottom"></div>
                    <div name="編號" class="info-coNo">
                        <span>{{ "訂單編號 : " + formInputRef.orderInfo.coNo }}</span>
                        <span>{{ "結帳人員 : " + formInputRef.orderInfo.editUser }}</span>
                    </div>
                    <div class="link-bottom"></div>
                    <div name="會員" class="info-user">
                        <div v-if="formInputRef.orderInfo.userInfo" class="info-guest">
                            <img class="guest-img" :src="Icon" />
                            <div>
                                <span>{{ formInputRef.orderInfo.userInfo.nameView }}</span>
                                <span>{{ formInputRef.orderInfo.userInfo.phone }}</span>
                            </div>
                        </div>
                        <div class="info-count">
                            <div class="info-box">
                                <span>人數{{ formInputRef.orderInfo.coCustomerCount }}位</span>
                            </div>
                        </div>
                    </div>
                    <div class="link-bottom"></div>
                    <div name="購買列表" class="info-itemList">
                        <div name="整合項目">
                            <div class="info-list">
                                <div class="content-box" v-for="(bItem, index) in formInputRef.orderInfo.detailList"
                                    :key="bItem">
                                    <div name="服務Item" v-if="bItem.itemType == 1" class="info-service">
                                        <div class="info-img"></div>
                                        <div class="info-name">
                                            <span class="fontBlack">{{ bItem.name }}</span>
                                            <span>
                                                <span v-if="bItem.managerInfo"> {{ bItem.managerInfo.nameView + " , "
                                                }}</span>
                                                <span v-if="bItem.subInfo">
                                                    {{ bItem.subInfo.servicesTime + "分" }}
                                                    {{ " ," + bItem.subInfo.name }}
                                                </span>
                                                <span v-else>
                                                    {{ bItem.servicesTime + "分" }}
                                                </span>
                                            </span>
                                        </div>
                                        <div class="info-price"><span v-if="bItem.subItem">{{ "$" +
                                            bItem.subItem.price
                                        }}</span>
                                            <span v-else>{{ "$" + bItem.salesPrice }}</span>
                                        </div>
                                    </div>
                                    <div name="商品Item" v-if="bItem.itemType == 2" class="info-service">
                                        <div class="info-img"></div>
                                        <div class="info-name">
                                            <span class="fontBlack">{{ bItem.name }}</span>
                                            <span>
                                                <span v-if="bItem.managerInfo"> {{ bItem.managerInfo.nameView + " , "
                                                }}</span>
                                                {{
                                                    bItem.quantity +
                                                    "個" + "," +
                                                    bItem.nickName

                                                }}
                                            </span>
                                        </div>
                                        <div class="info-price">
                                            <span>{{ "$" + bItem.salesPrice }}</span>
                                            <span class="fontBlack">{{ "x" + bItem.quantity }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="link-bottom"></div>
                    <div name="折扣" class="info-sale">
                        <div>
                            <span v-if="formInputRef.orderInfo.detailList">{{ "銷售總計(共" +
                                formInputRef.orderInfo.detailList.length
                                + "項)" }}</span>
                            <span>{{ "$" + formInputRef.orderInfo.coTotalPrice }}</span>
                        </div>
                        <div v-for="(dItem, index) in formInputRef.orderInfo.coAllDCList">
                            <span>{{ dItem.title }}</span>
                            <span v-if="dItem.dType == 1">
                                {{ "($ - " + (formInputRef.orderInfo.coTotalPrice * dItem.discount) + " ) " }}</span>
                            <span v-if="dItem.dType == 2">
                                {{ "($ - " + dItem.discount + " ) " }}</span>
                        </div>
                    </div>
                    <div class="link-bottom"></div>
                    <div name="總計" class="info-amount">
                        <div>
                            <span>{{ " 總計 (" + formInputRef.orderInfo.coCheckTypeName + ")" }}</span>
                            <span>{{ " $ " + formInputRef.orderInfo.coAmount }}</span>
                        </div>
                    </div>
                    <div class="link-bottom"></div>
                    <div name="備註" class="info-memo" v-if="formInputRef.orderInfo.coMemo">
                        <div>
                            <span>{{ " 備註: " + formInputRef.orderInfo.coMemo }}</span>
                        </div>
                    </div>
                    <div class="link-bottom" v-if="formInputRef.orderInfo.coMemo"></div>
                </div>
            </div>
            <div class="footer">
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import closeIcon from "@/assets/Group32.svg";
import Icon from "@/assets/Icon zocial-guest.svg";
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import { useManagerStore } from "@/stores/manager";

let store = useApptStore();
let { orderInfoRef } = storeToRefs(store);
let { getOrderInfoApi, } = store;

const props = defineProps<{
    selItemData: any;
    showUIHdr: Function;
}>();
let formInputRef: any = ref({
    orderInfo: {},
});

onBefore();
function onBefore() {
    getOrderInfoApi(props.selItemData.coNo).then(() => {
        console.log("orderInfoRef", orderInfoRef.value);
        formInputRef.value.orderInfo = orderInfoRef.value
    })
}
onMounted(() => {
});

watchEffect(() => {

});
</script>
  
<style scoped lang="scss">
.popup-InfoOrderDetail {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1002;
    background: rgba(137, 137, 137, 0.5);

    display: flex;
    align-items: center;
    justify-content: end;

    >div {
        height: 100%;
        width: 40%;
        border-radius: 10px 0 0 10px;
        border: solid 1px #707070;
        background-color: #faf9f8;
        box-sizing: border-box;

        .info-head {
            height: 46px;

            .info-img {
                height: calc(100% - 2px);

                >img {
                    position: relative;
                    height: 60%;
                    top: 20%;
                    left: 10px;
                }
            }
        }

        .bitmap-img {
            position: relative;
            left: 220px;
        }

        >img {
            cursor: pointer;
            //margin: 10px 20px;
        }

        .content {
            overflow-y: auto;
            height: calc(100% - 46px);

            .info-content {
                text-align: center;
                height: 100%;
                width: calc(100% - 6%);
                position: relative;
                left: 3%;

                .info-pay {
                    margin: 10px 0;
                    display: flex;
                    width: 100%;
                    justify-content: center;
                    height: 50px;

                    >span {
                        display: flex;
                        justify-content: left;
                        align-items: center;
                        width: 55%;
                        height: 100%;
                        font-family: STXihei;
                        font-size: 35px;
                        color: #000000;
                        font-weight: bold;
                    }

                    >div {
                        // display: block;
                        height: 100%;
                        width: 45%;
                        padding-left: 10px;

                        >span {
                            height: 50%;
                            width: 100%;
                            justify-content: right;
                            align-items: center;
                            display: flex;
                            font-family: STXihei;
                            font-size: 16px;
                            color: #717171;
                            font-weight: bold;
                        }

                        .info-state {
                            color: #000000;
                        }
                    }
                }

                .info-coNo {
                    margin: 10px 0;
                    display: grid;
                    width: 100%;
                    height: 50px;
                    justify-content: left;

                    >span {
                        display: flex;
                        justify-content: left;
                    }
                }

                .info-user {
                    margin: 10px 0;
                    display: block;
                    width: 100%;

                    .info-guest {
                        margin: 10px 5px;
                        display: flex;
                        justify-content: left;
                        width: 100%;
                        height: 60px;

                        .guest-img {
                            position: relative;
                            width: 15%;
                        }

                        >div {
                            height: 100%;
                            width: calc(100% - 15%);
                            padding-left: 10px;

                            >span {
                                display: flex;
                                justify-content: left;
                                align-items: center;
                                height: 50%;
                                width: 100%;
                                font-family: STXihei;
                                font-size: 20px;
                                color: #717171;
                                font-weight: bold;
                            }
                        }
                    }

                    .info-count {
                        display: flex;
                        height: 60px;
                        width: 100%;

                        .info-box {
                            align-items: center;
                            justify-content: center;
                            display: flex;
                            height: 90%;
                            width: 100%;
                            background-color: #e6e2de;
                            border-radius: 10px;
                            color: #717171;
                            font-weight: bold;

                            span {
                                font-size: 18px;
                            }
                        }
                    }
                }


                .info-itemList {
                    margin: 10px 0;
                    width: 98%;
                    margin-left: 1%;

                    >div {
                        width: 100%;
                        justify-content: center;

                        .info-list {
                            height: 40%;

                            .content-box {
                                max-height: 300px;
                                display: block;
                                margin-top: 10px;

                                P {
                                    text-align: left;
                                    font-weight: bold;
                                    color: #717171;
                                    font-size: 20px;
                                }

                                >div {
                                    border: solid 1px #707070;
                                    background-color: #e6e2de;
                                    border-radius: 10px;

                                    P {
                                        //margin: 0 0 5px 0;
                                    }
                                }

                                .info-service {
                                    display: flex;
                                    width: 100%;
                                    height: 80px;
                                    align-items: center;

                                    .head-shot {
                                        position: relative;
                                        width: 15%;
                                    }

                                    >div {
                                        height: 80%;
                                        // padding-left: 30px;
                                        display: grid;
                                        align-items: center;

                                        >span {
                                            // height: 50%;
                                            justify-content: left;
                                            display: flex;
                                            font-family: STXihei;
                                            font-size: 16px;
                                            color: #717171;
                                            font-weight: bold;
                                        }
                                    }

                                    .info-img {
                                        width: 30px;
                                    }

                                    .info-name {
                                        flex: auto;
                                    }

                                    .fontBlack {
                                        color: #000000;
                                    }

                                    .info-price {
                                        width: 60px;
                                        margin-right: 10px;

                                        >span {
                                            width: 100%;
                                            display: flex;
                                            justify-content: right;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .link-btn {
                        color: #b89087;
                    }

                }

                .info-sale {
                    margin: 10px 0;

                    >div {
                        display: flex;
                        justify-content: space-between;
                        margin: 10px 0;

                        >span {
                            display: flex;
                            justify-content: left;
                            font-family: STXihei;
                            color: #717171;
                            font-weight: bold;
                            font-size: 20px;
                        }
                    }
                }

                .info-amount {
                    margin: 10px 0;

                    >div {
                        display: flex;
                        justify-content: space-between;
                        margin: 20px 0;

                        >span {
                            display: flex;
                            justify-content: left;
                            font-family: STXihei;
                            color: #000000;
                            font-weight: bold;
                            font-size: 20px;
                        }
                    }
                }
                .info-memo {
                    margin: 10px 0;

                    >div {
                        display: flex;
                        justify-content: space-between;
                        margin: 10px 0;

                        >span {
                            display: flex;
                            justify-content: left;
                            font-family: STXihei;
                            color: #717171;
                            font-weight: bold;
                            font-size: 20px;
                        }
                    }
                }
            }
        }

        .footer {
            height: 0%;

        }
    }

    .link-bottom {
        margin: 1px 0;
        opacity: 0.5;
        width: 100%;
        height: 2px;
        background-color: #707070;
    }
}
</style>
  