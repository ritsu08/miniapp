const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Simple file-based database
const DB_FILE = path.join(__dirname, 'data.json');

function readDB() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], posts: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Routes

// Home/Blog Posts
app.get('/', (req, res) => {
    const db = readDB();
    res.render('index', { user: req.session.user, posts: db.posts.reverse() });
});

// Register
app.get('/register', (req, res) => {
    res.render('register', { message: null });
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const db = readDB();

    if (db.users.find(u => u.username === username)) {
        return res.render('register', { message: 'ユーザー名は既に存在します。' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    db.users.push({ username, password: hashedPassword });
    writeDB(db);
    res.redirect('/login');
});

// Login
app.get('/login', (req, res) => {
    res.render('login', { message: null });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.render('login', { message: 'ユーザー名またはパスワードが間違っています。' });
    }

    req.session.user = { username: user.username };
    res.redirect('/');
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Create Post
app.get('/new-post', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('new-post', { user: req.session.user, message: null });
});

app.post('/new-post', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const { title, content } = req.body;
    const db = readDB();
    db.posts.push({
        id: Date.now(),
        title,
        content,
        author: req.session.user.username,
        date: new Date().toLocaleString()
    });
    writeDB(db);
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});