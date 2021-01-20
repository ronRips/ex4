var express = require('express');
var router = express.Router();

let db = require("../models")
var emails = require("../for_use/emails")

let e = new emails();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', {success:""});
});

router.post('/', function(req, res, next) {
    const details = req.body;
    db.User.findAll({where:{email:details.email}})
        .then(content => {
            console.log(content.length, "empty");
            if(content.length == 0 ){
                res.render('login', {success:"there is no such an email"});
            }
            else if (content[0].dataValues.password != details.pswrd){
                res.render('login', {success:"it's incorrect password"});
            }
            else {
                let id = content[0].dataValues.id;
                res.render('weather', {id:id});
            }
        });



    /*if (!e.is_exist(req.body.email)){
        res.render('login', {success:"there is no such an email"});
    }
    else if (!e.is_correct(req.body.email , req.body.pswrd)){
        res.render('login', {success:"it's incorrect password"});
    }
    else{
        res.render('login', {success:"the site is not ready already"});
    }*/

});
module.exports = router;