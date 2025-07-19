const workoutDateInput = document.getElementById('workout-date');
const exerciseNameInput = document.getElementById('exercise-name');
const setsInput = document.getElementById('sets');
const repsInput = document.getElementById('reps');
const weightInput = document.getElementById('weight');
const addRecordBtn = document.getElementById('add-record-btn');
const workoutHistoryList = document.getElementById('workout-history');

let workoutRecords = JSON.parse(localStorage.getItem('workoutTrackerRecords')) || [];

function renderRecords() {
    workoutHistoryList.innerHTML = '';
    workoutRecords.forEach(record => {
        const li = document.createElement('li');
        li.dataset.id = record.id;
        li.innerHTML = `
            <div class="workout-info">
                <h3>${record.exerciseName}</h3>
                <p>日付: ${record.date}</p>
                <p>セット: ${record.sets} x ${record.reps} 回 (${record.weight} kg)</p>
            </div>
            <button class="delete-btn">削除</button>
        `;
        workoutHistoryList.appendChild(li);

        li.querySelector('.delete-btn').addEventListener('click', () => deleteRecord(record.id));
    });
}

function addRecord() {
    const date = workoutDateInput.value;
    const exerciseName = exerciseNameInput.value.trim();
    const sets = parseInt(setsInput.value);
    const reps = parseInt(repsInput.value);
    const weight = parseFloat(weightInput.value);

    if (!date || !exerciseName || isNaN(sets) || sets <= 0 || isNaN(reps) || reps <= 0 || isNaN(weight) || weight < 0) {
        alert('すべての項目を正しく入力してください。');
        return;
    }

    const newRecord = {
        id: Date.now(),
        date: date,
        exerciseName: exerciseName,
        sets: sets,
        reps: reps,
        weight: weight
    };
    workoutRecords.push(newRecord);
    saveRecords();
    renderRecords();

    // Clear inputs
    exerciseNameInput.value = '';
    setsInput.value = '';
    repsInput.value = '';
    weightInput.value = '';
}

function deleteRecord(id) {
    workoutRecords = workoutRecords.filter(record => record.id !== id);
    saveRecords();
    renderRecords();
}

function saveRecords() {
    localStorage.setItem('workoutTrackerRecords', JSON.stringify(workoutRecords));
}

addRecordBtn.addEventListener('click', addRecord);

// Set current date as default
const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const day = today.getDate().toString().padStart(2, '0');
workoutDateInput.value = `${year}-${month}-${day}`;

// Initial render
renderRecords();