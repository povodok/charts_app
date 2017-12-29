// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function () {
  Highcharts.chart('container', {
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

  Highcharts.chart('container1', {
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
