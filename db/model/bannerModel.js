const mongoose = require('mongoose')
let bannerSchema=new mongoose.Schema({
    name:{type:String,require:true},
    imgPath:{type:String,require:true},
    desc:{type:String,require:true},
    release:{type:String,default:0}
})
let bannerList = mongoose.model('banner',bannerSchema);
module.exports=bannerList 