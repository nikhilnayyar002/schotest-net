const mongoose = require('mongoose');

const userSchema = require('./user.schema')


mongoose.model('User', userSchema);
