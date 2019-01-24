<template>
<div id="container" style="min-width:400px;height:400px" ></div>  
</template>

<script>
import Highcharts from 'highcharts'
export default {
    mounted:function(){
        this.show();
    },
    methods:{
        show:function(){
            var chart = new Highcharts.Chart('container', {
                   chart: {
                        type: 'column',
                        margin: 75,
                        options3d: {
                            enabled: true,
                            alpha: 10,
                            beta: 25,
                            depth: 70
                        }
                    },
                    title: {
                        text: '包含空值的3D柱状图'
                    },
                    subtitle: {
                        text: '请注意值为 0 和 null 的区别'
                    },
                    plotOptions: {
                        column: {
                            depth: 25
                        }
                    },
                    xAxis: {
                        categories: Highcharts.getOptions().lang.shortMonths
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    series: [{
                        name: '销售',
                        data: [2, 3, null, 4, 0, 5, 1, 4, 6, 3]
                    }]
            });
           
        }
    }
}
</script>

<style>
  
</style>
