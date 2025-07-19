const datetimeInput = document.getElementById('datetime-input');
const format1Output = document.getElementById('format1');
const format2Output = document.getElementById('format2');
const format3Output = document.getElementById('format3');
const format4Output = document.getElementById('format4');
const format5Output = document.getElementById('format5');

function updateFormattedDates() {
    const dateString = datetimeInput.value;
    if (!dateString) {
        clearOutputs();
        return;
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        clearOutputs();
        return;
    }

    // YYYY/MM/DD HH:mm:ss
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    const hh = date.getHours().toString().padStart(2, '0');
    const mi = date.getMinutes().toString().padStart(2, '0');
    const ss = date.getSeconds().toString().padStart(2, '0');
    format1Output.value = `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;

    // YYYY年MM月DD日 HH時mm分ss秒
    format2Output.value = `${yyyy}年${mm}月${dd}日 ${hh}時${mi}分${ss}秒`;

    // MM/DD/YYYY
    format3Output.value = `${mm}/${dd}/${yyyy}`;

    // HH:mm AM/PM
    const ampmHours = date.getHours() % 12 || 12; // 0時は12に変換
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    format4Output.value = `${ampmHours.toString().padStart(2, '0')}:${mi} ${ampm}`;

    // ISO 8601
    format5Output.value = date.toISOString();
}

function clearOutputs() {
    format1Output.value = '';
    format2Output.value = '';
    format3Output.value = '';
    format4Output.value = '';
    format5Output.value = '';
}

datetimeInput.addEventListener('input', updateFormattedDates);

// Set current datetime as default
const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const day = now.getDate().toString().padStart(2, '0');
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');

datetimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;

// Initial update
updateFormattedDates();