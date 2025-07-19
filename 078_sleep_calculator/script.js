const bedtimeInput = document.getElementById('bedtime');
const waketimeInput = document.getElementById('waketime');
const calculateBtn = document.getElementById('calculate-btn');
const sleepDurationDisplay = document.getElementById('sleep-duration');

calculateBtn.addEventListener('click', calculateSleepDuration);

function calculateSleepDuration() {
    const bedtimeStr = bedtimeInput.value;
    const waketimeStr = waketimeInput.value;

    if (!bedtimeStr || !waketimeStr) {
        sleepDurationDisplay.textContent = '-';
        alert('就寝時刻と起床時刻を入力してください。');
        return;
    }

    const now = new Date();
    const bedTime = new Date(now.toDateString() + ' ' + bedtimeStr);
    let wakeTime = new Date(now.toDateString() + ' ' + waketimeStr);

    // If wake time is earlier than bed time, it means wake time is on the next day
    if (wakeTime.getTime() < bedTime.getTime()) {
        wakeTime.setDate(wakeTime.getDate() + 1);
    }

    const diffMs = wakeTime.getTime() - bedTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    const hours = Math.floor(diffHours);
    const minutes = Math.round((diffHours - hours) * 60);

    sleepDurationDisplay.textContent = `${hours}時間 ${minutes}分`;
}

// Set default times
bedtimeInput.value = '23:00';
waketimeInput.value = '07:00';

// Initial calculation
calculateSleepDuration();