const bookTitleInput = document.getElementById('book-title');
const bookAuthorInput = document.getElementById('book-author');
const readDateInput = document.getElementById('read-date');
const addBookBtn = document.getElementById('add-book-btn');
const bookList = document.getElementById('book-list');

let books = JSON.parse(localStorage.getItem('bookTrackerBooks')) || [];

function renderBooks() {
    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.dataset.id = book.id;
        li.innerHTML = `
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>著者: ${book.author}</p>
                <p>読了日: ${book.readDate}</p>
            </div>
            <button class="delete-btn">削除</button>
        `;
        bookList.appendChild(li);

        li.querySelector('.delete-btn').addEventListener('click', () => deleteBook(book.id));
    });
}

function addBook() {
    const title = bookTitleInput.value.trim();
    const author = bookAuthorInput.value.trim();
    const readDate = readDateInput.value;

    if (!title || !author || !readDate) {
        alert('すべての項目を入力してください。');
        return;
    }

    const newBook = {
        id: Date.now(),
        title: title,
        author: author,
        readDate: readDate
    };
    books.push(newBook);
    saveBooks();
    renderBooks();

    bookTitleInput.value = '';
    bookAuthorInput.value = '';
    readDateInput.value = '';
}

function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    saveBooks();
    renderBooks();
}

function saveBooks() {
    localStorage.setItem('bookTrackerBooks', JSON.stringify(books));
}

addBookBtn.addEventListener('click', addBook);

// Initial render
renderBooks();