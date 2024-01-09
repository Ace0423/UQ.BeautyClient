
<script setup lang="ts">
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { getCompany } from "@/plugins/js-cookie";
import { useManagerStore } from "@/stores/manager";

const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const managerstore = useManagerStore();
const { getLineOAList, editLineOAList } = useManagerStore();
const { LineOAList } = storeToRefs(managerstore);
const OAData: any = reactive({ data: [] });

const LineOAListData = computed(() => {
    OAData.data = JSON.parse(JSON.stringify(LineOAList.value.data));
    return OAData.data;
})
onMounted(() => {
    let allManager = {
        cid: getCompany("userData"),
        pageindex: 0,
        count: 0,
    };

    getLineOAList(allManager)
        .then((res) => {
            if (res.state == 2) {
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
        });
})

const handReturn = (() => {
    OAData.data = JSON.parse(JSON.stringify(LineOAList.value.data));
})
const handSubmit = (() => {
    editLineOAList(OAData.data)
        .then((res) => {
            if (res.state == 1) {
                Alert.warning('修改成功', 2000);
            } else {
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
})
</script>
<template>
    <div class="info-content">
        <div class="content">
            <h1>LINE OA 串接欄位回填</h1>
            <div class="input-content">
                <p>*Bot basic ID</p>
                <input placeholder="請輸入Bot basic ID" v-model="LineOAListData.loBotBasicId" />
            </div>
            <div class="input-content">
                <p>*Messaging API Channel Access ID</p>
                <input placeholder="請輸入 Messaging API Channel Access ID" v-model="LineOAListData.loMsgApiChannelAccessId" />
            </div>
            <div class="input-content">
                <p>*Messaging API Channel Access Secret</p>
                <input placeholder="請輸入 Messaging API Channel Access Secret"
                    v-model="LineOAListData.loMsgApiChannelAccessSecret" />
            </div>
            <div class="input-content">
                <p>*Messaging API Channel Access Token</p>
                <input placeholder="請輸入 Messaging API Channel Access Token"
                    v-model="LineOAListData.loMsgApiChannelAccessToken" />
            </div>
            <div class="input-content">
                <p>*Login Channel ID</p>
                <input placeholder="請輸入 Login Channel ID" v-model="LineOAListData.loLoginChannelId" />
            </div>
            <div class="input-content">
                <p>*Login Channel Secret</p>
                <input placeholder="請輸入 Login Channel Secret" v-model="LineOAListData.loLoginChannelSecret" />
            </div>
            <div class="input-content">
                <p>*LIFF ID</p>
                <input placeholder="請輸入 LIFF ID" v-model="LineOAListData.loLiffId" />
            </div>
        </div>
        <div class="submitBtn">
            <button @click="handReturn()">取消變更</button>
            <button @click="handSubmit()">確認儲存</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    font-size: 24px;
}

td {
    border: solid 0.5px #ddd;
}

.info-content {
    position: absolute;
    top: 45px;
    bottom: 10px;
    left: 0px;
    right: 0px;
    width: 100%;
    background-color: #faf9f8;
    border: solid 0.5px #ddd;
    font-family: STXihei;
    color: #717171;
    display: flex;

    >.content {
        width: 100%;
        position: absolute;
        top: 0px;
        bottom: 65px;
        overflow: auto;

        >h1 {
            margin: 20px 30px;
            font-size: 35px;
        }

        >.input-content {
            margin: 20px 30px;
            font-size: 25px;

            >p {
                margin: 10px 0;
            }

            >input {
                width: 100%;
                height: 60px;
                border-radius: 6px;
                border: solid 1px #707070;
                background-color: #fff;
                margin-bottom: 10px;
                text-align: left;
            }
        }
    }
}

.submitBtn {
    position: absolute;
    right: 0px;
    bottom: 0px;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    border-top: solid 0.5px #ddd;
    // font-size: 20px;

    >button {
        border-radius: 6px;
        padding: 5px 15px;
        margin: 0px 10px;
        height: 75%;
        border: transparent;
        background-color: #e6e2de;
        color: #717171;

    }
}
</style>