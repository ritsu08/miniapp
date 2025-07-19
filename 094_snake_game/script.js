const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const gameStatusDisplay = document.getElementById('game-status');
const startGameBtn = document.getElementById('start-game-btn');

const gridSize = 20; // Size of each segment of the snake and food
let snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
let food = {};
let dx = gridSize; // Initial movement direction (right)
let dy = 0;
let score = 0;
let gameInterval;
let gameSpeed = 150; // Milliseconds per frame
let changingDirection = false;

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw snake
    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }

    // Check for collisions
    if (checkCollision(head)) {
        clearInterval(gameInterval);
        gameStatusDisplay.textContent = 'ゲームオーバー！';
        startGameBtn.disabled = false;
    }
    changingDirection = false;
}

function checkCollision(head) {
    // Wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    // Self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.keyCode;
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39;
    const DOWN_KEY = 40;

    const goingUp = dy === -gridSize;
    const goingDown = dy === gridSize;
    const goingLeft = dx === -gridSize;
    const goingRight = dx === gridSize;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -gridSize;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -gridSize;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = gridSize;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = gridSize;
    }
}

function startGame() {
    snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
    dx = gridSize;
    dy = 0;
    score = 0;
    scoreDisplay.textContent = score;
    gameStatusDisplay.textContent = '';
    startGameBtn.disabled = true;
    generateFood();
    gameInterval = setInterval(draw, gameSpeed);
}

startGameBtn.addEventListener('click', startGame);