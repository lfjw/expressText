var express = require('express');

var app = express();

var res = require('./router/res.js')
//路由解析
app.get('/res',res)

app.listen(3001);


