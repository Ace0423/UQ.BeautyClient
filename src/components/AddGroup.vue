<script setup lang="ts">
import { useCounterStore } from "@/stores/member";
import { showErrorMsg, showApiStatus } from "@/types/IMessage";

const store = useCounterStore();
const { createGroupData, editGroupData } = store;
const alertState = ref(false);
const alertInformation = reactive({
    messageText: '', // 提示內容
    buttonState: 0,  //按鈕顯示狀態 0:全部 1:只顯示確定按鈕 2:不顯示按鈕 
    timerVal: 0      //時間計時器
})
const title = ref('新增標籤');
const newGroup = reactive({
    groupId: 0,
    label: '',
    memo: '',
});

const props = defineProps<{
    selectGroupItem: any
    handAddGroupView: Function,
}>()

const handAlertView = (msg: string, btnState: number, timer: number) => {
    alertInformation.messageText = msg;
    alertInformation.buttonState = btnState;
    alertInformation.timerVal = timer;
    alertState.value = !alertState.value;
}
const handSubmit = () => {
    if (props.selectGroupItem) {
        editGroupData(newGroup).then((res) => {
            if (res.state == 1) {
                handAlertView("修改成功", 2, 1);
                setTimeout(() => {
                    props.handAddGroupView();
                }, 1000)
            } else {
                handAlertView(showErrorMsg(res.msg), 2, 1);
            }
        })
        .catch((e: any) => {
        handAlertView(showApiStatus(e.response.status), 2, 1);
      });
    } else {
        createGroupData(newGroup).then((res) => {
            if (res.state == 1) {
                handAlertView("新增成功", 2, 1);
                setTimeout(() => {
                    props.handAddGroupView();
                }, 1000)
            }else{
                handAlertView(showErrorMsg(res.msg), 2, 1);
            }
        })
        .catch((e: any) => {
        handAlertView(showApiStatus(e.response.status), 2, 1);
      });
    }
}

onMounted(() => {
    if (props.selectGroupItem) {
        title.value = '修改標籤';
        newGroup.groupId = props.selectGroupItem.groupId;
        newGroup.label = props.selectGroupItem.label;
        newGroup.memo = props.selectGroupItem.memo;
    }
})
</script>

<template>
    <div class="popup-mask" v-on:click.self="handAddGroupView()">
        <div class="popup-content">
            <h1>{{ title }}</h1>
            <div class="group-inputbox">
                <p>標籤</p>
                <input v-model="newGroup.label" />
            </div>
            <div class="group-textareabox">
                <p>備註</p>
                <textarea v-model="newGroup.memo"></textarea>
            </div>
            <div class="submi-btn">
                <button type="submit" v-on:click="handSubmit()">確認</button>
            </div>
        </div>
    </div>
    <Alert v-if="alertState" :alert-information="alertInformation" :hand-alert-view="handAlertView"></Alert>
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
        // max-width: 250px;
        text-align: center;
        background-color: #e6e2de;
        padding: 25px 50px;
        font-size: 20px;
        font-family: HeitiTC;
        color: #84715c;
        font-weight: bold;

        >h1 {
            font-size: 20px;
        }

        >.group-inputbox {
            width: 100%;
            display: flex;
            flex-grow: 1;
            align-items: center;

            >p {
                min-width: 40px;
            }

            >input {
                padding-left: 15px;
                height: 30px;
                margin: 0 5px;
                border-radius: 6px;
                border: solid 1px #707070;
            }
        }

        >.group-textareabox {
            width: 100%;
            display: flex;
            align-items: center;

            >p {
                min-width: 40px;
            }

            >textarea {
                height: 100%;
                padding: 5px 15px;
                flex: 1;
                margin: 0 5px;
                border-radius: 6px;
                border: solid 1px #707070;
            }
        }

        >.submi-btn {
            margin: 10px;

            >button {
                padding: 5px 20px;
                font-size: 20px;
                color: #84715c;
                border-radius: 10px;
                background-color: #faf9f8;
                border: solid 1px #707070;
            }
        }
    }

}
</style>