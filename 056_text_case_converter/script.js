const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const uppercaseBtn = document.getElementById('uppercase-btn');
const lowercaseBtn = document.getElementById('lowercase-btn');
const capitalizeBtn = document.getElementById('capitalize-btn');
const sentenceCaseBtn = document.getElementById('sentence-case-btn');

uppercaseBtn.addEventListener('click', () => {
    outputText.value = inputText.value.toUpperCase();
});

lowercaseBtn.addEventListener('click', () => {
    outputText.value = inputText.value.toLowerCase();
});

capitalizeBtn.addEventListener('click', () => {
    const words = inputText.value.split(' ');
    const capitalizedWords = words.map(word => {
        if (word.length === 0) return '';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    outputText.value = capitalizedWords.join(' ');
});

sentenceCaseBtn.addEventListener('click', () => {
    const text = inputText.value.toLowerCase();
    if (text.length === 0) {
        outputText.value = '';
        return;
    }
    outputText.value = text.charAt(0).toUpperCase() + text.slice(1);
});

// Initial sync
inputText.addEventListener('input', () => {
    outputText.value = inputText.value;
});

// Set initial output
outputText.value = inputText.value;