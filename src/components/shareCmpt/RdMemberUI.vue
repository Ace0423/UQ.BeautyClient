<template>
    <div class="popup-rdmember" v-on:click.self="showUIFn(false)">
        <div class="popup-content">
            <div class="header-content">
                <span>顧客</span>
                <img :src="icon_closeX" v-on:click="showUIFn(false)" />
            </div>
            <div class="main-content">
                <input placeholder="搜尋" v-model="formInputRef.search" />
                <div class="group-content">
                    <div v-for="item in filterMemberData" :key="item">
                        <label class="label-item" :value="item">
                            <input class="input-item" type="radio" :key="item" :value="item" :id="'RdMemberUI_' + item"
                                v-model="formInputRef.memberItem" @click="clickItem(item, item.memberId)" />
                            <!-- <label :for="'RdMemberUI_' + item.memberId"></label> -->
                            <div class="info-input">
                                <img :src="icon_customer" />
                                <div>
                                    <span value="{{item}}" name="{{item.nameView}}">{{
                                        item.nameView
                                    }}</span>
                                    <span class="phone-item">{{ item.phone }}</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="bottom-content">
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import icon_closeX from "@/assets/images/icon_closeX.png";
import icon_customer from "@/assets/Icon-guest.png";

let store = useApptStore();
let { memberList } = storeToRefs(store);
let { getMemberListApi } = store;

const props = defineProps<{
    showUIFn: Function;
    getDataFn: Function;
    selData: any;
}>();
let formInputRef: any = ref({
    name: "",
    search: "",
    memberItem: null,
    serviceSub: null,
});

onBeforeFn();
function onBeforeFn() {
    getMemberListApi();
}
onMounted(() => {
    // console.log('onMounted');
});
if (props.selData) {
    formInputRef.value.courses = props.selData;
}
let filterMemberData: any = computed(() =>
    memberList.value.filter(getMemberFn)
);
function getMemberFn(data: any) {
    return (
        !data.userLock &&
        (!formInputRef.value.search ||
            data.nameView
                .toLowerCase()
                .includes(formInputRef.value.search.toLowerCase()))
    );
}

function clickItem(item: any, id: number) {
    formInputRef.value.memberItem = item;
    props.getDataFn(item)
}

</script>
  
<style scoped lang="scss">
.popup-rdmember {
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
            height: calc(100% - 40px - 65px);
            width: 90%;
            margin-left: 5%;

            >input {
                box-sizing: border-box;
                width: 100%;
                height: 45px;

                border-radius: 6px;
                border: solid 1px #707070;
                box-sizing: border-box;
                margin-top: 10px;
                background: #fff url("@/assets/images/icon_search.png") no-repeat;
                background-position: 97%;
                background-origin: content-box;
                text-indent: 5px;
            }

            >input::placeholder {
                position: relative;
                left: 0px;
                top: 1px;
            }

            .group-content {
                height: calc(100% - 35px);
                box-sizing: border-box;
                overflow-y: auto;

                >div {
                    .label-group {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        margin-left: 5px;

                        input {
                            display: none;
                        }

                        label {
                            display: inline-block;
                            width: 17px;
                            height: 17px;
                            border-radius: 5px;
                            border: 1px solid #8b6f6d;
                            position: relative;
                            cursor: pointer;
                        }

                        label::before {
                            display: inline-block;
                            content: " ";
                            width: 10px;
                            border: 2px solid #fff;
                            height: 4px;
                            border-top: none;
                            border-right: none;
                            transform: rotate(-45deg);
                            top: 4px;
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
                            font-size: 17px;
                        }
                    }

                    .label-item {
                        display: flex;
                        align-items: center;
                        width: calc(100% - 15px - 15px);
                        margin-left: 15px;
                        border-bottom: solid 1px #8b6f6d;
                        box-sizing: border-box;
                        padding: 5px;

                        input {
                            display: none;
                        }

                        >label {
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            border-radius: 5px;
                            border: 1px solid #8b6f6d;
                            position: relative;
                            cursor: pointer;
                        }

                        >label::before {
                            display: inline-block;
                            content: " ";
                            width: 12px;
                            border: 2px solid #fff;
                            height: 4px;
                            border-top: none;
                            border-right: none;
                            transform: rotate(-45deg);
                            top: 5px;
                            left: 3px;
                            position: absolute;
                            opacity: 0;
                        }

                        >input:checked+label {
                            background: #8b6f6d;
                        }

                        >input:checked+label::before {
                            opacity: 1;
                            transform: all 0.5s;
                        }

                        >span {
                            margin-left: 10px;
                        }

                        >div {
                            display: grid;
                            margin-left: 10px;

                            .pCode-msg {
                                font-size: 15px;
                            }
                        }

                        .info-input {
                            flex: 1;
                            box-sizing: border-box;
                            display: flex;
                            align-items: center;

                            >img {
                                width: 40px;
                                height: 40px;
                            }

                            >div {
                                display: grid;
                                margin-left: 3%;

                                >span {
                                    display: flex;
                                    font-size: 22px;
                                    align-items: center;
                                }

                                .phone-item {
                                    font-size: 18px;
                                }
                            }
                        }

                        .price-input {
                            width: 50px;
                        }
                    }
                }
            }
        }

        .bottom-content {
            display: flex;
            align-items: end;
            justify-content: center;

            // height: calc(65px);
            // width: 100px;
            >button {
                position: relative;
                width: 100px;
                height: 45px;
                margin: 10px;
                border-radius: 10px;
                font-size: 20px;
                font-weight: bold;
                color: #717171;
                background-color: #fff;
            }

            .submit-btn {
                display: block;
                width: 100px;
            }

            .cancle-btn {
                display: block;
                width: 100px;
            }
        }
    }
}
</style>
  