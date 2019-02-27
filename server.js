const express = require('express');
const app = express();
const path = require('path')
const con = require('./db/connect.js')
const utils = require('./util/util.js')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

app.use('/static',express.static(path.join(__dirname,'public')))
// const adminUser = require('./router/userRouter.js')
// const adminUpload = require('./router/uploadRouter.js')
// const adminFood = require('./router/foodRouter.js')
// app.use('/admin/user/',adminUser)
// app.use('/admin/upload',adminUpload)
// app.use('/admin/food',adminFood)
app.listen(3000,()=>{
    utils.log('server start in port :' +3000)
})