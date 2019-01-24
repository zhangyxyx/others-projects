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
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: '掌握前端的技术'
                    },
                    tooltip: {
                        headerFormat: '{series.name}<br>',
                        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: '浏览器访问量占比',
                        data: [
                            ['HTML',   20.0],
                            ['CSS',       20.0],
                            ['JavaScript',   12.0],
                            ['Jquery',       12.0],
                            ['HTMl5',   10.0],
                            ['CSS3',       10.0],
                            ['Backbone',   7.0],
                            ['Vue',       5.0],
                            {
                                name: 'Node',
                                y: 4.0,
                                sliced: true,
                                selected: true
                            },
                        ]
                    }]
            });
           
        }
    }
}
</script>

<style>
  
</style>
