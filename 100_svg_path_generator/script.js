const clearCanvasBtn = document.getElementById('clear-canvas-btn');
const shapeSelect = document.getElementById('shape-select');
const svgCanvas = document.getElementById('svg-canvas');
const svgOutput = document.getElementById('svg-output');
const copySvgBtn = document.getElementById('copy-svg-btn');

let isDrawing = false;
let startX, startY;
let currentShape = null;

// --- Event Listeners ---
clearCanvasBtn.addEventListener('click', clearCanvas);
shapeSelect.addEventListener('change', () => {
    // 図形タイプが変更されたら、現在の描画をリセット
    isDrawing = false;
    currentShape = null;
});

svgCanvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const rect = svgCanvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    const selectedShape = shapeSelect.value;

    if (selectedShape === 'line') {
        currentShape = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        currentShape.setAttribute('x1', startX);
        currentShape.setAttribute('y1', startY);
        currentShape.setAttribute('x2', startX);
        currentShape.setAttribute('y2', startY);
        currentShape.setAttribute('stroke', 'black');
        currentShape.setAttribute('stroke-width', '2');
    } else if (selectedShape === 'rect') {
        currentShape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        currentShape.setAttribute('x', startX);
        currentShape.setAttribute('y', startY);
        currentShape.setAttribute('width', '0');
        currentShape.setAttribute('height', '0');
        currentShape.setAttribute('fill', 'transparent');
        currentShape.setAttribute('stroke', 'black');
        currentShape.setAttribute('stroke-width', '2');
    } else if (selectedShape === 'circle') {
        currentShape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        currentShape.setAttribute('cx', startX);
        currentShape.setAttribute('cy', startY);
        currentShape.setAttribute('r', '0');
        currentShape.setAttribute('fill', 'transparent');
        currentShape.setAttribute('stroke', 'black');
        currentShape.setAttribute('stroke-width', '2');
    }

    if (currentShape) {
        svgCanvas.appendChild(currentShape);
    }
});

svgCanvas.addEventListener('mousemove', (e) => {
    if (!isDrawing || !currentShape) return;

    const rect = svgCanvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const selectedShape = shapeSelect.value;

    if (selectedShape === 'line') {
        currentShape.setAttribute('x2', currentX);
        currentShape.setAttribute('y2', currentY);
    } else if (selectedShape === 'rect') {
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        const x = Math.min(startX, currentX);
        const y = Math.min(startY, currentY);
        currentShape.setAttribute('x', x);
        currentShape.setAttribute('y', y);
        currentShape.setAttribute('width', width);
        currentShape.setAttribute('height', height);
    } else if (selectedShape === 'circle') {
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        currentShape.setAttribute('r', radius);
    }

    generateSvgCode();
});

svgCanvas.addEventListener('mouseup', () => {
    isDrawing = false;
    currentShape = null;
    generateSvgCode();
});

copySvgBtn.addEventListener('click', () => {
    svgOutput.select();
    document.execCommand('copy');
    alert('SVGコードをコピーしました！');
});

// --- Functions ---

function clearCanvas() {
    svgCanvas.innerHTML = ''; // SVG要素の子要素をすべて削除
    svgOutput.value = '';
}

function generateSvgCode() {
    // SVG要素のinnerHTMLをそのまま出力
    svgOutput.value = svgCanvas.innerHTML;
}
