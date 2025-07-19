const countryNameDisplay = document.getElementById('country-name');
const optionsContainer = document.getElementById('options-container');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');

const capitals = [
    { country: '日本', capital: '東京' },
    { country: 'アメリカ', capital: 'ワシントンD.C.' },
    { country: 'イギリス', capital: 'ロンドン' },
    { country: 'フランス', capital: 'パリ' },
    { country: 'ドイツ', capital: 'ベルリン' },
    { country: '中国', capital: '北京' },
    { country: '韓国', capital: 'ソウル' },
    { country: 'カナダ', capital: 'オタワ' },
    { country: 'オーストラリア', capital: 'キャンベラ' },
    { country: 'ブラジル', capital: 'ブラジリア' },
    { country: 'インド', capital: 'ニューデリー' },
    { country: 'ロシア', capital: 'モスクワ' },
    { country: 'イタリア', capital: 'ローマ' },
    { country: 'スペイン', capital: 'マドリード' },
    { country: 'メキシコ', capital: 'メキシコシティ' }
];

let currentQuestion;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateQuiz() {
    feedbackText.textContent = '';
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';

    const shuffledCapitals = shuffleArray([...capitals]);
    currentQuestion = shuffledCapitals[0];

    countryNameDisplay.textContent = currentQuestion.country;

    const correctOption = currentQuestion.capital;
    const incorrectOptions = shuffledCapitals.slice(1, 4).map(c => c.capital);
    const allOptions = shuffleArray([correctOption, ...incorrectOptions]);

    allOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, correctOption));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption, correctOption) {
    if (selectedOption === correctOption) {
        feedbackText.textContent = '正解！';
        feedbackText.style.color = 'green';
    } else {
        feedbackText.textContent = `不正解！正解は ${correctOption} です。`;
        feedbackText.style.color = 'red';
    }
    // Disable all option buttons after an answer is selected
    optionsContainer.querySelectorAll('button').forEach(button => {
        button.disabled = true;
        if (button.textContent === correctOption) {
            button.classList.add('correct');
        } else if (button.textContent === selectedOption) {
            button.classList.add('incorrect');
        }
    });
    nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', generateQuiz);

// Initial quiz generation
generateQuiz();