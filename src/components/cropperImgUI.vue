<script setup lang="ts">
import icon_closeX from "@/assets/images/icon_closeX.png";
import { ref } from "vue";
import { VueCropper } from "vue-cropper";
import { ElButton } from "element-plus";
const props = defineProps<{
    cropperData: any,
    handCropperImgView: Function,
}>();
const emits = defineEmits<{
    (e: "handCropperSubmit", data: any): void;
}>();
const imageUrl = ref()
const cropper = ref()

onMounted(() => {
    imageUrl.value = props.cropperData.imgResult;
});
const handleCropping = ((roleRefs: any) => {
    roleRefs.getCropData((res: any) => {
        let val: any = {
            type: props.cropperData.type,
            res: res
        }
        emits("handCropperSubmit", val);
    });
})
</script>

<template>
    <div class="popup-mask">
        <!-- 提示弹窗 -->
        <div class="popup-content">
            <div class="top-content">
                <img :src="icon_closeX" v-on:click="props.handCropperImgView()" />
                <span></span>
                <ElButton class="otherpay-btn" type="primary" @click="handleCropping($refs.cropper)">截圖</ElButton>
            </div>
            <div class="content">
                <VueCropper ref="cropper" :img=imageUrl :autoCrop=true :autoCropWidth=props.cropperData.width
                    :autoCropHeight=props.cropperData.height :canMove=false :centerBox=true>
                </VueCropper>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 3;
    background: rgba(255, 255, 255, 0.5);

    display: flex;
    align-items: center;
    justify-content: space-around;

    .popup-content {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        font-size: 20px;
        font-family: HeitiTC;
        color: #84715c;
        font-weight: bold;

        .top-content {
            display: flex;
            height: 70px;
            border: solid 1px #ddd;
            box-sizing: border-box;

            >span {
                display: flex;
                width: calc(100%);
                justify-content: center;
                align-items: center;
                font-size: 28px;
                height: 70px;
                // height: 100px;
                justify-content: center;
            }

            >img {
                position: absolute;
                width: 41px;
                height: 38px;
                top: 15px;
                left: 15px;
            }

            >button {
                position: absolute;
                width: 150px;
                height: 50px;
                top: 10px;
                right: 10px;
                border-radius: 5px;
                border: none;
                background-color: #84715c;
                color: #fff;
            }
        }

        .content {
            position: absolute;
            top: 70px;
            bottom: 0px;
            right: 0px;
            left: 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: solid 1px #ddd;
            margin: 10px 10px;
            overflow: auto;
        }

    }
}
</style>