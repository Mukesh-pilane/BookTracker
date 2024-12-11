var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');

var indexRouter = require('./src/index');
const swagger = require('./utils/swagger');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger.swaggerSpec)); // Swagger _setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler // this is built-in error handling middleware of express
app.use(function(err, req, res, next) {
  // Set the response status
  res.status(err.status || 500);
  console.log(err.message)
  // Send the error message as a JSON response
  res.json({
    status: 'error',
    message: err.message || 'An error occurred',
    // Optionally, include the error stack in development mode
    ...(req.app.get('env') === 'development' && { stack: err.stack })
  });
});

module.exports = app;
