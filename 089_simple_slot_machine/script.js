const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const spinBtn = document.getElementById('spin-btn');
const resultMessage = document.getElementById('result-message');

const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '7️⃣'];

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinReel(reel) {
    let counter = 0;
    const interval = setInterval(() => {
        reel.textContent = getRandomSymbol();
        counter++;
        if (counter > 20) { // Spin for a bit
            clearInterval(interval);
            // Final symbol
            reel.textContent = getRandomSymbol();
        }
    }, 100);
}

function checkWin() {
    const s1 = reel1.textContent;
    const s2 = reel2.textContent;
    const s3 = reel3.textContent;

    if (s1 === s2 && s2 === s3) {
        resultMessage.textContent = '大当たり！おめでとう！🎉';
        resultMessage.style.color = '#28a745';
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
        resultMessage.textContent = '惜しい！もう一回！';
        resultMessage.style.color = '#ffc107';
    } else {
        resultMessage.textContent = '残念！また挑戦してね！';
        resultMessage.style.color = '#dc3545';
    }
}

spinBtn.addEventListener('click', () => {
    spinBtn.disabled = true;
    resultMessage.textContent = '';

    spinReel(reel1);
    setTimeout(() => spinReel(reel2), 500);
    setTimeout(() => spinReel(reel3), 1000);

    setTimeout(() => {
        spinBtn.disabled = false;
        checkWin();
    }, 2000); // Allow time for all reels to stop
});

// Initial display
reel1.textContent = getRandomSymbol();
reel2.textContent = getRandomSymbol();
reel3.textContent = getRandomSymbol();