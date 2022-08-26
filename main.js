var http=require('http');
var fs = require('fs');

var timeLast = 0;

function getLoginPage(req, res){
	res.header({"Content-Type": "text/html"});
	fs.readFile('./bili.html', 'utf-8', function(err, data){
		res.send(data);
	})
}

//主要用来获取图像url
function getSelf1(req, resp){
	var uid = req.query.uid;
	var url = "http://api.bilibili.com/x/space/acc/info?mid=" + uid;
	var html = '';
	http.get(url, function(req, res){
		req.on('data', function(data){
			html += data;
		})
		req.on('end', function(){
			resp.send(html);
		})
	})
}

//主要用于获取关注数量
function getSelf2(req, resp){
	var uid = req.query.uid;
	var url = "http://api.bilibili.com/x/relation/stat?vmid=" + uid;
	var html = '';
	http.get(url, function(req, res){
		req.on('data', function(data){
			html += data;
		})
		req.on('end', function(){
			resp.send(html);
		})
	})
	console.log(html);
}

//http://localhost:8081/search?uid=11073
function getFollow(req, resp){
	var uid = req.query.uid;
	var pn = req.query.pn;
	var ps = req.query.ps;
	var order = req.query.order;
	var url = "http://api.bilibili.com/x/relation/followings?vmid=" + uid + "&pn=" + pn + "&ps=" + ps + "&order=" + order;
	if(order == 'asc'){
		url += "&order_type=attention";
	}
	var html = '';
	//var timeNow = Date.now();
	//if(timeNow - timeLast <= 5000){
	//	console.log('频繁查询');
	//	sleep(5000 - (timeNow - timeLast));
	//}
	//timeLast = timeNow;
	//sleep(3000);
	http.get(url, function(req, res){
		req.on('data', function(data){
			html += data;
		})
		req.on('end', function(){
			resp.send(html);
		})
	})
}

//localhost:8081/getImage?address=e0cc906bb531195e9ee9f3b575effdd2b056eaea
function getImage(req, resp){
	var address = req.query.address;
	var url = "http://i1.hdslb.com/bfs/face/" + address + ".jpg@48w_48h_100Q_1c.webp";
	var imageData = [];
	resp.set('Content-Type', 'image/jpeg');
	http.get(url, function(req, res){
		req.on('data', function(data){
			imageData.push(Buffer.from(data));
		})
		req.on('end', function(){
			var finalData = Buffer.concat(imageData);
			resp.write(finalData);
			resp.end();
		})
	})
}

//延时
function sleep(delay) {
    var start = (new Date()).getTime();
    while((new Date()).getTime() - start < delay) {
        continue;
    }
}


module.exports = {
	getLoginPage,
	getSelf1,
	getSelf2,
	getFollow,
	getImage
}

////get 
// http.get('https://app.bilibili.com/x/v2/space/likearc?pn=1&ps=10&vmid=11073',function(req,res){
// 	var html='';
// 	req.on('data',function(data){
// 		html+=data;
// 	});
// 	req.on('end',function(){
// 		console.info(html);
// 	});
// });