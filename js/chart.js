function drowChart(update_f) {
  var ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "I(x)",
          data: [],
          labels: [],
          borderColor: "#007bff",
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            position: "right",
            scaleLabel: {
              display: true,
              fontFamily: "Helvetica",

              fontStyle: "bold",
              labelString: "Интенсивность (I)",
            },
            ticks: {
              fontColor: "black",
              fontStyle: "bold",
              callback: function (value, index, values) {
                return (100 * value).toFixed(2);
              },
            },
          },
        ],
        xAxes: [
          {
            position: "top",
            scaleLabel: {
              display: true,
              fontStyle: "bold",
              lineHeight: 1,
              padding: 2,
              labelString: "Расстояние (мм)",
            },
            display: true,
            ticks: {
              fontSize: 12,
              fontColor: "black",
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 10,
              callback: function (value, index, values) {
                return Math.floor(value);
              },
              // maxTicksLimit: 8,
            },
          },
        ],
      },
    },
  });
  update_f();
}
