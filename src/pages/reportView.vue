<script setup lang="ts">
import Icon from "@/assets/file-text-fill.svg";
import zhCn from 'element-plus/es/locale/lang/zh-cn';
const route = useRoute();
const props = defineProps<{
    memuState: any;
    handmemuStateBtn: Function;
}>();
const idx = ref(1);
const value2 = ref('');
const routerArr = ["realTimeView", "businessView"];
const options = [
    {
        value: '0',
        label: '所有人',
    }
]
const uId = ref();
const navItem = () => {
    routerArr.forEach((item, index) => {
        const rp = route.path.substring(1).split("/")[1];
        if (rp === item) {
            idx.value = index;
        }
    })
}
const headWitchBox = (val: any) => {
    idx.value = val;
}
const shortcuts = [
    {
        text: '本周',
        value: () => {
            // 創建一個表示當前日期的物件
            const currentDate = new Date();

            // 取得今天是星期幾（0 表示星期日，1 表示星期一，以此類推）
            const currentDay = currentDate.getDay();

            // 計算距離本周日還有多少天
            const daysUntilSunday = 0 - currentDay;
            // 複製當前日期物件以防止修改原始日期
            const sundayDate = new Date(currentDate);
            // 加上相應的天數以獲得本周日的日期
            sundayDate.setDate(currentDate.getDate() + daysUntilSunday);
            const saturDay = new Date(currentDate);
            saturDay.setDate(sundayDate.getDate() + 6);
            return [sundayDate, saturDay]
        },
    },
    {
        text: '上周',
        value: () => {
            const currentDate = new Date();
            const currentDay = currentDate.getDay();
            const daysUntilSunday = 0 - currentDay - 7;
            const sundayDate = new Date(currentDate);
            sundayDate.setDate(currentDate.getDate() + daysUntilSunday);
            const saturDay = new Date(currentDate);
            saturDay.setDate(sundayDate.getDate() + 6);
            return [sundayDate, saturDay]
        },
    },
    {
        text: '本月',
        value: () => {
            // 創建一個表示當前日期的物件
            const currentDate = new Date();

            // 設置日期為本月的第一天
            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

            // 設置日期為下個月的第一天，再減去一天，即得到本月的最後一天
            const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            return [firstDayOfMonth, lastDayOfMonth]
        },
    },
    {
        text: '上個月',
        value: () => {
            // 創建一個表示當前日期的物件
            const currentDate = new Date();

            // 計算上個月的年份和月份
            const lastMonthYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
            const lastMonthMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;

            // 設置日期為上個月的第一天
            const firstDayOfLastMonth = new Date(lastMonthYear, lastMonthMonth, 1);

            // 設置日期為本月的第一天再減去一天，即得到上個月的最後一天
            const lastDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

            return [firstDayOfLastMonth, lastDayOfLastMonth]
        },
    }
]
onMounted(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    navItem();
})
</script>
<template>
    <div class="container">
        <Header :Icon="Icon" :moduleType="'報表分析'" :memuState="props.memuState" :handmemuStateBtn="props.handmemuStateBtn">
        </Header>
        <div class="wrap">
            <div class="nav">
                <div class="item-tab">
                    <router-link to="/reportView/realTimeView" :class="{ active: idx == 0 }"
                        @click="headWitchBox(0)"  v-if="false">即時分析</router-link>
                    <router-link to="/reportView/businessView" :class="{ active: idx == 1 }"
                        @click="headWitchBox(1)" >營業報表</router-link>
                </div>
                <div class="condition-block" v-if="idx == 1">
                    <!-- <el-config-provider :locale="zhCn">
                        <el-date-picker v-model="value2" type="daterange" unlink-panels range-separator="-"
                            start-placeholder="開始時間" end-placeholder="結束時間" :shortcuts="shortcuts" size=large />
                    </el-config-provider> -->
                </div>
                <!-- <el-select v-model="uId" class="filter-block m-2" placeholder="" style="width: 240px;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select> -->
            </div>
            <router-view />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    position: relative;

    >.wrap {
        position: absolute;
        top: 80px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        overflow: auto;

        >.nav {
            position: absolute;
            top: 0px;
            left: 40px;
            display: flex;

            >.item-tab {
                display: flex;
                background-color: #faf9f8;
                border-radius: 6px;

                >a {
                    border: none;
                    width: 95%;
                    height: 45px;
                    margin: 5px 6px;
                    font-size: 20px;
                    font-weight: bold;
                    font-family: HeitiTC;
                    color: #717171;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: left;
                    padding: 0 10px;
                    border-radius: 3px;

                    &.active {
                        color: #000000;
                        background-color: #ffffff;
                    }
                }
            }

            >.condition-block {
                display: flex;
                margin: 0 15px;
            }

            >.filter-block {
                display: flex;

                ::v-deep {

                    .el-input,
                    .el-input--suffix {
                        height: 100%;
                    }

                    .el-input__inner {
                        height: 100%;                        
                    }

                    .el-input__prefix,
                    .el-input__suffix {
                        height: 100%;
                    }
                }
            }
        }
    }


}</style>