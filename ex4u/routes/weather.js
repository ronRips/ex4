var express = require('express');
var router = express.Router();


let db = require("../models")
const url = require('url');

router.get('/', function(req, res, next){

});

router.post('/', function(req, res, next) {
    console.log("add db" ,req.body);
    db.User.create()


});



module.exports = router;
