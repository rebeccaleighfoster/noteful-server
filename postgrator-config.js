require('dotenv').config();

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD
} = process.env;

module.exports = {
  migrationDirectory: __dirname + "/migrations",
  driver: "pg",
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  database: DATABASE_NAME,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  ssl: true
};