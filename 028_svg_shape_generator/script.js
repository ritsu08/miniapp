const shapeTypeSelect = document.getElementById('shape-type');
const svgPreview = document.getElementById('svg-preview');
const svgCodeTextarea = document.getElementById('svg-code');
const copyBtn = document.getElementById('copy-btn');

const rectControls = document.getElementById('rect-controls');
const circleControls = document.getElementById('circle-controls');
const ellipseControls = document.getElementById('ellipse-controls');
const lineControls = document.getElementById('line-controls');
const polygonControls = document.getElementById('polygon-controls');

const fillColorInput = document.getElementById('fill-color');
const strokeColorInput = document.getElementById('stroke-color');
const strokeWidthInput = document.getElementById('stroke-width');

const allControls = [
    rectControls, circleControls, ellipseControls, lineControls, polygonControls
];

function updateSvg() {
    const shapeType = shapeTypeSelect.value;
    let svgElement = '';
    let svgCode = '';

    // Hide all controls first
    allControls.forEach(control => control.classList.add('hidden'));

    const fillColor = fillColorInput.value;
    const strokeColor = strokeColorInput.value;
    const strokeWidth = strokeWidthInput.value;

    switch (shapeType) {
        case 'rect':
            rectControls.classList.remove('hidden');
            const rectWidth = document.getElementById('rect-width').value;
            const rectHeight = document.getElementById('rect-height').value;
            const rectRx = document.getElementById('rect-rx').value;
            const rectRy = document.getElementById('rect-ry').value;
            svgElement = `<rect x="0" y="0" width="${rectWidth}" height="${rectHeight}" rx="${rectRx}" ry="${rectRy}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
            svgCode = `<rect width="${rectWidth}" height="${rectHeight}" rx="${rectRx}" ry="${rectRy}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
            break;
        case 'circle':
            circleControls.classList.remove('hidden');
            const circleR = document.getElementById('circle-r').value;
            svgElement = `<circle cx="50" cy="50" r="${circleR}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
            svgCode = `<circle cx="50" cy="50" r="${circleR}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
            break;
        case 'ellipse':
            ellipseControls.classList.remove('hidden');
            const ellipseRx = document.getElementById('ellipse-rx').value;
            const ellipseRy = document.getElementById('ellipse-ry').value;
            svgElement = `<ellipse cx="50" cy="50" rx="${ellipseRx}" ry="${ellipseRy}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
            svgCode = `<ellipse cx="50" cy="50" rx="${ellipseRx}" ry="${ellipseRy}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
            break;
        case 'line':
            lineControls.classList.remove('hidden');
            const lineX1 = document.getElementById('line-x1').value;
            const lineY1 = document.getElementById('line-y1').value;
            const lineX2 = document.getElementById('line-x2').value;
            const lineY2 = document.getElementById('line-y2').value;
            svgElement = `<line x1="${lineX1}" y1="${lineY1}" x2="${lineX2}" y2="${lineY2}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
            svgCode = `<line x1="${lineX1}" y1="${lineY1}" x2="${lineX2}" y2="${lineY2}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
            break;
        case 'polygon':
            polygonControls.classList.remove('hidden');
            const polygonPoints = document.getElementById('polygon-points').value;
            svgElement = `<polygon points="${polygonPoints}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
            svgCode = `<polygon points="${polygonPoints}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
            break;
    }

    svgPreview.innerHTML = svgElement;
    svgCodeTextarea.value = `<svg width="100" height="100" viewBox="0 0 100 100">
    ${svgCode}
</svg>`;
}

// Event Listeners
shapeTypeSelect.addEventListener('change', updateSvg);

// Rect controls
document.getElementById('rect-width').addEventListener('input', updateSvg);
document.getElementById('rect-height').addEventListener('input', updateSvg);
document.getElementById('rect-rx').addEventListener('input', updateSvg);
document.getElementById('rect-ry').addEventListener('input', updateSvg);

// Circle controls
document.getElementById('circle-r').addEventListener('input', updateSvg);

// Ellipse controls
document.getElementById('ellipse-rx').addEventListener('input', updateSvg);
document.getElementById('ellipse-ry').addEventListener('input', updateSvg);

// Line controls
document.getElementById('line-x1').addEventListener('input', updateSvg);
document.getElementById('line-y1').addEventListener('input', updateSvg);
document.getElementById('line-x2').addEventListener('input', updateSvg);
document.getElementById('line-y2').addEventListener('input', updateSvg);

// Polygon controls
document.getElementById('polygon-points').addEventListener('input', updateSvg);

// Common controls
fillColorInput.addEventListener('input', updateSvg);
strokeColorInput.addEventListener('input', updateSvg);
strokeWidthInput.addEventListener('input', updateSvg);

copyBtn.addEventListener('click', () => {
    svgCodeTextarea.select();
    document.execCommand('copy');
    alert('SVGコードをコピーしました！');
});

// Initial setup
updateSvg();