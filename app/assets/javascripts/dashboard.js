var points = [];
gon.abnormal_days.forEach(function(item) {
  points.push({
    point: {
      x: item,
      y: gon.failing[item],
      xAxis: 0,
      yAxis: 0
    },
    text: 'abnormal'
  });
});

$(function () {
  Highcharts.chart('builds_per_day', {
    chart: {
      type: 'column'
    },

    title: {
      text: 'Passed/Failed builds per day'
    },

    xAxis: {
      categories: gon.days
    },

    yAxis: {
      min: 0,
      title: {
        text: 'Number of builds'
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
        }
      }
    },

    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },

    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },

    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
        }
      }
    },

    annotations: [{
      labels: points
    }],

    series: [{
      name: 'Passing',
      data: gon.passing
    },
    {
      name: 'Failing',
      data: gon.failing
    }]
  });

  Highcharts.chart('duration_vs_time', {
    title: {
      text: 'Duration vs Time'
    },

    xAxis: {
      categories: gon.times
    },

    yAxis: {
      title: {
        text: 'Duration'
      }
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    series: [{
      name: 'Duration',
      data: gon.duration
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  });
});
