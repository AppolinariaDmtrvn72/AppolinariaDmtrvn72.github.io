function drawDoubleInterfPicture(
  wavelength1,
  wavelength2,
  d,
  b,
  N,
  L,
  x_center,
  x_range
) {
  function rgbMix(color1, color2) {
    let r = (color1.r + color2.r) / 2;
    let g = (color1.g + color2.g) / 2;
    let b = (color1.b + color2.b) / 2;

    return new RGBColor(r, g, b);
  }

  function intensityFunction(x, length) {
    let e = 1e-6;
    let u = (Math.PI * b * x) / (length * e * L);
    let q = (Math.PI * d * x) / (length * e * L);
    return (
      Math.pow(2, 2) *
      Math.pow(Math.sin(u) / u, 2) *
      Math.pow(Math.sin(N * q) / Math.sin(q), 2)
    );
  }

  let labels = [];

  let from = (x_center - x_range) / 100;
  let to = (x_center + x_range) / 100;
  for (let x = from; x <= to; x += N / wavelength1) {
    labels.push(x);
  }

  let ctx = document.getElementById("interference_picture").getContext("2d"),
    width = document.getElementById("interference_picture").offsetWidth,
    height = document.getElementById("interference_picture").offsetHeight,
    intensities1 = [],
    intensities2 = [];

  ctx.clearRect(0, 0, width, height);

  labels.forEach(function (x) {
    intensities1.push(intensityFunction(x, wavelength1));
    intensities2.push(intensityFunction(x, wavelength2));
  });

  let yStep = width / labels.length;

  //let Max1 = intensities1[labels.length / 2];
  //let Max2 = intensities2[labels.length / 2];
  let Max1 = Math.max.apply(Math, intensities1);
  let Max2 = Math.max.apply(Math, intensities2);

  labels.forEach(function (x, index) {
    const yCoord = index * yStep;
    const alpha1 = intensities1[index] / Max1;
    const alpha2 = intensities2[index] / Max1;

    let color1 = Math.nmToRGB2(wavelength1);
    color1 = rgbaFromRGB(color1);
    color1.a = alpha1;

    let color2 = Math.nmToRGB(wavelength2);
    color2 = rgbaFromRGB(color2);
    color2.a = alpha2;

    color1 = convertRGBAtoRGB(color1);
    color2 = convertRGBAtoRGB(color2);

    let color = rgbMix(
      color1,
      color2,
      intensityFunction(x, wavelength1),
      intensityFunction(x, wavelength2)
    );
    ctx.strokeStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";

    ctx.beginPath();
    ctx.moveTo(yCoord, 0);
    ctx.lineTo(yCoord, width);
    ctx.closePath();
    ctx.stroke();
  });
}
