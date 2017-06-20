var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var account = require('./routes/account');
var company = require('./routes/company');
var order = require('./routes/order');
var quote = require('./routes/quote');
// var report = require('./routes/report');
// var systemreport = require('./routes/systemreport');
// var salesreport = require('./routes/salesreport');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));


app.use('/account', account);
app.use('/company', company);
app.use('/order', order);
app.use('/quote', quote);
// app.use('/report', report);
// app.use('/systemreport', systemreport);
// app.use('/salesreport', salesreport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
