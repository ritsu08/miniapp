const passwordOutput = document.getElementById('password-output');
const copyBtn = document.getElementById('copy-btn');
const passwordLength = document.getElementById('password-length');
const lengthDisplay = document.getElementById('length-display');
const includeUppercase = document.getElementById('include-uppercase');
const includeLowercase = document.getElementById('include-lowercase');
const includeNumbers = document.getElementById('include-numbers');
const includeSymbols = document.getElementById('include-symbols');
const generateBtn = document.getElementById('generate-btn');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

passwordLength.addEventListener('input', () => {
    lengthDisplay.textContent = passwordLength.value;
});

generateBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', () => {
    passwordOutput.select();
    document.execCommand('copy');
    alert('パスワードをコピーしました！');
});

function generatePassword() {
    const length = passwordLength.value;
    let characters = '';
    let generatedPassword = '';

    if (includeUppercase.checked) characters += uppercaseChars;
    if (includeLowercase.checked) characters += lowercaseChars;
    if (includeNumbers.checked) characters += numberChars;
    if (includeSymbols.checked) characters += symbolChars;

    if (characters === '') {
        passwordOutput.value = '文字タイプを選択してください';
        return;
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        generatedPassword += characters[randomIndex];
    }

    passwordOutput.value = generatedPassword;
}

// Initial generation
generatePassword();