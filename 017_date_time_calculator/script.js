const startDatetimeInput = document.getElementById('start-datetime');
const endDatetimeInput = document.getElementById('end-datetime');
const calculateBtn = document.getElementById('calculate-btn');
const resultDisplay = document.getElementById('result-display');

calculateBtn.addEventListener('click', calculateDifference);

function calculateDifference() {
    const startDate = new Date(startDatetimeInput.value);
    const endDate = new Date(endDatetimeInput.value);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        resultDisplay.textContent = '有効な日時を入力してください。';
        return;
    }

    const diffMs = Math.abs(endDate.getTime() - startDate.getTime()); // 差分をミリ秒で取得

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    const remainingHours = diffHours % 24;
    const remainingMinutes = diffMinutes % 60;
    const remainingSeconds = diffSeconds % 60;

    let result = '';
    if (diffDays > 0) {
        result += `${diffDays}日 `; 
    }
    result += `${remainingHours}時間 ${remainingMinutes}分 ${remainingSeconds}秒`;

    resultDisplay.textContent = result;
}