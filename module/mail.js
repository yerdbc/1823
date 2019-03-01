const config = require('../config.js');
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: config.email_host,
    port: config.email_port,
    secure: true,
    auth: {
        user: config.email_user, // 发送方邮箱
        pass: config.email_pass //  发送发邮箱的安全密码  pop3 smtp 生成的授权码
    }
});

function send(toMail, msg) {
    return new Promise((reslove, reject) => {
        //发送的信息
        let mailOptions = {
            from: `"Fred Foo 👻" <${config.email_user}>`, // sender address
            to: toMail, // list of receivers
            subject: "1823注册验证码", // Subject line
            text: `欢迎注册，你的验证码是${msg};5分钟有效`, // plain text body
            // html: "<h1>Hello world?</h1>" // html body
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject()
            } else {
                reslove()
            }
        })
    })
}

module.exports = {
    send
}