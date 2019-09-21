import express from 'express'
import local from './config'
import graphHTTP from 'express-graphql'
import { GraphQLServer } from 'graphql-yoga'
import connectDB , {models} from './model/common'
import schema from './graphql/schema'
import cors from 'cors'
var createError = require('http-errors');
//var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors())
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

const server = new GraphQLServer({schema });
server.start({port: 2222,endpoint:'/graphql'},() => console.log(`Server is running on 2222/file`));

// app.use('/graphql', graphHTTP({
//   schema,
//   graphiql:true
// }))

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
  console.log('-----db connected succcessfully------')
// app.listen(1111,()=>console.log('server is running in 1111'))
})
module.exports = app;
