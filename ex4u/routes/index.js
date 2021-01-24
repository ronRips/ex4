var express = require('express');
var router = express.Router();

const db = require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user_id){
    res.redirect("../weather");
  }
  else{
    res.render('index', { comment:"" });
  }
});

module.exports = router;
