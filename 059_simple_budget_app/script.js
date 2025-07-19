const balanceDisplay = document.getElementById('balance');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addTransactionBtn = document.getElementById('add-transaction-btn');
const transactionList = document.getElementById('transaction-list');

let transactions = JSON.parse(localStorage.getItem('budgetAppTransactions')) || [];

function renderTransactions() {
    transactionList.innerHTML = '';
    let totalBalance = 0;

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.dataset.id = transaction.id;
        li.classList.add(transaction.amount >= 0 ? 'plus' : 'minus');
        li.innerHTML = `
            <span class="description">${transaction.description}</span>
            <span class="amount">${transaction.amount >= 0 ? '+' : ''}${transaction.amount}円</span>
            <button class="delete-btn">削除</button>
        `;
        transactionList.appendChild(li);

        totalBalance += transaction.amount;

        li.querySelector('.delete-btn').addEventListener('click', () => deleteTransaction(transaction.id));
    });

    balanceDisplay.textContent = totalBalance;
}

function addTransaction() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!description || isNaN(amount)) {
        alert('説明と有効な金額を入力してください。');
        return;
    }

    const newTransaction = {
        id: Date.now(),
        description: description,
        amount: amount
    };
    transactions.push(newTransaction);
    saveTransactions();
    renderTransactions();

    descriptionInput.value = '';
    amountInput.value = '';
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    saveTransactions();
    renderTransactions();
}

function saveTransactions() {
    localStorage.setItem('budgetAppTransactions', JSON.stringify(transactions));
}

addTransactionBtn.addEventListener('click', addTransaction);

// Initial render
renderTransactions();