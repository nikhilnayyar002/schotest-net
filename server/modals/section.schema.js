const mongoose = require('mongoose')

var sectionSchema = new mongoose.Schema({
    name:{type:String},
    startQ: { type:Number },
    endQ:{ type:Number }
});

module.exports = sectionSchema