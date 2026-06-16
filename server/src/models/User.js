const db = require('../db/database');
const bcrypt = require('bcryptjs');

class User {
  static findByUsername(username, callback) {
    db.get('SELECT * FROM users WHERE username = ?', [username], callback);
  }

  static validatePassword(user, password) {
    return bcrypt.compareSync(password, user.password);
  }
}

module.exports = User;