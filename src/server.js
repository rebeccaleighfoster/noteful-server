const knex = require('knex')
const app = require('./app')
const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = process.env

const db = knex({
  client: 'pg',
  connection: {
    host     : DB_HOST || 'localhost',
    port     : DB_PORT || '5432',
    user     : DB_USER || 'postgres', 
    database : 'noteful',
    charset  : 'utf8',
    timezone : 'utc',
    password : DB_PASSWORD || ""
  }
})


app.set('db', db)

app.listen(PORT)