const webcamElement = document.getElementById("webcam");
let net;

async function app() {
  console.log("Loading mobilenet..");

  // Load the model.
  net = await mobilenet.load();
  console.log("Sucessfully loaded model");

  await setupWebcam();
  while (true) {
    const result = await net.classify(webcamElement);

    document.getElementById("console").innerText = `
        prediction: ${result[0].className}\n
        probability: ${result[0].probability}
      `;

    // Give some breathing room by waiting for the next animation frame to
    // fire.
    await tf.nextFrame();
  }
}

async function setupWebcam() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  webcamElement.srcObject = stream;
}

app();
