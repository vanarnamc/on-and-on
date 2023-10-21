let handpose;
let video;
let predictions = [];
let lastHandPosition = null; // Possible values: "left", "right", or null

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  // video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  checkHandPosition();

}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}

function checkHandPosition() {
    const h1 = select('#handStatus'); // Select the h1 element by its id
  
    for (let i = 0; i < predictions.length; i++) {
      // For simplicity, you can use the first keypoint (wrist) to determine the position of the hand
      const wristKeypoint = predictions[i].landmarks[0];
  
      if (wristKeypoint[0] < width / 2) {
        if (lastHandPosition !== "right") {
          h1.html("on"); // Update the content to "on" when the hand is on the left side
          lastHandPosition = "right";
        }
      } else {
        if (lastHandPosition !== "left") {
          h1.html("and"); // Update the content to "and" when the hand is on the right side
          lastHandPosition = "left";
        }
      }
    }
  }
  
