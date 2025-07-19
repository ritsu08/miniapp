const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const bgColorInput = document.getElementById('bg-color');
const textColorInput = document.getElementById('text-color');
const textInput = document.getElementById('text');
const generateBtn = document.getElementById('generate-btn');
const dummyImage = document.getElementById('dummy-image');
const imageUrlTextarea = document.getElementById('image-url');
const copyBtn = document.getElementById('copy-btn');

function generateImageUrl() {
    const width = widthInput.value;
    const height = heightInput.value;
    const bgColor = bgColorInput.value.substring(1); // #を削除
    const textColor = textColorInput.value.substring(1); // #を削除
    const text = encodeURIComponent(textInput.value);

    // placehold.jp を使用
    const url = `https://placehold.jp/${bgColor}/${textColor}/${width}x${height}.png?text=${text}`;
    
    dummyImage.src = url;
    imageUrlTextarea.value = url;
}

generateBtn.addEventListener('click', generateImageUrl);

copyBtn.addEventListener('click', () => {
    imageUrlTextarea.select();
    document.execCommand('copy');
    alert('URLをコピーしました！');
});

// Initial generation
generateImageUrl();