const generateHaikuBtn = document.getElementById('generate-haiku-btn');
const generateTankaBtn = document.getElementById('generate-tanka-btn');
const generatedPoemDisplay = document.getElementById('generated-poem');

const haikuPhrases = {
    five: [
        '古池や', '閑かさや', '五月雨を', '蝉の声', '秋の田の',
        '山里は', '旅の空', '春の海', '夏草や', '冬の月',
        '朝ぼらけ', '夕焼けに', '風の音', '雪の朝', '月の夜',
        '花の色', '鳥の声', '水の音', '光さす', '影踏みて',
        '夢の跡', '時の流れ', '心の奥', '遠い日', '静けさに',
        '風に舞う', '空高く', '地に深く', '星の降る', '雨の降る',
        '雲の峰', '波の音', '森の奥', '道の辺に', '草の葉に'
    ],
    seven: [
        '蛙飛びこむ', '岩にしみ入る', '集めて早し', '蓑にやどる', 'かりほの庵の',
        '雪降る夜は', '夢は枯野を', 'ひねもすのたり', '兵どもが', '氷の世界',
        '水のおとかな', 'あかねさす空', '風のささやき', '光あふれて', '静かに響く',
        '遠くへ続く道', '心に刻む時', '季節は巡りて', '新たな息吹', '希望の光',
        '過ぎし日の夢', '未来へ続く道', '自然の恵みよ', '生命の輝き', '静寂の調べ',
        '風に揺れる花', '空に広がる雲', '大地に根ざして', '星の瞬きよ', '雨上がりの空',
        '雲間に光さす', '波打ち寄せる岸', '森の深き緑', '道の果てまでも', '草葉の露かな'
    ]
};

const tankaPhrases = {
    five: [
        '東の野に', '銀の匙', '白き鳥', 'ふるさとの', '海山に',
        '春の野に', '夏の夜の', '秋の風', '冬の朝', '月の光',
        '花の香に', '鳥の歌', '水の面に', '光あふれ', '影深く',
        '夢の間に', '時の過ぎ', '心の底', '遠い昔', '静かなる',
        '風に乗り', '空に舞い', '地に咲きて', '星の輝き', '雨のしずく',
        '雲の間に', '波の音響く', '森の奥深く', '道の途中に', '草の葉の上'
    ],
    seven: [
        '炎の立つ見えて', '投げ出す光', '青空を飛ぶ', '思い出深く', '恵み多き',
        '水のおとかな', 'あかねさす空', '風のささやき', '光あふれて', '静かに響く',
        '遠くへ続く道', '心に刻む時', '季節は巡りて', '新たな息吹', '希望の光',
        '過ぎし日の夢', '未来へ続く道', '自然の恵みよ', '生命の輝き', '静寂の調べ',
        '風に揺れる花', '空に広がる雲', '大地に根ざして', '星の瞬きよ', '雨上がりの空',
        '雲間に光さす', '波打ち寄せる岸', '森の深き緑', '道の果てまでも', '草葉の露かな'
    ]
};

function getRandomPhrase(type, syllableCount, usedPhrases) {
    const phrases = type === 'haiku' ? haikuPhrases : tankaPhrases;
    const candidates = phrases[syllableCount].filter(phrase => !usedPhrases.includes(phrase));
    if (candidates.length === 0) {
        // すべてのフレーズが使用済みの場合、リセットするかエラー処理
        return phrases[syllableCount][Math.floor(Math.random() * phrases[syllableCount].length)]; // fallback
    }
    const selectedPhrase = candidates[Math.floor(Math.random() * candidates.length)];
    usedPhrases.push(selectedPhrase);
    return selectedPhrase;
}

function generateHaiku() {
    const usedPhrases = [];
    const line1 = getRandomPhrase('haiku', 'five', usedPhrases);
    const line2 = getRandomPhrase('haiku', 'seven', usedPhrases);
    const line3 = getRandomPhrase('haiku', 'five', usedPhrases);
    generatedPoemDisplay.textContent = `${line1}\n${line2}\n${line3}`;
}

function generateTanka() {
    const usedPhrases = [];
    const line1 = getRandomPhrase('tanka', 'five', usedPhrases);
    const line2 = getRandomPhrase('tanka', 'seven', usedPhrases);
    const line3 = getRandomPhrase('tanka', 'five', usedPhrases);
    const line4 = getRandomPhrase('tanka', 'seven', usedPhrases);
    const line5 = getRandomPhrase('tanka', 'seven', usedPhrases);
    generatedPoemDisplay.textContent = `${line1}\n${line2}\n${line3}\n${line4}\n${line5}`;
}

generateHaikuBtn.addEventListener('click', generateHaiku);
generateTankaBtn.addEventListener('click', generateTanka);

// Initial generation
generateHaiku();