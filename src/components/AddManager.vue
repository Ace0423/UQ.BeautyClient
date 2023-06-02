<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useManagerStore } from "@/stores/manager";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";

const managerStore = useManagerStore();
const { createManagerData, editAdminData, getRoleList } = managerStore;
const { roleList } = storeToRefs(managerStore);
const title = ref("新增使用者");
const newManager: any = reactive({
    email: "",
    password: "",
    phone: "",
    nameView: "",
    sex: 1,
    photo: "",
    memo: "",
    userLock: true,
    lineUserID: "",
    googleUserID: "",
    roleList: []
});

const props = defineProps<{
    selectManagerItem: any
    handAddManagerView: Function;
}>();
const state: any = reactive({
    form_items: {
        name: {
            label: "姓名",
            component: "input",
            type: "text",
            icon: "fa-solid fa-user",
            placeholder: "請輸入名稱",
            is_readonly: false,
            value: "",
            tip: "",
            rules: {
                required: {
                    warn: "此項目為必填",
                },
            },
            is_error: false,
            warn: "",
            is_show: true,
        },
        password: {
            label: "密碼",
            component: "input",
            type: "password",
            icon: "fa-solid fa-key",
            placeholder: "請輸入密碼",
            is_readonly: false,
            value: "",
            tip: "",
            rules: {
                required: {
                    warn: "此項目為必填",
                },
                length: {
                    min: 6,
                    warn: "不得少於6位",
                },
                capital: {
                    warn: "必須含一個大寫英文字母",
                },
                special: {
                    warn: "必須含一個特殊字元",
                },
            },
            is_error: false,
            warn: "",
            is_show: true,
        },
        email: {
            label: "信箱",
            component: "input",
            type: "text",
            icon: "fa-solid fa-user",
            placeholder: "輸入使用者信箱",
            is_readonly: false,
            value: "",
            tip: "",
            rules: {
                required: {
                    warn: "此項目為必填",
                },
                email: {
                    warn: "email格式不符",
                },
            },
            is_error: false,
            warn: "",
            is_show: true,
        },
        cellphone: {
            label: "手機",
            component: "input",
            type: "text",
            icon: "fas fa-mobile-alt",
            is_readonly: false,
            value: "",
            tip: "",
            rules: {
                required: {
                    warn: "此項目為必填",
                },
                cellphone: {
                    warn: "手機格式錯誤",
                },
            },
            is_error: false,
            warn: "",
            is_show: true,
        },
    },
});
let { form_items } = toRefs(state);
const verify_methods: any = {
    required(component: any) {
        if (!component.value) {
            component.is_error = true;
            component.warn = component.rules.required?.warn || "";
            return false;
        } else {
            component.is_error = false;
            component.warn = "";
            return true;
        }
    },
    cellphone(component: any) {
        let rep = /^(09)[0-9]{8}$/;
        if (!rep.test(component.value)) {
            component.is_error = true;
            component.warn = component.rules.cellphone?.warn || "";
            return false;
        } else {
            component.is_error = false;
            component.warn = "";
            return true;
        }
    },
    email(component: any) {
        let rep = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!rep.test(component.value)) {
            component.is_error = true;
            component.warn = component.rules.email?.warn || "";
            return false;
        } else {
            component.is_error = false;
            component.warn = "";
            return true;
        }
    },
    capital(component: any) {
        const stringArray = component.value.split("");
        let capitalState = false;
        stringArray.forEach((t: any) => {
            if (/[A-Z]/.test(t)) {
                component.is_error = false;
                component.warn = "";
                capitalState = true;
            }
        });
        if (!capitalState) {
            component.is_error = true;
            component.warn = component.rules.capital?.warn || "";
        }
        return capitalState;
    },
    special(component: any) {
        let rep = new RegExp(
            "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
        );
        if (rep.test(component.value)) {
            component.is_error = false;
            component.warn = "";
            return true;
        } else {
            component.is_error = true;
            component.warn = component.rules.special?.warn || "";
            return false;
        }
    },
    length(component: any) {
        if (
            component.value.length < (component.rules.length?.min || 0) ||
            component.value.length > (component.rules.length?.max || 10000)
        ) {
            component.is_error = true;
            component.warn = component.rules.length?.warn || "";
            return false;
        } else {
            component.is_error = false;
            component.warn = "";
            return true;
        }
    },
};
const verify_all = () => {
    let is_valid = true;
    for (let component in state.form_items) {
        let item = state.form_items[component];
        for (let rule in item.rules) {
            if (!verify_methods[rule](item)) {
                is_valid = false;
                break;
            }
        }
    }
    return is_valid;
};
const handSubmit = () => {
    if (!verify_all()) return;
    newManager.nameView = state.form_items.name.value;
    newManager.password = state.form_items.password.value;
    newManager.email = state.form_items.email.value;
    newManager.phone = state.form_items.cellphone.value;
    createManagerData(newManager)
        .then((res) => {
            if (res.state == 1) {
                Alert.warning('修改成功', 2000);
                props.handAddManagerView();
            } else {
                Alert.warning(showErrorMsg(res.msg), 2000);
            }
        })
        .catch((e: any) => {
            Alert.warning(showHttpsStatus(e.response.status), 2000);
        });
};
const getRoleName = () => {
    let data = {
        id: 0,
        pageIndex: 0,
        count: 0
    }
    getRoleList(data)
        .then(() => {
        })
        .catch((e: any) => {
            Alert.warning(showHttpsStatus(e.response.status), 2000);
        })
}

