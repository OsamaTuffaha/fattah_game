const { Pool } = require("pg");
const connectionString = process.env.STRING;

const pool = new Pool({
  connectionString
});

pool
  .connect()
  .then(() => {
    console.log("db connected successfuly");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = pool;
