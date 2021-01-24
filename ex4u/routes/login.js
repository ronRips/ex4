var express = require('express');
var router = express.Router();

let db = require("../models");

/* GET login page. */
router.get('/', function(req, res, next) {
    let comment ="";
    if (req.session.commentlog){
        comment = req.session.commentlog;
    }
    req.session.commentlog = "";
    res.render('login', {success:comment});
});

router.post('/', function(req, res, next) {
    const details = req.body;
    db.User.findAll({where:{email:details.email}})
        .then(content => {
            //console.log(content.length, "empty");
            if(content.length == 0 ){
                res.render('login', {success:"there is no such an email"});
            }
            else if (content[0].dataValues.password != details.pswrd){
                res.render('login', {success:"it's incorrect password"});
            }
            else {
                let id = content[0].dataValues.id;
                req.session.user_id = id;
                res.redirect("../weather");
            }
        });

});
module.exports = router;