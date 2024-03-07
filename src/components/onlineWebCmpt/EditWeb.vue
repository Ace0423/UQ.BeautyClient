<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { usePriceStore } from "@/stores/priceStore";
import type { TabsPaneContext } from 'element-plus'
import { ElTable } from 'element-plus'
const priceStore = usePriceStore();
const submitNameBtn = ref('確認');
const title = ref("");
const activeName = ref('first');
const timer: any = [{ value: 0, text: '1小時' }, { value: 1, text: '1天' }, { value: 2, text: '1周' }];
const personnelDesignation: any = [{ value: 0, text: '不指定人員' },];
const multipleServiceTableRef = ref<InstanceType<typeof ElTable>>();
const multipleServiceSelection = ref([]);
const multipleBookingPersonnelTableRef = ref<InstanceType<typeof ElTable>>();
const multipleShopProductTableRef = ref<InstanceType<typeof ElTable>>();
const multipleShopProductSelection = ref([]);
const toggleServiceSelection = () => {
    setTimeout(() => {
        infoData.serviceList.forEach((item: any) => {
            let resullt = infoData.obServiceItems.find((row: any) => {
                if (row.sId == item.sId) {
                    return true
                } else {
                    return false
                }
            })
            if (resullt) {
                multipleServiceTableRef.value!.toggleRowSelection(item, true)
            }
        })
    }, 300)
}
const toggleBookingPersonnelSelection = () => {
    setTimeout(() => {
        infoData.managerList.forEach((item: any) => {
            let resullt = infoData.obBookingPersonnel.find((row: any) => {
                if (row.managerId == item.managerId) {
                    return true
                } else {
                    return false
                }
            })
            if (resullt) {
                multipleBookingPersonnelTableRef.value!.toggleRowSelection(item, true)
            }
        })
    }, 300)
}
const toggleShopProductSelection = () => {
    setTimeout(() => {
        infoData.productsList.forEach((item: any) => {
            let resullt = infoData.obShopProduct.find((row: any) => {
                if (row.pId == item.pId) {
                    return true
                } else {
                    return false
                }
            })
            if (resullt) {
                multipleShopProductTableRef.value!.toggleRowSelection(item, true)
            }
        })
    }, 300)
}
const cropperImgUI = ref(false);
const cropperData: any = reactive({
    type: "",
    width: 200,
    height: 200,
    imgResult: ''
})
const infoData = reactive({
    cId: 0,
    obActive: false,
    obAllowCancellation: true,
    obAllowOnSitePayment: false,
    obAllowOnlineConsultation: false,
    obAppUnit: 0,
    obAppointmentPictures: "",
    obAutoOpen: false,
    obAutomaticallyOpenForTime: 0,
    obBookingPrecautions: "",
    obCancellationDeadlineDays: 0,
    obCustomAppointmentDate: "2024-02-09T00:00:00",
    obEnable: true,
    obEnableMultipleBookings: true,
    obEnablePickupTimes: true,
    obId: 1,
    obLastAppointmentTime: 0,
    obOpenDaily: 0,
    obOpenDate: 1,
    obOpenStoreOnlineReservation: true,
    obOpenTime: "10:00:00",
    obPersonnelDesignationMethod: 0,
    obRequireConfirmation: true,
    obShopPictures: "",
    obShopPrecautions: "",
    obStartSellingProducts: true,
    obWebDescription: "1",
    obWebName: "1",
    obWebsHomePicture: "",
    managerList: [],
    productsList: [],
    serviceList: [],
    obBookingPersonnel: [],
    obServiceItems: [],
    obShopProduct: [],
})
const props = defineProps<{
    webInfoData: any;
    handEditWebView: Function;
}>();
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
onMounted(() => {
    infoData.cId = props.webInfoData.data.cId;
    infoData.obActive = props.webInfoData.data.obActive;
    infoData.obAllowCancellation = props.webInfoData.data.obAllowCancellation;
    infoData.obAllowOnSitePayment = props.webInfoData.data.obAllowOnSitePayment;
    infoData.obAllowOnlineConsultation = props.webInfoData.data.obAllowOnlineConsultation;
    infoData.obAppUnit = props.webInfoData.data.obAppUnit;
    infoData.obAppointmentPictures = props.webInfoData.data.obAppointmentPictures;
    infoData.obAutoOpen = props.webInfoData.data.obAutoOpen;
    infoData.obAutomaticallyOpenForTime = props.webInfoData.data.obAutomaticallyOpenForTime;
    infoData.obBookingPrecautions = props.webInfoData.data.obBookingPrecautions;
    infoData.obCancellationDeadlineDays = props.webInfoData.data.obCancellationDeadlineDays;
    infoData.obCustomAppointmentDate = props.webInfoData.data.obCustomAppointmentDate;
    infoData.obEnable = props.webInfoData.data.obEnable;
    infoData.obEnableMultipleBookings = props.webInfoData.data.obEnableMultipleBookings;
    infoData.obEnablePickupTimes = props.webInfoData.data.obEnablePickupTimes;
    infoData.obId = props.webInfoData.data.obId;
    infoData.obLastAppointmentTime = props.webInfoData.data.obLastAppointmentTime;
    infoData.obOpenDaily = props.webInfoData.data.obOpenDaily;
    infoData.obOpenDate = props.webInfoData.data.obOpenDate;
    infoData.obOpenStoreOnlineReservation = props.webInfoData.data.obOpenStoreOnlineReservation;
    infoData.obOpenTime = props.webInfoData.data.obOpenTime;
    infoData.obPersonnelDesignationMethod = props.webInfoData.data.obPersonnelDesignationMethod;
    infoData.obRequireConfirmation = props.webInfoData.data.obRequireConfirmation;
    infoData.obShopPictures = props.webInfoData.data.obShopPictures;
    infoData.obShopPrecautions = props.webInfoData.data.obShopPrecautions;
    infoData.obStartSellingProducts = props.webInfoData.data.obStartSellingProducts;
    infoData.obWebDescription = props.webInfoData.data.obWebDescription;
    infoData.obWebName = props.webInfoData.data.obWebName;
    infoData.obWebsHomePicture = props.webInfoData.data.obWebsHomePicture;
    infoData.managerList = props.webInfoData.data.managerList;
    infoData.productsList = props.webInfoData.data.productsList;
    infoData.serviceList = props.webInfoData.data.serviceList;
    infoData.obBookingPersonnel = props.webInfoData.data.obBookingPersonnel;
    infoData.obServiceItems = props.webInfoData.data.obServiceItems;
    infoData.obShopProduct = props.webInfoData.data.obShopProduct;
    toggleServiceSelection();
    toggleBookingPersonnelSelection();
    toggleShopProductSelection();
});
const fileHomeImage = ((e: any) => {
    const file = e.target.files.item(0);
    let suffixName = file.name.substring(file.name.lastIndexOf('.') + 1);
    if (suffixName !== 'jpg' && suffixName !== 'png' && suffixName !== 'JPG' && suffixName !== 'PNG') {
        Alert.warning("上傳檔案只能是 jpg、png 格式!", 2000);
        return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', (e: any) => {
        let file: any = dataURLtoFile(e.target.result, suffixName);
        cropperData.type = 'home'
        cropperData.width = 800;
        cropperData.height = 800;
        cropperData.imgResult = e.target.result;
        handCropperImgView();
    });
    reader.readAsDataURL(file);
})
const fileShopImage = ((e: any) => {
    const file = e.target.files.item(0);
    let suffixName = file.name.substring(file.name.lastIndexOf('.') + 1);
    if (suffixName !== 'jpg' && suffixName !== 'png' && suffixName !== 'JPG' && suffixName !== 'PNG') {
        Alert.warning("上傳檔案只能是 jpg、png 格式!", 2000);
        return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', (e: any) => {
        let file: any = dataURLtoFile(e.target.result, suffixName);
        cropperData.type = 'shop'
        cropperData.width = 800;
        cropperData.height = 800;
        cropperData.imgResult = e.target.result;
        handCropperImgView();
    });
    reader.readAsDataURL(file);
})
const handCropperImgView = (() => {
    cropperImgUI.value = !cropperImgUI.value;
})
const resImgCropper = ((res: any) => {
    if (res.type == "home") {
        infoData.obWebsHomePicture = res.res
    } else if (res.type == "shop") {
        infoData.obShopPictures = res.res
    }
    handCropperImgView();
})
const handSubmit = () => {

};
const handleSelectionServiceChange = (val: any) => {
    multipleServiceSelection.value = val;
}
</script>

