const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const outputData = document.getElementById('output-data');
const outputMessage = document.getElementById('output-message');

// Request camera access
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(function(stream) {
        video.srcObject = stream;
        video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
        video.play();
        requestAnimationFrame(tick);
    })
    .catch(function(err) {
        outputMessage.textContent = 'カメラへのアクセスを許可してください。または、カメラが見つかりません。';
        console.error('Error accessing camera:', err);
    });

function tick() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });

        if (code) {
            outputData.textContent = code.data;
            outputMessage.textContent = 'QRコードを検出しました！';
            // Optionally stop video stream after successful scan
            // video.srcObject.getTracks().forEach(track => track.stop());
            // return;
        } else {
            outputData.textContent = '';
            outputMessage.textContent = 'QRコードをスキャン中...';
        }
    }
    requestAnimationFrame(tick);
}