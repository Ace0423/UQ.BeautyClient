<script setup lang="ts">
import router from "@/router";
const routerArr = ["myMessageView", "systemMessageView", "sendingRecordView"];
const route = useRoute();
const idx = ref(0);
watch(
    () => route.path,
    () => {
        routerArr.forEach((item, index) => {
            const rp = route.path.substring(1).split("/")[2];
            if (rp === item) {
                idx.value = index;
            }
        })
    }
);
onMounted(() => {

})
</script>
<template>
    <div class="content">
        <div class="nav">
            <router-link to="/settingView/messageManagerView/myMessageView" :class="{ active: idx == 0 }">我的訊息</router-link>
            <router-link to="/settingView/messageManagerView/systemMessageView"
                :class="{ active: idx == 1 }">系統訊息</router-link>
            <router-link to="/settingView/messageManagerView/sendingRecordView/myMessageView"
                :class="{ active: idx == 2 }">發送紀錄</router-link>
        </div>
        <router-view />
    </div>
</template>

<style lang="scss" scoped>
.content {
    display: flex;
    position: absolute;
    top: 80px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: 2px 40px;
    border-top: 1px solid #c1bdb8;

    >.nav {
        // display: flex;
        justify-content: center;
        width: 20%;
        border-right: 1px solid #c1bdb8;

        >a {
            border: none;
            width: 95%;
            height: 45px;
            margin-top: 3px;
            // border-radius: 10px 10px 0 0;
            // background-color: #faf9f8;
            font-size: 20px;
            font-weight: bold;
            font-family: HeitiTC;
            color: #717171;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: left;

            &.active {
                color: #000000;
                background-color: #faf9f8;
            }

            // a:link {
            //     color: #717171;
            // }

            // a:visited {
            //     color: #717171;
            // }

            // a:hover {
            //     color: #717171;
            // }

            // >.router-link-exact-active {
            //     background-color: #faf9f8;
            // }
        }

        // >.router-link-exact-active {
        //     color: #000000;
        //     background-color: #faf9f8;
        // }

    }
}
</style>