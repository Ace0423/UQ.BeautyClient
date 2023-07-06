<script setup lang="ts">
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
import { storeToRefs } from "pinia";
import { useManagerStore } from "@/stores/manager";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const managerStore = useManagerStore();
const { getWorkingHours } = managerStore;
const { workingHoursList } = storeToRefs(managerStore);
const quicklyScheduleView = ref(false);
const editScheduleView = ref(false);
const selectItem = ref();
let weeks = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
const currentSundayTime = ref();
const currentSaturdayTime = ref();
const now = ref(new Date())
const nowTime = computed(() => { return now.value.getTime() });
const day = computed(() => { return now.value.getDay() });
const oneDayTime = computed(() => {
    return 24 * 60 * 60 * 1000;
})
const SundayTime = computed(() => {
    return nowTime.value + (7 - day.value) * oneDayTime.value;
})
const MondayTime = computed(() => {
    return nowTime.value - (day.value - 1) * oneDayTime.value;
})
const sunday = computed(() => {
    return new Date(MondayTime.value - oneDayTime.value)
});
const saturday = computed(() => {
    return new Date(SundayTime.value - oneDayTime.value)
});
const weekDay = computed(() => {
    let time = new Date(currentSundayTime.value);
    let weekDayArr: any = ref([])
    for (let index = 0; index < weeks.length; index++) {
        let m = time.getMonth() + 1;
        let d = time.getDate() + index;
        let date = add0(m) + '/' + add0(d);
        weekDayArr.value.push(date);
    }
    return weekDayArr.value;
});
const add0 = ((m: number) => {
    return m < 10 ? '0' + m : m
})
const format = ref((timestamp: any) => {
    let time = new Date(timestamp);
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();

    return y + '/' + add0(m) + '/' + add0(d);
})
const handLastWeek = (() => {
    let time = now.value.getTime();
    time = time - 7 * oneDayTime.value;
    now.value = new Date(time);
    currentSundayTime.value = format.value(sunday.value);
    currentSaturdayTime.value = format.value(saturday.value);
    requestWorkingHoursList();
})
const handNextWeek = (() => {
    let time = now.value.getTime();
    time = time + 7 * oneDayTime.value;
    now.value = new Date(time);
    currentSundayTime.value = format.value(sunday.value);
    currentSaturdayTime.value = format.value(saturday.value);
    requestWorkingHoursList();
})
const requestWorkingHoursList = () => {
    let arr = currentSundayTime.value.split("/");
    let data = {
        managerId: 0,
        year: Number(arr[0]),
        month: Number(arr[1]),
        day: Number(arr[2]),
        pageIndex: 0,
        count: 0
    }
    getWorkingHours(data)
        .then(() => {

        })
        .catch((e: any) => {
            Alert.warning(showHttpsStatus(e.response.status), 2000);
            if (e.response.status == 401) {
               
                setTimeout(() => {
                    handLogOut();
                }, 2000);
            }
        })
}
const timeDifference = ((data: any) => {
    return data.times / 60;
})
const scheduleList = computed(() => {
    const filter = workingHoursList.value.data;
    return filter;
})
const handEditWeek = ((data: any, index: any) => {
    let arr = currentSundayTime.value.split("/");
    let val: any = {
        managerId: data.managerId,
        nameView: data.nameView,
        timeTableList: JSON.parse(JSON.stringify(data.timeTableList[index])),
    }
    val.timeTableList.date = arr[0] + "/" + weekDay.value[index];
    selectItem.value = val;
    handEditScheduleView();
})
const handQuicklyscheduleView = () => {
    quicklyScheduleView.value = !quicklyScheduleView.value;
};
const handEditScheduleView = () => {
    editScheduleView.value = !editScheduleView.value;
};
onMounted(() => {
    currentSundayTime.value = format.value(sunday.value);
    currentSaturdayTime.value = format.value(saturday.value);
    requestWorkingHoursList();
})
</script>
<template>
    <div class="schedule-content">
        <div class="function-area">
            <button @click="handLastWeek()">
                &lt;
            </button>
            <p>{{ currentSundayTime }} - {{ currentSaturdayTime }}</p>
            <button @click="handNextWeek()">
                >
            </button>
            <button class="header-btn" @click="handQuicklyscheduleView">
                快速排班
            </button>
        </div>
        <table>
            <thead class="header-tab">
                <tr>
                    <th>人員</th>
                    <th v-for="item, index in weeks" :key="weekDay[index]">
                        <p>{{ weeks[index] }}</p>
                        <p>{{ weekDay[index] }}</p>
                    </th>
                </tr>
            </thead>
            <tbody class="content-tab">
                <tr v-for="item in scheduleList" :key="item.managerId">
                    <td>
                        <div>
                            <p>{{ item.nameView }}</p>
                        </div>
                    </td>
                    <td class="time-td" v-for="i, index in item.timeTableList" :key="index"
                        @click="handEditWeek(item, index)">
                        <div class="off-day" v-if="!i.dayOn">
                            <p>+</p>
                        </div>
                        <div class="on-day" v-if="i.dayOn">
                            <p>{{ timeDifference(i) }}時 </p>
                            <p>{{ i.dayOn }}~{{ i.dayOff }}</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <QuicklySchedule v-if="quicklyScheduleView" :hand-quicklyschedule-view="handQuicklyscheduleView"
        :requestWorkingHoursList="requestWorkingHoursList">
    </Quicklyschedule>
    <EditSchedule v-if="editScheduleView" :hand-edit-schedule-view="handEditScheduleView"
        :request-working-hours-list="requestWorkingHoursList" :select-item="selectItem">
    </EditSchedule>
