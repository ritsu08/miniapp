const recordTitleInput = document.getElementById('record-title');
const recordGenreInput = document.getElementById('record-genre');
const watchedDateInput = document.getElementById('watched-date');
const ratingSelect = document.getElementById('rating');
const movieReviewTextarea = document.getElementById('movie-review');
const saveLogBtn = document.getElementById('save-log-btn');
const movieLogList = document.getElementById('movie-log-list');
const noLogsMessage = document.getElementById('no-logs-message');

let movieLogs = []; // 記録データを保持する配列

// --- Functions ---

// 記録データをローカルストレージに保存
function saveMovieLogs() {
    localStorage.setItem('movieLogs', JSON.stringify(movieLogs));
}

// 記録データをローカルストレージから読み込み
function loadMovieLogs() {
    const savedLogs = localStorage.getItem('movieLogs');
    if (savedLogs) {
        movieLogs = JSON.parse(savedLogs);
    }
    renderMovieLogs(); // 読み込んだデータを表示
}

// 記録データをHTMLに描画
function renderMovieLogs() {
    movieLogList.innerHTML = ''; // 一度クリア
    if (movieLogs.length === 0) {
        noLogsMessage.style.display = 'block'; // 記録がないメッセージを表示
        return;
    } else {
        noLogsMessage.style.display = 'none'; // 記録がないメッセージを非表示
    }

    // 各記録をカードとして表示
    movieLogs.forEach((log, index) => {
        const logCard = document.createElement('div');
        logCard.classList.add('movie-log-card');
        logCard.innerHTML = `
            <h3>${log.title}</h3>
            ${log.genre ? `<p><strong>ジャンル:</strong> ${log.genre}</p>` : ''}
            <p><strong>日付:</strong> ${log.date}</p>
            <p><strong>評価:</strong> <span class="rating">${'★'.repeat(parseInt(log.rating))}</span></p>
            ${log.review ? `<p class="review">${log.review}</p>` : ''}
            <button class="delete-btn" data-index="${index}">削除</button>
        `;
        movieLogList.appendChild(logCard);
    });

    // 削除ボタンにイベントリスナーを追加
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const indexToDelete = e.target.dataset.index;
            deleteMovieLog(indexToDelete);
        });
    });
}

// 新しい記録を追加
function addMovieLog() {
    const title = recordTitleInput.value.trim();
    const genre = recordGenreInput.value.trim();
    const date = watchedDateInput.value;
    const rating = ratingSelect.value;
    const review = movieReviewTextarea.value.trim();

    if (!title) {
        alert('タイトルは必須です。');
        return;
    }

    const newLog = {
        title,
        genre,
        date,
        rating,
        review,
        timestamp: Date.now() // 記録順を保持するため
    };

    movieLogs.push(newLog);
    saveMovieLogs(); // 保存
    renderMovieLogs(); // 再描画
    clearForm(); // フォームをクリア
}

// 記録を削除
function deleteMovieLog(index) {
    if (confirm('この記録を削除してもよろしいですか？')) {
        movieLogs.splice(index, 1);
        saveMovieLogs();
        renderMovieLogs();
    }
}

// フォームをクリア
function clearForm() {
    recordTitleInput.value = '';
    recordGenreInput.value = '';
    watchedDateInput.value = '';
    ratingSelect.value = '0'; // 未評価にリセット
    movieReviewTextarea.value = '';
}

// --- Event Listeners ---
saveLogBtn.addEventListener('click', addMovieLog);
document.addEventListener('DOMContentLoaded', loadMovieLogs);