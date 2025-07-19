const clickButton = document.getElementById('click-button');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset-button');

let score = 0;

function updateScore() {
    scoreDisplay.textContent = score;
}

clickButton.addEventListener('click', () => {
    score++;
    updateScore();
});

resetButton.addEventListener('click', () => {
    score = 0;
    updateScore();
});

// Initial display
updateScore();