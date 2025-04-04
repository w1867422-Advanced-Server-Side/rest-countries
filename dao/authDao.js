const { run, get, all } = require('../config/database');

async function createUser({ username, passwordHash, email }) {
    const sql = `
    INSERT INTO users (username, password, email, role)
    VALUES (?, ?, ?, 'user')
  `;
    const result = await run(sql, [username, passwordHash, email]);
    return result.lastID;
}

async function findByUsername(username) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    return get(sql, [username]);
}

module.exports = {
    createUser,
    findByUsername
};
