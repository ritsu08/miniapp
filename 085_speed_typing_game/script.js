const textDisplay = document.getElementById('text-display');
const textInput = document.getElementById('text-input');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const startGameBtn = document.getElementById('start-game-btn');
const gameMessage = document.getElementById('game-message');

const words = [
    'apple', 'banana', 'cherry', 'date', 'elderberry',
    'fig', 'grape', 'honeydew', 'kiwi', 'lemon',
    'mango', 'nectarine', 'orange', 'pear', 'quince',
    'raspberry', 'strawberry', 'tangerine', 'ugli', 'vanilla',
    'watermelon', 'xigua', 'yellow', 'zucchini',
    'programming', 'javascript', 'html', 'css', 'developer',
    'computer', 'keyboard', 'mouse', 'monitor', 'algorithm'
];

let score = 0;
let timeLeft = 60;
let timerId;
let currentWordIndex = 0;

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function displayNewWord() {
    textDisplay.textContent = getRandomWord();
    textInput.value = '';
}

function startGame() {
    score = 0;
    timeLeft = 60;
    currentWordIndex = 0;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;
    gameMessage.textContent = '';
    textInput.disabled = false;
    startGameBtn.disabled = true;

    displayNewWord();

    timerId = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            textInput.disabled = true;
            startGameBtn.disabled = false;
            gameMessage.textContent = `ゲーム終了！あなたのスコアは ${score} です。`;
        }
    }, 1000);
}

textInput.addEventListener('input', () => {
    if (textInput.value === textDisplay.textContent) {
        score++;
        scoreDisplay.textContent = score;
        displayNewWord();
    }
});

startGameBtn.addEventListener('click', startGame);

// Initial setup
textInput.disabled = true;