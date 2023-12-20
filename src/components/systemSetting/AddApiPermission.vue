<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useSettingStore } from "@/stores/setting";
const settingStore = useSettingStore();
const { apiPermissionsList } = storeToRefs(settingStore);
const { addApiPermissionsList, editApiPermissionsList } = settingStore;
const title = ref("");
const submitNameBtn = ref('確認');
const optionType: any = [{ option: 0, optionText: '預約' }, { option: 1, optionText: '結帳' }, { option: 2, optionText: '訂單紀錄' }, { option: 3, optionText: '預約' }, { option: 4, optionText: '顧客管理' }, { option: 5, optionText: '訊息管理' }, { option: 6, optionText: '人員管理' }, { option: 7, optionText: '報表' }, { option: 8, optionText: '項目管理' }, { option: 9, optionText: '商店設定' }, { option: 10, optionText: '票卷管理' }, { option: 11, optionText: '應用程式' }, { option: 12, optionText: '問卷管理' },]
const controllerType: any = [{ controller: "Auth", controllerText: '認證控制器' }, { controller: "Company", controllerText: '商店管理控制器' }, { controller: "Discounts", controllerText: '折扣優惠控制器' }, { controller: "Manager", controllerText: '管理者控制器' }, { controller: "Member", controllerText: '顧客控制器' }, { controller: "Product", controllerText: '產品管理控制器' }, { controller: "Option", controllerText: '功能管理控制器' } ,{ controller: "Service", controllerText: '服務控制器' }]
const targetType: any = ['Get', 'POST', 'PUT', 'DELETE']
const apiData = reactive({
    olid: 0,
    olOption: 0,
    olOptionText: '',
    olController: '',
    olControllerText: '',
    olAction: '',
    olActionText: '',
    olTarget: '',
    olTargetText: '',
    olMemo: '',
    display: false
})

const props = defineProps<{
    selectItem: any;
    handAddApiPermissionView: Function;
    getApiPermission: Function
}>();

onMounted(() => {
    if (props.selectItem) {
        apiData.olid = props.selectItem.olid,
            apiData.olOption = props.selectItem.olOption,
            apiData.olOptionText = props.selectItem.olOptionText,
            apiData.olController = props.selectItem.olController,
            apiData.olControllerText = props.selectItem.olControllerText,
            apiData.olAction = props.selectItem.olAction,
            apiData.olActionText = props.selectItem.olActionText,
            apiData.olTarget = props.selectItem.olTarget,
            apiData.olTargetText = props.selectItem.olTargetText,
            apiData.olMemo = props.selectItem.olMemo,
            apiData.display = props.selectItem.display
    }
});

const handSubmit = () => {
    apiData.olOptionText = (optionType.find((item: any) => item.option == apiData.olOption)).optionText;
    apiData.olControllerText = (controllerType.find((item: any) => item.controller == apiData.olController)).controllerText;
    console.log(apiData.olControllerText)
    if (apiData.olid == 0) {
        addApiPermissionsList(apiData)
            .then((res) => {
                if (res.state == 1) {
                    Alert.warning("新增成功", 1500);
                    setTimeout(() => {
                        props.getApiPermission();
                        props.handAddApiPermissionView('');
                    }, 2000);
                }
                if (res.state == 2) {
                    Alert.warning(showErrorMsg(res.msg), 2000);
                }
            })
            .catch((e: any) => {
                Alert.warning(showHttpsStatus(e.response.status), 2000);
            });
    } else {
        editApiPermissionsList(apiData)
            .then((res) => {
                if (res.state == 1) {
                    Alert.warning("修改成功", 1500);
                    setTimeout(() => {
                        props.getApiPermission();
                        props.handAddApiPermissionView('');
                    }, 2000);
                }
                if (res.state == 2) {
                    Alert.warning(showErrorMsg(res.msg), 2000);
                }
            })
            .catch((e: any) => {
                console.log(e)
                Alert.warning(showHttpsStatus(e.response.status), 2000);
            });
    }
};

