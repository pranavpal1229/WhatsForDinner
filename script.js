const video = document.getElementById('video');
const aiButton = document.querySelector("#ai-button")
// Access the webcam stream and assign it to the video element
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(err => {
    console.error('Error accessing the webcam: ', err);
  });

// Load the model and wait for the video to be ready
cocoSsd.load().then(model => {
  // Wait for the video to be fully loaded and ready
  video.addEventListener('loadeddata', () => {
    // Run object detection periodically
    const detectObjects = () => {
      if (video.readyState === 4) { // Video is ready
        model.detect(video).then(predictions => {
          console.log('Predictions: ', predictions);
        });
      }
      requestAnimationFrame(detectObjects); // Continue detecting objects
    };
    detectObjects();
  });
});

aiButton.addEventListener("click", function(){
    console.log('hi')
})
