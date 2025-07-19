const birthdateInput = document.getElementById('birthdate');
const calculateAgeBtn = document.getElementById('calculate-age-btn');
const ageDisplay = document.getElementById('age-display');

calculateAgeBtn.addEventListener('click', calculateAge);

function calculateAge() {
    const birthdate = new Date(birthdateInput.value);

    if (isNaN(birthdate.getTime())) {
        ageDisplay.textContent = '-';
        alert('有効な生年月日を入力してください。');
        return;
    }

    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }

    ageDisplay.textContent = age;
}

// Set default birthdate to a reasonable past date
birthdateInput.value = '2000-01-01';

// Initial calculation
calculateAge();