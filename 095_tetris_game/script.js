const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const gameStatusDisplay = document.getElementById('game-status');
const startGameBtn = document.getElementById('start-game-btn');

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 20;

let board = [];
let score = 0;
let gameOver = false;
let dropInterval;

// Tetrominoes (shapes)
const SHAPES = [
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1], [0, 0, 0]], // T
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]], // S
    [[1, 1, 0], [0, 1, 1], [0, 0, 0]], // Z
    [[1, 0, 0], [1, 1, 1], [0, 0, 0]], // L
    [[0, 0, 1], [1, 1, 1], [0, 0, 0]]  // J
];

const COLORS = [
    'cyan', 'yellow', 'purple', 'green', 'red', 'orange', 'blue'
];

let currentShape;
let currentX;
let currentY;

function initBoard() {
    for (let r = 0; r < ROWS; r++) {
        board[r] = [];
        for (let c = 0; c < COLS; c++) {
            board[r][c] = 0; // 0 represents empty
        }
    }
}

function newShape() {
    const rand = Math.floor(Math.random() * SHAPES.length);
    currentShape = SHAPES[rand];
    currentX = Math.floor(COLS / 2) - Math.floor(currentShape[0].length / 2);
    currentY = 0;

    if (!isValidMove(currentX, currentY, currentShape)) {
        gameOver = true;
        gameStatusDisplay.textContent = 'ゲームオーバー！';
        clearInterval(dropInterval);
        startGameBtn.disabled = false;
    }
}

function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function drawBoard() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c] !== 0) {
                drawBlock(c, r, COLORS[board[r][c] - 1]);
            }
        }
    }
}

function drawCurrentShape() {
    for (let r = 0; r < currentShape.length; r++) {
        for (let c = 0; c < currentShape[r].length; c++) {
            if (currentShape[r][c] === 1) {
                drawBlock(currentX + c, currentY + r, COLORS[SHAPES.indexOf(currentShape)]);
            }
        }
    }
}

function isValidMove(x, y, shape) {
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c] === 1) {
                const newX = x + c;
                const newY = y + r;

                if (newX < 0 || newX >= COLS || newY >= ROWS) {
                    return false; // Out of bounds
                }
                if (newY < 0) continue; // Above the board
                if (board[newY][newX] !== 0) {
                    return false; // Collision with existing block
                }
            }
        }
    }
    return true;
}

function mergeShape() {
    for (let r = 0; r < currentShape.length; r++) {
        for (let c = 0; c < currentShape[r].length; c++) {
            if (currentShape[r][c] === 1) {
                board[currentY + r][currentX + c] = SHAPES.indexOf(currentShape) + 1;
            }
        }
    }
}

function clearLines() {
    let linesCleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r].every(cell => cell !== 0)) {
            // Line is full, clear it
            for (let rowToMove = r; rowToMove > 0; rowToMove--) {
                board[rowToMove] = [...board[rowToMove - 1]];
            }
            board[0] = Array(COLS).fill(0); // Clear top row
            linesCleared++;
            r++; // Check the new row that moved down
        }
    }
    score += linesCleared * 100; // Simple scoring
    scoreDisplay.textContent = score;
}

function dropShape() {
    if (gameOver) return;

    if (isValidMove(currentX, currentY + 1, currentShape)) {
        currentY++;
    } else {
        mergeShape();
        clearLines();
        newShape();
    }
    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawCurrentShape();
}

document.addEventListener('keydown', (e) => {
    if (gameOver) return;

    if (e.key === 'ArrowLeft') {
        if (isValidMove(currentX - 1, currentY, currentShape)) {
            currentX--;
        }
    } else if (e.key === 'ArrowRight') {
        if (isValidMove(currentX + 1, currentY, currentShape)) {
            currentX++;
        }
    } else if (e.key === 'ArrowDown') {
        dropShape();
    } else if (e.key === 'ArrowUp') {
        // Rotate shape
        const rotatedShape = rotate(currentShape);
        if (isValidMove(currentX, currentY, rotatedShape)) {
            currentShape = rotatedShape;
        }
    }
    drawGame();
});

function rotate(shape) {
    const newShape = Array(shape[0].length).fill(0).map(() => Array(shape.length).fill(0));
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            newShape[c][shape.length - 1 - r] = shape[r][c];
        }
    }
    return newShape;
}

function startGame() {
    initBoard();
    score = 0;
    scoreDisplay.textContent = score;
    gameOver = false;
    gameStatusDisplay.textContent = '';
    startGameBtn.disabled = true;
    newShape();
    dropInterval = setInterval(dropShape, 500); // Drop every 500ms
    drawGame();
}

startGameBtn.addEventListener('click', startGame);