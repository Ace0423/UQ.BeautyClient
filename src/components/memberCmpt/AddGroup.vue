<script setup lang="ts">
import { useMemberStore } from "@/stores/member";
import { showErrorMsg, showHttpsStatus } from "@/types/IMessage";
import { validateRequired } from "@/utils/utils";
import { useForm, Form, Field, ErrorMessage, defineRule } from 'vee-validate';
const memberStore = useMemberStore();
const { createGroupData, editGroupData ,deleteGroupData} = memberStore;
const alertState = ref(false);
const subBut = ref(false)
const alertInformation = reactive({
    messageText: '', // 提示內容
    buttonState: 0,  //按鈕顯示狀態 0:全部 1:只顯示確定按鈕 2:不顯示按鈕 
    timerVal: 0      //時間計時器
})
// const title = ref('新增標籤');
const gType = ref('add');
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
    subBut.value = !subBut.value;
    if (props.selectGroupItem) {
        editGroupData(newGroup).then((res:any) => {
            subBut.value = !subBut.value;
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
                subBut.value = !subBut.value;
                handAlertView(showHttpsStatus(e.response.status), 2, 1);
            });
    } else {
        if (newGroup.label == "") {
            handAlertView('標籤欄位必填', 2, 1);
            subBut.value = !subBut.value;
            return
        }
        createGroupData(newGroup).then((res) => {
            subBut.value = !subBut.value;
            if (res.state == 1) {
                handAlertView("新增成功", 2, 1);
                setTimeout(() => {
                    props.handAddGroupView();
                }, 1000)
            } else {
                handAlertView(showErrorMsg(res.msg), 2, 1);
            }
        })
            .catch((e: any) => {
                subBut.value = !subBut.value;
                handAlertView(showHttpsStatus(e.response.status), 2, 1);
            });
    }
}
const handDelete = () => {
    deleteGroupData(newGroup).then((res:any) => {
        subBut.value = !subBut.value;
        if (res.state == 1) {
            handAlertView("刪除成功", 2, 1);
            setTimeout(() => {
                props.handAddGroupView();
            }, 1000)
        } else {
            handAlertView(showErrorMsg(res.msg), 2, 1);
        }
    })
        .catch((e: any) => {
            subBut.value = !subBut.value;
            handAlertView(showHttpsStatus(e.response.status), 2, 1);
        });
}
onMounted(() => {
    if (props.selectGroupItem) {
        gType.value = 'edit';
        newGroup.groupId = props.selectGroupItem.groupId;
        newGroup.label = props.selectGroupItem.label;
        newGroup.memo = props.selectGroupItem.memo;
    }
})
</script>

<template>
    <div class="popup-mask" v-on:click.self="handAddGroupView()">
        <div class="popup-content">
            <h1 v-if="gType == 'add'">新增標籤</h1>
            <h1 v-if="gType == 'edit'">修改標籤</h1>
            <div class="group-inputbox">
                <p>標籤</p>
                <input v-model="newGroup.label" />
            </div>
            <div class="group-textareabox">
                <p>備註</p>
                <textarea v-model="newGroup.memo"></textarea>
            </div>
            <div class="submi-btn">
                <button v-if="gType == 'edit'" type="submit" v-on:click="handDelete()" :disabled="subBut">刪除標籤</button>
                <button type="submit" v-on:click="handSubmit()" :disabled="subBut">儲存變更</button>
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

        form {
            display: flex;
            flex-direction: column;
            width: 324px;
            height: 80px;
            margin: 10px 0 20px 0;

            >input {
                display: block;
                margin: auto;
                width: 90%;
                height: 45px;
                text-indent: 10px;
                font-size: 18px;
                border-radius: 5px;
                border: 1px solid #707070;
            }

            >span {
                display: block;
                padding-left: 20px;
                font-size: 15px;
                color: #ff0000;
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
            display: flex;
            justify-content: space-around;
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