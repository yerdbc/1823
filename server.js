const express = require('express');
const app = express();
const path = require('path')
const con = require('./db/connect.js')
const utils = require('./util/util.js')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/static', express.static(path.join(__dirname, 'public')))
const adminUser = require('./router/userRouter.js')
<<<<<<< HEAD
const adminBanner = require('./router/bannerRouter.js')
const adminSnack = require('./router/snackRouter.js')
app.use('/admin/user/', adminUser)
app.use('/admin/banner', utils.verify, adminBanner)
app.use('/admin/snack', utils.verify, adminSnack)
=======
app.use('/admin/user/', adminUser)

const adminBanner = require('./router/bannerRouter.js')
const adminSnack = require('./router/snackRouter.js')
const adminNews = require('./router/newsRouter.js')
const adminUpload=require('./router/uploadRouter')
app.use('/admin/banner', adminBanner)
app.use('/admin/snack', adminSnack)
app.use('/admin/news',adminNews)
app.use('/admin/upload',adminUpload)

>>>>>>> 561199aff755184d946be30de05df527be57d89b
app.listen(3000, () => {
    utils.log('server start in port :' + 3000)
})