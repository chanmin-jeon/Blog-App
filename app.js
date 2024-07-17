const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.url)
    .then(result => {
        logger.info(`connected to ${config.url}`)
    })
    .catch(error => {
        logger.error('error connecting to MongoDB: ', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLog)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app