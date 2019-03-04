const administratorModel = require('../model/administratorModel.js')
const utils = require('../../util/util.js')
const jsonwebToken = require('../../module/jwt.js')
let login = (req, res) => {
    let {
        name,
        pass,
        usercode,
        code
    } = req.body;
    if (usercode.toLowerCase() === code.toLowerCase()) {
        administratorModel.find({
                name
            })
            .then((data) => {
                if (!(data.toString(String))) {
                    utils.sendRes(res, -1, '查无此人或密码错误', null)
                } else {
                    if (pass == data[0].pass) {
                        let token = jsonwebToken.creatToken({
                            id: data[0]._id
                        })
                        administratorModel.update({
                            "name": name
                        }, {
                            "token": token
                        })
                        utils.sendRes(res, 0, '登陆成功', {
                            token
                        })
                    } else {
                        utils.sendRes(res, -1, '查无此人或密码错误', null)
                    }
                }
            })
            .catch((err) => {
                utils.log(err);
                utils.sendRes(res, -22, '服务器错误', null)
            })
    } else {
        utils.sendRes(res, -2, '验证码不正确', null)
    }

}
let getUser = (req, res) => {
    administratorModel.find()
        .then((data) => {
            utils.log(data);
            utils.sendRes(res, 0, "ok", data)
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
    administratorModel.findById({
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
let addUser = (req, res) => {
    let {
        name,
        pass
    } = req.body
    administratorModel.insertMany({
            'name': name,
            'pass': pass
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

let updateUser = (req, res) => {
    let _id = req.body._id
    let {
        name,
        imgPath,
        desc,
        brand
    } = req.body
    administratorModel.updateOne({
            _id: _id
        }, {
            name,
            imgPath,
            desc,
            brand
        })
        .then((data) => {
            console.log(data)
            utils.sendRes(res, 0, 'update ok', null)
        })
        .catch((err) => {
            utils.log(err)
            utils.sendRes(res, -1, err._message, null)
        })
}

let delUser = (req, res) => {
    let _id = req.body._id
    administratorModel.remove({
            _id: _id
        })
        .then((data) => {
            utils.log(data)
            utils.sendRes(res, 0, 'del ok', null)
        })
        .catch((err) => {
            utils.log(err)
            utils.sendRes(res, -1, err._message, null)
        })
}
let getUserByKw = (req, res) => {
    let page = req.body.page || 1
    let pageSize = req.body.pageSize || 2
    let result = {
        count: 0,
        list: []
    }
    let {
        keyword
    } = req.body
    let reg = new RegExp(keyword)
    administratorModel.find({

            'qx': 1,
            'name': {
                $regex: reg
            }

        })
        .then((data) => {
            result.count = data.length;
            return administratorModel.find({
                'qx': 1,
                'name': {
                    $regex: reg
                }
            }).skip(Number((page - 1) * pageSize)).limit(Number(pageSize))
        })
        .then((data) => {
            result.lists = data
            utils.sendRes(res, 0, 'select ok', {
                data,
                result
            })
        })
        .catch((err) => {
            utils.log(err)
            utils.sendRes(res, -1, err._message, null)
        })
}
module.exports = {
    login,
    getUser,
    getUserId,
    addUser,
    getUserByKw,
    delUser,
    updateUser
}