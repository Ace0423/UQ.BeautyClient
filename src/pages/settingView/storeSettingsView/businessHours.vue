
<script setup lang="ts">

let weeks = ["週日", "週一", "週二", "週三", "週四", "週五", "週六", "休息時間"];
const testdata = reactive([
    {
        "mwNo": "MW-230605000005",
        "date": "2023-06-9",
        "week": 0,
        "dayOn": "09:00",
        "dayOff": "18:00",
        "restTime": [
            {
                "mwrNo": "MWR-230605000005",
                "dayOn": "12:00",
                "dayOff": "13:00"
            }
        ]
    },
    {
        "mwNo": "MW-230605000001",
        "date": "2023-06-05",
        "week": 1,
        "dayOn": "",
        "dayOff": "18:00",
        "restTime": [
            {
                "mwrNo": "MWR-230605000001",
                "dayOn": "12:00",
                "dayOff": "13:00"
            }
        ]
    },
    {
        "mwNo": "MW-230605000002",
        "date": "2023-06-6",
        "week": 2,
        "dayOn": "09:00",
        "dayOff": "18:00",
        "restTime": [
            {
                "mwrNo": "MWR-230605000002",
                "dayOn": "12:00",
                "dayOff": "13:00"
            }
        ]
    },
    {
        "mwNo": "MW-230605000003",
        "date": "2023-06-7",
        "week": 3,
        "dayOn": "09:00",
        "dayOff": "18:00",
        "restTime": [
            {
                "mwrNo": "MWR-230605000003",
                "dayOn": "12:00",
                "dayOff": "13:00"
            }
        ]
    },
    {
        "mwNo": "MW-230605000004",
        "date": "2023-06-8",
        "week": 4,
        "dayOn": "09:00",
        "dayOff": "18:00",
        "restTime": [
            {
                "mwrNo": "MWR-230605000004",
                "dayOn": "12:00",
                "dayOff": "13:00"
            }
        ]
    },
    {
        "mwNo": "MW-230605000005",
        "date": "2023-06-9",
        "week": 5,
        "dayOn": "09:00",
        "dayOff": "18:00",
        "restTime": [
            {
                "mwrNo": "MWR-230605000005",
                "dayOn": "12:00",
                "dayOff": "13:00"
            }
        ]
    },
    {
        "mwNo": "MW-230605000005",
        "date": "2023-06-9",
        "week": 6,
        "dayOn": "09:00",
        "dayOff": "18:00",
        "restTime": [
            {
                "mwrNo": "MWR-230605000005",
                "dayOn": "12:00",
                "dayOff": "13:00"
            }
        ]
    }

])
const handCheckBox = (item: any) => {
    if (item.dayOn == "") {
        item.dayOn = "09:00";
    } else {
        item.dayOn = "";
    }
    console.log(item)
}
const businessHours = computed(() => {
    let filter = testdata.filter(() => {

    })
})
const filterRestTime = ((data: any) => {
    let filter = data.dayOn == "" ? [] : data.restTime;
    return filter;
})

