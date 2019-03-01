const express = require('express')
const router = express.Router()
const sanckController = require('../db/controller/snack.controller')

router.post('/getSnack',sanckController.getSnack)
router.post('/addSnack',sanckController.addSnack)
router.post('/getSnackByBrand',sanckController.getSnackByBrand)
router.post('/getSnackByPage',sanckController.getSnackByPage)
router.post('/getSnackById',sanckController.getSnackById)
router.post('/getSnackByKw',sanckController.getSnackByKw)
router.post('/updateSnack',sanckController.updateSnack)
router.post('/delSnack',sanckController.delSnack)


module.exports=router