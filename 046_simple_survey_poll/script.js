const questionInput = document.getElementById('question-input');
const optionInput = document.getElementById('option-input');
const addQuestionBtn = document.getElementById('add-question-btn');
const surveyForm = document.getElementById('survey-form');
const submitFormBtn = document.getElementById('submit-form-btn');
const htmlOutput = document.getElementById('html-output');
const copyHtmlBtn = document.getElementById('copy-html-btn');

// New element for question type
const questionTypeSelect = document.getElementById('question-type');

let questions = [];

// --- Event Listeners ---
addQuestionBtn.addEventListener('click', addQuestionToForm);

copyHtmlBtn.addEventListener('click', () => {
    htmlOutput.select();
    document.execCommand('copy');
    alert('HTMLコードをコピーしました！');
});

submitFormBtn.addEventListener('click', () => {
    alert('デモ: 回答が送信されました！ (実際にはサーバーサイド処理が必要です)');
    // In a real application, you would collect form data here
    // and send it to a server.
});

// --- Functions ---

function addQuestionToForm() {
    const questionText = questionInput.value.trim();
    const optionsText = optionInput.value.trim();
    const questionType = questionTypeSelect.value; // Get selected question type

    if (!questionText || !optionsText) {
        alert('質問と選択肢を入力してください。\n選択肢は1行に1つ入力してください。');
        return;
    }

    const options = optionsText.split(/\r\n|\n/).map(opt => opt.trim()).filter(opt => opt !== '');
    if (options.length === 0) {
        alert('選択肢を1つ以上入力してください。');
        return;
    }

    const questionId = `q-${Date.now()}`;
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('form-group');
    questionDiv.innerHTML = `
        <p><strong>${questionText}</strong></p>
    `;

    options.forEach((option, index) => {
        const inputType = questionType === 'radio' ? 'radio' : 'checkbox';
        const optionDiv = document.createElement('div');
        optionDiv.innerHTML = `
            <input type="${inputType}" id="${questionId}-option-${index}" name="${questionId}" value="${option}">
            <label for="${questionId}-option-${index}">${option}</label>
        `;
        questionDiv.appendChild(optionDiv);
    });

    surveyForm.appendChild(questionDiv);
    submitFormBtn.classList.remove('hidden');

    // Store question data for HTML generation
    questions.push({
        id: questionId,
        text: questionText,
        type: questionType,
        options: options
    });

    questionInput.value = '';
    optionInput.value = '';

    generateHtmlOutput();
}

function generateHtmlOutput() {
    let generatedHtml = '<form>';
    questions.forEach(q => {
        generatedHtml += `\n    <div class="form-group">\n        <p><strong>${q.text}</strong></p>\n`;
        q.options.forEach((option, index) => {
            const inputType = q.type === 'radio' ? 'radio' : 'checkbox';
            generatedHtml += `        <div>\n            <input type="${inputType}" id="${q.id}-option-${index}" name="${q.id}" value="${option}">\n            <label for="${q.id}-option-${index}">${option}</label>\n        </div>\n`;
        });
        generatedHtml += `    </div>`;
    });
    generatedHtml += `\n    <button type="submit">Submit</button>\n</form>`;
    htmlOutput.value = generatedHtml;
}