const zodiacSignSelect = document.getElementById('zodiac-sign');
const getFortuneBtn = document.getElementById('get-fortune-btn');
const fortuneTitle = document.getElementById('fortune-title');
const fortuneText = document.getElementById('fortune-text');

const horoscopes = {
    aries: {
        name: '牡羊座',
        fortune: '今日は新しいことに挑戦するのに最適な日です。あなたの情熱が成功を引き寄せます。'
    },
    taurus: {
        name: '牡牛座',
        fortune: '安定を求める日。計画通りに進めることで、心の平和が得られます。'
    },
    gemini: {
        name: '双子座',
        fortune: 'コミュニケーションが活発になる日。新しい出会いや情報があなたを刺激します。'
    },
    cancer: {
        name: '蟹座',
        fortune: '家族や親しい人との絆を深める日。家でゆっくり過ごすのも良いでしょう。'
    },
    leo: {
        name: '獅子座',
        fortune: 'あなたの魅力が輝く日。自信を持って行動すれば、周りを惹きつけられます。'
    },
    virgo: {
        name: '乙女座',
        fortune: '細部に注意を払うことで、大きな成果が得られる日。整理整頓も吉です。'
    },
    libra: {
        name: '天秤座',
        fortune: 'バランスが重要な日。人間関係や仕事で調和を意識しましょう。'
    },
    scorpio: {
        name: '蠍座',
        fortune: '深い洞察力が冴える日。物事の本質を見抜く力があなたを助けます。'
    },
    sagittarius: {
        name: '射手座',
        fortune: '冒険心が刺激される日。新しい知識や経験を求めて行動しましょう。'
    },
    capricorn: {
        name: '山羊座',
        fortune: '努力が報われる日。目標に向かって着実に進むことで、成功が近づきます。'
    },
    aquarius: {
        name: '水瓶座',
        fortune: '独創的なアイデアが生まれる日。自由な発想で周りを驚かせましょう。'
    },
    pisces: {
        name: '魚座',
        fortune: '感受性が豊かになる日。直感を信じて行動すると良い結果に繋がります。'
    }
};

getFortuneBtn.addEventListener('click', () => {
    const selectedSign = zodiacSignSelect.value;
    const fortune = horoscopes[selectedSign];

    if (fortune) {
        fortuneTitle.textContent = `${fortune.name}の今日の運勢`;
        fortuneText.textContent = fortune.fortune;
    } else {
        fortuneTitle.textContent = '';
        fortuneText.textContent = '星座を選択してください。';
    }
});

// Initial display
getFortuneBtn.click();