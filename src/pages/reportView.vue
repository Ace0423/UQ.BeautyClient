<script setup lang="ts">
import Icon from "@/assets/file-text-fill.svg";
import zhCn from 'element-plus/es/locale/lang/zh-cn';
const route = useRoute();
const props = defineProps<{
    memuState: any;
    handmemuStateBtn: Function;
}>();
const idx = ref(0);
const routerArr = ["realTimeView", "businessView"];
const uId = ref();
const navItem = () => {
    routerArr.forEach((item, index) => {
        const rp = route.path.substring(1).split("/")[1];
        if (rp === item) {
            idx.value = index;
        }
    })
}
const headWitchBox = (val: any) => {
    idx.value = val;
}
onMounted(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    navItem();
})
</script>
<template>
    <div class="container">
        <Header :Icon="Icon" :moduleType="'報表分析'" :memuState="props.memuState" :handmemuStateBtn="props.handmemuStateBtn">
        </Header>
        <div class="wrap">
            <div class="nav">
                <div class="item-tab">
                    <router-link to="/reportView/realTimeView" :class="{ active: idx == 0 }"
                        @click="headWitchBox(0)">即時分析</router-link>
                    <router-link to="/reportView/businessView" :class="{ active: idx == 1 }"
                        @click="headWitchBox(1)">營業報表</router-link>
                </div>
            </div>
            <router-view />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    position: relative;

    >.wrap {
        position: absolute;
        top: 80px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        overflow: auto;

        >.nav {
            position: absolute;
            top: 0px;
            left: 40px;
            display: flex;

            >.item-tab {
                display: flex;
                background-color: #faf9f8;
                border-radius: 6px;

                >a {
                    border: none;
                    width: 95%;
                    height: 45px;
                    margin: 5px 6px;
                    font-size: 20px;
                    font-weight: bold;
                    font-family: HeitiTC;
                    color: #717171;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: left;
                    padding: 0 10px;
                    border-radius: 3px;

                    &.active {
                        color: #000000;
                        background-color: #ffffff;
                    }
                }
            }

         
        }
    }


}</style>