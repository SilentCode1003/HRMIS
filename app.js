var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var LoginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var employeemanagementRouter = require('./routes/employeemanagement');
var RecruitSelectRouter = require('./routes/RecruitSelect');
var perfomancemanagementRouter = require('./routes/perfomancemanagement');
var trainingdevRouter = require('./routes/trainingdev');
var payrollbenefitRouter = require('./routes/payrollbenefit');
var timenattRouter = require('./routes/timenatt');
var reportnanalRouter = require('./routes/reportnanal');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', LoginRouter);
app.use('/users', usersRouter);
app.use('/employeemanagement',employeemanagementRouter);
app.use('/RecruitSelect',RecruitSelectRouter);
app.use('/perfomancemanagement',perfomancemanagementRouter);
app.use('/trainingdev',trainingdevRouter);
app.use('/payrollbenefit', payrollbenefitRouter);
app.use('/timenatt',timenattRouter);
app.use('/reportnanal', reportnanalRouter);

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

module.exports = app;
