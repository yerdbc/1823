const utils = require('../util/util.js')
const config = require('../config.js')
var mongoose = require('mongoose');
mongoose.connect(config.db, {
    useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', (err) => {
    utils.log('连接失败', err)
});
db.on('open', () => {
    utils.log('连接成功')
});