<template>
    <div class="popup-mask" v-on:click.self="handEditWebView('')">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <div class="top-content">
                <img :src="icon_closeX" v-on:click="handEditWebView('')" />
                <span>{{ title }}</span>
                <button class="otherpay-btn" v-on:click="handSubmit()">{{ submitNameBtn }}</button>
            </div>
            <div class="content">
                <div class="tabs-container">
                    <el-tabs v-model="activeName" class="demo-tabs">
                        <el-tab-pane label="基本資訊" name="first">
                            <div class="basic-content">
                                <div class="switch">
                                    <label><input class="mui-switch" type="checkbox"
                                            v-model="infoData.obOpenStoreOnlineReservation"></label>
                                    <div class="switch-content">
                                        <p><strong>開啟商店線上預約</strong></p>
                                        <p>允許後消費者可愛網站上瀏覽及預約項目</p>
                                    </div>
                                </div>
                                <div class="switch">
                                    <label><input class="mui-switch" type="checkbox"
                                            v-model="infoData.obStartSellingProducts"></label>
                                    <div class="switch-content">
                                        <p><strong>開啟販售商品</strong></p>
                                        <p>允許後消費者可在線上店販內瀏覽及購買商品</p>
                                    </div>
                                </div>
                                <div style="margin: 20px 0px;">
                                    <h3 style="margin: 10px 0px;">商店圖片</h3>
                                    <p style="margin: 2px 0px;">展示您的網站首圖，建議尺寸為800px*800px。</p>
                                    <div class="shop-img">
                                        <p>網站首圖</p>
                                        <div class="btn-img">
                                            <label class="button"><span>上傳圖片</span><input class="file-input" type="file"
                                                    @change="fileHomeImage"></label>
                                        </div>
                                    </div>
                                </div>
                                <div style="margin: 20px 0px;">
                                    <h3 style="margin: 2px 0px;">基本資訊</h3>
                                    <p style="margin: 2px 0px;">填寫您的網站基本資訊</p>
                                    <div class="basic-info">
                                        <div class="info-content">
                                            <p>*網站名稱</p>
                                            <input v-model="infoData.obWebName" />
                                        </div>
                                    </div>
                                    <div class="basic-info">
                                        <div class="info-content">
                                            <p>網站說明</p>
                                            <input v-model="infoData.obWebDescription" />
                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <h3>其它</h3>
                                    <hr style=" border-width:1px;">
                                    <div class="switch">
                                        <label><input class="mui-switch" type="checkbox"
                                                v-model="infoData.obAllowOnlineConsultation"></label>
                                        <div class="switch-content">
                                            <p><strong>允許線上諮詢</strong></p>
                                            <p>啟用後，顧客將可透過您提供的社群工具與您聯繫</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="預約服務" name="second">
                            <div class="booking-content">
                                <div style="margin: 20px 0px;">
                                    <h3 style="margin: 2px 0px;">服務事項</h3>
                                    <p style="margin: 2px 0px 20px 0px;">填寫您的服務項目基本資訊</p>
                                    <div class="booking-info">
                                        <p>預約圖片</p>
                                        <input v-model="infoData.obAppointmentPictures" />
                                    </div>
                                    <div class="booking-info">
                                        <p>注意事項</p>
                                        <input v-model="infoData.obBookingPrecautions" />
                                    </div>
                                </div>
                                <div>
                                    <h3>選擇可預約的服務的項目</h3>
                                    <div class="tab">
                                        <el-table ref="multipleServiceTableRef" :data="infoData.serviceList"
                                            style="width: 100%" height="250"
                                            @selection-change="handleSelectionServiceChange"
                                            :header-cell-style="{ background: '#e6e2de' }">
                                            <el-table-column type="selection"></el-table-column>/>
                                            <el-table-column prop="name" label="服務項目" />
                                            <el-table-column prop="price" label="服務價格" width='300' />
                                            <el-table-column prop="servicesTime" label="時間" fixed="right"> <template
                                                    #default="scope">{{ scope.row.servicesTime
                                                    }}分</template></el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <div>
                                    <h3>允許預約人員</h3>
                                    <div class="tab">
                                        <el-table ref="multipleBookingPersonnelTableRef" :data="infoData.managerList"
                                            style="width: 100%" height="250"
                                            :header-cell-style="{ background: '#e6e2de' }">
                                            <el-table-column type="selection" width="55" />
                                            <el-table-column prop="nameView" label="名子" />
                                        </el-table>
                                    </div>
                                </div>
                                <div style="margin: 20px 0px;">
                                    <h3 style="margin: 20px 0px 20px 0px;">線上預約人員選擇</h3>
                                    <div class="booking-info">
                                        <p>人員指定方式</p>
                                        <select style="width: 100%; margin: 0px; border-radius: 0 5px 5px 0;">
                                            <option v-for="item in personnelDesignation" :key="item.value"
                                                :value="item.value">
                                                {{ item.text }}</option>
                                        </select>
                                    </div>
                                    <p style="text-align: right;">顧客無法選擇人員，系統將隨機指派設計師。</p>
                                </div>
                                <div style="margin: 20px 0px 50px 0px;">
                                    <h3 style="margin: 20px 0px 20px 0px;">其它設定</h3>
                                    <div class="booking-info" style="background-color: #ffffff;">
                                        <p>顧客最晚須提早</p>
                                        <select v-model="infoData.obLastAppointmentTime">
                                            <option v-for="item in timer" :key="item.value" :value="item.value">
                                                {{ item.text }}</option>
                                        </select>
                                        <p>才能預約。</p>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="商品銷售" name="third">
                            <div class="goods-content">
                                <div class="switch">
                                    <label><input class="mui-switch" type="checkbox"
                                            v-model="infoData.obEnablePickupTimes"></label>
                                    <div class="switch-content">
                                        <p><strong>啟用取貨時間</strong></p>
                                        <p>啟用後，消費者線上購物結帳時需選擇取貨時間</p>
                                    </div>
                                </div>
                                <div style="margin: 20px 0px;">
                                    <h3 style="margin: 2px 0px;">飯店事項</h3>
                                    <p style="margin: 2px 0px;">填寫您的線上店販基本資訊</p>
                                    <div class="goods-info">
                                        <p>店販圖片</p>
                                        <div class="btn-img">
                                            <label class="button"><span>上傳圖片</span><input class="file-input" type="file"
                                                    @change="fileShopImage"></label>
                                        </div>
                                    </div>
                                    <div class="goods-info">
                                        <p>注意事項</p>
                                        <input v-model="infoData.obShopPrecautions" />
                                    </div>
                                </div>
                                <div>
                                    <h3>選擇可販售的項目</h3>
                                    <div class="tab">
                                        <el-table ref="multipleShopProductTableRef" :data="infoData.productsList"
                                            style="width: 100%" height="250"
                                            :header-cell-style="{ background: '#e6e2de' }">
                                            <el-table-column type="selection" width="55" />
                                            <el-table-column prop="pName" label="商品項目" />
                                            <el-table-column prop="pPrice" label="商品價格" width='300' />
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>

            </div>
        </div>
    </div>
    <CropperImg-UI v-if="cropperImgUI" :cropperData="cropperData" :handCropperImgView="handCropperImgView"
        @handCropperSubmit="resImgCropper" />
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

        ::placeholder {
            color: #d3d3d3;
        }

        .top-content {
            display: flex;
            height: 70px;
            // border: solid 1px #ddd;
            box-sizing: border-box;

            >span {
                display: flex;
                width: calc(100%);
                justify-content: center;
                align-items: center;
                font-size: 28px;
                height: 70px;
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



        >.content {
            height: calc(100% - 70px);
            color: #717171;
            display: flex;

            .tabs-container {
                width: 100%;
                display: flex;
                justify-content: center;
                font-family: HeitiTC;

                .el-tabs {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                }

                ::v-deep(.el-tabs__header) {
                    font-family: HeitiTC;
                    margin: 0px;
                }

                ::v-deep(.el-tabs__item) {
                    font-family: HeitiTC;
                    font-size: 22px;
                }

                ::v-deep(.el-tabs__content) {
                    overflow: auto;
                }

                ::v-deep(.el-tabs__nav-scroll) {
                    display: flex;
                    justify-content: center;
                }


            }

            .basic-content {
                display: flex;
                flex-direction: column;
                margin: 0 80px;
                overflow: auto;
            }

            .goods-content {
                display: flex;
                flex-direction: column;
                margin: 0 80px;
                overflow: auto;
            }

            .booking-content {
                display: flex;
                flex-direction: column;
                margin: 0 80px;
                overflow: auto;
            }

            .switch {
                display: flex;
                align-items: center;
                width: 90%;

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

            .shop-img {
                display: flex;
                border: solid 0.5px #a19f9f;
                border-radius: 5px 5px 5px 5px;
                text-align: left;
                background: #e6e2de;

                P {
                    width: 20%;
                    margin: 20px 10px;
                }

                .btn-img {
                    position: relative;
                    border-left: solid 0.5px #a19f9f;
                    border-radius: 0px 5px 5px 0px;
                    background-color: #ffffff;
                    flex: 1;
                    margin: 0 0;
                    display: flex;
                    align-items: center;

                    .file-input {
                        display: none;
                    }
                }
            }

            .goods-info {
                display: flex;
                border: solid 0.5px #a19f9f;
                border-radius: 5px 5px 5px 5px;
                text-align: left;
                background: #e6e2de;
                margin-top: 2px;

                P {
                    width: 20%;
                    margin: 20px 10px;
                }

                .btn-img {
                    position: relative;
                    border-left: solid 0.5px #a19f9f;
                    border-radius: 0px 5px 5px 0px;
                    background-color: #ffffff;
                    flex: 1;
                    margin: 0 0;
                    display: flex;
                    align-items: center;

                    .file-input {
                        display: none;
                    }
                }

                input {
                    position: relative;
                    border: transparent;
                    border-left: solid 0.5px #a19f9f;
                    border-radius: 0px 5px 5px 0px;
                    background-color: #ffffff;
                    flex: 1;
                    margin: 0 0;
                }
            }

            .booking-info {
                display: flex;
                border: solid 0.5px #a19f9f;
                border-radius: 5px 5px 5px 5px;
                text-align: left;
                background: #e6e2de;
                margin-top: 2px;

                P {
                    width: 20%;
                    margin: 20px 10px;
                }

                .btn-img {
                    position: relative;
                    border-left: solid 0.5px #a19f9f;
                    border-radius: 0px 5px 5px 0px;
                    background-color: #ffffff;
                    flex: 1;
                    margin: 0 0;
                    display: flex;
                    align-items: center;

                    .file-input {
                        display: none;
                    }
                }

                input {
                    position: relative;
                    border: transparent;
                    border-left: solid 0.5px #a19f9f;
                    border-radius: 0px 5px 5px 0px;
                    background-color: #ffffff;
                    flex: 1;
                    margin: 0 0;
                }

                select {
                    margin: 0px 10px;
                    background-color: #faf9f8;
                    border: transparent;
                }
            }

            .info-content {
                display: flex;
                border: solid 0.5px #a19f9f;
                border-radius: 5px 5px 5px 5px;
                text-align: left;
                background: #e6e2de;
                margin-top: 2px;

                P {
                    width: 20%;
                    margin: 20px 10px;
                }

                input {
                    position: relative;
                    border: transparent;
                    border-radius: 0px 5px 5px 0px;
                    border-left: solid 0.5px #a19f9f;
                    background-color: #ffffff;
                    flex: 1;
                    margin: 0 0;
                }
            }
        }
    }
}
</style>