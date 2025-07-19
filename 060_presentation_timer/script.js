const minutesInput = document.getElementById('minutes-input');
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

let timerInterval;
let timeLeft;
let totalSeconds;

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
    if (timeLeft <= 10) {
        timerDisplay.style.color = 'red';
    } else if (timeLeft <= totalSeconds / 2) {
        timerDisplay.style.color = 'orange';
    } else {
        timerDisplay.style.color = '#007bff';
    }
}

function startTimer() {
    if (timerInterval) return; // Prevent multiple intervals

    totalSeconds = parseInt(minutesInput.value) * 60;
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
        alert('有効な時間を入力してください。');
        return;
    }

    if (timeLeft === undefined || timeLeft === totalSeconds) {
        timeLeft = totalSeconds;
    }

    minutesInput.disabled = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert('時間です！');
            minutesInput.disabled = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    minutesInput.disabled = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    timeLeft = parseInt(minutesInput.value) * 60;
    updateTimerDisplay();
}

minutesInput.addEventListener('input', () => {
    resetTimer(); // Reset timer when minutes input changes
});

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Initial display
resetTimer();