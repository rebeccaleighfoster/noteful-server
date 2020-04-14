const knex = require('knex')
const app = require('./app')
const { 
  PORT
} = require("../config");
const knexConfig = require("../knexfile");

const db = knex(knexConfig);


app.set('db', db)

app.listen(PORT);