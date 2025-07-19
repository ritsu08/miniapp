const colorPicker = document.getElementById('color-picker');
const hexCode = document.getElementById('hex-code');
const rgbCode = document.getElementById('rgb-code');
const hslCode = document.getElementById('hsl-code');

function updateColorCodes(hex) {
    hexCode.value = hex;

    // HEX to RGB
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    rgbCode.value = `rgb(${r}, ${g}, ${b})`;

    // HEX to HSL
    const r_norm = r / 255;
    const g_norm = g / 255;
    const b_norm = b / 255;

    const max = Math.max(r_norm, g_norm, b_norm);
    const min = Math.min(r_norm, g_norm, b_norm);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r_norm: h = (g_norm - b_norm) / d + (g_norm < b_norm ? 6 : 0); break;
            case g_norm: h = (b_norm - r_norm) / d + 2; break;
            case b_norm: h = (r_norm - g_norm) / d + 4; break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    hslCode.value = `hsl(${h}, ${s}%, ${l}%)`;
}

colorPicker.addEventListener('input', (event) => {
    updateColorCodes(event.target.value);
});

// Initial value
updateColorCodes(colorPicker.value);