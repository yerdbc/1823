const express =require('express')
const router=express.Router()
const utils=require('../util/util')
const  multer  = require('multer')
const fs=require('fs')
const Path=require('path')
const  upload = multer({ dest: 'uploads/' }) // 指定上传的缓存目录
router.post('/img', upload.single('hehe'),(req,res)=>{
  //single 文件上传的数据key
  console.log(req.file)
  let {path,mimetype}= req.file
  // 只允许后缀名  png  jpg jpeg gif
  let ext=mimetype.split('/')[1] //获取后缀名
  if(['jpg','png','gif','jpeg'].indexOf(ext)==-1){
    return utils.sendRes(res,-1,'非法格式',null)
  }
  // 文件大小
  let name=(new Date()).getTime()+parseInt(Math.random()*999999)+parseInt(Math.random()*999) // 名字必须不重复
  fs.readFile(path,(err,data)=>{
    if(err) { return utils.sendRes(res,-2,'上传失败',null)}
    fs.writeFile(Path.join(__dirname,`../public/img/${name}.${ext}`),data,'binary',(err)=>{
       if(err) { return utils.sendRes(res,-2,'上传失败',null)}
       let url=`/public/img/${name}.${ext}`

        return utils.sendRes(res,0,'上传成功',url)
    })
  })


})

module.exports=router
/*
文件上传
1.前端
 1. 通过<input type='file'>  文件域   获取文件
 2. 将获取的文件信息转化为formdata数据格式  注意key和后端同一
 3. 通过ajax进行上传 jq
    文件上传数据不需要缓存
    文件上传的数据类型 不需要jq进行默认处理
    contenttype false
2.后端
  1.获取前端上传的文件数据
    通过第三方插件获取  multer
    通过req.file获取
    { fieldname: 'hehe',
      originalname: 'IMG_3872.JPG',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: 'uploads/',
      filename: '47fff50927d63bfef82f0642042558aa',
      path: 'uploads/47fff50927d63bfef82f0642042558aa',
      size: 88546 }
  2.将文件数据进行处理
  3.将文件数据写入本地
*/
