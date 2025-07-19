const eventTitleInput = document.getElementById('event-title');
const eventDateInput = document.getElementById('event-date');
const addEventBtn = document.getElementById('add-event-btn');
const eventList = document.getElementById('event-list');

let events = JSON.parse(localStorage.getItem('anniversaryEvents')) || [];

function renderEvents() {
    eventList.innerHTML = '';
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of day

    events.forEach(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0); // Normalize event date to start of day

        const diffTime = Math.abs(today.getTime() - eventDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const li = document.createElement('li');
        li.dataset.id = event.id;
        li.innerHTML = `
            <div class="event-info">
                <h3>${event.title}</h3>
                <p>${event.date}</p>
            </div>
            <span class="days-count">${diffDays}日</span>
            <button class="delete-btn">削除</button>
        `;
        eventList.appendChild(li);

        li.querySelector('.delete-btn').addEventListener('click', () => deleteEvent(event.id));
    });
}

function addEvent() {
    const title = eventTitleInput.value.trim();
    const date = eventDateInput.value;

    if (!title || !date) {
        alert('タイトルと日付を入力してください。');
        return;
    }

    const newEvent = {
        id: Date.now(),
        title: title,
        date: date
    };
    events.push(newEvent);
    saveEvents();
    renderEvents();

    eventTitleInput.value = '';
    eventDateInput.value = '';
}

function deleteEvent(id) {
    events = events.filter(event => event.id !== id);
    saveEvents();
    renderEvents();
}

function saveEvents() {
    localStorage.setItem('anniversaryEvents', JSON.stringify(events));
}

addEventBtn.addEventListener('click', addEvent);

// Initial render
renderEvents();