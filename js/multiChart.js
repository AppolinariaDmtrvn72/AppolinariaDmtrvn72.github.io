let myChart;
Chart.defaults.global.animation = false;
const MN1 = document.getElementById("N");
const L1 = document.getElementById("L");

const LambdaUP = document.getElementById("lambda1");
const LambdaDOWN = document.getElementById("lambda2");

const MA1 = document.getElementById("a");
const MB1 = document.getElementById("b");

let count = -255,
  multiplyer = -count;

x_center = 0;
x_range = 150;

function updateChart() {
  let wavelengthUP = Number(LambdaUP.value),
    wavelenghtDOWN = Number(LambdaDOWN.value),
    N = Number(MN1.value),
    b = Number(MA1.value) * 1e-3,
    d = Number(MB1.value) * 1e-3,
    L = Number(L1.value) * 1e3;

  let labels = [];
  let intensities = [];

  function intensityFunction(x) {
    let result = 0;
    let ccount = 0;
    let e = 1e-6;

    for (let i = wavelenghtDOWN; i <= wavelengthUP; i += 1) {
      result +=
        Math.pow(b, 2) *
        Math.pow(
          Math.sin((Math.PI * b * x) / (i * e * L)) /
            (Math.PI * b * x) /
            (i * e * L),
          2
        ) *
        Math.pow(
          Math.sin((N * (Math.PI * d * x)) / (i * e * L)) /
            Math.sin((Math.PI * d * x) / (i * e * L)),
          2
        );
      ccount++;
    }
    result = result / ccount;
    intensities.push(result);
  }

  x_center = parseFloat(x_center);
  for (let x = x_center - x_range; x <= x_center + x_range; x += 0.1) {
    x = +x.toFixed(10);
    labels.push(+x.toFixed(2));
    intensityFunction(x);
  }
  //   for (let x = (-3 / 2) * 1e2; x <= (3 / 2) * 1e2; x += 0.1) {
  //     // x = +x.toFixed(10),
  //     labels.push(+x.toFixed(2));
  //     intensityFunction(x);
  //   }

  if (d > b || N === 1) {
    myChart.data.labels = labels;
    myChart.data.datasets[0].data = intensities;

    // drawMultiInterfPicture(wavelenghtDOWN, wavelengthUP, d * 1000, 3000, 1, N ,b * 1000);
    drawMultiInterfPicture(
      wavelenghtDOWN,
      wavelengthUP,
      d * 100,
      L,
      10,
      b * 100,
      N,
      x_center,
      x_range
    );
  } else {
    drawMultiInterfPicture(0, 0, d * 100, L, 10, b * 100, N, x_center, x_range);
    Multi.data.labels = 0;
    Multi.data.datasets[0].data = 0;
    //drawMultiInterfPicture(0, 0, d * 100, L, 10, b * 100, N, x_center, x_range);
  }
  myChart.update();
}
