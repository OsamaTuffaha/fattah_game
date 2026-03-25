const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ❌ لا تستخدم pool.connect()

// optional: log لما يصير connection جديد
pool.on("connect", () => {
  console.log("DB connected");
});

// مهم جدًا: handle errors
pool.on("error", (err) => {
  console.error("Unexpected DB error", err);
});

module.exports = pool;