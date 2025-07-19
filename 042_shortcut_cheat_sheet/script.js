const categorySelector = document.querySelector('.category-selector');
const cheatSheetDisplay = document.getElementById('cheat-sheet-display');

const shortcuts = {
    general: [
        { keys: 'Ctrl + C', description: 'コピー' },
        { keys: 'Ctrl + V', description: '貼り付け' },
        { keys: 'Ctrl + X', description: '切り取り' },
        { keys: 'Ctrl + Z', description: '元に戻す' },
        { keys: 'Ctrl + S', description: '保存' },
        { keys: 'Ctrl + F', description: '検索' }
    ],
    browser: [
        { keys: 'Ctrl + T', description: '新しいタブを開く' },
        { keys: 'Ctrl + W', description: 'タブを閉じる' },
        { keys: 'Ctrl + Shift + T', description: '閉じたタブを再度開く' },
        { keys: 'Ctrl + R', description: 'ページを再読み込み' },
        { keys: 'F5', description: 'ページを再読み込み' },
        { keys: 'Ctrl + Shift + I', description: '開発者ツールを開く' }
    ],
    'text-editor': [
        { keys: 'Ctrl + A', description: 'すべて選択' },
        { keys: 'Ctrl + D', description: '行を複製 (VS Codeなど)' },
        { keys: 'Ctrl + / ', description: 'コメントアウト (トグル)' },
        { keys: 'Tab', description: 'インデント' },
        { keys: 'Shift + Tab', description: '逆インデント' }
    ]
};

function renderShortcuts(category) {
    cheatSheetDisplay.innerHTML = '';
    const categoryShortcuts = shortcuts[category];

    if (categoryShortcuts) {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('shortcut-group');
        groupDiv.innerHTML = `<h3>${category === 'general' ? '一般' : category === 'browser' ? 'ブラウザ' : 'テキストエディタ'}</h3>`;

        categoryShortcuts.forEach(shortcut => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('shortcut-item');
            itemDiv.innerHTML = `
                <span class="key-combo">${shortcut.keys}</span>
                <span class="description">${shortcut.description}</span>
            `;
            groupDiv.appendChild(itemDiv);
        });
        cheatSheetDisplay.appendChild(groupDiv);
    }
}

categorySelector.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        // Remove active class from all buttons
        categorySelector.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('active');
        });
        // Add active class to clicked button
        event.target.classList.add('active');
        renderShortcuts(event.target.dataset.category);
    }
});

// Initial render
renderShortcuts('general');