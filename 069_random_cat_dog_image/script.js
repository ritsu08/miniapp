const animalImage = document.getElementById('animal-image');
const getCatBtn = document.getElementById('get-cat-btn');
const getDogBtn = document.getElementById('get-dog-btn');

const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';
const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';

async function fetchCatImage() {
    try {
        const response = await fetch(CAT_API_URL);
        const data = await response.json();
        if (data && data.length > 0) {
            animalImage.src = data[0].url;
            animalImage.alt = 'ランダムな猫の画像';
        } else {
            animalImage.alt = '猫の画像が見つかりませんでした。';
        }
    } catch (error) {
        console.error('Error fetching cat image:', error);
        animalImage.alt = '猫の画像の取得に失敗しました。';
    }
}

async function fetchDogImage() {
    try {
        const response = await fetch(DOG_API_URL);
        const data = await response.json();
        if (data && data.status === 'success') {
            animalImage.src = data.message;
            animalImage.alt = 'ランダムな犬の画像';
        } else {
            animalImage.alt = '犬の画像が見つかりませんでした。';
        }
    } catch (error) {
        console.error('Error fetching dog image:', error);
        animalImage.alt = '犬の画像の取得に失敗しました。';
    }
}

getCatBtn.addEventListener('click', fetchCatImage);
getDogBtn.addEventListener('click', fetchDogImage);

// Initial load
fetchCatImage(); // Load a cat image by default