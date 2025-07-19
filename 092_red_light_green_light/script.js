const gameStatusDisplay = document.getElementById('game-status');
const startGameBtn = document.getElementById('start-game-btn');

let gameInterval;
let isRedLight = false;

function startGame() {
    startGameBtn.disabled = true;
    gameStatusDisplay.textContent = 'ゲーム開始！';
    gameStatusDisplay.classList.remove('red-light', 'green-light');

    gameInterval = setInterval(() => {
        if (isRedLight) {
            // Green Light
            gameStatusDisplay.textContent = 'ダルマさんがころんだ！';
            gameStatusDisplay.classList.remove('red-light');
            gameStatusDisplay.classList.add('green-light');
            isRedLight = false;
        } else {
            // Red Light
            gameStatusDisplay.textContent = '止まった！';
            gameStatusDisplay.classList.remove('green-light');
            gameStatusDisplay.classList.add('red-light');
            isRedLight = true;
        }
    }, randomTime(2000, 5000)); // Random time between 2-5 seconds
}

function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

startGameBtn.addEventListener('click', startGame);