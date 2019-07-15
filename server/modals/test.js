const mongoose = require('mongoose')
const testSchema = require('./test.schema')

module.exports = mongoose.model('Test', testSchema)