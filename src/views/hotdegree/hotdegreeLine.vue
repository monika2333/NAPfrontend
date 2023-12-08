<template>
    <div ref="container" style="width: 100%; height: 100%; padding: 10px;" ></div>
</template>

<script>
import * as echarts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";

export default {
    data() {
        return {
            shuju: []
        };
    },
    props: ['hotlineData', 'hotTitle'],
    mounted() {
        this.draw()
    },
    watch:{
        hotlineData(){
            this.draw()
        }
    },
    methods: {
        draw() {
            console.log(this.hotTitle)
            const myChart = echarts.init(this.$refs.container);
            myChart.setOption({
                title: {
                    text: '话题热度趋势',
                    subtext: this.hotTitle,
                    left: '50%',
                    textAlign: 'center',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                    },
                    formatter: (params) => {
                        console.log(params)
                        return `时间：${params[0].name}<br>${params[0].marker} ${params[0].value[1].toFixed(2)}`
                    }
                },
                grid:{
                    top: 90,
                    bottom: 40,
                },
                xAxis:{
                    show: this.hotlineData.length, // 无数据时不展示 x 轴
                    type: 'category',
                },
                yAxis:{

                },
                series: [
                    {
                        type: 'line',
                        data: this.hotlineData.slice(0, -9),
                        smooth: 'x',
                    },
                    {
                        type: 'line',
                        data: this.hotlineData.slice(-10),
                        smooth: 'x',
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                ],
                graphic: {
                    type: 'text',
                    left: 'center',
                    top: 'middle',
                    silent: true,
                    invisible: this.hotlineData.length,
                    style: {
                        fill: 'black',
                        fontWeight: 'bold',
                        text: '先选择话题后查看',
                        fontSize: '20px',
                        textAlign: 'center'
                    }
                }
            });

            const erd = elementResizeDetectorMaker();
            erd.listenTo(this.$refs.container, () => {
                    myChart.resize();
                });
        }
    }
}
</script>

<style scoped>

</style>