const handAaddRestTime = (data: any) => {
    console.log(data);
    let restVal = {
        mwrNo: data.mwNo,
        dayOn: "",
        dayOff: "",
    }
    data.restTime.push(restVal);
    console.log(data.restTime);
}
const handDelRestTime = (data: any, index: any) => {
    data.restTime.splice(index, 1);
}
</script>
<template>
    <div class="hours-content">
        <div class="content">
            <h1>店內營業時間</h1>
            <p>請填寫店內時間。</p>
            <div class="info-content">
                <div class="i-icon">i</div>
                <div class="hint-content">
                    <h1>店內時間不影響線上營業時間</h1>
                    <p>店內營業時間為店家端行事曆使用，消費者線上預約須分別設定</p>
                </div>
                <button>前往設定</button>
            </div>
            <table>
                <tbody>
                    <div class="time-tab" v-for="item in testdata" :key="item.week">
                        <tr>
                            <td>
                                <div>
                                    <input type="checkbox" :checked="item.dayOn.length > 0"
                                        v-on:change="handCheckBox(item)">
                                    <span>{{ weeks[item.week] }}</span>
                                </div>
                            </td>
                            <td class="td-bg" v-if="item.dayOn.length > 0">
                                <input type="time" :value="item.dayOn">
                            </td>
                            <td class="td-bg" v-if="item.dayOn.length > 0">
                                <input type="time" :value="item.dayOff">
                            </td>
                            <td class="td-bg" v-if="item.dayOn.length > 0">
                                <button @click="handAaddRestTime(item)">加入休息時間</button>
                            </td>
                            <td class="td-bg-rest" v-if="item.dayOn.length == 0">店休</td>
                        </tr>
                        <tr v-for="i, index in filterRestTime(item)" :key="index">
                            <td>
                                <div>
                                    <span>休息時間</span>
                                </div>
                            </td>
                            <td class="td-bg">
                                <input type="time" :value="i.dayOn">
                            </td>
                            <td class="td-bg">
                                <input type="time" :value="i.dayOff">
                            </td>
                            <td class="td-bg">
                                <button @click="handDelRestTime(item, index)">X</button>
                            </td>
                        </tr>
                    </div>

                </tbody>
            </table>
        </div>
    </div>
    <div class="submitBtn">
        <button>取消變更</button>
        <button>確認儲存</button>
    </div>
</template>

<style lang="scss" scoped>
.hours-content {
    position: absolute;
    top: 45px;
    bottom: 61px;
    left: 0px;
    right: 0px;
    width: 100%;
    background-color: #faf9f8;
    border: solid 0.5px #ddd;
    font-family: STXihei;
    color: #717171;
    overflow: auto;

    >.content {
        margin: 20px 40px;


        h1 {
            margin: 5px 8px;
            font-size: 20px;
        }

        p {
            margin: 5px 8px;
        }

        >.info-content {
            display: flex;
            align-items: center;
            padding: 15px 15px;
            margin: 10px 0px;
            border-radius: 10px 10px 10px 10px;
            background-color: #e6e2de;
            position: relative;

            >.i-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 15px;
                width: 28px;
                height: 28px;
                border-radius: 14px;
                font-size: 24px;
                background-color: #84715c;
                color: #fff;
            }

            >button {
                right: 0px;
                position: absolute;
                border-radius: 6px;
                padding: 10px 20px;
                margin: 0px 50px;
                border: transparent;
                background-color: #84715c;
                color: #fff;
                font-size: 18px;
            }
        }

        >table {
            width: 100%;
            margin-top: 20px;

            >tbody {
                >.time-tab {
                    >tr {
                        display: flex;
                        height: 70px;
                        line-height: 70px;

                        >td {
                            text-align: center;
                            width: 25%;
                            border: solid 0.5px #ddd;
                            box-sizing: border-box;

                            input {
                                text-align: center;
                                border: transparent;
                            }

                            input[type="checkbox"] {
                                // display: flex;
                                // justify-content: center;
                                margin-right: 10px;
                                width: 20px;
                                height: 20px;
                                top: 2px;
                                position: relative;
                                appearance: none;
                                border: 1px solid;
                                box-sizing: border-box;

                                &:checked {
                                    background-color: #e6e2de;

                                    &::after {
                                        content: '✓';
                                        color: #717171;
                                        position: absolute;
                                        top: 50%;
                                        left: 4px;
                                        transform: translateY(-50%);
                                    }
                                }
                            }

                            button {
                                border: transparent;
                                background-color: transparent;
                            }

                            button:hover {
                                border-radius: 6px;
                                border: solid 0.5px #ddd;
                                background-color: #ddd;
                                // padding: 0px 15px;
                                height: 60%;
                                line-height: 50%;
                            }



                            &.td-bg {
                                background: #fff;
                            }

                            &.td-bg-rest {
                                width: 75%;
                                background: #fff;
                            }


                            >.checkbox {}
                        }
                    }
                }

            }
        }
    }

}

.submitBtn {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 10px;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #faf9f8;
    border: solid 0.5px #ddd;

    >button {
        border-radius: 6px;
        padding: 5px 15px;
        margin: 0px 10px;
        height: 75%;
        border: transparent;
        background-color: #e6e2de;
        color: #717171;

    }

}
</style>