function drawMonoInterfPicture(wavelength, d, b, N, L, x_center, x_range) {
  function intensityFunction(x) {
    let e = 1e-6;
    let u = (Math.PI * b * x) / (wavelength * e * L);
    let q = (Math.PI * d * x) / (wavelength * e * L);
    return (
      Math.pow(b, 2) *
      Math.pow(Math.sin(u) / u, 2) *
      Math.pow(Math.sin(N * q) / Math.sin(q), 2)
    );
  }

  let labels = [];
  let from = (x_center - x_range) / 100;
  let to = (x_center + x_range) / 100;
  for (let x = from; x <= to; x += N / wavelength) {
    labels.push(x);
  }

  let ctx = document.getElementById("interference_picture").getContext("2d"),
    width = document.getElementById("interference_picture").offsetWidth,
    height = document.getElementById("interference_picture").offsetHeight,
    intensities = [];

  ctx.clearRect(0, 0, width, height);

  labels.forEach(function (x) {
    intensities.push(intensityFunction(x));
  });

  let yStep = width / labels.length;

  let Max = Math.max.apply(Math, intensities); //[labels.length / 2 ];

  labels.forEach(function (x, index) {
    const yCoord = index * yStep;
    const alpha = intensities[index] / Max;

    const rgbaColor = rgbaFromRGB(Math.nmToRGB(wavelength), alpha);
    const rgbColor = convertRGBAtoRGB(rgbaColor);

    ctx.strokeStyle =
      "rgba(" +
      rgbaColor.r +
      ", " +
      rgbaColor.g +
      ", " +
      rgbaColor.b +
      ", " +
      rgbaColor.a +
      ")";
    ctx.beginPath();
    ctx.moveTo(yCoord, 0);
    ctx.lineTo(yCoord, width);
    ctx.closePath();
    ctx.stroke();
  });
}
