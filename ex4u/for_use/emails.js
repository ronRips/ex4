const fs = require('fs');
const path = require('path');

var userList ={};
const db = require('../models');

module.exports = class Emails {
    constructor() {
    }

    add(first_name, last_name, mail,password) {
        if(!this.is_exist(mail)) {
            db.User.create({firstName: first_name,
                lastName: last_name,
                email: mail,
                password: password})
            return true;
        }
        else return false;
    }

    is_exist(mail){
        console.log("in is exist");
        let exist = false;
        db.User.findOne({where:{email:mail}})
            .then(row => {
                console.log("row");
                exist = true;
            });
        console.log(exist);
        return exist;
}
   is_correct(mail, password){
        if( userList[mail]== password ){
            return true;
        }
        return false;
    }
};

