<script setup lang="ts">
import * as echarts from 'echarts';
import { ref } from 'vue';
import apexchart from 'vue3-apexcharts';
import Echarts from "@/components/ReEcharts/index.vue";
import type { ECharts, EChartsOption } from 'echarts'
const turnoverOption: EChartsOption = reactive({
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            itemStyle: {
                color: '#1a73e8'
            },
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        },
        {
            itemStyle: {
                color: '#dadce0'
            },
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        },
        {
            itemStyle: {
                color: '#d1687f'
            },
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }
    ]
});
const reservationsOption: EChartsOption = reactive({
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
        }
    ]
})
const turnoverData: any = [
    {
        ranked: '沉浸式全身按摩',
        amount: '$30000',
    },
    {
        ranked: '沉浸式全身按摩',
        amount: '$30000',
    }
];
const personalOption: EChartsOption = reactive({
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            itemStyle: {
                color: '#1a73e8'
            },
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        },
        {
            itemStyle: {
                color: '#dadce0'
            },
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        },
        {
            itemStyle: {
                color: '#d1687f'
            },
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }
    ]
});
const consumersOption: EChartsOption = reactive({
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
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['新客', '舊客']
    },
    series: [
        {
            type: 'bar',
            itemStyle: {
                color: '#1a73e8'
            },
            data: [4, 3, 2]
        },
        {
            type: 'bar',
            itemStyle: {
                color: '#d1687f'
            },
            data: [4, 3, 2]
        },
        {
            type: 'bar',
            itemStyle: {
                color: '#dadce0'
            },
            data: [4, 3, 2]
        }
    ]
});
const proportionData: any = [
    {
        ranked: '1 沉浸式全身按摩',
        networth: '$30000',
        proportion: '18%',
        quantity: '12'
    },
    {
        ranked: '2 揉臀推腰芳香調理',
        networth: '$4000',
        proportion: '12%',
        quantity: '8'
    },
    {
        ranked: '3 纖腿翹臀排酸體雕',
        networth: '$14000',
        proportion: '12%',
        quantity: '8'
    }, {
        ranked: '4 鬆背收押芳香調理',
        networth: '$8000',
        proportion: '9%',
        quantity: '6'
    },
    {
        ranked: '5 溫感泛石臀療SPA',
        networth: '$9660000',
        proportion: '7%',
        quantity: '5'
    }

];
</script>
<template>
    <div class="content">
        <div class="total-count">
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
        </div>
        <div class="row">
            <div class="count-box">
                <div class="count-block">
                    <h2>營業總額</h2>
                    <h1>$0</h1>
                    <div class="sale-info">
                        <img style="background-color: #1a73e8" />
                        <p>服務$0(0%)</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #dadce0" />
                        <p>商品$0(0%)</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #d1687f" />
                        <p>違約金$0(0%)</p>
                    </div>
                    <div id="sale-chart">
                        <Echarts :option="turnoverOption" :height="'350px'" />
                    </div>
                </div>
            </div>
            <div class="count-box">
                <div class="count-block">
                    <h2>即將到來的預約數</h2>
                    <p>未來一周的預約狀況</p>
                    <h1>14</h1>
                    <div id="reserve-chart">
                        <Echarts :option="reservationsOption" :height="'350px'" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="count-box">
                <div class="count-block">
                    <h2>人員業績</h2>
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
                        <Echarts :option="personalOption" :height="'350px'" />
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
                    <h1>$10004</h1>
                    <div id="reserve-chart">
                        <Echarts :option="reservationsOption" :height="'350px'" />
                    </div>
                </div>
            </div>
            <div class="count-box">
                <h2>你的顧客都是哪些人呢?</h2>
                <div class="count-block">
                    <h2>來客數</h2>
                    <p>今日的來客數</p>
                    <h1>$0</h1>
                    <div class="sale-info">
                        <img style="background-color: #1a73e8" />
                        <p>男性0(0%)</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #d1687f" />
                        <p>女性0(0%)</p>
                    </div>
                    <div class="sale-info">
                        <img style="background-color: #dadce0" />
                        <p>不透漏0(0%)</p>
                    </div>
                    <div id="customer-chart">
                        <Echarts :option="consumersOption" :height="'350px'" />
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
                    <div id="time-period" style="height: 350px; overflow: auto;">
                        <table border="5" cellspacing="0" align="center">
                            <!-- <tr>
                                <td height="50" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td height="50" width="100">
                                    <b>
                                        星期一
                                    </b>
                                </td>
                                <td height="50" width="100">
                                    <b>
                                        星期二
                                    </b>
                                </td>
                                <td height="50" width="100">
                                    <b>
                                        星期三
                                    </b>
                                </td>
                                <td height="50" width="100">
                                    <b>
                                        星期四
                                    </b>
                                </td>
                                <td height="50" width="100">
                                    <b>
                                        星期五
                                    </b>
                                </td>
                                <td height="50" width="100">
                                    <b>
                                        星期六
                                    </b>
                                </td>
                                <td height="50" width="100">
                                    <b>
                                        星期日
                                    </b>
                                </td>
                            </tr> -->
                            <tr>
                                <td width="50">
                                    <b>
                                        0
                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>
                                        2
                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>
                                        4
                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>
                                        6
                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>
                                        8
                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>
                                        10
                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>
                                        12
                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>
                                        14
                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>
                                        16
                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>
                                        18
                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>
                                        20
                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>
                                        22
                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td width="50">
                                    <b>
                                        24
                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                                <td class="color-td" width="100">
                                    <b>

                                    </b>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="count-box">
                <h2>你的顧客都是哪些人呢?</h2>
                <div class="count-block">
                    <h2>累積暫收金額</h2>
                    <h1>$0</h1>
                    <p>已實收 $0</p>
                    <p>累積未收總額 $0</p>
                    <div class="tab">
                        <el-table :data="proportionData" height="250" style="width: 100%">
                            <el-table-column prop="ranked" label="服務排行佔比" width='150' />
                            <el-table-column prop="networth" label="淨值" />
                            <el-table-column prop="proportion" label="佔比" />
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

    ::v-deep .el-table {
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
                td{
                    
                }
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

