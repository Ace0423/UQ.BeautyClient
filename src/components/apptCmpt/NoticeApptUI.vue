<template>
    <div class="popup-NoticeApptUI" v-on:click.self="showUIHdr(false)">
        <div>
            <div class="info-head">
                <div class="info-img">
                    <img :src="icon_closeX" v-on:click="showUIHdr(false)" />
                    <img v-if="simpleView" />
                </div>
                <span class="info-title">通知中心</span>
            </div>
            <div class="content">
                <div class="main-box" v-for="(nItem, index) in noticeListCpt" :key="nItem">
                    <div class="read-ico">
                        <img :src="blue_cicle" v-if="!nItem.isRead" />
                    </div>
                    <div class="main-content" @click="updateNoticeListFn(nItem)">
                        <div class="name-content">
                            <span>{{ nItem.detailInfo.content_Name }}</span>
                            <span class="type">{{ " " + nItem.detailInfo.content_Type + "，" }}</span>
                            <span>{{ nItem.detailInfo.content.replaceAll("-", '/') }}</span>
                        </div>
                        <div class="time-content">
                            <span>{{ nItem.createDate.split("T")[0].replaceAll("-", '/') }}</span>
                            <span>{{ " " + nItem.createDate.split("T")[1].split(":")[0] }}</span>
                            <span>{{ ":" + nItem.createDate.split("T")[1].split(":")[1] }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="link-bottom"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import closeIcon from "@/assets/Group32.svg";
import icon_closeX from "@/assets/images/icon_closeX.png";
import blue_cicle from "@/assets/images/blue_cicle.png";
import { storeToRefs } from "pinia";
import { useApptStore } from "@/stores/apptStore";
import { useManagerStore } from "@/stores/manager";
import Alert from "../alertCmpt";


let store = useApptStore();
let { noticeListRef } =
    storeToRefs(store);
let {
    getNoticeListApi,
    updateNoticeIsReadApi,
} = store;
const simpleView = ref(true);
let showCheckOutRef = ref(false);

const props = defineProps<{
    // selItemData: any;
    showUIHdr: Function;
}>();

let formInputRef: any = ref({
    bookingList: [],
});


onBeforeFn();
function onBeforeFn() {
    getNoticeListApi().then((res) => {
        console.log(res);
    });
}
onMounted(() => {

});

let noticeListCpt: any = computed(() =>
    noticeListRef.value.filter(getDataFn)
);

function getDataFn(data: any) {
    return data
}
//新增分類-顯示
let showCheckOutUIHdr = (state: boolean) => {
    showCheckOutRef.value = state;

};
function updateNoticeListFn(data: any) {
    if (data.isRead == 0) {
        data.isRead = 1;
        updateNoticeIsReadApi(data).then((res) => {
            console.log(res);
        });
    }
}
</script>
  
<style scoped lang="scss">
.popup-NoticeApptUI {
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
        width: 35%;
        border-radius: 10px 0 0 10px;
        border: solid 1px #707070;
        background-color: #faf9f8;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        .info-head {
            display: flex;
            height: 7%;
            width: calc(100%);
            border-bottom: solid 2px #707070;
            box-sizing: border-box;

            .info-img {
                height: calc(100% - 2px);
                width: 51px;

                >img {
                    position: relative;
                    height: 60%;
                    top: 20%;
                    left: 10px;
                }
            }

            .info-title {
                display: flex;
                justify-content: center;
                align-items: center;
                width: calc(100% - 51px - 51px);
                font-family: HeitiTC;
                color: #84715c;
                font-weight: bold;
                font-size: 26px;
            }

        }

        >img {
            cursor: pointer;
        }

        >.content {
            height: calc(100% - 7%);
            width: calc(100% - 20px);
            overflow-y: auto;
            margin-left: 10px;

            .main-box {
                display: flex;
                width: 100%;
                height: auto;
                border-bottom: solid 1px #ddd;
                box-sizing: border-box;

                .read-ico {
                    width: 30px;

                    >img {
                        margin-top: 10px;
                    }
                }

                .main-content {
                    display: grid;

                    >div {
                        >span {
                            font-size: 18px;
                            font-weight: bold;
                        }

                        .type {
                            color: #7a7a7a;
                        }
                    }
                }

            }

        }

        .footer {
            height: 0%;

            .content-checkoutbtn {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                button {
                    width: 84%;
                    height: 55px;
                    border-radius: 10px;
                    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
                    border: solid 1px #707070;
                    //margin: 5px;
                    font-weight: bold;
                    color: #906e6c;
                    background-color: #ffffff;
                    border: solid 1px #707070;
                    font-size: 18px;
                }
            }

        }
    }

    .link-bottom {
        opacity: 0.5;
        width: 100%;
        height: 2px;
        background-color: #707070;
    }
}
</style>
  