</template>

<style lang="scss" scoped>
.schedule-content {
    position: absolute;
    top: 45px;
    bottom: 10px;
    left: 0px;
    right: 0px;
    width: 100%;
    background-color: #faf9f8;
    border: solid 0.5px #ddd;
    font-family: STXihei;
    color: #717171;



    >.function-area {
        position: absolute;
        height: 50px;
        top: -50px;
        border: none;
        background-color: transparent;
        display: flex;
        justify-content: end;
        align-items: center;
        right: 0px;
        // width: 100%;
        // pointer-events: none;

        >p {
            min-width: 50px;
            border-radius: 6px;
            border: none;
            background: #e6e2de;
            margin: 0 5px;
            // height: 70%;
            padding: 8.5px 10px;
            text-align: center;
        }

        >input {
            width: auto;
            height: 60%;
            border-radius: 6px;
            border: solid 1px #707070;
            background-color: #fff;
            margin-right: 10px;
            text-align: center;
        }

        >button {
            min-width: 50px;
            border-radius: 6px;
            border: none;
            background: #e6e2de;
            margin: 0 5px;
            height: 70%;
        }

        >.header-btn {
            border-radius: 6px;
            min-width: 100px;
            height: 70%;
            border: solid 1px #707070;
            background-color: #84715c;
            color: #fff;
            margin: 0 20px;
        }
    }

    >table {
        width: 100%;
        height: 100%;

        >.header-tab {
            display: block;
            // height: 50px;
            color: #717171;
            border: solid 1px #707070;
            background-color: #e6e2de;
            box-sizing: border-box;

            p {
                margin: 0 0 0 0;
            }

            >tr {
                display: flex;
                align-items: center;
                width: 100%;
                height: 50px;
                justify-content: space-between;


                >th {
                    width: calc(100%/8);

                    >p {
                        min-width: 108px;
                        text-align: center;
                    }

                    >.nameview {
                        padding-left: 10px;
                    }
                }
            }
        }

        >.content-tab {
            position: absolute;
            width: 100%;
            top: 52px;
            bottom: 0px;
            overflow: auto;
            display: flex;
            flex-direction: column;


            >tr {
                display: flex;
                position: relative;
                align-items: center;
                width: 100%;
                // height: 50px;
                justify-content: space-between;

                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    bottom: 0;
                    width: 98%;
                    height: 1px;
                    background: #ddd;
                    left: 50%;
                    transform: translateX(-50%);
                }

                >td {
                    width: calc(100%/8);
                    height: 0;
                    padding-bottom: calc(100%/8);
                    position: relative;

                    >div {
                        position: absolute;
                        top: 0px;
                        bottom: 0px;
                        left: 0px;
                        right: 0px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        // margin-top: 50%;
                        // transform: translateY(-50%);

                        p {
                            // min-width: 108px;

                            // align-items: center;
                            text-align: center;
                            // border: solid 1px #707070;
                            // background-color: #e6e2de;
                        }
                    }

                    &.time-td {
                        border-radius: 6px;
                        margin: 20px 10px;
                        border: solid 1px #707070;
                        background-color: #e6e2de;
                    }


                }
            }
        }
    }
}
</style>