<script setup lang="ts">
import { init } from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'
interface Props {
    width?: string;
    height?: string;
    option: EChartsOption;
}
const props = withDefaults(defineProps<Props>(), {
    width: '100%',
    height: '100%',
    option: () => ({})
});
const myChartsRef = ref<HTMLDivElement>();
let myChart: ECharts;
let timer: number | undefined;
const myChartRefValue = myChartsRef.value;
const initChart = (): void => {
    if (myChart !== undefined) {
        myChart.dispose();
    }
    myChart = init(myChartsRef.value as HTMLDivElement);
    myChart?.setOption(props.option, true)
}
const resizeChart = (): void => {
    timer = setTimeout(() => {
        if (myChart) {
            myChart.resize();
        }
    }, 500)
}

onMounted(() => {
    initChart();
    window.addEventListener('resize', resizeChart);
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart);
    clearTimeout(timer);
    timer = 0;
})
watch(
    props.option,
    () => {
        initChart();
    },
    {
        deep: true
    }
)
</script>
<template>
    <div ref="myChartsRef" :style="{ height: height, width: width }" :pption="option"></div>
</template>