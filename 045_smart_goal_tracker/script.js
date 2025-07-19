const goalTextInput = document.getElementById('goal-text');
const addGoalBtn = document.getElementById('add-goal-btn');
const goalList = document.getElementById('goal-list');

let goals = JSON.parse(localStorage.getItem('smartGoals')) || [];

function renderGoals() {
    goalList.innerHTML = '';
    goals.forEach(goal => {
        const li = document.createElement('li');
        li.dataset.id = goal.id;
        if (goal.completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `
            <h3>${goal.text}</h3>
            <p><strong>S (Specific):</strong> ${goal.specific}</p>
            <p><strong>M (Measurable):</strong> ${goal.measurable}</p>
            <p><strong>A (Achievable):</strong> ${goal.achievable}</p>
            <p><strong>R (Relevant):</strong> ${goal.relevant}</p>
            <p><strong>T (Time-bound):</strong> ${goal.timebound}</p>
            <div class="actions">
                <button class="complete-btn">${goal.completed ? '未完了に戻す' : '完了'}</button>
                <button class="delete-btn">削除</button>
            </div>
        `;
        goalList.appendChild(li);

        li.querySelector('.complete-btn').addEventListener('click', () => toggleGoalComplete(goal.id));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteGoal(goal.id));
    });
}

function addGoal() {
    const text = goalTextInput.value.trim();
    if (!text) {
        alert('目標を入力してください。');
        return;
    }

    const specific = prompt('S (Specific - 具体的に): この目標は何を達成しますか？');
    const measurable = prompt('M (Measurable - 測定可能に): どのように進捗を測定しますか？');
    const achievable = prompt('A (Achievable - 達成可能に): この目標は現実的で達成可能ですか？');
    const relevant = prompt('R (Relevant - 関連性): この目標はあなたの大きな目標と関連していますか？');
    const timebound = prompt('T (Time-bound - 期限を設ける): いつまでにこの目標を達成しますか？');

    const newGoal = {
        id: Date.now(),
        text: text,
        specific: specific || '未設定',
        measurable: measurable || '未設定',
        achievable: achievable || '未設定',
        relevant: relevant || '未設定',
        timebound: timebound || '未設定',
        completed: false
    };
    goals.push(newGoal);
    saveGoals();
    renderGoals();
    goalTextInput.value = '';
}

function toggleGoalComplete(id) {
    const goalIndex = goals.findIndex(goal => goal.id === id);
    if (goalIndex !== -1) {
        goals[goalIndex].completed = !goals[goalIndex].completed;
        saveGoals();
        renderGoals();
    }
}

function deleteGoal(id) {
    goals = goals.filter(goal => goal.id !== id);
    saveGoals();
    renderGoals();
}

function saveGoals() {
    localStorage.setItem('smartGoals', JSON.stringify(goals));
}

addGoalBtn.addEventListener('click', addGoal);

// Initial render
renderGoals();