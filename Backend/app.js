var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var locationRouter = require('./routes/LocationRouter');
var weatherRouter = require('./routes/WeatherRouter');

var app = express();

app.use(cors({ origin: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/location', locationRouter);
app.use('/weather', weatherRouter);

module.exports = app;
