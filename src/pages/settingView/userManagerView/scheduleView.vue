<script setup lang="ts">
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
        let date = add0(m) + '/' + add0(d)
        weekDayArr.value.push(date)
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
})
const handNextWeek = (() => {
    let time = now.value.getTime();
    time = time + 7 * oneDayTime.value;
    now.value = new Date(time);
    currentSundayTime.value = format.value(sunday.value);
    currentSaturdayTime.value = format.value(saturday.value);
})
onMounted(() => {
    currentSundayTime.value = format.value(sunday.value);
    currentSaturdayTime.value = format.value(saturday.value);
})
</script>
<template>
    <div>
        <div class="function-area">
            <button @click="handLastWeek()">
                &lt;
            </button>
            <p>{{ currentSundayTime }} - {{ currentSaturdayTime }}</p>
            <button @click="handNextWeek()">
                >
            </button>
            <button class="header-btn">
                快速排班
            </button>
        </div>
        <table>
            <thead class="header-tab">
                <tr>
                    <th>
                    </th>
                    <th v-for="item, index in weeks" :key="index">
                        <p>{{ weeks[index] }}</p>
                        <p>{{ weekDay[index] }}</p>
                    </th>
                </tr>
            </thead>
            <tbody class="content-tab">
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
div {
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
        height: 50px;
        position: absolute;
        top: -50px;
        border: none;
        background-color: transparent;
        display: flex;
        justify-content: end;
        align-items: center;
        left: auto;
        width: auto;

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
                height: 50px;
                justify-content: space-between;


                >th {
                    widows: 100%/7;

                    >p {
                        min-width: 108px;
                        text-align: left;
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
        }
    }
}
</style>