require('dotenv').config()

const url = process.env.MONGODB_URI
const PORT = process.env.PORT || 3003

module.exports = {
    url, PORT
}