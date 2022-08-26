var express = require('express');
var app = express();
var bili_main = require('./main');

app.all("/*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})

app.get('/bili', function(req, res){
	bili_main.getLoginPage(req, res);
	console.log("IP: " + getClientIP(req) + " 访问了本站");
	//console.log(JSON.stringify(req, stringifyCircularHandler));
})

app.get('/bili/getImage', function(req, res){
  bili_main.getImage(req, res);
})

app.get('/bili/searchSelf1', function(req, res){
	bili_main.getSelf1(req, res);
})

app.get('/bili/searchSelf2', function(req, res){
	bili_main.getSelf2(req, res);
})

//
app.get('/bili/searchFollow', function(req, res){
	bili_main.getFollow(req, res);
	console.log(getClientIP(req) + " 查询了：" + req.url);
})

function getClientIP(req) {
    return req["headers"]['x-iisnode-remote_addr'];
};

//解决对象中循环引用
/*let cache = []; 
function stringifyCircularHandler(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // Circular reference found, discard key
            return;
        }
        // Store value in our collection
        cache.push(value);
    }
    return value;
};*/

// app.listen(process.env.PORT);
app.listen(8081);
console.log("浏览器输入http://127.0.0.1:8081/bili");