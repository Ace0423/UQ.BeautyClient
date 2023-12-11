
<script setup lang="ts">
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { useCounterStore } from "@/stores/counter";
import { useCompanyStore } from "@/stores/company";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const { userInfo } = storeToRefs(counterStore);
const companyStore = useCompanyStore();
const { getCompanyInfo, putCompanyInfo } = companyStore;
const { companyInfoList } = storeToRefs(companyStore);
const cropperImgUI = ref(false);
const cropperData: any = reactive({
    type: "",
    width: 200,
    height: 200,
    imgResult: ''
})
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
const dataURLtoFile = ((dataurl: any, filename: any) => {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
})
const fileImageSmall = ((e: any) => {
    const file = e.target.files.item(0);
    let suffixName = file.name.substring(file.name.lastIndexOf('.') + 1);
    if (suffixName !== 'jpg' && suffixName !== 'png' && suffixName !== 'JPG' && suffixName !== 'PNG') {
        Alert.warning("上傳檔案只能是 jpg、png 格式!", 2000);
        return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', (e: any) => {
        let file: any = dataURLtoFile(e.target.result, suffixName);
        cropperData.type = 'small'
        cropperData.width = 200;
        cropperData.height = 200;
        cropperData.imgResult = e.target.result;
        handCropperImgView();
    });
    reader.readAsDataURL(file);
})
const fileImageBig = ((e: any) => {
    const file = e.target.files.item(0);
    let suffixName = file.name.substring(file.name.lastIndexOf('.') + 1);
    if (suffixName !== 'jpg' && suffixName !== 'png' && suffixName !== 'JPG' && suffixName !== 'PNG') {
        Alert.warning("上傳檔案只能是 jpg、png 格式!", 2000);
        return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', (e: any) => {
        let file: any = dataURLtoFile(e.target.result, suffixName);
        cropperData.type = 'big'
        cropperData.width = 800;
        cropperData.height = 800;
        cropperData.imgResult = e.target.result;
        handCropperImgView();
    });
    reader.readAsDataURL(file);
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
const handCropperImgView = (() => {
    cropperImgUI.value = !cropperImgUI.value;
})

const resImgCropper = ((res: any) => {
    if (res.type == "small") {
        companyInfoData.imageSmall = res.res
    } else if (res.type == "big") {
        companyInfoData.imageBig = res.res
    }
    handCropperImgView();
})

</script>
<template>
    <div class="info-content">
        <div class="content">
            <div class="setting-content">
                <h1>商店設定</h1>
                <p>商店基本設定，請自由修改</p>
                <table>
                    <tbody>
                        <tr>
                            <td>商店名稱</td>
                            <td><input :disabled="disabled" v-model="filterCompanyInfo.cName" /></td>
                        </tr>
                        <!-- <tr>
                            <td>商店類型</td>
                            <td><input v-model="filterCompanyInfo.companyGroup" /></td>
                        </tr> -->
                        <tr>
                            <td>商店地址</td>
                            <td><input v-model="filterCompanyInfo.cAddress" /></td>
                        </tr>
                        <tr>
                            <td>商店電話</td>
                            <td><input v-model="filterCompanyInfo.cPhone" /></td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td><input v-model="filterCompanyInfo.cWebSite" /></td>
                        </tr>
                        <tr>
                            <td>電子信箱</td>
                            <td><input :disabled="disabled" v-model="filterCompanyInfo.cEmail" /></td>
                        </tr>
                        <tr>
                            <td>負責人手機號碼</td>
                            <td><input :disabled="disabled" v-model="filterCompanyInfo.cPhoneOwner" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="logo-content">
                <div class="logo">
                    <h1>商店Logo</h1>
                    <p>商店Logo，建議尺寸200px*200px</p>
                    <div class="photo-box">
                        <div>
                            <img v-if="companyInfoData.imageSmall" :src="companyInfoData.imageSmall" width="200"
                                height="200" />
                        </div>
                        <!-- <label class="button"
                            @click="fileImageSmall"><span>上傳圖片</span></label> -->
                        <label class="button"><span>上傳圖片</span><input class="file-input" type="file"
                                @change="fileImageSmall"></label>
                        <!-- <el-upload class="button" :auto-upload="false" action="" @change="fileImageSmall"
                            :show-file-list="false">
                                <el-button type="primary">选择图片</el-button>
                        </el-upload> -->
                    </div>
                </div>
                <div class="background-content">
                    <h1>商店Logo</h1>
                    <p>商店Logo，建議尺寸800px*800px</p>
                    <div class="photo-box">
                        <div>
                            <img v-if="companyInfoData.imageBig" :src="companyInfoData.imageBig" width="400"
                                height="400" />
                        </div>
                        <label class="button"><span>上傳圖片</span><input class="file-input" type="file"
                                @change="fileImageBig"></label>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="submitBtn">
            <button @click="handReturn()">取消變更</button>
            <button @click="handSubmit()">確認儲存</button>
        </div>
    </div>
    <CropperImg-UI v-if="cropperImgUI" :cropperData="cropperData" :handCropperImgView="handCropperImgView"
        @handCropperSubmit="resImgCropper" />
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
        display: flex;
        position: absolute;
        top: 0px;
        bottom: 65px;
        overflow: auto;

        >.setting-content {
            width: 50%;
            margin: 10px 15px;

            >table {
                width: 100%;

                >tbody {
                    >tr {
                        height: 70px;

                        >td {
                            text-align: center;

                            input {
                                text-align: center;
                                border: transparent;
                                display: inline-block;
                                width: 100%;
                                padding: 25px 0;
                            }
                        }
                    }
                }
            }

            input {
                border: transparent
            }
        }

        >.logo-content {

            width: 50%;
            margin: 10px 15px;

            >.logo {
                >.photo-box {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    >div {
                        border: solid 0.5px #ddd;
                        width: 200px;
                        height: 200px;
                    }

                    .button {
                        margin: 15px 0;
                        color: #84715c;
                    }

                    .file-input {
                        display: none;
                    }
                }
            }

            >.background-content {
                >.photo-box {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;


                    .button {
                        margin: 15px 0;
                        color: #84715c;
                    }

                    .file-input {
                        display: none;
                    }

                    >div {
                        // border: solid 0.5px #ddd;
                        // width: 400px;
                        // height: 400px;
                    }
                }
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