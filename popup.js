let showShorts = false;

const toggleButton = document.createElement("button");
document.body.appendChild(toggleButton);
setInterval(()=>{
if(window.location.href == "https://www.youtube.com/feed/subscriptions"){
// Create toggle button
toggleButton.style.display = "block";
toggleButton.innerText = "Toggle Shorts";
toggleButton.style.position = "fixed";
toggleButton.style.bottom = "20px";
toggleButton.style.right = "20px";
toggleButton.style.zIndex = "9999";
toggleButton.style.cursor = "pointer";

}
else{
toggleButton.style.display = "none";

}
}, 1000)

// Toggle function
function toggleShorts() {
  showShorts = !showShorts;
  removeShorts();
}

function removeShorts() {
  // Get all the video items
  const videoItems = document.querySelectorAll('#items > ytd-grid-video-renderer');

  // Loop through each video item
  videoItems.forEach((item) => {
    // Check if the video item is a short video
    const isShortVideo = item.querySelector('span.ytd-thumbnail-overlay-time-status-renderer');
    if (isShortVideo !== null) {
      // If it's a short video and showShorts is false, hide it from the feed
      if (isShortVideo.innerText.toLowerCase().includes("shorts") && !showShorts) {
        item.style.display = "none";
      }
      // If it's a short video and showShorts is true, show it in the feed
      if (isShortVideo.innerText.toLowerCase().includes("shorts") && showShorts) {
        item.style.display = "block";
      }
    }
  });
}

// Add event listener to toggle button
toggleButton.addEventListener("click", toggleShorts);

// Listen for scroll events and remove short videos if toggle is selected
window.addEventListener('scroll', () => {
  if (!showShorts) {
    removeShorts();
  }
});

setTimeout(()=>{removeShorts();}, 1000)
