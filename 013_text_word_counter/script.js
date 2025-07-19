const textInput = document.getElementById('text-input');
const charCount = document.getElementById('char-count');
const charNoSpaceCount = document.getElementById('char-no-space-count');
const wordCount = document.getElementById('word-count');
const lineCount = document.getElementById('line-count');

textInput.addEventListener('input', updateCounts);

function updateCounts() {
    const text = textInput.value;

    // 文字数 (スペース含む)
    charCount.textContent = text.length;

    // 文字数 (スペース含まない)
    charNoSpaceCount.textContent = text.replace(/\s/g, '').length;

    // 単語数 (空白で区切られた単語)
    const words = text.trim().split(/\s+/);
    wordCount.textContent = text.trim() === '' ? 0 : words.length;

    // 行数
    const lines = text.split(/\r\n|\r|\n/);
    lineCount.textContent = text === '' ? 0 : lines.length;
}
