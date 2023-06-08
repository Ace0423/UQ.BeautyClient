<script setup lang="ts">
import router from "@/router";
onMounted(() => {

})
</script>
<template>
    <div class="content">
        <div class="nav">
            <router-link to="/settingView/userManagerView/managerView">使用者</router-link>
            <router-link to="/settingView/userManagerView/scheduleView">排班</router-link>
            <router-link to="/settingView/userManagerView/permissionsView">權限</router-link>
        </div>
        <router-view />
    </div>
</template>

<style lang="scss" scoped>
.content {
    position: absolute;
    top: 80px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: 2px 40px;

    >.nav {
        display: flex;
        // pointer-events: none;

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

        >.router-link-exact-active {
            background-color: #e6e2de;
        }

    }
}
</style>