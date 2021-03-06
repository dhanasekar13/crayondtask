import express from 'express'
import local from './config'
import connectDB , {models} from './model/common'

var createError = require('http-errors');
//var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('config', local); 
app.use(logger('dev'));
global.config = local;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../client/build')));

app.use(['/api','/API'], indexRouter);
app.use('*',function(req,res){
  res.sendFile(path.join(__dirname+'/../client/build/index.html'));
})
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
connectDB().then(async() => {
app.listen(1111,()=>console.log('server is running in 1111'))
})
module.exports = app;
