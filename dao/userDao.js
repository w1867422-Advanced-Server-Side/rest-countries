const { run, get, all } = require('../config/database');

async function createUser({ username, password, email, role }) {
    const sql = `
    INSERT INTO users (username, password, email, role)
    VALUES (?, ?, ?, ?)
  `;
    const result = await run(sql, [username, password, email, role]);
    return { id: result.lastID, username, email, role };
}

async function findUserByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    return await get(sql, [email]);
}

async function getUserCount() {
    const sql = `SELECT COUNT(*) as count FROM users`;
    const result = await get(sql);
    return result.count;
}

async function findUserById(id) {
    const sql = `SELECT id, username, email, role, created_at FROM users WHERE id = ?`;
    return await get(sql, [id]);
}

module.exports = {
    createUser,
    findUserByEmail,
    getUserCount,
    findUserById
};
