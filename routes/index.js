var express = require('express');
var fs = require('fs');
var querystring = require('querystring');

var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('music', {title: 'Express'});
});

router.get('/json', function (request, response, next) {
    fs.readFile('/home/projects/music-online/public/json/music.json', function (err, data) {
        if (err) {
            console.log(err);
            response.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data.toString());
        }
        response.end();
    });
});

router.get('/set', function (req, res, next) {
    var body = "";
    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {
        body = JSON.stringify(querystring.parse(body));
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        fs.writeFile('/home/projects/music-online/public/json/music.json', body, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("数据写入成功！");
            fs.readFile('/home/projects/music-online/public/json/music.json', function (err, data) {
                if (err) {
                    return console.error(err);
                }
                console.log("文件数据: " + data.toString());
            });
        });
        res.end();
    });

});

module.exports = router;
