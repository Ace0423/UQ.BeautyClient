<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import Alert from "@/components/alertCmpt";
import { showErrorMsg } from "@/types/IMessage";
import { validatePassword } from "@/utils/utils";
defineRule('required', required);
defineRule('email', email);
const store = useCounterStore();
const { resetPassword } = store;
const val = reactive({ Password: '', Token: '' });
const password1 = ref('');
const password2 = ref('');
const props = defineProps<{
    routeVal: any;
}>();
onMounted(() => {
    val.Token = props.routeVal.token
    console.log(val)
})
const comparison = ((value: any) => {
    if (password1.value && password2.value && password1.value != value) {
        return "密碼不一致"
    }

    return validatePassword(value)
})
const submit = (() => {
    val.Password = password1.value;
    resetPassword(val).then((res: any) => {
        console.log(res)
        if (res.state == 1) {
            Alert.warning('修改成功', 2000);
        }
        if (res.state == 2) {
            Alert.warning(showErrorMsg(res.msg), 2000);
        }
    });
})
</script>
<template>
    <div class="loginBox">
        <div class="container">
            <Form @submit="submit">
                <h1>重置密碼</h1>
                <div class="form-input">
                    <Field v-model="password1" name="password1" type="password" placeholder="請輸入密碼"
                        :rules="validatePassword" />
                    <ErrorMessage name="password1" />
                </div>
                <div class="form-input">
                    <Field v-model="password2" name="password2" type="password" placeholder="請輸入密碼"
                        :rules="comparison" />
                    <ErrorMessage name="password2" />
                </div>
                <div class="login-btn">
                    <button type="submit">確認</button>
                </div>
            </Form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.loginBox {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #fff;
    align-items: center;
    height: 100%;

    >.container {
        height: 100%;
        // display: flex;
        // flex-direction: column;
        // justify-content:baseline;

        h1 {
            color: #707070;
            margin: 30px;
            text-align: center;
        }

        >form {
            display: flex;
            flex-direction: column;
            width: 324px;
            height: 80px;
            margin: 30px 0 10px 0;

            >.form-input {
                display: block;
                position: relative;
                margin-bottom: 30px;

                >input {
                    display: block;
                    margin: auto;
                    width: 90%;
                    height: 45px;
                    text-indent: 10px;
                    font-size: 18px;
                    border-radius: 20px;
                    border: 1px solid #707070;
                }

                >span {
                    position: absolute;
                    bottom: -20px;
                    display: block;
                    padding-left: 20px;
                    font-size: 15px;
                    color: #ff0000;
                }

                >a {
                    position: absolute;
                    margin-top: 10px;
                    right: 30px;
                    color: #707070;
                }
            }

        }

        .login-btn {
            width: 100%;
            margin-top: 20px;

            >button {
                display: block;
                width: 50%;
                padding: 10px;
                margin: auto;
                font-size: 18px;
                font-weight: bold;
                font-family: HeitiTC;
                color: #fff;
                border: solid 1px #707070;
                border-radius: 13px;
                background-color: #877059;
                // border: #000000 1px solid;   
            }
        }

        @media screen and (max-width: 640px) {
            img {
                display: block;
                margin: auto;
                padding-top: 82px;
                width: 211px;
                height: 79px;
            }

            >.input-box {
                display: block;
                width: 211px;
                margin: 45px 0;

                >p {
                    display: block;
                    padding-left: 20px;
                    font-weight: 500;
                    line-height: 0;
                    font-size: 15px;
                    color: #707070;
                }

                >input {
                    display: block;
                    margin: auto;
                    width: 90%;
                    height: 45px;
                    font-size: 18px;
                    border-radius: 20px;
                    border: 2px solid #707070;
                }
            }

            >.btn {
                width: 100%;
                margin-top: 70px;

                >button {
                    display: block;
                    width: 50%;
                    padding: 10px;
                    margin: auto;
                    font-size: 18px;
                    font-weight: bold;
                    font-family: HeitiTC;
                    color: #fff;
                    border-radius: 13px;
                    border: 1px solid #707070;
                    background-color: #877059;
                }
            }
        }
    }
}
</style>
