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
})

$(function () {
  Highcharts.chart('first_chart', {
    title: {
      text: 'Passing and Failing builds per day'
    },

    xAxis: {
      categories: gon.days
    },

    yAxis: {
      title: {
        text: 'Builds'
      }
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
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

  Highcharts.chart('second_chart', {
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
