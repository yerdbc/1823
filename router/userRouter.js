const express = require('express');
const router = express.Router();
const userController = require('../db/controller/user.controller.js')
router.post('/getMailCode',userController.getMailCode)
router.post('/reg', userController.reg)
router.post('/login', userController.login)
router.post('/getUser',userController.getUser)
router.post('/getUserId',userController.getUserId)
router.post('/getUserByKw',userController.getUserByKw)
module.exports = router