const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

module.exports = require("knex")({
  client: "pg",
  connection: {
    host: DB_HOST,
    port: "5432",
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
});
