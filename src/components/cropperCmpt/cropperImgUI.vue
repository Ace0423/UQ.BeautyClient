<script setup lang="ts">
const props = defineProps<{
    companyInfoData: any,
    handCropper: Function,
}>();

onMounted(() => {

});
</script>

<template>
    <div class="alert-mask">
    </div>
</template>

<style scoped lang="scss">
.alert-mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    // background: rgba(255, 255, 255, 0.5);

    display: flex;
    align-items: center;
    justify-content: space-around;

    .alert-content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 20%;
        height: 25%;
        text-align: center;
        background-color: #e6e2de;
        font-size: 20px;
        font-family: HeitiTC;
        color: #84715c;
        font-weight: bold;
        border: solid 1px #707070;
        min-width: 250px;

        >h1 {
            font-size: 25px;
        }

        >.alert-btn {
            >button {
                margin: 0 10px;
                min-width: 70px;
                border-radius: 10px;
                border: solid 1px #707070;
                background-color: white;
                color: #84715c;
            }
        }
    }
}
</style>