const path = require('path')
const express = require('express')
const xss = require('xss')
const { NotesService } = require('./notes-service')

const notesRouter = express.Router()
const jsonParser = express.json()

const notes = [];

const serializeNote = notes => ({
    id: notes.id,
    note_name: xss(notes.note_name),
    content: xss(notes.content),
    date_created: (notes.date_created),
    modified: (notes.modified),
    folder_id: (notes.folder_id)
})

notesRouter
    .route('/notes')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        NotesService.getAllNotes(knexInstance)
            .then(notes => {
                res.json(notes.map(serializeNote))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { note_name } = req.body
        const newNote = { note_name }
        notes.push(newNote)

        for (const [key, value] of Object.entries(newNote))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
        NotesService.insertNote(
            req.app.get('db'),
            newNote
        )
        .then(note => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${note.id}`))
                .json(serializeNote(note))
        })
        .catch(next)
    })

notesRouter
    .route('/note/:id')
    .all((req, res, next) => {
        NotesService.getById(
            req.app.get('db'),
            req.params.id
        )
        .then(note => {
            if (!note) {
                return res.status(404).json({
                    error: { message: `Note doesn't exist` }
                })
            }
            res.note = note
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(notes.map(serializeNote(res.notes)))
    })
    .delete((req, res, next) => {
        NotesService.deleteNote(
            req.app.get('db'),
            req.params.note_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = notesRouter