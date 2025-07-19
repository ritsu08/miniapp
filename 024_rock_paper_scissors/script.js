const rockBtn = document.getElementById('rock');
const scissorsBtn = document.getElementById('scissors');
const paperBtn = document.getElementById('paper');
const playerChoiceDisplay = document.getElementById('player-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const resultText = document.getElementById('result-text');

const choices = ['✊', '✌️', '✋']; // Rock, Scissors, Paper

rockBtn.addEventListener('click', () => playGame('✊'));
scissorsBtn.addEventListener('click', () => playGame('✌️'));
paperBtn.addEventListener('click', () => playGame('✋'));

function playGame(playerChoice) {
    playerChoiceDisplay.textContent = playerChoice;

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    computerChoiceDisplay.textContent = computerChoice;

    let result;
    if (playerChoice === computerChoice) {
        result = '引き分け！';
    } else if (
        (playerChoice === '✊' && computerChoice === '✌️') ||
        (playerChoice === '✌️' && computerChoice === '✋') ||
        (playerChoice === '✋' && computerChoice === '✊')
    ) {
        result = 'あなたの勝ち！';
    } else {
        result = 'コンピューターの勝ち！';
    }
    resultText.textContent = `勝敗: ${result}`;
}