const db = require('../db/database');

class Message {
  static getAll(callback) {
    db.all('SELECT * FROM messages ORDER BY created_at ASC', [], callback);
  }

  static create(username, content, callback) {
    db.run(
      'INSERT INTO messages (username, content) VALUES (?, ?)',
      [username, content],
      function(err) {
        callback(err, { id: this.lastID, username, content });
      }
    );
  }

  static getRecent(limit = 50, callback) {
    db.all(
      'SELECT * FROM messages ORDER BY created_at DESC LIMIT ?',
      [limit],
      (err, rows) => callback(err, rows ? rows.reverse() : [])
    );
  }
}

module.exports = Message;