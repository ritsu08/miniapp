const meetingTitleInput = document.getElementById('meeting-title');
const meetingDateInput = document.getElementById('meeting-date');
const meetingTimeInput = document.getElementById('meeting-time');
const attendeesInput = document.getElementById('attendees');
const agendaItemsInput = document.getElementById('agenda-items');
const generateBtn = document.getElementById('generate-btn');
const minutesTemplateTextarea = document.getElementById('minutes-template');
const copyBtn = document.getElementById('copy-btn');

generateBtn.addEventListener('click', generateMinutesTemplate);

copyBtn.addEventListener('click', () => {
    minutesTemplateTextarea.select();
    document.execCommand('copy');
    alert('議事録テンプレートをコピーしました！');
});

function generateMinutesTemplate() {
    const title = meetingTitleInput.value.trim();
    const date = meetingDateInput.value;
    const time = meetingTimeInput.value;
    const attendees = attendeesInput.value.split(',').map(a => a.trim()).filter(a => a !== '');
    const agenda = agendaItemsInput.value.split(/\r\n|\n/).map(a => a.trim()).filter(a => a !== '');

    let template = `## ${title || '会議タイトル'}

### 開催日時
${date || 'YYYY-MM-DD'} ${time || 'HH:MM'}

### 参加者
`;

    if (attendees.length > 0) {
        attendees.forEach(attendee => {
            template += `- ${attendee}\n`;
        });
    } else {
        template += `- (参加者名)\n`;
    }

    template += `
### 議題
`;

    if (agenda.length > 0) {
        agenda.forEach(item => {
            template += `- ${item}\n`;
            template += `  - (議論内容)\n`;
            template += `  - (決定事項)\n`;
            template += `  - (担当者: ) (期限: )\n`;
        });
    } else {
        template += `- (議題1)\n`;
        template += `  - (議論内容)\n`;
        template += `  - (決定事項)\n`;
        template += `  - (担当者: ) (期限: )\n`;
    }

    template += `
### その他
- (特記事項があれば記載)

### 次回アクション
- (アクション1) (担当者: ) (期限: )
- (アクション2) (担当者: ) (期限: )
`;

    minutesTemplateTextarea.value = template.trim();
}

// Set current date and time as default
const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const day = now.getDate().toString().padStart(2, '0');
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');

meetingDateInput.value = `${year}-${month}-${day}`;
meetingTimeInput.value = `${hours}:${minutes}`;

// Initial generation
generateMinutesTemplate();