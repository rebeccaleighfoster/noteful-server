const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const notesRouter = require('./notes/notes-router')
const foldersRouter = require('./folders/folders-router')
const { NODE_ENV } = require('../config');

const app = express()


const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())



app.use('/folders', foldersRouter)
app.use('/notes', notesRouter)


app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.use(function errorHandler(error, req, res, next) {
    res.status(500).json({ message: error.message, error })
 })

module.exports = app