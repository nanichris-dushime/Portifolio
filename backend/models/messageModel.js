const db = require("../config/db");

async function getAllMessages() {
  const sql = `
    SELECT id, name, email, message, created_at
    FROM messages
    ORDER BY created_at DESC, id DESC
  `;

  return db.query(sql);
}

async function createMessage(message) {
  const sql = `
    INSERT INTO messages (name, email, message)
    VALUES (?, ?, ?)
  `;

  const result = await db.query(sql, [message.name, message.email, message.message]);
  return result.insertId;
}

module.exports = {
  getAllMessages,
  createMessage,
};
