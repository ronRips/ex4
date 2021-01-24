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
    const details = req.body;
    db.User.findAll({where:{email:details.mail}})
        .then(content => {
        if(content.length > 0 ){
            res.render('index', {comment:"email already exist"});
        }
        else{
            let information = {mail:details.mail , fname:details.fname ,lname:details.lname}
            req.session.details = information;

            res.redirect("http://localhost:3000/register/password");
        }
        });

});
router.get('/password', function(req, res, next){
    var cookies = new Cookies(req, res, { keys: keys })
    cookies.set('expire', new Date().toISOString(),
        { signed: true, maxAge:60*1000 })
    res.render('password');
});


router.post('/password', function (req,res,next){
    var cookies = new Cookies(req, res, { keys: keys });
    var expire = cookies.get('expire', { signed: true });
    if (expire){
        db.User.create({firstName: req.session.details.fname,
            lastName: req.session.details.lname,
            email: req.session.details.mail,
            password: req.body.fpasswrd});
        req.session.commentlog ="you registered successfully";
        res.redirect('../login');
    }
    else{
        res.redirect('../');
    }

});

module.exports = router;
