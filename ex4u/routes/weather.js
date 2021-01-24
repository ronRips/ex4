var express = require('express');
var router = express.Router();


let db = require("../models")
const url = require('url');

router.post('/get', function (req, res, next) {
    const user_id = req.body.user_id;

    console.log("get db", req.body);
    console.log(user_id);
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
        console.log(places);
        res.send(places);
    });
});

/*
router.get('/get', function (req, res, next) {
    console.log("what");
    const user_id = req.body.user_id;
    /!*db.Place.findAll({
        where: {
            user_id: user_id,
        }
    }).then(places => {
        console.log(places)});*!/
    res.end();
});
*/

router.post('/add', function (req, res, next) {
    const {user_id, location, lat, lon} = req.body;

    console.log("add db", req.body);
    console.log({user_id, location, lat, lon});
    db.Place.create({user_id, location, lat, lon});
    res.end();
});

router.post('/remove', function (req, res, next) {
    const user_id = req.body.user_id;
    const location = req.body.location;

    console.log("remove db", req.body);

    return db.Place.destroy({
        where: {
                user_id: user_id,
                location: location
            }

    }).then((place) =>{
        console.log(place, "yaho");
        res.status(200).send("success");
    })
        .catch((err) =>{
            console.log(place);
            res.status(600).send("not success");
        });

});


module.exports = router;
