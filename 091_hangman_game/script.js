const wordDisplay = document.getElementById('word-display');
const wrongGuessesDisplay = document.getElementById('wrong-guesses');
const guessLetterInput = document.getElementById('guess-letter-input');
const guessBtn = document.getElementById('guess-btn');
const messageDisplay = document.getElementById('message');
const resetGameBtn = document.getElementById('reset-game-btn');

const words = ['apple', 'banana', 'cherry', 'grape', 'orange', 'strawberry', 'lemon', 'mango'];
let selectedWord;
let guessedLetters;
let wrongGuesses;
const maxWrongGuesses = 6;

function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = Array(selectedWord.length).fill('_');
    wrongGuesses = 0;

    wordDisplay.textContent = guessedLetters.join(' ');
    wrongGuessesDisplay.textContent = wrongGuesses;
    messageDisplay.textContent = '';
    guessLetterInput.value = '';
    guessLetterInput.disabled = false;
    guessBtn.disabled = false;
}

function checkGuess() {
    const guess = guessLetterInput.value.toLowerCase();
    guessLetterInput.value = '';

    if (!guess.match(/[a-z]/) || guess.length !== 1) {
        messageDisplay.textContent = '有効なアルファベット1文字を入力してください。';
        return;
    }

    if (selectedWord.includes(guess)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guess) {
                guessedLetters[i] = guess;
            }
        }
        wordDisplay.textContent = guessedLetters.join(' ');
        messageDisplay.textContent = '正解！';
    } else {
        wrongGuesses++;
        wrongGuessesDisplay.textContent = wrongGuesses;
        messageDisplay.textContent = '不正解...';
    }

    checkGameStatus();
}

function checkGameStatus() {
    if (guessedLetters.join('') === selectedWord) {
        messageDisplay.textContent = 'おめでとう！単語を当てました！';
        messageDisplay.style.color = 'green';
        guessLetterInput.disabled = true;
        guessBtn.disabled = true;
    } else if (wrongGuesses >= maxWrongGuesses) {
        messageDisplay.textContent = `ゲームオーバー！正解は「${selectedWord}」でした。`;
        messageDisplay.style.color = 'red';
        guessLetterInput.disabled = true;
        guessBtn.disabled = true;
    }
}

guessBtn.addEventListener('click', checkGuess);
guessLetterInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});
resetGameBtn.addEventListener('click', initializeGame);

// Initial game setup
initializeGame();