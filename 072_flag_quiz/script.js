const flagImage = document.getElementById('flag-image');
const optionsContainer = document.getElementById('options-container');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');

const flags = [
    { name: '日本', code: 'JP' },
    { name: 'アメリカ', code: 'US' },
    { name: 'イギリス', code: 'GB' },
    { name: 'フランス', code: 'FR' },
    { name: 'ドイツ', code: 'DE' },
    { name: '中国', code: 'CN' },
    { name: '韓国', code: 'KR' },
    { name: 'カナダ', code: 'CA' },
    { name: 'オーストラリア', code: 'AU' },
    { name: 'ブラジル', code: 'BR' }
];

let currentFlag;

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

    const shuffledFlags = shuffleArray([...flags]);
    currentFlag = shuffledFlags[0];

    flagImage.src = `https://flagcdn.com/w320/${currentFlag.code.toLowerCase()}.png`;
    flagImage.alt = `${currentFlag.name}の国旗`;

    const correctOption = currentFlag.name;
    const incorrectOptions = shuffledFlags.slice(1, 4).map(f => f.name);
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