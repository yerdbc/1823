const utils = require('../../util/util')
const snackModel = require('../model/snackModel')
let getSnack = (req,res)=>{
    snackModel.find()
    .then((data)=>{
        console.log(data)
        utils.sendRes(res,0,'seleck ok',data)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let addSnack =(req,res)=>{
    let {name,price,imgPath,desc,weight,brand}=req.body
    snackModel.insertMany({name,price:Number(price),imgPath,desc,weight:Number(weight),brand})
}