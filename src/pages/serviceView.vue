<template>
    <div class="service_div">
        <Header :moduleType="'服務管理'" :Icon="Icon" :memuState="props.memuState" :handmemuStateBtn="props.handmemuStateBtn">
        </Header>
        <div class="content">
            <div class="nav">
                <router-link to="/serviceView/servicePage">全部</router-link>
                <router-link to="/serviceView/groupPage">群組</router-link>
            </div>
            <router-view />
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import Icon from "@/assets/Icon awesome-spa.svg";
let serviceTab = ["全部", "群組"]
const props = defineProps<{
    memuState: any;
    handmemuStateBtn: Function;
}>();

onMounted(() => {
    
});

</script>
  
<style lang="scss" scoped>
.service_div {
    position: relative;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

    .content {
        position: absolute;
        top: 80px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: 2px 40px;


        >.nav {
            display: flex;

            >a {
                border: none;
                width: 120px;
                height: 45px;
                border-radius: 10px 10px 0 0;
                background-color: #faf9f8;
                font-size: 20px;
                font-weight: bold;
                font-family: HeitiTC;
                color: #717171;
                display: flex;
                justify-content: center;
                align-items: center;

                a:link {
                    color: #717171;
                }

                a:visited {
                    color: #717171;
                }

                a:hover {
                    color: #717171;
                }

                >.router-link-exact-active {
                    background-color: #e6e2de;
                }
            }

            >a.active {
                background-color: #e6e2de;
            }

            >.router-link-exact-active {
                background-color: #e6e2de;
            }
        }
    }
}
</style>