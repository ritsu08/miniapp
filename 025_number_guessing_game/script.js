const guessInput = document.getElementById('guess-input');
const submitGuessBtn = document.getElementById('submit-guess-btn');
const messageDisplay = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');

let secretNumber;

function initializeGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1; // 1から100までの乱数
    messageDisplay.textContent = '';
    messageDisplay.classList.remove('correct');
    guessInput.value = '';
    guessInput.disabled = false;
    submitGuessBtn.disabled = false;
    resetBtn.classList.add('hidden');
}

function checkGuess() {
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageDisplay.textContent = '1から100までの数字を入力してください。';
        messageDisplay.classList.remove('correct');
        return;
    }

    if (guess === secretNumber) {
        messageDisplay.textContent = `正解！${secretNumber}でした！`;
        messageDisplay.classList.add('correct');
        guessInput.disabled = true;
        submitGuessBtn.disabled = true;
        resetBtn.classList.remove('hidden');
    } else if (guess < secretNumber) {
        messageDisplay.textContent = 'もっと大きい数字です。';
        messageDisplay.classList.remove('correct');
    } else {
        messageDisplay.textContent = 'もっと小さい数字です。';
        messageDisplay.classList.remove('correct');
    }
}

submitGuessBtn.addEventListener('click', checkGuess);
resetBtn.addEventListener('click', initializeGame);

// Initial game setup
initializeGame();