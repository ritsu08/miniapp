const forceHttpsCheckbox = document.getElementById('force-https');
const wwwRedirectCheckbox = document.getElementById('www-redirect');
const error404Input = document.getElementById('error-404');
const defaultCharsetInput = document.getElementById('default-charset');
const htaccessCodeTextarea = document.getElementById('htaccess-code');
const copyBtn = document.getElementById('copy-btn');

const controls = [
    forceHttpsCheckbox, wwwRedirectCheckbox, error404Input, defaultCharsetInput
];

function generateHtaccess() {
    let code = '';

    if (forceHttpsCheckbox.checked) {
        code += `
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
`;
    }

    if (wwwRedirectCheckbox.checked) {
        code += `
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ http://%1/$1 [R=301,L]
`;
    }

    if (error404Input.value.trim() !== '') {
        code += `
ErrorDocument 404 ${error404Input.value.trim()}
`;
    }

    if (defaultCharsetInput.value.trim() !== '') {
        code += `
AddDefaultCharset ${defaultCharsetInput.value.trim()}
`;
    }

    htaccessCodeTextarea.value = code.trim();
}

controls.forEach(control => {
    control.addEventListener('input', generateHtaccess);
    control.addEventListener('change', generateHtaccess); // For checkboxes
});

copyBtn.addEventListener('click', () => {
    htaccessCodeTextarea.select();
    document.execCommand('copy');
    alert('.htaccessコードをコピーしました！');
});

// Initial generation
generateHtaccess();