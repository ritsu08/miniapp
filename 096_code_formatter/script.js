const codeTypeSelect = document.getElementById('code-type');
const beautifyBtn = document.getElementById('beautify-btn');
const minifyBtn = document.getElementById('minify-btn');
const inputCode = document.getElementById('input-code');
const outputCode = document.getElementById('output-code');

// --- Event Listeners ---
beautifyBtn.addEventListener('click', () => processCode('beautify'));
minifyBtn.addEventListener('click', () => processCode('minify'));

// --- Functions ---

function processCode(action) {
    const type = codeTypeSelect.value;
    const code = inputCode.value;
    let result = '';

    if (type === 'html') {
        result = action === 'beautify' ? beautifyHtml(code) : minifyHtml(code);
    } else if (type === 'css') {
        result = action === 'beautify' ? beautifyCss(code) : minifyCss(code);
    } else if (type === 'js') {
        result = action === 'beautify' ? beautifyJs(code) : minifyJs(code);
    }

    outputCode.value = result;
}

// --- HTML Processing ---
function beautifyHtml(html) {
    // 簡易的なHTML整形
    // タグごとに改行し、インデントを調整
    let formatted = html.replace(/</g, '\n<').replace(/>/g, '>\n');
    let indent = 0;
    let lines = formatted.split('\n');
    let result = [];

    lines.forEach(line => {
        line = line.trim();
        if (line.length === 0) return;

        if (line.startsWith('</') || line.startsWith('}') || line.startsWith(']')) {
            indent--;
        }
        result.push('  '.repeat(indent) + line);
        if (line.startsWith('<') && !line.startsWith('</') && !line.endsWith('/>')) {
            indent++;
        }
    });
    return result.join('\n').trim();
}

function minifyHtml(html) {
    // 簡易的なHTML圧縮
    return html.replace(/\s+/g, ' ') // 複数の空白を1つに
              .replace(/>\s*</g, '><') // タグ間の空白を削除
              .trim();
}

// --- CSS Processing ---
function beautifyCss(css) {
    // 簡易的なCSS整形
    return css.replace(/\s*{\s*/g, ' {\n    ') // { の前後に改行とインデント
              .replace(/;\s*/g, ';\n    ') // ; の後に改行とインデント
              .replace(/}\s*/g, '}\n') // } の後に改行
              .replace(/\n\s*\n/g, '\n') // 余分な空行を削除
              .trim();
}

function minifyCss(css) {
    // 簡易的なCSS圧縮
    return css.replace(/\/\*[^]*?\*\//g, '') // コメント削除
              .replace(/\s*([{}|:;,])\s*/g, '$1') // 余分な空白削除
              .replace(/;}/g, '}').trim();
}

// --- JavaScript Processing ---
function beautifyJs(js) {
    // 簡易的なJavaScript整形 (JSON.stringifyを利用)
    try {
        // JSONとしてパースできる場合のみ整形
        const parsed = JSON.parse(js);
        return JSON.stringify(parsed, null, 2);
    } catch (e) {
        // JSONとしてパースできない場合は、簡易的な整形
        return js.replace(/;\s*/g, ';\n') // ; の後に改行
                  .replace(/{\s*/g, '{\n') // { の後に改行
                  .replace(/}\s*/g, '}\n') // } の後に改行
                  .replace(/\n\s*\n/g, '\n') // 余分な空行を削除
                  .trim();
    }
}

function minifyJs(js) {
    // 簡易的なJavaScript圧縮 (改行とコメント削除)
    return js.replace(/\/\/.*|\/\*[^]*?\*\//g, '') // コメント削除
              .replace(/\s*([{}();,])\s*/g, '$1') // 余分な空白削除
              .replace(/\n/g, '').trim();
}