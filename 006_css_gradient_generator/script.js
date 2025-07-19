const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const angle = document.getElementById('angle');
const previewBox = document.getElementById('preview-box');
const cssCode = document.getElementById('css-code');
const copyBtn = document.getElementById('copy-btn');

function updateGradient() {
    const angleValue = angle.value + 'deg';
    const color1Value = color1.value;
    const color2Value = color2.value;

    const gradientValue = `linear-gradient(${angleValue}, ${color1Value}, ${color2Value})`;

    previewBox.style.background = gradientValue;
    cssCode.value = `background: ${gradientValue};`;
}

[color1, color2, angle].forEach(input => {
    input.addEventListener('input', updateGradient);
});

copyBtn.addEventListener('click', () => {
    cssCode.select();
    document.execCommand('copy');
    alert('コピーしました！');
});

// Initial gradient
updateGradient();