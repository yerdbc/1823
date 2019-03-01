const express = require('express')
const router = express.Router()
const newsController = require('../db/controller/news.controller')

router.post('/getNews',newsController.getNews)
router.post('/addNews',newsController.addNews)
router.post('/getNewsByBrand',newsController.getNewsByBrand)
router.post('/getNewsByPage',newsController.getNewsByPage)
router.post('/getNewsById',newsController.getNewsById)
router.post('/getNewsByKw',newsController.getNewsByKw)
router.post('/updateNews',newsController.updateNews)
router.post('/delNews',newsController.delNews)


module.exports=router