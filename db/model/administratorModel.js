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
    },
    qx:{
        type:String ,
        default:1
    }
});

let adminUser = mongoose.model('adminUser', AdminUserSchema);
module.exports = adminUser