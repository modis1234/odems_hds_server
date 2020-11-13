var express = require('express');
var router = express.Router();
var request = require('request');

var servers = require('./config/servers');

//조회
router.get('/sites', function(req, res, next) {
    var geturl = servers.apisvr.url + '/api/site';
  
    request.get({
            url:geturl,
            json:true
        }, function(error, _res, body){
        if(!error){
            var _sites = _res.body;
            res.json(_sites);
        }else {
            res.send(error);
        }
    });

});

//입력
/*
    @body siteName
    @body companyId
    @body siteUrl
*/
router.post('/sites', function(req, res, next){
    var posturl = servers.apisvr.url + '/api/site';
    var reqBody = req.body;
    
    request.post({
        url:posturl,
        body:{
            siteName: reqBody.siteName,
            companyId: reqBody.companyId,
            siteUrl: reqBody.siteUrl
        },
        json:true},
    function(error, _res, _body){
        if(!error){
            console.log(_body);
            reqBody["id"]=_body.insertId;
            res.send(reqBody);
        }else{
            res.status(404).end();
        }
    });
});

//수정
/*
  @param id
  @body siteName
  @body companyId
  @body siteUrl
*/
router.put('/sites/:id', function(req, res, next){
    var _id = req.params.id;
    var reqBody = req.body;
    var puturl  = servers.apisvr.url + '/api/site/'+_id;

    request.put({
        url: puturl,
        body: {
            siteName: reqBody.siteName,
            companyId: reqBody.companyId,
            siteUrl: reqBody.siteUrl
        },
        json:true
    }, function(error, _res, _body) {
        if(!error){
            res.send(reqBody);
        }else {
            res.status(404).end();
        }
    });

});

//삭제
router.delete('/sites/:id', function(req, res, next) {
    var _id = req.params.id;
    var deleteurl = servers.apisvr.url + '/api/site/'+_id;

    request.delete({
        url: deleteurl,
        body: {},
        json: true
    }, function(error, _res,_body) {
        if(!error) {
            res.send("delete success!!!");
        }else {
            res.status(404).end();
        }
    });
});

//중복체크
/*
    @body siteName
*/
router.post('/sites/checked', function(req, res, next) {
    var _reqBody = req.body;
    var checkedUrl = servers.apisvr.url + '/api/site/checked';

    request.post({
        url: checkedUrl,
        body: _reqBody,
        json: true
    }, function(error, _res, _body) {
        if(!error) {
            console.log(_body[0].count);
            var resObj = {};
           if(_body[0].count > 0){
               resObj.auth = false;
           } else {
               resObj.auth = true;
           }
           res.json(resObj);
        }else {
            res.status(404).end();
        }
    });
});

module.exports = router;
