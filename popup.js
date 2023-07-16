function createToggleButton() {
    toggleButton.style.display = "block";
    toggleButton.innerHTML = "<i class='material-icons' style='padding-right: 5px;'>auto_awesome</i><span style='padding-left: 5px;'>TOGGLE SHORTS</span>";
    toggleButton.style.color = "#fff";
    toggleButton.style.border = "none";
    toggleButton.style.borderRadius = "10px";
    toggleButton.style.backgroundColor = "#f00";
    toggleButton.style.padding = "10px 16px";
    toggleButton.style.fontWeight = "bold";
    toggleButton.style.position = "fixed";
    toggleButton.style.bottom = "20px";
    toggleButton.style.right = "20px";
    toggleButton.style.zIndex = "9999";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.display = "flex";
    toggleButton.style.flexDirection = "row";
    toggleButton.style.justifyContent = "center";
    toggleButton.style.alignItems = "center";
    toggleButton.style.fontFamily = "Roboto, Arial, sans-serif";
}

function updateToggleButton() {
    if (window.location.pathname === "/feed/subscriptions" || window.location.pathname === "/") {
        createToggleButton();
        if (!showShorts) {
            removeShorts();
        }
    } else {
        toggleButton.style.display = "none";
    }
}

// Toggle function
function toggleShorts() {
    showShorts = !showShorts;
    removeShorts();
}

function filterVideos(selector, callback) {
    const items = document.querySelectorAll(selector);
    items.forEach((item) => {
        const isShortVideo = item.querySelector(callback.selector);
        if (isShortVideo !== null) {
            if (isShortVideo.innerText.toLowerCase().includes("shorts") && !showShorts) {
                item.style.display = "none";
                //removeShorts();
            } else if (isShortVideo.innerText.toLowerCase().includes("shorts") && showShorts) {
                item.style.display = "block";
            }
        }
    });
}

function removeShorts() {
    // Remove all the short items
    filterVideos("#items > ytd-grid-video-renderer", {selector: "span.ytd-thumbnail-overlay-time-status-renderer"});
    filterVideos("#contents > ytd-rich-item-renderer", {selector: "span#text"});
    filterVideos("#contents > ytd-item-section-renderer", {selector: "span#text"});
    filterVideos("ytd-rich-section-renderer", {selector: "span#text"});

    const shortsSections = document.querySelectorAll("ytd-rich-section-renderer")
    shortsSections.forEach((section) => {
        if (section.innerText.toLowerCase().includes("shorts") && !showShorts) {
            section.style.display = "none"
        } else if (section.innerText.toLowerCase().includes("shorts") && showShorts) {
            section.style.display = "block";
        }
    })

    const shortsSectionsMobile = document.querySelectorAll("ytm-item-section-renderer")
    shortsSectionsMobile.forEach((section) => {
        if (section.innerText.toLowerCase().includes("shorts") && !showShorts) {
            section.style.display = "none"
        } else if (section.innerText.toLowerCase().includes("shorts") && showShorts) {
            section.style.display = "block";
        }
    })

    const menuItems = document.querySelectorAll("#items > ytd-guide-entry-renderer");
    menuItems.forEach((item) => {
        const isShortMenu = item.querySelector("#endpoint > tp-yt-paper-item > yt-formatted-string");
        if (isShortMenu !== null) {
            if (isShortMenu.innerText.toLowerCase().includes("shorts") && !showShorts) {
                item.style.display = "none";
                // Call again to check for further videos on the page
                //removeShorts();
            }
            if (isShortMenu.innerText.toLowerCase().includes("shorts") && showShorts) {
                item.style.display = "block";
            }
        }
    });
}

// Listen for scroll events and remove short videos if toggle is selected
window.addEventListener("scroll", () => {
    if (!showShorts) {
        removeShorts();
    }
});

window.addEventListener("DOMContentLoaded", () => {
    if (!showShorts) {
        removeShorts();
    }
})

// Listen for URL changes and update the toggle button
window.addEventListener("yt-page-data-updated", updateToggleButton);


let showShorts = false;

const materialIconsLink = document.createElement("link");
materialIconsLink.rel = "stylesheet";
materialIconsLink.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
document.head.appendChild(materialIconsLink);

const toggleButton = document.createElement("button");
document.body.appendChild(toggleButton);

// Add event listener to toggle button
toggleButton.addEventListener("click", toggleShorts);

updateToggleButton();

setTimeout(() => {
    updateToggleButton();
    removeShorts();
}, 1000);

function initObserver() {
    const observer = new MutationObserver((mutations) => {
        removeShorts();
    });

    const targetNode = document.querySelector("#content");
    if (targetNode) {
        const config = {childList: true, subtree: true};
        observer.observe(targetNode, config);
    }
}

initObserver();


