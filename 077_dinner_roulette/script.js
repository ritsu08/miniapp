const foodOptionsInput = document.getElementById('food-options');
const decideBtn = document.getElementById('decide-btn');
const chosenFoodDisplay = document.getElementById('chosen-food');

decideBtn.addEventListener('click', decideDinner);

function decideDinner() {
    const optionsText = foodOptionsInput.value.trim();
    if (!optionsText) {
        chosenFoodDisplay.textContent = '候補を入力してください。';
        return;
    }

    const foodOptions = optionsText.split(/\r\n|\n/).map(option => option.trim()).filter(option => option !== '');

    if (foodOptions.length === 0) {
        chosenFoodDisplay.textContent = '候補を入力してください。';
        return;
    }

    const randomIndex = Math.floor(Math.random() * foodOptions.length);
    chosenFoodDisplay.textContent = foodOptions[randomIndex];
}

// Initial example options
foodOptionsInput.value = `カレー
パスタ
寿司
ラーメン
ハンバーグ
中華
和食
イタリアン
フレンチ
焼肉`;

// Initial decision
decideDinner();