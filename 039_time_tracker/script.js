const taskNameInput = document.getElementById('task-name');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const currentTaskDisplay = document.getElementById('current-task-display');
const elapsedTimeDisplay = document.getElementById('elapsed-time-display');
const taskHistoryList = document.getElementById('task-history');

let startTime;
let timerInterval;
let currentTask = null;
let tasks = JSON.parse(localStorage.getItem('timeTrackerTasks')) || [];

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateElapsedTime() {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    elapsedTimeDisplay.textContent = formatTime(elapsedSeconds);
}

function startTracking() {
    const task = taskNameInput.value.trim();
    if (!task) {
        alert('タスク名を入力してください。');
        return;
    }

    currentTask = {
        name: task,
        startTime: Date.now(),
        endTime: null,
        duration: 0
    };

    startTime = Date.now();
    currentTaskDisplay.textContent = task;
    elapsedTimeDisplay.textContent = '00:00:00';

    startBtn.disabled = true;
    stopBtn.disabled = false;
    taskNameInput.disabled = true;

    timerInterval = setInterval(updateElapsedTime, 1000);
}

function stopTracking() {
    clearInterval(timerInterval);

    if (currentTask) {
        currentTask.endTime = Date.now();
        currentTask.duration = Math.floor((currentTask.endTime - currentTask.startTime) / 1000);
        tasks.push(currentTask);
        localStorage.setItem('timeTrackerTasks', JSON.stringify(tasks));
        renderHistory();
    }

    currentTask = null;
    taskNameInput.value = '';
    currentTaskDisplay.textContent = 'なし';
    elapsedTimeDisplay.textContent = '00:00:00';

    startBtn.disabled = false;
    stopBtn.disabled = true;
    taskNameInput.disabled = false;
}

function renderHistory() {
    taskHistoryList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.name}</span>
            <span>${formatTime(task.duration)}</span>
        `;
        taskHistoryList.appendChild(li);
    });
}

startBtn.addEventListener('click', startTracking);
stopBtn.addEventListener('click', stopTracking);

// Initial render of history
renderHistory();