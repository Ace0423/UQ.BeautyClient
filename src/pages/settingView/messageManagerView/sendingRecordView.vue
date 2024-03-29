<script setup lang="ts">
import Icon from "@/assets/Icon material-settings.svg";

const aaa = ref();
onMounted(() => {
})
const openPage = ()=>{
    window.open('https://manager.line.biz/')
}
</script>
<template>
    <div class="container">
        <div class="points">
            <div class="text-point">
                <div>
                    <p>簡訊發送點數</p>
                    <p>0</p>
                </div>
                <button >前往儲值中心</button>
            </div>
            <div class="line-point">
                <p>LINE點數請前往你的LINE...</p>
                <button @click="openPage()">LINE點數儲值</button>
            </div>
        </div>
        <div class="item-tab">
            <div class="nav">
                <router-link to="/settingView/messageManagerView/sendingRecordView/myMessageView">我的訊息</router-link>
                <router-link to="/settingView/messageManagerView/sendingRecordView/systemMessageView">系統訊息</router-link>
            </div>
            <router-view />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    position: relative;
    width: 100%;

    >.points {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        margin: 10px 0px;

        >.text-point {
            width: 48%;
            background-color: #faf9f8;
            border-radius: 15px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            button {
                border-radius: 6px;
                min-width: 100px;
                height: 55%;
                border: solid 2px #84715c;
                background-color: transparent;

                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 10px;
                color: #84715c;

            }
        }

        >.line-point {
            width: 48%;
            background-color: #faf9f8;
            border-radius: 15px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            button {
                border-radius: 6px;
                min-width: 100px;
                height: 55%;
                border: transparent;
                background-color: #00B900;

                // font-weight: bold;
                // display: flex;
                // justify-content: center;
                // align-items: center;
                padding: 0 10px;
                color: #ffffff;

            }
        }
    }

    >.item-tab {
        position: absolute;
        top: 112px;
        right: 0px;
        left: 15px;
        bottom: 0px;
        // border-bottom: solid 1px #c1bdb8;

        >.nav {
            display: flex;
            border-bottom: solid 1px #c1bdb8;

            >a {
                border: none;
                width: 120px;
                height: 45px;
                border-radius: 10px 10px 0 0;
                // background-color: #faf9f8;
                // text-decoration:underline;
                // text-underline-offset:13px;
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

            >.router-link-exact-active {
                // background-color: #e6e2de;
                color: #000000;
                border-bottom: solid 1px #000000;
            }
        }
    }
}
</style>