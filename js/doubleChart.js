let myChart;
const N1 = document.getElementById('N');
const Lambda1 = document.getElementById("lambda1");
const Lambda2 = document.getElementById("lambda2");
const A1 = document.getElementById("a");
const B1 = document.getElementById("b");
const L1 = document.getElementById("L");


function updateChart() {
    let wavelength1 = Number(Lambda1.value),
        wavelength2 = Number(Lambda2.value),
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
        let e = 1e-6;
        if(x === 0){
            x = 0.000000001;}

        let u1 = (Math.PI * b * sinfi(x)) / (wavelength1 * e );
        let q1 = (Math.PI * d * sinfi(x)) / (wavelength1 * e );
        let res1 = Math.pow(b, 2) * Math.pow(Math.sin(u1) / u1, 2) * Math.pow(Math.sin(N * q1) / Math.sin(q1), 2);



        let u2 = (Math.PI * b * sinfi(x)) / (wavelength2 * e );
        let q2 = (Math.PI * d * sinfi(x)) / (wavelength2 * e );
        let res2 = Math.pow(b, 2) * Math.pow(Math.sin(u2) / u2, 2) * Math.pow(Math.sin(N * q2) / Math.sin(q2), 2);

        let res = (res1 + res2)/2;

        intensities.push(res)
    }




    for (let x = -3/2 * 1e2 ; x <=3/2 * 1e2 ; x += 0.1 ) {
       x = +x.toFixed(10);

        labels.push(+x.toFixed(2));
        intensityFunction(x);
    }

    if( d > b || N === 1) {
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = intensities;
        drawDoubleInterfPicture(wavelength1, wavelength2, d * 100, b * 100, N, L)
    } else {
        myChart.data.labels = 0;
        myChart.data.datasets[0].data = 0;
        drawDoubleInterfPicture(0, 0, d * 100, b * 100, N, L)

    }
    myChart.update();

}
