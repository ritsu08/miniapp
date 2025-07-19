const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview'); // 画像の読み込み用
const imageCanvas = document.getElementById('image-canvas'); // 描画とクリックイベント用
const colorSwatches = document.getElementById('color-swatches');
const errorMessage = document.getElementById('error-message');
const noImageMessage = document.getElementById('no-image-message');
const imageDisplayArea = document.getElementById('image-display-area');
const resetColorsBtn = document.getElementById('reset-colors-btn');
const randomColorsBtn = document.getElementById('random-colors-btn');

const ctx = imageCanvas.getContext('2d');
let selectedPoints = []; // {x: internalPixelX, y: internalPixelY, color: rgbString} のオブジェクトを保持
const MAX_SELECTED_COLORS = 5;
const CIRCLE_RADIUS = 10; // 円の半径 (CSSピクセル単位)

let isDragging = false;
let draggedPointIndex = -1;
let originalImageData = null; // 画像のピクセルデータを保持 (Canvasの表示サイズに合わせたもの)

// --- Event Listeners ---
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('dragover');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

imageCanvas.addEventListener('mousedown', (e) => {
    if (!imagePreview.src || !originalImageData) return; // 画像が読み込まれていない場合は何もしない

    const rect = imageCanvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // クリックされた表示座標をCanvasの内部ピクセル座標に変換
    const scaleX = imageCanvas.width / rect.width; // 内部ピクセル / CSSピクセル
    const scaleY = imageCanvas.height / rect.height; // 内部ピクセル / CSSピクセル
    const pixelX = Math.max(0, Math.min(imageCanvas.width - 1, Math.floor(clickX * scaleX)));
    const pixelY = Math.max(0, Math.min(imageCanvas.height - 1, Math.floor(clickY * scaleY)));

    // 既存の円がクリックされたか判定
    for (let i = 0; i < selectedPoints.length; i++) {
        const point = selectedPoints[i];
        // Canvas内部ピクセル座標をCSSピクセル座標に変換
        const displayPointX = point.x / scaleX;
        const displayPointY = point.y / scaleY;

        const distance = Math.sqrt(Math.pow(clickX - displayPointX, 2) + Math.pow(clickY - displayPointY, 2));

        if (distance < CIRCLE_RADIUS) { // 半径を考慮
            isDragging = true;
            draggedPointIndex = i;
            return;
        }
    }

    // 新しい色を選択
    if (selectedPoints.length < MAX_SELECTED_COLORS) {
        const rgb = getColorFromImageData(pixelX, pixelY);
        selectedPoints.push({ x: pixelX, y: pixelY, color: rgb });
    } else {
        // 5色を超えたら古いものを削除して新しいものを追加
        selectedPoints.shift();
        const rgb = getColorFromImageData(pixelX, pixelY);
        selectedPoints.push({ x: pixelX, y: pixelY, color: rgb });
    }

    redrawCanvas(); // Canvasを再描画して円を表示
    displayColorSwatches(selectedPoints.map(p => p.color));
});

imageCanvas.addEventListener('mousemove', (e) => {
    if (!isDragging || draggedPointIndex === -1 || !originalImageData) return;

    const rect = imageCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const scaleX = imageCanvas.width / rect.width;
    const scaleY = imageCanvas.height / rect.height;

    // 座標をクランプ
    const pixelX = Math.max(0, Math.min(imageCanvas.width - 1, Math.floor(x * scaleX)));
    const pixelY = Math.max(0, Math.min(imageCanvas.height - 1, Math.floor(y * scaleY)));

    // ドラッグ中の円の位置を更新
    selectedPoints[draggedPointIndex].x = pixelX;
    selectedPoints[draggedPointIndex].y = pixelY;

    // 新しい位置の色を再取得 (originalImageDataから)
    selectedPoints[draggedPointIndex].color = getColorFromImageData(pixelX, pixelY);

    redrawCanvas(); // Canvasを再描画
    displayColorSwatches(selectedPoints.map(p => p.color));
});

imageCanvas.addEventListener('mouseup', () => {
    isDragging = false;
    draggedPointIndex = -1;
});

imageCanvas.addEventListener('mouseleave', () => {
    isDragging = false;
    draggedPointIndex = -1;
});

resetColorsBtn.addEventListener('click', resetColors);
randomColorsBtn.addEventListener('click', selectRandomColors);

// --- Functions ---

