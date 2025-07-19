const fontSelect = document.getElementById('font-select');
const fontSizeInput = document.getElementById('font-size');
const previewTextInput = document.getElementById('preview-text');
const fontPreview = document.getElementById('font-preview');

const GOOGLE_FONTS_API_URL = 'https://fonts.googleapis.com/css2?family=';

// Function to load Google Fonts dynamically
function loadGoogleFont(fontFamily) {
    const link = document.createElement('link');
    link.href = `${GOOGLE_FONTS_API_URL}${fontFamily.replace(/ /g, '+')}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

// Populate font select (example fonts, in a real app you'd fetch a list)
const availableFonts = [
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald',
    'Noto Sans JP', 'M PLUS Rounded 1c', 'Kosugi Maru'
];

availableFonts.forEach(font => {
    const option = document.createElement('option');
    option.value = font;
    option.textContent = font;
    fontSelect.appendChild(option);
    loadGoogleFont(font); // Pre-load fonts
});

function updatePreview() {
    const selectedFont = fontSelect.value;
    const fontSize = fontSizeInput.value + 'px';
    const previewText = previewTextInput.value;

    fontPreview.style.fontFamily = `'${selectedFont}', sans-serif`;
    fontPreview.style.fontSize = fontSize;
    fontPreview.textContent = previewText;
}

fontSelect.addEventListener('change', updatePreview);
fontSizeInput.addEventListener('input', updatePreview);
previewTextInput.addEventListener('input', updatePreview);

// Initial preview
updatePreview();