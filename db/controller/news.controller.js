const utils = require('../../util/util')
const newsModel = require('../model/newsModel')
let getNews = (req,res)=>{
    newsModel.find()
    .then((data)=>{
        console.log(data)
        utils.sendRes(res,0,'seleck ok',data)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let addNews =(req,res)=>{
    let updateTime = new Date();
    let {title,content,origin,brand}=req.body
    newsModel.insertMany({title,content,origin,updateTime,brand})
    .then((data)=>{

        utils.sendRes(res,0,'add ok',null)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let getNewsByBrand=(req,res)=>{
    let {brand}=req.body
    newsModel.find({brand})
    .then((data)=>{
        console.log(data)
        utils.sendRes(res,0,'select ok',data)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let getNewsByPage=(req,res)=>{
    let page=req.body.page||1
    let pageSize=req.body.pageSize||2
    let result = {count:0,list:[]}
    newsModel.find()
    .then((data)=>{
        result.count=data.length;
        return newsModel.find().skip(Number((page-1)*pageSize)).limit(Number(pageSize))
    })
    .then((data)=>{
        console.log(data)
        result.lists=data
        utils.sendRes(res,0,'get ok',result)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let getNewsById=(req,res)=>{
    let{_id}=req.body
    newsModel.find({_id})
    .then((data)=>{
        utils.log(data)
        utils.sendRes(res,0,'select ok',data)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let getNewsByKw=(req,res)=>{
    let {keyword}=req.body
    let reg=new RegExp(keyword)
    newsModel.find({$or:[{title:{$regex:reg}},{content:{$regex:reg}}]})
    .then((data)=>{
        console.log(data)
        utils.sendRes(res,0,'select ok',data)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let updateNews=(req,res)=>{
    let _id=req.body._id
    let {title,content,origin,updatetime,brand}=req.body
    newsModel.updateOne({_id:_id},{title,content,origin,updatetime,brand})
    .then((data)=>{
        console.log(data)
        utils.sendRes(res,0,'update ok',null)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)
    })
}

let delNews=(req,res)=>{
    let _id=req.body._id
    newsModel.remove({_id:_id})
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
    getNews,addNews,getNewsByBrand,getNewsByPage,getNewsById,getNewsByKw,updateNews,delNews
}