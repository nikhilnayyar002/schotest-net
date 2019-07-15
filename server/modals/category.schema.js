const mongoose = require('mongoose')
const TestSchema = require('./test.schema')

var categorySchema = new mongoose.Schema({
    name:{type:String},
    tests: [TestSchema],
    lastUpdated: { type:Date },
    _id: { type:Number },
    syllabus: {type:String}
});

module.exports = categorySchema

