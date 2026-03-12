const users = [
  { username: "admin", password: "12345678" },
  { username: "student", password: "password123" },
];

module.exports = class Users {
  static normalizeUsername(username) {
    return (username || "").trim().toLowerCase();
  }

  static validateUser(username, password) {
    const normalizedUsername = this.normalizeUsername(username);
    return users.some(
      (user) =>
        user.username.toLowerCase() === normalizedUsername &&
        user.password === password
    );
  }

  static userExists(username) {
    const normalizedUsername = this.normalizeUsername(username);
    return users.some((user) => user.username.toLowerCase() === normalizedUsername);
  }

  static createUser(username, password) {
    const cleanUsername = (username || "").trim();

    if (!cleanUsername || !password) {
      return false;
    }

    if (this.userExists(username)) {
      return false;
    }

    users.push({ username: cleanUsername, password });
    return true;
  }
};
