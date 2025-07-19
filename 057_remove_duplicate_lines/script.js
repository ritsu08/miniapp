const inputText = document.getElementById('input-text');
const removeDuplicatesBtn = document.getElementById('remove-duplicates-btn');
const outputText = document.getElementById('output-text');

removeDuplicatesBtn.addEventListener('click', removeDuplicateLines);

function removeDuplicateLines() {
    const lines = inputText.value.split(/\r\n|\n/);
    const uniqueLines = [];
    const seen = new Set();

    lines.forEach(line => {
        // 行頭・行末の空白をトリムした文字列で重複を判定
        const trimmedLine = line.trim();
        if (!seen.has(trimmedLine)) {
            uniqueLines.push(line); // 元の行（空白含む）を保持
            seen.add(trimmedLine);
        }
    });

    outputText.value = uniqueLines.join('\n');
}