var express = require('express');
var router = express.Router();
var request = require('request');

var servers = require('./config/servers');

//페이지 렌더링
router.get('/', function(req, res, next) {
    res.render('company.html');
});

//조회
router.get('/companies', function(req, res, next) {
    var geturl = servers.apisvr.url + '/api/company';
  
    request.get({
            url:geturl,
            json:true
        }, function(error, _res, body){
        if(!error){
            var _companies = _res.body;
            res.json(_companies);
        }else {
            res.send(error);
        }
    });

});

//입력
/*
    @body companyName

*/
router.post('/companies', function(req, res, next){
    var posturl = servers.apisvr.url + '/api/company';
    var reqBody = req.body;
    console.log(reqBody);
    request.post({
        url:posturl,
        body:{
            companyName: reqBody.companyName
        },
        json:true},
    function(error, _res, _body){
        if(!error){
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
  @body companyName
*/
router.put('/companies/:id', function(req, res, next){
    var _id = req.params.id;
    var reqBody = req.body;
    var puturl  = servers.apisvr.url + '/api/company/'+_id;

    request.put({
        url: puturl,
        body: {
            companyName: reqBody.companyName
        },
        json:true
    }, function(error, _res, _body) {
        if(!error){
            res.send(_body);
        }else {
            res.status(404).end();
        }
    });

});

//삭제
router.delete('/companies/:id', function(req, res, next) {
    var _id = req.params.id;
    var deleteurl = servers.apisvr.url + '/api/company/'+_id;

    request.delete({
        url: deleteurl,
        body: {},
        json: true
    }, function(error, _res,_body) {
        if(!error) {
            res.json(_body);
        }else {
            res.status(404).end();
        }
    });
});

//중복체크
/*
    @body companyName
*/
router.post('/companies/checked', function(req, res, next) {
    var _reqBody = req.body;
    var checkedUrl = servers.apisvr.url + '/api/company/checked';

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
