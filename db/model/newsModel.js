const mongoose = require('mongoose')
let newsSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    origin:{type:String,required:true},
    updateTime:{type:String},
    reviewTimes:{type:Number},
    brand:{type:String,required:true}
})

let news = mongoose.model('news',newsSchema);
module.exports=news