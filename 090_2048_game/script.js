const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const gameMessage = document.getElementById('game-message');
const newGameBtn = document.getElementById('new-game-btn');

const boardSize = 4;
let board = [];
let score = 0;
let gameOver = false;

function initializeGame() {
    board = Array(boardSize).fill(0).map(() => Array(boardSize).fill(0));
    score = 0;
    gameOver = false;
    scoreDisplay.textContent = score;
    gameMessage.textContent = '';
    addRandomTile();
    addRandomTile();
    drawBoard();
}

function addRandomTile() {
    if (isBoardFull()) return;

    let row, col;
    do {
        row = Math.floor(Math.random() * boardSize);
        col = Math.floor(Math.random() * boardSize);
    } while (board[row][col] !== 0);

    board[row][col] = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
}

function drawBoard() {
    gameBoard.innerHTML = '';
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            const tileValue = board[r][c];
            if (tileValue !== 0) {
                tile.textContent = tileValue;
                tile.classList.add(`tile-${tileValue}`);
            }
            gameBoard.appendChild(tile);
        }
    }
}

function isBoardFull() {
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 0) {
                return false;
            }
        }
    }
    return true;
}

function slide(row) {
    let arr = row.filter(val => val !== 0);
    let missing = boardSize - arr.length;
    let zeros = Array(missing).fill(0);
    return zeros.concat(arr);
}

function combine(row) {
    for (let i = boardSize - 1; i >= 1; i--) {
        let a = row[i];
        let b = row[i - 1];
        if (a === b) {
            row[i] = a * 2;
            score += row[i];
            row[i - 1] = 0;
        }
    }
    return row;
}

function moveRight() {
    let changed = false;
    for (let r = 0; r < boardSize; r++) {
        let originalRow = [...board[r]];
        let row = slide(board[r]);
        row = combine(row);
        row = slide(row);
        if (JSON.stringify(originalRow) !== JSON.stringify(row)) {
            changed = true;
        }
        board[r] = row;
    }
    return changed;
}

function moveLeft() {
    let changed = false;
    for (let r = 0; r < boardSize; r++) {
        let originalRow = [...board[r]];
        let row = board[r].filter(val => val !== 0);
        row = combine(row.reverse()).reverse();
        let missing = boardSize - row.length;
        let zeros = Array(missing).fill(0);
        row = row.concat(zeros);
        if (JSON.stringify(originalRow) !== JSON.stringify(row)) {
            changed = true;
        }
        board[r] = row;
    }
    return changed;
}

function moveUp() {
    let changed = false;
    for (let c = 0; c < boardSize; c++) {
        let column = [];
        for (let r = 0; r < boardSize; r++) {
            column.push(board[r][c]);
        }
        let originalColumn = [...column];
        column = column.filter(val => val !== 0);
        column = combine(column);
        let missing = boardSize - column.length;
        let zeros = Array(missing).fill(0);
        column = column.concat(zeros);
        if (JSON.stringify(originalColumn) !== JSON.stringify(column)) {
            changed = true;
        }
        for (let r = 0; r < boardSize; r++) {
            board[r][c] = column[r];
        }
    }
    return changed;
}

function moveDown() {
    let changed = false;
    for (let c = 0; c < boardSize; c++) {
        let column = [];
        for (let r = 0; r < boardSize; r++) {
            column.push(board[r][c]);
        }
        let originalColumn = [...column];
        column = column.filter(val => val !== 0);
        column = combine(column.reverse()).reverse();
        let missing = boardSize - column.length;
        let zeros = Array(missing).fill(0);
        column = zeros.concat(column);
        if (JSON.stringify(originalColumn) !== JSON.stringify(column)) {
            changed = true;
        }
        for (let r = 0; r < boardSize; r++) {
            board[r][c] = column[r];
        }
    }
    return changed;
}

function checkGameOver() {
    if (!isBoardFull()) return false;

    // Check for possible moves
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            const current = board[r][c];
            // Check right
            if (c < boardSize - 1 && current === board[r][c + 1]) return false;
            // Check down
            if (r < boardSize - 1 && current === board[r + 1][c]) return false;
        }
    }
    return true;
}

document.addEventListener('keyup', (e) => {
    if (gameOver) return;

    let moved = false;
    if (e.key === 'ArrowRight') {
        moved = moveRight();
    } else if (e.key === 'ArrowLeft') {
        moved = moveLeft();
    } else if (e.key === 'ArrowUp') {
        moved = moveUp();
    } else if (e.key === 'ArrowDown') {
        moved = moveDown();
    }

    if (moved) {
        addRandomTile();
        drawBoard();
        scoreDisplay.textContent = score;
        if (checkGameOver()) {
            gameOver = true;
            gameMessage.textContent = 'ゲームオーバー！';
        }
    }
});

newGameBtn.addEventListener('click', initializeGame);

// Initial game setup
initializeGame();