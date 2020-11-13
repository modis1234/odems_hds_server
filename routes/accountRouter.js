var express = require('express');
var router = express.Router();
var request = require('request');

var servers = require('./config/servers');

// 수신자 조회
router.get('/receiver', function(req, res, next){
    var geturl = servers.apisvr.url + '/api/hds/account/receiver/search';
  
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

// 수신자 등록
/*
    @body name
    @body tel
    @body siteId
*/
router.post('/receiver', function(req, res, next){
    var posturl = servers.apisvr.url + '/api/hds/account/receiver';

    var reqBody = req.body;
    reqBody['siteId'] = 1;

    request.post({
        url:posturl,
        body:{
            name: reqBody.name,
            tel: reqBody.tel,
            siteId: reqBody.siteId
        },
        json:true},
    function(error, _res, _body){
        if(!error){
            console.log(_body);
            var insertId =_body.insertId;
            if(insertId){
                reqBody["id"] = insertId;
                res.send(reqBody);
            } else {
                res.status(500).end();
            }

        }else{
            res.status(404).end();
        }
    });
});

// 수신자 수정
/*
    @param id
    @body name
    @body tel
*/
router.put('/receiver/:id', function(req, res, next){
    var _id = req.params.id;
    var reqBody = req.body;
    var puturl  = servers.apisvr.url + '/api/hds/account/receiver/'+_id;
    request.put({
        url: puturl,
        body: {
            name: reqBody.name,
            tel: reqBody.tel
        },
        json:true
    }, function(error, _res, _body) {
        if(!error){
            console.log(_body.changedRows);
            var changedRows = _body.changedRows;
            if(changedRows === 1){
                res.send(reqBody);
            }else {
                res.status(500).end();
            }
        }else {
            res.status(404).end();
        }
    });
});

// 수신자 삭제
/*
    @param id
*/
router.delete('/receiver/:id', function(req, res, next){
    var _id = req.params.id;
    var deleteurl  = servers.apisvr.url + '/api/hds/account/'+_id;
    console.log(deleteurl)
    request.delete({
        url: deleteurl,
        body: {},
        json:true
    }, function(error, _res, _body) {
        if(!error){
            var _affectedRows = _body.affectedRows;
            console.log(_body);
            if(_affectedRows == 1){
                res.send(_id);
            } else {
                res.end();
            }

        }else {
            res.status(404).end();
        }
    });
});


module.exports = router;
