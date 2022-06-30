var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/matt', function (req, res, next) {
  console.log("Hiya!")
  res.render('matt', {name: 'Matt'})
})



module.exports = router;
