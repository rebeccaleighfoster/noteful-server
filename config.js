require("dotenv").config();

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD
} = process.env;

module.exports = {
  DATABASE_HOST: DATABASE_HOST || "localhost",
  DATABASE_PORT: DATABASE_PORT || "5432",
  DATABASE_NAME: DATABASE_NAME || "notefuldb",
  DATABASE_USER: DATABASE_USER || "postgres",
  DATABASE_PASSWORD: DATABASE_PASSWORD || "",
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://dunder_mifflin@localhost/noteful"
};