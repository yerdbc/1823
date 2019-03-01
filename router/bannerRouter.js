const express = require('express')
const router = express.Router()
const bannerController = require('../db/controller/banner.controller')

router.post('/getBanner',bannerController.getBanner)
router.post('/addBanner',bannerController.addBanner)
router.post('/getBannerByBrand',bannerController.getBannerByBrand)
router.post('/getBannerByPage',bannerController.getBannerByPage)
router.post('/getBannerById',bannerController.getBannerById)
router.post('/getBannerByKw',bannerController.getBannerByKw)
router.post('/updateBanner',bannerController.updateBanner)
router.post('/delBanner',bannerController.delBanner)

module.exports=router