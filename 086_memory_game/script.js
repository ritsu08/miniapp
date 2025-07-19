const gameBoard = document.getElementById('game-board');
const matchedPairsDisplay = document.getElementById('matched-pairs');
const totalPairsDisplay = document.getElementById('total-pairs');
const resetGameBtn = document.getElementById('reset-game-btn');

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    matchedPairsDisplay.textContent = matchedPairs;

    cards = [...cardValues, ...cardValues]; // Duplicate for pairs
    cards = shuffleArray(cards);
    totalPairsDisplay.textContent = cardValues.length;

    cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.dataset.index = index;
        card.innerHTML = `
            <div class="front-face"></div>
            <div class="back-face">${value}</div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return; // Prevent double clicking the same card

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        lockBoard = true;
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.value === card2.dataset.value;

    if (isMatch) {
        disableCards();
        matchedPairs++;
        matchedPairsDisplay.textContent = matchedPairs;
        if (matchedPairs === cardValues.length) {
            setTimeout(() => alert('ゲームクリア！'), 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    flippedCards.forEach(card => {
        card.removeEventListener('click', flipCard);
        card.classList.add('matched');
    });
    resetFlippedCards();
}

function unflipCards() {
    setTimeout(() => {
        flippedCards.forEach(card => card.classList.remove('flipped'));
        resetFlippedCards();
    }, 1000);
}

function resetFlippedCards() {
    flippedCards = [];
    lockBoard = false;
}

resetGameBtn.addEventListener('click', createBoard);

// Initial board creation
createBoard();