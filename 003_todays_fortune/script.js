const drawBtn = document.getElementById('draw-btn');
const resultContent = document.getElementById('result-container');
const fortuneResult = document.getElementById('fortune-result');
const fortuneAdvice = document.getElementById('fortune-advice');

const fortunes = [
    {
        rank: "大吉",
        advice: "最高の一日！何事も上手くいくでしょう。新しい挑戦に最適です。"
    },
    {
        rank: "中吉",
        advice: "良い運勢です。周りの人と協力すると、さらに良い結果に繋がります。"
    },
    {
        rank: "小吉",
        advice: "ささやかな幸せがありそう。普段通り、落ち着いて過ごしましょう。"
    },
    {
        rank: "吉",
        advice: "平穏な一日。感謝の気持ちを忘れずに過ごすと運気がアップします。"
    },
    {
        rank: "末吉",
        advice: "油断は禁物。慎重に行動すれば、トラブルを避けられます。"
    },
    {
        rank: "凶",
        advice: "少し注意が必要な日。焦らず、冷静に対応することを心がけて。"
    },
    {
        rank: "大凶",
        advice: "今日は控えめに。無理せず、ゆっくり休むのが吉です。"
    }
];

drawBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const selectedFortune = fortunes[randomIndex];

    fortuneResult.textContent = selectedFortune.rank;
    fortuneAdvice.textContent = selectedFortune.advice;

    resultContent.classList.remove('hidden');
});