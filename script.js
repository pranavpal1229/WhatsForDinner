const video = document.getElementById('video');
const aiButton = document.querySelector("#ai-button");
const veggieContainer = document.querySelector("#veggie-container");
const fruitsContainer = document.querySelector("#fruits-container")
let currentFridge = [];

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
    // Run object detection every 10 seconds (10000 milliseconds)
    const detectObjects = () => {
      if (video.readyState === 4) { // Video is ready
        model.detect(video).then(predictions => {
          const tempFridge = predictions;
          console.log(predictions.map(p => p.class))
          if (JSON.stringify(predictions.map(p => p.class) ) !== JSON.stringify(currentFridge)) {
            console.log(currentFridge);
            const newItem = document.createElement('img');
            newItem.classList.add('item-img');
            if (predictions.map(p => p.class)[0] == 'banana'){
            newItem.src = 'banana-item.png';
            fruitsContainer.appendChild(newItem);}

            if (predictions.map(p => p.class).includes('apple')){
                newItem.src = 'apple-item.png';
                fruitsContainer.appendChild(newItem);}
                
            currentFridge = predictions.map(p => p.class); // Update currentFridge
          }
        });
      }
    };
    // Run detectObjects every 10 seconds
    setInterval(detectObjects, 3000);
  });
});

aiButton.addEventListener("click", function(){
  console.log('hi');
});
