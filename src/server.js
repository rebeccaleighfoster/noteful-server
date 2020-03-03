const app = require('./app')
const { PORT } = require('./config')

const db = knex({
  client: 'pg',
  connection: {
    host     : 'localhost',
    port      : '5432',
    user     : 'postgres', 
    database : 'noteful',
    charset  : 'utf8',
    timezone : 'utc'
  }
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})