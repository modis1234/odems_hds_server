var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var  http=require('http');
var session = require('express-session');
var MySQLStore = require('express-mysql-session');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accountRouter = require('./routes/accountRouter');
var managerRouter = require('./routes/managerRouter');
var networkRouter = require('./routes/networkRouter');
var deviceRouter = require('./routes/deviceRouter');
var companyRouter = require('./routes/companyRouter');
var siteRouter = require('./routes/siteRouter');
var upsRouter = require('./routes/upsRouter');




var app = express();

var options = {
  host: '119.207.78.144',
  port: '13336',
  user: 'open_m',
  password:'*man(2019)',
  database:'odms',
}

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: "asdfasdfdas",
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/account',accountRouter);
app.use('/manager',managerRouter);
app.use('/users', usersRouter);
app.use('/network', networkRouter);
app.use('/device', deviceRouter);
app.use('/company', companyRouter);
app.use('/site', siteRouter);
app.use('/ups', upsRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// var server = http.createServer(app)
// server.listen(9092, function () {
//   console.log('서버 실행 9092포트로 웹서버 실행!!');
// });


module.exports = app;
