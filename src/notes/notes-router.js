const path = require('path')
const express = require('express')
const xss = require('xss')
const { NotesService } = require('./notes-service')

const notesRouter = express.Router()
const jsonParser = express.json()


const serializeNote = note => ({
    id: note.id,
    note_name: xss(note.note_name),
    content: xss(note.content),
    date_created: (note.date_created),
    modified: (note.modified),
    folder_id: (note.folder_id)
})

notesRouter.route('/')
  .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        NotesService.getAllNotes(knexInstance)
            .then(notes => {
                res.json(notes.map(serializeNote))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
    const newNote = req.body
       console.log(newNote)
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
            res.json(note[0])
        })
        .catch(next)
    })

notesRouter
    .route("/:id")
    .get((req, res, next) => {
       NotesService.getById(
            req.app.get('db'),
            req.params.id,
        )
        .then(note => {
            console.log(note)
            if (!note) {
                return res.status(404).json({
                    error: { message: `Note doesn't exist` }
                })
            }
            res.json(note)
        })
        .catch(next)
    })
    .delete((req, res, next) => {
        NotesService.deleteNote(
            req.app.get('db'),
            req.params.id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

notesRouter 
    .route("/folder/:folder_id")
    .get((req,res, next) => {
        NotesService.getByFolderId(
            req.app.get('db'),
            req.params.folder_id,
        )
        .then(notesById =>{
            console.log(notesById)
            res.json(notesById)
        }
        )
    })


module.exports = notesRouter