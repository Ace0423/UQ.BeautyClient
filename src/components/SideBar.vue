<script setup lang="ts">
import logoImg from "@/assets/images/logo.png";
import appointmentImg from "@/assets/Icon awesome-calendar-check.svg";
import commodityImg from "@/assets/Icon awesome-shopping-bag.svg";
import courseImg from "@/assets/Icon awesome-spa.svg";
import settingImg from "@/assets/Icon material-settings.svg";
import orderImg from "@/assets/Icon metro-shop.svg";
import customerImg from "@/assets/Icon zocial-guest.svg";
onMounted(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
})

</script>

<template>
    <div class="sideBar">
        <img :src="logoImg" />
        <diV class="nav">
            <ul>
                <li><img :src="customerImg" /><router-link to="/memberView">顧客管理</router-link></li>
                <li><img :src="courseImg" /><router-link to="/courseView">課程管理</router-link></li>
                <li><img :src="appointmentImg" /><router-link to="/">預約紀錄</router-link></li>
                <!-- <li><img :src="orderImg" /><router-link to="/orderView">訂單紀錄</router-link></li>
                    <li><img :src="commodityImg" /><router-link to="/commodityView">商品管理</router-link></li>
                    <li><img :src="settingImg" /><router-link to="/settingView">設定</router-link></li> -->
            </ul>
        </diV>

    </div>
</template>

<style scoped lang='scss'>
.sideBar {
    top: 0;
    width: 259px;
    min-width: 180px;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    background-color: #fff;
    border: solid 1px #707070;
    box-sizing: border-box;

    >img {
        width: 100%;
    }

    >.nav {
        // padding-left: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;

        >ul {
            padding: 0 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;

            >li {
                font-family: STXihei;
                font-size: 20px;
                color: #707070;
                display: flex;
                align-items: center;
                padding-left: 15px;

                >img {
                    padding: 15px;
                    width: 30px;
                    height: 30px;
                }

                >a {
                    text-decoration: none;
                    color: #707070;
                }

                >.router-link-active {
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
