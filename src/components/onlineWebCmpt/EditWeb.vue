<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import { storeToRefs } from "pinia";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { usePriceStore } from "@/stores/priceStore";
import type { TabsPaneContext } from 'element-plus'
const priceStore = usePriceStore();
const { getTopUpCardList, addTopUpCardInfo, editTopUpCardInfo } = priceStore;
const submitNameBtn = ref('確認');
const title = ref("");
const activeName = ref('first')
const timer: any = [{ value: 0, text: '1小時' }, { value: 1, text: '1天' }, { value: 2, text: '1周' }]
const handleClick = (tab: TabsPaneContext, event: Event) => {
  
}



const props = defineProps<{
    webItem: any;
    handEditWebView: Function;
}>();

onMounted(() => {

});

const handSubmit = () => {

};

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
                    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane label="基本資訊" name="first">
                            <div class="basic-content">
                                <div class="switch">
                                    <label><input class="mui-switch" type="checkbox"></label>
                                    <div class="switch-content">
                                        <p><strong>開啟商店線上預約</strong></p>
                                        <p>允許後消費者可愛網站上瀏覽及預約項目</p>
                                    </div>
                                </div>
                                <div class="switch">
                                    <label><input class="mui-switch" type="checkbox"></label>
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
                                            <p>上傳圖片</p>
                                        </div>
                                    </div>
                                </div>
                                <div style="margin: 20px 0px;">
                                    <h3 style="margin: 2px 0px;">基本資訊</h3>
                                    <p style="margin: 2px 0px;">填寫您的網站基本資訊</p>
                                    <div class="basic-info">
                                        <div class="info-content">
                                            <p>*網站名稱</p>
                                            <input />
                                        </div>
                                    </div>
                                    <div class="basic-info">
                                        <div class="info-content">
                                            <p>網站說明</p>
                                            <input />
                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <h3>其它</h3>
                                    <hr style=" border-width:1px;">
                                    <div class="switch">
                                        <label><input class="mui-switch" type="checkbox"></label>
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
                                        <input />
                                    </div>
                                    <div class="booking-info">
                                        <p>注意事項</p>
                                        <input />
                                    </div>
                                </div>
                                <div>
                                    <h3>選擇可預約的服務的項目</h3>
                                    <div class="tab">
                                        <el-table style="width: 100%" :header-cell-style="{ background: '#e6e2de' }">
                                            <el-table-column prop="name" label="" />
                                            <el-table-column prop="price" label="商品項目" />
                                            <el-table-column prop="quantityPct" label="商品價格" width='300' />
                                            <el-table-column prop="quantity" label="" fixed="right" />
                                        </el-table>
                                        <el-button class="mt-4" style="width: 100%; border: transparent;">加入服務項目</el-button>
                                    </div>
                                </div>
                                <div>
                                    <h3>允許預約人員</h3>
                                    <div class="tab">
                                        <el-table ref="multipleTableRef" style="width: 100%"
                                            :header-cell-style="{ background: '#e6e2de' }">
                                            <el-table-column type="selection" width="55" />
                                            <el-table-column label="列表">
                                                <template #default="scope">{{ scope.row.date }}</template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <div style="margin: 20px 0px;">
                                    <h3 style="margin: 20px 0px 20px 0px;">線上預約人員選擇</h3>
                                    <div class="booking-info">
                                        <p>人員指定方式</p>
                                        <input />
                                    </div>
                                    <p style="text-align: right;">顧客無法選擇人員，系統將隨機指派設計師。</p>
                                </div>
                                <div style="margin: 20px 0px 50px 0px;">
                                    <h3 style="margin: 20px 0px 20px 0px;">其它設定</h3>
                                    <div class="booking-info" style="background-color: #ffffff;">
                                        <p>顧客最晚須提早</p>
                                        <select>
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
                                    <label><input class="mui-switch" type="checkbox"></label>
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
                                            <p>上傳圖片</p>
                                        </div>
                                    </div>
                                    <div class="goods-info">
                                        <p>注意事項</p>
                                        <input />
                                    </div>
                                </div>
                                <div>
                                    <h3>選擇可販售的項目</h3>
                                    <div class="tab">
                                        <el-table style="width: 100%" :header-cell-style="{ background: '#e6e2de' }">
                                            <el-table-column prop="name" label="" />
                                            <el-table-column prop="price" label="商品項目" />
                                            <el-table-column prop="quantityPct" label="商品價格" width='300' />
                                            <el-table-column prop="quantity" label="" fixed="right" />
                                        </el-table>
                                        <el-button class="mt-4"
                                            style="width: 100%; border: transparent;">加入可販售項目</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
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