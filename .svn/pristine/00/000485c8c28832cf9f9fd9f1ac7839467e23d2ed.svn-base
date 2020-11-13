var express = require('express');
var router = express.Router();
var request = require('request');

var servers = require('./config/servers');

//현장에 등록 된 장비 리스트
router.get('/devices', function(req, res, next){
    var siteurl = servers.apisvr.url +'/api/network/site/1';
    request.get({
        url:siteurl,
        json: true
    }, function(error, _res, body){
        if(!error){
            var _deviceList = _res.body;
            res.json(_deviceList);
        }else {
            res.send(error);
        }
    });   
});
module.exports = router;
