const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const pomodoroModeBtn = document.getElementById('pomodoro-mode');
const shortBreakModeBtn = document.getElementById('short-break-mode');
const longBreakModeBtn = document.getElementById('long-break-mode');

let timer;
let timeLeft;
let currentMode = 'pomodoro'; // pomodoro, short-break, long-break

const modes = {
    pomodoro: 25 * 60, // 25 minutes
    'short-break': 5 * 60,  // 5 minutes
    'long-break': 15 * 60   // 15 minutes
};

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('時間です！');
            // Optionally switch mode automatically
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = modes[currentMode];
    updateDisplay();
}

function switchMode(mode) {
    currentMode = mode;
    resetTimer();
    // Update active button style
    document.querySelectorAll('.modes button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`${mode}-mode`).classList.add('active');
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
pomodoroModeBtn.addEventListener('click', () => switchMode('pomodoro'));
shortBreakModeBtn.addEventListener('click', () => switchMode('short-break'));
longBreakModeBtn.addEventListener('click', () => switchMode('long-break'));

// Initial setup
resetTimer();