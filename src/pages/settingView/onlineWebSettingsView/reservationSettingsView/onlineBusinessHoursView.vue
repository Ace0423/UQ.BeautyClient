<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useCompanyStore } from "@/stores/company";
import { useCounterStore } from "@/stores/counter";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const companyStore = useCompanyStore();
const { getOnlineBusinessHours, postOnlineBusinessHours } = companyStore;
const { onlineBusinessHoursList } = storeToRefs(companyStore);
const timer: any = [{ value: 30, text: '30分鐘' }, { value: 60, text: '60分鐘' }, { value: 90, text: '90分鐘' }, { value: 120, text: '120分鐘' }]
const dayOfWeek: any = [{ value: 0, text: '週日' }, { value: 1, text: '週一' }, { value: 2, text: '週二' }, { value: 3, text: '週三' }, { value: 4, text: '週四' }, { value: 5, text: '週五' }, { value: 6, text: '週六' },]
const businessHoursData: any = reactive({ data: [] });
const businessHoursList = computed(() => {
    businessHoursData.data = JSON.parse(JSON.stringify(onlineBusinessHoursList.value.data));
    return businessHoursData.data;
})
onMounted(() => {
    getOnlineBusinessHours()
        .then((res:any) => {
            if (res.state == 2) {
                Alert.warning(showErrorMsg(res.msg), 2000);
            }
        })
        .catch((e: any) => {
            Alert.warning(showHttpsStatus(e.response.status), 2000);
            if (e.response.status == 401) {
                setTimeout(() => {
                    handLogOut();
                }, 2000);
            }
        })
})
const handCheckBox = (item: any) => {
    item.wbAcceptApp = !item.wbAcceptApp;
}
const handAaddRestTime = (data: any) => {
    let restVal = {
        start: '12:00:00',
        end: '13:00:00'
    }
    data.wbUnavailPeriods.push(restVal);
}
const handDelRestTime = (data: any, index: any) => {
    data.wbUnavailPeriods.splice(index, 1);
}
const handCancel = (() => {
    businessHoursData.data = JSON.parse(JSON.stringify(onlineBusinessHoursList.value.data));
});
const handSubmit = () => {
    postOnlineBusinessHours(businessHoursData.data)
        .then((res:any) => {
            if (res.state == 1) {
                Alert.warning("修改成功", 2000);
            }
            if (res.state == 2) {
                Alert.warning(showErrorMsg(res.msg), 2000);
            }
        })
        .catch((e: any) => {
            Alert.warning(showHttpsStatus(e.response.status), 2000);
            if (e.response.status == 401) {
                setTimeout(() => {
                    handLogOut();
                }, 2000);
            }
        })
};
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
                <select v-model="businessHoursList.wbAppUnit">
                    <option v-for="item in timer" :key="item.value" :value="item.value">
                        {{ item.text }}</option>
                </select>
                <p>為一個間隔</p>
            </div>
            <div class="time-tab">
                <div class="info-tab" v-for="item in businessHoursList.data" :key="item.wbId">
                    <div class="businessHours-block">
                        <div class="check-box">
                            <input type="checkbox" :checked="item.wbAcceptApp" v-on:change="handCheckBox(item)">
                            <p>{{ dayOfWeek[item.wbDayOfWeek].text }}</p>
                        </div>
                        <div v-if="item.wbAcceptApp" class="hours-info">
                            <div>
                                <input type="time" v-model="item.wbStartTime"> - <input type="time"
                                    v-model="item.wbEndTime">
                            </div>
                            <button v-if="item.wbUnavailPeriods.length < 1" @click="handAaddRestTime(item)">加入休息時間</button>
                        </div>
                        <div v-if="!item.wbAcceptApp">
                            <p>不提供預約</p>
                        </div>
                    </div>
                    <div v-for="i, index in item.wbUnavailPeriods" :key="index" class="businessHours-block">
                        <div class="check-box">
                            <p>休息時間</p>
                        </div>
                        <div class="hours-info">
                            <div>
                                <input type="time" v-model="i.start"> - <input type="time" v-model="i.end">
                            </div>
                            <button @click="handDelRestTime(item, index)">刪除</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-block">
            <button v-on:click="handCancel()">取消變更</button>
            <button v-on:click="handSubmit()">儲存變更</button>
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
            // padding: 0px 10px;
            border-radius: 5px;

            >.info-tab {
                // display: flex;
                // align-items: center;
                // border-bottom: solid 1px #c1bdb8;

                &:last-child {
                    border-bottom: none;
                }

                >.businessHours-block {
                    width: 100%;
                    display: flex;
                    border-bottom: solid 1px #c1bdb8;

                    >.check-box {
                        width: 15%;
                        display: flex;
                        justify-content: center;
                        border-right: solid 1px #c1bdb8;

                        input {
                            width: 20px;
                            margin-right: 10px;
                        }
                    }

                    >.hours-info {
                        width: 85%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        >button {
                            width: 150px;
                            border: transparent;
                            margin: 0 10px;
                        }
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