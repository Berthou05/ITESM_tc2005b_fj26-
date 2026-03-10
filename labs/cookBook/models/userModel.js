const db = require('../config/db');
const bcrypt = require('bcrypt');

module.exports = class User {
  static findLogin(loginValue) {
    return db.execute(`
      SELECT user_id, username, email, password
      FROM users
      WHERE username = ? OR email = ?
      LIMIT 1
    `, 
    [loginValue, loginValue]).then(([rows]) => {
      return rows[0] || null;
    });
  }

  static createUser({ username, email, password }) {
    return bcrypt.hash(password, 12).then((hashedPassword) => {
      return db.execute(`
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)`,
        [username, email, hashedPassword]
      ).then(([result]) => {
        return result.insertId;
       });
      })
    };
    
  static validateSignup(username, email) {
    return db.execute(`
    SELECT user_id, username, email
    FROM users
    WHERE username = ? OR email = ?
    LIMIT 1
    `, [username, email]).then(([rows]) => {
      return rows[0] || null;
    });
  }
};