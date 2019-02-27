const config = require('../config.js')
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
    }
}
module.exports=utils