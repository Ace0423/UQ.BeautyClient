<script setup lang="ts">
import logoImg from "@/assets/images/logo.png";
import appointmentImg from "@/assets/Icon awesome-calendar-check.svg";
import commodityImg from "@/assets/Icon awesome-shopping-bag.svg";
import courseImg from "@/assets/Icon awesome-spa.svg";
import settingImg from "@/assets/Icon material-settings.svg";
import orderImg from "@/assets/Icon metro-shop.svg";
import customerImg from "@/assets/Icon zocial-guest.svg";



</script>

<template>
    <div class="sideBar">
        <img :src="logoImg" />
        <ul class="nav">
            <li><img :src="customerImg" /><router-link to="/memberView">顧客管理</router-link></li>
            <li><img :src="courseImg" /><router-link to="/courseView">課程管理</router-link></li>
            <li><img :src="appointmentImg" /><router-link to="/appointmentView">預約紀錄</router-link></li>
            <!-- <li><img :src="orderImg" /><router-link to="/orderView">訂單紀錄</router-link></li>
                <li><img :src="commodityImg" /><router-link to="/commodityView">商品管理</router-link></li>
                <li><img :src="settingImg" /><router-link to="/settingView">設定</router-link></li> -->
        </ul>
    </div>
</template>

<style scoped lang='scss'>
.sideBar {
    top: 0;
    width: 259px;
    height: 100vh;
    background-color: #fff;
    border: solid 1px #707070;
    box-sizing: border-box;

    >img {
        width: 100%;
    }

    >.nav {
        padding-left: 15px;

        >li {
            font-family: STXihei;
            font-size: 20px;
            color: #707070;
            display: flex;
            align-items: center;
            // padding-left: 10;

            >img {
                padding: 20px;
                width: 25px;
                height: 25px;
            }

            >a {
                text-decoration: none;
                color: #707070;
            }

            >a:visited {
                text-decoration: none;
                color: #707070;
            }

            >.router-link-active {
                text-decoration: none;
                color: #707070;
            }
        }
    }
}
</style>
