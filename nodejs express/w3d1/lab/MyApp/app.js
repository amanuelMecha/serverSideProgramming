var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const MongoClient = require('mongodb').MongoClient;


const client = new MongoClient('mongodb+srv://umur:cs477@cluster0.p9abm.mongodb.net?retryWrites=true&w=majority', { useUnifiedTopology: true });
let connection;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const lecturesRouter = require('./routes/lectures');
var authRouter = require('./routes/auth');

const fs = require('fs');
const { ObjectID } = require('mongodb');

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



app.use('/', (req, res, next) => {
  if (!connection) { // connect to database
    console.log('connecting');
    client.connect(function (err) {
      connection = client.db('lab6');
      req.db = connection;
      next();
    })
  } else { // 
    req.db = connection;
    next();
  }
});

app.use(authMiddleware.authenticate);


app.use('/auth', authRouter); 
app.use('/lectures', lecturesRouter);


// Rest

// 1. display all the documents in the collection restaurants
app.get('/restaurants',  (req, res) => {
  req.db.collection('restaurants').find().project({'address.building' : 0}).toArray(function (err, doc) {
    res.json(doc);
  });
});

// 2. Write a MongoDB query to display the fields 
//`restaurant_id`, `name`, `district` and `cuisine` for all the documents in the collection restaurant.
//:
app.get('/restaurants/:filter',  (req, res) => {
  req.db.collection('restaurants')
  .find()
  .project({ restaurant_id: 1, name: 1, district: 1, cuisine: 1 })
  .toArray(function (err, doc) {
    res.json(doc);
  });
});

// 3. Write a MongoDB query to display the fields `restaurant_id`, `name`, `district` and `cuisine`, but exclude the field `_id` for all the documents in the collection restaurant. 
app.get('/restaurants/filter2',  (req, res) => {
  req.db.collection('restaurants')
  .find()
  .project({ _id: 0, restaurant_id: 1, name: 1, district: 1, cuisine: 1 }).toArray(function (err, doc) {
    res.json(doc);
  });

});

// 4. Write a MongoDB query to display all the restaurant which is in the `district` `"Bronx"`.

app.get('/4',  (req, res) => {
  req.db.collection('restaurants').find({ district: 'Bronx' }).toArray(function (err, doc) {
    res.json(doc);
  });
});

// 5. Write a MongoDB query to display the first 5 restaurant which is in the `district` `"Bronx"`. 

app.get('/5',  (req, res) => {
  req.db.collection('restaurants').find({ district: 'Bronx' }).limit(5).toArray(function (err, doc) {
    res.json(doc);
  });
});



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

app.listen(3000, function () {

});


  //   res.write('<html>');
  //   res.write('<body>');
  //   res.write('<form action="/message" method="POST">');
  //   res.write('<input name="message" />');
  //   res.write('<button type="submit"> Send to the Server </button>');
  //   res.write('<form>');
  //   res.write('</body>');
  //   res.write('</html>');
  //   res.end();
  // });

  // app.post('/message', (req, res) => {
  //   console.log(req.body);
  //   res.redirect('/');
  // });
