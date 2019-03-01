const mongoose = require('mongoose')
let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
});

let user = mongoose.model('user', UserSchema);
module.exports = user