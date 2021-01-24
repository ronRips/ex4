var express = require('express');
var router = express.Router();


let db = require("../models")
const url = require('url');

router.get('/', function(req, res, next) {
    if(req.session.user_id){
        res.render('weather');
    }
    else{
        res.redirect("../");
    }
});


router.post('/get', function (req, res, next) {
    const user_id = req.session.user_id;

    db.Place.findAll({
        where: {
            user_id: user_id,
        }
    }).then(accept => {
        let places = [];
        for (let i = 0; i < accept.length; i++) {
            let city = {
                city: accept[i].dataValues.location,
                lon: accept[i].dataValues.lon,
                lat: accept[i].dataValues.lat
            };
            places.push(city);
        }
        //console.log(places);
        res.send(places);
    });
});

router.post('/add', function (req, res, next) {
    const {location, lat, lon} = req.body;
    const user_id = req.session.user_id;
    db.Place.create({user_id, location, lat, lon});
    res.end();
});

router.post('/remove', function (req, res, next) {
    const user_id = req.session.user_id;
    const location = req.body.location;

    return db.Place.destroy({
        where: {
                user_id: user_id,
                location: location
            }
    }).then((place) =>{
        res.status(200).send("success");
    })
        .catch((err) =>{
            res.status(600).send("not success");
        });

});


module.exports = router;
