var express = require('express');
var router = express.Router();


let db = require("../models")
const url = require('url');

router.get('/', function (req, res, next) {

});

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

    db.Place.destroy({
        where: {
            [Op.or]: [
                {user_id: user_id},
                {location: location}
            ]
        }
    });
    res.end();
});


module.exports = router;
