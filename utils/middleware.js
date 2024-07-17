const logger = require('./logger')

const requestLog = (request, response, next) => {
    logger.info('Method: ', request.method) // request.method: get, post, etc.
    logger.info('Path: ', request.path) // request.path: path of url
    logger.info('Body:', request.body) // request.body: request content, usually json obj
    logger.info('---')
    next() // execute next middleware
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message) // print error message
    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
    next(error)
}

module.exports = {
    requestLog, 
    unknownEndpoint, 
    errorHandler
}