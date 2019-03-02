const userModel = require('../model/userModel.js')
const utils = require('../../util/util.js')
const mail = require('../../module/mail.js')
const jsonwebToken = require('../../module/jwt.js')
const path = require('path')
const fs = require('fs');
let getMailCode = (req, res) => {
    let code = yzm();
    let email = req.body.email;
    mail.send(email, code)
        .then((data) => {
            let timestamp = new Date().getTime();
            let obj = [{
                email: email,
                code: code,
                timestamp: timestamp
            }]
            fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(obj), function (err) {
                if (err) {
                    throw err
                }
            })
            utils.sendRes(res, 0, '验证码ok', null)
        })
        .catch((err) => {
            utils.log(err)
            utils.sendRes(res, -1, '验证码失败', null)
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
}
let reg = (req, res) => {
    let timestamp = new Date().getTime();
    let time = 5;
    let {
        email,
        pass,
        code
    } = req.body;
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', function (err, data) {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data);
            for (let key in data) {
                if (data[key].email === email) {
                    if (timestamp - data[key].timestamp >= time * 60 * 1000) {
                        res.send({
                            err: -1,
                            msg: '超时'
                        })
                    } else if (data[key].code === code) {
                        userModel.insertMany({
                                name: email,
                                pass: pass
                            })
                            .then((data) => {
                                utils.sendRes(res, 0, '注册成功', null)
                            })
                            .catch((err) => {
                                utils.log(err);
                                utils.sendRes(res, -1, "注册失败", null)
                            })
                    } else {
                        res.send({
                            err: -1,
                            msg: '验证码错误'
                        })
                    }
                } else {
                    console.log(data[key].email, email)
                    res.send({
                        err: -1,
                        msg: '500'
                    })
                }
            }
        }
    })
}
let login = (req, res) => {
    let {
        name,
        pass
    } = req.body;
    userModel.find({
            name
        })
        .then((data) => {
            if (!(data.toString(String))) {
                utils.sendRes(res, -1, '查无此人', null)
            } else {
                if (pass == data[0].pass) {
                    let token = jsonwebToken.creatToken({
                        id: data[0]._id
                    })
                    userModel.update({
                        "name": name
                    }, {
                        "token": token
                    })
                    utils.sendRes(res, 0, '登陆成功', {
                        token
                    })
                } else {
                    utils.sendRes(res, -1, '密码错误', null)
                }
            }
        })
        .catch((err) => {
            utils.log(err);
            utils.sendRes(res, -22, '错误', null)
        })
}
let getUser = (req, res) => {
    userModel.find()
        .then((data) => {
            utils.log(data);
            utils.sendRes(res, 0, "ok", null)
        })
        .catch((err) => {
            utils.log(err)
            utils.sendRes(res, -1, err._message, null)
        })
}
let getUserId = (req, res) => {
    let {
        _id
    } = req.body;
    userModel.findById({
            _id
        })
        .then((data) => {
            utils.log(data);
            utils.sendRes(res, 0, "ok", null)
        })
        .catch((err) => {
            utils.log(err)
            utils.sendRes(res, -1, err._message, null)
        })
}
module.exports = {
    getMailCode,
    reg,
    login,
    getUser,
    getUserId
}