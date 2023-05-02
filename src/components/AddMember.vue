<script setup lang="ts">
import { useCounterStore } from "@/stores/member";
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
const store = useCounterStore();
const { createMemberData, editMemberData, groupListData } = store;
const alertState = ref(false);
const alertInformation = reactive({
    messageText: '', // 提示內容
    buttonState: 0,  //按鈕顯示狀態 0:全部 1:只顯示確定按鈕 2:不顯示按鈕 
    timerVal: 0      //時間計時器
})
const title = ref('新增顧客');

const newMember: any = reactive({
    userId: 0,
    email: "",
    phone: "",
    nameFirst: "",
    nameLast: "",
    nameView: "",
    birthday: "",
    sex: 1,
    poto: "",
    memo: "",
    groupList: [],
});

const props = defineProps<{
    selectMemberItem: any
    handAddMemberView: Function,
}>()

const handAlertView = (msg: string, btnState: number, timer: number) => {
    alertInformation.messageText = msg;
    alertInformation.buttonState = btnState;
    alertInformation.timerVal = timer;
    alertState.value = !alertState.value;
}

const handSubmit = () => {
    if (props.selectMemberItem) {
        newMember.nameView = newMember.nameFirst + "," + newMember.nameLast;
        editMemberData(newMember).then((res) => {
             if (res == 1) {
                handAlertView("修改成功", 2, 1);
                setTimeout(() => {
                    props.handAddMemberView()
                }, 1000)
            } else {
                handAlertView("修改失敗", 2, 1);
            }
        })
    } else {
        newMember.nameView = newMember.nameFirst + "," + newMember.nameLast;
        createMemberData(newMember).then((res) => {
             if (res == 1) {
                handAlertView("新增成功", 2, 1);
                setTimeout(() => {
                    props.handAddMemberView();
                }, 1000)
            }else{
                handAlertView("新增失敗", 2, 1);
            }
        })
    }
}

onMounted(() => {
    if (props.selectMemberItem) {
        newMember.userId = props.selectMemberItem.userId;
        newMember.email = props.selectMemberItem.email;
        newMember.phone = props.selectMemberItem.phone;
        newMember.nameFirst = props.selectMemberItem.nameFirst;
        newMember.nameLast = props.selectMemberItem.nameLast;
        newMember.nameView = props.selectMemberItem.nameView;
        newMember.birthday = props.selectMemberItem.birthday;
        newMember.sex = props.selectMemberItem.sex;
        newMember.poto = props.selectMemberItem.poto;
        newMember.memo = props.selectMemberItem.memo;
        newMember.groupList = props.selectMemberItem.groupList;
        title.value = '修改顧客';
    }
})
</script>

<template>
    <div class="popup-mask" v-on:click.self="handAddMemberView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <h1>{{ title }}</h1>
            <div>
                <span>姓名</span>
                <input class="input-name-first" v-model="newMember.nameFirst" />
                <input class="input-name-last" v-model="newMember.nameLast" />
            </div>
            <div>
                <span>性別</span>
                <label><input type="radio" name="gender" value=1 v-model="newMember.sex">男</label>
                <label><input type="radio" name="gender" value=0 v-model="newMember.sex">女</label>
            </div>
            <div>
                <span>標籤</span>
                <multiselect v-model="newMember.groupList" :options="groupListData.data" :multiple="true"
                    :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="" label="label"
                    track-by="groupId" :preselect-first="false">
                    <!-- <template #default="{ values, search, isOpen }"><span class="multiselect__single" -->
                    <!-- v-if="values.length" v-show="!isOpen">{{ values.length }} options selected</span></template> -->
                </multiselect>
            </div>
            <div>
                <span>電話</span>
                <input v-model="newMember.phone" />
            </div>
            <div>
                <span>生日</span>
                <input type="date" v-model="newMember.birthday" />
            </div>
            <div>
                <span>信箱</span>
                <input type="email" v-model="newMember.email" />
            </div>
            <div>
                <span>備註</span>
                <textarea v-model="newMember.memo"></textarea>
            </div>

            <div class="btn">
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
    z-index: 50002;
    background: rgba(255, 255, 255, 0.5);


    display: flex;
    align-items: center;
    justify-content: space-around;

    .popup-content {
        max-width: 360px;
        background-color: #e6e2de;
        padding: 15px 50px;
        font-size: 20px;
        font-family: HeitiTC;
        color: #84715c;
        font-weight: bold;

        >h1 {
            text-align: center;
            font-size: 20px;
        }

        >div {
            margin-top: 15px;
            display: flex;
            // justify-content: end;

            >span {
                min-width: 40px;
                margin: 3px 10px;
            }

            >input {
                max-width: 200px;
                height: 30px;
                text-align: center;
                border-radius: 6px;
                border: solid 1px #707070;
            }

            >label {
                margin: 0 10px;
            }

            >textarea {
                width: 250px;
                height: 100px;
                // text-align: center;
                border-radius: 6px;
                border: solid 1px #707070;
            }

            >input::placeholder {
                color: #e6e2de;
            }





            >.input-name-first {
                width: 40px;
            }

            >.input-name-last {
                margin: 0 5px;
                // width: 40px;
            }

            >.multiselectcheckbox {
                max-width: 320px;
                border-radius: 6px;
                border: solid 1px #707070;
            }
        }

        >.btn {
            display: flex;
            justify-content: center;

            >button {
                // width: 72px;
                // height: 38px;
                padding: 10px 10px;
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