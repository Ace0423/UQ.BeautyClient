<template>
    <div class="order-div">
        <Header :moduleType="'訂單紀錄'" :Icon="Icon" :memuState="props.memuState" :handmemuStateBtn="props.handmemuStateBtn">
        </Header>
        <div class="content">
            <!-- <div class="nav">
                <router-link to="/orderRecordView/transactionPage">交易紀錄</router-link>
            </div> -->
            <router-view />
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import Icon from "@/assets/Icon awesome-spa.svg";
const props = defineProps<{
    memuState: any;
    handmemuStateBtn: Function;
}>();

onMounted(() => {
    
});

</script>
  
<style lang="scss" scoped>
.order-div {
    position: relative;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

    .content {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        // margin: 2px 40px;


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