onMounted(() => {
    if (props.selectManagerItem) {
        console.log(props.selectManagerItem);
        form_items.value.name.value = props.selectManagerItem.nameView;
        form_items.value.email.value  = props.selectManagerItem.email;
        form_items.value.password.value  = props.selectManagerItem.password;
        form_items.value.phone.value  = props.selectManagerItem.phone;
        newManager.sex 
    // sex: 1,
    // photo: "",
    // memo: "",
    // userLock: true,
    // lineUserID: "",
    // googleUserID: "",
    // roleList: []
    }
    getRoleName();
});
</script>

<template>
    <div class="popup-mask" v-on:click.self="handAddManagerView()">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <h1>{{ title }}</h1>
            <div>
                <span>名稱</span>
                <div>
                    <input v-model="form_items.name.value" />
                    <p v-if="form_items.name.is_error">{{ form_items.name.warn }}</p>
                </div>

            </div>
            <div>
                <span>性別</span>
                <label><input type="radio" name="gender" value="1" v-model="newManager.sex" />男</label>
                <label><input type="radio" name="gender" value="0" v-model="newManager.sex" />女</label>
            </div>
            <div>
                <span>密碼</span>
                <div>
                    <input type="password" v-model="form_items.password.value" />
                    <p v-if="form_items.password.is_error">{{ form_items.password.warn }}</p>
                </div>
            </div>
            <div>
                <span>電話</span>
                <div>
                    <input v-model="form_items.cellphone.value" />
                    <!-- <p v-if="form_items.cellphone.is_error"> {{ form_items.cellphone.warn }} </p> -->
                    <p> {{ form_items.cellphone.warn }} </p>
                </div>
            </div>
            <div>
                <span>信箱</span>
                <div>
                    <input type="email" v-model="form_items.email.value" />
                    <!-- <p v-if="form_items.email.is_error">{{ form_items.email.warn }}</p> -->
                    <p> {{ form_items.email.warn }} </p>
                </div>
            </div>
            <div>
                <span>狀態</span>
                <select v-model="newManager.userLock">
                    <option value="true">正常</option>
                    <option value="false">凍結</option>
                </select>
            </div>
            <div>
                <span>權限</span>
                <select v-model="newManager.roleList[0]">
                    <option disabled value="">請選擇權限職等</option>
                    <option v-for="item in roleList.data" :key="item.roleId" :value="item.roleId">{{ item.memo }}</option>
                </select>
            </div>
            <div>
                <span>備註</span>
                <textarea v-model="newManager.memo"></textarea>
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
    z-index: 2;
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
            margin-top: 20px;
            display: flex;
            // justify-content: end;

            >span {
                min-width: 40px;
                margin: 3px 10px;
            }

            >select {
                max-width: 200px;
                height: 30px;
                text-align: center;
                border-radius: 6px;
                border: solid 1px #707070;
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

            >div {
                position: relative;
                flex: 1;

                >input {
                    max-width: 200px;
                    height: 30px;
                    text-align: center;
                    border-radius: 6px;
                    border: solid 1px #707070;
                }

                >p {
                    position: absolute;
                    margin: 0 0 0 0;
                    font-size: 12px;
                    color: red;
                }
            }
        }

        >.btn {
            display: flex;
            justify-content: center;

            >button {
                padding: 10px 10px;
                margin: 10px 10px;
                font-size: 18px;
                color: #717171;
                border-radius: 10px;
                background-color: #faf9f8;
                border: solid 1px #707070;
            }
        }
    }
}
</style>