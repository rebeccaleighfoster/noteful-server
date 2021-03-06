const path = require('path')
const express = require('express')
const xss = require('xss')
const { FoldersService } = require('./folders-service')

const foldersRouter = express.Router()
const jsonParser = express.json()

const folders = [];

const serializeFolder = folder => ({
    id: folder.id,
    name: xss(folder.folder_name)
})

foldersRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        FoldersService.getAllFolders(knexInstance)
            .then(folders => {
                res.json(folders.map(serializeFolder))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { folder_name } = req.body
        const newFolder = { folder_name }
        folders.push(newFolder)

        for (const [key, value] of Object.entries(newFolder))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
        FoldersService.insertFolder(
            req.app.get('db'),
            newFolder
        )
        .then(folder => {
            res.json(folder)
               
        })
        .catch(next)
    })

foldersRouter
    .route('/:folder_id')
    .get((req, res, next) => {
        console.log( "first")
        FoldersService.getById(
            req.app.get('db'),
            req.params.folder_id
        )
        .then(folder => {
            console.log(folder)
            if (!folder) {
                return res.status(404).json({
                    error: { message: `Folder doesn't exist` }
                })
            }
            res.json(folder)
        })
        .catch(next)
    })
    .delete((req, res, next) => {
        FoldersService.deleteFolder(
            req.app.get('db'),
            req.params.folder_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = foldersRouter