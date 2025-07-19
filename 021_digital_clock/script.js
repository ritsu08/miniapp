const clockDisplay = document.getElementById('clock');
const dateDisplay = document.getElementById('date');

function updateClock() {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    dateDisplay.textContent = `${year}年${month}月${day}日`;
}

// Update every second
setInterval(updateClock, 1000);

// Initial display
updateClock();