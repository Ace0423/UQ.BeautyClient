<script setup lang="ts">
import { onMounted } from 'vue';
const timer: any = [{ value: 30, text: '30分鐘' }, { value: 60, text: '60分鐘' }, { value: 90, text: '90分鐘' }, { value: 120, text: '120分鐘' },]
const timeVal = ref(30)
onMounted(() => {

})
</script>
<template>
    <div class="wrap">
        <div class="content">
            <div class="section-description">
                <p>調整商店網站及服務人員網站可預約時間。</p>
                <p>可預約時間與人員排班有關聯，人員未排班時間網站上不會顯示時間選項。</p>
            </div>
            <div class="time-unit">
                <p>線上營業時間的預約單位以</p>
                <select v-model="timeVal">
                    <option v-for="item in timer" :key="item.value" :value="item.value">
                        {{ item.text }}</option>
                </select>
                <p>為一個間隔</p>
            </div>
            <div class="time-tab">
                <div class="info-tab">
                    <div class="check-box">
                        <input type="checkbox">
                        <p>週日</p>
                    </div>
                    <div>
                        不提供預約
                    </div>
                </div>
                <div class="info-tab">
                    <div class="check-box">
                        <input type="checkbox">
                        <p>週日</p>
                    </div>
                    <div>
                        不提供預約
                    </div>
                </div>
                <div class="info-tab">
                    <div class="check-box">
                        <input type="checkbox">
                        <p>週日</p>
                    </div>
                    <div>
                        不提供預約
                    </div>
                </div>
                <div class="info-tab">
                    <div class="check-box">
                        <input type="checkbox">
                        <p>週日</p>
                    </div>
                    <div>
                        不提供預約
                    </div>
                </div>
                <div class="info-tab">
                    <div class="check-box">
                        <input type="checkbox">
                        <p>週日</p>
                    </div>
                    <div>
                        不提供預約
                    </div>
                </div>
                <div class="info-tab">
                    <div class="check-box">
                        <input type="checkbox">
                        <p>週日</p>
                    </div>
                    <div>
                        不提供預約
                    </div>
                </div>

                <div class="info-tab">
                    <div class="check-box">
                        <input type="checkbox">
                        <p>週日</p>
                    </div>
                    <div>
                        不提供預約
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-block">
            <button>取消變更</button>
            <button>儲存變更</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrap {
    position: absolute;
    top: 50px;
    bottom: 0px;
    left: 0px;
    right: 0px;

    >.content {
        overflow: auto;
        position: absolute;
        top: 0px;
        bottom: 60px;
        left: 0px;
        right: 0px;

        >.section-description {
            color: #717171;
            margin: 0px 10px;
            height: 60px;
        }

        >.time-unit {
            margin: 10px 10px;
            padding: 0px 10px;
            height: 60px;
            display: flex;
            align-items: center;
            border: solid 1px #c1bdb8;
            padding: 0px 10px;
            border-radius: 5px;

            select {
                margin: 0px 10px;
                height: 80%;
                background-color: #faf9f8;
                border: transparent;
            }
        }

        >.time-tab {
            margin: 0px 10px;
            border: solid 1px #c1bdb8;
            padding: 0px 10px;
            border-radius: 5px;

            >.info-tab {
                display: flex;
                align-items: center;
                border-bottom: solid 1px #c1bdb8;

                &:last-child {
                    border-bottom: none;
                }

                >.check-box {
                    width: 15%;
                    display: flex;
                    border-right: solid 1px #c1bdb8;

                    input {
                        width: 20px;
                        margin-right: 10px;
                    }


                }
            }
        }
    }

    >.bottom-block {
        position: absolute;
        bottom: 0px;
        height: 60px;
        left: 0px;
        right: 0px;
        display: flex;
        align-items: center;
        justify-content: end;
        border-top: 1px solid #c1bdb8;

        button {
            height: 70%;
            margin: 0 10px;
            border: transparent;
            border-radius: 3px;
        }
    }
}
</style>