const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const paddingInput = document.getElementById('padding');
const borderInput = document.getElementById('border');
const marginInput = document.getElementById('margin');
const bgColorInput = document.getElementById('background-color');
const borderColorInput = document.getElementById('border-color');

const contentBox = document.querySelector('.content-box');
const paddingBox = document.querySelector('.padding-box');
const borderBox = document.querySelector('.border-box');
const marginBox = document.querySelector('.margin-box');

const cssOutput = document.getElementById('css-output');
const copyCssBtn = document.getElementById('copy-css-btn');

// --- Event Listeners ---
const inputs = [widthInput, heightInput, paddingInput, borderInput, marginInput, bgColorInput, borderColorInput];
inputs.forEach(input => input.addEventListener('input', updateBoxModel));

copyCssBtn.addEventListener('click', () => {
    cssOutput.select();
    document.execCommand('copy');
    alert('CSSコードをコピーしました！');
});

// Initial update
updateBoxModel();

// --- Functions ---

function updateBoxModel() {
    const width = parseInt(widthInput.value) || 0;
    const height = parseInt(heightInput.value) || 0;
    const padding = parseInt(paddingInput.value) || 0;
    const border = parseInt(borderInput.value) || 0;
    const margin = parseInt(marginInput.value) || 0;
    const bgColor = bgColorInput.value;
    const borderColor = borderColorInput.value;

    // Apply styles to content box
    contentBox.style.width = `${width}px`;
    contentBox.style.height = `${height}px`;
    contentBox.style.backgroundColor = bgColor;

    // Apply styles to padding box
    paddingBox.style.padding = `${padding}px`;

    // Apply styles to border box
    borderBox.style.borderWidth = `${border}px`;
    borderBox.style.borderColor = borderColor;
    borderBox.style.borderStyle = 'solid';

    // Apply styles to margin box
    marginBox.style.margin = `${margin}px`;

    generateCssOutput();
}

function generateCssOutput() {
    const width = parseInt(widthInput.value) || 0;
    const height = parseInt(heightInput.value) || 0;
    const padding = parseInt(paddingInput.value) || 0;
    const border = parseInt(borderInput.value) || 0;
    const margin = parseInt(marginInput.value) || 0;
    const bgColor = bgColorInput.value;
    const borderColor = borderColorInput.value;

    let css = `/* Content Box */\n.content-box {\n    width: ${width}px;\n    height: ${height}px;\n    background-color: ${bgColor};\n}\n\n/* Padding Box */\n.padding-box {\n    padding: ${padding}px;\n}\n\n/* Border Box */\n.border-box {\n    border: ${border}px solid ${borderColor};\n}\n\n/* Margin Box */\n.margin-box {\n    margin: ${margin}px;\n}\n`;

    cssOutput.value = css;
}