</script>

<template>
    <div class="popup-mask">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <div class="top-content">
                <img :src="icon_closeX" v-on:click="handAddApiPermissionView()" />
                <span>{{ title }}</span>
                <button class="otherpay-btn" v-on:click="handSubmit()">{{ submitNameBtn }}</button>
            </div>
            <div class="switch">
                <label><input class="mui-switch" type="checkbox" v-model="apiData.display"></label>
                <div class="switch-content">
                    <p><strong>啟用API權限</strong></p>
                    <p>啟用後會在人員管理權限表顯示</p>
                </div>
            </div>
            <div class="content">
                <div class="promotion-select">
                    <p>*功能</p>
                    <select v-model="apiData.olOption">
                        <option v-for="item in optionType" :key="item.option" :value="item.option">
                            {{ item.optionText }}</option>
                    </select>
                </div>
                <div class="promotion-select">
                    <p>*控制器</p>
                    <select v-model="apiData.olController">
                        <option v-for="item in controllerType" :key="item.controller" :value="item.controller">
                            {{ item.controllerText }}</option>
                    </select>
                </div>
                <div class="input-content">
                    <p>*Action</p>
                    <input placeholder="請輸入 Action" v-model="apiData.olAction" />
                </div>
                <div class="input-content">
                    <p>*ActionText</p>
                    <input placeholder="請輸入 ActionText" v-model="apiData.olActionText" />
                </div>
                <div class="promotion-select">
                    <p>*Target</p>
                    <select v-model="apiData.olTarget">
                        <option disabled value="">請選擇觸發方式</option>
                        <option v-for="item in targetType" :key="item" :value="item">
                            {{ item }}</option>
                    </select>
                </div>
                <div class="input-content">
                    <p>*TargetText</p>
                    <input placeholder="請輸入 TargetText" v-model="apiData.olTargetText" />
                </div>
                <div class="input-content">
                    <p>*註解</p>
                    <input placeholder="請輸入 註解" v-model="apiData.olMemo" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 3;
    background: rgba(255, 255, 255, 0.5);

    display: flex;
    align-items: center;
    justify-content: space-around;

    .popup-content {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        font-size: 20px;
        font-family: HeitiTC;
        color: #84715c;
        font-weight: bold;
        position: relative;

        ::placeholder {
            color: #d3d3d3;
        }

        .top-content {
            display: flex;
            height: 70px;
            border: solid 1px #ddd;
            box-sizing: border-box;

            >span {
                display: flex;
                width: calc(100%);
                justify-content: center;
                align-items: center;
                font-size: 28px;
                height: 70px;
                // height: 100px;
                justify-content: center;
            }

            >img {
                position: absolute;
                width: 41px;
                height: 38px;
                top: 15px;
                left: 15px;
            }

            >button {
                position: absolute;
                width: 150px;
                height: 50px;
                top: 10px;
                right: 10px;
                border-radius: 5px;
                border: none;
                background-color: #84715c;
                color: #fff;
            }
        }

        >.switch {
            display: flex;
            align-items: center;
            margin: 0 10px 0 10px;
            border-bottom: solid 1px #ddd;
            height: 115px;

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

        >.content {
            position: absolute;
            top: 185px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            overflow: auto;
            margin: 0 5px;

            >h1 {
                margin: 20px 30px;
                font-size: 35px;
            }

            >.promotion-select {
                margin: 20px 30px;
                font-size: 25px;

                >input {
                    width: 100%;
                    height: 60px;
                    border-radius: 6px;
                    border: solid 1px #707070;
                    background-color: #fff;
                    margin-bottom: 10px;
                    text-align: left;
                }

                >select {
                    width: 100%;
                    height: 60px;
                    border-radius: 6px;
                    border: solid 1px #707070;
                    background-color: #fff;
                    margin-bottom: 10px;
                    text-align: left;
                }
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
}
</style>