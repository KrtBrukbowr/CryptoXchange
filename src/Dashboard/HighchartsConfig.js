import {lightTheme} from "../Shared/Styles"



export default function(historical) {
    return {
      // colors: lightTheme ? '#552ccb': '#61d936',

        colors: [
              '#61d936',
              '#552ccb',
              '#f376c1',
              '#1b2839',
              '#1163c9',
              '#04a1ee',
              '#08c6e0',
              '#146b9e',
      ],


      title: {
          text:''
      },
    chart: {
        backgroundColor: lightTheme ? '#e1eaee' : '#010e2c',

        className: 'dark-container',

    },

  yAxis: {
    title: {
      text: 'Price'
    },
     style: {
                color: '#CCC',
                fontWeight: 'bold',
                fontSize: '12px',
                fontFamily: 'Trebuchet MS, Verdana, sans-serif'
            },
    // gridLineColor: '#023e8a',
    // gridLineColor: '#061a44',
      gridLineColor: '#002855',
    gridLineWidth: 0.5,
        labels: {
            style: {
                color: '#A0A0A0'
            }
        },
        lineColor: '#A0A0A0',
        minorTickInterval: null,
        tickColor: '#A0A0A0',
        tickWidth: 0,

  },

  xAxis: {
    type: 'datetime',

    // gridLineColor: '#023e8a',
    // gridLineColor: '#061a44',
    gridLineColor: '#002855',
        gridLineWidth: .5,
        labels: {
            style: {
                color: '#A0A0A0'
            }
        },
        // lineColor: '#A0A0A0',
        // tickColor: '#A0A0A0',
        title: {
            style: {
                color: '#002855',
                fontWeight: 'bold',
                fontSize: '12px',
                fontFamily: 'Trebuchet MS, Verdana, sans-serif'
            }
        }
  },

  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: '#A0A0A0'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#444'
        },
        title: {
            style: {
                color: '#C0C0C0'
            }
        }
  },

  series: historical,
credits: {
        enabled: false
},

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

}
}


