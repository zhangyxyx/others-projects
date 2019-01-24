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
                title: {
                    text: '掌握前端的技术',
                    x: -20
                },
                subtitle: {
                    text: '时间范围：2014/12-至今',
                    x: -20
                },
                xAxis: {
                    categories: ['HTML', 'CSS', 'JavaScript', 'Jquery', 'HTML5', 'CSS3', 'Backbone', 'Vue', 'Node']
                },
                yAxis: {
                    title: {
                        text: '掌握程度'
                    },
                    plotLines: [{
                        value: 0,
                        width: 5,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '°C'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: '前端技术',
                    data: [9.0, 9.0, 8.5, 8.0, 7.5, 7.5, 7.0, 5.0, 4.0]
                }]
            });
        }
    }
}
</script>

<style>
  
</style>
