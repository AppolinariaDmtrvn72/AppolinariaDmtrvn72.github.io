function drawMultiInterfPicture(
  wavelengthLowerBorder,
  wavelengthUpperBorder,
  d,
  L,
  wavelengthDelta,
  b,
  N,
  x_center,
  x_range
) {
  function rgbMix(colors) {
    let r = 0,
      g = 0,
      b = 0;

    colors.forEach(function (color) {
      r += color.r;
      g += color.g;
      b += color.b;
    });

    r /= colors.length;
    g /= colors.length;
    b /= colors.length;

    return new RGBColor(r, g, b);
  }

  const coefficient = Number((24.35 - 0.1 * (L * 1e-3)) / 17).toFixed(2);

  function alpha(x, length) {
    const e = 1e-6;

    let u = (Math.PI * b * x) / (length * e * L);
    let q = (Math.PI * d * x) / (length * e * L);
    return (
      Math.pow(b, 2) *
      Math.pow(Math.sin(u) / u, 2) *
      Math.pow(Math.sin(N * q) / Math.sin(q), 2)
    );
  }
  let labels = [];

  // for (let x = -3 / 2; x <= 3 / 2; x += 3 / 496) {
  //   labels.push(x);
  // }

  let from = (x_center - x_range) / 100;
  let to = (x_center + x_range) / 100;
  for (let x = from; x <= to; x += N / wavelengthUpperBorder) {
    labels.push(x);
  }

  let ctx = document.getElementById("interference_picture").getContext("2d"),
    width = document.getElementById("interference_picture").offsetWidth,
    height = document.getElementById("interference_picture").offsetHeight;

  ctx.clearRect(0, 0, width, height);

  let yStep = width / labels.length;
  let al,
    max = 0;

  labels.forEach(function (x, index) {
    for (
      let i = wavelengthLowerBorder;
      i <= wavelengthUpperBorder;
      i += wavelengthDelta
    ) {
      al = alpha(x, i);
      if (al > max) {
        max = al;
      }
    }
  });

  labels.forEach(function (x, index) {
    const yCoord = index * yStep;

    let colors = [];

    for (
      let i = wavelengthLowerBorder;
      i <= wavelengthUpperBorder;
      i += wavelengthDelta
    ) {
      let alp = alpha(x, i);

      const currentColor = Math.nmToRGB(i);
      const currentAlpha = alp / max;

      const sourceRGBAColor = rgbaFromRGB(currentColor, currentAlpha);

      let rgbColor = convertRGBAtoRGB(sourceRGBAColor);
      colors.push(rgbColor);
    }

    let color = rgbMix(colors);

    ctx.strokeStyle = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
    ctx.beginPath();
    ctx.moveTo(yCoord, 0);
    ctx.lineTo(yCoord, width);
    ctx.closePath();
    ctx.stroke();
  });
}
