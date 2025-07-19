const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productStockInput = document.getElementById('product-stock');
const addProductBtn = document.getElementById('add-product-btn');
const productList = document.getElementById('product-list');
const stockChartCanvas = document.getElementById('stockChart');

let stockChart;

async function fetchProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();
    renderProducts(products);
    updateChart(products);
}

async function addProduct() {
    const name = productNameInput.value.trim();
    const price = parseFloat(productPriceInput.value);
    const stock = parseInt(productStockInput.value);

    if (!name || isNaN(price) || price < 0 || isNaN(stock) || stock < 0) {
        alert('すべての項目を正しく入力してください。');
        return;
    }

    await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, stock })
    });

    productNameInput.value = '';
    productPriceInput.value = '';
    productStockInput.value = '';
    fetchProducts();
}

async function deleteProduct(id) {
    if (confirm('本当にこの商品を削除しますか？')) {
        await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });
        fetchProducts();
    }
}

async function updateProduct(id, currentName, currentPrice, currentStock) {
    const newName = prompt('新しい商品名を入力してください:', currentName);
    if (newName === null) return; // User cancelled

    const newPrice = parseFloat(prompt('新しい価格を入力してください:', currentPrice));
    if (isNaN(newPrice) || newPrice < 0) {
        alert('有効な価格を入力してください。');
        return;
    }

    const newStock = parseInt(prompt('新しい在庫数を入力してください:', currentStock));
    if (isNaN(newStock) || newStock < 0) {
        alert('有効な在庫数を入力してください。');
        return;
    }

    await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, price: newPrice, stock: newStock })
    });
    fetchProducts();
}

function renderProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>価格: ${product.price}円 | 在庫: ${product.stock}</p>
            </div>
            <div class="actions">
                <button class="edit-btn" data-id="${product.id}">編集</button>
                <button class="delete-btn" data-id="${product.id}">削除</button>
            </div>
        `;
        productList.appendChild(li);

        li.querySelector('.delete-btn').addEventListener('click', () => deleteProduct(product.id));
        li.querySelector('.edit-btn').addEventListener('click', () => updateProduct(product.id, product.name, product.price, product.stock));
    });
}

function updateChart(products) {
    const productNames = products.map(p => p.name);
    const productStocks = products.map(p => p.stock);

    if (stockChart) {
        stockChart.destroy();
    }

    stockChart = new Chart(stockChartCanvas, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: '在庫数',
                data: productStocks,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

addProductBtn.addEventListener('click', addProduct);

// Initial fetch
fetchProducts();