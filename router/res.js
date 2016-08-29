var express = require('express');

var mysql = require('mysql');

var router = express.Router();

var data = '';

var connection = mysql.createConnection({

    host: '127.0.0.1',

    user: 'root',

    password: '',

    database:'book'

});

connection.connect();

connection.query('select * from cate', function(err, rows, fields) {

    data = rows;

})  //cannot enqueue query after invoking quit 频繁的关闭


router.get("/res",function(req,res){            //空为false,不为空true
    console.log(req.url)
    var n = req.url.split("callback=")[1];

    var callbackName = n.split("?")[0];

    var c = n.split("?")[1];

    if(c){     //有参数执行这步

        var params = c.split("&"),arr,param = {};

        for(i in params){

            arr = params[i].split("=");

            param[arr[0]] = decodeURI(arr[1]);

        }

        data.forEach( function ( v ) {

            if( param.username == v.username ){  
                
                data = "error";
               
            }
        
        })

        connection.query('insert into cate (username,password,name,age,sex) values ("'+param.username+'","'+param.password+'","'+param.name+'","'+param.age+'","'+param.sex+'")') //数字不需要引号，但是文字必须用引号
               
        connection.query('select * from cate', function ( err, rows, fields ) {
        
            data = rows;   
        
        })
    
    }
    
    var jsonp = JSON.stringify(data);
    
    var jsonpTxt = ""+callbackName+"("+jsonp+")";
    
    res.end(jsonpTxt);

})

module.exports = router;