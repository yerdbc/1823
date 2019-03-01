const config = require('../config.js')
const jsonwebtoken = require('../module/jwt.js')
let utils = {
    log:function(msg) {
        if(!config.debug){return false}
        console.log(msg);
    },
    sendRes:function(res,err,msg,data) {
        let obj = {
            err:err,
            msg:msg,
            data:data||null
        }
        res.send(obj)
    },
    verify:function(req,res,next){
        // 验证token合法 以及token是否超过有效期
        let {token}=req.body
        if(!token){res.send({err:"-998",msg:'token 缺失'}) }
        jsonwebtoken.checkToken(token)
        .then((data)=>{
            let loginTime = config.loginTime*60*1000
            if(Date.now()-data.ctime>=loginTime){
                res.send({err:"-997",msg:'token 超时 请重新登录'})
            }else{
                next()
            }
        })
        .catch((err)=>{
            res.send({err:"-999",msg:'token 非法'})
        })
    }
}
module.exports=utils