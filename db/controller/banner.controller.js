const utils = require('../../util/util')
const bannerModel = require('../model/bannerModel')
let getBanner=(req,res)=>{
    bannerModel.find()
    .then((data)=>{
        utils.log(data)
        utils.sendRes(res,0,'seleck ok',data)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let addBanner=(req,res)=>{
    let {name,imgPath,desc,brand}=req.body
    bannerModel.insertMany({name,imgPath,desc,brand})
    .then((data)=>{
        utils.sendRes(res,0,'add ok',null)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let getBannerByBrand=(req,res)=>{
    let {brand}=req.body
    bannerModel.find({brand})
    .then((data)=>{
        console.log(data)
        utils.sendRes(res,0,'select ok',data)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let getBannerByPage=(req,res)=>{
    let page=req.body.page||1
    let pageSize=req.body.pageSize||2
    let result = {count:0,list:[]}
    bannerModel.find()
    .then((data)=>{
        result.count=data.length;
        return bannerModel.find().skip(Number((page-1)*pageSize)).limit(Number(pageSize))
    })
    .then((data)=>{
        utils.log(data)
        result.lists=data
        utils.sendRes(res,0,'get ok',result)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let getBannerById=(req,res)=>{
    let{_id}=req.body
    bannerModel.find({_id})
    .then((data)=>{
        utils.log(data)
        utils.sendRes(res,0,'select ok',data)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let getBannerByKw=(req,res)=>{
    let page=req.body.page||1
    let pageSize=req.body.pageSize||2
    let result = {count:0,list:[]}
    let {keyword}=req.body
    let reg=new RegExp(keyword)
    bannerModel.find({name:{$regex:reg}})
    .then((data)=>{
        result.count=data.length;
        return bannerModel.find({name:{$regex:reg}}).skip(Number((page-1)*pageSize)).limit(Number(pageSize))
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

let updateBanner=(req,res)=>{
    let _id=req.body._id
    let {name,imgPath,desc,brand}=req.body
    bannerModel.updateOne({_id:_id},{name,imgPath,desc,brand})
    .then((data)=>{
        console.log(data)
        utils.sendRes(res,0,'update ok',null)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let delBanner=(req,res)=>{
    let _id=req.body._id
    bannerModel.remove({_id:_id})
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
    getBanner,addBanner,getBannerByBrand,getBannerByPage,
    getBannerById,getBannerByKw,updateBanner,delBanner
}