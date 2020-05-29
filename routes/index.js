var express = require('express');
var fs = require('fs');
var querystring = require('querystring');

var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('music', {title: 'Express'});
});

router.post('/json', function (request, response, next) {
    fs.readFile('/home/projects/music-online/public/json/music.json', function (err, data) {
        if (err) {
            // console.log(err);
            response.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data.toString());
        }
        response.end();
    });
});

router.post('/set', function (req, res, next) {

    var body = req.body;
    console.log("111111",body);
    //body = JSON.stringify(querystring.parse(body));
    // console.log("222222",body);
    fs.writeFile('/home/projects/music-online/public/json/music.json', body, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log("数据写入成功！");
            fs.readFile('/home/projects/music-online/public/json/music.json', function (err, data) {
                if (err) {
                    return console.error(err);
                }
                console.log("文件数据: " + data.toString());
            });
        }
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end();
});

module.exports = router;
