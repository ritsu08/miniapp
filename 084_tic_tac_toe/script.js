const statusDisplay = document.getElementById('status-display');
const gameGrid = document.getElementById('game-grid');
const cells = document.querySelectorAll('.cell');
const resetGameBtn = document.getElementById('reset-game-btn');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', '']; // Represents the board state

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `プレイヤー${currentPlayer}の番です`;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `プレイヤー${currentPlayer}の勝ち！`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusDisplay.textContent = '引き分け！';
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `プレイヤー${currentPlayer}の番です`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetGameBtn.addEventListener('click', handleRestartGame);

// Initial display
statusDisplay.textContent = `プレイヤー${currentPlayer}の番です`;