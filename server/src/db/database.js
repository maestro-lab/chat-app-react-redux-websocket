const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'chat.db');
const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  const users = [
    { username: 'test_user', password: 'test123' },
    { username: 'admin', password: 'admin123' },
    { username: 'student', password: 'student123' }
  ];

  users.forEach(u => {
    const hash = bcrypt.hashSync(u.password, 10);
    db.run('INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)', [u.username, hash]);
  });
});

module.exports = db;