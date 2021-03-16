var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const authMiddleware = require('./middlewares/authrorization');
const studentRouter = require('./routes/students');
const booksROuter = require('./routes/books');
const authorRouter = require('./routes/authors');
const libraryRouter = require('./routes/libary');
const signupRouter = require('./routes/signup')
var app = express();

require('dotenv').config();
//process.env.name
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.enable('case sensitive routing');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const client = new MongoClient('mongodb+srv://aman:12345@cluster0.lubd1.mongodb.net', { useUnifiedTopology: true })
let connection;

app.use('/', function (req, res, next) {
  if (!connection) {
    console.log('connecting to mongoDB')
    client.connect(function (err) {
      // connections = client.db('lab6');
      connection = client.db('labraries');
      req.db = connection
      next()
    })
  } else {
    req.db = connection;
    next()
  }

})

//signUp

//to check the header part
app.use(authMiddleware.authenticate);





app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/authentication', authRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/books', booksROuter);
app.use('/api/v1/authors', authorRouter);
app.use('/api/v1/library', libraryRouter);
app.use('/api/v1/signup', signupRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;

app.listen(6000)
//{ $and: [{ Fname: { $eq: req.body.Fname } }, { email: { $eq: req.body.email } }] }