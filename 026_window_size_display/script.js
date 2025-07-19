const widthDisplay = document.getElementById('width-display');
const heightDisplay = document.getElementById('height-display');

function updateWindowSize() {
    widthDisplay.textContent = window.innerWidth;
    heightDisplay.textContent = window.innerHeight;
}

// Initial display
updateWindowSize();

// Update on resize
window.addEventListener('resize', updateWindowSize);