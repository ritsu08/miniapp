const clipboardInput = document.getElementById('clipboard-input');
const addToHistoryBtn = document.getElementById('add-to-history-btn');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history-btn');

let historyItems = JSON.parse(localStorage.getItem('clipboardHistory')) || [];

function renderHistory() {
    historyList.innerHTML = '';
    historyItems.forEach(item => {
        const li = document.createElement('li');
        li.dataset.id = item.id;
        li.innerHTML = `
            <span>${item.text}</span>
            <div>
                <button class="copy-btn">コピー</button>
                <button class="delete-btn">削除</button>
            </div>
        `;
        historyList.appendChild(li);

        li.querySelector('.copy-btn').addEventListener('click', () => copyToClipboard(item.text));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteHistoryItem(item.id));
    });
}

function addToHistory() {
    const text = clipboardInput.value.trim();
    if (!text) return;

    const newItem = {
        id: Date.now(),
        text: text
    };
    historyItems.unshift(newItem); // Add to the beginning
    saveHistory();
    renderHistory();
    clipboardInput.value = '';
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        alert('クリップボードにコピーしました！');
    } catch (err) {
        console.error('Failed to copy: ', err);
        alert('コピーに失敗しました。');
    }
}

function deleteHistoryItem(id) {
    historyItems = historyItems.filter(item => item.id !== id);
    saveHistory();
    renderHistory();
}

function clearHistory() {
    if (confirm('本当に履歴をすべてクリアしますか？')) {
        historyItems = [];
        saveHistory();
        renderHistory();
    }
}

function saveHistory() {
    localStorage.setItem('clipboardHistory', JSON.stringify(historyItems));
}

addToHistoryBtn.addEventListener('click', addToHistory);
clearHistoryBtn.addEventListener('click', clearHistory);

// Initial render
renderHistory();