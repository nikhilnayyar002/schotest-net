const mongoose = require('mongoose')

var questionSchema = new mongoose.Schema({
    content:{type:String},
    image:{type:String},
    isComprehension:{type:Boolean},
    comprehensionContent:{type:String},
    answers:{type:[String]},
    state:{type:String},
    checkedAnswerIndex:{ type:Number },
    _id: { type:Number }
});

module.exports = questionSchema