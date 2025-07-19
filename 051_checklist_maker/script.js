const newItemInput = document.getElementById('new-item-input');
const addItemBtn = document.getElementById('add-item-btn');
const checklist = document.getElementById('checklist');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const clearAllBtn = document.getElementById('clear-all-btn');

let checklistItems = JSON.parse(localStorage.getItem('checklistItems')) || [];

function renderChecklist() {
    checklist.innerHTML = '';
    checklistItems.forEach(item => {
        const li = document.createElement('li');
        li.dataset.id = item.id;
        if (item.completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `
            <input type="checkbox" ${item.completed ? 'checked' : ''}>
            <span>${item.text}</span>
        `;
        checklist.appendChild(li);

        li.querySelector('input[type="checkbox"]').addEventListener('change', () => toggleItemComplete(item.id));
    });
}

function addItem() {
    const text = newItemInput.value.trim();
    if (!text) return;

    const newItem = {
        id: Date.now(),
        text: text,
        completed: false
    };
    checklistItems.push(newItem);
    saveChecklist();
    renderChecklist();
    newItemInput.value = '';
}

function toggleItemComplete(id) {
    const itemIndex = checklistItems.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        checklistItems[itemIndex].completed = !checklistItems[itemIndex].completed;
        saveChecklist();
        renderChecklist();
    }
}

function clearCompleted() {
    checklistItems = checklistItems.filter(item => !item.completed);
    saveChecklist();
    renderChecklist();
}

function clearAll() {
    if (confirm('本当にすべての項目をクリアしますか？')) {
        checklistItems = [];
        saveChecklist();
        renderChecklist();
    }
}

function saveChecklist() {
    localStorage.setItem('checklistItems', JSON.stringify(checklistItems));
}

addItemBtn.addEventListener('click', addItem);
clearCompletedBtn.addEventListener('click', clearCompleted);
clearAllBtn.addEventListener('click', clearAll);

// Initial render
renderChecklist();