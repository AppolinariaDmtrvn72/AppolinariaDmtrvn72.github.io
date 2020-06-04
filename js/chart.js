function drowChart(update_f) {

    var ctx = document.getElementById('myChart').getContext('2d');
     myChart = new Chart(ctx, {
         type: 'line',
         data: {
             labels: [],
             datasets: [
                 {
                     label: 'I(x)',
                     data: [],
                     labels: [],
                     borderColor: '#007bff',
                     borderWidth: 2,
                     fill: false,
                     pointRadius: 0
                 }
             ]
         },
         options: {
             scales: {
                 yAxes: [{
                     position: 'right',
                     scaleLabel: {
                         display: true,
                         fontFamily: 'Helvetica',

                         fontStyle: 'bold',
                         labelString: "Интенсивность (I)"
                     },
                     ticks: {
                         fontColor: "black",
                         fontStyle: 'bold',
                         callback: function (value, index, values) {
                             return (100 * (value)).toFixed(2);
                         }
                     }

                 }],
                 xAxes: [{
                     position: 'top',
                     scaleLabel: {
                         display: true,
                         fontStyle: 'bold',
                         lineHeight: 1,
                         padding: 2,
                         labelString: "Расстояние (мм)"
                     },
                     display: true,
                     ticks: {
                         fontSize: 12,
                         fontColor: "black",
                         fontStyle: 'bold',
                         beginAtZero: true,
                         maxTicksLimit: 9,
                         callback: function (value, index, values) {
                             if( value === -150 || value === -116.6 || value === -83.2 || value === -49.8 || value === -16.4){
                                 return value;
                             } else if (value === 17){
                                 return 16.4;
                             }else if (value === 50.4){
                                 return 49.8;
                             } else if (value === 83.8){
                                 return 83.2;
                             } else if (value === 117.2){
                                 return 116.6;
                             }
                              return '';
                         },
                         // maxTicksLimit: 8,

                     }
                 }]
             }
         }
    });
    update_f();
}
