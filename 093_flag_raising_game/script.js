const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const instructionText = document.getElementById('instruction-text');
const raiseBtn = document.getElementById('raise-btn');
const lowerBtn = document.getElementById('lower-btn');
const startGameBtn = document.getElementById('start-game-btn');
const gameMessage = document.getElementById('game-message');

let score = 0;
let timeLeft = 30;
let timerId;
let currentInstruction;
let gameActive = false;

const instructions = [
    { text: '旗を上げて！', correctAction: 'raise' },
    { text: '旗を下げて！', correctAction: 'lower' },
    { text: '上げないで！', correctAction: 'none-raise' }, // Do not raise
    { text: '下げないで！', correctAction: 'none-lower' }  // Do not lower
];

function getRandomInstruction() {
    return instructions[Math.floor(Math.random() * instructions.length)];
}

function displayInstruction() {
    currentInstruction = getRandomInstruction();
    instructionText.textContent = currentInstruction.text;
}

function startGame() {
    score = 0;
    timeLeft = 30;
    gameActive = true;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;
    gameMessage.textContent = '';
    startGameBtn.disabled = true;
    raiseBtn.disabled = false;
    lowerBtn.disabled = false;

    displayInstruction();

    timerId = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            gameActive = false;
            raiseBtn.disabled = true;
            lowerBtn.disabled = true;
            startGameBtn.disabled = false;
            gameMessage.textContent = `ゲーム終了！あなたのスコアは ${score} です。`;
        }
    }, 1000);
}

function handleAction(action) {
    if (!gameActive) return;

    let correct = false;
    if (currentInstruction.correctAction === action) {
        correct = true;
    } else if (currentInstruction.correctAction === 'none-raise' && action !== 'raise') {
        correct = true;
    } else if (currentInstruction.correctAction === 'none-lower' && action !== 'lower') {
        correct = true;
    }

    if (correct) {
        score++;
        scoreDisplay.textContent = score;
    } else {
        score--; // Penalize for incorrect action
        scoreDisplay.textContent = score;
    }
    displayInstruction(); // Get next instruction immediately
}

raiseBtn.addEventListener('click', () => handleAction('raise'));
lowerBtn.addEventListener('click', () => handleAction('lower'));
startGameBtn.addEventListener('click', startGame);

// Initial setup
raiseBtn.disabled = true;
lowerBtn.disabled = true;