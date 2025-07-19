const newTaskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from Local Storage
document.addEventListener('DOMContentLoaded', loadTasks);

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span>${taskText}</span>
        <button class="delete-btn">削除</button>
    `;
    taskList.appendChild(li);

    // Save to Local Storage
    saveTasks();

    newTaskInput.value = '';

    // Add event listeners for new task
    li.querySelector('.task-checkbox').addEventListener('change', toggleTaskComplete);
    li.querySelector('.delete-btn').addEventListener('click', deleteTask);
}

function toggleTaskComplete(event) {
    const listItem = event.target.parentNode;
    listItem.classList.toggle('completed');
    saveTasks();
}

function deleteTask(event) {
    const listItem = event.target.parentNode;
    taskList.removeChild(listItem);
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span>${task.text}</span>
            <button class="delete-btn">削除</button>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);

        li.querySelector('.task-checkbox').addEventListener('change', toggleTaskComplete);
        li.querySelector('.delete-btn').addEventListener('click', deleteTask);
    });
}