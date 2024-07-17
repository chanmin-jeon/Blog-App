const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({})
        .then(blogs => {
            response.json({blogs})
        })
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    blog.save()
        .then(newblog => {
            response.status(201).json({newblog})
        })
        .catch(error => next(error))
})

module.exports = blogsRouter