const flexDirection = document.getElementById('flex-direction');
const justifyContent = document.getElementById('justify-content');
const alignItems = document.getElementById('align-items');
const flexWrap = document.getElementById('flex-wrap');
const flexContainer = document.getElementById('flex-container');
const cssCode = document.getElementById('css-code');
const copyBtn = document.getElementById('copy-btn');

const controls = [flexDirection, justifyContent, alignItems, flexWrap];

function updateFlexbox() {
    const style = flexContainer.style;
    style.flexDirection = flexDirection.value;
    style.justifyContent = justifyContent.value;
    style.alignItems = alignItems.value;
    style.flexWrap = flexWrap.value;

    updateCssCode();
}

function updateCssCode() {
    const code = `
.container {
    display: flex;
    flex-direction: ${flexDirection.value};
    justify-content: ${justifyContent.value};
    align-items: ${alignItems.value};
    flex-wrap: ${flexWrap.value};
}
    `.trim();
    cssCode.value = code;
}

controls.forEach(control => {
    control.addEventListener('change', updateFlexbox);
});

copyBtn.addEventListener('click', () => {
    cssCode.select();
    document.execCommand('copy');
    alert('コピーしました！');
});

// Initial setup
updateFlexbox();