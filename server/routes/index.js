var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.app.get('config'))
  res.json(req.app.get('config'))
});

module.exports = router;
