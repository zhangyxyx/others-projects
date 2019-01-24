<template>
<div id="container" style="width:600px;height:400px" ></div>  
</template>

<script>
import Highcharts from 'highcharts'
import $ from 'jquery'
export default {
    mounted:function(){
        this.show();
    },
    methods:{
        show:function(){
            var chart = new Highcharts.Chart('container', {
               chart: {
            type: 'column'
        },
        title: {
            text: '掌握前端的技术'
        },
        subtitle: {
            text: '时间范围：2014/11-至今'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: [{
            title: {
                text: '掌握程度'
            },
            tickInterval:50,
            min:0,
            max:200
        },
        {
            title: {
                text: 'dfdf'
            },
            tickInterval:50,
            min:0,
            max:400,
            opposite: true
        }
        ],
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        series: [{
            name: '前端技术掌握程度',
            colorByPoint: true,
            data: [{
                name: 'HTML',
                y: 90,
                drilldown: 'HTML'
            }, {
                name: 'CSS',
                y: 90,
                drilldown: 'CSS'
            }, {
                name: 'JavaScript',
                y: 85,
                drilldown: 'JavaScript'
            }, {
                name: 'Jquery',
                y: 80,
                drilldown: 'Jquery'
            }, {
                name: 'HTML5',
                y: 75,
                drilldown: 'HTML5'
            }, {
                name: 'CSS3',
                y: 75,
                drilldown: 'CSS3',
            }, {
                name: 'Backbone',
                y: 70,
                drilldown: 'Backbone',
            }, {
                name: 'Vue',
                y: 50,
                drilldown: 'Vue',
            }, {
                name: 'Node',
                y: 40,
                drilldown: 'Node',
            },]
        }],
            });
          
        }
    }
}
</script>

<style>
  
</style>
