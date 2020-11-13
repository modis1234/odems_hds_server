var express = require('express');
var router = express.Router();
var request = require('request');

var servers = require('./config/servers');

//조회
router.get('/managers', function(req, res, next) {
    var geturl = servers.apisvr.url + '/api/hds/manager';
  
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
    @body level 0:정 1:부
    @body name
    @body tel   ex> '01012345678'
    @body ups_id
*/
router.post('/managers', function(req, res, next){
    var posturl = servers.apisvr.url + '/api/hds/manager';
    var reqBody = req.body;
    
    request.post({
        url:posturl,
        body:{
            level: reqBody.level,
            name: reqBody.name,
            tel: reqBody.tel,
            upsId: reqBody.upsId,
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
    @body level 0:정 1:부
    @body name
    @body tel   ex> '010-1234-5678'
    @body upsId 
*/
router.put('/managers/:id', function(req, res, next){
    var _id = req.params.id;
    var reqBody = req.body;
    var puturl  = servers.apisvr.url + '/api/hds/manager/'+_id;
    console.log('reqBody->', reqBody);
    request.put({
        url: puturl,
        body: {
            level: reqBody.level,
            name: reqBody.name,
            tel: reqBody.tel,
            upsId: reqBody.upsId,
        },
        json:true
    }, function(error, _res, _body) {
        if(!error){
            console.log(_body.changedRows);
            var changedRows = _body.changedRows;
            if(changedRows === 1){
                res.send(reqBody);
            }else {
                res.status(404).end();
            }
        }else {
            res.status(404).end();
        }
    });

});

//삭제
/*
    @param id
*/
router.delete('/managers/:id', function(req, res, next) {
    var _id = req.params.id;
    var deleteurl = servers.apisvr.url + '/api/hds/manager/'+_id;

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


module.exports = router;
