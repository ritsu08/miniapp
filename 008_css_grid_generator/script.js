const gridCols = document.getElementById('grid-cols');
const gridRows = document.getElementById('grid-rows');
const colGap = document.getElementById('col-gap');
const rowGap = document.getElementById('row-gap');
const gridContainer = document.getElementById('grid-container');
const cssCode = document.getElementById('css-code');
const copyBtn = document.getElementById('copy-btn');

const controls = [gridCols, gridRows, colGap, rowGap];

function updateGrid() {
    const cols = gridCols.value;
    const rows = gridRows.value;
    const colGapValue = colGap.value + 'px';
    const rowGapValue = rowGap.value + 'px';

    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gridContainer.style.columnGap = colGapValue;
    gridContainer.style.rowGap = rowGapValue;

    generateGridItems(cols * rows);
    updateCssCode(cols, rows, colGapValue, rowGapValue);
}

function generateGridItems(count) {
    gridContainer.innerHTML = '';
    for (let i = 1; i <= count; i++) {
        const item = document.createElement('div');
        item.classList.add('grid-item');
        item.textContent = i;
        gridContainer.appendChild(item);
    }
}

function updateCssCode(cols, rows, cGap, rGap) {
    const code = `
.container {
    display: grid;
    grid-template-columns: repeat(${cols}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
    column-gap: ${cGap};
    row-gap: ${rGap};
}
    `.trim();
    cssCode.value = code;
}

controls.forEach(control => {
    control.addEventListener('input', updateGrid);
});

copyBtn.addEventListener('click', () => {
    cssCode.select();
    document.execCommand('copy');
    alert('コピーしました！');
});

// Initial setup
updateGrid();