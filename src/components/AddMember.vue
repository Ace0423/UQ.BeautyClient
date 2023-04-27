<script setup lang="ts">
import { useCounterStore } from "@/stores/member";
// import "vue3-multiselect-checkboxed/style.css"
const store = useCounterStore();
const { createMemberData, editMemberData, groupData } = store;
const title = ref('新增客戶');
const props = defineProps<{
    selectMemberItem: any
    handAddMemberView: Function,
}>()
const newMember = reactive({
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
});
const value = null
const options = ['list', 'of', 'options']
const handSubmit = () => {
    if (props.selectMemberItem) {
        newMember.nameView = newMember.nameFirst + "," + newMember.nameLast;
        editMemberData(newMember).then((res) => {
            if (res == 1) {
                props.handAddMemberView()
            }
        })
    } else {
        newMember.nameView = newMember.nameFirst + "," + newMember.nameLast;
        createMemberData(newMember).then((res) => {
            if (res == 1) {
                props.handAddMemberView()
            }
        })
    }
}

onMounted(() => {
    if (props.selectMemberItem) {
        console.log(props.selectMemberItem);
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
        title.value = '修改客戶';
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
            <!-- <div>
                <span>標籤</span>
                <Multiselect v-model="value" :options="options" :multiple="true" :close-on-select="true"
                    placeholder="Pick some" label="name" track-by="name"></Multiselect>
            </div> -->
            <div>
                <span>備註</span>
                <textarea v-model="newMember.memo"></textarea>
            </div>

            <div class="btn">
                <button type="submit" v-on:click="handSubmit()">確認</button>
            </div>
        </div>
    </div>
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