const urlInput = document.getElementById('url-input');
const loadUrlBtn = document.getElementById('load-url-btn');
const deviceSelector = document.querySelector('.device-selector');
const customWidthInput = document.getElementById('custom-width');
const customHeightInput = document.getElementById('custom-height');
const customSizeBtn = document.getElementById('custom-size-btn');
const responsiveIframe = document.getElementById('responsive-iframe');
const iframeContainer = document.querySelector('.iframe-container');

loadUrlBtn.addEventListener('click', loadUrl);
customSizeBtn.addEventListener('click', setCustomSize);

deviceSelector.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.id !== 'custom-size-btn') {
        const width = event.target.dataset.width;
        const height = event.target.dataset.height;
        setIframeSize(width, height);
    }
});

function loadUrl() {
    let url = urlInput.value.trim();
    if (!url) return;

    // Add http:// if not present
    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }
    responsiveIframe.src = url;
}

function setIframeSize(width, height) {
    iframeContainer.style.width = `${width}px`;
    iframeContainer.style.height = `${height}px`;
}

function setCustomSize() {
    const width = customWidthInput.value;
    const height = customHeightInput.value;
    if (width && height) {
        setIframeSize(width, height);
    }
}

// Initial load
loadUrl();
setIframeSize(1024, 768); // Default to a common desktop size