const express = require('express');
const router = express.Router();
const administratorController = require('../db/controller/administrator.controller.js')
router.post('/login', administratorController.login)
router.post('/getUser',administratorController.getUser)
router.post('/getUserId',administratorController.getUserId)
router.post('/addUser',administratorController.addUser)
router.post('/getUserByKw',administratorController.getUserByKw)
module.exports = router