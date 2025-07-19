const dailyGoalInput = document.getElementById('daily-goal');
const setGoalBtn = document.getElementById('set-goal-btn');
const currentIntakeDisplay = document.getElementById('current-intake');
const remainingIntakeDisplay = document.getElementById('remaining-intake');
const progressBar = document.getElementById('progress-bar');
const intakeAmountInput = document.getElementById('intake-amount');
const addIntakeBtn = document.getElementById('add-intake-btn');
const resetDailyBtn = document.getElementById('reset-daily-btn');

let dailyGoal = parseInt(localStorage.getItem('waterTrackerGoal')) || 2000;
let currentIntake = parseInt(localStorage.getItem('waterTrackerIntake')) || 0;
let lastResetDate = localStorage.getItem('waterTrackerLastResetDate') || new Date().toDateString();

function updateDisplay() {
    currentIntakeDisplay.textContent = currentIntake;
    remainingIntakeDisplay.textContent = Math.max(0, dailyGoal - currentIntake);

    const progress = (currentIntake / dailyGoal) * 100;
    progressBar.style.width = `${Math.min(100, progress)}%`;

    if (currentIntake >= dailyGoal) {
        progressBar.style.backgroundColor = '#007bff'; // Goal reached color
    } else {
        progressBar.style.backgroundColor = '#28a745';
    }
}

function checkAndResetDaily() {
    const today = new Date().toDateString();
    if (today !== lastResetDate) {
        currentIntake = 0;
        lastResetDate = today;
        localStorage.setItem('waterTrackerIntake', currentIntake);
        localStorage.setItem('waterTrackerLastResetDate', lastResetDate);
    }
}

function setGoal() {
    const newGoal = parseInt(dailyGoalInput.value);
    if (isNaN(newGoal) || newGoal <= 0) {
        alert('有効な目標値を入力してください。');
        return;
    }
    dailyGoal = newGoal;
    localStorage.setItem('waterTrackerGoal', dailyGoal);
    updateDisplay();
}

function addIntake() {
    const amount = parseInt(intakeAmountInput.value);
    if (isNaN(amount) || amount <= 0) {
        alert('有効な摂取量を入力してください。');
        return;
    }
    currentIntake += amount;
    localStorage.setItem('waterTrackerIntake', currentIntake);
    updateDisplay();
}

function resetDaily() {
    if (confirm('今日の記録をリセットしますか？')) {
        currentIntake = 0;
        localStorage.setItem('waterTrackerIntake', currentIntake);
        updateDisplay();
    }
}

setGoalBtn.addEventListener('click', setGoal);
addIntakeBtn.addEventListener('click', addIntake);
resetDailyBtn.addEventListener('click', resetDaily);

// Initial setup
dailyGoalInput.value = dailyGoal;
checkAndResetDaily();
updateDisplay();