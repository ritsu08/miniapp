const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple file-based database
const DB_FILE = path.join(__dirname, 'products.json');

function readDB() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ products: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
    const db = readDB();
    res.json(db.products);
});

// Add a new product
app.post('/api/products', (req, res) => {
    const db = readDB();
    const newProduct = {
        id: Date.now(),
        name: req.body.name,
        price: parseFloat(req.body.price),
        stock: parseInt(req.body.stock)
    };
    db.products.push(newProduct);
    writeDB(db);
    res.status(201).json(newProduct);
});

// Update a product
app.put('/api/products/:id', (req, res) => {
    const db = readDB();
    const productId = parseInt(req.params.id);
    const { name, price, stock } = req.body;

    const productIndex = db.products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    db.products[productIndex] = {
        ...db.products[productIndex],
        name: name || db.products[productIndex].name,
        price: parseFloat(price) || db.products[productIndex].price,
        stock: parseInt(stock) || db.products[productIndex].stock
    };
    writeDB(db);
    res.json(db.products[productIndex]);
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
    const db = readDB();
    const productId = parseInt(req.params.id);
    db.products = db.products.filter(p => p.id !== productId);
    writeDB(db);
    res.status(204).send(); // No content
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});