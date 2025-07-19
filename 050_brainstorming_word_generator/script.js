const randomWordDisplay = document.getElementById('random-word');
const generateWordBtn = document.getElementById('generate-word-btn');

const words = [
    'イノベーション', 'シナジー', 'パラダイム', 'ソリューション', 'エコシステム',
    'コラボレーション', 'アジャイル', 'レバレッジ', 'コンセンサス', 'ナレッジ',
    '最適化', '効率化', '可視化', '標準化', '自動化',
    '顧客体験', 'データドリブン', 'パーソナライズ', 'エンゲージメント', 'ブランディング',
    '持続可能性', '多様性', '共創', '変革', '未来',
    'デザイン', 'シンプル', '直感', '創造性', 'インパクト'
];

function generateRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomWordDisplay.textContent = words[randomIndex];
}

generateWordBtn.addEventListener('click', generateRandomWord);

// Initial display
generateRandomWord();