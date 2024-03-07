<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import apexchart from 'vue3-apexcharts';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as echarts from 'echarts';
import { useReportStore } from "@/stores/report";
import { useCounterStore } from "@/stores/counter";
import Alert from "@/components/alertCmpt";
import { showHttpsStatus, showErrorMsg } from "@/types/IMessage";
const counterStore = useCounterStore();
const { handLogOut } = counterStore;
const reportStore = useReportStore();
const { getTotalSales, getTotalBooking, getManagerSales, getAverageOrder, getVisitorCount, getVisitorHours, getServiceProportion } = reportStore;
const { totalSalesList, totalBookingList, managerSalesList, averageOrderList, visitorCountList, visitorHoursList, serviceProportionList, } = storeToRefs(reportStore);
const time = ref<Date[]>([]);
const totalSalesChart = ref<HTMLElement>();
const myChart1 = ref<any>();
const initTotalSalesEcharts = (() => {
    myChart1.value = echarts.init(totalSalesChart.value!);
    myChart1.value.setOption({
        xAxis: {
            data: totalSalesList.value.data.date
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                itemStyle: {
                    color: '#1a73e8'
                },
                data: totalSalesList.value.data.servicePriceList,
                type: 'bar'
            },
            {
                itemStyle: {
                    color: '#d1687f'
                },
                data: totalSalesList.value.data.productPriceList,
                type: 'bar'
            }
        ]
    });
})
const totalBookingChart = ref<HTMLElement>();
const myChart2 = ref<any>();
const initTotalBookingEcharts = (() => {
    myChart2.value = echarts.init(totalBookingChart.value!);
    myChart2.value.setOption({
        xAxis: {
            data: totalBookingList.value.data.date
        },
        yAxis: {
        },
        series: [
            {
                data: totalBookingList.value.data.count,
                type: 'line'
            }
        ]
    });
})
const turnoverData: any = [

];
const managerSalesChart = ref<HTMLElement>();
const myChart3 = ref<any>();
const initManagerSalesEcharts = (() => {
    myChart3.value = echarts.init(managerSalesChart.value!);
    myChart3.value.setOption({
        xAxis: {
            data: managerSalesList.value.data.managerName
        },
        yAxis: {
        },
        series: [
            {
                itemStyle: {
                    color: '#1a73e8'
                },
                data: managerSalesList.value.data.servicesPrice,
                type: 'bar'
            },
            {
                itemStyle: {
                    color: '#d1687f'
                },
                data: managerSalesList.value.data.productPrice,
                type: 'bar'
            }
        ]
    });
})
const averageOrderChart = ref<HTMLElement>();
const myChart4 = ref<any>();
const initAverageOrderEcharts = (() => {
    myChart4.value = echarts.init(averageOrderChart.value!);
    myChart4.value.setOption({
        xAxis: {
            type: 'category',
            data: averageOrderList.value.data.date
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: averageOrderList.value.data.averagePriceList,
                type: 'line'
            }
        ]
    });
})
const visitorCountChart = ref<HTMLElement>();
const myChart5 = ref<any>();
const initVisitorCountEcharts = (() => {
    myChart5.value = echarts.init(visitorCountChart.value!);
    myChart5.value.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 5]
        },
        yAxis: {
            type: 'category',
            data: visitorCountList.value.data.title
        },
        series: [
            {
                type: 'bar',
                itemStyle: {
                    color: '#1a73e8'
                },
                data: visitorCountList.value.data.maleList
            },
            {
                type: 'bar',
                itemStyle: {
                    color: '#d1687f'
                },
                data: visitorCountList.value.data.femaleList
            },
            {
                type: 'bar',
                itemStyle: {
                    color: '#dadce0'
                },
                data: visitorCountList.value.data.personalList
            }
        ]
    });
})
const chartOptions: any = {
    chart: {
        id: 'vuechart-example',
    },
    xaxis: {
        position: 'top',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    plotOptions: {
        heatmap: {
            radius: 0,
            colorScale: {
                ranges: [{
                    from: 0,
                    to: 0,
                    name: '0',
                    color: '#B5CBE3'
                },
                {
                    from: 1,
                    to: 1,
                    name: '1',
                    color: '#7799BE'
                },
                {
                    from: 2,
                    to: 2,
                    name: '2',
                    color: '#47729B'
                },
                {
                    from: 3,
                    to: 100,
                    name: '3',
                    color: '#213657'
                }]
            }
        }
    },
    grid: {
        padding: {
            right: 0
        }
    }
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
            saturDay.setDate(currentDate.getDate() + (6 - currentDay));
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
            const saturDay = new Date(sundayDate);
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

    time.value = shortcuts[0].value();
    getReportDate();
    filterChang();
})
onUnmounted(() => {
})
const getReportDate = () => {
    const date = {
        startDate: time.value[0].toISOString().split("T")[0].toString(),
        endDate: time.value[1].toISOString().split("T")[0].toString(),
        pageIndex: 0,
        count: 0
    }
    getTotalSales(date).then((res: any) => {
        initTotalSalesEcharts();
        if (res.state == 2) {
            // Alert.warning(showErrorMsg(res.msg), 2000);
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
    getTotalBooking(date).then((res: any) => {
        initTotalBookingEcharts();
        if (res.state == 2) {
            // Alert.warning(showErrorMsg(res.msg), 2000);
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
    getManagerSales(date).then((res: any) => {
        initManagerSalesEcharts();
        if (res.state == 2) {
            // Alert.warning(showErrorMsg(res.msg), 2000);
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
    getAverageOrder(date).then((res: any) => {
        initAverageOrderEcharts();
        if (res.state == 2) {
            // Alert.warning(showErrorMsg(res.msg), 2000);
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
    getVisitorCount(date).then((res: any) => {
        initVisitorCountEcharts();
        if (res.state == 2) {
            // Alert.warning(showErrorMsg(res.msg), 2000);
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
    getVisitorHours(date).then((res: any) => {
        if (res.state == 2) {
            // Alert.warning(showErrorMsg(res.msg), 2000);
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
    getServiceProportion(date).then((res: any) => {
        if (res.state == 2) {
            // Alert.warning(showErrorMsg(res.msg), 2000);
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
}
const filterChang = () => {
}
</script>
<template>
    <div class="content">
        <div class="filter-block">
            <div class="condition-block">
                <el-config-provider :locale="zhCn">
                    <el-date-picker v-model="time" type="daterange" unlink-panels range-separator="一"
                        start-placeholder="開始時間" end-placeholder="結束時間" :shortcuts="shortcuts" size=large
                        @change="getReportDate()" />
                </el-config-provider>
            </div>
            <!-- <el-select v-model="uId" class="people-screening m-2" placeholder="" style="width: 240px;"
                :change=filterChang()>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select> -->
        </div>
        <!-- <div class="total-count">
            <div>
                <h2>顧客流失率</h2>
                <h1>90%</h1>
            </div>
            <div>
                <h2>顧客出席率</h2>
                <h1>97%</h1>
            </div>
            <div>
                <h2>新客留存率</h2>
                <h1>7%</h1>
            </div>
            <div>
                <h2>舊客留存率</h2>
                <h1>14%</h1>
            </div>
        </div> -->
        <div class="row">
            <div class="count-box">
                <div class="count-block">
                    <h2>營業總額</h2>
                    <h1>${{ totalSalesList.data.totalPrice }}</h1>
                    <div class="sale-info">
                        <img style="background-color: #1a73e8" />
                        <p>服務 ${{ totalSalesList.data.servicePrice }} ({{ totalSalesList.data.servicePct }})</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #d1687f" />
                        <p>商品 ${{ totalSalesList.data.productPrice }} ({{ totalSalesList.data.productPct }})</p>
                    </div>
                    <div>
                        <div ref="totalSalesChart" :style="{ height: '350px' }"></div>
                    </div>
                </div>
            </div>
            <div class="count-box">
                <div class="count-block">
                    <h2>總預約數</h2>
                    <h1> {{ totalBookingList.data.totalBooking }}</h1>
                    <div class="sale-info">
                        <p>新預約 {{ totalBookingList.data.newBooking }} ({{ totalBookingList.data.newBookingPct }})</p>
                    </div>
                    <div class="sale-info">
                        <p>已完成 {{ totalBookingList.data.finishBooking }} ({{ totalBookingList.data.finishBookingPct }})</p>
                    </div>
                    <div class="sale-info">
                        <p>店家取消 {{ totalBookingList.data.cancelBooking }} ({{ totalBookingList.data.cancelBookingPct }})</p>
                    </div>
                    <div id="reserve-chart">
                        <div ref="totalBookingChart" :style="{ height: '350px' }"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="count-box">
                <div class="count-block">
                    <h2>人員業績</h2>
                    <h1>${{ managerSalesList.data.totalPrice }}</h1>
                    <div class="sale-info">
                        <img style="background-color: #1a73e8" />
                        <p>服務</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #d1687f" />
                        <p>商品</p>
                    </div>
                    <div>
                        <div ref="managerSalesChart" :style="{ height: '350px' }"></div>
                    </div>
                </div>
            </div>
            <div class="count-box">
                <div class="count-block">
                    <h2>累積暫收金額</h2>
                    <h1>$0</h1>
                    <p>已實收 $0</p>
                    <p>累積未收總額 $0</p>
                    <div class="tab">
                        <el-table :data="turnoverData" height="250" style="width: 100%">
                            <el-table-column prop="ranked" label="暫收排行" width="300" />
                            <el-table-column prop="amount" label="金額" />
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="count-box">
                <h2>你的顧客平均消費了多少?</h2>
                <div class="count-block">
                    <h2>客單價</h2>
                    <h1>${{ averageOrderList.data.averagePrice }}</h1>
                    <div id="reserve-chart">
                        <div ref="averageOrderChart" :style="{ height: '350px' }"></div>
                    </div>
                </div>
            </div>
            <div class="count-box">
                <h2>你的顧客都是哪些人呢?</h2>
                <div class="count-block">
                    <h2>來客數</h2>
                    <h1>{{ visitorCountList.data.visitorTotal }}</h1>
                    <div class="sale-info">
                        <img style="background-color: #1a73e8" />
                        <p>男性{{ visitorCountList.data.maleTotal }}({{ visitorCountList.data.malePct }})</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #d1687f" />
                        <p>女性{{ visitorCountList.data.femaleTotal }}({{ visitorCountList.data.femalePct }})</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #dadce0" />
                        <p>不透漏{{ visitorCountList.data.personalTotal }}({{ visitorCountList.data.personalPct }})</p>
                    </div>
                    <div id="customer-chart">
                        <div ref="visitorCountChart" :style="{ height: '350px' }"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="count-box">
                <h2>知道你的顧客都是什麼時候來消費嗎?</h2>
                <div class="count-block">
                    <h2>來客時段分析</h2>
                    <p>平日熱門時段 週一12:00</p>
                    <p>假日熱門時段 週日10:00</p>
                    <div id="time-period" style="height: 500px; overflow: auto;" v-if="visitorHoursList.data.hourWeekList">
                        <apexchart type="heatmap" height="1000" :options="chartOptions"
                            :series="visitorHoursList.data.hourWeekList"></apexchart>
                    </div>
                </div>
            </div>
            <div class="count-box">
                <h2>你最讓人喜愛的服務是什麼?</h2>
                <div class="count-block">
                    <h2>服務排行占比</h2>
                    <h1>${{ serviceProportionList.data.priceList }}</h1>
                    <h2>總銷售數量 {{ serviceProportionList.data.quantityList }}</h2>
                    <div class="tab">
                        <el-table :data="serviceProportionList.data.serviceList" height="250" style="width: 100%"
                            :header-cell-style="{ background: '#e6e2de' }">
                            <el-table-column prop="name" label="服務排行佔比" width='150' />
                            <el-table-column prop="price" label="淨值" />
                            <el-table-column prop="quantityPct" label="佔比" />
                            <el-table-column prop="quantity" label="數量" />
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    position: absolute;
    top: 60px;
    bottom: 10px;
    left: 40px;
    right: 40px;
    font-family: STXihei;
    color: #717171;

    >.filter-block {
        display: flex;

        >.condition-block {
            display: flex;

            // margin: 0 15px;
            :deep(.el-range-input) {
                font-size: 20px;
                // color: rgb(0, 0, 0);
            }
        }

        >.people-screening {
            display: flex;
            margin-left: 5px;

            ::v-deep {

                ::v-deep(.el-input),
                ::v-deep(.el-input--suffix) {
                    height: 100%;
                }

                ::v-deep(.el-input__inner) {
                    height: 100%;
                }

                ::v-deep(.el-input__prefix),
                ::v-deep(.el-input__suffix) {
                    height: 100%;
                }
            }
        }
    }

    >.total-count {
        display: flex;
        justify-content: space-around;
        background-color: #faf9f8;
        border-radius: 6px;
        margin: 10px 0px;
    }

    >.row {
        display: flex;

        >.count-box {
            width: 50%;
            position: relative;
            margin: 5px 5px;

            >.count-block {
                height: 700px;
                border: solid 2px #707070;
                border-radius: 10px;
                padding: 0px 10px;
                position: relative;

                >.sale-info {
                    display: flex;
                    align-items: center;

                    >img {
                        width: 15px;
                        height: 15px;
                        margin: 5px;
                    }
                }
            }
        }
    }

    .tab {
        width: 95%;
        margin: 15px 0;
    }

    ::v-deep(.el-table) {
        background-color: transparent;
        --el-table-tr-bg-color: transparent;
        border: solid 1px #707070;
        box-sizing: border-box;
        border-radius: 5px;
    }

    #time-period {
        margin-bottom: 10px;

        table {
            border: transparent;

            tr {
                td {}

                >.color-td {
                    background-color: #faf9f8;
                    border: solid 1px #ffffff;
                    height: 20px;
                    border-radius: 5px;
                }
            }
        }
    }
}
</style>

