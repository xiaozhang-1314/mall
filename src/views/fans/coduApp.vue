<template>
<div>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div ref="main" style="width: 600px;height:400px;"></div>
</div>
</template>
<script>
// 加载echarts
import echarts from 'echarts'
export default {
    name: "Fans",
    data () {
          return {

          }
    },
    methods: {
        
    },
    mounted () {
    // 基于准备好的dom，初始化echarts实例，echarts5必须引入echarts
    var echarts = require('echarts')
     var myChart = echarts.init(this.$refs.main)
    // 注意：初始化操作DOM一定要写到 mounted 钩子函数中
    //指定图表的配置和数据
        var option = {
            title: {
                text: 'ECharts~~~~~~~~~图表'
            },
            tooltip: {},
            legend: {
                data:['深藏不露']
            },
            xAxis: {
                data: ["Mon","Tue","Wed","Thu","Fri","Sat", "Sun"]
            },
            yAxis: {},
            series: [{
                name: '深藏不露',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20, 55]
            }]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
    },
    created () {

    }
}
</script>

<style scoped>

</style>