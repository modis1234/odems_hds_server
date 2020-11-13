var express = require('express');
var router = express.Router();
var servers = require('./config/servers');
var request = require('request');


/* req.session
    req.session.userId;
    req.session.password;
    req.session.isLogined;
*/
var _id;
var _isLogined = false;
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session.isLogined);
     _isLogined = req.session.isLogined;
    if( _isLogined ) {
      console.log(">>>",req.session);
      res.render('main.html',{_isLogined:"true"});
    } else {
        res.render('login.html',{msg:"", id:_id});
        _id="";
    }
  
});

router.get('/login', function(req, res, next) {
   res.render('login.html',{msg:"", id:_id});
});


router.get('/header', function(req, res, next) {
   var _role = req.session.role; 
   res.render('common/header.html',{role:_role});
});

router.get('/adheader', function(req, res, next) {
  var _role = req.session.role; 
  res.render('common/adHeader.html');
});

router.get('/popup', function(req, res, next) {
  res.render('common/fullScreenPop.html');
});

router.get('/monitor', function(req, res, next) {
  res.render('monitor/monitor.html');
});

router.get('/admin', function(req, res, next) {
  res.render('admin/administrator.html');
});

// admin 페이지
router.get('/manager', function(req, res, next) {
  res.render('admin/manager.html');
});
router.get('/receiver', function(req, res, next) {
  res.render('admin/receiver.html');
});
router.get('/neterr', function(req, res, next) {
  res.render('admin/netError.html');
});
router.get('/upserr', function(req, res, next) {
  res.render('admin/upsError.html');
});

router.get('/searchForm', function(req, res, next) {
  res.render('admin/searchForm.html');
});



// 개발 페이지
router.get('/ups', function(req, res, next) {
  res.render('ups.html');
});

router.get('/map', function(req, res, next) {
  res.render('map.html');
});

router.get('/network', function(req, res, next) {
  res.render('network.html');
});

// router.get('/dashboard', function(req, res, next) {
//   res.render('monitor/dashboard.html');
// })

// 로그인
router.post('/login', function(req, res, next){
  console.log(req.session.isLogined);
  if(_isLogined){
      res.redirect('/');
  } else {
    var loginURL = servers.apisvr.url + '/api/hds/account/login';
    var reqBody = req.body;
    request.post({
        url:loginURL,
        body:{
            userId: reqBody.userId,
            password: reqBody.password
        },
        json:true}, function(error, _res, _body){
        if(!error){
            var success = _body.success;
            if(success){
                var user = _body.user[0];
                req.session.userId = user.user_id;
                req.session.password = user.password;
                req.session.role = user.role;
                req.session.isLogined = true;
                req.session.save(function(){
                    console.log(req.session)
                    res.redirect('/');
                });
            } else {
                var msg = _body.msg;
                _id = reqBody.userId;
                res.render('login.html',{msg:_body.msg, id:_id});
                
            }
        }else{
            res.state(404).end();
        }
    });
  }


});

//로그아웃
router.get('/logout', function(req, res, next){
    
      console.log("before-> ",req.session);
      delete req.session.user_id;
      delete req.session.password;
      delete req.session.role;
      delete req.session.isLogined;

      req.session.save(function(){
          console.log("after-->",req.session);
          res.redirect('/');
      });

});



module.exports = router;
