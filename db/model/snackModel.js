const mongoose = require('mongoose')
let snackSchema = new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    imgPath:{type:String,required:true},
    desc:{type:String,required:true},
    weight:{type:Number,required:true},
    brand:{type:String,required:true}
})

let list = mongoose.model('snack',snackSchema);
module.exports=list