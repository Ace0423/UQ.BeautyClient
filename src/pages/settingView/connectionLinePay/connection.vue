<script setup lang="ts">
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { useCompanyStore } from "@/stores/company";
import router from "@/router";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const { userInfo } = storeToRefs(counterStore);
const companyStore = useCompanyStore();
const { getCompanyInfo, putCompanyInfo } = companyStore;
const { companyInfoList } = storeToRefs(companyStore);
const image = ref("");
const companyInfoData = reactive({
    cId: 0,
    cName: "",
    cAddress: "",
    cPhone: "",
    cWebSite: "",
    cEmail: "",
    cPhoneOwner: "",
    imageBig: "",
    imageSmall: "",
    companyGroup: [
    ]
})
const fileSelected = ((e: any) => {
    const file = e.target.files.item(0);
    const reader = new FileReader();
    reader.addEventListener('load', imageLoaded);
    reader.readAsDataURL(file);
})
const imageLoaded = ((e: any) => {
    image.value = e.target.result;
})
const disabled = computed(() => {
    return userInfo.value.roleMgrMappings[0].roleName == "Admin" ? false : true;
})
const filterCompanyInfo = computed(() => {
    companyInfoData.cId = companyInfoList.value.data.cId;
    companyInfoData.cName = companyInfoList.value.data.cName;
    companyInfoData.cAddress = companyInfoList.value.data.cAddress;
    companyInfoData.cPhone = companyInfoList.value.data.cPhone;
    companyInfoData.cWebSite = companyInfoList.value.data.cWebSite;
    companyInfoData.cEmail = companyInfoList.value.data.cEmail;
    companyInfoData.cPhoneOwner = companyInfoList.value.data.cPhoneOwner;
    companyInfoData.imageBig = companyInfoList.value.data.imageBig;
    companyInfoData.imageSmall = companyInfoList.value.data.imageSmall;
    companyInfoData.companyGroup = companyInfoList.value.data.companyGroup;
    return companyInfoData;
})
const handReturn = (() => {
    companyInfoData.cId = companyInfoList.value.data.cId;
    companyInfoData.cName = companyInfoList.value.data.cName;
    companyInfoData.cAddress = companyInfoList.value.data.cAddress;
    companyInfoData.cPhone = companyInfoList.value.data.cPhone;
    companyInfoData.cWebSite = companyInfoList.value.data.cWebSite;
    companyInfoData.cEmail = companyInfoList.value.data.cEmail;
    companyInfoData.cPhoneOwner = companyInfoList.value.data.cPhoneOwner;
    companyInfoData.imageBig = companyInfoList.value.data.imageBig;
    companyInfoData.imageSmall = companyInfoList.value.data.imageSmall;
    companyInfoData.companyGroup = companyInfoList.value.data.companyGroup;
    router.go(-1);
})
const handSubmit = (() => {
    putCompanyInfo(companyInfoData)
        .then((res) => {
            if (res.state == 2) {
                Alert.warning(showErrorMsg(res.msg), 2000);
            } else if (res.state == 1) {
                Alert.warning("修改成功", 2000);
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
const companyInfo = () => {
    getCompanyInfo()
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
        })
}

onMounted(() => {
    companyInfo();
})
const openPage = (str: string) => {
    switch (str) {
        case 'teach':
        window.open('https://pay.line.me/portal/tw/main')
            break;
        case 'manager':
        window.open('https://pay.line.me/portal/tw/auth/login')
            break;
        default:
            break;
    }
  

}
</script>
<template>
    <div class="info-content">
        <div class="content">
            <div class="hint-content">
                <div class="i-icon">i</div>
                <div>
                    <h3>想要客立樂預約App在結帳時使用 LINE Pay 收款嗎?</h3>
                    <p>點擊立即申請開始填寫表單，LINE Pay 人工審核需等待 2 - 4 周工作天</p>
                </div>
                <button>立即申請</button>
            </div>
            <div class="teach-content">
                <div>
                    <h3>LINE Pay 串接教學</h3>
                    <p>你已有LINE Pay 並想啟用串接嗎?請前往教學範本了解如何設定。</p>
                </div>
                <button @click="openPage('teach')">前往教學範本</button>
            </div>
            <div class="back-content">
                <div>
                    <h3>LINE Pay 後台</h3>
                    <p>請至 LINE Pay 後台登入您的「線下付款」帳號，並完成以下兩個步驟。</p>
                </div>
                <button @click="openPage('manager')">前往LINE Pay後台</button>
            </div>
            <div class="hint-content">
                <div class="i-icon">i</div>
                <p>線上與線下付款為兩組帳號密碼，請務必確認此處登入操作為「線下付款」串接使用的唱號密碼。</p>
            </div>
            <div class="setting-content">
                <h3>設定金鑰</h3>
                <p>請在 LINE Pay「後台的管理付款連結 > 管理連結金鑰」找到「Channel ID 與 Channel Secret Key」，複製並回填於下方欄位。</p>
            </div>
            <div class="input-content">
                <p>*Channel ID</p>
                <input placeholder="請輸入 Channel ID" />
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

        >.hint-content {
            display: flex;
            align-items: center;
            padding: 0px 15px;
            margin: 30px 30px;
            border-radius: 10px 10px 10px 10px;
            background-color: #e6e2de;
            position: relative;

            >.i-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 15px;
                width: 28px;
                height: 28px;
                border-radius: 14px;
                font-size: 24px;
                background-color: #84715c;
                color: #fff;
            }

            >button {
                right: 0px;
                position: absolute;
                border-radius: 6px;
                padding: 10px 20px;
                margin: 0px 50px;
                border: transparent;
                background-color: #84715c;
                color: #fff;
                font-size: 18px;
            }
        }

        >.teach-content {
            display: flex;
            align-items: center;
            padding: 0px 15px;
            margin: 30px 30px;
            border-radius: 10px 10px 10px 10px;
            border: solid 0.5px #e6e2de;
            position: relative;

            >button {
                right: 0px;
                position: absolute;
                border-radius: 6px;
                padding: 10px 20px;
                margin: 0px 50px;
                border: transparent;
                color: #84715c;
                font-size: 18px;
            }
        }

        >.back-content {
            display: flex;
            align-items: center;
            padding: 0px 15px;
            margin: 30px 30px;
            border-radius: 10px 10px 10px 10px;
            border: solid 0.5px #e6e2de;
            position: relative;

            >button {
                right: 0px;
                position: absolute;
                border-radius: 6px;
                padding: 10px 20px;
                margin: 0px 50px;
                border: transparent;
                color: #84715c;
                font-size: 18px;
            }
        }

        >.setting-content {
            padding: 0px 15px;
            margin: 30px 30px;
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