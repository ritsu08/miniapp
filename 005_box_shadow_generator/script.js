const hOffset = document.getElementById('h-offset');
const vOffset = document.getElementById('v-offset');
const blur = document.getElementById('blur');
const spread = document.getElementById('spread');
const color = document.getElementById('color');
const opacity = document.getElementById('opacity');
const inset = document.getElementById('inset');
const previewBox = document.getElementById('preview-box');
const cssCode = document.getElementById('css-code');
const copyBtn = document.getElementById('copy-btn');

function updateShadow() {
    const hOffsetValue = hOffset.value + 'px';
    const vOffsetValue = vOffset.value + 'px';
    const blurValue = blur.value + 'px';
    const spreadValue = spread.value + 'px';
    const colorValue = hexToRgba(color.value, opacity.value);
    const insetValue = inset.checked ? 'inset' : '';

    const boxShadowValue = `${insetValue} ${hOffsetValue} ${vOffsetValue} ${blurValue} ${spreadValue} ${colorValue}`.trim();

    previewBox.style.boxShadow = boxShadowValue;
    cssCode.value = `box-shadow: ${boxShadowValue};`;
}

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

[hOffset, vOffset, blur, spread, color, opacity, inset].forEach(input => {
    input.addEventListener('input', updateShadow);
});

copyBtn.addEventListener('click', () => {
    cssCode.select();
    document.execCommand('copy');
    alert('コピーしました！');
});

// Initial shadow
updateShadow();