function handleFile(file) {
    errorMessage.textContent = '';
    if (!file.type.startsWith('image/')) {
        errorMessage.textContent = '画像ファイルをドロップしてください。';
        return;
    }

    noImageMessage.style.display = 'none';
    imageDisplayArea.style.display = 'block';
    resetColorsBtn.classList.remove('hidden');
    randomColorsBtn.classList.remove('hidden'); // ランダムボタンも表示
    colorSwatches.innerHTML = '';
    selectedPoints = []; // リセット

    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.onload = () => {
            // Canvasの内部解像度を画像本来のサイズに設定
            imageCanvas.width = imagePreview.naturalWidth;
            imageCanvas.height = imagePreview.naturalHeight;
            // 画像データを取得して保持
            ctx.drawImage(imagePreview, 0, 0, imageCanvas.width, imageCanvas.height);
            originalImageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
            redrawCanvas(); // 画像をCanvasに描画
        };
    };
    reader.readAsDataURL(file);
}

function getColorFromImageData(x, y) {
    if (!originalImageData) return 'rgb(0,0,0)'; // データがない場合は黒を返す
    const index = (y * originalImageData.width + x) * 4;
    const r = originalImageData.data[index];
    const g = originalImageData.data[index + 1];
    const b = originalImageData.data[index + 2];
    return `rgb(${r},${g},${b})`;
}

function redrawCanvas() {
    // Canvasをクリア
    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    // 画像をCanvasに描画
    if (originalImageData) {
        ctx.putImageData(originalImageData, 0, 0);
    }

    // 選択されたすべての円を描画
    selectedPoints.forEach(point => {
        // Canvasの表示サイズと内部解像度の比率を計算
        const rect = imageCanvas.getBoundingClientRect();
        const internalToDisplayScaleX = rect.width / imageCanvas.width;
        const internalToDisplayScaleY = rect.height / imageCanvas.height;

        ctx.beginPath();
        // 描画する円の座標と半径をCanvas内部ピクセル単位で計算
        ctx.arc(point.x, point.y, CIRCLE_RADIUS / internalToDisplayScaleX, 0, 2 * Math.PI); // 半径をスケール
        ctx.fillStyle = point.color;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2 / internalToDisplayScaleX; // 線幅もスケール
        ctx.fill();
        ctx.stroke();
    });
}

function resetColors() {
    selectedPoints = [];
    colorSwatches.innerHTML = '';
    redrawCanvas(); // Canvasを再描画して円を消す
    errorMessage.textContent = '';
}

function selectRandomColors() {
    if (!originalImageData) {
        errorMessage.textContent = '画像を読み込んでください。';
        return;
    }

    selectedPoints = []; // 既存の選択をクリア

    const width = imageCanvas.width;
    const height = imageCanvas.height;

    for (let i = 0; i < MAX_SELECTED_COLORS; i++) {
        const randomX = Math.floor(Math.random() * width);
        const randomY = Math.floor(Math.random() * height);
        const rgb = getColorFromImageData(randomX, randomY);
        selectedPoints.push({ x: randomX, y: randomY, color: rgb });
    }

    redrawCanvas();
    displayColorSwatches(selectedPoints.map(p => p.color));
}

// RGB文字列 (例: "rgb(255,0,0)") を16進数コードに変換
function rgbToHex(rgbString) {
    const parts = rgbString.match(/\d+/g); // 数値を抽出
    if (!parts || parts.length !== 3) return rgbString; // 無効な場合は元の文字列を返す
    const r = parseInt(parts[0]);
    const g = parseInt(parts[1]);
    const b = parseInt(parts[2]);

    const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex; // 1桁の場合は0を付加
    };

    return "#" + toHex(r) + toHex(g) + toHex(b);
}

function displayColorSwatches(colors) {
    colorSwatches.innerHTML = ''; // 一度クリア

    if (colors.length === 0) {
        return;
    }

    colors.forEach(color => {
        const swatch = document.createElement('div');
        const hexColor = rgbToHex(color).toUpperCase(); // 16進数コードに変換
        swatch.classList.add('color-swatch');
        swatch.style.backgroundColor = color; // 背景色はRGBのまま

        // テキストの色を背景色に応じて調整
        const rgbParts = color.match(/\d+/g).map(Number);
        const luminance = (0.299 * rgbParts[0] + 0.587 * rgbParts[1] + 0.114 * rgbParts[2]) / 255;
        swatch.style.color = luminance > 0.5 ? 'black' : 'white';

        swatch.textContent = hexColor; // 16進数コードを表示
        swatch.addEventListener('click', () => {
            navigator.clipboard.writeText(hexColor);
            alert(`${hexColor} をクリップボードにコピーしました！`);
        });
        colorSwatches.appendChild(swatch);
    });
}