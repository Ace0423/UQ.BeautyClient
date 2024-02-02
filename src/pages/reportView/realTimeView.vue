<script setup lang="ts">
import apexchart from 'vue3-apexcharts'

const saleChart = {
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
        categories: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    },
    yaxis: {
        title: {
            text: ''
        },
        max: 1,
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
</script>
<template>
    <div class="content">
        <div class="row">
            <div class="count-box">
                <h3>今日的銷售業績如何?</h3>
                <div class="count-block">
                    <h2>營業總額</h2>
                    <p>今日的營業狀況</p>
                    <h1>$0</h1>
                    <div class="sale-info">
                        <img style="background-color: #1a73e8" />
                        <p>服務$0(0%)</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #dadce0" />
                        <p>商品$0(0%)</p>
                    </div>
                    <div id="sale-chart">
                        <apexchart type="bar" height="350" :options="saleChart" :series="saleData"></apexchart>
                    </div>
                </div>
            </div>
            <div class="count-box">
                <h3>這周還有多少預約呢?</h3>
                <div class="count-block">
                    <h2>即將到來的預約數</h2>
                    <p>未來一周的預約狀況</p>
                    <h1>14</h1>
                    <div id="reserve-chart">
                        <apexchart type="line" height="350" :options="reserveChart" :series="reserveDate"></apexchart>
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
                    <h1>$0</h1>
                    <div class="sale-info">
                        <img style="background-color: #1a73e8" />
                        <p>服務</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #dadce0" />
                        <p>商品</p>
                    </div>
                    <div id="sale-chart">
                        <apexchart type="bar" height="350" :options="personalSaleChart" :series="personalSaleData">
                        </apexchart>
                    </div>
                </div>
            </div>
            <div class="count-box">
                <h3>你的顧客都是哪些人呢?</h3>
                <div class="count-block">
                    <h2>來客數</h2>
                    <p>今日的來客數</p>
                    <h1>$0</h1>
                    <div class="sale-info">
                        <img style="background-color: #1a73e8" />
                        <p>男性0(0%)</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #dadce0" />
                        <p>女性0(0%)</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #d1687f" />
                        <p>不透漏0(0%)</p>
                    </div>
                    <div id="customer-chart">
                        <apexchart type="bar" height="350" :options="customerChart" :series="customerData"></apexchart>
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
                    <h1>$0</h1>
                    <p>總銷售數量0</p>
                    <table class="tab">
                        <thead class="header-tab">
                            <tr>
                                <th class="col-4-th">
                                    <p>服務排行前五名 </p>
                                </th>
                                <th class="col-2-th">
                                    <p>淨額</p>
                                </th>
                                <th class="col-2-th">
                                    <p>佔比</p>
                                </th>
                                <th class="col-2-th">
                                    <p>數量</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="content-tab">
                            <tr>
                                <td class="col-4-th">
                                    <p>無資料 </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="count-box">
                <h3>你最讓人喜愛的商品是什麼?</h3>
                <div class="count-block">
                    <h2>商品排行佔比</h2>
                    <p>今日的商品銷售</p>
                    <h1>$0</h1>
                    <p>總銷售數量0</p>
                    <table class="tab">
                        <thead class="header-tab">
                            <tr>
                                <th class="col-4-th">
                                    <p>服務排行前五名 </p>
                                </th>
                                <th class="col-2-th">
                                    <p>淨額</p>
                                </th>
                                <th class="col-2-th">
                                    <p>佔比</p>
                                </th>
                                <th class="col-2-th">
                                    <p>數量</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="content-tab">
                            <tr>
                                <td class="col-4-th">
                                    <p>ˋ暫無資料 </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="count-box">
                <h3>優惠卷使用狀況如何?</h3>
                <div class="count-block">
                    <h2>優惠卷排行佔比</h2>
                    <p>今日的優惠卷的排行佔比</p>
                    <h1>$0</h1>
                    <p>總使用數量0</p>
                    <table class="tab">
                        <thead class="header-tab">
                            <tr>
                                <th class="col-6-th">
                                    <p>優惠卷排行 </p>
                                </th>
                                <th class="col-2-th">
                                    <p>優惠卷成本</p>
                                </th>
                                <th class="col-2-th">
                                    <p>使用數</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="content-tab">
                            <tr>
                                <td class="col-4-th">
                                    <p>暫無資料 </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="count-box">
                <h3>儲值卡使用狀況如何?</h3>
                <div class="count-block">
                    <h2>總銷售額</h2>
                    <p>儲值卡的銷售銷售</p>
                    <h1>$0</h1>
                    <div>
                        <p>總累積未收額 $0 </p>
                        <p>已實收總面額 $0</p>
                    </div>
                    <table class="tab">
                        <thead class="header-tab">
                            <tr>
                                <th class="col-4-th">
                                    <p>服務排行前五名 </p>
                                </th>
                                <th class="col-2-th">
                                    <p>淨額</p>
                                </th>
                                <th class="col-2-th">
                                    <p>佔比</p>
                                </th>
                                <th class="col-2-th">
                                    <p>數量</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="content-tab">
                            <tr>
                                <td class="col-4-th">
                                    <p>ˋ暫無資料 </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="count-box">
                <h3>計次卷使用狀況如何?</h3>
                <div class="count-block">
                    <h2>總銷售額</h2>
                    <p>計次劵的總銷售額</p>
                    <h1>$0</h1>
                    <div>
                        <p>總累積未收額 $0 </p>
                        <p>已實收總面額 $0</p>
                    </div>
                    <table class="tab">
                        <thead class="header-tab">
                            <tr>
                                <th class="col-4-th">
                                    <p>計次劵排行 </p>
                                </th>
                                <th class="col-2-th">
                                    <p>銷售額</p>
                                </th>
                                <th class="col-2-th">
                                    <p>佔比</p>
                                </th>
                                <th class="col-2-th">
                                    <p>數量</p>
                                </th>
                                <th class="col-2-th">
                                    <p>累積未收額</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="content-tab">
                            <tr>
                                <td class="col-4-th">
                                    <p>暫無資料 </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="count-box">
                <h3>你的顧客都透過那些方式付款?</h3>
                <div class="count-block">
                    <h2>收款方式</h2>
                    <p>今日的收款方式</p>
                    <div id="chart">
                        <apexchart type="donut" width="380" :options="payChart" :series="payData"></apexchart>
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