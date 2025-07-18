require('dotenv').config();

const sqlite3 = require('sqlite3').verbose();

const dbPath = process.env.DB_FILE || './myapp.db';

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Failed to open SQLite DB:', err);
    else console.log('SQLite DB connected at', dbPath);
});

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      email TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS api_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      api_key TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 1,
      usage_count INTEGER NOT NULL DEFAULT 0,
      last_used DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

    console.log("Ensured 'users' and 'api_keys' tables exist in SQLite DB.");
});

// Promise helpers
function run(sql, params=[]) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve(this); // this.lastID, this.changes
        });
    });
}

function get(sql, params=[]) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

function all(sql, params=[]) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = {
    db,
    run,
    get,
    all
};
