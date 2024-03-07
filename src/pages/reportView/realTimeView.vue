<script setup lang="ts">
import { storeToRefs } from "pinia";
import * as echarts from 'echarts';
import apexchart from 'vue3-apexcharts'
import { useReportStore } from "@/stores/report";
const reportStore = useReportStore();
const { getTotalSalesByToday, getTotalBookingByWeek, getManagerSalesByToday, getVisitorCountByToday, getServiceProportionByToday, getProductProportionByToday, getTotalTopUpByToday, getTotalPayTypeByToday } = reportStore;
const serviceProportionByToday = reactive<any>({ data: [] });
const productProportionByToday = reactive<any>({ data: [] });
const TotalTopUpByToday = reactive<any>({ data: [] });
const totalSales_servicePrice = ref();
const totalSales_productPrice = ref();
const totalSales_servicePct = ref();
const totalSales_productPct = ref();
const totalSales_totalPrice = ref();
const totalSalesTodayChart = ref<HTMLElement>();
const myChart1 = ref<any>();
const initTotalSalesTodayEcharts = ((data: any) => {
    totalSales_servicePrice.value = data.servicePrice;
    totalSales_productPrice.value = data.productPrice;
    totalSales_servicePct.value = data.servicePct;
    totalSales_productPct.value = data.productPct;
    totalSales_totalPrice.value = data.totalPrice;
    myChart1.value = echarts.init(totalSalesTodayChart.value!);
    myChart1.value.setOption({
        xAxis: {
            type: 'category',
            data: data.date,
            axisPointer: {
                type: 'shadow'
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                itemStyle: {
                    color: '#1a73e8'
                },
                data: data.servicePriceList,
                type: 'bar'
            },
            {
                itemStyle: {
                    color: '#d1687f'
                },
                data: data.productPriceList,
                type: 'bar'
            }
        ]
    });
})
const totalBooking_totalBooking = ref();
const TotalBookingByWeekChart = ref<HTMLElement>();
const myChart2 = ref<any>();
const initTotalBookingByWeekEcharts = ((data: any) => {
    totalBooking_totalBooking.value = data.totalBooking
    myChart2.value = echarts.init(TotalBookingByWeekChart.value!);
    myChart2.value.setOption({
        xAxis: {
            data: data.date
        },
        yAxis: {
        },
        series: [
            {
                data: data.count,
                type: 'line'
            }
        ]
    });
})
const managerSales_totalPrice = ref();
const ManagerSalesByTodayChart = ref<HTMLElement>();
const myChart3 = ref<any>();
const initManagerSalesByTodayEcharts = ((data: any) => {
    managerSales_totalPrice.value = data.totalPrice;
    myChart3.value = echarts.init(ManagerSalesByTodayChart.value!);
    myChart3.value.setOption({
        xAxis: {
            type: 'category',
            data: data.managerName,
            axisPointer: {
                type: 'shadow'
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                itemStyle: {
                    color: '#1a73e8'
                },
                data: data.servicesPrice,
                type: 'bar'
            },
            {
                itemStyle: {
                    color: '#d1687f'
                },
                data: data.productPrice,
                type: 'bar'
            }
        ]
    });
})
const visitorTotal = ref();
const maleTotal = ref();
const malePct = ref();
const femaleTotal = ref();
const femalePct = ref();
const personalTotal = ref();
const personalPct = ref();
const VisitorCountByTodayChart = ref<HTMLElement>();
const myChart4 = ref<any>();
const initVisitorCountByTodayEcharts = ((data: any) => {
    visitorTotal.value = data.visitorTotal;
    maleTotal.value = data.maleTotal;
    malePct.value = data.malePct;
    femaleTotal.value = data.femaleTotal;
    femalePct.value = data.femalePct;
    personalTotal.value = data.personalTotal;
    personalPct.value = data.personalPct;
    myChart4.value = echarts.init(VisitorCountByTodayChart.value!);
    myChart4.value.setOption({
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
            data: data.title
        },
        series: [
            {
                type: 'bar',
                itemStyle: {
                    color: '#1a73e8'
                },
                data: data.maleList
            },
            {
                type: 'bar',
                itemStyle: {
                    color: '#d1687f'
                },
                data: data.femaleList
            },
            {
                type: 'bar',
                itemStyle: {
                    color: '#dadce0'
                },
                data: data.personalList
            }
        ]
    });
})
const TotalPayTypeByTodayChart = ref<HTMLElement>();
const myChart5 = ref<any>();
const initTotalPayTypeByTodayEcharts = ((data: any) => {
    myChart5.value = echarts.init(TotalPayTypeByTodayChart.value!);
    myChart5.value.setOption({
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data
            }
        ]
    });
})
const saleData = [{
    name: '服務',
    data: [],
},
{
    name: '商品',
    data: [],

},
]
const reserveChart = {
    chart: {
        height: 350,
        type: 'line',
        dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
        },
        toolbar: {
            show: false
        }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
        enabled: true,
    },
    stroke: {
        curve: 'smooth'
    },
    grid: {
        borderColor: '#e7e7e7',
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    markers: {
        size: 1
    },
    xaxis: {
        categories: ['10/13', '10/14', '10/15', '10/16', '10/17', '10/18', '10/19'],

    },
    yaxis: {
        min: 0,
        max: 5
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
    }
}
const reserveDate = [
    {
        data: [1, 2, 3, 4, 1, 2, 1]
    }
]
const personalSaleChart = {
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 1,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['人員1', '人員2', '人員3', '人員4', '人員5'],
    },
    yaxis: {

    },
    fill: {
        opacity: 1
    },
    colors: ['#f3f3f3', '#dadce0'],
    tooltip: {
        y: {
            formatter: function (val: any) {
                return "$ " + val + " thousands"
            }
        }
    }
}
const personalSaleData = [{
    name: '服務',
    data: [],
},
{
    name: '商品',
    data: [],

},
]
const customerChart = {
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            horizontal: true,
            dataLabels: {
                position: 'top',
            },
        }
    },
    dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
            fontSize: '12px',
            colors: ['#fff']
        }
    },
    stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
    },
    colors: ['#1a73e8', '#dadce0', '#d1687f'],
    tooltip: {
        shared: true,
        intersect: false
    },
    xaxis: {
        categories: ["新客", "舊客"],
    },
}
const customerData: [] = [
    // {
    //     data: [44, 55]
    // }, {
    //     data: [53, 32]
    // }, {
    //     data: [53, 32]
    // }
]
const payChart = {
    chartOptions: {
        chart: {
            type: 'donut',
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            type: 'gradient',
        },
        legend: {
            formatter: function (val: any, opts: any) {
                return val + " - " + opts.w.globals.series[opts.seriesIndex]
            }
        },
        title: {
            text: 'Gradient Donut with custom Start-angle'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        colors: ['#f3f3f3', '#dadce0', '#f3f3f3', '#dadce0'],
    }
}
const payData = [
    44, 55, 41, 17
]
const getReportDate = () => {
    getTotalSalesByToday().then((res: any) => {
        if (res.state == 1) {
            initTotalSalesTodayEcharts(res.data.table);
        }
    })
    getTotalBookingByWeek().then((res: any) => {
        if (res.state == 1) {
            initTotalBookingByWeekEcharts(res.data.table);
        }
    })
    getManagerSalesByToday().then((res: any) => {
        if (res.state == 1) {
            initManagerSalesByTodayEcharts(res.data.table);
        }
    })
    getVisitorCountByToday().then((res: any) => {
        if (res.state == 1) {
            initVisitorCountByTodayEcharts(res.data.table);
        }
    })
    getServiceProportionByToday().then((res: any) => {
        if (res.state == 1) {
            serviceProportionByToday.data = res.data.table;
        }
    })
    getProductProportionByToday().then((res: any) => {
        if (res.state == 1) {
            productProportionByToday.data = res.data.table;
        }
    })
    getTotalTopUpByToday().then((res: any) => {
        if (res.state == 1) {
            TotalTopUpByToday.data = res.data.table;
        }
    })
    getTotalPayTypeByToday().then((res: any) => {
        if (res.state == 1) {
            initTotalPayTypeByTodayEcharts(res.data.table);
        }
    })
}
onMounted(() => {
    getReportDate();
})
</script>

<template>
    <div class="content">
        <div class="row">
            <div class="count-box">
                <h3>今日的銷售業績如何?</h3>
                <div class="count-block">
                    <h2>營業總額</h2>
                    <p>今日的營業狀況</p>
                    <h1>${{ totalSales_totalPrice }}</h1>
                    <div class="sale-info">
                        <img style="background-color: #1a73e8" />
                        <p>服務${{ totalSales_servicePrice }}({{ totalSales_servicePct }}%)</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #dadce0" />
                        <p>商品${{ totalSales_productPrice }}({{ totalSales_productPrice }}%)</p>
                    </div>
                    <div>
                        <div ref="totalSalesTodayChart" :style="{ height: '350px' }"></div>
                    </div>
                </div>
            </div>
            <div class="count-box">
                <h3>這周還有多少預約呢?</h3>
                <div class="count-block">
                    <h2>即將到來的預約數</h2>
                    <p>未來一周的預約狀況</p>
                    <h1>{{ totalBooking_totalBooking }}</h1>
                    <div>
                        <div ref="TotalBookingByWeekChart" :style="{ height: '350px' }"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="count-box">
                <h3>今日的人員業績</h3>
                <div class="count-block">
                    <h2>人員業績</h2>
                    <p>今日的人員業績狀況</p>
                    <h1>${{ managerSales_totalPrice }}</h1>
                    <div class="sale-info">
                        <img style="background-color: #1a73e8" />
                        <p>服務</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #dadce0" />
                        <p>商品</p>
                    </div>
                    <div>
                        <div ref="ManagerSalesByTodayChart" :style="{ height: '350px' }"></div>
                    </div>
                </div>
            </div>
            <div class="count-box">
                <h3>你的顧客都是哪些人呢?</h3>
                <div class="count-block">
                    <h2>來客數</h2>
                    <p>今日的來客數</p>
                    <h1>{{ visitorTotal }}</h1>
                    <div class="sale-info">
                        <img style="background-color: #1a73e8" />
                        <p>男性{{ maleTotal }}({{ malePct }})</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #dadce0" />
                        <p>女性{{ femaleTotal }}({{ femalePct }})</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #d1687f" />
                        <p>不透漏{{ personalTotal }}({{ personalPct }})</p>
                    </div>
                    <div>
                        <div ref="VisitorCountByTodayChart" :style="{ height: '350px' }"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="count-box">
                <h3>你最讓人喜愛的服務是什麼?</h3>
                <div class="count-block">
                    <h2>服務排行佔比</h2>
                    <p>今日的服務狀況</p>
                    <h1>${{ serviceProportionByToday.data.priceList }}</h1>
                    <p>總銷售數量{{ serviceProportionByToday.data.quantityList }}</p>
                    <el-table :data="serviceProportionByToday.data.serviceList" style="width: 100%" height="250"
                        :header-cell-style="{ background: '#e6e2de' }">
                        <el-table-column prop="name" label="服務排行前五名" width="200" />
                        <el-table-column prop="price" label="淨額" />
                        <el-table-column prop="quantityPct" label="佔比" />
                        <el-table-column prop="quantity" label="數量" />
                    </el-table>
                </div>
            </div>
            <div class="count-box">
                <h3>你最讓人喜愛的商品是什麼?</h3>
                <div class="count-block">
                    <h2>商品排行佔比</h2>
                    <p>今日的商品銷售</p>
                    <h1>${{ productProportionByToday.data.priceList }}</h1>
                    <p>總銷售數量{{ productProportionByToday.data.quantityList }}</p>
                    <el-table :data="productProportionByToday.data.productList" style="width: 100%" height="250"
                        :header-cell-style="{ background: '#e6e2de' }">
                        <el-table-column prop="name" label="商品排行前五名" width="200" />
                        <el-table-column prop="price" label="淨額" />
                        <el-table-column prop="quantityPct" label="佔比" />
                        <el-table-column prop="quantity" label="數量" />
                    </el-table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="count-box">
                <h3>儲值卡使用狀況如何?</h3>
                <div class="count-block">
                    <h2>總銷售額</h2>
                    <p>儲值卡的銷售銷售</p>
                    <h1>$0</h1>
                    <div>
                        <p>總累積未收額 ${{ TotalTopUpByToday.data.totalPrice }} </p>
                        <p>已實收總面額 ${{ TotalTopUpByToday.data.totalBalance }}</p>
                    </div>
                    <el-table :data="TotalTopUpByToday.data.productList" style="width: 100%" height="250"
                        :header-cell-style="{ background: '#e6e2de' }">
                        <el-table-column prop="name" label="儲值卡排行前五名" width="200" />
                        <el-table-column prop="price" label="淨額" />
                        <el-table-column prop="quantityPct" label="佔比" />
                        <el-table-column prop="quantity" label="數量" />
                    </el-table>
                </div>
            </div>
            <div class="count-box">
                <h3>你的顧客都透過那些方式付款?</h3>
                <div class="count-block">
                    <h2>收款方式</h2>
                    <p>今日的收款方式</p>
                    <div>
                        <div ref="TotalPayTypeByTodayChart" :style="{ height: '350px' }"></div>
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

    >.row {
        display: flex;

        >.count-box {
            width: 50%;
            position: relative;
            margin: 5px 5px;

            >.count-block {
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
        margin: 5px;

        >.header-tab {
            display: block;
            color: #717171;
            background-color: #e6e2de;
            box-sizing: border-box;
            border-radius: 6px 6px 0px 0px;

            >tr {
                display: flex;
                align-items: center;
                height: 50px;
                justify-content: space-between;

                >.col-7-th {
                    width: 70%;
                }

                >.col-6-th {
                    width: 60%;
                }

                >.col-5-th {
                    width: 50%;
                }

                >.col-4-th {
                    width: 40%;
                }

                >.col-3-th {
                    width: 30%;
                }

                >.col-2-th {
                    width: 20%;
                }

                >.col-1-th {
                    width: 10%;
                }
            }

            .header-btn {
                justify-content: end;
                width: 5%;
                padding: 0 5px;
            }
        }

        >.content-tab {
            // position: absolute;
            // width: 100%;
            // top: 52px;
            // bottom: 0px;
            // overflow: auto;
            // display: block;
            height: 150px;
            box-sizing: border-box;
            border: solid 1px #e6e2de;
            border-radius: 6px 6px 0px 0px;

            >tr {
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;

                &::after {
                    content: "";
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
                    // display: flex
                    // width: 30%;

                    >button {
                        height: 100%;
                        background-color: transparent;
                        border: none;
                        padding: 0 0 0 0;
                        margin: 0 2px;

                        >img {
                            cursor: pointer;
                            width: 40px;
                            height: 40px;
                            vertical-align: middle;
                        }
                    }


                }

                .content-btn {
                    // justify-content: end;
                    width: 5%;
                    padding: 0 15px;
                }

                .content-name {
                    padding-left: 15px;
                }
            }
        }
    }
}
</style>