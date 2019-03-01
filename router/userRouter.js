const express = require('express');
const router = express.Router();
const userModel = require('../db/model/userModel.js')
const utils = require('../util/util.js')
const mail = require('../module/mail.js')
router.post('/getMailCode', (req, res) => {
    let code = yzm();
    let email = req.body.email;
    mail.send(email, code)
    .then((data)=>{
        utils.sendRes(res,0,'验证码ok',null)

    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,'验证码失败',null)
    })
    function yzm() {
        let codeArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let length = 6;
        let code = "";
        for (let i = 0; i < length; i++) {
            let randomI = Math.floor(Math.random() * 10);
            code += codeArr[randomI];
        }
        return code
    }
})

router.post('/reg', (req, res) => {
    let {
        name,
        pass,
        code
    } = req.body;
    if (yzm===code) {
        userModel.insertMany({
            name: name,
            pass: pass
        })
        .then((data) => {
            utils.sendRes(res, 0, '注册成功', null)
        })
        .catch((err) => {
            utils.log(err);
            utils.sendRes(res, -1, "注册失败", null)
        })
    }else{
        utils.sendRes(res, -1, "验证码错误", null)
    }
})

module.exports = router