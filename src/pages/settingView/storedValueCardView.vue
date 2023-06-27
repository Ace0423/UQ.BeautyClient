<script setup lang="ts">

</script>
<template>
    <div class="content">
        <div class="nav">
            <select>
                <option>所有狀態</option>
                <option>啟用中</option>
                <option>已失效</option>
            </select>
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
        height: 45px;

        >select {
            margin: 5px 0;
            min-width: 110px;
            background: transparent;
            border-radius: 5px;
            border: solid 0.5px #707070;
            box-sizing: border-box;
        }
    }
}
</style>