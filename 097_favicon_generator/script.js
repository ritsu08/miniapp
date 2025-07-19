const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const originalImagePreview = document.getElementById('original-image-preview');
const imagePreviewContainer = document.getElementById('image-preview-container');
const faviconResults = document.getElementById('favicon-results');
const mainFaviconPreview = document.getElementById('main-favicon-preview');
const mainPreviewImg = document.getElementById('main-preview-img');
const downloadButtonsGrid = document.getElementById('download-buttons-grid');
const errorMessage = document.getElementById('error-message');
const noImageMessage = document.getElementById('no-image-message');
const downloadFormatSelect = document.getElementById('download-format');

const FAVICON_SIZES = [16, 32, 48, 64, 128, 192, 512];

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

downloadFormatSelect.addEventListener('change', generateFavicons);

// --- Functions ---

function handleFile(file) {
    errorMessage.textContent = '';
    if (!file.type.startsWith('image/')) {
        errorMessage.textContent = '画像ファイルをドロップしてください。';
        return;
    }

    noImageMessage.style.display = 'none';
    // imagePreviewContainer.style.display = 'block'; // 削除
    faviconResults.style.display = 'block';
    downloadButtonsGrid.innerHTML = ''; // クリア

    const reader = new FileReader();
    reader.onload = (e) => {
        originalImagePreview.src = e.target.result;
        originalImagePreview.onload = generateFavicons; // 画像が完全に読み込まれてから生成
    };
    reader.readAsDataURL(file);
}

function generateFavicons() {
    if (!originalImagePreview.src) {
        return; // 画像が読み込まれていない場合は何もしない
    }

    downloadButtonsGrid.innerHTML = ''; // 一度クリア
    const format = downloadFormatSelect.value;

    // メインプレビュー (128x128px)
    const mainCanvas = document.createElement('canvas');
    mainCanvas.width = 128;
    mainCanvas.height = 128;
    const mainCtx = mainCanvas.getContext('2d');
    drawAndTrimImage(originalImagePreview, mainCtx, 128, 128);
    mainPreviewImg.src = mainCanvas.toDataURL(format);
    mainPreviewImg.style.display = 'block';

    // 各サイズのダウンロードボタンを生成
    FAVICON_SIZES.forEach(size => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        drawAndTrimImage(originalImagePreview, ctx, size, size);

        const dataUrl = canvas.toDataURL(format);
        const filename = `favicon-${size}x${size}.${format.split('/')[1]}`;

        const downloadBtn = document.createElement('button');
        downloadBtn.classList.add('download-btn');
        downloadBtn.textContent = `${size}x${size} ダウンロード`;
        downloadBtn.addEventListener('click', () => {
            downloadFile(dataUrl, filename);
        });
        downloadButtonsGrid.appendChild(downloadBtn);
    });
}

function drawAndTrimImage(img, ctx, targetWidth, targetHeight) {
    const imgAspectRatio = img.naturalWidth / img.naturalHeight;
    const canvasAspectRatio = targetWidth / targetHeight;

    let sx, sy, sWidth, sHeight; // source coordinates and dimensions

    if (imgAspectRatio > canvasAspectRatio) {
        // 画像がCanvasより横長の場合、高さを合わせ、横をトリミング
        sHeight = img.naturalHeight;
        sWidth = sHeight * canvasAspectRatio;
        sx = (img.naturalWidth - sWidth) / 2;
        sy = 0;
    } else {
        // 画像がCanvasより縦長の場合、幅を合わせ、縦をトリミング
        sWidth = img.naturalWidth;
        sHeight = sWidth / canvasAspectRatio;
        sx = 0;
        sy = (img.naturalHeight - sHeight) / 2;
    }

    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);
}

function downloadFile(dataUrl, filename) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

