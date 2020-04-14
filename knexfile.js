// Update with your config settings.
const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD
} = require("./config.js")


module.exports = {
  client: "pg",
  connection: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    database: DATABASE_NAME,
    charset: "utf8",
    timezone: "utc",
    password: DATABASE_PASSWORD
  },
  seeds: {
    directory: "./seeds"
  }
};