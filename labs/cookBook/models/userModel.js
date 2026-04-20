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
      // Signup is handled in the procedure so user creation and default role assignment stay together.
      return db.execute('CALL CreateUserWithRole(?, ?, ?, ?)',
        [username, email, hashedPassword, 'lector']
      ).then(([resultSets]) => {
        return resultSets[0][0].user_id;
       });
      })
    };

  static assignRoleByName(userId, roleName = 'lector') {
    return db.execute(
      `
        INSERT INTO user_roles (id_user, id_rol)
        SELECT ?, id
        FROM roles
        WHERE rol = ?
      `,
      [userId, roleName]
    ).then(([result]) => {
      return result.affectedRows > 0;
    });
  }
    
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

  static getPrivileges(username) {
    return db.execute(`
      SELECT p.privilege
      FROM users u
      JOIN user_roles ur ON u.user_id = ur.id_user
      JOIN roles r ON ur.id_rol = r.id
      JOIN role_privileges rp ON r.id = rp.id_rol
      JOIN privileges p ON rp.id_privilege = p.id
      WHERE u.username = ?;
    `, [username]);
  }
};
