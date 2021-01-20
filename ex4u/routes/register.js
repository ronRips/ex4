var express = require('express');
var router = express.Router();
var Cookies = require('cookies');

var keys = ['keyboard cat'];

/*var emails = require('../for_use/emails');
let e = new emails();*/
let db = require("../models")
const url = require('url');

router.get('/', function(req, res, next){
    res.render('index', {comment:""});
});

router.post('/', function(req, res, next) {
    var cookies = new Cookies(req, res, { keys: keys })
    const details = req.body;
    db.User.findAll({where:{email:details.mail}})
        .then(content => {console.log(content.length, "empty");
        if(content.length > 0 ){
            res.render('index', {comment:"email already exist"});
        }
        else{
            cookies.set('expire', new Date().toISOString(),
                { signed: true, maxAge:60*1000 })
            res.render('password', {mail:details.mail , fname:details.fname ,lname:details.lname});
        }
        });



});


router.post('/password', function (req,res,next){
    var cookies = new Cookies(req, res, { keys: keys })
    //e.add(req.body.fname, req.body.lname, req.body.email, req.body.fpasswrd);
    var expire = cookies.get('expire', { signed: true });
    if (expire){
        db.User.create({firstName: req.body.fname,
            lastName: req.body.lname,
            email: req.body.email,
            password: req.body.fpasswrd});
        res.render('login', {success:"you registered successfully"});
    }
    else{
        res.redirect('../');
    }

});

module.exports = router;
