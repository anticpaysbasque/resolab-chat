require("dotenv").config();

const host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let username = process.env.DB_USER;
let password = process.env.DB_PW;
let database = process.env.DB_DATABASE;
let dialect = process.env.DB_DIALECT;

if (process.env.NODE_ENV === "test") {
  database = process.env.DB_DATABASE_TEST;
  port = process.env.DB_PORT_TEST;
  username = process.env.DB_USER_TEST;
  password = process.env.DB_PW_TEST;
}

const conf = {
  host,
  port,
  username,
  password,
  database,
  dialect,
  logging: false
};

module.exports = conf;
