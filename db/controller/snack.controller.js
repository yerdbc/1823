const utils = require('../../util/util')
const snackModel = require('../model/snackModel')
let getSnack = (req,res)=>{
    snackModel.find()
    .then((data)=>{
        // console.log(data)
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
    .then((data)=>{
        utils.sendRes(res,0,'add ok',null)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let getSnackByBrand=(req,res)=>{
    let {brand}=req.body
    snackModel.find({brand})
    .then((data)=>{
        console.log(data)
        utils.sendRes(res,0,'select ok',data)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

// let getSnackByPage=(req,res)=>{
//     let page=req.body.page||1
//     let pageSize=req.body.pageSize||2
//     let result = {count:0,list:[]}
//     snackModel.find()
//     .then((data)=>{
//         result.count=data.length;
//         return snackModel.find().skip(Number((page-1)*pageSize)).limit(Number(pageSize))
//     })
//     .then((data)=>{
//         console.log(data)
//         result.lists=data
//         utils.sendRes(res,0,'get ok',result)
//     })
//     .catch((err)=>{
//         utils.log(err)
//         utils.sendRes(res,-1,err._message,null)
//     })
// }

let getSnackById=(req,res)=>{
    let{_id}=req.body
    snackModel.find({_id})
    .then((data)=>{
        utils.log(data)
        utils.sendRes(res,0,'select ok',data)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let getSnackByKw=(req,res)=>{
    let page=req.body.page||1
    let pageSize=req.body.pageSize||2
    let result = {count:0,list:[]}
    let {keyword}=req.body
    let reg=new RegExp(keyword)
    snackModel.find({name:{$regex:reg}})
    .then((data)=>{
        result.count=data.length;
        return snackModel.find({name:{$regex:reg}}).skip(Number((page-1)*pageSize)).limit(Number(pageSize))
    })
    .then((data)=>{
        result.lists=data
        utils.sendRes(res,0,'select ok',{data,result})
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let updateSnack=(req,res)=>{
    let _id=req.body._id
    let {name,price,imgPath,desc,weight,brand}=req.body
    snackModel.updateOne({_id:_id},{name,price,imgPath,desc,weight,brand})
    .then((data)=>{
        console.log(data)
        utils.sendRes(res,0,'update ok',null)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let delSnack=(req,res)=>{
    let _id=req.body._id
    snackModel.remove({_id:_id})
    .then((data)=>{
        utils.log(data)
        utils.sendRes(res,0,'del ok',null)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

module.exports={
    getSnack,addSnack,getSnackByBrand,getSnackById,getSnackByKw,updateSnack,delSnack
}