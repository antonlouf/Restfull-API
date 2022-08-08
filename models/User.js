const mongoose = require('mongoose');

//Create schema 
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', UserSchema);  