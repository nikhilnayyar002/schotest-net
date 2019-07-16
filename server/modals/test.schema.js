const mongoose = require('mongoose')
const QuestionSchema = require('./question.schema')
const sectionSchema = require('./section.schema')

var testSchema = new mongoose.Schema({
    name:{type:String},
    questions: [QuestionSchema],
    sections: [sectionSchema],
    time: { type:Number },
    detail:{type:String},
    _id: { type:Number },
    categoryID: {type:Number}
});

module.exports = testSchema

