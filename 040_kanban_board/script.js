const todoCards = document.getElementById('todo-cards');
const inProgressCards = document.getElementById('in-progress-cards');
const doneCards = document.getElementById('done-cards');
const addCardBtns = document.querySelectorAll('.add-card-btn');

let draggedItem = null;

// Load tasks from Local Storage
document.addEventListener('DOMContentLoaded', loadCards);

addCardBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const columnId = event.target.dataset.column;
        const cardText = prompt('新しいカードのテキストを入力してください:');
        if (cardText) {
            addCard(columnId, cardText);
            saveCards();
        }
    });
});

function addCard(columnId, text) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('draggable', 'true');
    card.textContent = text;

    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);

    document.getElementById(`${columnId}-cards`).appendChild(card);
}

function dragStart() {
    draggedItem = this;
    setTimeout(() => this.style.display = 'none', 0);
}

function dragEnd() {
    draggedItem.style.display = 'block';
    draggedItem = null;
    saveCards();
}

document.querySelectorAll('.cards').forEach(cardsContainer => {
    cardsContainer.addEventListener('dragover', dragOver);
    cardsContainer.addEventListener('dragenter', dragEnter);
    cardsContainer.addEventListener('dragleave', dragLeave);
    cardsContainer.addEventListener('drop', drop);
});

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.style.backgroundColor = '#e0e0e0';
}

function dragLeave() {
    this.style.backgroundColor = '';
}

function drop() {
    this.style.backgroundColor = '';
    this.appendChild(draggedItem);
}

function saveCards() {
    const allCards = {};
    document.querySelectorAll('.column').forEach(column => {
        const columnId = column.id.replace('-column', '');
        const cardsInColumn = [];
        column.querySelectorAll('.card').forEach(card => {
            cardsInColumn.push(card.textContent);
        });
        allCards[columnId] = cardsInColumn;
    });
    localStorage.setItem('kanbanCards', JSON.stringify(allCards));
}

function loadCards() {
    const savedCards = JSON.parse(localStorage.getItem('kanbanCards'));
    if (savedCards) {
        for (const columnId in savedCards) {
            savedCards[columnId].forEach(cardText => {
                addCard(columnId, cardText);
            });
        }
    } else {
        // Initial dummy data if no saved cards
        addCard('todo', 'タスクA');
        addCard('todo', 'タスクB');
        addCard('in-progress', 'タスクC');
        addCard('done', 'タスクD');
    }
}
