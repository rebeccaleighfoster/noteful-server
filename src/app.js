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

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain);

app.use('/folders', foldersRouter)
app.use('/notes', notesRouter)


app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.use(function errorHandler(error, req, res, next) {
    res.status(500).json({ message: error.message, error })
 })

module.exports = app