<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
const { createMember } = store;
const props = defineProps<{
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
    sex: 0,
    poto: "",
    memo: "",
});

const handSubmit = () => {
    newMember.nameView = newMember.nameFirst + "," + newMember.nameLast;
    createMember(newMember);
}
</script>

<template>
    <div class="popup-mask" @click.self="props.handAddMemberView">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <h1>新增客戶</h1>
            <div>
                <span>姓氏</span>
                <input v-model="newMember.nameFirst" />
            </div>
            <div>
                <span>名子</span>
                <input v-model="newMember.nameLast" />
            </div>
            <div>
                <span>性別</span>
                <label><input type="radio" name="gender" value=0 v-model="newMember.sex">男</label>
                <label><input type="radio" name="gender" value=1 v-model="newMember.sex">女</label>
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
                <button @click="handSubmit()">確認</button>
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
    z-index: 50001;
    background: rgba(255, 255, 255, 0.5);


    display: flex;
    align-items: center;
    justify-content: space-around;

    .popup-content {
        text-align: center;
        background-color: #e6e2de;
        padding: 15px 50px;
        font-size: 20px;
        font-family: HeitiTC;
        color: #84715c;
        font-weight: bold;

        >h1 {
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

            >button {
                width: 72px;
                height: 38px;
                font-size: 20px;
                color: #84715c;
                border-radius: 10px;
                border: solid 1px #707070;
            }
        }

        >.btn {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            margin-top: 20px;
        }
    }

}
</style>