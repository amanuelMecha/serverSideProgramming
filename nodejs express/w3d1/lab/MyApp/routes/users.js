var express = require('express');
var router = express.Router();

// /users
router.get('/', function(req, res, next) {
  res.write('respond with a resource');
  res.send('wierd example');
  res.end();
});

// /users/students
router.get('/students', function(req, res, next) {
  res.send('Nobody believes');
});

// /users/courses

// router.get('/courses',function(req,res,next){
//     res.end('courses');
// });

module.exports = router;
