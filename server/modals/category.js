const mongoose = require('mongoose')
const categorySchema = require('./category.schema')

module.exports = mongoose.model('Category', categorySchema)

