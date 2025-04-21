const { run, get, all } = require('../config/database');

async function createApiKey({ user_id, api_key }) {
    const sql = `
    INSERT INTO api_keys (user_id, api_key)
    VALUES (?, ?)
  `;
    const result = await run(sql, [user_id, api_key]);
    return await get(`SELECT * FROM api_keys WHERE id = ?`, [result.lastID]);
}

async function getApiKeysByUserId(user_id) {
    const sql = `SELECT * FROM api_keys WHERE user_id = ?`;
    return await all(sql, [user_id]);
}

async function getApiKeyById(id) {
    const sql = `SELECT * FROM api_keys WHERE id = ?`;
    return await get(sql, [id]);
}

async function updateApiKey(id, updates) {
    const fields = [];
    const values = [];

    if (updates.api_key !== undefined) {
        fields.push("api_key = ?");
        values.push(updates.api_key);
    }
    if (updates.active !== undefined) {
        fields.push("active = ?");
        values.push(updates.active);
    }

    if (fields.length === 0) return null;

    const sql = `UPDATE api_keys SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    await run(sql, values);
    return await getApiKeyById(id);
}

async function deleteApiKey(id) {
    const sql = `DELETE FROM api_keys WHERE id = ?`;
    await run(sql, [id]);
    return { id };
}

async function findApiKeyByValue(api_key) {
    const sql = `
    SELECT * FROM api_keys
    WHERE api_key = ? AND active = 1
  `;
    return await get(sql, [api_key]);
}

async function getAllApiKeys() {
    const sql = `
    SELECT k.*, u.email AS user_email
    FROM api_keys k
    JOIN users u ON u.id = k.user_id
  `;
    return await all(sql);
}

async function logApiKeyUsage(keyId) {
    const sql = `
    UPDATE api_keys
    SET usage_count = usage_count + 1,
        last_used   = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
    await run(sql, [keyId]);
}

module.exports = {
    createApiKey,
    getApiKeysByUserId,
    getApiKeyById,
    updateApiKey,
    deleteApiKey,
    findApiKeyByValue,
    getAllApiKeys,
    logApiKeyUsage
};