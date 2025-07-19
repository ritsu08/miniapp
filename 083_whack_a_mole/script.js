const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const startGameBtn = document.getElementById('start-game-btn');
const holes = document.querySelectorAll('.hole');

let score = 0;
let timeLeft = 30;
let timerId;
let moleTimerId;
let lastHole;

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function peep() {
    const time = randomTime(500, 1000); // Mole appears for 0.5 to 1 second
    const hole = randomHole(holes);
    const mole = hole.querySelector('.mole');
    mole.classList.add('up');
    moleTimerId = setTimeout(() => {
        mole.classList.remove('up');
        if (timeLeft > 0) {
            peep();
        }
    }, time);
}

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;
    startGameBtn.disabled = true;

    peep();
    timerId = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            clearTimeout(moleTimerId);
            alert(`ゲーム終了！あなたのスコアは ${score} です。`);
            startGameBtn.disabled = false;
        }
    }, 1000);
}

function whack(e) {
    if (!e.isTrusted) return; // Cheater!
    if (this.classList.contains('up')) {
        score++;
        this.classList.remove('up');
        scoreDisplay.textContent = score;
    }
}

holes.forEach(hole => hole.addEventListener('click', function() {
    const mole = this.querySelector('.mole');
    if (mole.classList.contains('up')) {
        score++;
        mole.classList.remove('up');
        scoreDisplay.textContent = score;
    }
}));

startGameBtn.addEventListener('click', startGame);