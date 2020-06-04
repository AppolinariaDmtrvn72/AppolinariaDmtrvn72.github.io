let myChart;
const N1 = document.getElementById('N');
const Lambda1 = document.getElementById("lambda");
const A1 = document.getElementById("a");
const B1 = document.getElementById("b");
const L1 = document.getElementById("L");
let count = -255, multiplyer = -count;

x_center = 0;
x_range = 150;


function updateChart() {
    let wavelength = Number(Lambda1.value),
        N = Number(N1.value),
        b = Number(A1.value) * 1e-3,
        d = Number(B1.value) * 1e-3,
        L = Number(L1.value) * 1e3;

    let labels = [];
    let intensities = [];

    function sinfi(x) {
        return x/Math.sqrt((Math.pow(x, 2) + Math.pow(L, 2)))
    }

    function intensityFunction(x) {
       if(x === 0){
           x = 0.000000001;
       }

        let e = 1e-6;
        let u = (Math.PI * b * sinfi(x)) / (wavelength * e);
        let q = (Math.PI * d * sinfi(x)) / (wavelength * e );
        let res = Math.pow(b, 2) * Math.pow(Math.sin(u) / u, 2) * Math.pow(Math.sin(N * q) / Math.sin(q), 2)
        intensities.push(res)
    }

    x_center = parseFloat(x_center);
    for (let x = x_center-x_range; x <= x_center+x_range; x+=0.1) {
        x = +x.toFixed(10);
        labels.push(+x.toFixed(2));
        intensityFunction(x);
    }
    // for (let x = -3/2 * 1e2; x <= 3/2 * 1e2; x+=3/510 ) {
    //     labels.push(x.toFixed(2));
    //     intensityFunction(x);
    // }
    if(d > b || N === 1) {
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = intensities;
        drawMonoInterfPicture(wavelength, d * 100, b * 100, N, L, x_center, x_range);
    } else {
        drawMonoInterfPicture(0, d * 100, b * 100, N, L, x_center, x_range);
        myChart.data.labels = 0;
        myChart.data.datasets[0].data = 0;
    }
    myChart.update();
}
