<script setup lang="ts">
import appointmentImg from "@/assets/Icon awesome-calendar-check.svg";
import commodityImg from "@/assets/Icon awesome-shopping-bag.svg";
import courseImg from "@/assets/Icon awesome-spa.svg";
import settingImg from "@/assets/Icon material-settings.svg";
import orderImg from "@/assets/Icon metro-shop.svg";
import customerImg from "@/assets/Icon zocial-guest.svg";

</script>

<template>
    <div class="popup-mask">
        <div>
            <router-link class="router-btn" to="/memberView">
                <img :src="customerImg" />
                <p>顧客管理</p>
            </router-link>
            <router-link class="router-btn" to="/settingView/goodsMgmt/goodsPage">
                <img :src="commodityImg" />
                <p>商品管理</p>
            </router-link>
            <router-link class="router-btn" to="/courseView">
                <img :src="courseImg" />
                <p>課程管理</p>
            </router-link>
            <router-link class="router-btn" to="/appointmentView">
                <img :src="appointmentImg" />
                <p>預約紀錄</p>
            </router-link>
            <router-link class="router-btn" to="/orderView">
                <img :src="orderImg" />
                <p>訂單紀錄</p>
            </router-link>
            <router-link class="router-btn" to="/settingView">
                <img class="" :src="settingImg" />
                <p>設定</p>
            </router-link>
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
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-around;

    >div {
        max-width: 800px;
        width: 80%;
        height: 80%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;

        >.router-btn {
            width: 195px;
            height: 190px;
            max-width: 195px;
            max-height: 190px;
            margin: 10px;
             color: #707070;
            border: solid 1px #707070;
            background-color: #e6e2de;
            justify-content: center;
            align-items: center;
            text-align: center;

            >img {
                padding-top: 15%;
                width: 50%;
                height: 50%;
            }
        }
    }

}
</style>