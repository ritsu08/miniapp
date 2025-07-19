const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        japanese: "素晴らしい仕事をする唯一の方法は、自分のやっていることを好きになることだ。"
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
        japanese: "イノベーションは、リーダーとフォロワーを分けるものだ。"
    },
    {
        text: "Your time is limited, so don’t waste it living someone else’s life.",
        author: "Steve Jobs",
        japanese: "あなたの時間は限られている。だから、他人の人生を生きて無駄にしてはいけない。"
    },
    {
        text: "Strive not to be a success, but rather to be of value.",
        author: "Albert Einstein",
        japanese: "成功者になろうとするのではなく、価値のある人間になろうとしなさい。"
    },
    {
        text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
        author: "Albert Einstein",
        japanese: "大切なのは、疑問を持つのをやめないことだ。好奇心には、それ自体の存在理由がある。"
    }
];

const quoteText = document.getElementById('quote-text');
const quoteJapanese = document.getElementById('quote-japanese');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');

function getNewQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteText.textContent = randomQuote.text;
    quoteJapanese.textContent = randomQuote.japanese;
    quoteAuthor.textContent = `- ${randomQuote.author}`;
}

newQuoteBtn.addEventListener('click', getNewQuote);

// 初期表示
getNewQuote();