const totalBillInput = document.getElementById('total-bill');
const numPeopleInput = document.getElementById('num-people');
const tipPercentageInput = document.getElementById('tip-percentage');
const tipDisplay = document.getElementById('tip-display');
const calculateBtn = document.getElementById('calculate-btn');
const perPersonAmountSpan = document.getElementById('per-person-amount');
const totalTipSpan = document.getElementById('total-tip');

tipPercentageInput.addEventListener('input', () => {
    tipDisplay.textContent = `${tipPercentageInput.value}%`;
});

calculateBtn.addEventListener('click', calculateSplitBill);

function calculateSplitBill() {
    const totalBill = parseFloat(totalBillInput.value);
    const numPeople = parseInt(numPeopleInput.value);
    const tipPercentage = parseFloat(tipPercentageInput.value);

    if (isNaN(totalBill) || totalBill < 0 || isNaN(numPeople) || numPeople <= 0) {
        perPersonAmountSpan.textContent = '-';
        totalTipSpan.textContent = '-';
        alert('有効な合計金額と人数を入力してください。');
        return;
    }

    const tipAmount = totalBill * (tipPercentage / 100);
    const totalWithTip = totalBill + tipAmount;
    const perPersonAmount = totalWithTip / numPeople;

    perPersonAmountSpan.textContent = perPersonAmount.toFixed(2);
    totalTipSpan.textContent = tipAmount.toFixed(2);
}