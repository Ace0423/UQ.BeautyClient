<script setup lang="ts">
import { onMounted } from 'vue';
const timer: any = [{ value: 1, text: '1天前' }, { value: 2, text: '2天前' }, { value: 3, text: '3天前' }, { value: 4, text: '4天前' },]
const timeVal = ref(1)
onMounted(() => {

})
</script>
<template>
    <div class="wrap">
        <div class="content">
            <div class="hint-block">
                <h3>目前預約開放至2023/11/12(日)</h3>
            </div>
            <div class="appointment">
                <h3>線上預約開放時段設定</h3>
                <div>
                    <p>預約採</p>
                    <select v-model="timeVal">
                        <option v-for="item in timer" :key="item.value" :value="item.value">
                            {{ item.text }}</option>
                    </select>
                    <p>將於</p>
                    <select v-model="timeVal">
                        <option v-for="item in timer" :key="item.value" :value="item.value">
                            {{ item.text }}</option>
                    </select>
                    <select v-model="timeVal">
                        <option v-for="item in timer" :key="item.value" :value="item.value">
                            {{ item.text }}</option>
                    </select>
                    <p>自動開放未來</p>
                    <select v-model="timeVal">
                        <option v-for="item in timer" :key="item.value" :value="item.value">
                            {{ item.text }}</option>
                    </select>
                    <p>的預約。</p>
                </div>
            </div>
            
            <div class="other-setting">
                <h3>其它</h3>
                <div class="switch">
                    <label><input class="mui-switch" type="checkbox"></label>
                    <div class="switch-content">
                        <p><strong>你的預約是否需要事前確認?</strong></p>
                        <p>顧客預約後將會由您選擇是否接受此預約單。(在此前您的顧客將等待您的回應)</p>
                    </div>
                </div>
                <div class="switch">
                    <label><input class="mui-switch" type="checkbox"></label>
                    <div class="switch-content">
                        <p><strong>啟用多組數預約</strong></p>
                        <p>顧客預約可以選擇多人一起預約。</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-block">
            <button>取消變更</button>
            <button>儲存變更</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrap {
    position: absolute;
    top: 50px;
    bottom: 0px;
    left: 0px;
    right: 0px;



    >.content {
        overflow: auto;
        position: absolute;
        top: 0px;
        bottom: 60px;
        width: 100%;

        >.hint-block {
            margin: 5px 10px;
            padding: 3px 10px;
            background-color: #e6e2de;
            border-radius: 8px;
        }

        >.appointment {
            margin: 0 10px;

            >div {
                display: flex;
                align-items: center;

                select {
                    margin: 0px 10px;
                    padding: 10px;
                    background-color: #e6e2de;
                    border: transparent;
                }
            }
        }

        >.other-setting {
            margin: 0 10px;

            >.switch {
                display: flex;
                align-items: center;
                border-top: solid 1px #c1bdb8;
                margin: 0px 10px;

                >.switch-content {
                    margin: 0 15px;
                    text-align: left;
                }

                .mui-switch {
                    width: 52px;
                    height: 31px;
                    position: relative;
                    border: 1px solid #dfdfdf;
                    margin-left: 15px;
                    background-color: #fdfdfd;
                    box-shadow: #dfdfdf 0 0 0 0 inset;
                    border-radius: 20px;
                    border-top-left-radius: 20px;
                    border-top-right-radius: 20px;
                    border-bottom-left-radius: 20px;
                    border-bottom-right-radius: 20px;
                    background-clip: content-box;
                    display: inline-block;
                    -webkit-appearance: none;
                    user-select: none;
                    outline: none;
                }

                .mui-switch:before {
                    content: '';
                    width: 29px;
                    height: 29px;
                    position: absolute;
                    top: 0px;
                    left: 0;
                    border-radius: 20px;
                    border-top-left-radius: 20px;
                    border-top-right-radius: 20px;
                    border-bottom-left-radius: 20px;
                    border-bottom-right-radius: 20px;
                    background-color: #fff;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
                }

                .mui-switch:checked {
                    border-color: #64bd63;
                    box-shadow: #64bd63 0 0 0 16px inset;
                    background-color: #64bd63;
                }

                .mui-switch:checked:before {
                    left: 21px;
                }
            }
        }
    }

    >.bottom-block {
        position: absolute;
        bottom: 0px;
        height: 60px;
        left: 0px;
        right: 0px;
        display: flex;
        align-items: center;
        justify-content: end;
        border-top: 1px solid #c1bdb8;

        button {
            height: 70%;
            margin: 0 10px;
            border: transparent;
            border-radius: 3px;
        }
    }
}
</style>