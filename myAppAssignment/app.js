var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const MongoClient = require('mongodb').MongoClient;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const authMiddleware = require('./middlewares/authrorization');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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
//to check the header part
app.use(authMiddleware.authenticate);

app.get('/books', function (req, res) {
  console.log(req.body.fname + ' ' + req.body.lname)
  const para = { 'first': req.body.fname, 'last': req.body.lname }
  req.db.collection('books').find().toArray()
    .then(data => {
      console.log('get')
      res.json({ Status: "Success", data: data })
    })
    .catch(err => {
      console.log(err)
      res.json({ status: "Error" })
    })
})
app.get('/authors', function (req, res) {
  console.log(req.body.fname + ' ' + req.body.lname)
  const para = { 'first': req.body.fname, 'last': req.body.lname }
  req.db.collection('Author').find().toArray()
    .then(data => {
      console.log('get')
      res.json({ Status: "Success", data: data })
    })
    .catch(err => {
      console.log(err)
      res.json({ status: "Error" })
    })
})
app.get('/students', function (req, res) {
  console.log(req.body.fname + ' ' + req.body.lname)
  const para = { 'first': req.body.fname, 'last': req.body.lname }
  req.db.collection('students').find().toArray()
    .then(data => {
      console.log('get')
      res.json({ Status: "Success", data: data })
    })
    .catch(err => {
      console.log(err)
      res.json({ status: "Error" })
    })
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authentication', authRouter);


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

app.listen(5000)
//{ $and: [{ Fname: { $eq: req.body.Fname } }, { email: { $eq: req.body.email } }] }