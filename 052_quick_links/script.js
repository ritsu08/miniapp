const linkTitleInput = document.getElementById('link-title');
const linkUrlInput = document.getElementById('link-url');
const addLinkBtn = document.getElementById('add-link-btn');
const linkList = document.getElementById('link-list');

let links = JSON.parse(localStorage.getItem('quickLinks')) || [];

function renderLinks() {
    linkList.innerHTML = '';
    links.forEach(link => {
        const li = document.createElement('li');
        li.dataset.id = link.id;
        li.innerHTML = `
            <a href="${link.url}" target="_blank">${link.title}</a>
            <button class="delete-btn">削除</button>
        `;
        linkList.appendChild(li);

        li.querySelector('.delete-btn').addEventListener('click', () => deleteLink(link.id));
    });
}

function addLink() {
    const title = linkTitleInput.value.trim();
    const url = linkUrlInput.value.trim();

    if (!title || !url) {
        alert('タイトルとURLを入力してください。');
        return;
    }

    const newLink = {
        id: Date.now(),
        title: title,
        url: url
    };
    links.push(newLink);
    saveLinks();
    renderLinks();

    linkTitleInput.value = '';
    linkUrlInput.value = '';
}

function deleteLink(id) {
    links = links.filter(link => link.id !== id);
    saveLinks();
    renderLinks();
}

function saveLinks() {
    localStorage.setItem('quickLinks', JSON.stringify(links));
}

addLinkBtn.addEventListener('click', addLink);

// Initial render
renderLinks();