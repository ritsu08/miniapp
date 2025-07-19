const csvInput = document.getElementById('csv-input');const jsonInput = document.getElementById('json-input');const csvToJsonBtn = document.getElementById('csv-to-json-btn');const jsonToCsvBtn = document.getElementById('json-to-csv-btn');const downloadJsonBtn = document.getElementById('download-json-btn');const downloadCsvBtn = document.getElementById('download-csv-btn');const csvDropArea = document.getElementById('csv-drop-area');const jsonDropArea = document.getElementById('json-drop-area');const csvFileInput = document.getElementById('csv-file-input');const jsonFileInput = document.getElementById('json-file-input');

// --- Event Listeners ---
csvToJsonBtn.addEventListener('click', convertCsvToJson);
jsonToCsvBtn.addEventListener('click', convertJsonToCsv);
downloadJsonBtn.addEventListener('click', () => downloadFile(jsonInput.value, 'converted.json', 'application/json'));
downloadCsvBtn.addEventListener('click', () => downloadFile(csvInput.value, 'converted.csv', 'text/csv'));


// --- Drag and Drop Handlers ---
setupDropArea(csvDropArea, csvFileInput, csvInput);
setupDropArea(jsonDropArea, jsonFileInput, jsonInput);

function setupDropArea(dropArea, fileInput, textarea) {
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('dragover');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('dragover');
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            readFile(files[0], textarea);
        }
    });

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            readFile(files[0], textarea);
        }
    });
}

function readFile(file, textarea) {
    const reader = new FileReader();
    reader.onload = (e) => {
        textarea.value = e.target.result;
    };
    reader.readAsText(file);
}

// --- Download Logic ---
function downloadFile(content, fileName, mimeType) {
    if (!content) {
        alert('ダウンロードするコンテンツがありません。');
        return;
    }
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


// --- Conversion Logic ---
function convertCsvToJson(){
    const csv = csvInput.value.trim();
    if(!csv){
        jsonInput.value = '';
        return;
    }
    const lines = csv.split(/\r\n|\n/);
    const headers = lines[0].split(',');
    const result = [];
    for(let i = 1;i < lines.length;i++){
        const obj = {};
        const currentline = lines[i].split(',');
        for(let j = 0;j < headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    jsonInput.value = JSON.stringify(result, null, 2);
}

function convertJsonToCsv(){
    const json = jsonInput.value.trim();
    if(!json){
        csvInput.value = '';
        return;
    }
    try{
        const data = JSON.parse(json);
        if(!Array.isArray(data) || data.length === 0){
            csvInput.value = 'Invalid JSON format or empty array.';
            return;
        }
        const headers = Object.keys(data[0]);
        let csv = headers.join(',') + '\n';
        data.forEach(row => {
            const values = headers.map(header => row[header]);
            csv += values.join(',') + '\n';
        });
        csvInput.value = csv.trim();
    }catch(e){
        csvInput.value = 'Error parsing JSON: ' + e.message;
    }
}