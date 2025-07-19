const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const calculateBtn = document.getElementById('calculate-btn');
const bmiResult = document.getElementById('bmi-result');
const bmiCategory = document.getElementById('bmi-category');

calculateBtn.addEventListener('click', calculateBMI);

function calculateBMI() {
    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);

    if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
        bmiResult.textContent = '-';
        bmiCategory.textContent = '有効な身長と体重を入力してください。';
        return;
    }

    const heightM = heightCm / 100; // cmをmに変換
    const bmi = weightKg / (heightM * heightM);

    bmiResult.textContent = bmi.toFixed(2);

    let category = '';
    if (bmi < 18.5) {
        category = '低体重';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = '普通体重';
    } else if (bmi >= 25 && bmi < 30) {
        category = '肥満 (1度)';
    } else if (bmi >= 30 && bmi < 35) {
        category = '肥満 (2度)';
    } else if (bmi >= 35 && bmi < 40) {
        category = '肥満 (3度)';
    } else {
        category = '肥満 (4度)';
    }
    bmiCategory.textContent = `判定: ${category}`;
}