const mongoose = require('mongoose')
let AdminUserSchema = new mongoose.Schema({
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

let adminUser = mongoose.model('user', AdminUserSchema);
module.exports = adminUser