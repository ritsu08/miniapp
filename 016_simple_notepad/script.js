const notepad = document.getElementById('notepad');
const saveBtn = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');

// --- Functions ---

function saveMemoToFile() {
    const text = notepad.value;
    if (!text) {
        alert('保存するメモがありません。');
        return;
    }
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'memo.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function clearMemo() {
    notepad.value = '';
    localStorage.removeItem('simpleNotepadMemo');
    alert('メモをクリアしました！');
}

function autoSave() {
    localStorage.setItem('simpleNotepadMemo', notepad.value);
}

function loadMemo() {
    const savedMemo = localStorage.getItem('simpleNotepadMemo');
    if (savedMemo) {
        notepad.value = savedMemo;
    }
}

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', loadMemo);
saveBtn.addEventListener('click', saveMemoToFile);
clearBtn.addEventListener('click', clearMemo);
notepad.addEventListener('input', autoSave);